import { ControladorDeBloques } from "./ControladorDeBloques";
import { VisualizadorDebugger } from "./VisualizadorDebugger";

export class Juego {
  constructor(listaBloquesAGenerar) {
    this.controlador = new ControladorDeBloques();
    this.vizualizador = new VisualizadorDebugger();
    this.listaBloquesAGenerar = listaBloquesAGenerar;
    this.listaBloquesDisponibles = document.getElementById(
      "dhs-lista-bloques-disponibles"
    );//es el ul
    this.listaBloquesInstrucciones =
      document.getElementById("dhs-lista-instrucciones");
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
  
}
