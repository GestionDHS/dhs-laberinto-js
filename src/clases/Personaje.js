import { DHS_Gallery } from "./Dhs-galeria";
import { Modal } from "./Modal";
export class Personaje {
  constructor(objetoConfiguracionPersonaje, juego) {
    this.idHTML = objetoConfiguracionPersonaje.idUsarHTML;
    this.juego = juego;
    this.galeria = new DHS_Gallery();
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA]
    this.tipoPersonaje = objetoConfiguracionPersonaje.tipoPersonaje; // STRING CON EL TIPO DE PERSONAJE
    this.estadosPosibles = objetoConfiguracionPersonaje.estadosPosibles; // OBJETOS DE OBJETOS DE POSIBLES ESTADOS  {clave{nombre:"", imageURL:""}}
    this.estadoInicial = objetoConfiguracionPersonaje.estadoInicial; // STRING CON CLAVE DEL ESTADO INICIAL DEL PERSONAJE
    this.posicionInicialY = objetoConfiguracionPersonaje.posicionInicialY; // ENTERO CON LA POSICION INICIAL
    this.posicionInicialX = objetoConfiguracionPersonaje.posicionInicialX; // ENTERO CON LA POSICION INICIAL
    this.direccionInicial = objetoConfiguracionPersonaje.direccionInicial
      ? objetoConfiguracionPersonaje.direccionInicial
      : 0; // ENTERO 0-360 con grados de orientación inicial.
    this.colisiones = objetoConfiguracionPersonaje.colisiones; // ARRAY DE OBJETOS DE POSIBLES COLISIONES ((Después especificaremos cómo es cada objeto de colision))
    // this.mensaje = objetoConfiguracionPersonaje.colisiones[0].mensaje //Pia, no todos tienen "colisiones"
    this.rotable = objetoConfiguracionPersonaje.rotable || false;
    this.mochila = [];
    this.controladorDOM = new controladorPersonajeDOM(
      this.hasTooltips(),
      // objetoConfiguracionPersonaje.tieneTooltip,
      this.juego.escenario,
      this.juego.modo,
      objetoConfiguracionPersonaje.idUsarHTML,
      objetoConfiguracionPersonaje.zIndex,
      objetoConfiguracionPersonaje.paddingImagen
    );
    this.inicializar();
  }

  inicializar() {
    this.estaVivo = true;
    this.juntadosCount = 0; //contador de cuanta mugre levanta...
    this.removerTooltip();
    this.setearStatus(this.estadoInicial);
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
    this.estadoActual = nuevoStatus;
    this.controladorDOM.setearImagen(
      //pia
      //this.obtenerImagenSegunEstado(nuevoStatus)
      this.galeria.obtenerUrlDe(this.estadosPosibles[nuevoStatus].imageUrl)
    );
  }

  // obtenerImagenSegunEstado(nuevoStatus) { // pia
  //   return this.galeria.obtenerUrlDe(this.status[nuevoStatus].imageUrl);
  // }

  //recibe un objeto de tipo colision que tiene (con , seMuere, autoMensaje, mensaje)
  agregarColision(unaColision) {
    this.colisiones.push(unaColision);
  }

  actualizarCasillerosJuego(nuevaY, nuevaX) {
    this.posicionActualY = nuevaY;
    this.posicionActualX = nuevaX;
    this.controladorDOM.setearObjetosCasilleros(nuevaY, nuevaX);
    this.casilleroActual = this.controladorDOM.obtenerCasilleroActual(
      nuevaY,
      nuevaX
    );
    //console.log(this.casilleroActual.ocupantes)
    this.casilleroActual.ocupantes.push(this);
  }

  visibilizarTooltip(texto, milisegundos = 4000) {
    if (this.hasTooltips() && this.juego.modo !== "prerun") {
      this.controladorDOM.elementoTextoTooltip.innerHTML = texto;
      this.controladorDOM.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  hasTooltips() {
    return this.colisiones?.length !== 0;
  }
  setearVelocidad(nuevaVelocidad) {
    this.controladorDOM.setearVelocidad(nuevaVelocidad);
  }

  verificarQueEsteVivoYDecir(texto, milisegundos = 3000) {
    !this.estaVivo ? false : this.visibilizarTooltip(texto, milisegundos);
  }

  decir(texto, milisegundos = 3500) {
    this.verificarQueEsteVivoYDecir(texto, milisegundos);
    // Y LOGGEARLO!!
  }

  removerTooltip() {
    this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
  }

  terminar() {
    this.estaVivo = false;
    this.juego.puedeDebeContinuar = false;
  }

  realizarAccionSobre(elemento, accion, params = false) {
    const parametros = params ? params : [];
    const acto = elemento[accion](...parametros); // tiene que devolver exito true/false y premio
    acto.premio && this.mochila.push(acto.premio);
    return acto;
  }
  buscarParaRealizarAccion(nameObj, accion, params = false) {
    const objetoPaciente = this.casilleroActual.ocupantes.find(
      (obj) => obj.tipoPersonaje == nameObj
    );
    const acto = objetoPaciente
      ? this.realizarAccionSobre(objetoPaciente, accion, params)
      : false;
    return {
      objetoEncontrado: objetoPaciente ? true : false,
      exito: acto && acto.exito,
      premio: acto && acto.exito ? acto.premio : null,
    };
  }
  abrirCofre() {
    const intento = this.buscarParaRealizarAccion("cofre", "abrirse");
    if (!intento.objetoEncontrado) {
      //this.decirTerminar("Oh! Aquí no hay cofre.");
      this.abrirModalFalloApertura();
    } else if (!this.exito) {
      this.abrirYMostrarModal();
      //this.decirTerminar("Oh! Este cofre ya estaba abierto.");
    }
    return intento;
  }
  abrirse() {
    if (this.estadoActual === "normal") { //"cerrado"
      this.setearStatus = "abierto";
      return { exito: true, premio: { tipo: "monedas", cantidad: 20 } };
    } else {
      return { exito: false, premio: null };
    }
  }
  cerrar() {
    this.setearStatus("cerrar");
    this.juego.modalPannel.ocultar();
  }
  decirTerminar(ultimasPalabras) {
    this.decir(ultimasPalabras);
    this.terminar();
  }
  // abrir(nameObj) {
  //   const objAAbrir = this.casilleroActual.ocupantes.find(
  //     (obj) => obj.tipoPersonaje == nameObj
  //   );
  //   // objAAbrir?this.abrirYMostrarModal(objAAbrir.nameObj): this.abrirModalFalloApertura()
  //   objAAbrir ? objAAbrir.abrirse() : this.decirTerminar("Oh! Aquí no hay nada para abrir.");

  // }

  // abrirCofre() {
  //   this.abrir("cofre");
  // }

  // abrirse() {
  //   this.setearStatus("abierto");
  //   this.abrirYMostrarModal();
  // }

  abrirYMostrarModal(nombreObj) {
    this.juego.datosModal.mostrar();
  }
  abrirModalFalloApertura() {
    this.juego.datosModalError.mostrar();
  }
 
  moverse(vectorY, vectorX) {
    if (!this.estaVivo) {
      return false;
    }
    let nuevaY = this.posicionActualY + vectorY;
    let nuevaX = this.posicionActualX + vectorX;
    const casilleroDestino = this.controladorDOM.obtenerCasilleroDestino(
      nuevaY,
      nuevaX
    );
    if (!casilleroDestino) {
      const limite = {
        con: "limitesDelUniverso",
        factorDeAvance: 0.35,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! me caí del mapa. ",
      };

      this.visibilizarTooltip(limite.mensaje);
      limite.callback(this);
      this.controladorDOM.posicionarPersonajeEnHtml(
        this.posicionActualY + vectorY * limite.factorDeAvance,
        this.posicionActualX + vectorX * limite.factorDeAvance
      );
    } else {
      let objetoAux = this.verificarColision(casilleroDestino);
      // console.log(objetoAux);
      //objetoAux.factorDeAvance<1 && this.visibilizarTooltip(objetoAux.mensaje)
      // objetoAux.factorDeAvance<1 && objetoAux.seMuere && this.terminar()
      objetoAux.mensaje && this.visibilizarTooltip(objetoAux.mensaje);
      objetoAux.callback && objetoAux.callback(this);
      this.casilleroActual.ocupantes.pop();
      this.controladorDOM.posicionarPersonajeEnHtml(
        this.posicionActualY + vectorY * objetoAux.factorDeAvance,
        this.posicionActualX + vectorX * objetoAux.factorDeAvance
      );
      this.estaVivo && this.actualizarCasillerosJuego(nuevaY, nuevaX);
    }
  }
  obtenerFactorAvance(casilleroDestino) {
    let esValido = casilleroDestino.esPisable();
    return esValido ? this.verificarColision(casilleroDestino) : 0;
  }

  verificarColision(casilleroDestino) {
    // retorna el factor de Avance
    const objetoColision = casilleroDestino.hayColisionCon(this.colisiones);
    // console.log(objetoColision);
    return objetoColision;
  }

  // moverArriba() {
  //   this.moverse(-1, 0);
  // }

  moverArriba(veces = 1) {
    if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
      throw new Error(
        "¡Cuidado! - La función moverArriba() solo acepta números enteros positivos como parámetros."
      );
    }
    this.moverse(-1, 0);
    if (veces > 1) {
      if (this.juego.sincronico) {
        this.moverArriba(veces - 1);
      } else {
        setTimeout(() => {
          this.moverArriba(veces - 1);
        }, this.juego.duracionIntervalos);
      }
    }
  }
  moverDerecha(veces = 1) {
    if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
      throw new Error(
        "¡Cuidado! - La función moverDerecha() solo acepta números enteros positivos como parámetros."
      );
    }
    this.moverse(0, 1);
    if (veces > 1) {
      if (this.juego.sincronico) {
        this.moverDerecha(veces - 1);
      } else {
        setTimeout(() => {
          this.moverDerecha(veces - 1);
        }, this.juego.duracionIntervalos);
      }
    }
  }

  moverIzquierda(veces = 1) {
    if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
      throw new Error(
        "¡Cuidado! - La función moverIzquierda() solo acepta números enteros positivos como parámetros."
      );
    }
    this.moverse(0, -1);
    if (veces > 1) {
      if (this.juego.sincronico) {
        this.moverIzquierda(veces - 1);
      } else {
        setTimeout(() => {
          this.moverIzquierda(veces - 1);
        }, this.juego.duracionIntervalos);
      }
    }
  }

  moverAbajo(veces = 1) {
    if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
      throw new Error(
        "¡Cuidado! - La función moverAbajo() solo acepta números enteros positivos como parámetros."
      );
    }
    this.moverse(1, 0);
    if (veces > 1) {
      if (this.juego.sincronico) {
        this.moverAbajo(veces - 1);
      } else {
        setTimeout(() => {
          this.moverAbajo(veces - 1);
        }, this.juego.duracionIntervalos);
      }
    }
  }
  // moverDerecha() {
  //   this.moverse(0, 1);
  // }
  // moverAbajo() {
  //   this.moverse(1, 0);
  // }
  // moverIzquierda() {
  //   this.moverse(0, -1);
  // }
  girar(grados, direccion) {}
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
    //this.modo = modo;
    this.escenario = escenario;
    this.elementoHTML = document.createElement("DIV");
    this.elementoHTML.id = idHtml;
    this.escenario.elementoHTML.appendChild(this.elementoHTML);
    this.elementoHTML.classList.add("personaje");
    this.elementoHTML.style.zIndex = zIndex;
    if (tieneTooltip) {
      this.elementoHTML.classList.add("tooltip");
      this.elementoTextoTooltip = document.createElement("DIV");
      this.elementoTextoTooltip.id = this.elementoHTML.id + "-txtTltp";
      this.elementoTextoTooltip.classList.add("tooltiptext");
      //this.elementoTextoTooltip.innerText = "Soy un objeto";
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
    //console.log(nuevaY, nuevaX)
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
    // if (this.modo != "prerun") {
      this.elementoHTML.style.left =
        posX * this.escenario.unidadAnchoDeseada + "em";
      this.elementoHTML.style.top =
        posY * this.escenario.unidadAnchoDeseada + "em";
    //}
  }
  rotarPersonaje(grados) {
    this.imagenAnidada.style.transform = `rotate(${grados}deg)`;
  }
}
