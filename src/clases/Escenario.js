export class Escenario {
  constructor(tablero, unidadAnchoDeseada, elementoHTML) {
    this.tablero = tablero;
    this.unidadAnchoDeseada = unidadAnchoDeseada;
    this.elementoHTML = elementoHTML;
    this.objetosCasilleros = []; // La matriz de objetos Casilleros
  }
  crearEscenario() {
    for (let fila = 0; fila < this.tablero.length; fila++) {
      let nuevaFila = [];
      for (let columna = 0; columna < this.tablero[fila].length; columna++) {
        let nuevoCasillero;
        nuevoCasillero = this.tablero[fila][columna] == 1? this.crearCasilleroTipo("pared", fila, columna):this.crearCasilleroTipo("camino", fila, columna);
        nuevaFila.push(nuevoCasillero);
        this.elementoHTML.appendChild(nuevoCasillero.casilla);
      }
      this.objetosCasilleros.push(nuevaFila);
    }
    this.renderizarLaberinto();
  }

  crearCasilleroTipo(caminoOPared, fila, columna) {
    return new Casillero(caminoOPared, fila, columna);
  }

  renderizarLaberinto() {
    this.anchoTotal = this.unidadAnchoDeseada * this.tablero[0].length;
    this.altoTotal = this.unidadAnchoDeseada * this.tablero.length;
    this.elementoHTML.style.width = this.anchoTotal + "px";
    this.elementoHTML.style.height = this.altoTotal + "px";
  }
}

class Casillero {
  constructor(caminoOPared, fila, columna) {
    this.casilla = document.createElement("DIV");
    this.casilla.classList.add(`casillero-${caminoOPared}`);
    this.idElemento = "cas-" + fila + "-" + columna;
    this.casilla.setAttribute("id", this.idElemento);
    this.tipo = caminoOPared;
  }
}
