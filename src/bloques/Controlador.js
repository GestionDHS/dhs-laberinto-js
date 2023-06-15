//import * as Blockly from "blockly"
//import * as acorn from "acorn";
//import Interpreter from "js-interpreter";
// import { javascriptGenerator } from "blockly/javascript";
// import Blockly from "blockly";
// import "blockly/blocks_compressed";
// import "blockly/javascript_compressed";
// import "blockly/msg/en";

class Controlador {
    constructor(
        juego,
        veolocidadMilisegundos = 6000,
        blocklyDivId,
        miToolboxJSON,
        botonEjecutar,
        botonDetener = false,
        botonReiniciar = false,
        inputAcelerador = false,
        inputBloquesSueltos = false,
        panelCodigoGenerado = false,
        cuadroOutput = false,
        afijos = { prefijo: 'resaltarBloque(%1);\n', sufijo: 'quitarResaltadoBloqueLuegoAvanzar(%1);\n' },
        palabrasReservadas = ['resaltarBloque', 'quitarResaltadoBloqueLuegoAvanzar']
    ) {
        // ELEMENTOS IMPORTANTES
        this.velocidad = veolocidadMilisegundos;
        this.juego = juego;
        this.workspace = Blockly.inject('dhs-blockly-div', {toolbox: JSON.parse(miToolboxJSON) });
        this.cuadroOutput = cuadroOutput;
        this.interpreteIterativo = null;
        this.callbackInterprete = null;
        this.panelCodigoGenerado = panelCodigoGenerado;
        this.desactivaHuerfanos = false;
        // BOTONES
        this.botonEjecutar = botonEjecutar;
        if (this.botonEjecutar) {
            this.botonEjecutar.addEventListener("click", () => {
                console.log("clic en Ejecutar")
                this.deshabilitarBotonEjecutar();
                this.deshabilitarBotonReinicio();
                this.rehabilitarBotonDetener();
                this.recorrerPasos(false); // bool: sincronico.
            });
        }
        this.botonDetener = botonDetener;
        if (this.botonDetener) {
            this.botonDetener.addEventListener("click", () => {
                this.detenerEjecucion() // deshabilitaDetener
                this.rehabilitarBotonEjecutar();
                this.rehabilitarBotonReinicio();
            })
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
                }, 700);
            });
        }
        this.inputAcelerador = inputAcelerador;
        if (this.inputAcelerador) {
            this.inputAcelerador?.addEventListener("input", () => {
                let valor = parseInt(this.inputAcelerador.value);
                console.log(valor)
                let velocidad = 2500 - valor;
                this.setearVelocidad(velocidad);
            })
        }

        this.inputBloquesSueltos = inputBloquesSueltos;
        if(this.inputBloquesSueltos){
            inputBloquesSueltos.addEventListener("change",()=>{
                if(this.desactivaHuerfanos){
                    this.inahilitarDesactivarHuerfanos();
                } else {
                    this.habilitarDesactivarHuerfanos();
                }
            })
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
        palabrasReservadas.forEach(p => this.agregarPalabraReservada(p));

        this.callbackCambioWorkspaceStandard = (event) => {
            let codigoCrudo;
            if (!event.isUiEvent) {
                if(event.type === "drag" && event.isStart){
                    return
                // } else if(event.type ==="change" || event.type === "drag"){
                // } else if(event.type ==="change" || event.newParentId != undefined){
                } else {
                    if (!this.debeDetenerEjecucion) {
                        codigoCrudo = this.generarCodigoCrudo();
                        if(this.panelCodigoGenerado.value != codigoCrudo){
                            this.detenerEjecucion();
                            this.quitarTodosLosResaltados();
                        }
                    }
                    this.mostrarCodigoCrudo();
                }
            }
        }
        this.eventoCambioWorkspaceActual = null;
        this.setearEventoCambioWorkspaceStandard();

    } // FIN CONSTRUCTOR

    // METODOS PARA EL WORKSPACE - SERIALIZACION

    crearInyectarWorkspace(idElemento, objetoConfig){
        Blockly.inject(idElemento, objetoConfig)
    }

    limpiarWorkspace() {
        return this.workspace.clear()
    }
    obtenerBloquesSerializados(todoElWorskpace = true) {
        if (todoElWorskpace) {
            return Blockly.serialization.workspaces.save(this.workspace);
        }
    }
    cargarBloquesSerializados(bloquesSerializados) {
        return Blockly.serialization.workspaces.load(bloquesSerializados, this.workspace);
        // --load hace el clear previo--
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
        return bloque.setHighlighted(false)
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
        if(this.panelCodigoGenerado){
            this.panelCodigoGenerado.value = this.generarCodigoCrudo();
        }
    }

    setearPrefijoBloques(prefijo) {
        Blockly.JavaScript.STATEMENT_PREFIX = prefijo;
        console.log("setearPrefijoBloques: "+Blockly.JavaScript.STATEMENT_PREFIX)
    }
    setearSufijoBloques(sufijo) {
        Blockly.JavaScript.STATEMENT_SUFFIX = sufijo;
    }
    agregarPalabraReservada(palabra) {
        Blockly.JavaScript.addReservedWords(palabra);
    }

    generarCodigoPrefijado(prefijo = this.prefijo, sufijo = this.prefijo) {
        console.log("generarCodigoPrefijado: " +this.prefijo +" "+this.prefijo)
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
    }

    reiniciarEjecucion(){
        this.detenerEjecucion(); // deshabilita Detener tmb
        this.cuadroOutput?.blanquearTodo();
        this.juego?.reiniciar();
    }

    correrCodigoSincrono(codigo, callback = this.callbackInterprete) {
        const interpreteSincrono = this.crearInterprete(codigo, callback)
        return interpreteSincrono.run();
    }

    generarCorrerCodigoCrudoSincronamente(callback = this.callbackInterprete) {
        this.correrCodigoSincrono(this.generarCodigoCrudo(), callback);
    }

    quitarResaltadoBloqueLuegoAvanzar(id) {
        this.hacerPausaResaltar = false;
        this.hacerPausaQuitarResaltado = true;
        let miBloque = this.workspace.getBlockById(id);
        let inputVeces = miBloque?.getInput('TIMES'); // ADAPTAR A LO NUESTRO - caso adhoc ridículo
        let bloquecitoNumerico = inputVeces?.connection?.targetBlock();
        let valor = bloquecitoNumerico?.getFieldValue("NUM");
        let duracionDeLaPausa = 1;
        console.log(valor)
        duracionDeLaPausa = valor ? valor * this.velocidad : this.velocidad;
        // IR AL PRÓXIMO
        setTimeout(() => {
            // miBloque.setHighlighted(false); // Método de "Block object"
            this.quitarResaltadoBloque(miBloque);
            // miBloque.setHighlighted(false);
            this.hacerPausaQuitarResaltado = false;
            this.hacerPasosHastaBandera()
        }, duracionDeLaPausa);
    }

    recorrerPasos(sincronico = true,callback = this.callbackInterprete) {
        this.juego?.reiniciar();
        this.anularInterpreteIterativo();
        this.quitarTodosLosResaltados();
        this.cuadroOutput?.blanquearTodo();
        this.cuadroOutput?.marcarInicio();
        let codigoActualCrudo = this.generarCodigoCrudo();
        if(this.panelCodigoGenerado){
            this.panelCodigoGenerado.value = codigoActualCrudo;
        }
        let codigoActual = sincronico? codigoActualCrudo : this.generarCodigoPrefijado();
        this.interpreteIterativo = this.crearInterprete(codigoActual, callback);
        console.log(this.interpreteIterativo)
        this.hayCodigoPendiente = true; // ojo, deberíamos chequearlo.
        this.hacerPausaResaltar = false;
        this.hacerPausaQuitarResaltado = false;
        this.debeDetenerEjecucion = false;
        
        if(sincronico){
            this.hacerPasosHastaBandera();
        } else {
            setTimeout(() => {
                this.hacerPasosHastaBandera();
            }, 5); // En este set time out deberíamos dar más tiempo para que vuelvan los personajes a su posición inicial.
        }
    }

    hacerPasosHastaBandera() {
        if (this.hacerPausaQuitarResaltado) { return }
        if (this.debeDetenerEjecucion) { return }
        this.hacerPausaResaltar = false;
        while (
            this.hayCodigoPendiente &&
            !this.hacerPausaResaltar &&
            !this.hacerPausaQuitarResaltado &&
            !this.debeDetenerEjecucion
        ) {
            try {
                this.hayCodigoPendiente = this.interpreteIterativo.step();
                console.log("hayCodigoPendiente: " + this.hayCodigoPendiente)
                if(this.juego && !this.juego.puedeDebeContinuar){this.debeDetenerEjecucion=true}
            } catch (e) {
                console.log(e.message)
            }
        }
        // Si corta el while (por banderas o muerte)
        if (this.hayCodigoPendiente) {
            if (this.hacerPausaResaltar) {
                // Si fue por la bandera de resaltado solamente (not muerte)
                setTimeout(() => { this.hacerPasosHastaBandera() }, 50);
            } else if(this.debeDetenerEjecucion){
                this.detenerEjecucion();
            }
        } else {
            // Terminó todo el código
            this.cuadroOutput?.marcarFin();
            setTimeout(() => { this.detenerEjecucion() }, 500);
        }
    }

    // WORKSPACE - GESTION EVENTOS DE CAMBIO

    removerEventoCambioWorkspace(eventId) {
        this.eventoCambioWorkspaceActual ? this.workspace.removeChangeListener(eventId) : null;
    }

    removerEventoCambioWorkspaceActual() {
        this.removerEventoCambioWorkspace(this.eventoCambioWorkspaceActual);
    }

    setearEventoCambioWorkspace(callback) {
        this.eventoCambioWorkspaceActual ? this.workspace.removeChangeListener(this.eventoCambioWorkspaceActual) : null;
        this.eventoCambioWorkspaceActual = this.workspace.addChangeListener(callback);
    }

    setearEventoCambioWorkspaceStandard() {
        this.setearEventoCambioWorkspace(this.callbackCambioWorkspaceStandard);
    }

    habilitarDesactivarHuerfanos(){
        this.desactivaHuerfanos = true;
        this.eventoHuerfanos = this.workspace.addChangeListener(Blockly.Events.disableOrphans);
    }

    inahilitarDesactivarHuerfanos(){
        this.desactivaHuerfanos = false;
        this.workspace.removeChangeListener(this.eventoHuerfanos);
    }

    // INTERPRETE

    setearCallbackInterprete(callback){
        this.callbackInterprete = callback;
    }

    // VENTANA: METODOS BOTONES EVENTOS

    deshabilitarBotonEjecutar() {
        this.botonEjecutar.disabled = 'disabled';
    }

    rehabilitarBotonEjecutar() {
        this.botonEjecutar.disabled = '';
    }
    deshabilitarBotonDetener() {
        this.botonDetener.disabled = 'disabled'
    }
    rehabilitarBotonDetener() {
        this.botonDetener.disabled = ''
    }
    deshabilitarBotonReinicio() {
        this.botonReiniciar.disabled = 'disabled'
    }

    rehabilitarBotonReinicio() {
        this.botonReiniciar.disabled = ''
    }

    setearVelocidad(milisegundos) {
        this.velocidad = milisegundos;
        this.juego?.setearVelocidad(milisegundos);
    }

    // VENTANA: CREACION DE FUNCIONES GLOBALES

    crearFuncionesGlobalesStandard() {
        window.globalAlertMock = (texto) => {
            return this.cuadroOutput?.agregarTexto(texto, true); // bool: salto de linea
        }
        window.globalResaltar = (id) => { return this.resaltarBloque(id) }
        window.globalQuitar = (id) => { return this.quitarResaltadoBloqueLuegoAvanzar(id); }
    }
}

