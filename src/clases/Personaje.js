class Personaje {
  constructor(id, nombre, vidas) {
    this.idPersonaje = id;
    this.nombre = nombre;
    this.vivo = true;
    this.vidas = vidas;
    this.vidasRestantes = vidas;// van a tener más de una vida?
  }
}

//es la parte visible??
class INTERFAZ_PERSONAJE {
    constructor(interfazConfigObj) {
      this.interfazConfigObj = interfazConfigObj;
      this.anchoBase = interfazConfigObj.anchoBase;
      this.imageUrls = interfazConfigObj.imageUrls;
      this.hasTooltips = interfazConfigObj.hasTooltips;
      this.juego = interfazConfigObj.juego;
      if (interfazConfigObj.yaCreadoEnHtml) {
        this.elementoHTML = interfazConfigObj.elementoHTML;
      } else {
        this.elementoHTML = document.createElement("DIV");
        this.elementoHTML.id = interfazConfigObj.idUsarHTML;
        this.juego.escenario.elementoHTML.appendChild(this.elementoHTML)
      }
  
      this.elementoHTML.classList.add("personaje");
      this.elementoHTML.style.zIndex = interfazConfigObj.zindex;
  
      // this.setSpeed(this.juego.speedMiliseconds)
  
      if (interfazConfigObj.hasTooltips) {
        this.elementoHTML.classList.add("tooltip");
        this.elementoTextoTooltip = document.createElement("DIV");
        this.elementoTextoTooltip.id = this.elementoHTML.id + "-txtTltp"; // OJO ACA
        this.elementoTextoTooltip.classList.add("tooltiptext");
        this.elementoTextoTooltip.innerText = "...";
        this.elementoHTML.appendChild(this.elementoTextoTooltip);
      }
  
      if (interfazConfigObj.yaConImagenEnHtml) {
        this.imagenAnidada = this.elementoHTML.querySelector("IMG");
      } else {
        this.imagenAnidada = document.createElement("IMG");
        if (this.interfazConfigObj.padding) {
          this.imagenAnidada.style.padding = this.interfazConfigObj.padding;
        }
        this.elementoHTML.appendChild(this.imagenAnidada);
      }
      this.setSpeed(this.juego.speedMiliseconds)
    }
    setImage(url) {
      this.imagenAnidada.setAttribute("src", url)
    }
    setSpeed(milisegundos) {
      this.elementoHTML.style.transition = "all " + milisegundos / 1000 + "s"
      this.imagenAnidada.style.transition = "all " + milisegundos / 1000 + "s"
    }
    moverPersonajeHTML(posY, posX) {
      if (this.juego.modo != "prerun") {
        // console.log("MOVIENDO")
        this.elementoHTML.style.left = posX + "px";
        this.elementoHTML.style.top = posY + "px";
      }
    }
    rotarPersonaje(grados){
      this.imagenAnidada.style.transform = `rotate(${grados}deg)`
    }
  }