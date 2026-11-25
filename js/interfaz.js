// ==========================================
// SPRINT 2 - SESIÓN 14
// PARTE B - B2: IMPORTAR LOS MÓDULOS
// ==========================================

// Importamos los datos originales de las recetas.
import { datosRecetas } from "./datos.js";

// Importamos nuestra clase Receta.
import { Receta } from "./receta.js";

// Importamos nuestra clase gestora.
import { Recetario } from "./recetario.js";

// Importamos las funciones y constantes que necesitamos.
import {
    DIAS_RECIENTE,
    PATRON_NOMBRE,
    fechaLegible,
    ordenar
} from "./logica.js";


/* ==========================================
   SPRINT 2 - SESIÓN 16
   RETO 2 - PARTE B3
   LA INTERFAZ UTILIZA LA CLASE GESTORA
========================================== */

// Creamos el recetario a partir de los datos originales.
const recetario = Recetario.desdeDatos(datosRecetas);


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

    // C: Utilizamos el método de nuestra clase Receta para comprobar si es reciente.
    if (elemento.esReciente(DIAS_RECIENTE)) {

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


/* ==========================================
   SPRINT 2 - SESIÓN 17
   RETO 2 - PARTE B2
   PANEL DE ESTADÍSTICAS
========================================== */

// Mostramos las estadísticas de nuestra colección.
function pintarEstadisticas() {

    // Buscamos el panel de estadísticas.
    const panel = document.querySelector("#estadisticas");

    // Vaciamos el panel.
    panel.replaceChildren();

    // Obtenemos las estadísticas de la clase gestora.
    const datos = recetario.estadisticas();

    // Comprobamos si hay recetas.
    if (datos === null) {

        panel.textContent = "No hay recetas para calcular las estadísticas.";
        return;
    }

    // Preparamos los textos que mostraremos en el panel.
    const lineas = [
        "Tiempo total: " + datos.total + " minutos.",
        "Tiempo medio: " + datos.media.toFixed(1) + " minutos.",
        "Recetas fáciles: " + datos.faciles
    ];

    // Creamos un elemento li por cada estadística.
    for (const linea of lineas) {

        const li = document.createElement("li");

        li.textContent = linea;

        panel.append(li);
    }
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
    const encontradas = recetario.buscar(textoBuscado);

    // Después ordenamos los resultados.
    const ordenadas = ordenar(encontradas, criterio);

    // Finalmente mostramos las recetas.
    pintar(ordenadas);

    pintarResumen(ordenadas.length);

    // B3: Actualizamos el panel de estadísticas.
    pintarEstadisticas();
}


// Mostramos cuántas recetas aparecen del total.
function pintarResumen(mostrados) {

    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {

        resumen.textContent = "Mostrando " + mostrados + " de " + recetario.total + " recetas.";

    } else {

        resumen.textContent = 'No hay recetas que contengan "' + textoBuscado + '".';
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
        `${nombre}=${texto}; max-age=${segundos}; path=/`;
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

    // B3: Añadimos la receta utilizando la clase gestora.
    const nuevoId = recetario.anadir(nuevaReceta);

    // Mostramos un mensaje de confirmación.
    aviso.textContent =
        "Receta añadida correctamente. ID: " + nuevoId;

    aviso.style.color = "green";

    // Actualizamos las tarjetas y las estadísticas.
    actualizar();

    // Limpiamos los campos del formulario.
    document.querySelector("#nuevoNombre").value = "";
    document.querySelector("#nuevoTiempo").value = "";
    document.querySelector("#nuevasRaciones").value = "";
    document.querySelector("#nuevaFecha").value = "";
});


// Mostramos las recetas y las estadísticas al iniciar la página.
actualizar();