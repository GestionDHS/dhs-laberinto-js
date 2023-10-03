import {
  posicionValida,
  elegirPersonajeRandom,
  obtenerCantidadAleatoria,
  setearPosiciones,
  setearAliasYAleatorieidad,
  setearDireccion,
  lanzarExcepcion,
  setearElegirEstadoRandom,
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

//Personajes Fijos, Estados Aleatorios
export function PersonajesFijosEstadoAleatorio() {
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
        conjuntoPersonajes?.estadoAleatorio &&
          setearElegirEstadoRandom(
            copiaPersonaje,
            conjuntoPersonajes.estadoAleatorio
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
    let classAAgregar = conjuntoPersonajes?.classCss
      ? conjuntoPersonajes.classCss
      : "null";
    personajeACrear.classCss = classAAgregar;
    const unaPosicion = conjuntoPersonajes.posiciones[0];
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
    const index = Math.floor(
      Math.random() * conjuntoPersonajes.posiciones.length
    );
    const unaPosicion = conjuntoPersonajes.posiciones[index];
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

//conjuntoPersonajes:
// {
//   estrategia: "filasAleatoriasSimples",
//   personajes: [panda,bambuancho,bambuAnchoCamino,frutilla, cielo],
//   aliasConjunto: "filasAleatoriasSimples",
//   desapareceAlReiniciar: true,
//   anchoMinimo: 3,
//   anchoMaximo: 6, // Warning no exceda el tablero.
//   filas:[1,2,3,4],
//   desdeColumna:1,
// }
//personajes[primerElementoEnArray,porDondeCaminaElPersonajePPAL,aLoQueTieneQueLlegar,rellenoNoPisable]
export function EscenarioFilasAleatoreasSimples() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    let personajesACrear = [];
    //Recorro las filas a rellenar
    conjuntoPersonajes.filas.forEach((fila, index) => {
      //Personaje cuadroAmarillo - inicio
      let personajeInicial = { ...conjuntoPersonajes.personajes[0] };
      let unaPosicion = [fila, conjuntoPersonajes.desdeColumna];
      setearPosiciones(personajeInicial, unaPosicion);
      setearAliasYAleatorieidad(
        personajeInicial,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeInicial);
      //Calculo el numero aleatorio
      let largoFila = obtenerCantidadAleatoria({
        cantidadMax: conjuntoPersonajes.anchoMaximo,
        cantidadMin: conjuntoPersonajes.anchoMinimo,
      });
      // if (index + 1 !== conjuntoPersonajes.filas.length) {
      //Tengo las filas que quiero renderizar con camino y objeto a encontrar

      //Relleno con camino
      for (let i = conjuntoPersonajes.desdeColumna + 1; i <= largoFila; i++) {
        let personajeRelleno = { ...conjuntoPersonajes.personajes[1] };
        setearPosiciones(personajeRelleno, [fila, i]);
        setearAliasYAleatorieidad(
          personajeRelleno,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        personajesACrear.push(personajeRelleno);
      }
      //Personaje Final
      let personajeFinalFila = { ...conjuntoPersonajes.personajes[2] };
      setearPosiciones(personajeFinalFila, [fila, largoFila]);
      setearAliasYAleatorieidad(
        personajeFinalFila,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeFinalFila);
      // } else {
      //   //si entra acá es por que tengo la última fila, que queremos que se renderice solo el tronco
      //   largoFila = 1;
      // }

      //Relleno el resto de la fila con personaje no pisable
      for (let k = 0; k < conjuntoPersonajes.desdeColumna; k++) {
        let personajeRellenoTablero = { ...conjuntoPersonajes.personajes[3] };
        setearPosiciones(personajeRellenoTablero, [fila, k]);
        setearAliasYAleatorieidad(
          personajeRellenoTablero,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        personajesACrear.push(personajeRellenoTablero);
      }
      for (let j = largoFila + 1; j < escenario.dimensiones[1]; j++) {
        let personajeRellenoTablero = { ...conjuntoPersonajes.personajes[3] };
        setearPosiciones(personajeRellenoTablero, [fila, j]);
        setearAliasYAleatorieidad(
          personajeRellenoTablero,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        personajesACrear.push(personajeRellenoTablero);
      }
    });

    return personajesACrear;
  };
}

//personaje en lugares Azararozos con "estado" Azarozo
//personaje[fuego] , EstadosAleatorios[los 4 estados que puede tomar], posiciones: [3 posiciones en las cuales podría estar el fuego]
export function ElementoPosicionRandomYEstadoAleatorio() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    let personajesAGenerar = [];
    let posicionesValidas = conjuntoPersonajes.posiciones;
    const random = Math.floor(Math.random() * posicionesValidas.length);
    let personajeAux = { ...conjuntoPersonajes.personajes[0] };
    conjuntoPersonajes?.estadoAleatorio &&
      setearElegirEstadoRandom(
        personajeAux,
        conjuntoPersonajes.estadoAleatorio
      );
    setearPosiciones(personajeAux, posicionesValidas[random]);
    setearAliasYAleatorieidad(
      personajeAux,
      conjuntoPersonajes.desapareceAlReiniciar,
      conjuntoPersonajes.aliasConjunto
    );
    personajesAGenerar.push(personajeAux);
    return personajesAGenerar;
  };
}


export function PersonajesFijosRangoAleatoreoEstadoAleatoreo() {
  this.crearPersonajes = function (conjuntoPersonajes, escenario) {
    let personajesACrear = [];

    // Recorro las filas a rellenar
    conjuntoPersonajes.filas.forEach((fila, index) => {
      // Aplico el fondo a toda la fila
      for (let i = 0; i <= escenario.dimensiones[1] - 1; i++) {
        let personajeFondo = { ...conjuntoPersonajes.personajes[0] };
        let unaPosicion = [fila, i];
        setearPosiciones(personajeFondo, unaPosicion);
        setearAliasYAleatorieidad(
          personajeFondo,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        personajesACrear.push(personajeFondo);
      }

      // Calculo el número aleatorio para las celdas donde estarán los personajes aleatorios
      let largoFila = obtenerCantidadAleatoria({
        cantidadMax: conjuntoPersonajes.anchoMaximo,
        cantidadMin: conjuntoPersonajes.anchoMinimo,
      });

      // Creo un array de posiciones disponibles en la fila actual
      let arrPosicionesPosibles = Array.from({ length: largoFila }, (v, index) => index + 1);

      // Agrego el último personaje en la última posición
      let personajeUltimo = { ...conjuntoPersonajes.personajes[2] };
      let ultimaPosicion = arrPosicionesPosibles.pop();
      let unaPosicionUltima = [fila, ultimaPosicion];
      setearPosiciones(personajeUltimo, unaPosicionUltima);
      setearAliasYAleatorieidad(
        personajeUltimo,
        conjuntoPersonajes.desapareceAlReiniciar,
        conjuntoPersonajes.aliasConjunto
      );
      personajesACrear.push(personajeUltimo);

      // Relleno con los personajes aleatorios estadoAleatorio
      let cantidadPersonajesAleat = obtenerCantidadAleatoria({
        cantidadMax: conjuntoPersonajes.cantidadMax,
        cantidadMin: conjuntoPersonajes.cantidadMin,
      });
      for (let i = 1; i <= cantidadPersonajesAleat; i++) {
        if (arrPosicionesPosibles.length === 0) {
          // Si ya no quedan posiciones disponibles, salir del bucle
          break;
        }
        
        // Obtengo una posición aleatoria de las disponibles
        let posicionAleatoreaIndex = Math.floor(Math.random() * arrPosicionesPosibles.length);
        let posicionAleatorea = arrPosicionesPosibles[posicionAleatoreaIndex];
        
        // Elimino la posición del array de posiciones disponibles
        arrPosicionesPosibles.splice(posicionAleatoreaIndex, 1);

        let personajeEstadoVariable = { ...conjuntoPersonajes.personajes[1] };
        
        // Asigno la posición
        conjuntoPersonajes?.estadoAleatorio &&
        setearElegirEstadoRandom(
          personajeEstadoVariable,
          conjuntoPersonajes.estadoAleatorio
        );
        setearPosiciones(personajeEstadoVariable, [fila, posicionAleatorea]);
        setearAliasYAleatorieidad(
          personajeEstadoVariable,
          conjuntoPersonajes.desapareceAlReiniciar,
          conjuntoPersonajes.aliasConjunto
        );
        personajesACrear.push(personajeEstadoVariable);
      }
    });

    return personajesACrear;
  };
}

