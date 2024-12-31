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



// Función para determinar la ruta del archivo CSS dinámicamente
function getModalCSSPath(modalType) {
    const currentPath = window.location.pathname; // Ruta actual

    if (modalType === 'login') {
        if (currentPath.includes('/')) {
            return '/Login/login.css';
        }
        if (currentPath.includes('/categorias/tiposCategorias/')) {
            return '/Login/login.css';
        }
        if (currentPath.includes('/Login/')) {
            return 'login.css';
        }
        if (currentPath.includes('/categorias/')) {
            return '../Login/login.css';
        }
        if (currentPath.includes('catego')) {
            return '../../../Login/login.css';
        }
        if (currentPath.includes('/contactos/')) {
            return '../Login/login.css';
        }
        if (currentPath.includes('/search/')) {
            return '../Login/login.css';
        }
        if (currentPath.includes('/videos/vdIndv/')) {
            return '../../Login/login.css';
        }
        if (currentPath.includes('/videos/paginacion/')) {
            return '../../Login/login.css';
        }
        if (currentPath.includes('/videos/paginacion/videos')) {
            return '../../../Login/login.css';
        }
        if (currentPath.includes('/videos/comments/')) {
            return '../../Login/login.css';
        }
        if (currentPath.includes('/verification-age/')) {
            return '../Login/login.css';
        }
        return 'login.css'; // Ruta por defecto
    } else if (modalType === 'createaccount') {
        if (currentPath.includes('/')) {
            return '/createaccount/createaccount.css';
        }
        if (currentPath.includes('/categorias/tiposCategorias/')) {
            return '/createaccount/createaccount.css';
        }
        if (currentPath.includes('/Login/')) {
            return '../createaccount/createaccount.css';
        }
        if (currentPath.includes('/categorias/')) {
            return '../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/contactos/')) {
            return '../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/search/')) {
            return '../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/videos/vdIndv/')) {
            return '../../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/videos/paginacion/')) {
            return '../../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/videos/paginacion/videos')) {
            return '../../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/videos/comments/')) {
            return '../../../createaccount/createaccount.css';
        }
        if (currentPath.includes('/verification-age/')) {
            return '../../createaccount/createaccount.css';
        }
        return 'createaccount/createaccount.css'; // Ruta por defecto
    }
}


// Función para determinar la ruta del HTML del modal dinámicamente
function getModalHTMLPath(modalType) {
    const currentPath = window.location.pathname; // Ruta actual

    if (modalType === 'login') {
        if (currentPath.includes('/')) {
            return '/Login/login.html';
        }
        if (currentPath.includes('/categorias/tiposCategorias/')) {
            return '/Login/login.html';
        }
        if (currentPath.includes('/Login/')) {
            return 'login.html';
        }
        if (currentPath.includes('/categorias/')) {
            return '../Login/login.html';
        }
        if (currentPath.includes('catego')) {
            return '../../../Login/login.html';
        }
        if (currentPath.includes('/categorias/tiposCategorias/')) {
            return '../../Login/login.html';
        }

        if (currentPath.includes('/contactos/')) {
            return '../Login/login.html';
        }
        if (currentPath.includes('/search/')) {
            return '../Login/login.html';
        }
        if (currentPath.includes('/videos/vdIndv/')) {
            return '../../Login/login.html';
        }
        if (currentPath.includes('/videos/paginacion/')) {
            return '../../Login/login.html';
        }
        if (currentPath.includes('/videos/paginacion/videos')) {
            return '../../../Login/login.html';
        }
        if (currentPath.includes('/videos/comments/')) {
            return '../../Login/login.html';
        }
        if (currentPath.includes('/verification-age/')) {
            return '../Login/login.html';
        }
        if (currentPath.includes('catego')) {
            return '../../../Login/login.html';
        }
        return '/Login/login.html';
    } else if (modalType === 'createaccount') {
        if (currentPath.includes('/')) {
            return '/createaccount/createaccount.html';
        }
        if (currentPath.includes('/categorias/tiposCategorias/')) {
            return '/createaccount/createaccount.html';
        }
        if (currentPath.includes('/Login/')) {
            return '../createaccount/createaccount.html';
        }
        if (currentPath.includes('/categorias/')) {
            return '../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/contactos/')) {
            return '../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/search/')) {
            return '../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/videos/vdIndv/')) {
            return '../../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/videos/paginacion/')) {
            return '../../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/videos/paginacion/videos')) {
            return '../../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/videos/comments/')) {
            return '../../../createaccount/createaccount.html';
        }
        if (currentPath.includes('/verification-age/')) {
            return '../../createaccount/createaccount.html';
        }
        return '/createaccount/createaccount.html';
    }


}

