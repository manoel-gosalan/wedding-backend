document
    .getElementById("showCategoryForm")
    .addEventListener("click", () => {

        const form =
            document.getElementById("categoryForm");

        form.style.display =
            form.style.display === "none"
                ? "block"
                : "none";
    });

document
    .getElementById("saveCategory")
    .addEventListener("click", async () => {

        const name =
            document.getElementById("categoryName").value;

        const budget =
            document.getElementById("categoryBudget").value;

        await fetch("/api/category-budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                budget
            })
        });

        alert("Categoria criada!");

        await loadExpenses();
    });