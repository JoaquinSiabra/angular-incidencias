'use strict';

angular.module('incidenciasApp')
  .controller('IncidenciasCtrl', ['$scope','Incidencia', 'Importancia','Estado',   
   function ($scope, Incidencia, Importancia, Estado) {

	$scope.incidencias = Incidencia.getAll();
	$scope.incidencia = '';

	$scope.importancias = Importancia.getAll();
	$scope.estados = Estado.getAll();

    $scope.create = function (incidencia) {
	  var creada = Incidencia.create(incidencia);
	  $scope.incidencias = Incidencia.getAll();
	  $scope.incidencia = '';
	  return creada;
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
	  return Historia.actualiza(incidencia,comentario);	  	  
    };
	
  }]);
