import { posicionValida, elegirPersonajeRandom } from '../Utils/Funciones';

//Strategy creacion
export function TipoCreacion() {
	this.tipoCreacionPersonajes = '';
}

TipoCreacion.prototype = {
	setStrategy: function (tipoCreacionPersonajes) {
		this.tipoCreacionPersonajes = tipoCreacionPersonajes;
	},

	crearPersonajes: function (conjuntoPersonajes) {
		return this.tipoCreacionPersonajes.crearPersonajes(
			conjuntoPersonajes,
			escenario
		);
	},
};

//un personaje Varias posiciones => el personaje en todas las posiciones
// [personaje], {posiciones: [[y,x], [y,x], [y,x]]} fijos
export function PersonajesFijos() {
	this.crearPersonajes = function (conjuntoPersonajes) {
    let personajesACrear = [];
		conjuntoPersonajes.personajes.forEach((unPersonaje) => {
			conjuntoPersonajes.posiciones.forEach((unaPosicion) => {
				let copiaPersonaje = { ...unPersonaje };
				copiaPersonaje.posicionInicialY = unaPosicion[0];
				copiaPersonaje.posicionInicialX = unaPosicion[1];
        copiaPersonaje.desapareceAlReiniciar = conjuntoPersonajes.desapareceAlReiniciar;
				copiaPersonaje.aliasConjunto = conjuntoPersonajes.aliasConjunto;
				personajesACrear.push(copiaPersonaje);
			});
    });
    return personajesACrear
	};
}

// varios personajes ,varias posiciones => calcula cantidad individual de cada uno y renderiza los personajes segun la cantidad que le toco
// [personaje, personaje],{cantidadMin: 1,cantidadMax: 3}
export function PersonajesAlAzarRango() {
	const obtenerCantidadAleatoria = function (configuracion) {
		return (Math.floor(Math.random() *(configuracion.cantidadMax - configuracion.cantidadMin + 1)) + configuracion.cantidadMin);
	};
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    // console.log(escenario);
		  let personajesACrear = [];
			const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes);
      for (let i = 0; i < cantidad; i++) {
        const posiciones = posicionValida(escenario);
        const personajeAlAzar = elegirPersonajeRandom(conjuntoPersonajes.personajes)
				let copiaPersonaje = { ...personajeAlAzar };
				copiaPersonaje.posicionInicialY = posiciones[0];
				copiaPersonaje.posicionInicialX = posiciones[1];
        copiaPersonaje.desapareceAlReiniciar = conjuntoPersonajes.desapareceAlReiniciar;
				copiaPersonaje.aliasConjunto = conjuntoPersonajes.aliasConjunto;
				personajesACrear.push(copiaPersonaje);
			}
      return personajesACrear;
		};
	};

// varios personajes => los coloca en posicion aleatoria la cantidad que pide
// [personje, personaje], posiciones:[[y,x],[y,x]]
export function PersonajesAlAzarFijos() {
	const obtenerCantidadAleatoria = function (cantidades) {
		return cantidades.cantidadTotal;
	};

	this.crearPersonajes = function (conjuntoPersonajes, escenario) {
		var personajesACrear = [];
		conjuntoPersonajes.personajes.forEach((unPersonaje) => {
			const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes.posiciones);
			for (let i = 0; i < cantidad; i++) {
				const posiciones = posicionValida(escenario);
				let personajeAux = { ...unPersonaje };
				personajeAux.posicionInicialY = posiciones[0];
				personajeAux.posicionInicialX = posiciones[1];
				personajeAux.desapareceAlReiniciar =
					conjuntoPersonajes.desapareceAlReiniciar;
				personajeAux.aliasConjunto = conjuntoPersonajes.aliasConjunto;
				personajesACrear.push(personajeAux);
			}
		});
		return personajesACrear;
	};
}

//varios personajes en un lugar => elije uno y lo renderiza
// [personje, personaje], posiciones:[[y,x]]
export function PersonajesAlAzarExcluyente() {
	const elegirPersonajeRandom = function (personajes) {
		const largoArray = personajes.length;
		const random = Math.floor(Math.random() * largoArray);
		return personajes[random];
	};
	this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
		var personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
		personajeACrear.posicionInicialY = posiciones[0][0];
		personajeACrear.posicionInicialX = posiciones[0][1];
		personajeACrear.desapareceAlReiniciar =
			conjuntoPersonajes.desapareceAlReiniciar;
		personajeACrear.aliasConjunto = conjuntoPersonajes.aliasConjunto;
		return [personajeACrear];
	};
}
