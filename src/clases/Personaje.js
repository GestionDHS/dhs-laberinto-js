export class Personaje {
  constructor(persConfigObj, juego) {
    this.idHTML = persConfigObj.idUsarHTML;
    this.juego = juego;
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA]
    this.tipoPersonaje = persConfigObj.tipoPersonaje; // STRING CON EL TIPO DE PERSONAJE
    this.statuses = persConfigObj.statuses; // OBJETOS DE OBJETOS DE POSIBLES ESTADOS  {clave{nombre:"", imageURL:""}}
    this.initialStatus = persConfigObj.initialStatus; // STRING CON CLAVE DEL ESTADO INICIAL DEL PERSONAJE
    this.initial_y = persConfigObj.initial_y; // ENTERO CON LA POSICION INICIAL
    this.initial_x = persConfigObj.initial_x; // ENTERO CON LA POSICION INICIAL
    this.direccionInicial = persConfigObj.direccionInicial
      ? persConfigObj.direccionInicial
      : 0; // ENTERO 0-360 con grados de orientación inicial.
    this.collisions = []; // ARRAY DE OBJETOS DE POSIBLES COLISIONES ((Después especificaremos cómo es cada objeto de colision))
    this.controladorDOM = new controladorPersonajeDOM(
      persConfigObj.tieneTooltip,
      this.juego,
      persConfigObj.idUsarHTML,
      persConfigObj.zIndex,
      persConfigObj.paddingImagen
    );
    this.initialize();
  }

  initialize() {
    this.alive = true;
    this.juntadosCount = 0;
    this.callar();
    this.setStatus(this.initialStatus);
    this.actualizarCasillerosJuego(this.initial_y, this.initial_x, true);
    this.direccion = this.direccionInicial;
    // UBICAR
    this.controladorDOM.rotarPersonaje(this.direccion);
    this.controladorDOM.moverPersonajeHTML(
      this.initial_y * this.juego.escenario.unidadAnchoDeseada,
      this.initial_x * this.juego.escenario.unidadAnchoDeseada
    );
  }

  setStatus(stat) {
    this.currentStatus = stat;
    if (this.juego.modo != "prerun") {
      this.controladorDOM.setImage(this.statuses[stat].imageUrl);
    }
  }

  actualizarCasillerosJuego(nuevaY, nuevaX, isFirstStep = false) {
    // if (!isFirstStep) {
    //     const indice = this.casilleroActual.ocupantes.indexOf(this);
    //     if (indice > -1) {
    //         this.casilleroActual.ocupantes.splice(indice, 1);
    //     }
    // }
    this.cas_y_actual = nuevaY;
    this.cas_x_actual = nuevaX;
    this.casilleroActual =
      this.juego.escenario.objetosCasilleros[nuevaY][nuevaX];
    // this.casilleroActual.ocupantes.push(this);
  }
  _forceDecir(texto, milisegundos = 3000) {
    if (this.controladorDOM.hasTooltips && this.juego.modo != "prerun") {
      this.controladorDOM.elementoTextoTooltip.innerHTML = texto;
      this.controladorDOM.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  _decir(texto, milisegundos = 3000) {
    if (!this.alive) {
      return false;
    } else this._forceDecir(texto, milisegundos);
  }
  decir(texto, milisegundos = 3000) {
    this._decir(texto, milisegundos);
    // Y LOGGEARLO!!
  }

  callar() {
    this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
  }

  terminate() {
    this.alive = false;
  }
}

class controladorPersonajeDOM {
  // constructor(interfazConfigObj) {
  constructor(tieneTooltip, juego, idUsarHTML, zindex, paddingImagen = "0") {
    this.juego = juego;
    this.elementoHTML = document.createElement("DIV");
    this.elementoHTML.id = idUsarHTML;
    this.juego.escenario.elementoHTML.appendChild(this.elementoHTML);
    this.elementoHTML.classList.add("personaje");
    this.elementoHTML.style.zIndex = zindex;
    if (tieneTooltip) {
      this.elementoHTML.classList.add("tooltip");
      this.elementoTextoTooltip = document.createElement("DIV");
      this.elementoTextoTooltip.id = this.elementoHTML.id + "-txtTltp"; // OJO ACA
      this.elementoTextoTooltip.classList.add("tooltiptext");
      this.elementoTextoTooltip.innerText = "...";
      this.elementoHTML.appendChild(this.elementoTextoTooltip);
    }
    this.imagenAnidada = document.createElement("IMG");
    this.imagenAnidada.style.padding = paddingImagen;
    this.elementoHTML.appendChild(this.imagenAnidada);
    this.setSpeed(this.juego.speedMiliseconds);
  }
  setImage(url) {
    this.imagenAnidada.setAttribute("src", url);
  }
  setSpeed(milisegundos) {
    this.elementoHTML.style.transition = "all " + milisegundos / 1000 + "s";
    this.imagenAnidada.style.transition = "all " + milisegundos / 1000 + "s";
  }
  moverPersonajeHTML(posY, posX) {
    if (this.juego.modo != "prerun") {
      this.elementoHTML.style.left = posX + "em";
      this.elementoHTML.style.top = posY + "em";
    }
  }
  rotarPersonaje(grados) {
    this.imagenAnidada.style.transform = `rotate(${grados}deg)`;
  }
}
