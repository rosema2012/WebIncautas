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

function getModalCSSPath() {
    // Obtén la URL actual
    const currentPath = window.location.pathname;

    // Si estamos en la carpeta "paginacion"
    if (currentPath.includes('/paginacion/')) {
        return '../../verification-age/age-verification.css'; // Ruta al CSS desde "paginacion"
    }

    // Si estamos en la carpeta "videos/vdIndv"
    if (currentPath.includes('/videos/vdIndv/')) {
        return '../../../verification-age/age-verification.css'; // Ruta al CSS desde "vdIndv"
    }

    // Si estamos en la carpeta "categorias/tiposCategorias"
    if (currentPath.includes('/categorias/tiposCategorias/')) {
        return '../../../verification-age/age-verification.css'; // Ruta al CSS desde "tiposCategorias"
    }

    // Si estamos en la carpeta "categorias"
    if (currentPath.includes('/categorias/')) {
        return '../verification-age/age-verification.css'; // Ruta al CSS desde "categorias"
    }

    // Si estamos en la carpeta "login"
    if (currentPath.includes('/Login/')) {
        return '../verification-age/age-verification.css'; // Ruta al CSS desde "login"
    }

    // Si estamos en la carpeta "contacts"
    if (currentPath.includes('/contactos/')) {
        return '../verification-age/age-verification.css'; // Ruta al CSS desde "contacts"
    }

    // Si estamos en la carpeta "search"
    if (currentPath.includes('/search/')) {
        return '../verification-age/age-verification.css'; // Ruta al CSS desde "contacts"
    }

    // Si estamos en cualquier otra carpeta que puedas agregar (personaliza según tus necesidades)
    if (currentPath.includes('/otro-directorio/')) {
        return './verification-age/age-verification.css'; // Ruta al CSS desde "otro-directorio"
    }

    // Ruta por defecto si no estamos en ninguna de las carpetas especificadas
    return './verification-age/age-verification.css'; // Ruta al CSS desde otras carpetas
}


// Función para cargar el archivo CSS del modal
function loadModalCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = getModalCSSPath(); // Llama a la función que devuelve la ruta dinámica del CSS
    document.head.appendChild(link); // Agregarlo al <head> de la página
}

// Función para determinar la ruta dinámica del modal
function getModalPath() {
    // Obtén la URL actual
    const currentPath = window.location.pathname;

    // Si estamos en la carpeta "paginacion"
    if (currentPath.includes('/paginacion/')) {
        return '../../verification-age/age-verification.html';
    }

    // Si estamos en la carpeta "videos/vdIndv"
    if (currentPath.includes('/videos/vdIndv/')) {
        return '../../../verification-age/age-verification.html'; // Ruta al modal desde "vdIndv"
    }

    // Si estamos en la carpeta "categorias/tiposCategorias"
    if (currentPath.includes('/categorias/tiposCategorias/')) {
        return '../../../verification-age/age-verification.html'; // Ruta al modal desde "tiposCategorias"
    }

    // Si estamos en la carpeta "categorias"
    if (currentPath.includes('/categorias/')) {
        return '../verification-age/age-verification.html'; // Ruta al modal desde "categorias"
    }

    // Si estamos en la carpeta "login"
    if (currentPath.includes('/Login/')) {
        return '../verification-age/age-verification.html'; // Ruta al modal desde "login"
    }

    // Si estamos en la carpeta "contacts"
    if (currentPath.includes('/contactos/')) {
        return '../verification-age/age-verification.html'; // Ruta al modal desde "contacts"
    }

    // Si estamos en la carpeta "search"
    if (currentPath.includes('/search/')) {
        return '../verification-age/age-verification.html'; // Ruta al CSS desde "contacts"
    }

    // Si estamos en cualquier otra carpeta que puedas agregar (personaliza según tus necesidades)
    if (currentPath.includes('/otro-directorio/')) {
        return './verification-age/age-verification.html'; // Ruta al modal desde "otro-directorio"
    }

    // Ruta por defecto si no estamos en ninguna de las carpetas especificadas
    return './verification-age/age-verification.html';
}

// Mostrar el modal si no se ha aceptado
document.addEventListener('DOMContentLoaded', () => {
    // Verifica si ya existe la cookie
    if (!getCookie('age_verified')) {
        // Cargar el CSS del modal
        loadModalCSS();

        // Obtener la ruta del modal dinámicamente
        const modalPath = getModalPath();

        // Cargar el modal de verificación de edad
        fetch(modalPath)
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar el modal: ${response.statusText}`);
                return response.text();
            })
            .then(html => {
                // Insertar el modal en el cuerpo
                const modalContainer = document.createElement('div');
                modalContainer.innerHTML = html;
                document.body.appendChild(modalContainer);

                // Configurar eventos del modal
                const modal = document.getElementById("age-modal");
                const enterBtn = document.getElementById("enter-btn");
                const exitBtn = document.getElementById("exit-btn");

                modal.style.display = "flex";

                // Manejar clic en "Entrar"
                enterBtn.addEventListener("click", () => {
                    setCookie('age_verified', 'true', 30); // Guardar cookie por 30 días
                    modal.style.display = "none";
                });

                // Manejar clic en "Salir"
                exitBtn.addEventListener("click", () => {
                    window.location.href = "https://www.google.com"; // Redirigir al usuario
                });
            })
            .catch(error => console.error("Error al cargar el modal:", error));
    }
});
