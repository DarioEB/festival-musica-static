document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
})

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    
    for( let i = 1; i <= 12; i++ ){
        const imagen = document.createElement('IMG'); /* Creamos un etiqueta imagen */
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; /* Le agrega un atributo nuevo llamada data-imagen-id */

        // Añadir la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI'); /* Creo un <li> */
        lista.appendChild(imagen);                  /* Dentro del <li> agrego la imagen */

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    // console.log(typeof(e.target.dataset.imagenId));
    const id = parseInt( e.target.dataset.imagenId );

    // Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    // Cuando se da click, cerrar la iamgen
    overlay.onclick = function() {
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    // Cuando se presiona se cierra la imagen
    cerrarImagen.onclick = function() {
        overlay.remove();
    }

    overlay.appendChild(cerrarImagen);

    // Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}