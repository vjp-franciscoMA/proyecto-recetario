/* ==========================================
   SPRINT 2 - SESIÓN 14
   PARTE B - B1: MÓDULO DE LÓGICA
========================================== */


// Tiempo máximo para considerar que una receta es rápida.
const TIEMPO_RAPIDO = 30;

// Número de días para considerar una receta reciente.
const DIAS_RECIENTE = 30;

// Patrón para validar el nombre de una receta.
// Permitimos entre 2 y 50 letras y espacios.
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,50}$/;


/* ------------------------------------------
   FUNCIONES PARA TRABAJAR CON FECHAS
------------------------------------------ */

// Creamos una fecha a partir de un texto.
function crearFecha(texto) {

    return new Date(texto + "T00:00");
}


// Convertimos una fecha a un formato legible.
function fechaLegible(texto) {

    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


// Calculamos los días transcurridos desde una fecha.
function diasDesde(texto) {

    const MS_DIA = 24 * 60 * 60 * 1000;

    const ms = Date.now() - crearFecha(texto).getTime();

    return Math.floor(ms / MS_DIA);
}


/* ------------------------------------------
   FUNCIONES DE LOS RETOS ANTERIORES
------------------------------------------ */

// Listamos todas las recetas por consola.
function listarTodas(recetas) {

    console.log("--- Todas las recetas ---");

    // Recorremos todas las recetas.
    for (const receta of recetas) {

        // Comprobamos si la receta es rápida o elaborada.
        const etiqueta = receta.tiempo <= TIEMPO_RAPIDO
            ? "rápida"
            : "elaborada";

        // Mostramos el identificador, nombre y etiqueta.
        console.log(`${receta.id}. ${receta.nombre} - ${etiqueta}`);
    }
}


// Filtramos recetas fáciles según un límite de tiempo.
function filtrar(recetas, limite) {

    let encontradas = 0;

    console.log(`--- Recetas fáciles y de ${limite} minutos o menos ---`);

    // Recorremos todas las recetas.
    for (let i = 0; i < recetas.length; i++) {

        const receta = recetas[i];

        // Comprobamos la dificultad y el tiempo.
        if (receta.dificultad === "Fácil" && receta.tiempo <= limite) {

            console.log(`${receta.id}. ${receta.nombre}`);

            encontradas++;
        }
    }

    return encontradas;
}


// Contamos cuántas recetas tenemos en cada categoría.
function contarPorCategoria(recetas) {

    let platoPrincipal = 0;
    let pasta = 0;
    let arroz = 0;
    let entrante = 0;
    let ensalada = 0;
    let carne = 0;
    let postre = 0;

    // Recorremos las recetas y comprobamos su categoría.
    for (const receta of recetas) {

        switch (receta.categoria) {

            case "Plato principal":
                platoPrincipal++;
                break;

            case "Pasta":
                pasta++;
                break;

            case "Arroz":
                arroz++;
                break;

            case "Entrante":
                entrante++;
                break;

            case "Ensalada":
                ensalada++;
                break;

            case "Carne":
                carne++;
                break;

            case "Postre":
                postre++;
                break;
        }
    }

    // Mostramos los resultados.
    console.log("--- Recetas por categoría ---");
    console.log(`Plato principal: ${platoPrincipal}`);
    console.log(`Pasta: ${pasta}`);
    console.log(`Arroz: ${arroz}`);
    console.log(`Entrante: ${entrante}`);
    console.log(`Ensalada: ${ensalada}`);
    console.log(`Carne: ${carne}`);
    console.log(`Postre: ${postre}`);
}


// Listamos los datos principales de las recetas por consola.
function listar(lista) {

    console.log("--- Listado de recetas ---");

    for (const receta of lista) {

        console.log(
            `${receta.id}. ${receta.nombre} - ${receta.categoria} - ${receta.tiempo} min`
        );
    }
}


/* ------------------------------------------
   FUNCIONES PRINCIPALES DEL RECETARIO
------------------------------------------ */

// Buscamos recetas cuyo nombre contenga un texto.
function buscarPorTexto(lista, texto) {

    const buscado = texto.toLowerCase();

    const resultado = [];

    // Recorremos las recetas.
    for (const receta of lista) {

        const nombre = receta.nombre.toLowerCase();

        // Comprobamos si el nombre contiene el texto buscado.
        if (nombre.includes(buscado)) {

            resultado.push(receta);
        }
    }

    return resultado;
}


// Añadimos una receta y le asignamos un nuevo ID.
function anadir(lista, elemento) {

    let mayorId = 0;

    // Buscamos el ID más alto de la colección.
    for (const receta of lista) {

        if (receta.id > mayorId) {
            mayorId = receta.id;
        }
    }

    // Asignamos el siguiente ID disponible.
    elemento.id = mayorId + 1;

    // Añadimos la receta a la lista.
    lista.push(elemento);

    return elemento.id;
}


// Eliminamos una receta utilizando su ID.
function eliminarPorId(lista, id) {

    for (let i = 0; i < lista.length; i++) {

        // Comprobamos si encontramos el ID.
        if (lista[i].id === id) {

            lista.splice(i, 1);

            return true;
        }
    }

    return false;
}


// Calculamos las estadísticas de las recetas.
function estadisticas(lista) {

    // Comprobamos si la lista está vacía.
    if (lista.length === 0) {
        return null;
    }

    let suma = 0;
    let maximo = lista[0];

    // Recorremos las recetas para sumar tiempos y buscar el máximo.
    for (const receta of lista) {

        suma += receta.tiempo;

        if (receta.tiempo > maximo.tiempo) {
            maximo = receta;
        }
    }

    const media = suma / lista.length;

    // Devolvemos los resultados.
    return {
        total: suma,
        media: media,
        maximo: maximo
    };
}


// Ordenamos las recetas según el criterio recibido.
function ordenar(lista, criterio) {

    // Creamos una copia para no modificar el array original.
    const copia = [...lista];

    if (criterio === "nombre") {

        // Ordenamos alfabéticamente.
        copia.sort((a, b) => a.nombre.localeCompare(b.nombre));

    } else if (criterio === "tiempo") {

        // Ordenamos de menor a mayor tiempo.
        copia.sort((a, b) => a.tiempo - b.tiempo);

    } else if (criterio === "fecha") {

        // Ordenamos de más recientes a más antiguas.
        copia.sort((a, b) =>
            crearFecha(b.fechaUltimaVez) - crearFecha(a.fechaUltimaVez)
        );
    }

    return copia;
}