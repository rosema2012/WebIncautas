document.addEventListener("DOMContentLoaded", async () => {
    const query = obtenerQuery();
    mostrarTerminoBuscado(query);
    const videoGrid = document.querySelector('.video-grid');
    const paginacion = document.querySelector('.pagination');
    const currentLang = localStorage.getItem("selectedLanguage") || "es";
    let translations = {};
    let dataVideos = [];
    const videosPorPagina = 32; // Máximo de videos por página

    
    // Obtener el parámetro 'query' desde la URL
    function obtenerQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('query')?.toLowerCase() || '';
    }

    // Obtener el parámetro 'page' desde la URL
    function obtenerPaginaActual() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page')) || 1; // Página 1 por defecto
    }

    // Mostrar el término buscado al lado del título
    function mostrarTerminoBuscado(query) {
        const terminoBuscado = document.getElementById("termino-buscado");
        if (query) {
            terminoBuscado.textContent = `"${query}"`;
        } else {
            terminoBuscado.textContent = ""; // Vacío si no hay búsqueda
        }
    }

    // Cargar las traducciones desde el archivo JSON
    async function loadTranslations() {
        try {
            const response = await fetch('../../translate.json');
            if (!response.ok) throw new Error("Error al cargar el archivo de traducciones.");
            translations = await response.json();
        } catch (error) {
            console.error('Error al cargar las traducciones:', error);
        }
    }

    // Buscar coincidencias en títulos traducidos o títulos originales
    function filtrarVideosPorQuery(videos, query) {
        return videos.filter(video => {
            // Título original (en inglés o lo que contenga el JSON principal)
            const originalTitle = video.title.toLowerCase();
    
        // Títulos traducidos en español, inglés, francés y alemán
        const titleInSpanish = translations["es"]?.[video.title]?.toLowerCase() || '';
        const titleInEnglish = translations["en"]?.[video.title]?.toLowerCase() || '';
        const titleInFrench  = translations["fr"]?.[video.title]?.toLowerCase() || '';
        const titleInGerman  = translations["gr"]?.[video.title]?.toLowerCase() || '';

        // Verificar si la query coincide con alguno de los títulos
        return (
            originalTitle.includes(query) ||
            titleInSpanish.includes(query) ||
            titleInEnglish.includes(query) ||
            titleInFrench.includes(query) ||
            titleInGerman.includes(query)
        );
    })
    .sort((a, b) => b.id - a.id); // Ordenar los videos de mayor a menor ID
}

    // Cargar videos desde JSON
    async function cargarVideos() {
        const basePath = '../videos/videos.json';
        const paginaActual = obtenerPaginaActual();


        try {
            const response = await fetch(basePath);
            if (!response.ok) throw new Error("Error al cargar el archivo de videos.");
            dataVideos = await response.json();

            // Filtrar videos
            const videosFiltrados = filtrarVideosPorQuery(dataVideos.flatMap(p => p.videos), query);

            // Paginación
            const inicio = (paginaActual - 1) * videosPorPagina;
            const fin = inicio + videosPorPagina;
            const videosPagina = videosFiltrados.slice(inicio, fin);

            if (videosPagina.length === 0) {
                videoGrid.innerHTML = `<p>${translations[currentLang]?.no_videos || "No se encontraron resultados para tu búsqueda."}</p>`;
                return;
            }

            // Renderizar videos paginados
            renderizarVideos(videosPagina);
            generarPaginacion(videosFiltrados.length, query);
        } catch (error) {
            console.error('Error al cargar los videos:', error);
            videoGrid.innerHTML = `<p>${translations[currentLang]?.error_loading || "Error al cargar los videos."}</p>`;
        }
    }

    // Renderizar videos en la cuadrícula
    function renderizarVideos(videos) {
        videoGrid.innerHTML = videos.map(video => {
            const translatedTitle = translations[currentLang]?.[video.title] || video.title;
            return `
                <div class="video-item">
                    <h2>${translatedTitle}</h2>
                    <a href="../videos/vdIndv/vid.html?id=${video.id}" target="_blank">
                        <img src="${video.image}" alt="${translatedTitle}">
                    </a>
                    <p>${video.duration}</p>
                </div>
            `;
        }).join('');
    }

    // Generar la paginación con query y page
    function generarPaginacion(totalVideos, query) {
        paginacion.innerHTML = '';
        const totalPaginas = Math.ceil(totalVideos / videosPorPagina);
        const paginaActual = obtenerPaginaActual();

        for (let i = 1; i <= totalPaginas; i++) {
            const enlace = document.createElement('a');
            enlace.href = `?query=${encodeURIComponent(query)}&page=${i}`;
            enlace.innerText = i;
            if (i === paginaActual) enlace.className = 'active';
            paginacion.appendChild(enlace);
        }
    }

    // Inicialización
    await loadTranslations();
    await cargarVideos();
});
