import { DHS_Gallery } from "./Dhs-galeria";
import { Modal } from "./Modal";

export class PersonajeBasico {
  constructor(objetoConfiguracionPersonaje, juego) {
    this.idHTML = objetoConfiguracionPersonaje.idUsarHTML;
    this.juego = juego;
    this.galeria = new DHS_Gallery();
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA] -> [PersonajeBasico, PersonajeDibujante, PersonajeMovible]
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
    this.desapareceAlReiniciar =
      objetoConfiguracionPersonaje.desapareceAlReiniciar;
    this.aliasConjunto = objetoConfiguracionPersonaje.aliasConjunto;
    this.tieneTooltip = objetoConfiguracionPersonaje.tieneTooltip;
    this.classCss = objetoConfiguracionPersonaje?.classCss
      ? objetoConfiguracionPersonaje.classCss
      : "null";
    this.controladorDOM = new controladorPersonajeDOM(
      this.tieneTooltip,
      this.juego.escenario,
      objetoConfiguracionPersonaje.idUsarHTML,
      objetoConfiguracionPersonaje.zIndex,
      objetoConfiguracionPersonaje.paddingImagen,
      this.classCss
    );
    // this.excluyente = false
  }

  inicializar() {
    this.actualizarCasillero(
      this.posicionInicialY,
      this.posicionInicialX,
      true
    );
    this.mochila = [];
    this.estaVivo = true;
    this.juntadosCount = 0; //contador de cuanta basura/zanahorias/monedas levanta...
    this.ocultarTooltip();
    this.setearEstado(this.estadoInicial);
    this.pintarse(this.colorFondoInicial);
    this.direccion = this.direccionInicial;
    this.controladorDOM.mostrarImg();
    this.controladorDOM.rotarPersonaje(this.direccion);
    this.controladorDOM.posicionarPersonajeEnHtml(
      this.posicionInicialY,
      this.posicionInicialX
    );
    this.setearVelocidad(this.juego.duracionIntervalos);
    // if(this.aleatoreo){
    //   this.setearVelocidad(0);
    //   }
  }

  autodestruirse() {
    this.salirDelCasilleroActual();
    this.controladorDOM.removerDivDelDOM();
  }
  reiniciarse() {
    this.desapareceAlReiniciar == false
      ? this.inicializar()
      : this.autodestruirse();
  }

  setearEstado(nuevoStatus) {
    this.estadoActual = nuevoStatus;
    const imagenDeseada = this.estadosPosibles
      ? this.estadosPosibles[nuevoStatus].imageUrl
      : null;
    if (imagenDeseada) {
      this.controladorDOM.setearImagen(
        this.galeria.obtenerUrlDe(imagenDeseada)
      );
    } else {
      //this.controladorDOM.removerImg()
      this.controladorDOM.ocultarImg();
    }
  }
  setearImagenSecundaria(img) {
    this.controladorDOM.agregarImagenSecundaria(this.galeria.obtenerUrlDe(img));
  }
  mostrarImgSecundaria() {
    this.controladorDOM.mostrarImagenSecundaria(this.juego.duracionIntervalos);
  }
  //recibe un objeto de tipo colision que tiene (con , seMuere, autoMensaje, mensaje)
  agregarColision(unaColision) {
    this.colisiones.push(unaColision);
  }
  salirDelCasilleroActual() {
    const posicion = this.casilleroActual?.ocupantes.indexOf(this);
    posicion > -1 && this.casilleroActual?.ocupantes.splice(posicion, 1);
  }
  actualizarCasillero(nuevaY, nuevaX) {
    this.salirDelCasilleroActual();
    this.posicionActualY = nuevaY;
    this.posicionActualX = nuevaX;
    //Personaje debería conocer el escenario para poder reutilizar el metodo otenerCasillero
    this.casilleroActual = this.obtenerCasillero(
      this.posicionActualY,
      this.posicionActualX
    );
    this.casilleroActual?.ocupantes.push(this);
  }

  exponerTooltip(texto, milisegundos = 4000) {
    this.controladorDOM.visibilizarTooltip(texto, milisegundos);
  }

  setearVelocidad(nuevaVelocidad) {
    this.controladorDOM.setearVelocidad(nuevaVelocidad);
  }

  verificarQueEsteVivoYDecir(texto, milisegundos = 3000) {
    !this.estaVivo ? false : this.exponerTooltip(texto, milisegundos);
  }

  decir(texto, milisegundos = 4000) {
    this.verificarQueEsteVivoYDecir(texto, milisegundos);
    // Y LOGGEARLO!!
  }
  ocultarTooltip() {
    this.controladorDOM.removerTooltip();
  }

  terminar() {
    this.estaVivo = false;
    this.juego.puedeDebeContinuar = false;
  }
  evaluar() {
    let obj = this.buscarObjetoAdelante("fuego");
    if (obj.estadoActual != "fuegoCero") {
      //console.log(objetoAux);//no le da el scope
      //objetoAux.factorDeAvance = "0.2"
      this.decirTerminar("¡AY! ¡Me quemo!");
    }
  }

  realizarAccionSobre(elemento, accion, params = false) {
    const parametros = params ? params : [];
    const acto = elemento[accion](...parametros); // tiene que devolver exito true/false y premio
    acto && acto.premio && this.mochila.push(acto.premio);
    return acto;
  }

  buscarObjetoAdelante(nombreObjeto) {
    const vector = this.obtenerVectorAvance(this.direccion);
    let vectorY = this.casilleroActual.fila + vector[0];
    let vectorX = this.casilleroActual.columna + vector[1];
    return this.buscarObjetoSegunVector(nombreObjeto, [vectorY, vectorX]);
  }

  buscarObjetoSegunVector(nombreObjeto, vector) {
    const casillero = this.obtenerCasillero(vector[0], vector[1]);
    return this.buscarObjetoEnCasillero(nombreObjeto, casillero);
  }

  buscarObjetoEnCasillero(nombreObjeto, objetoCasillero) {
    let objeto = objetoCasillero.ocupantes.find(
      (obj) => obj.tipoPersonaje == nombreObjeto
    );

    return objeto;
  }
  buscarObjetoEnCasilleroActual(nombreObjeto) {
    return this.buscarObjetoEnCasillero(nombreObjeto, this.casilleroActual);
  }

  buscarParaRealizarAccion(nameObj, accion, params = false) {
    const objetoPaciente = this.buscarObjetoEnCasillero(
      nameObj,
      this.casilleroActual
    );
    const acto = objetoPaciente
      ? this.realizarAccionSobre(objetoPaciente, accion, params)
      : false;
    return {
      objetoEncontrado: objetoPaciente ? true : false,
      exito: acto && acto.exito,
      premio: acto && acto.exito ? acto.premio : null,
      estadoPosterior: acto && acto.estadoPosterior,
      estadoPrevio: acto && acto.estadoPrevio,
    };
  }

  buscarParaRealizarAccionAdelante(nameObj, accion, params = false) {
    const objetoPaciente = this.buscarObjetoAdelante(nameObj);
    const acto = objetoPaciente
      ? this.realizarAccionSobre(objetoPaciente, accion, params)
      : false;
    return {
      objetoEncontrado: objetoPaciente ? true : false,
      exito: acto && acto.exito,
      premio: acto && acto.exito ? acto.premio : null,
      estadoPosterior: acto && acto.estadoPosterior,
      estadoPrevio: acto && acto.estadoPrevio,
    };
  }
  //para abrir cofre - cosechar zanahorias - picar piedra
  abrirse() {
    if (this.estadoActual === "cerrado") {
      this.setearEstado("abierto");
      return {
        exito: true,
        premio: { tipo: this.tipoPersonaje, cantidad: 20 },
      };
    } else {
      return { exito: false, premio: null };
    }
  }
  //para juntar la basura y también para comer
  serJuntado() {
    const estadoPrevio = this.estadoActual;
    if (this.estadoActual === "normal" || this.estadoActual === "abierto") {
      this.setearEstado("juntado");
      this.salirDelCasilleroActual();
      return {
        exito: true,
        premio: { tipo: this.tipoPersonaje, cantidad: 1 },
        estadoPosterior: this.estadoActual,
        estadoPrevio: estadoPrevio,
      };
    } else {
      return {
        exito: false,
        premio: null,
        estadoPosterior: this.estadoActual,
        estadoPrevio: estadoPrevio,
      };
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
    this.terminar();
    this.juego.mostrarModal();
    return true;
  }

  verificarColision(casilleroDestino) {
    // retorna el factor de Avance
    const objetoColision = casilleroDestino.hayColisionCon(this.colisiones);
    return objetoColision;
  }

  //ex obtenerCasilleroDestino/ hace lo mismo que el ex obtenerCasilleroActual
  obtenerCasillero(y, x) {
    return this.juego.escenario.obtenerCasillero(y, x);
  }
}

