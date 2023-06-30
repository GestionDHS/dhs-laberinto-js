import { DHS_Gallery } from "./Dhs-galeria";

export class Escenario {
  constructor(
    dimensiones,
    tablero,
    unidadAnchoDeseada,
    elementoHTML,
    colorBordes,
    objetoCamino,
    objetoPared
  ) {
    this.galeria = new DHS_Gallery();
    this.dimensiones = dimensiones;
    this.tablero = tablero;
    this.unidadAnchoDeseada = unidadAnchoDeseada;
    this.elementoHTML = elementoHTML;
    this.colorBordes = colorBordes;
    this.objetoCamino = objetoCamino;
    this.objetoPared = objetoPared;
    this.objetosCasilleros = []; // La matriz de objetos Casillero
  }
  crearEscenario() {
    for (let fila = 0; fila < this.dimensiones[0]; fila++) {
      let nuevaFila = [];
      for (let col = 0; col < this.dimensiones[1]; col++) {
        let nuevoCasillero = this.crearCasillero(fila, col);
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
     
      .personaje{
        width: ${this.unidadAnchoDeseada}em;
        height: ${this.unidadAnchoDeseada}em;
        position: absolute;
      }
      `;
    // .casillero-arbol{
    //   background-image: url(${this.galeria.obtenerUrlDe(
    //     this.objetoPared.estadosPosibles.normal.imageUrl
    //   )})
    // }

    // .casillero-camino{
    //   background-image: url(${this.galeria.obtenerUrlDe(
    //     this.objetoCamino.estadosPosibles.normal.imageUrl
    //   )})
    //}
    document.querySelector("head").appendChild(reglaCasilleros);
    this.renderizarLaberinto();
  }

  crearCasillero(fila, columna) {
    return new Casillero(fila, columna);
  }

  renderizarLaberinto() {
    let anchoTotal = this.unidadAnchoDeseada * this.tablero[0].length;
    let altoTotal = this.unidadAnchoDeseada * this.tablero.length;
    this.elementoHTML.style.width =
      anchoTotal + this.tablero[0].length * 2 * 0.16 + "em";
    this.elementoHTML.style.height = altoTotal + "em";
  }
  obtenerCasillero(posicionY, posicionX) {
    //console.log(this.objetosCasilleros[posicionY][posicionX]);
    const fila = this.objetosCasilleros[posicionY];
    const casillero = fila ? fila[posicionX] : null;
    return casillero;
  }
}

export class Casillero {
  constructor(fila, columna) {
    this.fila = fila;
    this.columna = columna;
    this.casilla = document.createElement("DIV");
    this.ocupantes = [];
  }

  esPisable() {
    return this.tipo == "camino";
  }

  hayColisionCon(colisiones) {
    let obj = { factorDeAvance: 1 };
    colisiones.forEach((o) => {
      let objetoColisionante = this.verSiExisteEnArray(o);
      if (objetoColisionante) {
        obj = o;
        obj.objetoColisionante = objetoColisionante;
      }
    });
    return obj;
  }
  verSiExisteEnArray(object) {
    let objEncontrado = this.ocupantes.find(
      (o) => o.tipoPersonaje === object.con
    );
    return objEncontrado;
  }
}
