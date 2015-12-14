'use strict';

describe('Controller: IncidenciasCtrl', function () {

  // load the controller's module
  beforeEach(module('incidenciasApp'));

  var IncidenciasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IncidenciasCtrl = $controller('IncidenciasCtrl', {
      $scope: scope
    });
  }));

  it('should have 2 items to start', function () {
    expect(scope.incidencias.length).toBe(2);
  });

  it('should add items to the list', function () {
      scope.incidencia = {"id": 34567,"descripcion":"Prueba"};
      scope.create(scope.incidencia);
      expect(scope.incidencias.length).toBe(3);
    });


});
