import {posicionValida, elegirPersonajeRandom, elegirPosicionRandom,obtenerCantidadAleatoria, setearPosiciones, setearAliasYAleatorieidad, setearDireccion} from '../Utils/Funciones';


//Strategy creacion
export function TipoCreacion() {
  this.tipoCreacionPersonajes = "";
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

//un personaje Varias posiciones fijas => el personaje en todas las posiciones fijas
// [personaje], {posiciones: [[y,x], [y,x], [y,x]]} 
export function PersonajesFijos() {

  this.crearPersonajes = function (conjuntoPersonajes,_escenario) {
    !conjuntoPersonajes.posiciones && lanzarExcepcion("Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes")
    let personajesACrear = [];
    conjuntoPersonajes.personajes.forEach((unPersonaje) => {
      conjuntoPersonajes.posiciones.forEach((unaPosicion, i) => {
        let copiaPersonaje = { ...unPersonaje };
        setearPosiciones(copiaPersonaje,unaPosicion)
        setearAliasYAleatorieidad(copiaPersonaje, conjuntoPersonajes.desapareceAlReiniciar, conjuntoPersonajes.aliasConjunto)
        // console.log(conjuntoPersonajes.direcciones);
        conjuntoPersonajes.direcciones ? setearDireccion(copiaPersonaje, conjuntoPersonajes.direcciones, i) : 0;
        // console.log(copiaPersonaje);
        personajesACrear.push(copiaPersonaje);
      });
    });
    return personajesACrear;
  };
}

// varios personajes, rango de posiciones => calcula un num aleatoreo entre el Max y Min, y renderiza los personajes segun el num que le toco
// [personaje, personaje],{cantidadMin: 1,cantidadMax: 3}
export function PersonajesAlAzarRango() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadMin && lanzarExcepcion("Necesita un cantidadMin en la configuracion de cada objeto de conjuntosDePersonajes")
    !conjuntoPersonajes.cantidadMax && lanzarExcepcion("Necesita un cantidadMax en la configuracion de cada objeto de conjuntosDePersonajes")
    let personajesACrear = [];
    const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes);
    for (let i = 0; i < cantidad; i++) {
      const posiciones = posicionValida(escenario);
      const personajeAlAzar = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      let copiaPersonaje = { ...personajeAlAzar };
      setearPosiciones(copiaPersonaje,posiciones)
      setearAliasYAleatorieidad(copiaPersonaje,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
      personajesACrear.push(copiaPersonaje);
    }
    return personajesACrear;
  };
}

// varios personajes => los coloca en posicion aleatoria la cantidad que pide
// [personje, personaje], cantidadTotal:2
export function PersonajesAlAzarCantTotalFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadTotal && lanzarExcepcion("Necesita un cantidad total en la configuracion de cada objeto de conjuntosDePersonajes")
      let personajesACrear = [];
      const cantidad = conjuntoPersonajes.cantidadTotal
      for (let i = 0; i < cantidad; i++) {
        let personajeElegido = elegirPersonajeRandom(conjuntoPersonajes.personajes);
        const posiciones = posicionValida(escenario);
        let personajeAux = { ...personajeElegido };
        setearPosiciones(personajeAux,posiciones)
        setearAliasYAleatorieidad(personajeAux,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
        personajesACrear.push(personajeAux);
      }
  
    return personajesACrear;
  };
}

// varios personajes, varias posiciones fijas => toma 1 personaje, y toma una posicion posible para cada uno
// [personje, personaje], posiciones:[[2,1],[1,2]]
export function PersonajesAlAzarFijos() {
    this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    !conjuntoPersonajes.posiciones && lanzarExcepcion("Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes")
      let personajesACrear = []
      const cantidad = conjuntoPersonajes.posiciones.length;
      for (let i = 0; i < cantidad; i++) {
        let personajeElegido = elegirPersonajeRandom(conjuntoPersonajes.personajes);
        const numRandom = elegirPosicionRandom(conjuntoPersonajes.posiciones)
        const posiciones = conjuntoPersonajes.posiciones[numRandom]
        let personajeAux = { ...personajeElegido };
        setearPosiciones(personajeAux,posiciones)
        setearAliasYAleatorieidad(personajeAux,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
        personajesACrear.push(personajeAux);
      }
      return personajesACrear;
    };
  }

//varios personajes en un lugar => elije uno y lo renderiza
// [personje, personaje], posiciones:[[y,x]]
export function PersonajesAlAzarExcluyente() {
<<<<<<< HEAD
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
=======
  this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    !conjuntoPersonajes.posiciones && lanzarExcepcion("Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes")
    let personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
    const numRandom = elegirPosicionRandom(conjuntoPersonajes.posiciones)
    const posicion = conjuntoPersonajes.posiciones[numRandom]
    setearPosiciones(personajeACrear,posicion)
    setearAliasYAleatorieidad(personajeACrear,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
    return [personajeACrear];
  };
>>>>>>> 37c69ed929bb979c84021f7fe63a88f824f923cf
}
