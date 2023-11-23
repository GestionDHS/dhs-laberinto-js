import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {
  generarCoordenadas,
  configurarYRenderizarToolbox,
} from "../../Utils/Funciones";
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import { Dhs_Categorias } from "../../clases/Dhs-categorias";


document.querySelector("#appActividad").innerHTML = template(``);

// shareable-procedure
//import * as blocklyShareableProcedures from '../../node_modules/@blockly/block-shareable-procedures/dist/index.js';
//import {unregisterProcedureBlocks} from './node_modules/@blockly/block-shareable-procedures/dist/index.js';

// goog.provide('Blockly.Blocks.procedures'); ----> probando, rompe
// goog.require('Blockly.Blocks');


// PRIMERO: instanciar el juego y setear velocidad
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

//SEGUNDO: CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO, se crea la variable dimensiónes.
const dimensiones = [9, 3]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
];

//TERCERO: Definir que objetos van a ser "pared", y cuales "camino"
const personajesGaleria = new Dhs_personajes();
const pared = personajesGaleria.obtenerPersonaje("arbol");
const camino = personajesGaleria.obtenerPersonaje("pasto");

//CUARTO: Setear Modal de Ganar
const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};

// QUINTO:Para generar el escenario recibe como parametros: dimensiones, el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa "em") el color de borde ...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, 3, "black");
miJuego.agregarModal(datosModal);
let coordenadasCaminoPared = generarCoordenadas(tablero);

//SEXTO: Definir los Objetos Personajes
//Configurar en el caso del personaje princilal la clasePersonaje : PersonajeBasico / PersonajeMovibleSimple / PersonajeMovibleGrados / PersonajeDibujante
//instanciamos y configuramos su posicionamiento a cada personajes necesarios para el juego
//Configurar si o si el posicionamiento

const lupe = personajesGaleria.obtenerPersonaje("lupe");
const cofre = personajesGaleria.obtenerPersonaje("cofre");
const bandera = personajesGaleria.obtenerPersonaje("bandera");
const lodo = personajesGaleria.obtenerPersonaje("lodo");
const basura = personajesGaleria.obtenerPersonaje("basura");

//SEPTIMO: Generar y setear los Personajes - seteo el PersonajePrincipal y sus funciones
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [pared],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [camino],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [lupe],
    posiciones: [[1, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarCantidadTotalFijos",
    personajes: [cofre],
    cantidadTotal:3,
    posiciones: [[2,1],[3,1],[4,1],[5,1],[6,1]],
    aliasConjunto: "azarCantidadTotalFijos",
    desapareceAlReiniciar: true,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[7, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  // {
  //   estrategia: "azarRango",
  //   personajes: [lodo, cofre],
  //   cantidadMin: 1,
  //   cantidadMax: 3,
  //   aliasConjunto: "azarRango",
  //   desapareceAlReiniciar: true,
  // },
  // {
  //   estrategia: "azarRangoFijos",
  //   personajes: [lodo, cofre],
  //   cantidadMin: 1,
  //   cantidadMax: 3,
  //   posiciones: [[2, 1],[3, 1],[4, 1],[5, 1]],
  //   aliasConjunto: "azarRangoFijos",
  //   desapareceAlReiniciar: true,
  // },
  //  {
  //   estrategia: "azarFijos",
  //   personajes: [lodo, cofre],
  //   posiciones: [[2, 1],[1, 2]],
  //   aliasConjunto: "azarFijos",
  //   desapareceAlReiniciar: true,
  // },
  //   {
  //     estrategia: "azarExcluyente",
  //    personajes: [lodo,cofre],
  //    posiciones: [[2, 1]],
  //    aliasConjunto: "azarExcluyente",
  //    desapareceAlReiniciar: true,
  //  },
  //   {
  //     estrategia: "posicionExcluyente",
  //    personajes: [lodo,cofre],
  //    posiciones: [[2, 1],[1, 2]],
  //    aliasConjunto: "posicionExcluyente",
  //    desapareceAlReiniciar: true,
  //  },
  //   {
  //    estrategia: "azarCantTotal",
  //   personajes: [basura,lodo],
  //   cantidadTotal: 2,
  //   aliasConjunto: "azarCantTotal",
  //   desapareceAlReiniciar: true,
  // },
  //   {
  //   estrategia: "azarCantidadTotalFijos",
  //   personajes: [lodo, cofre],
  //   cantidadTotal: 2,
  //   posiciones: [[2, 1],[3, 1],[4, 1],[5, 1]],
  //   aliasConjunto: "azarCantidadTotalFijos",
  //   desapareceAlReiniciar: true,
  // },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
//// Se debe mirar el arrayDePersonajes para saber en que posición esta el personaje principal
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[27]);

//Método para el Cofre
miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay cofre.");
  } else if (!intento.exito) {
    return this.decirTerminar("Oh! Este cofre ya estaba abierto.");
  }
};

