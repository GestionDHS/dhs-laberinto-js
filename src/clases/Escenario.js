import { DHS_Gallery } from "./Dhs-galeria";
import { Personaje } from "./Personaje";

export class Escenario {
  constructor(dimensiones,tablero, unidadAnchoDeseada, elementoHTML,colorBordes,objetoCamino,objetoPared) {
    this.galeria= new DHS_Gallery()
    this.dimensiones = dimensiones;
    this.tablero = tablero;
    this.unidadAnchoDeseada = unidadAnchoDeseada;
    this.elementoHTML = elementoHTML;
    this.colorBordes=colorBordes;
    this.objetoCamino=objetoCamino;
    this.objetoPared=objetoPared;
    
    this.objetosCasilleros = []; // La matriz de objetos Casilleros
  }
  crearEscenario() {
    for(let fila = 0; fila < this.dimensiones[0]; fila++){
      let nuevaFila = [];
      for(let col = 0;col < this.dimensiones[1]; col++){
        let nuevoCasillero = this.crearCasillero(fila, col)
        nuevaFila.push(nuevoCasillero);
        this.elementoHTML.appendChild(nuevoCasillero.casilla);
      }
      this.objetosCasilleros.push(nuevaFila);
    }
    // for (let fila = 0; fila < this.tablero.length; fila++) {
    //   let nuevaFila = [];
    //   for (let columna = 0; columna < this.tablero[fila].length; columna++) {
    //     let nuevoCasillero;
    //     nuevoCasillero = this.tablero[fila][columna] == 1 ? this.crearCasilleroTipo("pared",this.objetoPared, fila, columna):this.crearCasilleroTipo("camino", this.objetoCamino,  fila, columna);
    //     nuevaFila.push(nuevoCasillero);
    //     this.elementoHTML.appendChild(nuevoCasillero.casilla);
    //   }}
      
    
    const reglaCasilleros = document.createElement("STYLE");
    reglaCasilleros.innerHTML = `
      .casillero{
        float:left;
        background-size: cover;
        width: ${this.unidadAnchoDeseada}em;
        height: ${this.unidadAnchoDeseada}em;
        border: 1px solid ${this.colorBordes};
      }
      .casillero-arbol{
        background-image: url(${this.galeria.obtenerUrlDe(this.objetoPared.status.normal.imageUrl)})
      }

      .casillero-camino{
        background-image: url(${this.galeria.obtenerUrlDe(this.objetoCamino.status.normal.imageUrl)})
      }
      .personaje{
        width: ${this.unidadAnchoDeseada}em;
        height: ${this.unidadAnchoDeseada}em;
        position: absolute;
      }
      `
    document.querySelector("head").appendChild(reglaCasilleros)
    this.renderizarLaberinto();
  
  }

  crearCasillero( fila, columna) {
    return new Casillero(fila, columna);
  }
  
  renderizarLaberinto() {
    let anchoTotal = this.unidadAnchoDeseada * this.tablero[0].length;
    let altoTotal = this.unidadAnchoDeseada * this.tablero.length;
    this.elementoHTML.style.width =  (anchoTotal+((this.tablero[0].length)*2)*0.16) + "em" ;
    this.elementoHTML.style.height = (altoTotal) + "em";
  }
  obtenerCasillero(posicionY,posicionX){
    return this.objetosCasilleros[posicionY][posicionX]
  }
  
}

export class Casillero {
  constructor(fila, columna) {
    this.fila=fila;
    this.columna=columna;
    this.casilla = document.createElement("DIV");
    this.ocupantes=[]
  }

  esPisable(){
      return this.tipo == "camino"
  }

 hayColisionCon(colisiones){ 
 let obj = {factorDeAvance:1}
     colisiones.forEach(o => { 
    if(this.verSiExisteEnArray(o)) {
      obj = o
    }
     });
     return obj
  }
  verSiExisteEnArray(object){ 
    let objEncontrado= this.ocupantes.find(o=>o.idHTML == object.con)
  return objEncontrado
  }

}
