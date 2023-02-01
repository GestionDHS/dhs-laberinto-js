import { ControladorDeBloques } from "./ControladorDeBloques";
import { VisualizadorDebugger } from "./VisualizadorDebugger";
import { Escenario } from "./Escenario";

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

  renderizarBloquesDisponibles(listaARenderizar, listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(
      listaAGenerar
    );
    listaDeObjetos.forEach((unBloque) =>
      listaARenderizar.appendChild(unBloque)
    );
    this.controlador.hacerloSortable(this.listaBloquesDisponibles,this.listaBloquesInstrucciones)
    
  }
  generarEscenario(tablero,unidadAnchoDeseada, elementoHTML){
    this.escenario = new Escenario(tablero,unidadAnchoDeseada,elementoHTML)
    this.escenario.crearEscenario()
  }
  
}
