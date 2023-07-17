import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import carpincho from '../../img/carpinchoArriba.png';
import pastoDelta from '../../img/pastoDelta.png';
import juncoPastoDelta from '../../img/juncoPastoDelta.png';
import {PersonajeMovibleGrados} from '../../clases/Personaje';
import carpinchoReal from '../../img/carpinchoReal.png';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0],
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
  imagen: "carpinchoReal",
  texto: "¿Sabías que los carpinchos son un tipo de ROEDOR?¡Como los ratones!",
  oculto: true,
};
//787878
miJuego.generarEscenario(dimensiones, tablero, 3, "#787878", edificiosSendero, calle);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, edificiosSendero, calle);

const arrayDePersonajes = [
  {
    idUsarHTML: "carpincho",
    tipoPersonaje: "carpincho",
    clasePersonaje: "PersonajeMovibleGrados",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "carpincho" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 0,
    direccionInicial: 90,
    zIndex: 3,
    rotable: true,
    paddingImagen: "1px",
    colisiones: [
      {
        con: "juncoPastoDelta",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un junco!",
      },
      {
        con: "pastoDelta",
        factorDeAvance: 1,
        mensaje: "¡Extrañana el pasto!",
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
        con: "autoArriba",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un auto.",
      },
      {
        con: "bandera",
        factorDeAvance: 1,
        callback: (x) => {
          x.llegarALaBandera();
        },
      },
    ],
  },
  {
    idUsarHTML: "juncoPastoDelta",
    tipoPersonaje: "juncoPastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "juncoPastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "juncoPastoDelta",
    tipoPersonaje: "juncoPastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "juncoPastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "juncoPastoDelta",
    tipoPersonaje: "juncoPastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "juncoPastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "juncoPastoDelta",
    tipoPersonaje: "juncoPastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "juncoPastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "juncoPastoDelta",
    tipoPersonaje: "juncoPastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "juncoPastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 5,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 6,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 5,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 5,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "pastoDelta",
    tipoPersonaje: "pastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "pastoDelta" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "autoArriba",
    tipoPersonaje: "autoArriba",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoArriba" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 0,
    direccionInicial: 90,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoArriba",
    tipoPersonaje: "autoArriba",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoArriba" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 1,
    direccionInicial: 90,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoArriba",
    tipoPersonaje: "autoArriba",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoArriba" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 2,
    direccionInicial: 90,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoArriba",
    tipoPersonaje: "autoArriba",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoArriba" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 5,
    posicionInicialX: 3,
    direccionInicial: 120,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "autoArriba",
    tipoPersonaje: "autoArriba",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "autoArriba" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 6,
    posicionInicialX: 3,
    direccionInicial: 180,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "bandera",
    tipoPersonaje: "bandera",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "bandera" },
      abierto: { name: "abierto", imageUrl: "bandera" },
    },
    estadoInicial: "cerrado",
    posicionInicialY: 5,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
    paddingImagen: "1px",
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

miJuego.personajePrincipal.llegarALaBandera = function () {
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
  ["avanzar_param", "Movimientos"],
  ["girar_grados", "Movimientos"],
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
 miControlador.juego.agregarGlobalConCallback("girarGrados");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
