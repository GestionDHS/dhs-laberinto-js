import { DHS_Gallery } from "./Dhs-galeria";

export class Escenario {
  constructor(
    dimensiones,
    unidadAnchoDeseada,
    elementoHTML,
    colorBordes
  ) {
    this.galeria = new DHS_Gallery();
    this.dimensiones = dimensiones;
    this.unidadAnchoDeseada = unidadAnchoDeseada;
    this.elementoHTML = elementoHTML;
    this.colorBordes = colorBordes;
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
    document.querySelector("head").appendChild(reglaCasilleros);
    this.renderizarLaberinto();
  }

  crearCasillero(fila, columna) {
    return new Casillero(fila, columna);
  }

  renderizarLaberinto() {
    let anchoTotal = this.unidadAnchoDeseada * this.dimensiones[1];
    let altoTotal = this.unidadAnchoDeseada * this.dimensiones[0];
    this.elementoHTML.style.width = anchoTotal + "em";
    this.elementoHTML.style.height = altoTotal + "em";
  }
  obtenerCasillero(posicionY, posicionX) {
    const fila = this.objetosCasilleros[posicionY];
    const casillero = fila ? fila[posicionX] : null;
    return casillero;
  }
  iluminarCasilleros(posiciones,classCss){
    posiciones.forEach((posicion)=>{
      this.objetosCasilleros[posicion[0]][posicion[1]].agregarClassCss(classCss)
    })
    //console.log("setear classCss")
  }
}

export class Casillero {
  constructor(fila, columna) {
    this.fila = fila;
    this.columna = columna;
    this.casilla = document.createElement("DIV");
    this.casilla.classList.add("casillero");
    this.ocupantes = [];
  }

  esPisable() {
    return this.tipo == "camino";
  }

  hayColisionCon(colisiones) {
    let obj = { factorDeAvance: 1 };
    colisiones.forEach((objeto) => {
      let objetoColisionante = this.verSiExisteEnArray(objeto);
      if (objetoColisionante) {
        obj = objeto;
        obj.objetoColisionante = objetoColisionante;
      }
    });
    return obj;
  }
  verSiExisteEnArray(object) {
    let objEncontrado = this.ocupantes.find(
      (ocupante) => ocupante.tipoPersonaje === object.con
    );
    return objEncontrado;
  }

  vaciarCasillas(){
    this.ocupantes=[]
  }
 agregarClassCss(classCss){
  this.casilla.classList.add(classCss);
 }
}
