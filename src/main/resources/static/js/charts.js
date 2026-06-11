let categoryChart = null;

function renderChart(expenses, allVendors) {
    const categories = {};

    // despesas
    expenses.forEach((expense) => {

        const category =
            normalizeCategory(
                expense.category
            );

        const value =
            Number(
                expense.value
            );

        categories[category] =
            (categories[category] || 0)
            + value;
    });

    // fornecedores
    allVendors.forEach((vendor) => {

        const category =
            vendor.category;

        const paid =
            Number(
                vendor.paidAmount || 0
            );

        categories[category] =
            (categories[category] || 0)
            + paid;
    });

    const labels =
        Object.keys(categories);

    const values =
        Object.values(categories);

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