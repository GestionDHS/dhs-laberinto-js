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

  renderizarBloquesDisponibles(listaARenderizar,listaAGenerar) {
    listaARenderizar=this.controlador.crearBloques(listaAGenerar)
    return listaARenderizar
  }
}
