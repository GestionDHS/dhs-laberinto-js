import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
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
  [1, 1, 1, 1, 1, 1],
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
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro!",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, 4, "#9ca64e");
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
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    paddingImagen: "1px",
    colisiones: [
      {
        con: "arbol",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un árbol",
      },
      {
        con: "lodo",
        factorDeAvance: 0.7,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Me atasqué en el lodo.",
      },
    ],
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
    paddingImagen: "1px",
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
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[30]);

miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay cofre.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.");
  }
  if (this.mochila.length === 1) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! El cofre está sin abrir.");
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
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
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

// const bloquesPrecargadosJSON =
//   '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"move_right_simple","id":",utl5dM,eQs2#5CCH,l=","next":{"block":{"type":"move_down_simple","id":")[,NyXcPkR=KGIxk.S3z","next":{"block":{"type":"move_down_simple","id":"HljvKTFU9*^-`/3FW3.G","next":{"block":{"type":"move_right_simple","id":"fv:usvDjsXkbs]_d?t(q","next":{"block":{"type":"move_right_simple","id":"*u|?hH7NZH%!cCOWlM})","next":{"block":{"type":"abrir_cofre","id":"qQ:TpvUJt`1n=NL7nR-|"}}}}}}}}}}}}}}]}}'

miControlador.setearYCargarBloquesIniciales(JSON.parse(bloquesPrecargadosJSON));
miControlador.setearEventoCambioWorkspaceStandard();
miControlador.habilitarDesactivarHuerfanos();
miControlador.crearFuncionesGlobalesStandard();
miControlador.juego.agregarGlobalConCallback("moverDerecha");
miControlador.juego.agregarGlobalConCallback("moverAbajo");
miControlador.juego.agregarGlobalConCallback("moverArriba");
miControlador.juego.agregarGlobalConCallback("moverIzquierda");
miControlador.juego.agregarGlobalConCallback("abrirCofre");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
