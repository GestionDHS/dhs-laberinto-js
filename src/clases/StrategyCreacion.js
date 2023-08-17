import {
  posicionValida,
  elegirPersonajeRandom,
  obtenerCantidadAleatoria,
  setearPosiciones,
  setearAliasYAleatorieidad,
  setearDireccion,
  lanzarExcepcion,
} from "../Utils/Funciones";

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

//fijos: new PersonajesFijos(),
//azarRango: new PersonajesAlAzarRango(),
//azarRangoFijos: new PersonajesAlAzarRangoFijos(),
//azarFijos: new PersonajesAlAzarFijos(),
//azarExcluyente: new PersonajesAlAzarExcluyente(),
//posicionExcluyente: new PersonajesPosicionAlAzarExcluyente(),
//azarCantTotal: new PersonajesAlAzarCantTotal(),
//azarCantidadTotalFijos: new PersonajesAlAzarCantTotalFijos()

//Lucho: Caso ridiculo (debería hacerlo sin ningún random, con el generarPersonajes normal):
// QUIERO ELEMENTO-ESPECIFICO EN LUGARES-ESPECIFICOS, SIEMPRE LLENADOS (cantidad determinada por lugares a llenar)
// agregarDatosPersonajes([{manzana}], {posiciones:[[1,2], [2,3], [4,5], [6,5]]})
//un personaje Varias posiciones fijas => el personaje en todas las posiciones fijas
// [personaje], {posiciones: [[y,x], [y,x], [y,x]]}
export function PersonajesFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.posiciones &&
      lanzarExcepcion(
        "Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    conjuntoPersonajes.personajes.forEach((unPersonaje) => {
      conjuntoPersonajes.posiciones.forEach((unaPosicion, i) => {
        let copiaPersonaje = { ...unPersonaje };
        setearPosiciones(copiaPersonaje, unaPosicion);
        setearAliasYAleatorieidad(
          copiaPersonaje,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        conjuntoPersonajes.direcciones
          ? setearDireccion(copiaPersonaje, conjuntoPersonajes.direcciones, i)
          : 0;
        personajesACrear.push(copiaPersonaje);
      });
    });
    return personajesACrear;
  };
}

//Lucho: QUIERO ELEMENTO-ESPECIFICO EN LUGARES-AZAROSOS, CON UNA CANTIDAD POR RANGO (CUASI-FIJA)
//agregarDatosPersonajes([{manzana}], {cantidadMinima:4, cantidadMaxima:6})
// QUIERO ELEMENTO-AZAROSO EN LUGARES-AZAROSOS, CON UNA CANTIDAD POR RANGO (CUASI-FIJA)
//agregarDatosPersonajes([{manzana}, {naranja}], {cantidadMinima:4, cantidadMaxima:6})
// varios personajes, rango de posiciones => calcula un num aleatoreo entre el Max y Min, y renderiza los personajes segun el num que le toco
// [personaje, personaje],{cantidadMin: 1,cantidadMax: 3}
export function PersonajesAlAzarRango() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadMin &&
      lanzarExcepcion(
        "Necesita un cantidadMin en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    !conjuntoPersonajes.cantidadMax &&
      lanzarExcepcion(
        "Necesita un cantidadMax en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    let posicionesElegidas = [];
    const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes);
    for (let i = 0; i < cantidad; i++) {
      const posiciones = posicionValida(escenario, posicionesElegidas);
      posicionesElegidas.push(posiciones);
      const personajeAlAzar = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      let copiaPersonaje = { ...personajeAlAzar };
      setearPosiciones(copiaPersonaje, posiciones);
      setearAliasYAleatorieidad(
        copiaPersonaje,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(copiaPersonaje);
    }
    posicionesElegidas = [];
    return personajesACrear;
  };
}
//Falta :
// QUIERO ELEMENTO-AZAROSO EN LUGARES-ESPECIFICOS, CON UNA CANTIDAD POR RANGO (CUASI-FIJA)
//agregarDatosPersonajes([{manzana}, {naranja}], {posiciones:[[y,x],[y,x],[y,x],[y,x]], cantidadMinima: 0, cantidadMaxima:3})
export function PersonajesAlAzarRangoFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadMin &&
      lanzarExcepcion(
        "Necesita un cantidadMin en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    !conjuntoPersonajes.cantidadMax &&
      lanzarExcepcion(
        "Necesita un cantidadMax en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    let posicionesElegidas = [];
    const cantidad = obtenerCantidadAleatoria(conjuntoPersonajes);
    for (let i = 0; i < cantidad; i++) {
      let personajeElegido = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      const unaPosicion = posicionValida(
        escenario,
        posicionesElegidas,
        conjuntoPersonajes.posiciones
      );
      posicionesElegidas.push(unaPosicion);
      let personajeAux = { ...personajeElegido };
      setearPosiciones(personajeAux, unaPosicion);
      setearAliasYAleatorieidad(
        personajeAux,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeAux);
    }
    posicionesElegidas = [];
    return personajesACrear;
  };
}

