document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");
    const currentLang = localStorage.getItem("selectedLanguage") || "es";
    let translations = {};

    if (!videoId) {
        console.error("Error: El parámetro 'id' no está definido.");
        alert("No se encontró un ID de video válido.");
        return;
    }

    // Cargar traducciones
    async function loadTranslations() {
        try {
            const response = await fetch("../../translate.json");
            translations = await response.json();
        } catch (error) {
            console.error("Error al cargar las traducciones:", error);
        }
    }

    // Lógica para agregar las etiquetas
    function agregarEtiquetas(tags) {
        const tagsContainer = document.getElementById("tags-container");
      
        // Limpiar etiquetas previas
        tagsContainer.innerHTML = "";
      
        // Crear un enlace por cada etiqueta
        tags.forEach(tag => {
          const tagElement = document.createElement("a");
          tagElement.className = "tag";
          tagElement.href = `../../categorias/tiposCategorias/catego.html?category=${tag}`; // Enlace dinámico a la categoría
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      }
      
    // Cargar el video y actualizar la página
    async function cargarVideo() {
        try {
            const response = await fetch("../videos.json");
            const data = await response.json();

            // Buscar el video por ID
            const video = data.flatMap(page => page.videos).find(v => v.id === videoId);
            if (!video) {
                console.error("Error: Video no encontrado.");
                alert("El video solicitado no existe.");
                return;
            }

            // Obtener la traducción del título
            await loadTranslations();
            const translatedTitle = translations[currentLang]?.[video.title] || video.title;

            // Configurar el iframe
            const iframe = document.getElementById("video-frame");
            iframe.src = video.url;
            iframe.title = translatedTitle;

            // Actualizar título de la página
            document.title = translatedTitle;

            // Agregar etiquetas debajo del video
            agregarEtiquetas(video.tags);
        } catch (error) {
            console.error("Error al cargar el video:", error);
            alert("Hubo un problema al cargar el video.");
        }
    }

    cargarVideo();
});
