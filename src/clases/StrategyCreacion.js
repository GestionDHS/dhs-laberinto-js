import {posicionValida, elegirPersonajeRandom, elegirPosicionRandom,obtenerCantidadAleatoria, setearPosiciones, setearAliasYAleatorieidad} from '../Utils/Funciones';

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
    let personajesACrear = [];
    conjuntoPersonajes.personajes.forEach((unPersonaje) => {
      conjuntoPersonajes.posiciones.forEach((unaPosicion) => {
        let copiaPersonaje = { ...unPersonaje };
        setearPosiciones(copiaPersonaje,unaPosicion)
        setearAliasYAleatorieidad(copiaPersonaje,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
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
  this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    let personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
    const numRandom = elegirPosicionRandom(conjuntoPersonajes.posiciones)
    const posicion = conjuntoPersonajes.posiciones[numRandom]
    setearPosiciones(personajeACrear,posicion)
    setearAliasYAleatorieidad(personajeACrear,conjuntoPersonajes.desapareceAlReiniciar,conjuntoPersonajes.aliasConjunto)
    return [personajeACrear];
  };
}
