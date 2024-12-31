document.addEventListener("DOMContentLoaded", () => {
    // Captura el botón de búsqueda
    const searchBtn = document.getElementById("searchBtn");
    const searchBox = document.getElementById("searchBox");

    if (searchBtn && searchBox) {
        searchBtn.addEventListener("click", () => {
            const searchValue = searchBox.value.trim();

            // Redirige y guarda el término de búsqueda en localStorage
            if (searchValue.length > 0) {
                window.location.href = `../../search/search.html?query=${encodeURIComponent(searchValue)}`;
            } else {
                alert("Por favor, escribe algo para buscar.");
            }
        });
    }
});


