const API_URL = "http://localhost:8080/api/expenses";

const expensesDiv = document.getElementById("expenses");
const form = document.getElementById("expenseForm");

let categoryChart = null;
let allExpenses = [];
let currentPlan = null;
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
/*
========================================================
ANÁLISE FINANCEIRA DO CASAMENTO
========================================================

Objetivo:

Verificar se o casal consegue atingir
a meta financeira até a data do casamento.

Exemplo:

Meta:
R$ 30.000

Falta:
R$ 20.000

Meses restantes:
10

Necessário:
R$ 2.000/mês

Se conseguem guardar:

R$ 2.500

→ Meta alcançável

Se conseguem guardar:

R$ 1.500

→ Faltam R$ 500/mês

========================================================
*/

function updateGoalAnalysis(total){

    if(!currentPlan){
        return;
    }

    const monthlySaving =
        Number(
            currentPlan.monthlySaving
        ) || 0;

    const weddingDateValue =
        currentPlan.weddingDate;

    if(!weddingDateValue){

        document.getElementById(
            "goalStatus"
        ).textContent =
            "Informe a data do casamento";

        return;
    }

    const weddingDate =
        new Date(
            weddingDateValue
        );

    const today =
        new Date();

    const monthsRemaining =
        (
            (weddingDate.getFullYear()
                - today.getFullYear()) * 12
        )
        +
        (
            weddingDate.getMonth()
            - today.getMonth()
        );

    if(monthsRemaining <= 0){

        document.getElementById(
            "goalStatus"
        ).textContent =
            "Data inválida";

        return;
    }

    const falta =
        currentPlan.targetBudget
        -
        currentPlan.currentSavings
        -
        total;

    const requiredPerMonth =
        falta / monthsRemaining;

    if(monthlySaving >= requiredPerMonth){

        document.getElementById(
            "goalStatus"
        ).textContent =
            `✅ Meta alcançável`;

    }else{

        const extra =
            requiredPerMonth
            - monthlySaving;

        document.getElementById(
            "goalStatus"
        ).textContent =
            `❌ Faltam ${formatCurrency(extra)}/mês`;
    }
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
    console.log(currentPlan);

  const expenses = await response.json();
  allExpenses = expenses;

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

    const targetBudget =
        currentPlan
            ? currentPlan.targetBudget
            : 30000;

    const currentSavings =
        currentPlan
            ? currentPlan.currentSavings
            : 0;

    const falta =
        targetBudget
        -
        currentSavings
        -
        total;
  updateGoalAnalysis(total);
  const MESES_RESTANTES = 12;

  const economiaMensal = falta / MESES_RESTANTES;

  const percentual = (total / targetBudget) * 100;

  document.getElementById("economiaMensal").textContent =
    formatCurrency(economiaMensal);

  document.getElementById("percentual").textContent =
    `${percentual.toFixed(1)}%`;

  document.getElementById("progressFill").style.width =
    `${Math.min(percentual, 100)}%`;

  document.getElementById("totalGasto").textContent = formatCurrency(total);

  document.getElementById("metaCasamento").textContent =
    formatCurrency(targetBudget);

  document.getElementById("falta").textContent = formatCurrency(falta);

  document.getElementById("total").textContent =
    `Total: ${formatCurrency(total)}`;

  renderChart(expenses);

  renderCategoryBudgets(expenses);
}
async function editExpense(id) {
  const description = prompt("Nova descrição:");

  if (!description) return;

  const category = prompt("Nova categoria:");

  const value = prompt("Novo valor:");

  const expenseDate = prompt("Nova data (AAAA-MM-DD):");

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",

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
  const categoryFilter = document.getElementById("categoryFilter");

    const categories =
        [...new Set(
            allExpenses.map(
                e => e.category
            )
        )];

  categoryFilter.innerHTML = '<option value="">Todas categorias</option>';

  categories.forEach((category) => {
    categoryFilter.innerHTML += `
        <option value="${category}">
            ${category}
        </option>
    `;
  });

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


function renderExpenses(expenses) {
  expensesDiv.innerHTML = "";

  expenses.forEach((expense) => {
    expensesDiv.innerHTML += `
            <div class="card">

                <h3>
                    ${expense.description}
                </h3>

                <p>
                    ${getCategoryIcon(expense.category)}

                    ${expense.category}
                </p>

                <strong>
                    ${formatCurrency(expense.value)}
                </strong>

                <p>
                    📅 ${expense.expenseDate}
                </p>

                <button
                    onclick="editExpense(${expense.id})"
                >
                    Editar
                </button>

                <button
                    onclick="deleteExpense(${expense.id})"
                >
                    Excluir
                </button>

            </div>
        `;
  });
}

document.getElementById("exportPdf").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/pdf`);
  console.log(response.status);
  console.log(response.headers.get("content-type"));

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "Resumo_Casamento.pdf";

  a.click();

  window.URL.revokeObjectURL(url);
});

document
.getElementById("searchInput")
.addEventListener(
"input",
applyFilters
);

document
.getElementById("categoryFilter")
.addEventListener(
"change",
applyFilters
);
function applyFilters(){

    const search =
    document
    .getElementById(
        "searchInput"
    )
    .value
    .toLowerCase();

    const category =
    document
    .getElementById(
        "categoryFilter"
    )
    .value;

    const filtered =
    allExpenses.filter(expense => {

        const matchesSearch =

        expense.description
        .toLowerCase()
        .includes(search);

        const matchesCategory =

        !category ||

        expense.category === category;

        return matchesSearch
            &&
            matchesCategory;
    });

    renderExpenses(filtered);
}

const monthlySaving =
    Number(
        document.getElementById(
            "monthlySaving"
        ).value
    );

const weddingDate =
    new Date(
        document.getElementById(
            "weddingDate"
        ).value
    );

const PLAN_API =
    "http://localhost:8080/api/plan";

document
    .getElementById("savePlan")
    .addEventListener(
        "click",
        savePlan
    );

async function savePlan(){
    console.log("SAVE PLAN CHAMADO");

    const targetBudget =
      Number(
          document.getElementById(
              "targetBudget"
          ).value
      );

  const currentSavings =
      Number(
          document.getElementById(
              "currentSavings"
          ).value
      );



    console.log({
        targetBudget,
        currentSavings,
    });

  await fetch(
      PLAN_API,
      {
        method:"POST",

        headers:{
          "Content-Type":
              "application/json"
        },

        body:JSON.stringify({

          targetBudget,
          currentSavings,
          monthlySaving,
          weddingDate

        })
      }
  );

    await loadPlan();
    await loadExpenses();

    alert(
        "Planejamento salvo!"
    );
}

async function loadPlan(){
    console.log("LOAD PLAN CHAMADO");
    const response =
        await fetch(
            PLAN_API
        );

    const plans =
        await response.json();

    if(plans.length === 0){
        return;
    }

    currentPlan =
        plans[plans.length - 1];

    document.getElementById(
        "targetBudget"
    ).value =
        currentPlan.targetBudget;

    document.getElementById(
        "currentSavings"
    ).value =
        currentPlan.currentSavings;

    const savingsElement =
        document.getElementById(
            "currentSavingsValue"
        );

    if(savingsElement){

        savingsElement.textContent =
            formatCurrency(
                currentPlan.currentSavings
            );
    }

    document.getElementById(
        "monthlySaving"
    ).value =
        currentPlan.monthlySaving;

    document.getElementById(
        "weddingDate"
    ).value =
        currentPlan.weddingDate;

    document.getElementById(
        "metaCasamento"
    ).textContent =
        formatCurrency(
            currentPlan.targetBudget
        );

    document.getElementById(
        "currentSavingsValue"
    ).textContent =
        formatCurrency(
            currentPlan.currentSavings
        );

}
(async () => {

    await loadPlan();

    await loadExpenses();

})();