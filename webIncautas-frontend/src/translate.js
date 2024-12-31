if (typeof window.translations === "undefined") {
  window.translations = {};
}

// Cargar las traducciones desde el archivo JSON
async function loadTranslations() {
  try {
    const response = await fetch('../../translate.json'); // Ruta al archivo de traducciones
    window.translations = await response.json();

    // Detectar idioma del navegador o usar un valor por defecto
    const userLang = navigator.language.slice(0, 2) || 'es';

    // Elegir el idioma según el navegador o usar 'es'
    const selectedLang = window.translations[userLang] || window.translations['es'];

    // Aplicar traducciones a los elementos con 'data-translate'
    document.querySelectorAll('[data-translate]').forEach((element) => {
      const key = element.getAttribute('data-translate');
      if (selectedLang[key]) {
        if (element.tagName.toLowerCase() === 'a') {
          element.textContent = selectedLang[key];
        } else {
          element.textContent = selectedLang[key];
        }
      }
    });
  } catch (error) {
    console.error('Error al cargar las traducciones:', error);
  }
}

/**
 * Carga el contenido HTML del modal en un contenedor específico.
 * @param {string} modalPath - Ruta al archivo HTML del modal.
 * @param {string} containerId - ID del contenedor donde se insertará el HTML.
 */
