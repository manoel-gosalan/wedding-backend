function getTotalSaved() {

    if (!currentPlan) {
        return 0;
    }

    return currentPlan.currentSavings;
}

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

    const contributionsResponse =
        await fetch(CONTRIBUTIONS_TOTAL_API);

    totalContributions =
        await contributionsResponse.json();

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
    const totalSaved =
        getTotalSaved();

    const savingsBRL = convertToBRL(
        totalSaved,
        currentPlan.currency
    );

    const savingsElement =
        document.getElementById("currentSavingsValue");

    if (savingsElement && dashboard) {

        savingsElement.innerHTML = `
        ${formatCurrency(
            dashboard.currentSavings
        )}
    `;
    }
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
    const totalSaved =
        getTotalSaved();

    const savingsBRL = convertToBRL(
        totalSaved,
        currentPlan.currency
    );

    const falta = Math.max(
        0,
        currentPlan.targetBudget - savingsBRL - total
    );

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

async function loadDashboard() {
    const response =
        await fetch("/api/dashboard");

    dashboard =
        await response.json();

    console.log(dashboard);
}

window.savePlan = savePlan;
window.loadPlan = loadPlan;
window.loadDashboard = loadDashboard;