import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [5, 6]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1],
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
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "camino",
  pintable: true,
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "pasto" },
  },
  estadoInicial: "normal",
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
miJuego.generarEscenario(dimensiones, 3, "white");
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);

const arrayDePersonajes = [
  {
    idUsarHTML: "lupe",
    tipoPersonaje: "lupe",
    clasePersonaje: "PersonajeDibujante",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lupe" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 3,
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
        mensaje: "¡OH NO! Choqué contra un árbol",
      },
    ],
  },
  {
    idUsarHTML: "lodo",
    tipoPersonaje: "lodo",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lodo" },
    },
    estadoInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "cofre",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    estadoInicial: "cerrado",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
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
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);

miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[30]);

miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay cofre.");
    //this.abrirModalFalloApertura();
  } else if (!intento.exito) {
    //this.abrirYMostrarModal();
    return this.decirTerminar("Oh! Este cofre ya estaba abierto.");
  } else {
    return this.abrirYMostrarModal();
  }
};

miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
  if (!intento.objetoEncontrado) {
    this.decirTerminar("Oh! Aquí no hay basura.");
  } else if (!intento.exito) {
    this.decirTerminar("Oh! Hubo un problema al juntar la basura.");
  }
  return intento;
};

const miControlador = new ControladorStandard(miJuego, velocidadInicial);

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
    name: "Lápiz",
    categorystyle: "pencil",
  },
  {
    name: "Acciones",
    categorystyle: "action",
  },
  {
    name: "Condicionales",
    categorystyle: "logic_category",
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
  // [nombreBloque, categoriaDestino]
  // [grupoBloques, categoriaDestino]
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["move_classic_param", "Movimientos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["girar_grados", "Movimientos"],
  ["apuntar_hacia", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["juntar_basura", "Acciones"],
  ["lapiz", "Lápiz"],
  ["if", "Condicionales"],
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
//miControlador.juego.agregarGlobalConCallback("moverDerecha");
//miControlador.juego.agregarGlobalConCallback("moverAbajo");
//miControlador.juego.agregarGlobalConCallback("moverArriba");
//miControlador.juego.agregarGlobalConCallback("moverIzquierda");
miControlador.juego.agregarGlobalConCallback("abrirCofre");
miControlador.juego.agregarGlobalConCallback("juntarBasura");
miControlador.juego.agregarGlobalConCallback("avanzar");
miControlador.juego.agregarGlobalConCallback("girarIzquierda");
miControlador.juego.agregarGlobalConCallback("girarDerecha");
miControlador.juego.agregarGlobalConCallback("girarGrados");
miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
miControlador.juego.agregarGlobalConCallback("bajarLapiz");
miControlador.juego.agregarGlobalConCallback("subirLapiz");
miControlador.juego.agregarGlobalConCallback("setearColor");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
