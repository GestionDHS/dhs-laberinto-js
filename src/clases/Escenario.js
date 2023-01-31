class Escenario{
    constructor(tablero){
        this.tablero=tablero
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