export class Escenario{
    constructor(matriz,elementoHTML,unidadAnchoDeseada,colorBordes = "white"){
        this.matriz=matriz
        this.colorBordes = colorBordes;
        this.renderizarLaberinto(elementoHTML, unidadAnchoDeseada);
        this.objetosCasilleros = []; // La matriz de objetos Casilleros
        //entiendo la facilidad pero le buscaria la vuelta para que sea todo orientado a objetos
      for (let f = 0; f < matrizCruda.length; f++) {
        let newRow = [];
        for (let c = 0; c < matrizCruda[f].length; c++) {
          let newCas;
          if (matrizCruda[f][c] == 1) {
            newCas = new Casillero("wall", f, c, unidadAnchoDeseada, this.colorBordes);
          } else if (matrizCruda[f][c] == 0) {
            newCas = new Casillero("path", f, c, unidadAnchoDeseada, this.colorBordes);
          } else {
            console.log("ERROR EN CASILLEROS");
          }
          newRow.push(newCas);
          this.elementoHTML.appendChild(newCas.elementoHTML);
        }
        this.objetosCasilleros.push(newRow);
      }
    }
    

    renderizarLaberinto(elementoHTML, unidadAnchoDeseada) {
        this.unidadAncho = unidadAnchoDeseada;
        this.anchoTotal = this.unidadAncho * this.matrizCruda[0].length;
        this.altoTotal = this.unidadAncho * this.matrizCruda.length;
        this.elementoHTML = elementoHTML;
        this.elementoHTML.style.width = this.anchoTotal + "px";
        this.elementoHTML.style.height = this.altoTotal + "px";
      }
    }

    
class Casillero {
    constructor(type, fila, columna) {
      this.elementoHTML = document.createElement("DIV");
      this.elementoHTML.classList.add("casillero");
      this.idElemento = "cas-" + fila + "-" + columna;
      this.elementoHTML.setAttribute("id", this.idElemento);
  
      this.occupants = [];
      this.setear(type)
    }
    setear(tipo) {
      this.type = tipo;
      this.walkable = tipo == "path";
      this.elementoHTML.setAttribute("class", "casillero " + tipo);
    }
  }