// Función para establecer una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Función para obtener una cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}



// Función para determinar la ruta del CSS dinámicamente
function getModalCSSPath() {
    const currentPath = window.location.pathname; // Ruta actual

    if (currentPath.includes('/categorias/tiposCategorias/')) {
        return '/createAccount/createAccount.css';
    }
    if (currentPath.includes('/Login/')) {
        return 'createAccount.css';
    }
    if (currentPath.includes('/categorias/')) {
        return '../createAccount/createAccount.css';
    }

    if (currentPath.includes('/contactos/')) {
        return '../createAccount/createAccount.css';
    }
    if (currentPath.includes('/search/')) {
        return '../createAccount/createAccount.css';
    }
    if (currentPath.includes('/videos/vdIndv/')) {
        return '../../createAccount/createAccount.css';
    }
    if (currentPath.includes('/videos/paginacion/')) {
        return '../../createAccount/createAccount.css';
    }
    if (currentPath.includes('/videos/comments/')) {
        return '../../createAccount/createAccount.css';
    }
    if (currentPath.includes('/verification-age/')) {
        return '../createAccount/createAccount.css';
    }
}

// Función para determinar la ruta del HTML del modal dinámicamente
function getModalHTMLPath() {
    const currentPath = window.location.pathname; // Ruta actual

    if (currentPath.includes('/categorias/tiposCategorias/')) {
        return '/createAccount/createAccount.html';
    }
    if (currentPath.includes('/Login/')) {
        return 'login.html';
    }
    if (currentPath.includes('/categorias/')) {
        return '../createAccount/createAccount.html';
    }
    if (currentPath.includes('catego')) {
        return '../../../createAccount/createAccount.html';
    }
    if (currentPath.includes('/categorias/tiposCategorias/')) {
        return '../../createAccount/createAccount.html';
    }

    if (currentPath.includes('/contactos/')) {
        return '../createAccount/createAccount.html';
    }
    if (currentPath.includes('/search/')) {
        return '../createAccount/createAccount.html';
    }
    if (currentPath.includes('/videos/vdIndv/')) {
        return '../../createAccount/createAccount.html';
    }
    if (currentPath.includes('/videos/paginacion/')) {
        return '../../createAccount/createAccount.html';
    }
    if (currentPath.includes('/videos/comments/')) {
        return '../../createAccount/createAccount.html';
    }
    if (currentPath.includes('/verification-age/')) {
        return '../createAccount/createAccount.html';
    }
    if (currentPath.includes('catego')) {
        return '../../../createAccount/createAccount.html';
    }
    return '/createAccount/createAccount.html'; // Ruta por defecto
}

// Función para cargar dinámicamente el archivo CSS del modal
function loadModalCSS(cssPath) {
    if (!cssPath) {
        console.error('No se proporcionó una ruta para el archivo CSS.');
        return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath; // Ruta al archivo CSS del modal
    document.head.appendChild(link);
}

// Función para cargar el modal HTML en un contenedor específico
function loadModalHTML(modalPath, containerId) {
    return fetch(modalPath)
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
        });
}

// Lógica principal del modal
document.addEventListener('DOMContentLoaded', () => {
    const modalPath = getModalHTMLPath(); // Ruta dinámica al modal HTML
    const cssPath = getModalCSSPath(); // Ruta dinámica al modal CSS

    // Cargar el CSS del modal
    loadModalCSS(cssPath);

    // Cargar el modal HTML en el contenedor "modal-containerIniciarSession"
    loadModalHTML(modalPath, 'createAccountContainer')
        .then(() => {
            // Obtener los elementos
    const openCreateAccountModalButton = document.getElementById('openCreateAccountModal');
    const createAccountModal = document.getElementById('createAccountModal');
    const closeCreateAccountModalButton = document.getElementById('closeCreateAccountModal');

    // Asegurarse de que el modal esté oculto inicialmente
    createAccountModal.style.display = 'none';

    // Abrir el modal de crear cuenta al hacer clic en el enlace "Regístrate aquí"
    openCreateAccountModalButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del enlace
        createAccountModal.style.display = 'flex'; // Mostrar el modal
    });

    // Cerrar el modal de crear cuenta al hacer clic en el botón de cierre
    closeCreateAccountModalButton.addEventListener('click', () => {
        createAccountModal.style.display = 'none';  // Ocultar el modal de crear cuenta
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal


       
                
        })
        .catch(error => console.error('Error al cargar el modal:', error));
});
