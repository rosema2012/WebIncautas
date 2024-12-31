

document.addEventListener("DOMContentLoaded", function () {
    const modalContainer = document.getElementById("modal-container");

    // Obtener elementos del DOM
    const imagenes = document.querySelectorAll(".imagen-categoria");
    const descripcionCategoria = document.getElementById("descripcion-categoria");
    const tituloCategoria = document.getElementById("titulo-categoria");
    const textoCategoria = document.getElementById("texto-categoria");
    const botonCategoria = document.getElementById("boton-categoria");
    const mensajeDefault = document.getElementById("mensaje-default"); // Mensaje por defecto
    let enlaceCategoria = ""; // Variable para almacenar el enlace dinámico

    const userProfile = document.getElementById("user-profile");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const userNameElement = document.getElementById('user-name');
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        console.log(`[DEBUG] Nombre de usuario recuperado: ${storedUsername}`);
        userNameElement.textContent = storedUsername;
    } else {
        console.log("[DEBUG] Nombre de usuario no encontrado, llamando a fetchUserData...");
        fetchUserData(); // Si no está en localStorage, hacer fetch
    }

    userProfile.addEventListener("click", () => {
        // Alternar la visibilidad del menú desplegable
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener("click", (event) => {
        if (!userProfile.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Acción de logout
    const logoutLink = document.getElementById("logout-link");
    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("authToken"); // Elimina el token
        localStorage.removeItem("username"); // Elimina el nombre del usuario
        window.location.href = "/index.html"; // Redirige al login
    });

    // Añadir evento de clic a cada imagen
    imagenes.forEach(function (imagen) {
        imagen.addEventListener("click", function () {
            // Manejo de clases para activar/desactivar la imagen
            if (imagen.classList.contains('active')) {
                imagen.classList.remove('active');
            } else {
                // Desactivar cualquier otra imagen activa
                imagenes.forEach(img => img.classList.remove('active'));
                // Activar la imagen seleccionada
                imagen.classList.add('active');
            }

            // Obtener los datos de la imagen seleccionada
            const titulo = imagen.getAttribute("data-titulo");
            const descripcion = imagen.getAttribute("data-descripcion");
            enlaceCategoria = imagen.getAttribute("data-enlace"); // Guardar el enlace

            if (titulo && descripcion && enlaceCategoria) {
                // Ocultar el mensaje por defecto
                mensajeDefault.style.display = "none";

                // Mostrar y actualizar la descripción dinámica
                tituloCategoria.textContent = titulo;
                textoCategoria.textContent = descripcion;
                botonCategoria.style.display = "inline-block";
                tituloCategoria.style.display = "block";
                textoCategoria.style.display = "block";

                // Mostrar la sección de descripción
                descripcionCategoria.style.display = "block";
            }
        });
    });

    // Añadir evento al botón para redirigir al enlace
    botonCategoria.addEventListener("click", function () {
        if (enlaceCategoria) {
            window.location.href = enlaceCategoria; // Redirige a la página seleccionada
        }
    });


    async function fetchUserData() {
        console.log("[DEBUG] Iniciando fetchUserData...");
    
        try {
            // Obtiene el token desde localStorage
            console.log("[DEBUG] Intentando obtener el token del localStorage...");
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.warn("[DEBUG] No se encontró token. Redirigiendo al login.");
                throw new Error('No se encontró token. Redirigiendo al login.');
            }
            console.log(`[DEBUG] Token encontrado: ${token}`);
    
            // Realiza la solicitud al backend
            console.log("[DEBUG] Enviando solicitud GET a /api/auth/me...");
            const response = await fetch('http://localhost:8081/api/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Agregar un log para verificar el estado y contenido de la respuesta
            console.log("[DEBUG] Respuesta completa:", response);
            const textResponse = await response.text();
            console.log("[DEBUG] Respuesta como texto:", textResponse);
            
            // Si la respuesta es válida, intenta convertirla en JSON
            const data = JSON.parse(textResponse);
            console.log('[DEBUG] Datos recibidos:', data);
    
            // Actualiza el DOM con los datos del usuario
            console.log("[DEBUG] Intentando actualizar el DOM...");
            const userNameElement = document.getElementById('user-name');
            const userImageElement = document.getElementById('user-image');
    
            if (userNameElement) {
                console.log(`[DEBUG] Actualizando nombre de usuario en el DOM: ${data.username}`);
                userNameElement.textContent = data.username;
                localStorage.setItem('username', data.username); // Guardar el nombre en localStorage
            } else {
                console.warn("[DEBUG] Elemento 'user-name' no encontrado en el DOM.");
            }
    
            if (userImageElement) {
                console.log(`[DEBUG] Actualizando imagen de usuario en el DOM: ${data.image || '/fotos/photo.png'}`);
                userImageElement.src = data.image || '/fotos/photo.png';
            } else {
                console.warn("[DEBUG] Elemento 'user-image' no encontrado en el DOM.");
            }
        } catch (error) {
            // Manejo de errores
            console.error("[DEBUG] Error capturado:", error);
            if (window.location.pathname !== '/index.html') {
                console.warn("[DEBUG] Redirigiendo al login...");
                window.location.href = 'index.html';
            }
            alert("Ha ocurrido un error");
        }
    }
    
    fetchUserData();

});
