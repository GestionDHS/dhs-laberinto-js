import { ControladorDeBloques } from "./ControladorDeBloques";
import { VisualizadorDebugger } from "./VisualizadorDebugger";

export class Juego {
  constructor(
    listaBloquesAGenerar
  ) {
    this.controlador = new ControladorDeBloques();
    this.vizualizador = new VisualizadorDebugger();
    this.listaBloquesAGenerar = listaBloquesAGenerar;
    this.listaBloquesDisponibles = document.getElementById(
      "dhs-lista-bloques-disponibles"
    );
    this.listaBloquesInstrucciones =
      document.getElementById("dhs-instrucciones");
  }

  renderizarBloquesDisponibles(listaARenderizar, listaAGenerar) {
    let listaDeObjetos = this.controlador.crearBloques(listaAGenerar);
    listaDeObjetos.forEach((unBloque) =>
      listaARenderizar.appendChild(unBloque)
    );
  }
}
