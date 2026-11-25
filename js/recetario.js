/* ==========================================
   SPRINT 2 - SESIÓN 16
   RETO 2 - PARTE B1
   LA CLASE GESTORA DEL RECETARIO
========================================== */

// Importamos nuestra clase Receta.
import { Receta } from "./receta.js";

// Importamos las funciones que necesitamos.
import { buscarPorTexto, anadir } from "./logica.js";

/**
 * Gestiona la colección de recetas.
 */
export class Recetario {

  /**
   * Crea un recetario a partir de una colección de recetas.
   * @param {Receta[]} recetas - Lista de recetas.
   */
  constructor(recetas) {

    // Guardamos la colección dentro de la clase.
    this._recetas = recetas;
  }

  /* ==========================================
     SPRINT 2 - SESIÓN 16
     RETO 2 - PARTE B2
     MÉTODO STATIC PARA CREAR LA COLECCIÓN
  ========================================== */

  /**
   * Crea un recetario a partir de los datos recibidos.
   * @param {Object[]} datos - Array con los datos de las recetas.
   * @returns {Recetario} Un nuevo recetario con todas las recetas.
   */
  static desdeDatos(datos) {

    // Creamos un array vacío para guardar las recetas.
    const recetas = [];

    // Recorremos los datos recibidos.
    for (const elemento of datos) {

      // Creamos una instancia de Receta por cada objeto.
      recetas.push(new Receta(elemento));
    }

    // Devolvemos un nuevo objeto de la clase Recetario.
    return new Recetario(recetas);
  }

  /**
   * Devuelve cuántas recetas tenemos en la colección.
   * @returns {number} El número total de recetas.
   */
  get total() {

    return this._recetas.length;
  }

  /**
   * Devuelve una copia de la lista de recetas.
   * @returns {Receta[]} La copia de la colección.
   */
  listar() {

    return [...this._recetas];
  }

  /**
   * Añade una receta a la colección.
   * @param {Receta} elemento - La receta que se quiere añadir.
   * @returns {number} El identificador asignado a la receta.
   */
  anadir(elemento) {

    return anadir(this._recetas, elemento);
  }

  /**
   * Elimina una receta utilizando su identificador.
   * @param {number} id - El identificador de la receta.
   * @returns {boolean} true si se elimina y false si no existe.
   */
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

  /**
   * Busca las recetas cuyo nombre contiene un texto.
   * @param {string} texto - El texto que se busca.
   * @returns {Receta[]} Las recetas que lo contienen.
   */
  buscar(texto) {

    return buscarPorTexto(this._recetas, texto);
  }


    /* ==========================================
       SPRINT 2 - SESIÓN 17
       RETO 2 - PARTE B1
       MÉTODO DE ESTADÍSTICAS
    ========================================== */

    /**
     * Calcula las estadísticas de la colección de recetas.
     * @returns {Object|null} Las estadísticas o null si no hay recetas.
     */
    estadisticas() {

        // Comprobamos si la colección está vacía.
        if (this._recetas.length === 0) {

            return null;
        }

        // Calculamos el tiempo total de todas las recetas con reduce.
        const total = this._recetas.reduce((suma, receta) => suma + receta.tiempo, 0);

        // Calculamos cuántas recetas tienen dificultad fácil con filter.
        const faciles = this._recetas.filter((receta) => receta.dificultad === "Fácil").length;

        // Obtenemos los nombres de las recetas fáciles con filter y map.
        const nombresFaciles = this._recetas.filter((receta) => receta.dificultad === "Fácil").map((receta) => receta.nombre);

        // Calculamos el tiempo medio.
        const media = total / this._recetas.length;

        // Devolvemos todas las estadísticas.
        return {
            total: total,
            media: media,
            faciles: faciles,
            nombresFaciles: nombresFaciles
        };
    }
}