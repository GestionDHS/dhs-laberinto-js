//import { ControladorDeBloque } from "./ControladorDeBloque";
import { VisualizadorDebugger } from "./VisualizadorDebugger";
import { Escenario } from "./Escenario";
import { Personaje } from "./Personaje";
import { Modal } from "./Modal";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import * as acorn from "acorn";

export class Juego {
  constructor(toolbox, duracionIntervalos = 1000) {
    this.modo = "inicio";
    this.botonEjecutar = document.getElementById("dhs-boton");
    //this.controlador = new ControladorDeBloque();
    this.vizualizador = new VisualizadorDebugger();
    this.duracionIntervalos = duracionIntervalos;
    this.listaBloquesDisponibles = document.getElementById(
      "dhs-lista-bloques-disponibles"
    ); //es el ul
    this.listaBloquesInstrucciones = document.getElementById(
      "dhs-lista-instrucciones"
    );
    //this.controlador.borrarTodo();
    this.escenario = {};
    this.listaDePersonajes = [];
    //this.habilitar();
    this.workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      trashcan: true,
    });
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

  generarWorkspace() {
    this.workspace.addChangeListener((e) => {
      //e.preventDefault();
      //Blockly.Events.disableOrphans(e);
      // if (e.type === Blockly.Events.BLOCK_CHANGE) {
      // Evitar la propagación del evento

      // e.stopPropagation();
      // if (e.type === Blockly.Events.BLOCK_CHANGE && !e.isUiEvent) {
      console.log(e);
      this.updateCode();
      //}
      //}
    });
  }
  updateCode2() {
    const workspace = Blockly.getMainWorkspace();
    javascriptGenerator.init(workspace);
    const allBlocks = workspace.getAllBlocks();
    //console.log(allBlocks[0].getFieldValue());
    //const code = Blockly.JavaScript.blockToCode(allBlocks[0]);
    const cadena = javascriptGenerator.statementToCode(
      allBlocks[0],
     "MOVERDERECHA"
    );
    console.log(cadena);

    // for (let i = 0; i < topBlocks.length; i++) {
    //   let block = topBlocks[i];
    //   console.log(block.type);
    //   if (block.nextConnection && block.nextConnection.targetConnection) {
    //     let nextBlock = block;
    //     let code;
    //     while (nextBlock) {
    //       //const code = Blockly.JavaScript.blockToCode(nextBlock);
    //       code += Blockly.JavaScript[nextBlock.type](nextBlock);
    //       console.log(code);
    //       nextBlock = nextBlock.getNextBlock();
    //     }
    //     //const Interpreter = acorn.Interpreter;
    //     function fun(interpreter){
    //     let wrapper = this.listaDePersonajes[30].moverDerecha
    //     interpreter.setProperty(this, 'moverDerecha', interpreter.createNativeFunction(wrapper));
    //     }
    //     const int = Interpreter(code, fun);
    //     //int.setProperty(this, "moverDerecha",  int.createNativeFunction(this.listaDePersonajes[30].moverDerecha()))
    //     //int.setProperty(this, "moverDerecha",  int.createNativeFunction(console.log("pepe")))

    //     int.run();
    //     console.log("El bloque tiene bloques subsiguientes hacia abajo");
    //   } else {
    //     console.log("El bloque no tiene bloques subsiguientes hacia abajo");
    //   }
    // }
  }
  updateCode() {
    console.log("entra a updateCode");
    const code = Blockly.JavaScript.workspaceToCode(this.workspace);
    const connectedCode = this.getAllConnectedCode(
      this.workspace.getTopBlocks()[0]
    );
    //console.log(connectedCode);
    const finalCode = code + connectedCode;
    console.log(finalCode.length); //me renderiza la palabra como si fuera un array
    document.getElementById("textarea").value = finalCode;
  }
  getAllConnectedCode(block) {
    let code = "";
    //for (let block of blocks) {
    if (block !== undefined) {
      let currentBlock = block.getNextBlock();
      //while (currentBlock) {
      console.log(block);
      code += Blockly.JavaScript[currentBlock.type](currentBlock);
      currentBlock = currentBlock.getNextBlock();
      //}
    }
    //}

    return code;
  }

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

  habilitarEjecucion() {
    this.botonEjecutar.addEventListener("click", (e) => {
      this.ejecutar();
    });
    this.botonEjecutar.disabled = false;
  }
  deshabilitarEjecucion() {
    this.botonEjecutar.setAttribute("onclick", "");
    this.botonEjecutar.disabled = true;
  }

  habilitar() {
    this.habilitarEjecucion();
    //falta el booleano para controlar el sort en el controlador
  }

  deshabilitar() {
    this.deshabilitarEjecucion();
    //falta el booleano para controlar el sort en el controlador
  }

  ejecutar() {
    console.log("hola btn ejecutar");
    //this.deshabilitar();
    //this.reiniciar();
    this.modo = "prerun";
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
    this.updateCode2();
  }

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
