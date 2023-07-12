//actividad06 de Programando Robots
import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";
import carpincho from '../../img/carpinchoArriba.png';
import pastoDelta from '../../img/pastoDelta.png';
import juncoPastoDelta from '../../img/juncoPastoDelta.png';
import {PersonajeMovibleGrados} from '../../clases/Personaje';
import carpinchoReal from '../../img/carpinchoReal.png';
// import { toolbox } from 'blockly/core/utils';

document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
//Blockly

//CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [7, 7]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
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
  // pintable: true,
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
  // pintable: true,
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
// const datosModalError = {
//   titulo: "¡Ohh Nooww!",
//   imagen: "monedas", //sacar las monedas - simbolo de prohibido
//   texto: "Oh! Aquí no hay cofre.",
//   oculto: true,
//   color: "red",
// };
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, tablero, 3, "#a0a0a0", edificiosSendero, calle);
miJuego.agregarModal(datosModal);
//miJuego.agregarModalError(datosModalError);
miJuego.generarCaminoYpared(dimensiones, tablero, edificiosSendero, calle);

//tipoPersonaje : Personaje / PersonajeDibujante / PersonajeMovible
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
      // {
      //   con: "pastoSendero",
      //   factorDeAvance: 1,
      //   // callback: (x) => {
      //   //   x.pasearPor();
      //   // },
      //   mensaje: "¡Qué lindo ir por el parque!",
      // },
      // {
      //   con: "escuelaSendero",
      //   factorDeAvance: 0.4,
      //   callback: (x) => {
      //     x.llegarEscuela();
      //   },
      //   mensaje: "¡Llegué justo para mi clase de inglés!",
      // },
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
      // {
      //   con: "barrera",
      //   factorDeAvance: 0.4,
      //   callback: (x) => {
      //     x.terminar();
      //   },
      //   mensaje: "¡OH NO! Choqué contra una barrera.",
      // },
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
        // mensaje: "¡We are the Champions!",
      },
      // {
      //   con: "autoEmbotelladoIzq",
      //   factorDeAvance: 0.4,
      //   callback: (x) => {
      //     x.terminar();
      //   },
      //   mensaje: "¡OH NO! Choqué contra un auto.",
      // },
      // {
      //   con: "casaSendero",
      //   factorDeAvance: 0.4,
      //   callback: (x) => {
      //     x.terminar();
      //   },
      //   mensaje: "¡OH NO! Choqué contra mi casa.",
      // },
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
      abierto: { name: "abierto", imageUrl: "bandera" }, //baja a alta? cambiar de color?
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 5,
    posicionInicialX: 6,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
    paddingImagen: "1px",
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);
// window.miJuego.listaDePersonajes;

//Funciones Inyectadas en ésta instancia
miJuego.personajePrincipal.llegarALaBandera = function () {
    this.abrirYMostrarModal();
}

//Inicializamos todos los personajes

//Generamos el WORKSPACE

const miControlador = new ControladorStandard(
  miJuego,
  velocidadInicial
  // 'dhs-blockly-div',
  // JSON.stringify(toolbox),
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
  // {
  //   name: "Lápiz",
  //   categorystyle: "pencil",
  // },
  // {
  //   name: "Acciones",
  //   categorystyle: "action",
  // },
  // {
  //   name: "Condicionales",
  //   categorystyle: "logic_category",
  // },
  // {
  //   name: "Repeticiones",
  //   categorystyle: "loop_category",
  // },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  // [nombreBloque, categoriaDestino]
  // [grupoBloques, categoriaDestino]
  ["on_execute", "Eventos"],
  // ["move_classic_simple", "Movimientos"],
  //["move_classic_param", "Movimientos"],
  ["avanzar_param", "Movimientos"],
  // ["girar_clasico", "Movimientos"],
  ["girar_grados", "Movimientos"],
  // ["apuntar_hacia", "Movimientos"],
  // ["abrir_cofre", "Acciones"],
  // ["juntar_basura", "Acciones"],
  // ["lapiz", "Lápiz"],
  // ["if", "Condicionales"],
  // ["controls", "Repeticiones"],
];

bloquesCustomStandardDesados.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});

//pruebas render y theme
// render.makeConstants_()
// const customCategory = new CustomCategory()
// customCategory.setear();
// const theme = customTheme.theme;
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
//miControlador.juego.agregarGlobalConCallback("moverDerecha");
//miControlador.juego.agregarGlobalConCallback("moverAbajo");
//miControlador.juego.agregarGlobalConCallback("moverArriba");
//miControlador.juego.agregarGlobalConCallback("moverIzquierda");
// miControlador.juego.agregarGlobalConCallback("abrirCofre");
// miControlador.juego.agregarGlobalConCallback("juntarBasura");
miControlador.juego.agregarGlobalConCallback("avanzar");
// miControlador.juego.agregarGlobalConCallback("girarIzquierda");
// miControlador.juego.agregarGlobalConCallback("girarDerecha");
 miControlador.juego.agregarGlobalConCallback("girarGrados");
// miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
// miControlador.juego.agregarGlobalConCallback("bajarLapiz");
// miControlador.juego.agregarGlobalConCallback("subirLapiz");
// miControlador.juego.agregarGlobalConCallback("setearColor");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
  //callbackExtras(interpreter, globalObject);
});
