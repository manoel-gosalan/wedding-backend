function normalizeCategory(category) {

    if(!category){
        return "";
    }

    return category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

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