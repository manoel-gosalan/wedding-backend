const expensesDiv = document.getElementById("expenses");

let allExpenses = [];
let currentPlan = null;
let totalContributions = 0;
let dashboard = null;

document
    .getElementById("searchInput")
    .addEventListener("input", applyFilters);

document
    .getElementById("categoryFilter")
    .addEventListener("change", applyFilters);

document
    .getElementById("savePlan")
    .addEventListener("click", savePlan);

(async () => {
    await loadDashboard();
    await loadPlan();
    await loadExpenses();
    await loadVendors();
})();