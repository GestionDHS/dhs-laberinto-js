import ConfiguradorBloques from "./ConfiguradorBloques";

import { PersonajeDibujante } from "../clases/Personaje";

import Swal from "sweetalert2";

class Controlador {
  constructor(
    juego,
    velocidadMilisegundos = 1000,
    // blocklyDivId,
    // miToolboxJSON,
    botonEjecutar,
    botonDetener = false,
    botonReiniciar = false,
    botonLimpiarWorkspace = false,
    inputAcelerador = false,
    inputBloquesSueltos = false,
    panelCodigoGenerado = false,
    cuadroOutput = false,
    afijos = {
      prefijo: "resaltarBloque(%1);\n",
      sufijo: "quitarResaltadoBloqueLuegoAvanzar(%1);\n",
    },
    palabrasReservadas = ["resaltarBloque", "quitarResaltadoBloqueLuegoAvanzar"]
  ) {
    // ELEMENTOS IMPORTANTES
    this.ConfiguradorBloques = new ConfiguradorBloques();
    this.velocidad = velocidadMilisegundos;
    this.necesitaEsperarReinicio = false;
    this.juego = juego;
    // this.workspace = Blockly.inject(blocklyDivId, {
    //   toolbox: JSON.parse(miToolboxJSON),
    // });
    this.cuadroOutput = cuadroOutput;
    this.interpreteIterativo = null;
    this.callbackInterprete = null;
    this.panelCodigoGenerado = panelCodigoGenerado;
    this.desactivaHuerfanos = false;
    // BOTONES
    this.botonEjecutar = botonEjecutar;
    if (this.botonEjecutar) {
      this.botonEjecutar.addEventListener("click", () => {
        this.deshabilitarEdicionWorkspace();
        this.deshabilitarBotonEjecutar();
        this.deshabilitarBotonReinicio();
        this.rehabilitarBotonDetener();
        this.recorrerPasos(false); // bool: sincronico.
        // if(this.juego.personajePrincipal instanceof PersonajeDibujante){
        //     // this.juego.personajePrincipal.ganarSiCompletoDibujo()
        // }
      });
    }
    this.botonDetener = botonDetener;
    if (this.botonDetener) {
      this.botonDetener.addEventListener("click", () => {
        this.detenerEjecucion(); // deshabilitaDetener
        this.rehabilitarBotonEjecutar();
        this.rehabilitarBotonReinicio();
        this.habilitarEdicionWorkspace()
      });
    }
    this.deshabilitarBotonDetener();
    this.botonReiniciar = botonReiniciar;
    if (this.botonReiniciar) {
      this.botonReiniciar.addEventListener("click", () => {
        this.reiniciarEjecucion(); // llama a detenerEjecucion tmb, que deshabilita botonDeneter
        this.rehabilitarBotonEjecutar();
        this.deshabilitarBotonReinicio(); // para evitar multiclick
        setTimeout(() => {
          // permite volver a reiniciar pasado medio segundo.
          this.rehabilitarBotonReinicio();
        },1050);
      });
    }
    this.botonLimpiarWorkspace = botonLimpiarWorkspace;
    if (this.botonLimpiarWorkspace) {
      this.botonLimpiarWorkspace.addEventListener("click", () => {
        // Confirm en SweetAlert
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          // buttonsStyling: false
        });
        swalWithBootstrapButtons
          .fire({
            title: "¿Borrar todo?",
            text: "Esta acción eliminará todos los bloques que colocaste.",
            icon: "warning",
            iconColor: "#FFD148",
            showCancelButton: true,
            confirmButtonText: "Si, borrar todo.",
            cancelButtonText: "No, cancelar.",
            // reverseButtons: true
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.detenerEjecucion();
              this.limpiarWorkspace();
              this.cargarBloquesSerializados(this.bloquesIniciales);
              let timerInterval;
              swalWithBootstrapButtons.fire({
                title: "¡Borrado!",
                text: "Los bloques fueron borrados.",
                icon: "success",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              let timerInterval;
              swalWithBootstrapButtons.fire({
                title: "Acción cancelada",
                text: "Tus bloques están a salvo.",
                icon: "error",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            }
          });
      });
      // Fin confirm
    }
    this.inputAcelerador = inputAcelerador;
    if (this.inputAcelerador) {
      this.inputAcelerador?.addEventListener("input", () => {
        let valor = parseInt(this.inputAcelerador.value);
        let velocidad = 2500 - valor;
        this.setearVelocidad(velocidad);
      });
    }

    this.inputBloquesSueltos = inputBloquesSueltos;
    if (this.inputBloquesSueltos) {
      inputBloquesSueltos.addEventListener("change", () => {
        if (this.desactivaHuerfanos) {
          this.inhabilitarDesactivarHuerfanos();
        } else {
          this.habilitarDesactivarHuerfanos();
        }
      });
    }

    // FLAGS
    this.hayCodigoPendiente = false;
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = false;
    this.debeDetenerEjecucion = false;

    // AFIJACIÓN
    this.prefijo = afijos?.prefijo ? afijos.prefijo : null;
    this.sufijo = afijos?.sufijo ? afijos.sufijo : null;
    this.setearPrefijoBloques(this.prefijo);
    this.setearSufijoBloques(this.sufijo);
    palabrasReservadas.forEach((p) => this.agregarPalabraReservada(p));

    this.callbackCambioWorkspaceStandard = (event) => {
      let codigoCrudo;
      if (!event.isUiEvent) {
        if (event.type === "drag" && event.isStart) {
          return;
          // } else if(event.type ==="change" || event.type === "drag"){
          // } else if(event.type ==="change" || event.newParentId != undefined){
        } else {
          if (!this.debeDetenerEjecucion) {
            codigoCrudo = this.generarCodigoCrudo();
            if (this.panelCodigoGenerado.value != codigoCrudo) {
              this.detenerEjecucion();
              this.quitarTodosLosResaltados();
            }
          }
          this.mostrarCodigoCrudo();
        }
      }
    };
    this.eventoCambioWorkspaceActual = null;
    // this.setearEventoCambioWorkspaceStandard();
  } // FIN CONSTRUCTOR

  // METODOS PARA EL WORKSPACE - SERIALIZACION

  crearInyectarWorkspace(idElemento, objetoConfig) {
    this.workspace = Blockly.inject(idElemento, objetoConfig);
  }

  habilitarEdicionWorkspace() {
    this.workspace.options.readOnly = false;
  }

  deshabilitarEdicionWorkspace() {
    this.workspace.options.readOnly = true;
  }

  limpiarWorkspace() {
    return this.workspace.clear();
  }
  //JSON.stringify(miControlador.obtenerBloquesSerializados()) para Obtener bloques precargados
  obtenerBloquesSerializados(todoElWorskpace = true) {
    if (todoElWorskpace) {
      return Blockly.serialization.workspaces.save(this.workspace);
    }
  }
  cargarBloquesSerializados(bloquesSerializados) {
    return Blockly.serialization.workspaces.load(
      bloquesSerializados,
      this.workspace
    );
    // --load hace el clear previo--
  }
  setearYCargarBloquesIniciales(bloquesSerealizados) {
    this.bloquesIniciales = bloquesSerealizados;
    this.cargarBloquesSerializados(this.bloquesIniciales);
  }

  // WORKSPACE - BLOQUES - RESALTADO

  resaltarBloque(id, conservarOtros = true) {
    this.workspace.highlightBlock(id, conservarOtros);
    this.hacerPausaResaltar = true;
  }

  quitarTodosLosResaltados() {
    this.workspace.highlightBlock(null);
  }

  quitarResaltadoBloque(bloque) {
    return bloque.setHighlighted(false);
  }

  // WORKSPACE - GENERACION DE CODIGO Y AFIJACION

  generarCodigoCrudo(todoElWorskpace = true) {
    this.setearPrefijoBloques(null);
    this.setearSufijoBloques(null);
    let codigoCrudo;
    if (todoElWorskpace) {
      codigoCrudo = Blockly.JavaScript.workspaceToCode(this.workspace);
    }
    this.setearPrefijoBloques(this.prefijo);
    this.setearSufijoBloques(this.sufijo);
    return codigoCrudo;
  }

  mostrarCodigoCrudo() {
    if (this.panelCodigoGenerado) {
      this.panelCodigoGenerado.value = this.generarCodigoCrudo();
    }
  }

  setearPrefijoBloques(prefijo) {
    Blockly.JavaScript.STATEMENT_PREFIX = prefijo;
    //console.log("setearPrefijoBloques: " + Blockly.JavaScript.STATEMENT_PREFIX);
  }
  setearSufijoBloques(sufijo) {
    Blockly.JavaScript.STATEMENT_SUFFIX = sufijo;
  }
  agregarPalabraReservada(palabra) {
    Blockly.JavaScript.addReservedWords(palabra);
  }

  generarCodigoPrefijado(prefijo = this.prefijo, sufijo = this.sufijo) {
    //console.log("generarCodigoPrefijado: " + this.prefijo + " " + this.prefijo);
    this.setearPrefijoBloques(prefijo);
    this.setearSufijoBloques(sufijo);
    // ojo que falta re-chequear palabras reservadas.
    return Blockly.JavaScript.workspaceToCode(this.workspace);
  }

  // METODOS EJECUCION/ITERACION/INTERPRETE

  anularInterpreteIterativo() {
    this.interpreteIterativo = null;
  }

  crearInterprete(codigo, callback = this.callbackInterprete) {
    return new Interpreter(codigo, callback);
  }

  detenerEjecucion() {
    this.debeDetenerEjecucion = true;
    this.rehabilitarBotonReinicio();
    this.rehabilitarBotonEjecutar();
    this.deshabilitarBotonDetener();
    this.anularInterpreteIterativo();
    this.habilitarEdicionWorkspace();
  }

  reiniciarEjecucion() {
    this.necesitaEsperarReinicio = false;
    this.detenerEjecucion(); // deshabilita Detener tmb
    this.cuadroOutput?.blanquearTodo();
    this.juego?.reiniciar();
  }

  correrCodigoSincrono(codigo, callback = this.callbackInterprete) {
    const interpreteSincrono = this.crearInterprete(codigo, callback);
    return interpreteSincrono.run();
  }

  generarCorrerCodigoCrudoSincronamente(callback = this.callbackInterprete) {
    this.correrCodigoSincrono(this.generarCodigoCrudo(), callback);
  }

  quitarResaltadoBloqueLuegoAvanzar(id) {
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = true;
    let miBloque = this.workspace.getBlockById(id);
    let valor = miBloque?.getFieldValue("CASILLAS");
    let duracionDeLaPausa = 1;
    duracionDeLaPausa = valor ? valor * this.velocidad : this.velocidad;
    // IR AL PRÓXIMO
    setTimeout(() => {
      this.quitarResaltadoBloque(miBloque);
      this.hacerPausaQuitarResaltado = false;
      this.hacerPasosHastaBandera();
    }, duracionDeLaPausa);
  }

  recorrerPasos(sincronico = true, callback = this.callbackInterprete) {
    const necesitaReiniciar = this.necesitaEsperarReinicio;
    this.juego?.reiniciar();
    this.necesitaEsperarReinicio = true;
    this.juego?.setearSincronicidad(sincronico);
    this.anularInterpreteIterativo();
    this.quitarTodosLosResaltados();
    this.cuadroOutput?.blanquearTodo();
    this.cuadroOutput?.marcarInicio();
    let codigoActualCrudo = this.generarCodigoCrudo();
    if (this.panelCodigoGenerado) {
      this.panelCodigoGenerado.value = codigoActualCrudo;
    }
    let codigoActual = sincronico
      ? codigoActualCrudo
      : this.generarCodigoPrefijado();
    this.interpreteIterativo = this.crearInterprete(codigoActual, callback);
    // console.log(this.interpreteIterativo);
    this.hayCodigoPendiente = true; // ojo, deberíamos chequearlo.
    // console.log(codigoActual);
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = false;
    this.debeDetenerEjecucion = false;

    if (sincronico || !necesitaReiniciar) {
      this.hacerPasosHastaBandera();
    } else {
      setTimeout(() => {
        this.hacerPasosHastaBandera();
      }, this.velocidad + 10);
    }
  }

  hacerPasosHastaBandera() {
    if (this.hacerPausaQuitarResaltado) {
      return;
    }
    if (this.debeDetenerEjecucion) {
      return;
    }
    this.hacerPausaResaltar = false;
    while (
      this.hayCodigoPendiente &&
      !this.hacerPausaResaltar &&
      !this.hacerPausaQuitarResaltado &&
      !this.debeDetenerEjecucion
    ) {
      //try {
      this.hayCodigoPendiente = this.interpreteIterativo.step();
      // console.log("hayCodigoPendiente: " + this.hayCodigoPendiente);
      if (this.juego && !this.juego.puedeDebeContinuar) {
        this.debeDetenerEjecucion = true;
      }

      // } catch (e) {
      //   console.log(e.message);
      // }
    }
    // Si corta el while (por banderas o muerte)
    if (this.hayCodigoPendiente) {
      if (this.hacerPausaResaltar) {
        // Si fue por la bandera de resaltado solamente (not muerte)
        setTimeout(() => {
          this.hacerPasosHastaBandera();
        }, 50);
      } else if (this.debeDetenerEjecucion) {
        this.detenerEjecucion();
      }
    } else {
      // Terminó todo el código
      this.cuadroOutput?.marcarFin();
      setTimeout(() => {
        this.detenerEjecucion();
      }, 500);
      this.habilitarEdicionWorkspace();
    }
  }

  // WORKSPACE - GESTION EVENTOS DE CAMBIO

  removerEventoCambioWorkspace(eventId) {
    this.eventoCambioWorkspaceActual
      ? this.workspace.removeChangeListener(eventId)
      : null;
  }

  removerEventoCambioWorkspaceActual() {
    this.removerEventoCambioWorkspace(this.eventoCambioWorkspaceActual);
  }

  setearEventoCambioWorkspace(callback) {
    this.eventoCambioWorkspaceActual
      ? this.workspace.removeChangeListener(this.eventoCambioWorkspaceActual)
      : null;
    this.eventoCambioWorkspaceActual =
      this.workspace.addChangeListener(callback);
  }

  setearEventoCambioWorkspaceStandard() {
    this.setearEventoCambioWorkspace(this.callbackCambioWorkspaceStandard);
  }

  habilitarDesactivarHuerfanos() {
    this.desactivaHuerfanos = true;
    this.eventoHuerfanos = this.workspace.addChangeListener(
      Blockly.Events.disableOrphans
    );
  }

  inhabilitarDesactivarHuerfanos() {
    this.desactivaHuerfanos = false;
    this.workspace.removeChangeListener(this.eventoHuerfanos);
  }
  habilitarEdicionWorkspace() {
    this.workspace.options.readOnly = false;
  }
  deshabilitarEdicionWorkspace() {
    this.workspace.options.readOnly = true;
  }
  // INTERPRETE

  setearCallbackInterprete(callback) {
    this.callbackInterprete = callback;
  }

  // VENTANA: METODOS BOTONES EVENTOS

  deshabilitarBotonEjecutar() {
    this.botonEjecutar.disabled = "disabled";
  }

  rehabilitarBotonEjecutar() {
    this.botonEjecutar.disabled = "";
  }
  deshabilitarBotonDetener() {
    this.botonDetener.disabled = "disabled";
  }
  rehabilitarBotonDetener() {
    this.botonDetener.disabled = "";
  }
  deshabilitarBotonReinicio() {
    this.botonReiniciar.disabled = "disabled";
  }

  rehabilitarBotonReinicio() {
    this.botonReiniciar.disabled = "";
  }

  setearVelocidad(milisegundos) {
    this.velocidad = milisegundos;
    this.juego?.setearVelocidad(milisegundos);
  }

  // VENTANA: CREACION DE FUNCIONES GLOBALES

  crearFuncionesGlobalesStandard() {
    window.globalAlertMock = (texto) => {
      return this.cuadroOutput?.agregarTexto(texto, true); // bool: salto de linea
    };
    window.globalResaltar = (id) => {
      return this.resaltarBloque(id);
    };
    window.globalQuitar = (id) => {
      return this.quitarResaltadoBloqueLuegoAvanzar(id);
    };
  }
}

export default class ControladorStandard extends Controlador {
  constructor(
    juego,
    velocidadMilisegundos
    // blocklyDivId,
    // blocklyWorkspaceConfig,
    // bloquesPreCargados = false
  ) {
    let elementoOutput = document.getElementById(
      "dhs-text-area-output-generado"
    );
    super(
      juego,
      velocidadMilisegundos,
      // blocklyDivId,
      // blocklyWorkspaceConfig,
      document.getElementById("dhs-boton-ejecutar"),
      document.getElementById("dhs-boton-detener"),
      document.getElementById("dhs-boton-reiniciar"),
      document.getElementById("dhs-boton-borrar"),
      document.getElementById("dhs-input-acelerador"),
      document.getElementById("dhs-input-bloques-sueltos"),
      document.getElementById("dhs-text-area-codigo-generado"),
      elementoOutput ? new MostradorOutput(elementoOutput) : false
    );
    // if (bloquesPreCargados) {
    //   this.cargarBloquesSerializados(JSON.parse(bloquesPreCargados));
    // }
    setTimeout(() => {
      document
        .getElementById("dhs-input-bloques-sueltos")
        ?.setAttribute("checked", true);
      // this.habilitarDesactivarHuerfanos(), 1;
    }, 1);
    this.callbackInterpreteStandard = (interpreter, globalObject) => {
      // const wrapperAlert = function alert(text) {
      //     window.globalAlertMock(text);
      // };
      // interpreter.setProperty(globalObject, 'alert',
      //     interpreter.createNativeFunction(wrapperAlert));

      interpreter.setProperty(
        globalObject,
        "alert",
        interpreter.createNativeFunction(globalAlertMock)
      );

      const wrapperPrompt = function prompt(text) {
        return window.prompt(text);
      };
      interpreter.setProperty(
        globalObject,
        "prompt",
        interpreter.createNativeFunction(wrapperPrompt)
      );

      // const wrapperResaltar = function (id) {
      //     id = String(id || '');
      //     return window.globalResaltar(id);
      // };
      // interpreter.setProperty(globalObject, 'resaltarBloque',
      //     interpreter.createNativeFunction(wrapperResaltar));

      interpreter.setProperty(
        globalObject,
        "resaltarBloque",
        interpreter.createNativeFunction(globalResaltar)
      );

      // const wrapperQuitarResaltado = function (id) {
      //     id = String(id || '');
      //     return window.globalQuitar(id);
      // };
      // interpreter.setProperty(globalObject, 'quitarResaltadoBloqueLuegoAvanzar',
      //     interpreter.createNativeFunction(wrapperQuitarResaltado));

      interpreter.setProperty(
        globalObject,
        "quitarResaltadoBloqueLuegoAvanzar",
        interpreter.createNativeFunction(globalQuitar)
      );
    };
  }
}

class MostradorOutput {
  constructor(elementoTextArea) {
    this.elemento = elementoTextArea;
    this.blanquearTodo();
  }
  blanquearTodo() {
    this.elemento.value = "";
  }
  marcarInicio() {
    this.elemento.value = "OUTPUT DEL PROGRAMA:\n\n";
  }
  agregarTexto(texto, saltoDeLinea = false) {
    let txtVal = this.elemento.value;
    txtVal += saltoDeLinea ? "\n" : "";
    txtVal += texto;
    this.elemento.value = txtVal;
  }
  marcarFin() {
    this.elemento.value += "\n\n\nPROGRAMA TERMINADO";
  }
}
//export default {Controlador, ControladorStandard, MostradorOutput}
