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
  PersonajesAlAzarRangoFijos,
  PersonajesAlAzarFijos,
  PersonajesAlAzarExcluyente,
  PersonajesAlAzarCantTotal,
  PersonajesAlAzarCantTotalFijos,
  PersonajesPosicionAlAzarExcluyente,
} from "../clases/StrategyCreacion";

import { Modal } from "./Modal";
import { obtenerCantidadAleatoria } from "../Utils/Funciones";

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
    this.escenario.crearEscenario();
  }

  reiniciarConjuntoPersonajes() {
    this.listaDePersonajes.forEach((personaje) => {
      personaje.reiniciarse();
    });
    this.listaDePersonajes = this.listaDePersonajes.filter(
      (personaje) => personaje.desapareceAlReiniciar != true
    );
  }

  reiniciar() {
    this.puedeDebeContinuar = true;
    this.reiniciarConjuntoPersonajes();
    this.generarConjuntoDePersonajes(this.listaDeAleatoreos);
  }

  generarPersonaje(personaje) {
    const clasePersonaje = personaje.clasePersonaje;
    let unPersonaje;
    if (clasePersonaje) {
      unPersonaje = new this.clasesPersonajesPosibles[clasePersonaje](
        personaje,
        this
      );
    } else {
      unPersonaje = new PersonajeBasico(personaje, this);
    }
    this.listaDePersonajes.push(unPersonaje);
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

  generarConjuntoDePersonajes(conjuntosDePersonajes) {
    const estrategias = {
      fijos: new PersonajesFijos(),
      azarRango: new PersonajesAlAzarRango(),
      azarRangoFijos: new PersonajesAlAzarRangoFijos(),
      azarFijos: new PersonajesAlAzarFijos(),
      azarExcluyente: new PersonajesAlAzarExcluyente(),
      posicionExcluyente: new PersonajesPosicionAlAzarExcluyente(),
      azarCantTotal: new PersonajesAlAzarCantTotal(),
      azarCantidadTotalFijos: new PersonajesAlAzarCantTotalFijos(),
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

  crearPersonajes(conjuntosDePersonajes) {
    conjuntosDePersonajes.forEach((unConjunto) => {
      if (unConjunto.estrategia != "fijos") {
        this.listaDeAleatoreos.push(unConjunto);
      }
    });
    this.generarConjuntoDePersonajes(conjuntosDePersonajes);
  }

  crearPersonajeEscenarioAleatoreo(conjuntoDePersonajes, tablero) {
    this.crearPersonajes([conjuntoDePersonajes[0]]);
    tablero.forEach((fila, index) => {
      const largoFila = obtenerCantidadAleatoria({
        cantidadMax: fila.length-1,
        cantidadMin: 2,
      });
      for (let i = 0; i <= largoFila; i++) {
        conjuntoDePersonajes[1].posiciones = [[index, i]];
        this.crearPersonajes([conjuntoDePersonajes[1]]);
      }
      //console.log(conjuntoDePersonajes[2])
      conjuntoDePersonajes[2].posiciones = [[index, largoFila]];
      this.crearPersonajes([conjuntoDePersonajes[2]])
      //console.log(conjuntoDePersonajes[2].posiciones)
    });
  }
}
