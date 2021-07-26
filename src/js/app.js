document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
    navegacionFija();
});

function navegacionFija() {

    const barra = document.querySelector('.header');

    // Registrar el Intersection observer
    const observer = new IntersectionObserver( function( entries) {
        // entries da la informacion del elemento a observar
        if (entries[0].isIntersecting){
            barra.classList.remove('fijo');
            console.log("Fuera");
        } else {
            console.log("Dentro");
            barra.classList.add('fijo');
        }
    });

    // Elementos a observar
    observer.observe(document.querySelector('.sobre-festival'));
}


function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    /* No se puede atar un eventListener a listado de nodos */
    enlaces.forEach( function( enlace ){
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);
            
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}