//Lucho: QUIERO ELEMENTO-AZAROSO EN LUGARES-ESPECIFICOS, SIEMPRE LLENADOS (cantidad determinada por lugares a llenar)
//agregarDatosPersonajes([{manzana}, {naranja}], {posiciones:[[1,2], [2,3], [4,5], [6,5]]});
// varios personajes, varias posiciones fijas => toma 1 personaje, y toma una posicion posible para cada uno
// [personje, personaje], posiciones:[[2,1],[1,2]]
export function PersonajesAlAzarFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.posiciones &&
      lanzarExcepcion(
        "Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    let posicionesElegidas = [];
    const cantidad = conjuntoPersonajes.posiciones.length;
    for (let i = 0; i < cantidad; i++) {
      let personajeElegido = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      const unaPosicion = posicionValida(
        escenario,
        posicionesElegidas,
        conjuntoPersonajes.posiciones
      );
      posicionesElegidas.push(unaPosicion);
      let personajeAux = { ...personajeElegido };
      setearPosiciones(personajeAux, unaPosicion);
      setearAliasYAleatorieidad(
        personajeAux,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeAux);
    }
    posicionesElegidas = [];
    return personajesACrear;
  };
}

//varios personajes en un lugar fijo => elije uno 
// [personje, personaje], posiciones:[[y,x]]
export function PersonajesAlAzarExcluyente() {
  this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    !conjuntoPersonajes.posiciones &&
      lanzarExcepcion(
        "Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
    const unaPosicion = conjuntoPersonajes.posiciones[0]
    setearPosiciones(personajeACrear, unaPosicion);
    setearAliasYAleatorieidad(
      personajeACrear,
      conjuntoPersonajes.desapareceAlReiniciar,
      conjuntoPersonajes.aliasConjunto
    );
    return [personajeACrear];
  };
}

//varios personajes en varios lugares Fijos => elije uno y elije una posicion
// [personje, personaje], posiciones:[[y,x], [y,x]]
export function PersonajesPosicionAlAzarExcluyente() {
  this.crearPersonajes = function (conjuntoPersonajes, _escenario) {
    let personajeACrear = elegirPersonajeRandom(conjuntoPersonajes.personajes);
    const index = Math.floor(Math.random() * conjuntoPersonajes.posiciones.length)
    const unaPosicion=conjuntoPersonajes.posiciones[index]
   setearPosiciones(personajeACrear, unaPosicion);
   setearAliasYAleatorieidad(
     personajeACrear,
     conjuntoPersonajes.desapareceAlReiniciar,
     conjuntoPersonajes.aliasConjunto
   );
    return [personajeACrear];
  };
}


//Lucho : QUIERO ELEMENTO-ESPECIFICO EN LUGARES-AZAROSOS, CON UNA CANTIDAD FIJA
//agregarDatosPersonajes([{manzana}], {cantidadTotal:7})
// QUIERO ELEMENTO-AZAROSO EN LUGARES-AZAROSOS, CON UNA CANTIDAD FIJA
//agregarDatosPersonajes([{manzana},{naranja}], {cantidadTotal:7})
// varios personajes => los coloca en posicion aleatoria la cantidad que pide
// [personje, personaje], cantidadTotal:2
export function PersonajesAlAzarCantTotal() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadTotal &&
      lanzarExcepcion(
        "Necesita un cantidad total en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    let posicionesElegidas = [];
    const cantidad = conjuntoPersonajes.cantidadTotal;
    for (let i = 0; i < cantidad; i++) {
      let personajeElegido = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      const unaPosicion = posicionValida(escenario, posicionesElegidas,conjuntoPersonajes.posiciones);
      posicionesElegidas.push(unaPosicion);
      let personajeAux = { ...personajeElegido };
      setearPosiciones(personajeAux, unaPosicion);
      setearAliasYAleatorieidad(
        personajeAux,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeAux);
    }
    posicionesElegidas = [];
    return personajesACrear;
  };
}

// QUIERO ELEMENTO-AZAROSO EN LUGARES-ESPECIFICOS, CON UNA CANTIDAD FIJA
//agregarDatosPersonajes([{manzana}, {naranja}], {posiciones:[[y,x],[y,x],[y,x],[y,x]], cantidadFija: 3})
// [personje, personaje],[[y,x],[y,x],[y,x]] cantidadTotal:2
export function PersonajesAlAzarCantTotalFijos() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    !conjuntoPersonajes.cantidadTotal &&
      lanzarExcepcion(
        "Necesita un cantidad total en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    !conjuntoPersonajes.posiciones &&
      lanzarExcepcion(
        "Necesita un array de posiciones en la configuracion de cada objeto de conjuntosDePersonajes"
      );
    let personajesACrear = [];
    let posicionesElegidas = [];
    const cantidad = conjuntoPersonajes.cantidadTotal;
    for (let i = 0; i < cantidad; i++) {
      let personajeElegido = elegirPersonajeRandom(
        conjuntoPersonajes.personajes
      );
      const unaPosicion = posicionValida(
        escenario,
        posicionesElegidas,
        conjuntoPersonajes.posiciones
      );
      posicionesElegidas.push(unaPosicion);
      let personajeAux = { ...personajeElegido };
      setearPosiciones(personajeAux, unaPosicion);
      setearAliasYAleatorieidad(
        personajeAux,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeAux);
    }
    posicionesElegidas = [];
    return personajesACrear;
  };
}





