let categoryChart = null;

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

window.renderChart = renderChart;