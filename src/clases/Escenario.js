class Escenario{
    constructor(tablero,unidadAnchoDeseada){
        this.tablero=tablero
        this.unidadAnchoDeseada=unidadAnchoDeseada
        this.renderizarLaberinto(elementoHTML, unidadAnchoDeseada);
        this.objetosCasilleros = []; // La matriz de objetos Casilleros
        for (let fila = 0; fila < tablero.length; fila++) {
            let nuevaFila = [];
            for (let columna = 0; columna < tablero[fila].length; c++) {
                let nuevoCasillero;
                tablero[fila][columna]==1?this.crearCasilleroTipo("pared"):this.crearCasilleroTipo("camino")
                nuevaFila.push(nuevoCasillero);
                this.elementoHTML.appendChild(nuevoCasillero.elementoHTML);
            }
            this.objetosCasilleros.push(nuevaFila);
          }
    }   
   

    crearCasilleroTipo(caminoOPared){
        newCas = new Casillero(caminoOPared, filas, columnas);
    }

    renderizarLaberinto(elementoHTML, unidadAnchoDeseada){
        this.unidadAncho = unidadAnchoDeseada
        this.anchoTotal = this.unidadAncho * this.tablero[0].length
        this.altoTotal = this.unidadAncho * this.tablero.length
        this.elementoHTML = elementoHTML
        this.elementoHTML.style.width = this.anchoTotal + "px"
        this.elementoHTML.style.height = this.altoTotal + "px"
    }      
    }




class Casillero{
    constructor(fila,columna){
        this.casilla = document.createElement("DIV");
        this.casilla.classList.add("casillero");
        this.idElemento = "cas-" + fila + "-" + columna;
        this.casilla.setAttribute("id", this.idElemento);
    }
}