export default class ControladorStandard extends Controlador {
    constructor(
        juego,
        veolocidadMilisegundos,
        blocklyDivId,
        blocklyWorkspaceConfig, 
        bloquesPreCargados=false
        ) {
        let elementoOutput = document.getElementById('dhs-text-area-output-generado');
        super(
            juego, veolocidadMilisegundos, blocklyDivId, blocklyWorkspaceConfig,
            document.getElementById("dhs-boton-ejecutar"),
            document.getElementById("dhs-boton-detener"),
            document.getElementById("dhs-boton-reiniciar"),
            document.getElementById("dhs-input-acelerador"),
            document.getElementById("dhs-input-bloques-sueltos"),
            document.getElementById("dhs-text-area-codigo-generado"),
            elementoOutput ? new MostradorOutput(elementoOutput) : false
        )
        if(bloquesPreCargados){
            this.cargarBloquesSerializados(JSON.parse(bloquesPreCargados));
        }
        setTimeout(()=>{
            document.getElementById("dhs-input-bloques-sueltos")?.setAttribute("checked",true);
            this.habilitarDesactivarHuerfanos(),1
        });
        this.callbackInterpreteStandard = (interpreter, globalObject) => {
            // const wrapperAlert = function alert(text) {
            //     window.globalAlertMock(text);
            // };
            // interpreter.setProperty(globalObject, 'alert',
            //     interpreter.createNativeFunction(wrapperAlert));
        
            interpreter.setProperty(globalObject, 'alert',
                interpreter.createNativeFunction(globalAlertMock));
        
            const wrapperPrompt = function prompt(text) {
                return window.prompt(text);
            };
            interpreter.setProperty(globalObject, 'prompt',
                interpreter.createNativeFunction(wrapperPrompt));
        
            // const wrapperResaltar = function (id) {
            //     id = String(id || '');
            //     return window.globalResaltar(id);
            // };
            // interpreter.setProperty(globalObject, 'resaltarBloque',
            //     interpreter.createNativeFunction(wrapperResaltar));
        
            interpreter.setProperty(globalObject, 'resaltarBloque',
                interpreter.createNativeFunction(globalResaltar));
        
            // const wrapperQuitarResaltado = function (id) {
            //     id = String(id || '');
            //     return window.globalQuitar(id);
            // };
            // interpreter.setProperty(globalObject, 'quitarResaltadoBloqueLuegoAvanzar',
            //     interpreter.createNativeFunction(wrapperQuitarResaltado));
        
            interpreter.setProperty(globalObject, 'quitarResaltadoBloqueLuegoAvanzar',
                interpreter.createNativeFunction(globalQuitar));
        }
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
