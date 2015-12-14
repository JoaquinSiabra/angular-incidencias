Gestión de Incidencias
======================

Aplicación sencilla para la gestión de incidencias implementada en AngularJS

Instalación
------------
- **npm install**
- **bower install**
- **grunt serve** o **grunt test**

Historias de usuario
--------------------

### 1. Crear una incidencia
**Como** cliente **quiero** crear una incidencia
**para** resolver un problema con un proyecto.

**Aceptación**:

1. El formulario me obligará a introducir: 
- un resumen de la incidencia,
- un texto descriptivo. 

2. El formulario me permitirá introducir el nivel de criticidad de la incidencia(bajo, medio, alto, crítico)

3. El sistema recogerá transparentemente
- el autor de la incidencia.
- la fecha de reporte.

4. El sistema asignará transparentemente a la nueva incidencia el estado "Abierta".

5. El sistema inicializará transparentemente el historial de la incidencia (con "Abierta").

### 2. Cambiar una incidencia
**Como** cliente o desarrollador del proyecto **quiero** cambiar el estado de la incidencia **para** informar al cliente del proceso de resolución

**Aceptación**:
El formulario me obligará a introducir: 
- el estado al que pasa la incidencia (abierta, resolviéndose, se necesita
feedback, cerrada, resuelta, duplicada o no se resuelve)
- un comentario que represente el porqué del cambio de estado. 


### 3. Mostrar el histórico de una incidencia
**Como** cliente o director de proyecto **quiero** seguir el histórico de una incidencia en el sistema **para** monitorizar nuestros procesos de resolución de incidencias

**Aceptación**:
El listado de cambios mostrará, para cada cambio:
- el estado al que pasa la incidencia (de entre los permitidos en la historia 2)
- la fecha en la que se pasó a ese estado
- el usuario que hizo el cambio de estado
- el comentario explicativo del cambio

Esta versión: v1.0
------------

**Implementa**:
- las historias 1, 2 y 3 sin tener en cuenta el tipo de usuario
- diseño mínimamente adaptativo (el número de columnas de las tablas depende del tamaño de la pantalla)
- pruebas unitarias con Jasmine para las historias 1, 2 y 3

**Para mejorar**:
- las historias 1, 2 y 3, teniendo en cuenta el tipo de usuario (se muestran/ocultan opciones dependiendo de si se es: cliente, desarrollador, director)
- diseño adaptativo sin tablas
- unificar la view 'incidencia.html' y el formulario en 'incidencias.html' con import o directiva
- validación completa de formularios
- validación en las transiciones de estados de la incidencia

*Brahmsianitas vobiscum!*