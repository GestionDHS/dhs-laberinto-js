import { DHS_Gallery } from "./Dhs-galeria";
export class Personaje {
  constructor(objetoConfiguracionPersonaje, juego) {
    this.idHTML = objetoConfiguracionPersonaje.idUsarHTML;
    this.juego = juego;
    this.galeria = new DHS_Gallery();
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA]
    this.tipoPersonaje = objetoConfiguracionPersonaje.tipoPersonaje; // STRING CON EL TIPO DE PERSONAJE
    this.status = objetoConfiguracionPersonaje.status; // OBJETOS DE OBJETOS DE POSIBLES ESTADOS  {clave{nombre:"", imageURL:""}}
    this.statusInicial = objetoConfiguracionPersonaje.statusInicial; // STRING CON CLAVE DEL ESTADO INICIAL DEL PERSONAJE
    this.posicionInicialY = objetoConfiguracionPersonaje.posicionInicialY; // ENTERO CON LA POSICION INICIAL
    this.posicionInicialX = objetoConfiguracionPersonaje.posicionInicialX; // ENTERO CON LA POSICION INICIAL
    this.direccionInicial = objetoConfiguracionPersonaje.direccionInicial
      ? objetoConfiguracionPersonaje.direccionInicial
      : 0; // ENTERO 0-360 con grados de orientación inicial.
    this.colisiones = [objetoConfiguracionPersonaje.colisiones]; // ARRAY DE OBJETOS DE POSIBLES COLISIONES ((Después especificaremos cómo es cada objeto de colision))
    // this.mensaje = objetoConfiguracionPersonaje.colisiones[0].mensaje //Pia, no todos tienen "colisiones"
    if(objetoConfiguracionPersonaje.colisiones){
      this.mensaje = objetoConfiguracionPersonaje.colisiones.mensaje
    }else{
      this.mensaje = " bla bla bla" 
    } 
    this.controladorDOM = new controladorPersonajeDOM(
      this.hasTooltips(),
      // objetoConfiguracionPersonaje.tieneTooltip,
      this.juego.escenario,
      this.juego.modo,
      objetoConfiguracionPersonaje.A,
      objetoConfiguracionPersonaje.zIndex,
      objetoConfiguracionPersonaje.paddingImagen
    );
    this.inicializar();
  }

  inicializar() {
    this.estaVivo = true;
    this.juntadosCount = 0; //contador de cuanta mugre levanta...
    this.removerTooltip();
    this.setearStatus(this.statusInicial);
    this.actualizarCasillerosJuego(
      this.posicionInicialY,
      this.posicionInicialX,
      true
    );
    this.direccion = this.direccionInicial;
    this.controladorDOM.rotarPersonaje(this.direccion);
    this.controladorDOM.posicionarPersonajeEnHtml(
      this.posicionInicialY,
      this.posicionInicialX
    );
    this.setearVelocidad(this.juego.duracionIntervalos);
  }

  setearStatus(nuevoStatus) {
    this.currentStatus = nuevoStatus;
    if (this.juego.modo != "prerun") {
      this.controladorDOM.setearImagen(
        this.obtenerImagenSegunEstado(nuevoStatus)
      );
    }
  }

  obtenerImagenSegunEstado(nuevoStatus) {
    return this.galeria.obtenerUrlDe(this.status[nuevoStatus].imageUrl);
  }

  //recibe un objeto de tipo colision que tiene (con , seMuere, autoMensaje, mensaje)
  agregarColision(unaColision) {
    this.colisiones.push(unaColision);
  }

  actualizarCasillerosJuego(nuevaY, nuevaX) {
    this.posicionActualY = nuevaY;
    this.posicionActualX = nuevaX;
    this.controladorDOM.setearObjetosCasilleros(nuevaY, nuevaX);
    //aca hay que ver que si se muere no se actualice

    this.casilleroActual = this.controladorDOM.obtenerCasilleroActual(
      nuevaY,
      nuevaX
    );
    this.casilleroActual.ocupantes.push(this);
  }

  //OJO PROBAR!!!!!!
  visibilizarTooltip(texto, milisegundos = 3000) {
    console.log("llamó al visibTooltip");
    if (this.hasTooltips && this.juego.modo != "prerun") {
      //Pia
      this.controladorDOM.elementoTextoTooltip.innerHTML = texto;
      this.controladorDOM.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  hasTooltips() {
    //Pia
    return this.colisiones.length !== 0;
  }
  setearVelocidad(nuevaVelocidad) {
    this.controladorDOM.setearVelocidad(nuevaVelocidad);
  }

  verificarQueEsteVivoYDecir(texto, milisegundos = 3000) {
    !this.estaVivo ? false : this.visibilizarTooltip(texto, milisegundos);
  }

  decir(texto, milisegundos = 3000) {
    this.verificarQueEsteVivoYDecir(texto, milisegundos);
    // Y LOGGEARLO!!
  }

  removerTooltip() {
    this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
  }

  terminar() {
    this.estaVivo = false;
  }

  moverse(vectorY, vectorX) {
    let nuevaY = this.posicionActualY + vectorY;
    let nuevaX = this.posicionActualX + vectorX;
    //verificar Validez movimiento
    const casilleroDestino = this.controladorDOM.obtenerCasilleroDestino(
      nuevaY,
      nuevaX
    );

    let factorDeAvance = this.obtenerFactorAvance(casilleroDestino);

    console.log(factorDeAvance);
    //si el factor de avance es menor a 1, es que hay un ocupante que genera algo en lupe, entonces no deberíamos
    // sacarla del array de ocupantes
    if (factorDeAvance < 1) {
      const obj = this.obtenerObjetoDeColision(casilleroDestino)
      console.log(obj)
      this.visibilizarTooltip(obj.mensaje);
    } else {
      this.casilleroActual.ocupantes.pop();
    }

    // this.factorDeAvance=colisiones[0].factorDeAvance

    this.controladorDOM.posicionarPersonajeEnHtml(
      this.posicionActualY + vectorY * factorDeAvance,
      this.posicionActualX + vectorX * factorDeAvance
    );
    this.actualizarCasillerosJuego(nuevaY, nuevaX);
  }

  obtenerFactorAvance(casilleroDestino) {
    let esValido = casilleroDestino.esPisable();
    return esValido ? this.verificarColision(casilleroDestino) : 0;
  }

  verificarColision(casilleroDestino) {
    // retorna el factor de Avance
    const factorAva = casilleroDestino.hayColisionCon(this.colisiones);
    return factorAva;
  }
  obtenerObjetoDeColision(casilleroDestino) {//Pia
    let obj = {};
    this.colisiones.forEach(oColli =>{
      obj = casilleroDestino.arrayDeOcupantes().find(o=>oColli.con == o.idHTML)
    })
    return obj
  }

  moverArriba() {
    this.moverse(-1, 0);
  }
  moverDerecha() {
    this.moverse(0, 1);
  }
  moverAbajo() {
    this.moverse(1, 0);
  }
  moverIzquierda() {
    this.moverse(0, -1);
  }
}

class controladorPersonajeDOM {
  // constructor(interfazConfigObj) {
  constructor(
    tieneTooltip,
    escenario,
    modo,
    idHtml,
    zIndex,
    paddingImagen = "0"
  ) {
    this.modo = modo;
    this.escenario = escenario;
    this.elementoHTML = document.createElement("DIV");
    this.elementoHTML.id = idHtml;
    this.escenario.elementoHTML.appendChild(this.elementoHTML);
    this.elementoHTML.classList.add("personaje");
    this.elementoHTML.style.zIndex = zIndex;
    if (tieneTooltip) {
      this.elementoHTML.classList.add("tooltip");
      this.elementoTextoTooltip = document.createElement("DIV");
      this.elementoTextoTooltip.id = this.elementoHTML.id + "-txtTltp"; // OJO ACA
      this.elementoTextoTooltip.classList.add("tooltiptext");
      this.elementoTextoTooltip.innerText = "holaaaa";
      this.elementoHTML.appendChild(this.elementoTextoTooltip);
    }
    this.imagenAnidada = document.createElement("IMG");
    this.imagenAnidada.style.padding = paddingImagen;
    this.elementoHTML.appendChild(this.imagenAnidada);
  }
  setearImagen(url) {
    this.imagenAnidada.setAttribute("src", url);
  }
  setearObjetosCasilleros(nuevaY, nuevaX) {
    this.escenario.objetosCasilleros[nuevaY][nuevaX];
  }

  obtenerCasilleroActual(nuevaY, nuevaX) {
    return this.escenario.objetosCasilleros[nuevaY][nuevaX];
  }

  obtenerCasilleroDestino(nuevaY, nuevaX) {
    return this.escenario.obtenerCasillero(nuevaY, nuevaX);
  }

  setearVelocidad(milisegundos) {
    this.elementoHTML.style.transition = "all " + milisegundos / 1000 + "s";
    this.imagenAnidada.style.transition = "all " + milisegundos / 1000 + "s";
  }
  posicionarPersonajeEnHtml(posY, posX) {
    if (this.modo != "prerun") {
      this.elementoHTML.style.left =
        posX * this.escenario.unidadAnchoDeseada + "em";
      this.elementoHTML.style.top =
        posY * this.escenario.unidadAnchoDeseada + "em";
    }
  }
  rotarPersonaje(grados) {
    this.imagenAnidada.style.transform = `rotate(${grados}deg)`;
  }
}
