const CATEGORY_BUDGETS_API =
    "/api/category-budgets";
async function loadCategoryBudgets(){

    const response =
        await fetch(
            CATEGORY_BUDGETS_API
        );

    const data =
        await response.json();

    console.log(data);

    return data;
}
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

async function renderCategoryBudgets(expenses) {

    console.log("ENTROU");

    const container = document.getElementById("categoryBudgets");
    container.innerHTML = "";

    const spentByCategory = {};

    expenses.forEach((expense) => {

        const category = normalizeCategory(expense.category);
        const value = Number(expense.value);

        spentByCategory[category] = (spentByCategory[category] || 0) + value;
    });

    const categoryBudgets =
        await loadCategoryBudgets();

    categoryBudgets.forEach((categoryBudget) => {

        const category =
            normalizeCategory(
                categoryBudget.name
            );

        const budget =
            Number(
                categoryBudget.budget
            );

        const spent =
            spentByCategory[category] || 0;

        const remaining =
            budget - spent;

        let status =
            "🟢 Dentro do orçamento";

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
                ${categoryBudget.name}
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

window.renderCategoryBudgets = renderCategoryBudgets;