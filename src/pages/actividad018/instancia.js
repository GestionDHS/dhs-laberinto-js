import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [9, 9]; //fila, columna

const tablero = [
  [1, 0, 1, 0, 0, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  
];

const calle = {
  idUsarHTML: "calle",
  tipoPersonaje: "calle",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "calle" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px"
};

const escuelaSendero = {
  idUsarHTML: "escuelaSendero",
  tipoPersonaje: "escuelaSendero",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "escuelaSendero" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px"
};

const edificiosSendero = {
  idUsarHTML: "edificiosSendero",
  tipoPersonaje: "edificiosSendero",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "edificiosSendero" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px"
};

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "ciclista",
  texto: "¡Pedro llegó a la escuela a tiempo para su clase de inglés!",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, tablero, 2.5, "#a0a0a0", edificiosSendero, calle);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, edificiosSendero, calle);

const arrayDePersonajes = [
  {
    idUsarHTML: "ciclista",
    tipoPersonaje: "ciclista",
    clasePersonaje: "PersonajeMovibleSimple",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "ciclista" },
    },
    estadoInicial: "normal",
    posicionInicialY: 7,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    paddingImagen: "1px",
    colisiones: [
      {
        con: "pastoSendero",
        factorDeAvance: 1,
        mensaje: "¡Qué lindo ir por el parque!",
      },
      {
        con: "escuelaSendero",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.llegarEscuela();
        },
        mensaje: "¡Llegué justo para mi clase de inglés!",
      },
      {
        con: "arbolesSendero",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un árbol.",
      },
      {
        con: "edificiosSendero",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un edificio.",
      },
      {
        con: "barrera",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra una barrera.",
      },
      {
        con: "autoEmbotelladoDer",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un auto.",
      },
      {
        con: "autoEmbotelladoIzq",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un auto.",
      },
      {
        con: "casaSendero",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra mi casa.",
      },
    ],
  },
  {
    idUsarHTML: "barrera",
    tipoPersonaje: "barrera",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "barrera" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 2,
    posicionInicialX: 1,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "casaSendero",
    tipoPersonaje: "casaSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "casaSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 8,
    posicionInicialX: 1,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "pastoSendero",
    tipoPersonaje: "pastoSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoSendero" },
    },
    estadoInicial: "normal",
    posicionInicialY: 7,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoSendero",
    tipoPersonaje: "pastoSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoSendero" },
    },
    estadoInicial: "normal",
    posicionInicialY: 7,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoSendero",
    tipoPersonaje: "pastoSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoSendero" },
    },
    estadoInicial: "normal",
    posicionInicialY: 7,
    posicionInicialX: 7,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoSendero",
    tipoPersonaje: "pastoSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoSendero" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 7,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoSendero",
    tipoPersonaje: "pastoSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoSendero" },
    },
    estadoInicial: "normal",
    posicionInicialY: 5,
    posicionInicialX: 7,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 8,
    posicionInicialX: 5,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  }, 
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 8,
    posicionInicialX: 6,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 8,
    posicionInicialX: 7,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 8,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 7,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 6,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 6,
    posicionInicialX: 6,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 6,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 6,
    posicionInicialX: 5,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "arbolesSendero",
    tipoPersonaje: "arbolesSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "arbolesSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 5,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 0,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 2,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 3,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 5,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 6,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoIzq",
    tipoPersonaje: "autoEmbotelladoIzq",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 8,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 6,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 5,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 3,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 2,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoEmbotelladoDer",
    tipoPersonaje: "autoEmbotelladoDer",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 4,
    posicionInicialX: 0,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "escuelaSendero",
    tipoPersonaje: "escuelaSendero",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "escuelaSendero" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 0,
    posicionInicialX: 3,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[81]);

miJuego.personajePrincipal.llegarEscuela = function () {
    this.abrirYMostrarModal();
}

const miControlador = new ControladorStandard(
  miJuego,
  velocidadInicial
);

const categoriasDeseadas = [
  {
    name: "Eventos",
    categorystyle: "execute",
  },
  {
    name: "Movimientos",
    categorystyle: "movement",
  },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  ["on_execute", "Eventos"],
  ["move_classic_param", "Movimientos"],
];

bloquesCustomStandardDesados.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});

const render = new CustomRenderer();
render.registrarRender("renderDHS");
miControlador.crearInyectarWorkspace("dhs-blockly-div", {
  toolbox: miControlador.ConfiguradorBloques.toolbox,
  theme: "themeDH",
  renderer: "renderDHS",
  zoom: {
    controls: true,
    wheel: true,
    pinch: true,
  },
});

const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

miControlador.setearYCargarBloquesIniciales(JSON.parse(bloquesPrecargadosJSON));
miControlador.setearEventoCambioWorkspaceStandard();
miControlador.habilitarDesactivarHuerfanos();
miControlador.crearFuncionesGlobalesStandard();
miControlador.juego.agregarGlobalConCallback("moverDerecha");
miControlador.juego.agregarGlobalConCallback("moverAbajo");
miControlador.juego.agregarGlobalConCallback("moverArriba");
miControlador.juego.agregarGlobalConCallback("moverIzquierda");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
