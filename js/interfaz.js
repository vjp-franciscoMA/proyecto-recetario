/* ==========================================
   SPRINT 2 - SESIÓN 14
   PARTE B - B2: IMPORTAR LOS MÓDULOS
========================================== */

// Importamos los datos originales de las recetas.
import { datosRecetas } from "./datos.js";

// Importamos nuestra clase Receta.
import { Receta } from "./receta.js";

// Importamos las funciones y constantes que necesitamos.
import {
    DIAS_RECIENTE,
    PATRON_NOMBRE,
    fechaLegible,
    diasDesde,
    buscarPorTexto,
    anadir,
    estadisticas,
    ordenar
} from "./logica.js";


/* ==========================================
   SPRINT 2 - SESIÓN 15
   RETO 2 - PARTE B3
   LA COLECCIÓN, HECHA DE INSTANCIAS
========================================== */

// B3: Creamos un array para guardar las instancias de Receta.
const recetas = [];

// B3: Convertimos cada objeto de datos en una instancia de la clase Receta.
for (const datos of datosRecetas) {
    recetas.push(new Receta(datos));
}


/* ==========================================
   SPRINT 2 - SESIÓN 15
   RETO 2 - PARTE B4
   LA TARJETA UTILIZA LA CLASE
========================================== */


/* ------------------------------------------
   FUNCIONES PARA MOSTRAR LAS RECETAS
------------------------------------------ */

// Creamos una tarjeta para cada receta.
function crearTarjeta(elemento) {

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    // Creamos el título con el nombre de la receta.
    const titulo = document.createElement("h3");
    titulo.textContent = elemento.nombre;

    // B4: Creamos un párrafo para mostrar la descripción de la receta.
    const datos = document.createElement("p");

    // B4: Utilizamos el método descripcion() de nuestra clase Receta.
    datos.textContent = elemento.descripcion();

    // Añadimos la fecha de última vez.
    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(elemento.fechaUltimaVez);

    // Comprobamos si la receta es reciente.
    if (diasDesde(elemento.fechaUltimaVez) <= DIAS_RECIENTE) {

        tarjeta.classList.add("reciente");
    }

    // Añadimos todos los datos a la tarjeta.
    tarjeta.append(titulo, datos, fecha);

    return tarjeta;
}


// Pintamos todas las recetas en la página.
function pintar(lista) {

    const listado = document.querySelector("#listado");

    // Borramos las tarjetas anteriores.
    listado.replaceChildren();

    // Creamos y añadimos una tarjeta por cada receta.
    for (const elemento of lista) {

        const tarjeta = crearTarjeta(elemento);

        listado.append(tarjeta);
    }

    document.querySelector("#resumen").textContent =
        "Hay " + lista.length + " recetas.";
}


/* ------------------------------------------
   ESTADÍSTICAS EN LA PÁGINA
------------------------------------------ */

// Mostramos las estadísticas de nuestra colección.
function pintarEstadisticas(lista) {

    const resultado = estadisticas(lista);
    const elemento = document.querySelector("#estadisticas");

    // Comprobamos si hay recetas.
    if (resultado === null) {

        elemento.textContent = "No hay recetas para calcular las estadísticas.";
        return;
    }

    // Mostramos los resultados.
    elemento.textContent =
        "Tiempo total: " + resultado.total + " minutos. " +
        "Tiempo medio: " + resultado.media.toFixed(1) + " minutos. " +
        "Receta que más tarda: " + resultado.maximo.nombre +
        " (" + resultado.maximo.tiempo + " minutos).";
}


/* ------------------------------------------
   BUSCADOR Y ORDENACIÓN
------------------------------------------ */

// Guardamos el texto buscado y el criterio de orden.
let textoBuscado = "";
let criterio = "ninguno";


// Actualizamos las recetas que aparecen en la página.
function actualizar() {

    // Primero buscamos las recetas que coinciden.
    const encontradas = buscarPorTexto(recetas, textoBuscado);

    // Después ordenamos los resultados.
    const ordenadas = ordenar(encontradas, criterio);

    // Finalmente mostramos las recetas.
    pintar(ordenadas);

    pintarResumen(ordenadas.length);
}


// Mostramos cuántas recetas aparecen del total.
function pintarResumen(mostrados) {

    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {

        resumen.textContent =
            "Mostrando " + mostrados + " de " + recetas.length + " recetas.";

    } else {

        resumen.textContent =
            'No hay recetas que contengan "' + textoBuscado + '".';
    }
}


