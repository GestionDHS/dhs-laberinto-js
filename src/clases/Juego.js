import { Escenario } from "./Escenario";

import {
  PersonajeBasico,
  PersonajeDibujante,
  PersonajeMovibleSimple,
  PersonajeMovibleGrados,
} from "./Personaje";

import {
  TipoCreacion,
  PersonajesFijos,
  PersonajesAlAzarRango,
  PersonajesAlAzarFijos,
  PersonajesAlAzarExcluyente,
  PersonajesAlAzarCantTotalFijos
} from "../clases/StrategyCreacion";

import { Modal } from "./Modal";

export class Juego {
  constructor(duracionIntervalos = 1000) {
    this.sincronico = true;
    this.duracionIntervalos = duracionIntervalos;
    this.escenario = {};
    this.listaDePersonajes = [];
    this.listaDeAleatoreos = [];
    this.personajePrincipal = null;
    this.puedeDebeContinuar = true;
    this.funcionesPublicadas = [];
    this.clasesPersonajesPosibles = {
      PersonajeBasico: PersonajeBasico,
      PersonajeDibujante: PersonajeDibujante,
      PersonajeMovibleSimple: PersonajeMovibleSimple,
      PersonajeMovibleGrados: PersonajeMovibleGrados,
    };
    this.configuracionInicialPersonajes = [];
    this.tipoCreacionPersonajes = {};
  }

  /*PARA RENDERIZAR ESCENARIO*/
  // La funcion recibe la matriz tablero la unidad de ancho, el color de bordes, nombre imagen pared, nombre imagen camino

  generarEscenario(dimensiones, unidadAnchoDeseada, colorBordes) {
    const elementoHTMLLaberinto = document.getElementById("elemento-escenario");
    this.escenario = new Escenario(
      dimensiones,
      unidadAnchoDeseada,
      elementoHTMLLaberinto,
      colorBordes
    );
    // console.log(this.escenario)
    this.escenario.crearEscenario();
  }

  limpiarTablero() {
    // console.log(this.listaDePersonajes);
    let soloAleatoreos = this.listaDePersonajes.filter(
      (personaje) => personaje.desapareceAlReiniciar == true
    );
    // console.log(soloAleatoreos);
    soloAleatoreos.forEach((personaje) => {
      personaje.salirDelCasilleroActual();
      personaje.controladorDOM.removerDivDelDOM();
    });
    this.listaDePersonajes = this.listaDePersonajes.filter(
      (personaje) => personaje.desapareceAlReiniciar != true
    );
    // return soloAleatoreos
  }

  reiniciar() {
    this.puedeDebeContinuar = true;
    this.limpiarTablero();
    // console.log(personajes);
    // personajes.forEach((unPersonaje) => {
    //   this.generarPersonaje(unPersonaje);
    // }
    // nunca guardamos nada en listaDeAleatoreos
    // console.log();
    // this.crearPersonajes(this.tipoCreacionPersonajes.crearPersonajes(this.listaDeAleatoreos, this.escenario), true)
    this.crearPersonajes(this.listaDeAleatoreos, true);
  }

  generarPersonaje(personaje) {
    const clasePersonaje = personaje.clasePersonaje;
    let unPersonaje;
    if (clasePersonaje) {
      unPersonaje = new this.clasesPersonajesPosibles[clasePersonaje](
        personaje,
        this
      );
      unPersonaje.desapareceAlReiniciar =
        personaje.desapareceAlReiniciar || false;
    } else {
      unPersonaje = new PersonajeBasico(personaje, this);
      unPersonaje.desapareceAlReiniciar =
        personaje.desapareceAlReiniciar || false;
    }
    this.listaDePersonajes.push(unPersonaje);
    // console.log(this.listaDePersonajes);
    unPersonaje.inicializar();
  }

  setearPersonajePrincipal(personaje) {
    this.personajePrincipal = personaje;
  }

  setearVelocidad(nuevaVelocidad) {
    this.duracionIntervalos = nuevaVelocidad;
    this.listaDePersonajes.forEach((personaje) =>
      personaje.setearVelocidad(nuevaVelocidad)
    );
  }

  setearSincronicidad(boolean) {
    this.sincronico = boolean;
  }

  agregarModal(datosModal) {
    this.datosModal = new Modal(datosModal, this);
    return this.datosModal;
  }
  mostrarModal() {
    this.datosModal.mostrar(this.sincronico);
  }

  habilitarFuncionGlobal(nombre, bindearCon = this.personajePrincipal) {
    window[nombre] = bindearCon[nombre].bind(bindearCon);
  }

  agregarGlobalConCallback(nombre, bindearCon = this.personajePrincipal) {
    this.habilitarFuncionGlobal(nombre, bindearCon);
    this.funcionesPublicadas.push(nombre);
  } // llamar en instancia para cada movimiento deseado

  generarCallbackParaInterprete() {
    const lista = this.funcionesPublicadas;
    return function (interpreter, globalObject) {
      lista.forEach((nombreFuncion) => {
        interpreter.setProperty(
          globalObject,
          nombreFuncion,
          interpreter.createNativeFunction(window[nombreFuncion])
        );
      });
    };
  }

  calcularCasillerosVacios() {
    let casillerosVacios = 0;
    this.escenario.objetosCasilleros.forEach((arrObjCasi) => {
      arrObjCasi.forEach((casillero) => {
        casillero.ocupantes?.forEach((ocupante) => {
          if (
            ocupante.tipoPersonaje == "camino" &&
            casillero.ocupantes.length == 1
          ) {
            casillerosVacios++;
          }
        });
      });
    });
    return casillerosVacios;
  }

  generarConjuntoDePersonajes(conjuntosDePersonajes) {
    const estrategias = {
      fijos: new PersonajesFijos(),
      azarRango: new PersonajesAlAzarRango(),
      azarFijos: new PersonajesAlAzarFijos(),
      azarExcluyente: new PersonajesAlAzarExcluyente(),
      azarCantTotalFija: new PersonajesAlAzarCantTotalFijos()
    };
    conjuntosDePersonajes.forEach((unConjunto) => {
      let personajesAGenerar = [];
      if (this.tipoCreacionPersonajes != unConjunto.estrategia) {
        this.tipoCreacionPersonajes = estrategias[unConjunto.estrategia];
      }
      const arrayPersonajesAux = this.tipoCreacionPersonajes.crearPersonajes(
        unConjunto,
        this.escenario
      );

      personajesAGenerar.push(...arrayPersonajesAux);
      personajesAGenerar.forEach((unPersonaje) => {
        this.generarPersonaje(unPersonaje);
      });
    });
  }

  crearPersonajes(conjuntosDePersonajes, reinicio = false) {
    if (!reinicio) {
      this.listaDeAleatoreos = conjuntosDePersonajes.filter(
        (p) => p.desapareceAlReiniciar == true
      );
    }
    // console.log(this.listaDeAleatoreos);
    this.generarConjuntoDePersonajes(conjuntosDePersonajes);
  }
}
