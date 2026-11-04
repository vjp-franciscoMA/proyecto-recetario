# Mi recetario

## ¿Qué hará la aplicación?

La aplicación permite gestionar un recetario de cocina.

Podemos guardar y consultar diferentes recetas con sus datos principales. También podemos buscar recetas, ordenarlas, consultar estadísticas y añadir nuevas recetas mediante un formulario.

Las funciones se ejecutan en JavaScript y los resultados se muestran tanto en la página web como en la consola del navegador.

## Campos de cada receta

Cada receta tendrá los siguientes campos:

- ID
- Nombre
- Categoría
- Tiempo de preparación
- Dificultad
- Raciones
- Fecha de la última vez

## Trabajo realizado en el Sprint 0

Durante este sprint hemos realizado las siguientes tareas:

- Crear los datos de ejemplo de las recetas.
- Mostrar las recetas con `console.table()`.
- Listar todas las recetas.
- Filtrar recetas según su dificultad y tiempo de preparación.
- Contar las recetas de cada categoría usando `switch`.
- Buscar recetas por texto sin distinguir entre mayúsculas y minúsculas.
- Añadir recetas asignándoles un ID automáticamente.
- Eliminar recetas mediante su ID.
- Calcular estadísticas, como el tiempo total, la media y la receta que más tarda.
- Realizar pruebas para comprobar el funcionamiento de las funciones.

## Trabajo realizado en el Sprint 1

Durante este sprint hemos ampliado la aplicación para que las recetas se puedan consultar y gestionar desde una página web.

Hemos realizado las siguientes tareas:

- Crear la estructura de la página web con HTML.
- Aplicar estilos CSS para organizar y dar formato a las tarjetas de recetas.
- Mostrar las recetas en la página mediante tarjetas creadas con JavaScript y el DOM.
- Mostrar estadísticas del recetario, como el tiempo total, el tiempo medio y la receta que más tarda.
- Incorporar un buscador que permite encontrar recetas por su nombre sin distinguir entre mayúsculas y minúsculas.
- Ordenar las recetas alfabéticamente, por tiempo de preparación y por fecha, de más recientes a más antiguas.
- Actualizar el listado de recetas cuando realizamos una búsqueda o cambiamos el criterio de ordenación.
- Mostrar un resumen con el número de recetas que aparecen y el total de recetas disponibles.
- Guardar mediante cookies el último criterio de ordenación seleccionado y recuperarlo al volver a abrir la aplicación.
- Crear funciones para trabajar con fechas y mostrarlas en un formato legible.
- Destacar visualmente las recetas cuya fecha de última vez está dentro de los últimos 30 días.
- Añadir un formulario para incorporar nuevas recetas.
- Validar el nombre de las recetas mediante una expresión regular que permite entre 2 y 50 letras y espacios.
- Comprobar que el tiempo, las raciones y la fecha estén correctamente indicados.
- Asignar automáticamente un nuevo ID a cada receta añadida.
- Actualizar el listado y las estadísticas después de añadir una receta.

## ¿Cómo se ejecuta?

1. Descargar o clonar el repositorio.
2. Abrir el proyecto con Visual Studio Code.
3. Ejecutar el archivo `index.html` mediante Live Server.
4. Utilizar el buscador, los botones de ordenación y el formulario para gestionar las recetas.
5. Abrir las herramientas de desarrollador del navegador con `F12` y entrar en la pestaña **Consola** para consultar los mensajes y resultados de las pruebas.

La estructura principal del proyecto es:

- `index.html`: estructura de la página web.
- `css/estilos.css`: estilos de la aplicación.
- `js/app.js`: código JavaScript y funcionalidades del recetario.

## Consideraciones sobre los datos

El último criterio de ordenación seleccionado se guarda mediante una cookie durante 30 días, por lo que se mantiene al volver a abrir la aplicación.

Las recetas añadidas mediante el formulario se guardan en el array de JavaScript mientras la página está abierta. Actualmente, no se almacenan de forma permanente, por lo que al recargar la página vuelven a aparecer las recetas iniciales.

## Reparto del trabajo

El proyecto se ha realizado en pareja entre Francisco Montero Acosta y Enrique Montero Acosta.

### Francisco Montero Acosta

**Sprint 0:**

- Creación de la estructura inicial del proyecto.
- Desarrollo de la función `listarTodas()`.
- Desarrollo de la función `filtrar()`.
- Desarrollo de la función `listar()`.
- Desarrollo de la función `anadir()`.
- Realización de pruebas y modificaciones del código.
- Actualización de la documentación del proyecto mediante el README.

**Sprint 1:**

- Desarrollo de la función `pintar()` para mostrar las recetas en la página.
- Desarrollo de los estilos CSS para organizar y presentar las tarjetas.
- Desarrollo de la función `ordenar()` para ordenar las recetas por nombre y tiempo.
- Incorporación del evento del buscador.
- Integración del buscador y los controles de ordenación en la página.
- Modificación de la función `actualizar()` para refrescar los resultados.
- Implementación de las cookies para guardar y recuperar el último criterio de ordenación.
- Desarrollo de la validación del nombre de las recetas mediante expresiones regulares.
- Incorporación del formulario para añadir nuevas recetas y actualización del listado y las estadísticas.

### Enrique Montero Acosta

**Sprint 0:**

- Participación en la creación de los datos de ejemplo.
- Desarrollo de la función `contarPorCategoria()`.
- Desarrollo de la función `buscarPorTexto()`.
- Desarrollo de la función `eliminarPorId()`.
- Desarrollo de la función `estadisticas()`.
- Realización de pruebas y modificaciones del código.

**Sprint 1:**

- Desarrollo de la estructura HTML de la página mediante `index.html`.
- Desarrollo de la función `crearTarjeta()` para generar las tarjetas de las recetas.
- Desarrollo inicial de la función `actualizar()` para gestionar la actualización del listado.
- Desarrollo de la función `pintarResumen()` para mostrar el número de recetas disponibles y las que aparecen en pantalla.
- Incorporación de los eventos de los botones de ordenación.
- Desarrollo y adaptación de las estadísticas para mostrarlas en la página.
- Incorporación de las funciones para trabajar con fechas: `crearFecha()`, `fechaLegible()` y `diasDesde()`.
- Adaptación de las fechas de las recetas al formato `AAAA-MM-DD`.
- Incorporación de la fecha a las tarjetas y destacado visual de las recetas recientes.
- Modificación de la función de ordenación para ordenar las recetas por fecha, de más recientes a más antiguas.

Aunque las tareas estén repartidas, hemos trabajado juntos durante todo el proyecto, ayudándonos y colaborando en el desarrollo de las funciones. Hemos realizado pruebas, revisiones y modificaciones conjuntamente. Por eso, aunque los commits aparezcan a nombre de una sola persona, los dos hemos participado y trabajado conjuntamente en el proyecto.

## Uso de la inteligencia artificial

Hemos utilizado ChatGPT como ayuda para revisar el código, resolver dudas, comprobar que cumplía los requisitos de las actividades y preparar la documentación del proyecto.