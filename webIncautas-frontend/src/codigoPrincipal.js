

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
    
});