class controladorPersonajeDOM {
  // constructor(interfazConfigObj) {
  constructor(
    tieneTooltip,
    escenario,
    idHtml,
    zIndex,
    paddingImagen = "0",
    classCss
  ) {
    //this.modo = modo;
    this.escenario = escenario;
    this.elementoHTML = document.createElement("DIV");
    //this.elementoHTML.id = idHtml;
    this.escenario.elementoHTML.appendChild(this.elementoHTML);
    this.elementoHTML.classList.add("personaje");
    this.elementoHTML.classList.add(classCss);
    this.elementoHTML.style.zIndex = zIndex;
    this.tieneTooltip = tieneTooltip;
    if (this.tieneTooltip) {
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
  agregarImagenSecundaria(imagen) {
    this.imagenAnidadaSecundaria = document.createElement("IMG");
    this.imagenAnidadaSecundaria.setAttribute("src", imagen);
    this.imagenAnidadaSecundaria.classList.add("imgHidden");
    this.elementoHTML.appendChild(this.imagenAnidadaSecundaria);
  }
  mostrarImagenSecundaria(milisegundos) {
    this.imagenAnidadaSecundaria.classList.remove("imgHidden");
    this.imagenAnidadaSecundaria.classList.add("imgVisible");
    setTimeout(() => {
      this.imagenAnidadaSecundaria.classList.remove("imgVisible");
      this.imagenAnidadaSecundaria.classList.add("imgHidden");
    },milisegundos);
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

  visibilizarTooltip(texto, milisegundos = 4000) {
    if (this.tieneTooltip) {
      this.elementoTextoTooltip.innerHTML = texto;
      this.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  removerTooltip() {
    this.elementoHTML.classList.remove("tooltipVisible");
  }
  removerDivDelDOM() {
    this.elementoHTML.remove();
  }
  removerImg() {
    this.elementoHTML.querySelector("img") &&
      this.elementoHTML.removeChild(this.imagenAnidada);
  }
  ocultarImg() {
    this.elementoHTML.querySelector("img") &&
      this.elementoHTML.querySelector("img").classList.add("ocultar");
  }
  mostrarImg() {
    this.elementoHTML.querySelector("img") &&
      this.elementoHTML.querySelector("img").classList.remove("ocultar");
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
    const casilleroDestino = this.obtenerCasillero(nuevaY, nuevaX);
    if (!casilleroDestino || casilleroDestino.ocupantes.length == 0) {
      const limite = {
        con: "limitesDelUniverso",
        factorDeAvance: 0.35,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! me caí del mapa. ",
      };

      this.exponerTooltip(limite.mensaje);
      limite.callback(this);
      this.controladorDOM.posicionarPersonajeEnHtml(
        this.posicionActualY + vectorY * limite.factorDeAvance,
        this.posicionActualX + vectorX * limite.factorDeAvance
      );
    } else {
      let objetoAux = this.verificarColision(casilleroDestino);
      objetoAux.mensaje && this.exponerTooltip(objetoAux.mensaje);
      objetoAux.callback && objetoAux.callback(this);
      //this.casilleroActual.ocupantes.pop();
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