miJuego.personajePrincipal.detectarCofre = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("cofre") !== undefined
};

miJuego.personajePrincipal.detectarBandera = function () {
  // devuelve true si encuentra o false si no hay bandera
  return this.buscarObjetoEnCasilleroActual("bandera") !== undefined
};

// //Método para Juntar Basura
// miJuego.personajePrincipal.juntarBasura = function () {
//   const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
//   if (!intento.objetoEncontrado) {
//     this.decirTerminar("Oh! Aquí no hay basura.");
//   } else if (!intento.exito) {
//     this.decirTerminar("Oh! Hubo un problema al juntar la basura.");
//   }
//   return intento;
// };

// // Lancha
// miJuego.personajePrincipal.llegarPlanta = function () {
//   if (this.mochila.length === 3) {
//     this.abrirYMostrarModal();
//   } else if(!this.intento) {
//     return this.decirTerminar("¡Oh! Quedó basura por levantar.")
//   }
// }

// // Pedro - Lupe
// miJuego.personajePrincipal.llegarEscuela = function () {
//   this.abrirYMostrarModal();
// }
miJuego.personajePrincipal.llegarALaBandera = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  if (this.mochila.length >= 3) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedaron cofres sin abrir.");
  }
};

// //Conejo - Nelson
// miJuego.personajePrincipal.cosecharZanahoria = function () {
//   const intento = this.buscarParaRealizarAccion("zanahoria", "abrirse");
//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
//   } else if (!intento.exito) {
//     return this.decirTerminar("¡Oh! Esta zanahoria ya fue cosechada.");
//   }
// };

// miJuego.personajePrincipal.comerZanahoria = function () {
//   const intento = this.buscarParaRealizarAccion("zanahoria", "serJuntado");

//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
//   } else if( intento.estado == "juntado") {
//     return this.decirTerminar("¡Oh! Esta zanahoria ya fue comida.");
//   } else if (!intento.exito ) {
//     return this.decirTerminar("¡Oh! Esta zanahoria aún no fue cosechada.");
//   }
// };

//Seteo del Dibujo a realizar - Verificación. Para los ejercicios que tienen PersonajesDibujables
// const EJEMPLO_DIBUJO_DESEADO = [
//   [null, null, null, null, null],
//   [null, "#000000", null, "#000000", null],
//   [null, "#000000", null, "#000000", null],
//   [null, null, null, null, null],
// ]
// miJuego.personajePrincipal.dibujoDeseado = EJEMPLO_DIBUJO_DESEADO

//******************************************************* */
//    BLOCKLY
//****************************************************** */

//OCTAVO: Creamos una instancia del controlador, argumentos: el juego, velocidad inicial

//****Si necesitamos que el Workspace tenga bloques precargados, lo que hacemos, para obtener el JSON para setearlo es
//****lo siguiente:
//****1- hacemos global a miControlador "window.miControlador"
//****2 - En el Navegador, cargamos los bloques que necesitamos ya estén preCargados
//****3 - Ponemos en consola éste linea: JSON.stringify(miControlador.obtenerBloquesSerializados()) para Obtener bloques precargados
//****4 - Nos copiamos el string que nos devuelve, y se lo colocamos a la variable "bloquesPrecargadosJSON"
//****5 - Volvemos a poner "miControlador" como const

// BLOCKLY ------------------------------------------------------

window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias();
const categoriaElegida = categoria.obtenerCategoriasNecesarias([
  "Eventos",
  "Movimientos",
  "Acciones",
  "Repeticiones",
  "Condicionales",
  "Sensores",
  "Variables",
  "Funciones"
]);

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["repeat_until", "Repeticiones"],
  ["repeat_while", "Repeticiones"],
  ["sensor_cofre", "Sensores"], 
  ["sensor_bandera", "Sensores"],
  ["prompt", "Sensores"],
  ["var", "Variables"],
  // ["variable_pia1", "Variables"],
  ["funcion", "Funciones"],
];

delete Blockly.Blocks['procedures_defreturn'];
delete Blockly.Blocks['procedures_ifreturn'];

