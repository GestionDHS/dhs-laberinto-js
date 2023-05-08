import { ControladorDeBloque } from "./ControladorDeBloque";
import { VisualizadorDebugger } from "./VisualizadorDebugger";
import { Escenario } from "./Escenario";
import { Personaje } from "./Personaje";


export class Juego {
  constructor(listaBloquesAGenerar, duracionIntervalos = 1000) {
    this.modo="inicio"
    this.botonEjecutar = document.getElementById("dhs-boton");
    this.controlador = new ControladorDeBloque();
    this.vizualizador = new VisualizadorDebugger();
    this.duracionIntervalos = duracionIntervalos;
    this.listaBloquesAGenerar = listaBloquesAGenerar;
    this.listaBloquesDisponibles = document.getElementById(
      "dhs-lista-bloques-disponibles"
    ); //es el ul
    this.listaBloquesInstrucciones = document.getElementById(
      "dhs-lista-instrucciones"
    );
    this.controlador.borrarTodo();
    this.escenario = {};
    this.listaDePersonajes = [];
    this.habilitar()
  }

  /* PARA GENERAR LOS BLOQUES EN PANTALLA EN CADA UNA DE LAS LISTAS */

  // DEBE RECIBIR LA INSTANCIA DEL JUEGO Y LA LISTA DE BLOQUES QUE NECESITO CREAR
  renderizarBloquesDisponibles(listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(listaAGenerar);
    listaDeObjetos.forEach((unBloque) =>
      this.listaBloquesDisponibles.appendChild(unBloque)
    );
    this.controlador.hacerloSortable(
      this.listaBloquesDisponibles,
      this.listaBloquesInstrucciones
    );
  }

  renderizarBloquesPrecargados(listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(listaAGenerar);
    listaDeObjetos.forEach((unBloque) =>
      this.listaBloquesInstrucciones.appendChild(unBloque)
    );
    this.controlador.hacerloSortable(
      this.listaBloquesDisponibles,
      this.listaBloquesInstrucciones
    );
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
    this.escenario.crearEscenario();
  }
  generarCaminoYpared(dimensiones,tablero,pared,camino){
    for(let fila = 0; fila < dimensiones[0]; fila++){
      for(let col = 0;col < dimensiones[1]; col++){
        if(tablero[fila][col]==1){
          pared.posicionInicialX=col
          pared.posicionInicialY=fila
          this.generarPersonajes([pared])
        }
        else{
          camino.posicionInicialX=col
          camino.posicionInicialY=fila
          this.generarPersonajes([camino])
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
  renderizarPersonajes(tablero){
    //1 = árboles - 0 = camino

  }
  setearVelocidad(nuevaVelocidad) {
    this.duracionIntervalos = nuevaVelocidad;
    this.listaDePersonajes.forEach(personaje => personaje.setearVelocidad(nuevaVelocidad))
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
    console.log("hola lucho ")
    this.deshabilitar();
    this.reiniciar();
    this.modo = "prerun";
  }

  reiniciar() {
    this.modo = "inicio";
    this.listaDePersonajes.forEach((personaje) => {
      personaje.inicializar();
    });
  }
}
