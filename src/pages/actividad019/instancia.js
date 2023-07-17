import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
];

const juncoPastoDelta = {
  idUsarHTML: "juncoPastoDelta",
  tipoPersonaje: "juncoPastoDelta",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "juncoPastoDelta" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px",
};
const agua = {
  idUsarHTML: "agua",
  tipoPersonaje: "agua",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "agua" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px",
};

const datosModal = {
  titulo: "¡LLEGAMOS!",
  imagen: "rioParana",
  texto: "¿Sabías que el río Paraná tiene 4880 kilómetros de largo?",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, tablero, 2.5, "#9ca64e", juncoPastoDelta, agua);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, juncoPastoDelta, agua);

const arrayDePersonajes = [
  {
    idUsarHTML: "pato",
    tipoPersonaje: "pato",
    clasePersonaje: "PersonajeMovibleGrados",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pato" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 1,
    direccionInicial: 90,
    zIndex: 3,
    rotable: true,
    paddingImagen: "1px",
    colisiones: [
      {
        con: "juncoPastoDelta",
        factorDeAvance: 0.7,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Por aquí no puedo nadar.",
      },
      {
        con: "plastico",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡CUACK, NO! Hay demasiada basura",
      },

      {
        con: "familiaPato",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.llegarALaFamilia();
            },
      },
      
    ],
  },
 
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
    },
    estadoInicial: "normal",
    posicionInicialY: 2,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
    },
    estadoInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "familiaPato",
    tipoPersonaje: "familiaPato",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "familiaPato" },
    },
    estadoInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
];


miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);


miJuego.personajePrincipal.llegarALaFamilia = function () {
  this.abrirYMostrarModal();
};

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
    ["avanzar_param", "Movimientos"],
   ["girar_clasico", "Movimientos"],
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
 miControlador.juego.agregarGlobalConCallback("avanzar");
 miControlador.juego.agregarGlobalConCallback("girarIzquierda");
 miControlador.juego.agregarGlobalConCallback("girarDerecha");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});