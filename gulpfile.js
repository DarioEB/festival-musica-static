// const { series, parallel } = require('gulp'); /* require('') funciona para importar paquetes con nodejs */

// function hola( done ) {
//     console.log("Hola mundo");

//     done(); /* Gulp le indica que esta función ya sido ejecutada */
// }

// function javascript( done ) {
//     console.log("Compilando Javascript");

//     done();
// }

// exports.hola = hola
// exports.javascript = javascript;

// exports.tareas = series( hola, javascript);
// /*  Con parallel todas la tareas inician al mismo tiempo,
// pero cada uno tarda su tiempo requirido */
// exports.tareas = parallel( hola, javascript); 


// exports.default = series ( hola, javascript); /* Gulp busca la tarea que tiene como default */

/*  Compilar SASS con Gulp */
const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notifica = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
/* npm install --save-dev autoprefixer */
/* npm install --save-dev gulp-postcss */
/* npm install --save-dev gulp-sourcemaps */
/* npm install --save-dev cssnano -- CREA UNA VERSION OPTIMIZADA DEL CSS */

// Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
/* npm install --save-dev gulp-terser-js */
const terser = require('gulp-terser-js');
/* npm install --save-dev gulp- */
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src('src/scss/app.scss')
        .pipe( sourcemaps.init())
        .pipe( sass())
        // .pipe( sass({
        //     outputStyle: 'expanded'
        // }) )
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest('./build/css') )
}
// Funcion que compila SASS
function minificarcss() {
    /* Ubicar los archivos de sass */
    return src('src/scss/base/app.scss')
        /* Aplicar sass */
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        /* exportar el archivo */
        .pipe( dest('./build/css') )
}

/* Para esta funcion utilizamos npm i --save-dev gulp-concat */
function javascript() {
    return src(paths.js)
        .pipe( sourcemaps.init() )
        .pipe( concat('bundle.js') )
        .pipe( terser() )
        .pipe( sourcemaps.write('.'))
        .pipe( rename( {suffix: '.min' }))
        .pipe( dest('./build/js') )
}

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ))
        .pipe( notifica({ message: 'Imagen Minificada'}) );
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp())
        .pipe( dest('./build/img'))
        .pipe( notifica({message: 'Versión webP lista'}))
}

/* Watch toma el archivo y que tarea se va a ejecutar */
/* Al guardar cambios en el archivo scss estos son detectados
    y actualizados automaticamente por watchArchivos */
function watchArchivos() {
    watch( 'src/scss/**/*.scss', css ); // * = La carpeta actual - ** = Todos los archivos con esa extension
    watch( paths.js, javascript);
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);