Blockly.Blocks['procedures_defnoreturn'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    var nameField = new Blockly.FieldTextInput('',
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField("function ")
        .appendField(nameField, 'NAME')
        .appendField("() {")
        .appendField('', 'PARAMS');
    //this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if ((this.workspace.options.comments ||
         (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
      this.setCommentText(null);
    }
    this.setColour(128);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.arguments_ = [];
    this.setStatements_(true);
    this.appendDummyInput().appendField(" } ")
    this.statementConnection_ = null;
  },
  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  
   
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, false];
  },
 
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
   xmlBlock.setAttribute('type', this.callType_);
   //option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
   options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var option = {enabled: true};
        var name = this.arguments_[i];
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        //var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        //var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', 'variables_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callnoreturn'
};
Blockly.Blocks['procedures_callnoreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(this.id, 'NAME')
        .appendField("()");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(128);
    // Tooltip is set in renameProcedure.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      this.setTooltip(
          (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
           Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
          .replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function(paramNames, paramIds) {
  
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }

    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkIds_ = paramIds;
      } else {
        this.quarkIds_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
            paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours_();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        this.getField('ARGNAME' + i).setValue(newName);
      }
    }
  },
  /**
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CREATE &&
        event.ids.indexOf(this.id) != -1) {
      // Look for the case where a procedure call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);

      if (def && (def.type != this.defType_ ||
          JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
       
        block.setAttribute('type', this.defType_);
        var xy = this.getRelativeToSurfaceXY();
        var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        var y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        var mutation = this.mutationToDom();
        block.appendChild(mutation);
        //var field = goog.dom.createDom('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(document.createTextNode(this.getProcedureCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  },
  defType_: 'procedures_defnoreturn'
};

//const bloquesPrecargadosJSON = '{"contents":[{"kind":"CATEGORY","name":"Logic","colour":"%{BKY_LOGIC_HUE}","contents":[{"kind":"BLOCK","type":"controls_if"},{"kind":"BLOCK","type":"logic_compare"},{"kind":"BLOCK","type":"logic_operation"},{"kind":"BLOCK","type":"logic_negate"},{"kind":"BLOCK","type":"logic_boolean"}]},{"kind":"CATEGORY","name":"Loops","colour":"%{BKY_LOOPS_HUE}","contents":[{"kind":"BLOCK","type":"controls_repeat_ext","inputs":{"TIMES":{"shadow":{"type":"math_number","fields":{"NUM":10}}}}},{"kind":"BLOCK","type":"controls_whileUntil"}]},{"kind":"CATEGORY","name":"Math","colour":"%{BKY_MATH_HUE}","contents":[{"kind":"BLOCK","type":"math_number"},{"kind":"BLOCK","type":"math_arithmetic","inputs":{"A":{"shadow":{"type":"math_number","fields":{"NUM":1}}},"B":{"shadow":{"type":"math_number","fields":{"NUM":1}}}}},{"kind":"BLOCK","type":"math_single","inputs":{"NUM":{"shadow":{"type":"math_number","fields":{"NUM":9}}}}}]},{"kind":"CATEGORY","name":"Text","colour":"%{BKY_TEXTS_HUE}","contents":[{"kind":"BLOCK","type":"text"},{"kind":"BLOCK","type":"text_length","inputs":{"VALUE":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}},{"kind":"BLOCK","type":"text_print","inputs":{"TEXT":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}},{"kind":"BLOCK","type":"text_prompt_ext","inputs":{"TEXT":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}}]},{"kind":"SEP"},{"kind":"CATEGORY","name":"Variables","custom":"VARIABLE","colour":"%{BKY_VARIABLES_HUE}"},{"kind":"CATEGORY","name":"Functions","custom":"PROCEDURE","colour":"%{BKY_PROCEDURES_HUE}"}]}';
const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
//const bloquesPrecargadosJSON = '{ "blocks": { "languageVersion": 0, "blocks": [ { "type": "on_execute", "id": "rwW]g?!-iwJNk))r*~^C", "x": 61, "y": 69, "inputs": { "EVENT": { "block": { "type": "repeat_until", "id": "ESTMctZ21tULm}9}6=`/", "inputs": { "condicion": { "block": { "type": "sensor_bandera", "id": "y-]*geVR`[NPdKWgw?qq" } }, "accionesARepetir": { "block": { "type": "move_down_simple", "id": "PZl/2A1}IC+qu2R,6qK0", "next": { "block": { "type": "if", "id": "Iukc+WZWUCe[6b9-v;MC", "inputs": { "condicion": { "block": { "type": "sensor_cofre", "id": "7:pp?;m6U}^9xIgxUpof" } }, "entonces": { "block": { "type": "abrir_cofre", "id": "s^,J)kRBoD$vIU,9$VQt" } } } } } } } } } } } } ] } }'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre","detectarCofre","detectarBandera"]

configurarYRenderizarToolbox(
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExponer
);


var varDefNoRet = Blockly.Blocks.procedures_defnoreturn.init; 
var json= {  
  "type": "block_type",
  "message0": "funcion %1 () %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "nameFn"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "hacer"
    }
  ],
  "inputsInline": true,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}




