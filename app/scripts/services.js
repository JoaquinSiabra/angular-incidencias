'use strict';

/* Los servicios se han implementado con localStorage. Para consumir un API podríamos
usar Resource de manera similar a esta:  

	angular.module('incidenciasApp')
	  .factory('Incidencia', ['$resource',
		function($resource){
			return $resource('api/incidencia/:id', {}, {
			   get: {method:'GET', isArray: false},
			   getAll: {method:'GET', isArray: true},
			   update: {method:'PUT', params: {id: '@id'}},
			   create: {method:'POST', data: '@incidencia}
			});
	  }]);  
  
 En este caso, el controlador que llame al servicio tendrá que tener en cuenta la
 naturaleza asíncrona del proceso y recoger el resultado en un callback.
*/

angular.module('incidenciasApp')

  .factory('Incidencia', function (localStorageService, Estado, Importancia, Historia, Sesion) {		
		
	function getAll() {
      return localStorageService.get('incidencias') || inicializa();
    };
	
		function inicializa(){
			var data = [
				{"resumen":	"La aplicación APP1 genera un error al crear una instancia", 
				"descripcion":"La aplicación APP1 genera un error al crear una instancia de un nuevo objeto conteniendo una lista de referencias; el error tiene código ERR3454342", 
				"estado": "En curso","fechaCreacion":"2015-11-13",
				"historia":[{"usuario":"Finn","fechaCambio":"2010-12-11","estado":"Abierta","comentario":"ComentarioFinn"}],
				"id":93763, "importancia":"Alta","usuario":"Rick"},
				{"resumen":	"La conexión con la BBDD es errática y peculiar", 
				"descripcion": "Unas veces la aplicación se conecta, otras no; y cuando está conectada, unas veces da resultados y otros se los inventa", 
				"estado": "Duplicada", "fechaCreacion":"2014-12-13",
				"historia":[{"usuario":"Dipper","fechaCambio":"2010-12-13","estado":"Abierta","comentario":"ComentarioDipper"}],
				"id":93765, "importancia":"Alta","usuario":"Rick"}
			];
			return data
		}
	
	
	function get(id){
		var incidencias = getAll();
		var incidenciasFiltradas =incidencias.filter(function(incidencia){
			if (incidencia.id==id){
				return incidencia;
			}
		})
		return incidenciasFiltradas[0];
	}
	
	function update(incidenciaActualizada){
	  var incidencias = getAll();
	  var incidenciasActualizadas =incidencias.map(function(incidencia){
		  if (incidencia.id==incidenciaActualizada.id) { return incidenciaActualizada; }
		  return incidencia;
	  })
      localStorageService.add('incidencias', incidenciasActualizadas);
	}
	
		
	function create(incidencia){
		
		if (invalida(incidencia)) return null;
		
		var extendida = extiende(incidencia);
		save(extiende(extendida));
		
		return extendida;
	}
	
		function invalida(incidencia){
			return (!incidencia.resumen) || (!incidencia.descripcion);
		}
		
		function save(incidencia) {
		  var incidencias = getAll();
		  incidencias.push(incidencia);
		  localStorageService.add('incidencias', incidencias);
		};
	
		function extiende(incidencia) {
		  incidencia.id = generaId();
		  incidencia.fechaCreacion = hoy();
		  incidencia.usuario = Sesion.usuarioActual();
		  incidencia.estado = Estado.getDefault();		  
		  incidencia.historia = [];
		  incidencia.historia.push(Historia.getDefault());
		  if (!incidencia.importancia) incidencia.importancia=Importancia.getDefault();
		  
		  return incidencia;
		};	
	
			function generaId(){
				return parseInt((Math.random() * 100000), 10);
			}
	
	return {	
		get:get,
		getAll: getAll,
		update: update,
		create: create
	};
	
})


 .factory('Importancia', function () {		
		
	function getAll() {
		return ["Baja","Media","Alta","Crítico"];
    };
	
	function getDefault() {
		return "Baja";
    };
	
    return {	
		getAll: getAll,
		getDefault: getDefault
	};
})


 .factory('Estado', function () {			
		
	function getAll() {
		return ["Abierta","En curso","Necesita feedback","Cerrada","Resuelta","Duplicada","Desestimada"];
    };
	
	function getDefault() {
		return "Abierta";
    };
	
    return {	
		getAll: getAll,
		getDefault: getDefault
	};
})


 .factory('Historia', function (Estado, Sesion){			
		
	function actualiza(incidencia,comentario) {
		
	  var historia = incidencia.historia || [];
	  var cambio = new Cambio(incidencia,comentario);
	  
	  historia.push(cambio);
	  incidencia.historia = historia;
	  
	  return incidencia;
    };
	
	function getDefault() {
		var incidencia = {};
		incidencia.estado = Estado.getDefault();
		return new Cambio(incidencia,'');
    };
	
	function Cambio(incidencia,comentario){
	  this.usuario = Sesion.usuarioActual();
	  this.fechaCambio = hoy();
	  this.estado = incidencia.estado;
	  this.comentario = comentario;
	}
	
    return {	
		actualiza: actualiza,
		getDefault: getDefault
	};
})

 .factory('Sesion', function (){			
		
	function usuarioActual() {
	  return "User";
    };
			
    return {	
		usuarioActual: usuarioActual
	};
	
});    


function hoy(){
	return new Date().toJSON().slice(0,10);
}

  
 