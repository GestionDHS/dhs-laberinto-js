import {posicionValida, elegirPersonajeRandom, elegirPosicionRandom,obtenerCantidadAleatoria} from '../Utils/Funciones';

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
  this.crearPersonajes = function (conjuntoPersonajes) {
    let personajesACrear = [];
    conjuntoPersonajes.personajes.forEach((unPersonaje) => {
      conjuntoPersonajes.posiciones.forEach((unaPosicion) => {
        let copiaPersonaje = { ...unPersonaje };
        copiaPersonaje.posicionInicialY = unaPosicion[0];
        copiaPersonaje.posicionInicialX = unaPosicion[1];
        copiaPersonaje.desapareceAlReiniciar =
          conjuntoPersonajes.desapareceAlReiniciar;
        copiaPersonaje.aliasConjunto = conjuntoPersonajes.aliasConjunto;
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
    let personajesACrear = [];
    const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes);
    for (let i = 0; i < cantidad; i++) {
      const posiciones = posicionValida(escenario);
      const personajeAlAzar = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      let copiaPersonaje = { ...personajeAlAzar };
      copiaPersonaje.posicionInicialY = posiciones[0];
      copiaPersonaje.posicionInicialX = posiciones[1];
      copiaPersonaje.desapareceAlReiniciar =
        conjuntoPersonajes.desapareceAlReiniciar;
      copiaPersonaje.aliasConjunto = conjuntoPersonajes.aliasConjunto;
      personajesACrear.push(copiaPersonaje);
    }
    return personajesACrear;
  };
}

// varios personajes => los coloca en posicion aleatoria la cantidad que pide
// [personje, personaje], cantidadTotal:2
export function PersonajesAlAzarCantTotalFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
      let personajesACrear = [];
      const cantidad = conjuntoPersonajes.cantidadTotal
      for (let i = 0; i < cantidad; i++) {
        let personajeElegido = elegirPersonajeRandom(conjuntoPersonajes.personajes);
        const posiciones = posicionValida(escenario);
        let personajeAux = { ...personajeElegido };
        personajeAux.posicionInicialY = posiciones[0];
        personajeAux.posicionInicialX = posiciones[1];
        personajeAux.desapareceAlReiniciar =
          conjuntoPersonajes.desapareceAlReiniciar;
        personajeAux.aliasConjunto = conjuntoPersonajes.aliasConjunto;
        personajesACrear.push(personajeAux);
      }
  
    return personajesACrear;
  };
}

// varios personajes, varias posiciones fijas => toma 1 personaje, y toma una posicion posible para cada uno
// [personje, personaje], posiciones:[[2,1],[1,2]]
export function PersonajesAlAzarFijos() {
    this.crearPersonajes = function (conjuntoPersonajes, escenario) {
      let personajesACrear = []
      const cantidad = conjuntoPersonajes.posiciones.length;
      for (let i = 0; i < cantidad; i++) {
        let personajeElegido = elegirPersonajeRandom(conjuntoPersonajes.personajes);
        const numRandom = elegirPosicionRandom(conjuntoPersonajes.posiciones)
        const posiciones = conjuntoPersonajes.posiciones[numRandom]
        let personajeAux = { ...personajeElegido };
        personajeAux.posicionInicialY = posiciones[0];
        personajeAux.posicionInicialX = posiciones[1];
        personajeAux.desapareceAlReiniciar =
          conjuntoPersonajes.desapareceAlReiniciar;
        personajeAux.aliasConjunto = conjuntoPersonajes.aliasConjunto;
        personajesACrear.push(personajeAux);
      }
      return personajesACrear;
    };
  }

//varios personajes en un lugar => elije uno y lo renderiza
// [personje, personaje], posiciones:[[y,x]]
export function PersonajesAlAzarExcluyente() {
  this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    let personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
    const numRandom = elegirPosicionRandom(conjuntoPersonajes.posiciones)
    const posicion = conjuntoPersonajes.posiciones[numRandom]
    personajeACrear.posicionInicialY = posicion[0];
    personajeACrear.posicionInicialX = posicion[1];
    personajeACrear.desapareceAlReiniciar =
      conjuntoPersonajes.desapareceAlReiniciar;
    personajeACrear.aliasConjunto = conjuntoPersonajes.aliasConjunto;
    return [personajeACrear];
  };
}
