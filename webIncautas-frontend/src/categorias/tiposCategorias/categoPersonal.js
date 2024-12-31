document.addEventListener("DOMContentLoaded", async () => {
  const categoryTitle = document.getElementById("category-title");
  const videosContainer = document.getElementById("videos-container");

  // Obtener la categoría seleccionada desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  // Validar si hay una categoría seleccionada
  if (!selectedCategory) {
    if (categoryTitle) categoryTitle.textContent = "Categoría no encontrada";
    if (videosContainer) videosContainer.innerHTML = `<p>No se especificó una categoría válida.</p>`;
    return;
  }

  // Cargar las traducciones
  const savedLang = localStorage.getItem("selectedLanguage") || "en"; // Idioma seleccionado o por defecto inglés
  await loadTranslations(); // Asegúrate de que las traducciones estén cargadas
  const translations = window.translations[savedLang] || window.translations["en"];

  // Traducir la palabra "Categoría" y la etiqueta de la categoría
  const categoryText = translations["category"] || "Categoría"; // Traducir "Categoría"
  const translatedCategory = translations[selectedCategory] || selectedCategory; // Traducir etiqueta

  // Actualizar el contenido del título con la traducción
  categoryTitle.textContent = `${categoryText}: ${translatedCategory}`;

  try {
    // Cargar los videos relacionados con la categoría
    const response = await fetch("../../videos/videos.json");
    const data = await response.json();

    // Combinar todos los videos de las páginas
    const allVideos = data.flatMap((page) => page.videos);

    // Filtrar los videos por la categoría seleccionada
    const filteredVideos = allVideos.filter((video) =>
      Array.isArray(video.tags) && video.tags.includes(selectedCategory)
    );
    // Ordenar los videos de más nuevo a más antiguo
    filteredVideos.sort((a, b) => b.id - a.id);
    
    // Renderizar los videos en la página
    renderVideos(filteredVideos);

    // Traducir el contenido dinámico de los videos
    await translateDynamicContent(savedLang);
  } catch (error) {
    console.error("Error al cargar los videos:", error);
    if (videosContainer) {
      videosContainer.innerHTML = `<p>Error al cargar los videos. Inténtalo más tarde.</p>`;
    }
  }
});

// Función para renderizar los videos
function renderVideos(videos) {
  const videosContainer = document.getElementById("videos-container");

  if (!videos.length) {
    videosContainer.innerHTML = `<p>No hay videos disponibles para esta categoría.</p>`;
    return;
  }

  videosContainer.innerHTML = videos
    .map(
      (video) => `
    <div class="video-item">
      <h2 data-translate="${video.title}"></h2>
      <a href="../../videos/vdIndv/vidPersonal.html?id=${video.id}" target="_blank">
        <img src="${video.image}" alt="${video.title}">
      </a>
      <p class="video-duration">${video.duration}</p>
    </div>`
    )
    .join("");
}

// Cargar traducciones dinámicas
async function loadTranslations() {
  if (!Object.keys(window.translations || {}).length) {
    try {
      const response = await fetch("../../translate.json");
      window.translations = await response.json();
    } catch (error) {
      console.error("Error al cargar las traducciones:", error);
    }
  }
}

// Traducir contenido dinámico
async function translateDynamicContent(lang) {
  const translations = window.translations[lang] || window.translations["en"];

  // Traducir títulos de video
  document.querySelectorAll(".video-item h2").forEach((element) => {
    const key = element.getAttribute("data-translate");
    const translatedText = translations[key] || key;
    element.textContent = translatedText;
  });
}

// Función para traducir el título de categoría
function translateCategoryTitle(lang) {
  const categoryTitle = document.getElementById("category-title");
  if (!categoryTitle) return;

  const translations = window.translations[lang] || window.translations["en"];
  const categoryTranslation = translations["category"] || "Categoría"; // Traducción de "Categoría"

  // Separar el texto dinámico y traducir solo "Categoría"
  const dynamicText = categoryTitle.textContent.split(": ")[1] || "";
  categoryTitle.textContent = `${categoryTranslation}: ${dynamicText}`;
}