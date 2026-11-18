// Sprint 2 - Sesión 15 - Parte B2

// Creamos y exportamos la clase Receta.
export class Receta {

    // Recibimos un objeto con los datos de la receta.
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

    // Getter: nos permite consultar el tiempo.
    get tiempo() {
        return this._tiempo;
    }

    // Setter: valida el tiempo antes de guardarlo.
    set tiempo(minutos) {

        // Comprobamos que sea un número mayor que 0.
        if (typeof minutos !== "number" || minutos <= 0) {
            throw new Error(`Tiempo no válido en "${this.nombre}": ${minutos}`);
        }

        // Guardamos el tiempo si es válido.
        this._tiempo = minutos;
    }

    // Getter: calculamos el tiempo en horas y minutos para mostrarlo.
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

    // Método: devolvemos una descripción de la receta.
    descripcion() {
        return `${this.nombre} · ${this.categoria} · ${this.tiempoTexto} · ${this.dificultad} · ${this.raciones} raciones`;
    }
}
