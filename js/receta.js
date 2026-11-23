/* ==========================================
   SPRINT 2 - SESIÓN 15
   PARTE B2 - CLASE RECETA
========================================== */

/**
 * Representa una receta con sus datos y métodos.
 */
export class Receta {

    /**
     * Crea una receta a partir de un objeto con sus datos.
     * @param {Object} datos - Objeto con los datos de la receta.
     */
    constructor(datos) {

        // Copiamos cada campo del objeto recibido.
        this.id = datos.id;
        this.nombre = datos.nombre;
        this.categoria = datos.categoria;

        // Asignamos el tiempo mediante el setter para validarlo.
        this.tiempo = datos.tiempo;

        this.dificultad = datos.dificultad;
        this.raciones = datos.raciones;
        this.fechaUltimaVez = datos.fechaUltimaVez;
    }

    /**
     * Devuelve el tiempo de preparación de la receta.
     * @returns {number} El tiempo en minutos.
     */
    get tiempo() {
        return this._tiempo;
    }

    /**
     * Valida el tiempo antes de guardarlo.
     * @param {number} minutos - El tiempo de preparación en minutos.
     */
    set tiempo(minutos) {

        // Comprobamos que sea un número mayor que 0.
        if (typeof minutos !== "number" || minutos <= 0) {
            throw new Error(`Tiempo no válido en "${this.nombre}": ${minutos}`);
        }

        // Guardamos el tiempo si es válido.
        this._tiempo = minutos;
    }

    /**
     * Calcula el tiempo de preparación en horas y minutos.
     * @returns {string} El tiempo en un formato legible.
     */
    get tiempoTexto() {
        const horas = Math.floor(this.tiempo / 60);
        const minutos = this.tiempo % 60;

        if (horas === 0) {
            return `${minutos} min`;
        }

        if (minutos === 0) {
            return `${horas} h`;
        }

        return `${horas} h ${minutos} min`;
    }

    /**
     * Devuelve la descripción de la receta para mostrarla en la tarjeta.
     * @returns {string} La descripción de la receta.
     */
    descripcion() {
        return `${this.categoria} · ${this.tiempoTexto} · ${this.dificultad} · ${this.raciones} raciones`;
    }

    /* ==========================================
       SPRINT 2 - SESIÓN 15
       RETO 3 - PARTE C
       UN MÉTODO QUE CALCULA
    ========================================== */

    /**
     * Comprueba si la receta está dentro de los últimos días indicados.
     * @param {number} dias - Número de días para considerar una receta reciente.
     * @returns {boolean} true si la receta es reciente, false si no lo es.
     */
    esReciente(dias) {

        const MS_DIA = 24 * 60 * 60 * 1000;

        const fechaReceta = new Date(this.fechaUltimaVez + "T00:00");

        const diasTranscurridos = Math.floor(
            (Date.now() - fechaReceta.getTime()) / MS_DIA
        );

        // Devolvemos true si la receta está dentro del periodo indicado.
        return diasTranscurridos >= 0 && diasTranscurridos <= dias;
    }

}
