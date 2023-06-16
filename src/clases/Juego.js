import { Escenario } from "./Escenario";
import { Personaje } from "./Personaje";
import { Modal } from "./Modal";

export class Juego {
  constructor(duracionIntervalos = 1000) {
    this.modo = "inicio"; //Este atributo va a volar someday
    this.sincronico = true;
    this.duracionIntervalos = duracionIntervalos;
    this.escenario = {};
    this.listaDePersonajes = [];
    this.personajePrincipal = null;
    this.puedeDebeContinuar = true;
    this.funcionesPublicadas = [];
  }

  /*PARA RENDERIZAR ESCENARIO*/
  // La funcion recibe la matriz tablero la unidad de ancho, el color de bordes, nombre imagen pared, nombre imagen camino

  generarEscenario(
    dimensiones,
    tablero,
    unidadAnchoDeseada,
    colorBordes,
    objetoPared,
    objetoCamino
  ) {
    const elementoHTMLLaberinto = document.getElementById("elemento-escenario");
    this.escenario = new Escenario(
      dimensiones,
      tablero,
      unidadAnchoDeseada,
      elementoHTMLLaberinto,
      colorBordes,
      objetoCamino,
      objetoPared
    );
    //console.log(this.escenario)
    this.escenario.crearEscenario();
  }
  generarCaminoYpared(dimensiones, tablero, pared, camino) {
    for (let fila = 0; fila < dimensiones[0]; fila++) {
      for (let col = 0; col < dimensiones[1]; col++) {
        if (tablero[fila][col] == 1) {
          pared.posicionInicialX = col;
          pared.posicionInicialY = fila;
          this.generarPersonajes([pared]);
        } else {
          camino.posicionInicialX = col;
          camino.posicionInicialY = fila;
          this.generarPersonajes([camino]);
        }
      }
    }
  }

  generarPersonajes(arrayDePersonajes) {
    //console.log(arrayDePersonajes)
    arrayDePersonajes.forEach((personaje) => {
      const unPersonaje = new Personaje(personaje, this);
      this.listaDePersonajes.push(unPersonaje);
    });
  }

  setearPersonajePrincipal(personaje) {
    this.personajePrincipal = personaje;
  }

  // renderizarPersonajes(tablero) {
  //   //1 = árboles - 0 = camino
  // }
  setearVelocidad(nuevaVelocidad) {
    this.duracionIntervalos = nuevaVelocidad;
    this.listaDePersonajes.forEach((personaje) =>
      personaje.setearVelocidad(nuevaVelocidad)
    );
  }
  
  setearSincronicidad(boolean) {
    this.sincronico = boolean;
  }

  reiniciar() {
    this.puedeDebeContinuar = true;
    this.modo = "inicio";
    this.listaDePersonajes.forEach((personaje) => {
      personaje.inicializar();
    });
    this.datosModal.ocultar();
  }

  agregarModal(datosModal) {
    this.datosModal = new Modal(datosModal, this);
    return this.datosModal;
  }
  agregarModalError(datosModalError) {
    //pia
    this.datosModalError = new Modal(datosModalError, this);
    return this.datosModalError;
  }

  habilitarFuncionGlobal(nombre, bindearCon = this.personajePrincipal){
    window[nombre] = bindearCon[nombre].bind(bindearCon);
  }

  agregarGlobalConCallback(nombre, bindearCon = this.personajePrincipal){
    this.habilitarFuncionGlobal(nombre, bindearCon);
    this.funcionesPublicadas.push(nombre)   
  } // llamar en instancia para cada movimiento deseado

  generarCallbackParaInterprete(){
    const lista = this.funcionesPublicadas;
    return function(interpreter, globalObject){
      lista.forEach(nombreFuncion=>{
        interpreter.setProperty(globalObject, nombreFuncion,
          interpreter.createNativeFunction(window[nombreFuncion]));              
      })
    }
  }

  // crearFuncionesGlobalesStandard() {
  //   window.moverDerecha = (veces) => {
  //     this.personajePrincipal.moverDerecha(veces);
  //   };
  //   window.moverIzquierda = (veces) => {
  //     this.personajePrincipal.moverIzquierda(veces);
  //   };
  //   window.moverArriba = (veces) => {
  //     this.personajePrincipal.moverArriba(veces);
  //   };
  //   window.moverAbajo = (veces) => {
  //     this.personajePrincipal.moverAbajo(veces);
  //   };
  //   // window.globalMoverIzquierda etc
  // }
  // callbackInterpreteStandard(interpreter, globalObject) {
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverDerecha",
  //     interpreter.createNativeFunction(moverDerecha)
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverIzquierda",
  //     interpreter.createNativeFunction(moverIzquierda)
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverArriba",
  //     interpreter.createNativeFunction(moverArriba)
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverAbajo",
  //     interpreter.createNativeFunction(moverAbajo)
  //   );
  // }
}
