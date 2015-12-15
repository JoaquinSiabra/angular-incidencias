'use strict';

angular.module('incidenciasApp')

  .controller('IncidenciasCtrl', ['$scope','Incidencia', 'Importancia','Estado',   
   function ($scope, Incidencia, Importancia, Estado) {

	/*Al haberse implementado la gestión de las entidades en memoria no hay asincronía.
	En otros casos, y si hubiera que esperar a tener las incidencias para realizar 
	alguna tarea, tendríamos que hacer algo como esto:
  
		$scope.incidencias = Incidencia.getAll(function(incidencias){
			//Aquí se podría realizar las tareas necesarias sobre 'incidencias',
			//o aquellas otras que dependan de que las incidencias estén cargadas.
		});				
	*/
		
		
		$scope.incidencias = Incidencia.getAll();
		$scope.incidencia = '';

		$scope.importancias = Importancia.getAll();
		$scope.estados = Estado.getAll();

		$scope.create = function (incidencia) {			
		  var creada = Incidencia.create(incidencia);
		  $scope.incidencias = Incidencia.getAll();
		  $scope.incidencia = '';
		  
		  return creada;   //Devolvemos la incidencia creada para permitir el testing
		};
	
  }])
  
  .controller('IncidenciaCtrl', ['$scope','$routeParams','$location','localStorageService','Incidencia','Importancia','Estado','Historia',
  	function ($scope, $routeParams,$location,localStorageService, Incidencia, Importancia, Estado, Historia) {
	
		$scope.incidencia=Incidencia.get($routeParams.id);
		
		$scope.importancias = Importancia.getAll();
		$scope.estados = Estado.getAll();
		$scope.comentario = "";
		
		$scope.update = function (incidencia) {			
		  Incidencia.update($scope.actualizaHistoria(incidencia,$scope.comentario));		  
		  $location.path( "/incidencias" );
		};
		
		$scope.actualizaHistoria = function (incidencia,comentario) {		
		  if (!comentario) return null;	  		  
		  return Historia.actualiza(incidencia,comentario);	 //Devolvemos la incidencia actualizada por el testing	  
		};
	
  }]);