// Función para cargar el archivo CSS del modal
function loadModalCSS(cssPath) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath; // Ruta al archivo CSS del modal
    document.head.appendChild(link);
}

// Obtener la ruta del CSS
const loginModalCSSPath = getModalCSSPath('login');
loadModalCSS(loginModalCSSPath);
const createAccountModalCSSPath = getModalCSSPath('createaccount');
loadModalCSS(createAccountModalCSSPath);



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

    const openLoginModalButton = document.getElementById('openModal');
    const loginModalContainer = document.getElementById('modal-containerIniciarSession');
    const createAccountModalContainer = document.getElementById('modal-containerCreateAccount');

    // Asegurarse de que ambos modales están ocultos al principio
    loginModalContainer.style.display = 'none';
    createAccountModalContainer.style.display = 'none';

    // Cargar dinámicamente las rutas de los modales de login y creación de cuenta
    const loginModalHTMLPath = getModalHTMLPath('login');  // Usamos la función para obtener la ruta dinámica
    const createAccountModalHTMLPath = getModalHTMLPath('createaccount');  // Usamos la función para obtener la ruta dinámica

    // Cargar el HTML de los modales de login y creación de cuenta
    loadModalHTML(loginModalHTMLPath, loginModalContainer, 'login');
    loadModalHTML(createAccountModalHTMLPath, createAccountModalContainer, 'create-account');

    // Mostrar el modal de login al hacer clic en el enlace
    openLoginModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal();
    });

    function openLoginModal() {
        loginModalContainer.style.display = 'flex';
    }

    function openCreateAccountModal() {
        createAccountModalContainer.style.display = 'flex';
    }

    // Función para cargar el HTML de un modal
    function loadModalHTML(modalPath, container, modalType) {
        fetch(modalPath)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                console.log("Modal cargado:", modalType);

                if (modalType === 'login') {
                    handleLoginModal(container);
                } else if (modalType === 'create-account') {
                    handleCreateAccountModal(container);
                }
                addModalEventListeners(container);
            })
            .catch(error => {
                console.error("Error al cargar el modal:", error);
            });
    }
    // Asegúrate de que esto esté definido en el alcance global
    window.translate = function (key, lang = 'en') {
        console.log(`Buscando traducción para: ${key} en idioma: ${lang}`);
        if (!translations[lang]) {
            console.warn(`Idioma no soportado: ${lang}. Usando inglés por defecto.`);
            lang = 'en'; // Idioma predeterminado
        }

        const translation = translations[lang]?.[key];
        if (!translation) {
            console.warn(`Clave no encontrada: ${key} en idioma: ${lang}`);
            return key; // Devuelve la clave si no hay traducción
        }

        return translation;
    };


    window.showError = function (messageKey, lang) {
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.style.display = 'block'; // Muestra el mensaje de error
        errorMessageDiv.setAttribute('data-translate', messageKey); // Actualiza la clave de traducción
        errorMessageDiv.textContent = translate(messageKey, lang); // Traduce el mensaje
    };

    window.showError2 = function (messageKey, lang) {
        const errorMessageDiv = document.getElementById('error-message2');
        errorMessageDiv.style.display = 'block'; // Muestra el mensaje de error
        errorMessageDiv.setAttribute('data-translate', messageKey); // Actualiza la clave de traducción
        errorMessageDiv.textContent = translate(messageKey, lang); // Traduce el mensaje
    };

    function hideError() {
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.style.display = 'none'; // Oculta el mensaje de error
        errorMessageDiv.textContent = ''; // Limpia el texto del error
    }



    // Manejar el modal de login
    function handleLoginModal(container) {
        const loginForm = container.querySelector('#login-form');
        console.log("Formulario de login encontrado:", loginForm);

        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const lang = document.documentElement.lang || 'en'; // Detectar idioma de la página
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const errorMessageDiv = document.getElementById('error-message');
                // Limpia el mensaje de error antes de comenzar la validación
                errorMessageDiv.style.display = 'none';
                errorMessageDiv.textContent = '';
                try {
                    const response = await fetch('http://localhost:8081/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password }),
                    });

                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }

                    const data = await response.json();
                    // Almacena el token en localStorage
                    localStorage.setItem('authToken', data.token);
                    console.log('Inicio de sesión exitoso:', data);
                    window.location.href = 'indexPersonal.html';
                    container.style.display = 'none';
                } catch (error) {
                    showError('loginError', lang);
                    return;
                }
            });
        }
    }

    // Manejar el modal de crear cuenta
    function handleCreateAccountModal(container) {
        const createAccountForm = container.querySelector('#create-account-form');
        console.log("Formulario de creación de cuenta encontrado:", createAccountForm);

        if (createAccountForm) {
            createAccountForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const lang = document.documentElement.lang || 'en'; // Detectar idioma de la página
                const username = document.getElementById('newUsername').value;
                const password = document.getElementById('newPassword').value;
                const correo = document.getElementById('email').value;
                const errorMessageDiv = document.getElementById('error-message2');
                // Limpia el mensaje de error antes de comenzar la validación
                errorMessageDiv.style.display = 'none';
                errorMessageDiv.textContent = '';

                // Validaciones en el frontend
                const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/; // Al menos una letra, solo letras y números
                if (!usernameRegex.test(username)) {
                    showError2("usernameError", lang);
                    return;
                }

                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/;

                if (!passwordRegex.test(password)) {
                    showError2('passwordError', lang);
                    return;
                }

                try {
                    const response = await fetch('http://localhost:8081/api/users/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password, correo }),
                    });

                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log('Creación de usuario exitosa:', data);
                    alert('Usuario creado exitosamente');
                    /*fetchUserData();*/
                    container.style.display = 'none';

                    console.log('Datos del usuario:', data);


                } catch (error) {
                    console.error('Error al crear usuario:', error);
                    alert('Error al crear usuario.');
                }
            });
        }
    }


    // Función para añadir los listeners de los botones de cierre
    function addModalEventListeners(container) {

        const closeModalButton = container.querySelector('.close-button');
        const openCreateAccountModalButton = container.querySelector('#openCreateAccountModal');
        const openLoginModalButton = container.querySelector('#loginModalContainer'); // Enlace en createAccount para abrir login
        const modal2content = container.querySelector('.modal2-content'); // Fondo del modal
        const modal3content = container.querySelector('.modal3-content'); // Fondo del modal


        // Cerrar el modal cuando se hace clic en el botón de cierre (X)
        closeModalButton?.addEventListener('click', () => {
            container.style.display = 'none';
        });


        // Abrir el modal de crear cuenta desde el modal de login
        openCreateAccountModalButton?.addEventListener('click', (e) => {
            e.preventDefault();
            container.style.display = 'none'; // Cerrar el modal de login
            openCreateAccountModal(); // Abrir el modal de crear cuenta
        });

        // Abrir el modal de login desde el modal de crear cuenta
        openLoginModalButton?.addEventListener('click', (e) => {
            e.preventDefault();
            container.style.display = 'none'; // Cerrar el modal de creación de cuenta
            openLoginModal(); // Abrir el modal de login
        });

        // Cerrar el modal si se hace clic fuera del área de contenido del modal
        container?.addEventListener('click', (event) => {
            // Verifica si el clic NO fue dentro del contenido del modal ni en el fondo
            if (!modal2content.contains(event.target)) {
                container.style.display = 'none'; // Cierra el modal
            }
        });
        container?.addEventListener('click', (event) => {
            // Verifica si el clic NO fue dentro del contenido del modal ni en el fondo
            if (!modal3content.contains(event.target)) {
                container.style.display = 'none'; // Cierra el modal
            }
        });

    }
});

