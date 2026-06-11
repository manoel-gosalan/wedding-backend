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

async function loadExchangeRate() {

    const response =
        await fetch(
            EXCHANGE_RATE_API
        );

    const data =
        await response.json();
    console.log(data);

    EUR_TO_BRL =
        Number(data.rate);

    console.log(
        "Cotação carregada:",
        EUR_TO_BRL
    );

    document.getElementById(
        "exchangeRate"
    ).textContent =
        `Cotação atual: €1 = R$ ${EUR_TO_BRL.toFixed(2)}`;
}