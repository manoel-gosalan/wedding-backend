const expensesDiv = document.getElementById("expenses");


let categoryChart = null;
let allExpenses = [];
let currentPlan = null;
let totalContributions = 0;


const CATEGORY_BUDGETS = {};
window.addEventListener(
    "DOMContentLoaded",
    () => {

        const budgets =
            document.getElementById(
                "categoryBudgets"
            );

        budgets.style.display =
            "none";

        document
            .getElementById(
                "toggleBudgets"
            )
            .addEventListener(
                "click",
                () => {

                    budgets.style.display =
                        budgets.style.display === "none"
                            ? "grid"
                            : "none";
                }
            );
        const chartContainer =
            document.getElementById(
                "chartContainer"
            );

        chartContainer.style.display =
            "none";

        document
            .getElementById(
                "toggleChart"
            )
            .addEventListener(
                "click",
                () => {

                    chartContainer.style.display =
                        chartContainer.style.display === "none"
                            ? "block"
                            : "none";
                }
            );
    }

);

function renderChart(expenses) {
    const categories = {};

    expenses.forEach((expense) => {
        // ✅ #4 — normaliza antes de agrupar no gráfico
        const category = normalizeCategory(expense.category);
        const value = Number(expense.value);

        categories[category] = (categories[category] || 0) + value;
    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);

    if (categoryChart) categoryChart.destroy();

    const ctx = document.getElementById("categoryChart").getContext("2d");

    categoryChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{ data: values }],
        },
    });
}

function renderCategoryBudgets(expenses) {
    const container = document.getElementById("categoryBudgets");
    container.innerHTML = "";

    const spentByCategory = {};

    expenses.forEach((expense) => {
        // ✅ #4 — normaliza para evitar duplicatas nos cards
        const category = normalizeCategory(expense.category);
        const value = Number(expense.value);

        spentByCategory[category] = (spentByCategory[category] || 0) + value;
    });

    Object.entries(CATEGORY_BUDGETS).forEach(([category, budget]) => {
        const spent = spentByCategory[category] || 0;
        const remaining = budget - spent;

        let status = "🟢 Dentro do orçamento";
        if (remaining <= budget * 0.3) status = "🟡 Atenção";
        if (remaining < 0) status = "🔴 Estourado";

        container.innerHTML += `
            <div class="category-budget">
                <h3>${getCategoryIcon(category)} ${category}</h3>
                <p>Previsto: ${formatCurrency(budget)}</p>
                <p>Gasto: ${formatCurrency(spent)}</p>
                <p>Restante: ${formatCurrency(remaining)}</p>
                <p>Status: ${status}</p>
            </div>
        `;
    });
}

document.getElementById("exportPdf").addEventListener("click", async () => {
    const response = await fetch(`${API_URL}/pdf`);
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
    .addEventListener("input", applyFilters);

document
    .getElementById("categoryFilter")
    .addEventListener("change", applyFilters);

function applyFilters() {
    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const category = document
        .getElementById("categoryFilter")
        .value;

    const filtered = allExpenses.filter((expense) => {
        const matchesSearch = expense.description
            .toLowerCase()
            .includes(search);

        // ✅ #4 — compara categorias normalizadas no filtro
        const matchesCategory =
            !category ||
            normalizeCategory(expense.category) === normalizeCategory(category);

        return matchesSearch && matchesCategory;
    });

    renderExpenses(filtered);
}

document
    .getElementById("savePlan")
    .addEventListener("click", savePlan);

(async () => {
    await loadPlan();
    await loadExpenses();
})();