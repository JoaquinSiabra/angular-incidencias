'use strict';

angular.module('incidenciasApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.sortable',
  'LocalStorageModule'
])
.config(['localStorageServiceProvider', '$routeProvider', function(localStorageServiceProvider, $routeProvider){
    localStorageServiceProvider.setPrefix('ls');
    $routeProvider
      .when('/', {
        templateUrl: 'views/incidencias.html',
        controller: 'IncidenciasCtrl'
      })
	  .when('/modificar/:id', {
        templateUrl: 'views/incidencia.html',
        controller: 'IncidenciaCtrl'
      })
	  .when('/historia/:id', {
        templateUrl: 'views/historia.html',
        controller: 'IncidenciaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
