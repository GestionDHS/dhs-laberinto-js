import { DHS_Gallery } from "./Dhs-galeria";
import { Modal } from "./Modal";

export class PersonajeBasico {
  constructor(objetoConfiguracionPersonaje, juego) {
    this.idHTML = objetoConfiguracionPersonaje.idUsarHTML;
    this.juego = juego;
    this.galeria = new DHS_Gallery();
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA] -> [Personaje, PersonajeDibujante, PersonajeMovible]
    this.tipoPersonaje = objetoConfiguracionPersonaje.tipoPersonaje; // STRING CON EL TIPO DE PERSONAJE
    this.estadosPosibles = objetoConfiguracionPersonaje.estadosPosibles; // OBJETOS DE OBJETOS DE POSIBLES ESTADOS  {clave{nombre:"", imageURL:""}}
    this.estadoInicial = objetoConfiguracionPersonaje.estadoInicial; // STRING CON CLAVE DEL ESTADO INICIAL DEL PERSONAJE
    this.posicionInicialY = objetoConfiguracionPersonaje.posicionInicialY; // ENTERO CON LA POSICION INICIAL
    this.posicionInicialX = objetoConfiguracionPersonaje.posicionInicialX; // ENTERO CON LA POSICION INICIAL
    this.direccionInicial = objetoConfiguracionPersonaje.direccionInicial
      ? objetoConfiguracionPersonaje.direccionInicial
      : 0; // ENTERO 0-360 con grados de orientación inicial.
    this.colorFondoInicial = objetoConfiguracionPersonaje.colorFondoInicial
      ? objetoConfiguracionPersonaje.colorFondoInicial
      : "";
    this.colisiones = objetoConfiguracionPersonaje.colisiones; // ARRAY DE OBJETOS DE POSIBLES COLISIONES ((Después especificaremos cómo es cada objeto de colision))
    // this.mensaje = objetoConfiguracionPersonaje.colisiones[0].mensaje //Pia, no todos tienen "colisiones"
    this.rotable = objetoConfiguracionPersonaje.rotable || false;
    this.mochila = [];
    this.tieneTooltip = objetoConfiguracionPersonaje.tieneTooltip;
    this.controladorDOM = new controladorPersonajeDOM(
      this.tieneTooltip,
      this.juego.escenario,
      objetoConfiguracionPersonaje.idUsarHTML,
      objetoConfiguracionPersonaje.zIndex,
      objetoConfiguracionPersonaje.paddingImagen
    );
    //this.inicializar();
  }

  inicializar() {
    this.estaVivo = true;
    this.juntadosCount = 0; //contador de cuanta mugre levanta...
    this.removerTooltip();
    this.setearEstado(this.estadoInicial);
    this.pintarse(this.colorFondoInicial);
    this.actualizarCasillero(
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

  setearEstado(nuevoStatus) {
    this.estadoActual = nuevoStatus;
    const imagenDeseada = this.estadosPosibles[nuevoStatus].imageUrl;
    if (imagenDeseada) {
      this.controladorDOM.setearImagen(
        this.galeria.obtenerUrlDe(imagenDeseada)
      );
    }
  }

  // obtenerImagenSegunEstado(nuevoStatus) { // pia
  //   return this.galeria.obtenerUrlDe(this.status[nuevoStatus].imageUrl);
  // }

  //recibe un objeto de tipo colision que tiene (con , seMuere, autoMensaje, mensaje)
  agregarColision(unaColision) {
    this.colisiones.push(unaColision);
  }

  actualizarCasillero(nuevaY, nuevaX) {
    this.posicionActualY = nuevaY;
    this.posicionActualX = nuevaX;
    //this.controladorDOM.setearObjetosCasilleros(nuevaY, nuevaX);
    //this.casilleroActual = this.escenario.obtenerCasillero(nuevaY,nuevaX)
    //Personaje debería conocer el escenario para poder reutilizar el metodo otenerCasillero
    this.casilleroActual = this.controladorDOM.obtenerCasilleroActual(
      nuevaY,
      nuevaX
    );
    //console.log(this.casilleroActual.ocupantes)
    this.casilleroActual.ocupantes.push(this);
  }

  visibilizarTooltip(texto, milisegundos = 4000) {
    // if (this.hasTooltips()) {
    if (this.tieneTooltip) {
      this.controladorDOM.elementoTextoTooltip.innerHTML = texto;
      this.controladorDOM.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.controladorDOM.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
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
    acto && acto.premio && this.mochila.push(acto.premio);
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

  abrirse() {
    if (this.estadoActual === "cerrado") {
      this.setearEstado("abierto");
      return { exito: true, premio: { tipo: "monedas", cantidad: 20 } };
    } else {
      return { exito: false, premio: null };
    }
  }
  //para juntar la basura
  serJuntado() {
    if (this.estadoActual === "normal") {
      this.setearEstado("juntado");
      return { exito: true, premio: { tipo: "basura", cantidad: 1 } };
    } else {
      return { exito: false, premio: null };
    }
  }
  pintarse(color) {
    this.controladorDOM.setearColorDeFondo(color);
  }
  decirTerminar(ultimasPalabras) {
    this.decir(ultimasPalabras);
    this.terminar();
  }

  abrirYMostrarModal() {
    this.juego.mostrarModal();
    return true;
  }
  // abrirModalFalloApertura() {
  //   this.juego.datosModalError.mostrar();
  // }

  verificarColision(casilleroDestino) {
    // retorna el factor de Avance
    const objetoColision = casilleroDestino.hayColisionCon(this.colisiones);
    // console.log(objetoColision);
    return objetoColision;
  }
}

class controladorPersonajeDOM {
  // constructor(interfazConfigObj) {
  constructor(tieneTooltip, escenario, idHtml, zIndex, paddingImagen = "0") {
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
    this.imagenAnidada
      ? (this.imagenAnidada.style.padding = paddingImagen)
      : null;
    this.elementoHTML.appendChild(this.imagenAnidada);
  }
  setearImagen(url) {
    this.imagenAnidada ? this.imagenAnidada.setAttribute("src", url) : null;
  }
  // setearObjetosCasilleros(nuevaY, nuevaX) {
  //   //console.log(nuevaY, nuevaX)
  //   this.escenario.objetosCasilleros[nuevaY][nuevaX];
  // }

  obtenerCasilleroActual(nuevaY, nuevaX) {
    return this.escenario.objetosCasilleros[nuevaY][nuevaX];
  }

  obtenerCasilleroDestino(nuevaY, nuevaX) {
    return this.escenario.obtenerCasillero(nuevaY, nuevaX);
  }

  setearVelocidad(milisegundos) {
    this.elementoHTML.style.transition = "all " + milisegundos / 1000 + "s";
    this.imagenAnidada
      ? (this.imagenAnidada.style.transition =
          "all " + milisegundos / 1000 + "s")
      : null;
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
    this.imagenAnidada
      ? (this.imagenAnidada.style.transform = `rotate(${grados}deg)`)
      : null;
  }
  setearColorDeFondo(color) {
    this.elementoHTML.style.backgroundColor = color;
  }
}

class PersonajeMovible extends PersonajeBasico {
  constructor(objetoConfiguracionPersonaje, juego) {
    super(objetoConfiguracionPersonaje, juego);
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
      this.estaVivo && this.actualizarCasillero(nuevaY, nuevaX);
    }
  }

  // ACCESORIOS PARA MOVIMIENTOS

  iterarVectorMovimiento(veces, vector) {
    if (!this.estaVivo) {
      return false;
    }
    if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
      throw new Error(
        "¡Cuidado! - Esta función de movimiento solo acepta números enteros positivos como parámetros."
      );
    }
    if (this.juego.sincronico) {
      return this.iterarVectorMovimientoSincronicamente(veces, vector);
    } else {
      return this.iterarVectorMovimientoAsincronicamente(veces, vector);
    }
  }
  iterarVectorMovimientoSincronicamente(veces, vector) {
    let i = 0;
    while (i < veces && this.estaVivo) {
      this.moverse(vector[0], vector[1]);
      i++;
    }
    return this.estaVivo;
  }
  iterarVectorMovimientoAsincronicamente(veces, vector) {
    this.moverse(vector[0], vector[1]);
    if (veces > 1 && this.estaVivo) {
      setTimeout(() => {
        this.iterarVectorMovimientoAsincronicamente(veces - 1, vector);
      }, this.juego.duracionIntervalos);
    } else {
      return this.estaVivo;
    }
  }
}

export class PersonajeMovibleSimple extends PersonajeMovible {
  constructor(objetoConfiguracionPersonaje, juego) {
    super(objetoConfiguracionPersonaje, juego);
  }
  moverArriba(veces = 1) {
    return this.iterarVectorMovimiento(veces, [-1, 0]);
  }
  moverAbajo(veces = 1) {
    return this.iterarVectorMovimiento(veces, [+1, 0]);
  }
  moverIzquierda(veces = 1) {
    return this.iterarVectorMovimiento(veces, [0, -1]);
  }
  moverDerecha(veces = 1) {
    return this.iterarVectorMovimiento(veces, [0, +1]);
  }
}

export class PersonajeMovibleGrados extends PersonajeMovible {
  constructor(objetoConfiguracionPersonaje, juego) {
    super(objetoConfiguracionPersonaje, juego);
  }
  apuntarEnDireccion(nuevaDireccion) {
    if (!this.estaVivo) {
      return false;
    }
    this.direccion = parseInt(nuevaDireccion);
    this.controladorDOM.rotarPersonaje(this.direccion);
  }
  girarGrados(grados) {
    const nuevaDireccion = this.direccion + parseInt(grados);
    return this.apuntarEnDireccion(nuevaDireccion);
  }
  girarIzquierda(grados = 90) {
    return this.girarGrados(-parseInt(grados));
  }

  girarDerecha(grados = 90) {
    return this.girarGrados(parseInt(grados));
  }

  // AVANCES
  avanzar(veces = 1) {
    const vector = this.obtenerVectorAvance(this.direccion);
    return this.iterarVectorMovimiento(veces, vector);
  }
  obtenerVectorAvance(direccion) {
    const moduloDireccion360 = direccion % 360; // 0 || +/-90 || +/-180 || +/-270
    const moduloDireccion360Positivo =
      moduloDireccion360 < 0 ? 360 + moduloDireccion360 : moduloDireccion360; // 0 || 90 || 180 || 270
    const puntoCardinal = moduloDireccion360Positivo / 90; // 0 || 1 || 2 || 3
    if (
      Number.isInteger(puntoCardinal) &&
      puntoCardinal >= 0 &&
      puntoCardinal <= 3
    ) {
      const vectores = [
        [-1, 0],
        [0, +1],
        [+1, 0],
        [0, -1],
      ];
      const vectorUsar = vectores[puntoCardinal];
      return vectorUsar;
    } else {
      throw new Error(
        "Ocurrió un problema al intentar avanzar() en una dirección no permitida: " +
          direccion
      );
    }
  }
}

export class PersonajeDibujante extends PersonajeMovibleGrados {
  constructor(objetoConfiguracionPersonaje, juego, dibujoDeseado) {
    super(objetoConfiguracionPersonaje, juego);
    this.colorPinturaInicial = "#FA3939";
    this.dibujoDeseado = [];
    this.agregarColision({
      con: "recuadro-pintable",
      factorDeAvance: 1,
      callback: function (x) {
        // como function para que bindee el this
        x.pintarRecuadroSiLapizBajado(this.objetoColisionante); // el objetoColisionante se lo tiene que setear Casillero.hayColisionCon. // Esto nos va a servir para otros casos tmb (imaginar Pacman comiendo bolitas).
      },
      // mensaje: "Estoy pintando :)", // sin mensaje
    });
  }

  inicializar() {
    super.inicializar(); // todo lo que se hace al inicializar un Personaje común.
    this.colorPintura = this.colorPinturaInicial;
    this.dibujoActual = Array.from(this.dibujoDeseado, (row) =>
      Array.from(row, () => false)
    );
    this.lapizBajado = false;
    // console.log(this);
  }

  bajarLapiz() {
    this.lapizBajado = true;
    const objetoPintableAqui = this.casilleroActual.ocupantes.find(
      (o) => o.tipoPersonaje === "recuadro-pintable"
    );
    objetoPintableAqui && this.pintarRecuadro(objetoPintableAqui);
  }
  subirLapiz() {
    this.lapizBajado = false;
  }
  setearColor(codigoColor) {
    this.colorPintura = codigoColor;
  }

  pintarRecuadro(recuadro) {
    recuadro.pintarse(this.colorPintura);
    // console.log(recuadro.posicionActualY,recuadro.posicionActualX);
    this.dibujoActual[recuadro.posicionActualY][recuadro.posicionActualX] =
      this.colorPintura;
    this.dibujoDeseado && this.ganarSiCompletoDibujo();
  }

  pintarRecuadroSiLapizBajado(recuadro) {
    this.lapizBajado && this.pintarRecuadro(recuadro);
  }

  ganarSiCompletoDibujo() {
    return this.chequearSiCompletoDibujo() && super.abrirYMostrarModal();
  }
  chequearSiCompletoDibujo() {
    // console.log(this);
    // Si por error no tienen la misma dimensión, no completó.
    if (this.dibujoDeseado.length !== this.dibujoActual.length) {
      return false;
    }
    // Iteración comparativa de ambos arrays (deseado vs actual)
    // Retorna falso al detectar diferencias
    // Si "pasa" el bucle, retorna verdadero.
    for (let i = 0; i < this.dibujoDeseado.length; i++) {
      if (this.dibujoDeseado[i].length !== this.dibujoActual[i].length) {
        return false;
      }
      for (let j = 0; j < this.dibujoDeseado[i].length; j++) {
        if (this.dibujoDeseado[i][j] !== this.dibujoActual[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
}
