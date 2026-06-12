const expensesDiv = document.getElementById("expenses");

let allExpenses = [];
let currentPlan = null;
let totalContributions = 0;
let dashboard = null;

document
    .getElementById("searchInput")
    .addEventListener("input", applyFilters);
/*
document
    .getElementById("categoryFilter")
    .addEventListener("change", applyFilters);
*/

document
    .getElementById("savePlan")
    .addEventListener("click", savePlan);

document
    .getElementById(
        "togglePlanning"
    )
    .addEventListener(
        "click",
        () => {

                const section =
                    document.getElementById(
                        "planningSection"
                    );

                const button =
                    document.getElementById(
                        "togglePlanning"
                    );

                section.style.display =
                    section.style.display === "none"
                        ? "flex"
                        : "none";

                button.textContent =
                    section.style.display === "none"
                        ? "Editar Planejamento"
                        : "Ocultar Planejamento";
        }
    );

window.addEventListener(
    "DOMContentLoaded",
    async () => {
        await loadExchangeRate();
        await loadDashboard();
        await loadPlan();
        await loadVendors();
        await loadExpenses();
    }
);