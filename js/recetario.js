
/* ==========================================
   SPRINT 2 - SESIÓN 16
   RETO 2 - PARTE B1
   LA CLASE GESTORA DEL RECETARIO
========================================== */

// Importamos nuestra clase Receta.
import { Receta } from "./receta.js";

// Importamos las funciones que necesitamos.
import { buscarPorTexto, anadir } from "./logica.js";


// Creamos y exportamos la clase Recetario.
export class Recetario {

    // Constructor que recibe la colección de recetas.
    constructor(recetas) {

        // Guardamos la colección dentro de la clase.
        this._recetas = recetas;
    }

    // Getter que devuelve cuántas recetas tenemos.
    get total() {

        return this._recetas.length;
    }

    // Método que devuelve una copia de la lista.
    listar() {

        return [...this._recetas];
    }

    // Método para añadir una receta.
    anadir(elemento) {

        return anadir(this._recetas, elemento);
    }

    // Método para eliminar una receta utilizando su ID.
    eliminar(id) {

        // Recorremos la colección.
        for (let i = 0; i < this._recetas.length; i++) {

            // Comprobamos si encontramos el ID.
            if (this._recetas[i].id === id) {

                // Eliminamos la receta.
                this._recetas.splice(i, 1);

                return true;
            }
        }

        // Devolvemos false si no encontramos el ID.
        return false;
    }

    // Método para buscar recetas por su nombre.
    buscar(texto) {

        return buscarPorTexto(this._recetas, texto);
    }
}
