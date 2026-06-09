document.getElementById("exportPdf").addEventListener("click", async () => {

    const response = await fetch(`${API_URL}/pdf`);

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");



    a.href = url;

    a.download = "Resumo_Casamento.pdf";

    a.click();



    window.URL.revokeObjectURL(url);

});