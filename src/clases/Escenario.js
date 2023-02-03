export class Escenario {
  constructor(tablero, unidadAnchoDeseada, elementoHTML,colorBordes,nombreImagenCamino,nombreImagenPared) {
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
        nuevoCasillero = this.tablero[fila][columna] == 1 ? this.crearCasilleroTipo("pared", fila, columna):this.crearCasilleroTipo("camino", fila, columna);
        nuevaFila.push(nuevoCasillero);
        this.elementoHTML.appendChild(nuevoCasillero.casilla);
      }
      this.objetosCasilleros.push(nuevaFila);
    }
    const reglaCasilleros = document.createElement("STYLE");
    reglaCasilleros.innerHTML = `
      .casillero{
        width: ${this.unidadAnchoDeseada}px;
        height: ${this.unidadAnchoDeseada}px;
        border: 1px solid ${this.colorBordes};
      }
      `
    document.querySelector("head").appendChild(reglaCasilleros)
    this.renderizarLaberinto();
    console.log(this.tablero)
  }

  crearCasilleroTipo(caminoOPared, fila, columna) {
    return new Casillero(caminoOPared, fila, columna);
  }

  renderizarLaberinto() {
    this.anchoTotal = this.unidadAnchoDeseada * this.tablero[0].length;
    this.altoTotal = this.unidadAnchoDeseada * this.tablero.length;
    // this.elementoHTML.style.width = this.anchoTotal + "px";
    // this.elementoHTML.style.height = this.altoTotal + "px";
    
    //cantidad de filas x 3.5 + "em"
    //cantidad de colimnas x 3.5 + em
    this.elementoHTML.style.width =  "20em";
    this.elementoHTML.style.height = "18em";
  }
}

class Casillero {
  constructor(caminoOPared, fila, columna) {
    this.casilla = document.createElement("DIV");
    this.casilla.classList.add(`casillero-${caminoOPared}`);
    this.casilla.classList.add(`casillero`);
    this.idElemento = "cas-" + fila + "-" + columna;
    this.casilla.setAttribute("id", this.idElemento);
    this.tipo = caminoOPared;
  }
}
