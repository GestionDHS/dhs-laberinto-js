
import {DHS_Gallery}  from  "./Dhs-galeria"

class ElementosDelTablero {
  constructor( unEscenario, posicion) {
    this.unEscenario = unEscenario;
    this.posicion = posicion
    this.galeria=new DHS_Gallery()
  }

  obtenerImagen(nombreDelObjeto){
    this.galeria.obtenerUrlDe(nombreDelObjeto)
  }
}

export class Lupe extends ElementosDelTablero{
constructor(){
  super()
  this.estaVivo=true
  this.nombre = "lupe"
  this.imagen= this.obtenerImagen(this.nombre)
}

}

export class Barro extends ElementosDelTablero{
  constructor(){
    super()
    this. nombre = "lodo"
  }}
