import { DHS_Gallery } from "./Dhs-galeria";
export class Modal {
  constructor(modalPannelObj, escenario) {
    this.escenario = escenario;
    this.oculto = modalPannelObj.oculto;
    this.titulo = modalPannelObj.titulo;
    this.galeria = new DHS_Gallery();
    this.imageUrl = this.galeria.obtenerUrlDe(modalPannelObj.imagen);
    this.texto = modalPannelObj.texto;

    this.elementoPannel = document.createElement("DIV");
    this.elementoPannel.classList.add("dhs-modal-pannel");

    this.titleElement = document.createElement("P");
    this.titleElement.classList.add("dhs-modal-pannel-title");
    this.imageElement = document.createElement("IMG");
    this.imageElement.classList.add("dhs-modal-pannel-image");
    this.mainTextElement = document.createElement("P");
    this.mainTextElement.classList.add("dhs-modal-pannel-main-text");

    this.elementoPannel.appendChild(this.titleElement);
    this.elementoPannel.appendChild(this.imageElement);
    this.elementoPannel.appendChild(this.mainTextElement);

    this.juego.escenario.elementoHTML.appendChild(this.elementoPannel);

    this.initialize();
  }

  initialize() {
    if (this.oculto) {
      this.ocultar();
    } else {
      this.mostrar();
    }
    this.titleElement.innerHTML = this.titulo;
    this.imageElement.src = this.imageUrl;
    this.mainTextElement.innerHTML = this.texto;
  }
  mostrar() {
    if (this.juego.modo != "prerun") {
      this.elementoPannel.classList.remove("dhs-modal-pannel-hidden");
    }
  }
  ocultar() {
    this.elementoPannel.classList.add("dhs-modal-pannel-hidden");
  }
}
