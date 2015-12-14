'use strict';

describe('Incidencias//', function () {
	 
	beforeEach(module('incidenciasApp'));
		  
	describe('HistoriaUsuario_1_Crear_Incidencia//', function () {

	  // Inicializacion del controlador y del mock del scope
	  var IncidenciasCtrl, scope;
	  beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		IncidenciasCtrl = $controller('IncidenciasCtrl', {
			$scope: scope
		});
	  }));
	
	  it('debería haber 2 incidencias al empezar', function () {
		expect(scope.incidencias.length).toBe(2);
	  });

	  it('debería añadirse una incidencia a las existentes', function () {
		  scope.incidencia = {"resumen":"PruebaResumen","descripcion":"PruebaDescripcion"};
		  scope.create(scope.incidencia);
		  expect(scope.incidencias.length).toBe(3);
	  });

	  it('debería añadirse una incidencia a las existentes con estado abierto por defecto', function () {
		  scope.incidencia = {"resumen":"PruebaResumen","descripcion":"PruebaDescripcion"};
		  var creada = scope.create(scope.incidencia);
		  expect(creada.estado).toBe("Abierta");
	  });
	  
	  //Esto no aparece en la historia de usuario como condición de aceptación, pero parece adecuado
	  it('debería añadirse una incidencia a las existentes con importancia baja por defecto', function () {
		  scope.incidencia = {"resumen":"PruebaResumen","descripcion":"PruebaDescripcion"};
		  var creada = scope.create(scope.incidencia);
		  expect(creada.importancia).toBe("Baja");
	  });
	  
	  it('debería no añadirse una incidencia a las existentes sin resumen y descripcion', function () {
		  scope.incidencia = {};
		  var creada = scope.create(scope.incidencia);
		  expect(creada).toBeNull();
	  });
	  
	  it('debería añadirse una incidencia a las existentes con autor y fecha', function () {
		  scope.incidencia = {"resumen":"PruebaResumen","descripcion":"PruebaDescripcion"};
		  var creada = scope.create(scope.incidencia);
		  expect(creada.fechaCreacion).not.toBeNull();
		  expect(creada.usuario).toBe("User");
	  });

		it('debería añadirse una incidencia a las existentes con historial inicializado a abierta', function () {
		  scope.incidencia = {"resumen":"PruebaResumen","descripcion":"PruebaDescripcion"};
		  var creada = scope.create(scope.incidencia);
		  expect(1).toEqual(creada.historia.length);
		  expect(creada.historia[0].estado).toBe("Abierta");
	  });

	});

	describe('HistoriaUsuario_2_CambiarIncidencia//', function () {
	  
	  var IncidenciaCtrl, scope;
	  beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		IncidenciaCtrl = $controller('IncidenciaCtrl', {
			$scope: scope,
			$routeParams :{id : 93763}
		});
	  }));
	  
	  it('debería modificarse una incidencia si se escribe el motivo del cambio', function () {
		  var actualizada = scope.actualizaHistoria(scope.incidencia,"ComentarioNuevo");
		  expect(actualizada.historia[1].comentario).toBe("ComentarioNuevo");
	  });
	
	  it('debería no modificarse una incidencia si no se escribe el motivo del cambio', function () {
		  var actualizada = scope.actualizaHistoria(scope.incidencia,null);
		  expect(actualizada).toBeNull();
	  });

	});


	describe('HistoriaUsuario_3_HistorialIncidencia//', function () {
	  
	  var IncidenciaCtrl, scope;
	  beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		IncidenciaCtrl = $controller('IncidenciaCtrl', {
			$scope: scope,
			$routeParams :{id : 93763}
		});
	  }));	
	  
	  
	  it('debería mostrarse un cambio', function () {
		expect(scope.incidencia.historia.length).toBe(1);
	  });	  

	  it('debería mostrarse el estado al que pasa la incidencia', function () {
		expect(ultimoCambio().estado).toBe("Abierta");
	  });
	  
	  it('debería mostrarse la fecha en la que se pasó a ese estado', function () {
		expect(ultimoCambio().fechaCambio).toBe("2010-12-11");
	  });
	  
	  it('debería mostrarse el usuario que hizo el cambio de estado', function () {
		expect(ultimoCambio().usuario).toBe("Finn");
	  });
	  
	  it('debería mostrarse el comentario explicativo del cambio', function () {
		expect(ultimoCambio().comentario).toBe("ComentarioFinn");
	  });	  
			
			//Para mejorar la legibilidad de las pruebas
			function ultimoCambio(){
				return scope.incidencia.historia[0];
			}

	});
	
});
