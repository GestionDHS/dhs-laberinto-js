import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";

document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [9, 11]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const arbol = {
  idUsarHTML: "arbol",
  tipoPersonaje: "arbol",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "arboles" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
  paddingImagen: "1px",
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "camino",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "pasto" },
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
  titulo: "¡BUEN TRABAJO!",
  imagen: "basura",
  texto: "¡Quedó todo limpito!.",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, tablero, 2.5, "#9ca64e", arbol, pasto);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);

const arrayDePersonajes = [
  {
    idUsarHTML: "lupe",
    tipoPersonaje: "lupe",
    clasePersonaje: "PersonajeMovibleSimple",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lupe" },
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
        con: "bandera",
        factorDeAvance: 1,
        callback: (x) => {
          x.llegarALaBandera();
        },
        // mensaje: "¡We are the Champions!",
      },
      {
        con: "arbol",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un árbol",
      },
    ],
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 2,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
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
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 4,
    posicionInicialX: 7,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
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
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 8,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "bandera",
    tipoPersonaje: "bandera",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "bandera" },
      abierto: { name: "abierto", imageUrl: "bandera" }, 
    },
    estadoInicial: "cerrado", 
    posicionInicialY: 1,
    posicionInicialX: 8,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
    paddingImagen: "1px",
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[99]);
miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay basura...");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Ya levantamos la basura de aquí.");
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
  console.log(this.mochila.length);
  if (this.mochila.length === 7) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedo basura por levantar.");
  }
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
  {
    name: "Acciones",
    categorystyle: "action",
  },
  {
    name: "Repeticiones",
    categorystyle: "loop_category",
  },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["juntar_basura", "Acciones"],
  ["controls", "Repeticiones"],
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
//miControlador.juego.agregarGlobalConCallback("abrirCofre");
miControlador.juego.agregarGlobalConCallback("juntarBasura");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