function loadModalHTML(modalPath, containerId) {
  fetch(modalPath)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar el modal: ${response.statusText}`);
      return response.text();
    })
    .then(html => {
      const modalContainer = document.getElementById(containerId);
      if (!modalContainer) {
        console.error(`No se encontró el contenedor con id: ${containerId}`);
        return;
      }
      modalContainer.innerHTML = html; // Insertar contenido en el contenedor
      addModalEventListeners(modalContainer); // Añadir eventos a los botones

      const savedLang = localStorage.getItem('selectedLanguage') || 'en';
      translateModalContent(savedLang); // Traducir el contenido cargado
    })
    .catch(error => console.error('Error al cargar el modal:', error));
}

// Función para traducir la página
async function translatePage(lang) {
  if (!Object.keys(window.translations).length) {
    await loadTranslations();
  }

  // Traducir texto normal
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute('data-translate');
    if (window.translations[lang] && window.translations[lang][key]) {
      if (element.tagName.toLowerCase() === 'a') {
        element.textContent = window.translations[lang][key];
      } else {
        element.textContent = window.translations[lang][key];
      }
    }
  });

  // Traducir texto en elementos con 'data-translate'
  document.querySelectorAll('[data-translate]').forEach((element) => {
    const key = element.getAttribute('data-translate');
    if (window.translations[lang] && window.translations[lang][key]) {
      if (element.children.length > 0) {
        element.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            child.textContent = window.translations[lang][key];
          }
        });
      } else {
        element.textContent = window.translations[lang][key];
      }
    }
  });

  // Traducir placeholders en inputs con 'data-translate-placeholder'
  document.querySelectorAll('[data-translate-placeholder]').forEach((element) => {
    const key = element.getAttribute('data-translate-placeholder');
    if (window.translations[lang] && window.translations[lang][key]) {
      element.placeholder = window.translations[lang][key];
    }
  });

  // Traducir atributos de iframes
  const iframeElements = document.querySelectorAll('iframe[data-translate]');
  iframeElements.forEach((iframe) => {
    const key = iframe.getAttribute('data-translate');
    if (window.translations[lang] && window.translations[lang][key]) {
      iframe.setAttribute('title', window.translations[lang][key]);
    }
  });

  // Actualizar bandera e idioma en el botón
  const languageButton = document.getElementById('languageButton');

  const languages = {
    en: {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg',
      text: 'EN'
    },
    es: {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
      text: 'ES'
    },
    fr: {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
      text: 'FR'
    },
    gr: {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png',
      text: 'GR'
    }
  };
  const langData = languages[lang] || languages['es'];
  languageButton.innerHTML = `
    <span>${langData.text}</span>
    <img src="${langData.flag}" alt="${lang}" class="flag">
  `;

  // Guardar el idioma seleccionado en localStorage
  localStorage.setItem('selectedLanguage', lang);
}

// Traducir el contenido dentro del modal
async function translateModalContent(lang) {
  const modals = document.querySelectorAll('.modal2, .modal3');
  modals.forEach((modal) => {
    modal.querySelectorAll('[data-translate]').forEach((element) => {
      const key = element.getAttribute('data-translate');
      if (window.translations[lang] && window.translations[lang][key]) {
        if (element.tagName.toLowerCase() === 'a') {
          element.textContent = window.translations[lang][key];
        } else {
          element.textContent = window.translations[lang][key];
        }
      }
    });

    modal.querySelectorAll('[data-translate-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-translate-placeholder');
      if (window.translations[lang] && window.translations[lang][key]) {
        element.placeholder = window.translations[lang][key];
      }
    });
  });
}

// Traducir contenido dinámico (categorías y descripciones)
async function translateDynamicContent(lang) {
  const translations = window.translations[lang] || window.translations['en'];

  // Traducir títulos de video
  document.querySelectorAll('.video-card h2').forEach((element) => {
    const originalText = element.textContent.trim();
    const translatedText = translations[originalText] || originalText;
    element.textContent = translatedText;
  });

  // Traducir título de la categoría
  const categoryTitle = document.getElementById('category-title');
  if (categoryTitle) {
    const originalText = categoryTitle.textContent.replace('Categoría: ', '').trim();
    const translatedText = translations[originalText] || originalText;
    categoryTitle.textContent = `Categoría: ${translatedText}`;
  }

  // Traducir descripciones de categorías dinámicas
  document.querySelectorAll('.imagen-categoria').forEach((element) => {
    const descriptionKey = element.getAttribute('data-descripcion');
    if (descriptionKey && translations[descriptionKey]) {
      const descriptionElement = element.nextElementSibling || element.parentElement.querySelector('.descripcion-categoria');
      if (descriptionElement) {
        descriptionElement.textContent = translations[descriptionKey];
      } else {
        console.warn(`No se encontró un elemento para mostrar la descripción de: ${descriptionKey}`);
      }
    } else {
      console.warn(`No se encontró traducción para la clave: ${descriptionKey}`);
    }
  });
}

// Generar contenido dinámico de videos
async function generateDynamicContent() {
  const videoGrid = document.querySelector('.video-grid');
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch(window.location.pathname.includes('tiposCategorias') ? '../../videos/videos.json' : '../videos.json');
    const data = await response.json();
    const videos = data.videos;

    if (!videos || !videos.length) {
      errorMessage.style.display = 'block';
      return;
    }

    videoGrid.innerHTML = ''; // Limpiar contenedor
    videos.forEach((video) => {
      const videoCard = document.createElement('div');
      videoCard.className = 'video-card';
      videoCard.innerHTML = `
        <a href="${video.url}">
          <img src="${video.image}" alt="Video Thumbnail" class="video-thumbnail">
          <h2 data-translate>${video.title}</h2>
          <span class="video-duration">${video.duration}</span>
        </a>
      `;
      videoGrid.appendChild(videoCard);
    });

    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    await translateDynamicContent(savedLang); // Traducir contenido dinámico
  } catch (error) {
    console.error('Error al cargar los videos:', error);
    if (errorMessage) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = '';
    }
  }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';

  await loadTranslations();
  await generateDynamicContent();
  await translatePage(savedLang);
  await translateModalContent(savedLang);
  document.querySelectorAll('.imagen-categoria').forEach((element) => {
    const descripcionKey = element.getAttribute('data-descripcion');
    if (descripcionKey && window.translations[savedLang] && window.translations[savedLang][descripcionKey]) {
      element.setAttribute('data-descripcion', window.translations[savedLang][descripcionKey]);
    }
  });

  // Cambiar idioma sin recargar la página
  document.querySelectorAll('.language-option').forEach((button) => {
    button.addEventListener('click', async function () {
      const selectedLang = this.getAttribute('data-lang');
      if (selectedLang) {
        localStorage.setItem('selectedLanguage', selectedLang);
        location.reload(); // Recarga la página automáticamente


        // Aplicar traducciones dinámicamente
        await translatePage(selectedLang);
        await translateDynamicContent(selectedLang);
        await translateModalContent(selectedLang);

        // Actualizar el botón de idioma
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
          dropdown.classList.remove('open');
        }
      }
    });
  });

  document.getElementById('languageButton').addEventListener('click', function () {
    const dropdown = document.querySelector('.language-dropdown');
    dropdown.classList.toggle('open');
    

  });

  document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.language-dropdown');
    if (!dropdown.contains(event.target) && event.target.id !== 'languageButton') {
      dropdown.classList.remove('open');
    }
  });
});
