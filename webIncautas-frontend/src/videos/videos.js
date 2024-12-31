document.addEventListener("DOMContentLoaded", async () => {
    const videoGrid = document.querySelector('.video-grid');
    const paginacion = document.querySelector('.pagination');
    const currentLang = localStorage.getItem("selectedLanguage") || "es";
    const videosPorPagina = 32; // Videos por página
    let translations = {};

    // Obtener la página actual desde la URL
    function obtenerPaginaActual() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page')) || 1;
    }

    // Cargar traducciones
    async function loadTranslations() {
        try {
            const response = await fetch('../../translate.json');
            translations = await response.json();
        } catch (error) {
            console.error("Error al cargar las traducciones:", error);
        }
    }

    // Cargar videos desde JSON
    async function cargarVideos() {
        try {
            const response = await fetch('../videos.json');
            const data = await response.json();

        // Aplanar todas las páginas en una lista de videos y ordenarlos de mayor a menor ID
        const todosLosVideos = data.flatMap(p => p.videos).sort((a, b) => b.id - a.id);

        const paginaActual = obtenerPaginaActual();
        const inicio = (paginaActual - 1) * videosPorPagina;
        const videosPagina = todosLosVideos.slice(inicio, inicio + videosPorPagina);

        if (videosPagina.length === 0) {
            videoGrid.innerHTML = '<p>No hay videos disponibles.</p>';
            return;
        }

            renderizarVideos(videosPagina);
            generarPaginacion(data.flatMap(p => p.videos).length);
        } catch (error) {
            console.error("Error al cargar los videos:", error);
        }
    }

    // Renderizar videos con traducción de título
    function renderizarVideos(videos) {
        videoGrid.innerHTML = videos.map(video => {
            // Obtener la traducción del título
            const translatedTitle = translations[currentLang]?.[video.title] || video.title;
            return `
                <div class="video-item">
                    <h2>${translatedTitle}</h2>
                    <a href="../vdIndv/vid.html?id=${video.id}">
                        <img src="${video.image}" alt="${translatedTitle}">
                    </a>
                    <p>${video.duration}</p>
                </div>
            `;
        }).join('');
    }

    // Generar paginación
    function generarPaginacion(totalVideos) {
        const totalPaginas = Math.ceil(totalVideos / videosPorPagina);
        const paginaActual = obtenerPaginaActual();

        paginacion.innerHTML = '';
        for (let i = 1; i <= totalPaginas; i++) {
            const enlace = document.createElement('a');
            enlace.href = `?page=${i}`;
            enlace.textContent = i;
            if (i === paginaActual) enlace.className = 'active';
            paginacion.appendChild(enlace);
        }
    }

    // Inicialización
    await loadTranslations();
    await cargarVideos();
});
