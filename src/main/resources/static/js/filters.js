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


        const matchesCategory =
            !category ||
            normalizeCategory(expense.category) === normalizeCategory(category);

        return matchesSearch && matchesCategory;
    });

    renderExpenses(filtered);
}

window.applyFilters = applyFilters;