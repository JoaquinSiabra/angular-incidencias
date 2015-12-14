'use strict';

angular.module('incidenciasApp')
  .factory('Incidencia', function (localStorageService) {		
	
	function update(incidenciaActualizada){
	  var incidencias = getAll();
	  var incidenciasActualizadas =incidencias.map(function(incidencia){
		  if (incidencia.id==incidenciaActualizada.id) { return incidenciaActualizada; }
		  return incidencia;
	  })
      localStorageService.add('incidencias', incidenciasActualizadas);
	}
	
	function getAll() {
	  console.debug(localStorageService.get('incidencias'));
      return localStorageService.get('incidencias') || inicializa();
    };
	
	function inicializa(){
		var data = [
			{"descripcion":	"La aplicación APP1 genera un error al crear una instancia", 
			"estado": "En curso","fechaCreacion":"2015-11-13",
			"historia":[{"user":"Finn","fechaCambio":"2010-12-11","estado":"Abierta","comentario":""}],
			"id":93763, "importancia":"Alta","usuario":"Rick"},
			{"descripcion":	"La conexión con la BBDD es errática y peculiar", 
			"estado": "Duplicada", "fechaCreacion":"2014-12-13",
			"historia":[{"user":"Dipper","fechaCambio":"2010-12-13","estado":"Abierta","comentario":""}],
			"id":93765, "importancia":"Alta","usuario":"Rick"}
		];
		return data
	}
	
	function get(id){
		var incidencias = getAll();
		var filtered =incidencias.filter(function(incidencia){
			if (incidencia.id==id){
				return incidencia;
			}
		})
		return filtered[0];
	}
	
	function create(incidencia){
		save(extiende(incidencia));
	}
	
		function save(incidencia) {
		  var incidencias = getAll();
		  incidencias.push(incidencia);
		  localStorageService.add('incidencias', incidencias);
		};
	
		function extiende(incidencia) {
		  incidencia.id = generaId();
		  incidencia.fechaCreacion = hoy();
		  incidencia.usuario = 'User';
		  incidencia.historia = [];
		  return incidencia;
		};	
	
			function generaId(){
				return parseInt((Math.random() * 100000), 10);
			}
	
	return {	
		create: create,
		update: update,
		getAll: getAll,
		get:get
	};
	
})
 .factory('Importancia', function () {		
		
	function getAll() {
		return ["Baja","Media","Alta","Crítico"];
    };
	
    return {	
		getAll: getAll
	};
})
 .factory('Estado', function () {			
		
	function getAll() {
		return ["Abierta","En curso","Necesita feedback","Cerrada","Resuelta","Duplicada","Desestimada"];
    };
	
    return {	
		getAll: getAll
	};
})
 .factory('Historia', function (){			
		
	function actualiza(incidencia,comentario) {
		
	  var historia = incidencia.historia || [];
	  var cambio = new Cambio(incidencia,comentario);
	  
	  historia.push(cambio);
	  incidencia.historia = historia;
	  
	  return incidencia;
    };
	
	function Cambio(incidencia,comentario){
	  this.user = "User";
	  this.fechaCambio = hoy();
	  this.estado = incidencia.estado;
	  this.comentario = comentario;
	}
	
    return {	
		actualiza: actualiza 
	};
});  


function hoy(){
	return new Date().toJSON().slice(0,10);
}

  
 