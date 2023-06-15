import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
import ControladorStandard from "../../bloques/Controlador";
//import Blockly from 'blockly';
//import 'blockly/blocks_compressed';
//import 'blockly/javascript_compressed';
//import 'blockly/msg/en';

//import miToolboxJSON from "../../bloques/toolboxJsIO";
//import bloquesPrecargadosJSON from "./bloquesPrecargados";

document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const miJuego = new Juego();

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
const listaBloquesAGenerar = [
  "arriba",
  "abajo",
  "izquierda",
  "derecha",
  "llave",
];

// CUARTO : CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [5, 6]; //fila, columna

//aca hay que pasarle el tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

const arbol = {
  idUsarHTML: "arbol",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "arboles" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "pasto" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};
const datosModalError = {
  titulo: "¡Ohh Nooww!",
  imagen: "monedas",
  texto: "No habia un cofre acá :(",
  oculto: true,
};
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, tablero, 3, "white", arbol, pasto);
miJuego.agregarModal(datosModal);
miJuego.agregarModalError(datosModalError);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);
//miJuego.generarWorkspace()
// document.getElementById("dhs-boton").addEventListener("click", function (e) {
//   e.preventDefault()
//   miJuego.ejecutar();
// });
// const arrayDePersonajes= [
//   {
//     nombre: "lupe",
//     filaInicial: ,
//     columnaInicial:  ,
//     estadoInicial:  ,
//   }
// ]
const arrayDePersonajes = [
  {
    idUsarHTML: "lupe",
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "lupe" },
    },
    statusInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    colisiones: [
      {
        con: "lodo",
        factorDeAvance: 0.7,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Me atasqué en el lodo.",
      },
      {
        con: "arbol",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje:
          "¡OH NO! tus ojos son dos luceros que iluminan mi camino, ayer los cerraste y me hice mierda contra un pino.",
      },

      // {
      //   con: "cofre",
      //   factorDeAvance: 1,
      //   callback: (x) => {
      //     //depende si tengo el bloque Abrir Cofre
      //       x.abrir("cofre");
      //   },
      //   mensaje: "¡We are the Champions!",
      // },
    ],
  },

  {
    idUsarHTML: "lodo",
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "lodo" },
    },
    statusInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    statusInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"procedures_defnoreturn","id":"8BH1s@hcrZu{-_0H6OGt","x":144,"y":78,"icons":{"comment":{"text":"Describe this function...","pinned":false,"height":80,"width":160}},"fields":{"NAME":"saludar"},"inputs":{"STACK":{"block":{"type":"text_print","id":"-TL1e7.rx8dCX6w+d]jF","inputs":{"TEXT":{"shadow":{"type":"text","id":"^uT,ZfpH?$RJnbmF4.Bg","fields":{"TEXT":"Hola Lucho!"}}}},"next":{"block":{"type":"text_print","id":"O_YOmWt(h2Ds]`b?g{fq","inputs":{"TEXT":{"shadow":{"type":"text","id":"VP8D(SE=bm$Q/ZvX*F;s","fields":{"TEXT":"Bienvenido!"}}}},"next":{"block":{"type":"variables_set","id":"cr,`^`:!-nck0K^bij[P","fields":{"VAR":{"id":"n"}},"inputs":{"VALUE":{"block":{"type":"text_prompt_ext","id":"}EDaTBpvRz]h$th.To)g","extraState":"<mutation type=\\"TEXT\\"></mutation>","fields":{"TYPE":"TEXT"},"inputs":{"TEXT":{"shadow":{"type":"text","id":"FAptfzX@5aGQlTj%ooQe","fields":{"TEXT":"¿Cual es tu apellido?"}}}}}}},"next":{"block":{"type":"text_print","id":"yW`l=BPlv/qVG3%LKYvE","inputs":{"TEXT":{"shadow":{"type":"text","id":"4%WtpMAU#$i*{A_hn#0I","fields":{"TEXT":"Genial entonces"}}}},"next":{"block":{"type":"text_print","id":"EyMm??F$vBFV=H(L6e1|","inputs":{"TEXT":{"shadow":{"type":"text","id":"WqE)a%lwrr@ASVoL(zpG","fields":{"TEXT":"abc"}},"block":{"type":"variables_get","id":"H-HVcgmemxmrd8Pi^~Qs","fields":{"VAR":{"id":"n"}}}}}}}}}}}}}}}}},{"type":"procedures_callnoreturn","id":"tcuK1r4oW[*Vt41){mV|","x":45,"y":51,"extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"Pm^DF#|HQS!NC?l7[Jq9","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"ZRPIXDp?@,izj.1+K%g]","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"Lh,UzXrItT$LSG_Oy-|)","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"ex*AeN^hv9^/F)Y5f5!R","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"_YwKOnFm$d[(Dlf0[f)^","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"e!bY!^1uz;lm7#HNfo$B","extraState":{"name":"saludar"},"next":{"block":{"type":"procedures_callnoreturn","id":"C@mt)vy)`FQr*rIMI]rx","extraState":{"name":"saludar"}}}}}}}}}}}}}}}}]},"variables":[{"name":"apellido","id":"n"}]}';
const miToolboxJSON = '{"contents":[{"kind":"CATEGORY","name":"Logic","colour":"%{BKY_LOGIC_HUE}","contents":[{"kind":"BLOCK","type":"controls_if"},{"kind":"BLOCK","type":"logic_compare"},{"kind":"BLOCK","type":"logic_operation"},{"kind":"BLOCK","type":"logic_negate"},{"kind":"BLOCK","type":"logic_boolean"}]},{"kind":"CATEGORY","name":"Loops","colour":"%{BKY_LOOPS_HUE}","contents":[{"kind":"BLOCK","type":"controls_repeat_ext","inputs":{"TIMES":{"shadow":{"type":"math_number","fields":{"NUM":10}}}}},{"kind":"BLOCK","type":"controls_whileUntil"}]},{"kind":"CATEGORY","name":"Math","colour":"%{BKY_MATH_HUE}","contents":[{"kind":"BLOCK","type":"math_number"},{"kind":"BLOCK","type":"math_arithmetic","inputs":{"A":{"shadow":{"type":"math_number","fields":{"NUM":1}}},"B":{"shadow":{"type":"math_number","fields":{"NUM":1}}}}},{"kind":"BLOCK","type":"math_single","inputs":{"NUM":{"shadow":{"type":"math_number","fields":{"NUM":9}}}}}]},{"kind":"CATEGORY","name":"Text","colour":"%{BKY_TEXTS_HUE}","contents":[{"kind":"BLOCK","type":"text"},{"kind":"BLOCK","type":"text_length","inputs":{"VALUE":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}},{"kind":"BLOCK","type":"text_print","inputs":{"TEXT":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}},{"kind":"BLOCK","type":"text_prompt_ext","inputs":{"TEXT":{"shadow":{"type":"text","fields":{"TEXT":"abc"}}}}}]},{"kind":"SEP"},{"kind":"CATEGORY","name":"Variables","custom":"VARIABLE","colour":"%{BKY_VARIABLES_HUE}"},{"kind":"CATEGORY","name":"Functions","custom":"PROCEDURE","colour":"%{BKY_PROCEDURES_HUE}"}]}';

//Generamos el workspace
const miControlador = new ControladorStandard(
  miJuego,
  5000,
  'dhs-blockly-div', 
  miToolboxJSON,
  bloquesPrecargadosJSON
);
miControlador.crearFuncionesGlobalesStandard();
miControlador.setearCallbackInterprete(
  (interpreter, globalObject) => {
      miControlador.callbackInterpreteStandard(interpreter, globalObject);
      //miControlador.juego.callbackInterpreteStandard(interpreter, globalObject);
      //callbackExtras(interpreter, globalObject);
  }
);
//TODO:
/**

 * Mje de Lupe al usuario cuando quiere abrir el cofre y el cofre no está (Pía - fala agregar la foto void)
 * CSS: Arreglar el Modal with, que dependa del tablero (Pía - done)
 * Colisión con la bandera : "Ganar" igual que con el cofre. "Es un colback de Ganaste"
 * Conectar Blockly con éste motor de juego
 * Lupe: Debe tener un atributo "cantidadElementosJuntados" como si fuera una mochila donde va juntando: basura, manzanas, etc
 
 * Tema Girar:
    * 1: Por Grados 
    * 2: Derecha - Izq : es una abstracción de girar en grados.
    
    * Factor de Rotación no cambia por mas q el carpincho rote, si cambia "Avanzar", porque va a depender de la direccion q apunte
 
 */
