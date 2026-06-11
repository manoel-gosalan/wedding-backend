const form = document.getElementById("expenseForm");


async function loadExpenses() {
    const response = await fetch(API_URL);
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
                <strong>${formatCurrency(expense.value)}</strong>
                <p>📅 ${expense.expenseDate || "Sem data"}</p>
                <br>
                <button onclick="editExpense(${expense.id})">Editar</button>
                <button onclick="deleteExpense(${expense.id})">Excluir</button>
            </div>
        `;
    });

    const targetBudget =
         dashboard.targetBudget;

    updateGoalAnalysis(total);

    const percentual = (total / targetBudget) * 100;

    document.getElementById("percentual").textContent =
        `${percentual.toFixed(1)}%`;

    document.getElementById("progressFill").style.width =
        `${Math.min(percentual, 100)}%`;

    document.getElementById("totalGasto").textContent =
        formatCurrency(
            dashboard.totalExpenses
        );
    document.getElementById("total").textContent =
        `Total: ${formatCurrency(total)}`;

    const targetBudgetEUR =
        targetBudget / EUR_TO_BRL;

    document.getElementById("metaCasamento").innerHTML = `
    € ${formatEuro(targetBudgetEUR)}
    <br>
    <small>${formatCurrency(targetBudget)}</small>
`;

    const remainingAmount =
        dashboard.remainingAmount;

    const faltaElement =
        document.getElementById("falta");

    if (remainingAmount > 0) {

        const faltaEUR =
            remainingAmount / EUR_TO_BRL;

        faltaElement.innerHTML = `
        <span style="color:#ef4444">
            € ${formatEuro(faltaEUR)}
        </span>
        <br>
        <small style="color:#ef4444">
            ${formatCurrency(remainingAmount)}
        </small>
        <br>
        <small>
            Ainda falta guardar
        </small>
    `;

    } else {

        const sobra =
            Math.abs(remainingAmount);

        const sobraEUR =
            sobra / EUR_TO_BRL;

        faltaElement.innerHTML = `
        <span style="color:#22c55e">
            + € ${formatEuro(sobraEUR)}
        </span>
        <br>
        <small style="color:#22c55e">
            + ${formatCurrency(sobra)}
        </small>
        <br>
        <small>
            Acima da meta
        </small>
    `;
    }


    renderChart(expenses);
    if (typeof renderCategoryBudgets === "function") {

        renderCategoryBudgets(
            expenses
        );
    }
}

async function editExpense(id) {
    const description = prompt("Nova descrição:");
    if (!description) return;

    const category = prompt("Nova categoria:");
    const value = prompt("Novo valor:");
    const expenseDate = prompt("Nova data (AAAA-MM-DD):");

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, category, value, expenseDate }),
    });

    const categoryFilter = document.getElementById("categoryFilter");

    // ✅ #4 — categorias no filtro também normalizadas (sem duplicatas visuais)
    const categories = [
        ...new Set(allExpenses.map((e) => normalizeCategory(e.category)))
    ];

    categoryFilter.innerHTML =
        '<option value="">Todas categorias</option>';

    categories.forEach((cat) => {
        categoryFilter.innerHTML +=
            `<option value="${cat}">${cat}</option>`;
    });
    await loadExpenses();

}

async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadExpenses();

}

function renderExpenses(expenses) {
    expensesDiv.innerHTML = "";

    expenses.forEach((expense) => {
        expensesDiv.innerHTML += `
            <div class="card">
                <h3>${expense.description}</h3>
                <p>
                    ${getCategoryIcon(expense.category)}
                    ${expense.category}
                </p>
                <strong>${formatCurrency(expense.value)}</strong>
                <p>📅 ${expense.expenseDate}</p>
                <button onclick="editExpense(${expense.id})">Editar</button>
                <button onclick="deleteExpense(${expense.id})">Excluir</button>
            </div>
        `;
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const category    = document.getElementById("category").value;
    const value       = document.getElementById("value").value;
    const expenseDate = document.getElementById("expenseDate").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, category, value, expenseDate }),
    });

    form.reset();
    loadExpenses();
});

document
    .getElementById("toggleExpenses")
    .addEventListener(
        "click",
        ()  => {

            const section =
                document.getElementById(
                    "expensesSection"
                );

            if (
                section.style.display ===
                "none"
            ) {

                section.style.display =
                    "block";

                document.getElementById(
                    "toggleExpenses"
                ).textContent =
                    "Ocultar Despesas Extras";

            } else {

                section.style.display =
                    "none";

                document.getElementById(
                    "toggleExpenses"
                ).textContent =
                    "Mostrar Despesas Extras";
            }
            console.log("Clicou no btn")
        }

    );

window.loadExpenses = loadExpenses;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.renderExpenses = renderExpenses;