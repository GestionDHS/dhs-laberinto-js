import { ControladorDeBloques } from "./ControladorDeBloques";
import { VisualizadorDebugger } from "./VisualizadorDebugger";
import { Escenario } from "./Escenario";
import { Personaje } from "./Personaje";

export class Juego {
  constructor(listaBloquesAGenerar) {
    this.controlador = new ControladorDeBloques();
    this.vizualizador = new VisualizadorDebugger();
    this.listaBloquesAGenerar = listaBloquesAGenerar;
    this.listaBloquesDisponibles = document.getElementById(
      "dhs-lista-bloques-disponibles"
    );//es el ul
    this.listaBloquesInstrucciones = document.getElementById("dhs-lista-instrucciones");
    this.controlador.borrarTodo()
    this.escenario = {}
  }

  /* PARA GENERAR LOS BLOQUES EN PANTALLA EN CADA UNA DE LAS LISTAS */

// DEBE RECIBIR LA INSTANCIA DEL JUEGO Y LA LISTA DE BLOQUES QUE NECESITO CREAR
  renderizarBloquesDisponibles(listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(
      listaAGenerar
    );
    listaDeObjetos.forEach((unBloque) =>
      this.listaBloquesDisponibles.appendChild(unBloque)
    );
    this.controlador.hacerloSortable(this.listaBloquesDisponibles,this.listaBloquesInstrucciones)
  }

  renderizarBloquesPrecargados(listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(
      listaAGenerar
    );
    listaDeObjetos.forEach((unBloque) =>
      this.listaBloquesInstrucciones.appendChild(unBloque)
    );
    this.controlador.hacerloSortable(this.listaBloquesDisponibles,this.listaBloquesInstrucciones)
  }

/*PARA RENDERIZAR ESCENARIO*/
// La funcion recibe la matriz tablero la unidad de ancho, el color de bordes, nombre imagen pared, nombre imagen camino

  generarEscenario(tablero,unidadAnchoDeseada,colorBordes,nombreImagenPared,nombreImagenCamino){
    const elementoHTMLLaberinto = document.getElementById("elemento-escenario")
    this.escenario = new Escenario(tablero,unidadAnchoDeseada,elementoHTMLLaberinto,colorBordes,nombreImagenCamino,nombreImagenPared)
    this.escenario.crearEscenario()
  }
  
  generarPersonajes(arrayDePersonajes){
   arrayDePersonajes.forEach(personaje => new Personaje(personaje,this))
   
  }
}
