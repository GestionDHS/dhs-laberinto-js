//import { ControladorDeBloque } from "./ControladorDeBloque";
//import { VisualizadorDebugger } from "./VisualizadorDebugger";
import { Escenario } from "./Escenario";
import { Personaje } from "./Personaje";
import { Modal } from "./Modal";

// import { javascriptGenerator } from "blockly/javascript";
// import * as acorn from "acorn";
// import Interpreter from "js-interpreter";

export class Juego {
  constructor(duracionIntervalos = 1000) {
    this.modo = "inicio";
    //this.botonEjecutar = document.getElementById("dhs-boton");
    //this.controlador = new ControladorDeBloque();
    // this.vizualizador = new VisualizadorDebugger();
    this.duracionIntervalos = duracionIntervalos;
    // this.listaBloquesDisponibles = document.getElementById(
    //   "dhs-lista-bloques-disponibles"
    // ); //es el ul
    // this.listaBloquesInstrucciones = document.getElementById(
    //   "dhs-lista-instrucciones"
    // );
    //this.controlador.borrarTodo();
    this.escenario = {};
    this.listaDePersonajes = [];
    this.puedeDebeContinuar = true;
    //this.habilitar();
    // this.workspace = Blockly.inject("blocklyDiv", {
    //   toolbox: toolbox,
    //   trashcan: true,
    //   plugins: {
    //     metricManager: this,
    //   },
    // });
  }

  /* PARA GENERAR LOS BLOQUES EN PANTALLA EN CADA UNA DE LAS LISTAS */

  // DEBE RECIBIR LA INSTANCIA DEL JUEGO Y LA LISTA DE BLOQUES QUE NECESITO CREAR
  // renderizarBloquesDisponibles(listaAGenerar) {
  //   let listaDeObjetos = this.controlador.crearBloques(listaAGenerar);
  //   listaDeObjetos.forEach((unBloque) =>
  //     this.listaBloquesDisponibles.appendChild(unBloque)
  //   );
  //   this.controlador.hacerloSortable(
  //     this.listaBloquesDisponibles,
  //     this.listaBloquesInstrucciones
  //   );
  // }

  // generarWorkspace() {
  //   this.workspace.addChangeListener((e) => {
  //     //e.preventDefault();
  //     //Blockly.Events.disableOrphans(e);
  //     // if (e.type === Blockly.Events.BLOCK_CHANGE) {
  //     // Evitar la propagación del evento

  //     // e.stopPropagation();
  //     // if (e.type === Blockly.Events.BLOCK_CHANGE && !e.isUiEvent) {
  //     console.log(e);
  //     this.updateCode();
  //     //}
  //     //}
  //   });
  // }

  // initFunc = (interpreter, globalObject) => {
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverDerecha",
  //     interpreter.createNativeFunction(function moverDerecha() {
  //       miJuego.listaDePersonajes[30].moverDerecha();
  //     })
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverAbajo",
  //     interpreter.createNativeFunction(function moverAbajo() {
  //       miJuego.listaDePersonajes[30].moverAbajo();
  //     })
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverArriba",
  //     interpreter.createNativeFunction(function moverArriba() {
  //       miJuego.listaDePersonajes[30].moverArriba();
  //     })
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "moverIzquierda",
  //     interpreter.createNativeFunction(function moverIzquierda() {
  //       miJuego.listaDePersonajes[30].moverIzquierda();
  //     })
  //   );
  //   interpreter.setProperty(
  //     globalObject,
  //     "highlightBlock",
  //     interpreter.createNativeFunction(function (id) {
  //       id = String(id || "");
  //       return highlightBlock(id);
  //     })
  //   );
  // };
  // myInterpreter = null;
  // highlightPause = false;

  // iniciarEspacio() {
  //   javascriptGenerator.init(this.workspace);
  //   let block = this.workspace.getBlocksByType("event_onclick")[0];
  //   this.code = javascriptGenerator["event_onclick"](block);
  //   javascriptGenerator.STATEMENT_PREFIX = "highlightBlock(%1);\n";
  //   javascriptGenerator.addReservedWords("highlightBlock");
  // }

  // highlightBlock(id) {
  //   this.workspace.highlightBlock(id);
  //   this.highlightPause = true;
  // }

  // nextStep() {
  //   if (!this.myInterpreter) {
  //     this.myInterpreter = new Interpreter(this.code, this.initFunc);
  //   }
  //   let hasMoreCode;
  //   hasMoreCode = this.myInterpreter.step();

  //   console.log(hasMoreCode);
  //   // console.log();
  //   if (hasMoreCode) {
  //     setTimeout(() => {
  //       // this.highlightPause = true;
  //       this.nextStep();
  //     }, 200);
  //   }
  //   return;
  // }

  // updateCode() {
  //   this.reiniciar();
  //   this.iniciarEspacio();
  //   //Codigo lo genera

  //   // let block = this.workspace.getBlocksByType('event_onclick')[0];
  //   // let code = javascriptGenerator['event_onclick'](block);
  //   document.getElementById("textarea").value = this.code;

  //   this.nextStep();
  //   // let currentNode = myInterpreter.stateStack[myInterpreter.stateStack.length - 1].node;
  //   // let blockId = currentNode.id;

  //   // myInterpreter.run()
  // }

  // renderizarBloquesPrecargados(listaAGenerar) {
  //   let listaDeObjetos = this.controlador.crearBloques(listaAGenerar);
  //   listaDeObjetos.forEach((unBloque) =>
  //     this.listaBloquesInstrucciones.appendChild(unBloque)
  //   );
  //   this.controlador.hacerloSortable(
  //     this.listaBloquesDisponibles,
  //     this.listaBloquesInstrucciones
  //   );
  // }

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
  renderizarPersonajes(tablero) {
    //1 = árboles - 0 = camino
  }
  setearVelocidad(nuevaVelocidad) {
    this.duracionIntervalos = nuevaVelocidad;
    this.listaDePersonajes.forEach((personaje) =>
      personaje.setearVelocidad(nuevaVelocidad)
    );
  }

  // habilitarEjecucion() {
  //   this.botonEjecutar.addEventListener("click", (e) => {
  //     this.ejecutar();
  //   });
  //   this.botonEjecutar.disabled = false;
  // }
  // deshabilitarEjecucion() {
  //   this.botonEjecutar.setAttribute("onclick", "");
  //   this.botonEjecutar.disabled = true;
  // }

  // habilitar() {
  //   this.habilitarEjecucion();
  //   //falta el booleano para controlar el sort en el controlador
  // }

  // deshabilitar() {
  //   this.deshabilitarEjecucion();
  //   //falta el booleano para controlar el sort en el controlador
  // }

  //ejecutar() {
  // console.log("hola btn ejecutar");
  //this.deshabilitar();
  //this.reiniciar();
  //this.modo = "prerun";
  //obtengo todo el workspace
  // const workspaceblock = Blockly.getMainWorkspace();
  // //obtengo solo blockes que fueron arrastrados al workspace
  // // const bloqueTop = workspaceblock.getTopBlocks[0]()
  // // console.log(bloqueTop)
  // const blocks = workspaceblock.getAllBlocks();
  // blocks.forEach((block) => {
  //   //console.log(block.type); //acá viene el move_down_simple
  //   console.log(block.getTooltip());
  // });
  //this.updateCode();
  // this.nextStep();
  // }

  reiniciar() {
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
}
