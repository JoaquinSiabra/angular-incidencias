'use strict';

angular.module('incidenciasApp')
  .controller('IncidenciasCtrl', ['$scope','Incidencia', 'Importancia','Estado',   
   function ($scope, Incidencia, Importancia, Estado) {

	$scope.incidencias = Incidencia.getAll();
	$scope.incidencia = '';

	$scope.importancias = Importancia.getAll();
	$scope.estados = Estado.getAll();

    $scope.create = function (incidencia) {
	  Incidencia.create(incidencia);
	  $scope.incidencias = Incidencia.getAll();
	  $scope.incidencia = '';
    };
	
  }])
  .controller('IncidenciaCtrl', ['$scope','$routeParams','$location','localStorageService','Incidencia','Importancia','Estado','Historia',
  	function ($scope, $routeParams,$location,localStorageService, Incidencia, Importancia, Estado, Historia) {
	
	$scope.incidencia=Incidencia.get($routeParams.id);
	
	$scope.importancias = Importancia.getAll();
	$scope.estados = Estado.getAll();
	$scope.comentario = "";
	
	$scope.update = function (incidencia) {

	  incidencia = Historia.actualiza(incidencia,$scope.comentario);
	  Incidencia.update(incidencia);
	  
	  $location.path( "/incidencias" );
    };
	
  }]);
