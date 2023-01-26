import { ControladorDeBloques } from "./ControladorDeBloques";
import { VizualizadorDebugger } from "./VizualizadorDebugger";

export class Juego {
  constructor(
    listaBloquesAGenerar,
    listaBloquesDisponibles,
    listaBloquesInstrucciones /*escenario*/
  ) {
    this.controlador = new ControladorDeBloques();
    this.vizualizador = new VizualizadorDebugger();
    this.listaBloquesAGenerar = listaBloquesAGenerar;
    this.listaBloquesDisponibles = listaBloquesDisponibles;
    this.listaBloquesInstrucciones = listaBloquesInstrucciones;
  }

  renderizarBloquesDisponibles(listaAGenerar) {
    console.log("llegue al controlador");
    console.log(listaAGenerar);
    console.log(this.controlador);
    console.log(this.visualizador);
    this.controlador.crearBloques(listaAGenerar)
    console.log("salidelMetodo");
  }
}
