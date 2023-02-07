export class Personaje {
  constructor(objetoConfiguracionPersonaje, juego) {
      this.idHTML = objetoConfiguracionPersonaje.idUsarHTML;
      this.juego = juego;
      // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA]
      this.tipoPersonaje = objetoConfiguracionPersonaje.tipoPersonaje; // STRING CON EL TIPO DE PERSONAJE
      this.status = objetoConfiguracionPersonaje.status; // OBJETOS DE OBJETOS DE POSIBLES ESTADOS  {clave{nombre:"", imageURL:""}}
      this.statusInicial = objetoConfiguracionPersonaje.statusInicial; // STRING CON CLAVE DEL ESTADO INICIAL DEL PERSONAJE
      this.posicionInicialY = objetoConfiguracionPersonaje.posicionInicialY; // ENTERO CON LA POSICION INICIAL
      this.posicionInicialX = objetoConfiguracionPersonaje.posicionInicialX; // ENTERO CON LA POSICION INICIAL
      this.direccionInicial = objetoConfiguracionPersonaje.direccionInicial ? objetoConfiguracionPersonaje.direccionInicial : 0; // ENTERO 0-360 con grados de orientación inicial.
      this.colisiones = []; // ARRAY DE OBJETOS DE POSIBLES COLISIONES ((Después especificaremos cómo es cada objeto de colision))
      this.controladorDOM = new controladorPersonajeDOM(objetoConfiguracionPersonaje.tieneTooltip,this.juego,objetoConfiguracionPersonaje.A,objetoConfiguracionPersonaje.zIndex,objetoConfiguracionPersonaje.paddingImagen);
      this.inicializar();
  }

  inicializar() {
    this.estaVivo = true;
    this.juntadosCount = 0;//¿ seria la cantidad de personajes juntos?
    this.removerTooltip();
    this.setearStatus(this.statusInicial);
    this.actualizarCasillerosJuego(this.posicionInicialY, this.posicionInicialX, true);
    this.direccion = this.direccionInicial;
    // UBICAR
    this.controladorDOM.rotarPersonaje(this.direccion);
    this.controladorDOM.renderizarPersonajeEnHtml(
      this.posicionInicialY * this.juego.escenario.unidadAnchoDeseada,
      this.posicionInicialX * this.juego.escenario.unidadAnchoDeseada
    )
  }

  setearStatus(nuevoEstatus) {
    this.currentStatus = nuevoEstatus;
    if (this.juego.modo != "prerun") {
      this.controladorDOM.setearImagen(this.status[nuevoEstatus].imageUrl)
    }
  }

  actualizarCasillerosJuego(nuevaY, nuevaX, isFirstStep = false) {
      // if (!isFirstStep) {
      //     const indice = this.casilleroActual.ocupantes.indexOf(this);
      //     if (indice > -1) {
      //         this.casilleroActual.ocupantes.splice(indice, 1);
      //     }
      // }
      this.cas_y_actual = nuevaY;//no se usa
      this.cas_x_actual = nuevaX;//no se usa
      this.casilleroActual = this.juego.escenario.objetosCasilleros[nuevaY][nuevaX];
      // this.casilleroActual.ocupantes.push(this);
  }
  visibilizarTooltip(texto, milisegundos = 3000) {
    if (this.controladorDOM.hasTooltips && this.juego.modo != "prerun") {
      this.controladorDOM.elementoTextoTooltip.innerHTML = texto;
      this.controladorDOM.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  verificarQueEsteVivoYDecir(texto, milisegundos = 3000) {
    !this.estaVivo? false : this.visibilizarTooltip(texto, milisegundos);
  }
  
  decir(texto, milisegundos = 3000) {
      this.verificarQueEsteVivoYDecir(texto, milisegundos);
      // Y LOGGEARLO!!
  }

  removerTooltip() {
      this.controladorDOM.elementoHTML.classList.remove("tooltipVisible")
  }

  terminar() {
      this.estaVivo = false;
  }
}

class controladorPersonajeDOM {
  // constructor(interfazConfigObj) {
  constructor(tieneTooltip, juego, idHtml, zindex, paddingImagen="0") {
      this.juego = juego;
      this.elementoHTML = document.createElement("DIV");
      this.elementoHTML.id = idHtml;
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
      this.setearVelocidad(this.juego.speedMiliseconds)
  }
  setearImagen(url) {
      this.imagenAnidada.setAttribute("src", url)
  }
  setearVelocidad(milisegundos) {
      this.elementoHTML.style.transition = "all " + milisegundos / 1000 + "s"
      this.imagenAnidada.style.transition = "all " + milisegundos / 1000 + "s"
  }
  renderizarPersonajeEnHtml(posY, posX) {
      if (this.juego.modo != "prerun") {
           this.elementoHTML.style.left = posX + "em";
           this.elementoHTML.style.top = posY + "em";
      }
  }
  rotarPersonaje(grados){
    this.imagenAnidada.style.transform = `rotate(${grados}deg)`
  }
}
