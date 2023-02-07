import { DHS_Gallery } from "./Dhs-galeria";

export class Escenario {
  constructor(tablero, unidadAnchoDeseada, elementoHTML,colorBordes,nombreImagenCamino,nombreImagenPared) {
    this.galeria= new DHS_Gallery()
    this.tablero = tablero;
    this.unidadAnchoDeseada = unidadAnchoDeseada;
    this.elementoHTML = elementoHTML;
    this.colorBordes=colorBordes;
    this.nombreImagenCamino=nombreImagenCamino;
    this.nombreImagenPared=nombreImagenPared;
    this.objetosCasilleros = []; // La matriz de objetos Casilleros
  }
  crearEscenario() {
    for (let fila = 0; fila < this.tablero.length; fila++) {
      let nuevaFila = [];
      for (let columna = 0; columna < this.tablero[fila].length; columna++) {
        let nuevoCasillero;
        nuevoCasillero = this.tablero[fila][columna] == 1 ? this.crearCasilleroTipo("pared", this.nombreImagenPared, fila, columna):this.crearCasilleroTipo("camino", this.nombreImagenCamino,  fila, columna);
        nuevaFila.push(nuevoCasillero);
        this.elementoHTML.appendChild(nuevoCasillero.casilla);
      }
      this.objetosCasilleros.push(nuevaFila);
    }
    const reglaCasilleros = document.createElement("STYLE");
    reglaCasilleros.innerHTML = `
      .casillero{
        float:left;
        background-size: cover;
        width: ${this.unidadAnchoDeseada}em;
        height: ${this.unidadAnchoDeseada}em;
        border: 1px solid ${this.colorBordes};
      }
      .casillero-pared{
        background-image: url(${this.galeria.obtenerUrlDe(this.nombreImagenPared)})
      }

      .casillero-camino{
        background-image: url(${this.galeria.obtenerUrlDe(this.nombreImagenCamino)})
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

  crearCasilleroTipo(caminoOPared,imagen, fila, columna) {
    return new Casillero(caminoOPared, imagen, fila, columna);
  }

  renderizarLaberinto() {
    let anchoTotal = this.unidadAnchoDeseada * this.tablero[0].length;
    let altoTotal = this.unidadAnchoDeseada * this.tablero.length;
    this.elementoHTML.style.width =  (anchoTotal+((this.tablero[0].length)*2)*0.16) + "em" ;
    this.elementoHTML.style.height = (altoTotal) + "em";
  }
}

export class Casillero {
  constructor(caminoOPared, fila, columna) {
    this.fila=fila;
    this.columna=columna;
    this.casilla = document.createElement("DIV");
    this.casilla.classList.add(`casillero-${caminoOPared}`);
    this.casilla.classList.add(`casillero`);
    this.tipo = caminoOPared;
  }
}
