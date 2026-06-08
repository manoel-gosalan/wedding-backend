const API_URL = "/api/expenses";
const PLAN_API = "/api/plan";

// ✅ #3 — Constante única para conversão EUR → BRL
const EUR_TO_BRL = 6.4;

const expensesDiv = document.getElementById("expenses");
const form = document.getElementById("expenseForm");

let categoryChart = null;
let allExpenses = [];
let currentPlan = null;

// ✅ #4 — Normalização de categorias (remove acentos, lowercase)
function normalizeCategory(category) {

    if(!category){
        return "";
    }

    return category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// ✅ #6 — Função central de conversão (um único lugar para mudar depois)
function convertToBRL(value, currency) {
    return currency === "EUR"
        ? value * EUR_TO_BRL
        : value;
}

// ✅ #4 — CATEGORY_BUDGETS usando chaves normalizadas (sem duplicatas)
const CATEGORY_BUDGETS = {
    comida:     10000,
    fotografia:  3000,
    musica:      2000,
    decoracao:   5000,
    vestido:     2500,
    aliancas:    1500,
};
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
function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function formatEuro(value) {
    return Number(value).toLocaleString("pt-PT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function getCategoryIcon(category) {
    // ✅ #4 — Ícones também normalizados, sem duplicatas
    const icons = {
        comida:     "🍽️",
        fotografia: "📸",
        musica:     "🎵",
        decoracao:  "🌸",
        vestido:    "👗",
        aliancas:   "💍",
    };
    return icons[normalizeCategory(category)] || "📌";
}


function updateGoalAnalysis(total) {
    if (!currentPlan) return;

    const monthlySaving = Number(currentPlan.monthlySaving) || 0;

    // ✅ #6 — usa convertToBRL
    const monthlySavingBRL = convertToBRL(monthlySaving, currentPlan.currency);

    const weddingDateValue = currentPlan.weddingDate;

    if (!weddingDateValue) {
        document.getElementById("goalStatus").textContent =
            "Informe a data do casamento";
        return;
    }

    const weddingDate = new Date(weddingDateValue);
    const today = new Date();

    const monthsRemaining =
        (weddingDate.getFullYear() - today.getFullYear()) * 12
        + (weddingDate.getMonth() - today.getMonth());

    if (monthsRemaining <= 0) {
        document.getElementById("goalStatus").textContent = "Data inválida";
        return;
    }

    // ✅ #1 — savings convertido antes de calcular falta
    const savingsBRL = convertToBRL(
        currentPlan.currentSavings,
        currentPlan.currency
    );

    const falta =
        currentPlan.targetBudget
        - savingsBRL
        - total;

    const requiredPerMonth = falta / monthsRemaining;
    const difference = monthlySavingBRL - requiredPerMonth;

    const goalStatus = document.getElementById("goalStatus");

    function convertToEUR(value) {
        return value / EUR_TO_BRL;
    }
    const differenceEUR =
        convertToEUR(difference)

    if (difference > 0) {

        goalStatus.innerHTML = `
        <span style="color:#22c55e">
            € ${formatEuro(differenceEUR)}
        </span>

        <br>

        <span style="color:#22c55e">
            ${formatCurrency(difference)}/mês
        </span>

        <br>

        <small>
            Acima do necessário
        </small>
    `;

    } else {
        // language=HTML
        goalStatus.innerHTML = `
            <span style="color:#ef4444">
        € ${formatEuro(Math.abs(differenceEUR))}
    </span>

            <br>

            <span style="color:#ef4444">
        ${formatCurrency(Math.abs(difference))}/mês
    </span>

            <br>

            <small>
                Precisam guardar mais
            </small>
        `;
    }
}

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

    const targetBudget = currentPlan
        ? currentPlan.targetBudget
        : 30000;

    // ✅ #1 — falta usa savingsBRL convertido corretamente
    const savingsBRL = currentPlan
        ? convertToBRL(currentPlan.currentSavings, currentPlan.currency)
        : 0;

    const falta = targetBudget - savingsBRL - total;

    updateGoalAnalysis(total);

    const percentual = (total / targetBudget) * 100;

    document.getElementById("percentual").textContent =
        `${percentual.toFixed(1)}%`;

    document.getElementById("progressFill").style.width =
        `${Math.min(percentual, 100)}%`;

    document.getElementById("totalGasto").textContent =
        formatCurrency(total);

    // ✅ #2 — Meta Casamento exibe EUR + BRL (igual ao card Guardado)
    const targetBudgetEUR = targetBudget / EUR_TO_BRL;

    document.getElementById("metaCasamento").innerHTML = `
        € ${formatEuro(targetBudgetEUR)}
        <br>
        <small>${formatCurrency(targetBudget)}</small>
    `;

    // Card Falta — EUR + BRL
    const faltaEUR = falta / EUR_TO_BRL;

    document.getElementById("falta").innerHTML = `
        <span style="color:#ef4444">
        € ${formatEuro(faltaEUR)}
        </span>
        <br>
        <small>
        <span style="color:#ef4444">
        ${formatCurrency(falta)}
        </span>
        </small>
    `;

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

    loadExpenses();
}

async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadExpenses();
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

async function savePlan() {
    const targetBudget = Number(
        document.getElementById("targetBudget").value
    );
    const currentSavings = Number(
        document.getElementById("currentSavings").value
    );
    const monthlySaving = Number(
        document.getElementById("monthlySaving").value
    );
    const weddingDate = document.getElementById("weddingDate").value;
    const currency    = document.getElementById("currency").value;

    await fetch(PLAN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            targetBudget,
            currentSavings,
            monthlySaving,
            currency,
            weddingDate,
        }),
    });

    await loadPlan();
    await loadExpenses();

    alert("Planejamento salvo!");
}

async function loadPlan() {
    const response = await fetch(PLAN_API);
    const plans = await response.json();

    if (plans.length === 0) return;

    currentPlan = plans[plans.length - 1];

    document.getElementById("targetBudget").value =
        currentPlan.targetBudget;

    document.getElementById("currentSavings").value =
        currentPlan.currentSavings;

    document.getElementById("currency").value =
        currentPlan.currency;

    document.getElementById("monthlySaving").value =
        currentPlan.monthlySaving;

    document.getElementById("weddingDate").value =
        currentPlan.weddingDate;

    // ✅ #2 — Meta Casamento em EUR + BRL
    const targetBudgetEUR = currentPlan.targetBudget / EUR_TO_BRL;

    document.getElementById("metaCasamento").innerHTML = `
        € ${formatEuro(targetBudgetEUR)}
        <br>
        <small>${formatCurrency(currentPlan.targetBudget)}</small>
    `;

    // ✅ #6 — usa convertToBRL
    const savingsBRL = convertToBRL(
        currentPlan.currentSavings,
        currentPlan.currency
    );

    const savingsElement = document.getElementById("currentSavingsValue");

    if (savingsElement) {
        savingsElement.innerHTML = `
            € ${formatEuro(currentPlan.currentSavings)}
            <br>
            <small>${formatCurrency(savingsBRL)}</small>
        `;
    }
}

(async () => {
    await loadPlan();
    await loadExpenses();
})();