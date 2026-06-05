const API_URL = "http://localhost:8080/api/expenses";

const expensesDiv = document.getElementById("expenses");
const form = document.getElementById("expenseForm");

const META_CASAMENTO = 30000;
let categoryChart = null;
const CATEGORY_BUDGETS = {
  comida: 10000,

  fotografia: 3000,

  foto: 3000,

  musica: 2000,

  música: 2000,

  decoracao: 5000,

  decoração: 5000,

  vestido: 2500,

  aliancas: 1500,
};

function formatCurrency(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getCategoryIcon(category) {
  const icons = {
    comida: "🍽️",
    fotografia: "📸",
    foto: "📸",
    musica: "🎵",
    música: "🎵",
    decoração: "🌸",
    decoracao: "🌸",
    vestido: "👗",
    alianças: "💍",
    aliancas: "💍",
  };

  return icons[category.toLowerCase()] || "📌";
}

function renderChart(expenses) {
  const categories = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    const value = Number(expense.value);

    if (categories[category]) {
      categories[category] += value;
    } else {
      categories[category] = value;
    }
  });

  const labels = Object.keys(categories);

  const values = Object.values(categories);

  if (categoryChart) {
    categoryChart.destroy();
  }

  const ctx = document.getElementById("categoryChart").getContext("2d");

  categoryChart = new Chart(ctx, {
    type: "pie",

    data: {
      labels,

      datasets: [
        {
          data: values,
        },
      ],
    },
  });
}

function renderCategoryBudgets(expenses) {
  const container = document.getElementById("categoryBudgets");

  container.innerHTML = "";

  const spentByCategory = {};

  expenses.forEach((expense) => {
    const category = expense.category.toLowerCase();

    const value = Number(expense.value);

    if (spentByCategory[category]) {
      spentByCategory[category] += value;
    } else {
      spentByCategory[category] = value;
    }
  });

  Object.entries(CATEGORY_BUDGETS).forEach(([category, budget]) => {
    const spent = spentByCategory[category] || 0;

    const remaining = budget - spent;

    let status = "🟢 Dentro do orçamento";

    if (remaining <= budget * 0.3) {
      status = "🟡 Atenção";
    }

    if (remaining < 0) {
      status = "🔴 Estourado";
    }

    container.innerHTML += `
            <div class="category-budget">

                <h3>
                    ${getCategoryIcon(category)}
                    ${category}
                </h3>

                <p>
                    Previsto:
                    ${formatCurrency(budget)}
                </p>

                <p>
                    Gasto:
                    ${formatCurrency(spent)}
                </p>

                <p>
                    Restante:
                    ${formatCurrency(remaining)}
                </p>

                <p>
                    Status:
                    ${status}
                </p>
            </div>
        `;
  });
}

async function loadExpenses() {
  const response = await fetch(API_URL);

  const expenses = await response.json();

  expensesDiv.innerHTML = "";

  let total = 0;

  expenses.forEach((expense) => {
    total += Number(expense.value);

    expensesDiv.innerHTML += `
      <div class="card">

        <h3>${expense.description}</h3>

        <p>
          ${getCategoryIcon(expense.category)}
          ${expense.category}
        </p>

        <strong>
          ${formatCurrency(expense.value)}
        </strong>

        <p>
          📅 ${expense.expenseDate || "Sem data"}
        </p>

      <br>

        <button onclick="editExpense(${expense.id})">
          Editar
        </button>

        <button onclick="deleteExpense(${expense.id})">
          Excluir
        </button>

      </div>
    `;
  });

  const falta = META_CASAMENTO - total;
  const MESES_RESTANTES = 12;

  const economiaMensal = falta / MESES_RESTANTES;

  const percentual = (total / META_CASAMENTO) * 100;

  document.getElementById("economiaMensal").textContent =
    formatCurrency(economiaMensal);

  document.getElementById("percentual").textContent =
    `${percentual.toFixed(1)}%`;

  document.getElementById("progressFill").style.width =
    `${Math.min(percentual, 100)}%`;

  document.getElementById("totalGasto").textContent = formatCurrency(total);

  document.getElementById("metaCasamento").textContent =
    formatCurrency(META_CASAMENTO);

  document.getElementById("falta").textContent = formatCurrency(falta);

  document.getElementById("total").textContent =
    `Total: ${formatCurrency(total)}`;

  renderChart(expenses);

  renderCategoryBudgets(expenses);
}
async function editExpense(id) {

    const description =
        prompt("Nova descrição:");

    if (!description) return;

    const category =
        prompt("Nova categoria:");

    const value =
        prompt("Novo valor:");

    const expenseDate =
        prompt("Nova data (AAAA-MM-DD):");

    await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

                description,
                category,
                value,
                expenseDate

            })
        }
    );

    loadExpenses();
}

async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadExpenses();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const description = document.getElementById("description").value;

  const category = document.getElementById("category").value;
  const value = document.getElementById("value").value;

  const expenseDate = document.getElementById("expenseDate").value;

  await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      description,
      category,
      value,
      expenseDate,
    }),
  });

  form.reset();

  loadExpenses();
});

loadExpenses();

document
.getElementById("exportPdf")
.addEventListener(
"click",
async () => {

    const response =
        await fetch(
            `${API_URL}/pdf`
        );

    const blob =
        await response.blob();

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "Resumo_Casamento.pdf";

    a.click();

    window.URL
        .revokeObjectURL(url);

});
