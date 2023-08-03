import { asignarPosiciones } from "../Utils/Funciones";

//Strategy creacion
export function TipoCreacion() {
  this.tipoCreacionPersonajes = "";
}

TipoCreacion.prototype = {
  setStrategy: function (tipoCreacionPersonajes) {
    this.tipoCreacionPersonajes = tipoCreacionPersonajes;
  },

  crearPersonajes: function (conjuntoPersonajesACrear) {
    return this.tipoCreacionPersonajes.crearPersonajes(
      conjuntoPersonajesACrear,
      escenario
    );
  },
};

//un personaje Varias posiciones => el personaje en todas las posiciones
export function PersonajesFijos() {
  this.crearPersonajes = function (conjuntoPersonajesACrear,_escenario) {
    console.log("Entro a Crear PersonajeFijo")
    var personajesACrear = [];
    conjuntoPersonajesACrear.arrayDePersonajes.forEach((unPersonaje) => {
      conjuntoPersonajesACrear.arrayDePosiciones.forEach((unaPosicion) => {
        let personajeAux = { ...unPersonaje };
        personajeAux.posicionInicialY = unaPosicion[0];
        personajeAux.posicionInicialX = unaPosicion[1];
        personajeAux.eliminarAlReiniciar=conjuntoPersonajesACrear.eliminarAlReiniciar
        personajeAux.aliasConjunto=conjuntoPersonajesACrear.aliasConjunto
        personajesACrear.push(personajeAux);
      });
    });
    return personajesACrear;
  };
}

// varios personajes ,varias posiciones => calcula cantidad individual de cada uno y renderiza los personajes segun la cantidad que le toco
export function PersonajesAlAzarRango() {
  const obtenerCantidadAleatoria = function (cantidades) {
    return (
      Math.floor(
        Math.random() *
          (cantidades.cantidadMaximaFija - cantidades.cantidadMinimaFija + 1)
      ) + cantidades.cantidadMinimaFija
    );
  };

  this.crearPersonajes = function (
    conjuntoPersonajesACrear,
    escenario
  ) {
    console.log("Entro a Crear PersonajesAlAzarRango")
    var personajesACrear = [];
    conjuntoPersonajesACrear.arrayDePersonajes.forEach((unPersonaje) => {
      const cantidad = obtenerCantidadAleatoria(conjuntoPersonajesACrear.arrayDePosiciones);
      for (let i = 0; i < cantidad; i++) {
        const posiciones = asignarPosiciones(escenario);
        let personajeAux = { ...unPersonaje };
        personajeAux.posicionInicialY = posiciones[0];
        personajeAux.posicionInicialX = posiciones[1];
        personajeAux.eliminarAlReiniciar=conjuntoPersonajesACrear.eliminarAlReiniciar
        personajeAux.aliasConjunto=conjuntoPersonajesACrear.aliasConjunto
        personajesACrear.push(personajeAux);
      }
    });
    return personajesACrear;
  };
}

// varios personajes => los coloca en posicion aleatoria la cantidad que pide
export function PersonajesAlAzarFijos() {
  const obtenerCantidadAleatoria = function (cantidades) {
    return cantidades.cantidadTotalFija;
  };

  this.crearPersonajes = function (
    conjuntoPersonajesACrear,
    escenario,
  ) {
    console.log("Entro a Crear PersonajesAlAzarFijos")
    var personajesACrear = [];
    conjuntoPersonajesACrear.arrayDePersonajes.forEach((unPersonaje) => {
      const cantidad = obtenerCantidadAleatoria(conjuntoPersonajesACrear.arrayDePosiciones);
      for (let i = 0; i < cantidad; i++) {
        const posiciones = asignarPosiciones(escenario);
        let personajeAux = { ...unPersonaje };
        personajeAux.posicionInicialY = posiciones[0];
        personajeAux.posicionInicialX = posiciones[1];
        personajeAux.eliminarAlReiniciar=conjuntoPersonajesACrear.eliminarAlReiniciar
        personajeAux.aliasConjunto=conjuntoPersonajesACrear.aliasConjunto
        personajesACrear.push(personajeAux);
      }
    });
    return personajesACrear;
  }}

  //varios personajes en un lugar => elije uno y lo renderiza
  export function PersonajesAlAzarExcluyente(){
   const elegirPersonajeRandom= function(arrayDePersonajes) { 
    console.log(arrayDePersonajes.length)
       const largoArray = arrayDePersonajes.length;
       const random = Math.floor(Math.random() * largoArray)
       return arrayDePersonajes[random]
     }
  this.crearPersonajes = function (
    conjuntoPersonajesACrear,
    _escenario,
    ) {
      console.log("Entro a Crear PersonajesAlAzarExcluyente")
      console.log(conjuntoPersonajesACrear.arrayDePersonajes)
      var personajeACrear = elegirPersonajeRandom(conjuntoPersonajesACrear?.arrayDePersonajes)
      personajeACrear.posicionInicialY = conjuntoPersonajesACrear.arrayDePosiciones[0][0];//agarra solo la primera
      personajeACrear.posicionInicialX = conjuntoPersonajesACrear.arrayDePosiciones[0][1];
      personajeACrear.eliminarAlReiniciar=conjuntoPersonajesACrear.eliminarAlReiniciar
      personajeACrear.aliasConjunto=conjuntoPersonajesACrear.aliasConjunto
      return [personajeACrear]
    }
  }

