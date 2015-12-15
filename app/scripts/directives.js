'use strict';

angular.module('incidenciasApp')

/*He implementado el listado de incidencias con una directiva a modo de ejemplo.*/

.directive('listadoincidencias', function(){
   return {    
      restrict: 'AEC',
	  templateUrl: 'views/tabla.html'
}});
