import { DHS_Gallery } from "./Dhs-galeria";

export class Personaje {
  constructor(escenario, nombre, filaInicial, columnaInicial, estadoInicial) {
    this.escenario = escenario;
    this.galeria= new DHS_Gallery()
    this.imagen= this.galeria.obtenerUrlDe(nombre)
    this.nombre = nombre;
    this.filaInicial = filaInicial;
    this.columnaInicial = columnaInicial;
    this.filaActual = filaInicial ;
    this.columnaActual = columnaInicial;
    this.estadoInicial = estadoInicial;
    this.vivo = true;
  }

  crearPersonaje(){
    this.filaActual = this.filaInicial
    this.columnaActual = this.columnaActual
  }
}