// Escuchamos lo que escribimos en el buscador.
const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", () => {

    textoBuscado = buscador.value;

    actualizar();
});


/* ------------------------------------------
   COOKIES: RECORDAR EL ÚLTIMO ORDEN
------------------------------------------ */

// Guardamos una cookie con el nombre, valor y duración indicados.
function guardarCookie(nombre, valor, dias) {

    const segundos = dias * 24 * 60 * 60;

    const texto = encodeURIComponent(valor);

    document.cookie =
        `nombre={texto}; max-age=${segundos}; path=/`;
}


// Leemos el valor de una cookie.
function leerCookie(nombre) {

    const partes = document.cookie.split("; ");

    for (const parte of partes) {

        const [clave, valor] = parte.split("=");

        if (clave === nombre) {

            return decodeURIComponent(valor);
        }
    }

    return null;
}


// Elegimos un orden, lo guardamos y actualizamos la página.
function elegirOrden(nuevo) {

    criterio = nuevo;

    guardarCookie("orden", criterio, 30);

    actualizar();
}


// Escuchamos el botón para ordenar por nombre.
document.querySelector("#ordenNombre").addEventListener("click", () => {

    elegirOrden("nombre");
});


// Escuchamos el botón para ordenar por tiempo.
document.querySelector("#ordenTiempo").addEventListener("click", () => {

    elegirOrden("tiempo");
});


// Escuchamos el botón para ordenar por fecha.
document.querySelector("#ordenFecha").addEventListener("click", () => {

    elegirOrden("fecha");
});


// Recuperamos el último orden guardado.
criterio = leerCookie("orden") ?? "ninguno";


/* ==========================================
   SPRINT 2 - SESIÓN 15
   RETO 2 - PARTE B4
   FORMULARIO: CREAR RECETAS CON LA CLASE
========================================== */


/* ------------------------------------------
   FORMULARIO PARA AÑADIR RECETAS
------------------------------------------ */

// Buscamos el botón para añadir una receta.
const botonAnadir = document.querySelector("#anadirReceta");


// Escuchamos el evento click del botón.
botonAnadir.addEventListener("click", () => {

    // Recogemos los datos escritos en el formulario.
    const nombre = document.querySelector("#nuevoNombre").value.trim();
    const categoria = document.querySelector("#nuevaCategoria").value;
    const tiempo = Number(document.querySelector("#nuevoTiempo").value);
    const dificultad = document.querySelector("#nuevaDificultad").value;
    const raciones = Number(document.querySelector("#nuevasRaciones").value);
    const fecha = document.querySelector("#nuevaFecha").value;

    const aviso = document.querySelector("#avisoNombre");

    // Comprobamos si el nombre cumple nuestro patrón.
    if (!PATRON_NOMBRE.test(nombre)) {

        aviso.textContent =
            "Nombre no válido. Escribe entre 2 y 50 letras.";

        aviso.style.color = "red";

        return;
    }

    // Comprobamos que los demás campos tengan datos correctos.
    if (tiempo <= 0 || raciones <= 0 || fecha === "") {

        aviso.textContent =
            "Completa todos los campos correctamente.";

        aviso.style.color = "red";

        return;
    }

    // B4: Creamos un objeto con los datos de la nueva receta.
    const datosNuevaReceta = {
        nombre: nombre,
        categoria: categoria,
        tiempo: tiempo,
        dificultad: dificultad,
        raciones: raciones,
        fechaUltimaVez: fecha
    };

    // B4: Creamos una instancia de la clase Receta con esos datos.
    const nuevaReceta = new Receta(datosNuevaReceta);

    // Añadimos la instancia a nuestra colección y le asignamos un ID.
    const nuevoId = anadir(recetas, nuevaReceta);

    // Mostramos un mensaje de confirmación.
    aviso.textContent =
        "Receta añadida correctamente. ID: " + nuevoId;

    aviso.style.color = "green";

    // Actualizamos las tarjetas y las estadísticas.
    actualizar();
    pintarEstadisticas(recetas);

    // Limpiamos los campos del formulario.
    document.querySelector("#nuevoNombre").value = "";
    document.querySelector("#nuevoTiempo").value = "";
    document.querySelector("#nuevasRaciones").value = "";
    document.querySelector("#nuevaFecha").value = "";
});


// Mostramos las recetas al iniciar la página.
pintarEstadisticas(recetas);
actualizar();