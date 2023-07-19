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
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
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
  // pintable: true,
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
  imagen: "conejo",
  texto: "Te comiste todas las zanahorias y llegaste a la madriguera!",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, tablero, 2.7, "#9ca64e");
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);

const arrayDePersonajes = [
  {
    idUsarHTML: "conejo",
    tipoPersonaje: "conejo",
    clasePersonaje: "PersonajeMovibleGrados",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "conejoDeArriba" },
    },
    estadoInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 180,
    zIndex: 3,
    rotable: true,
    paddingImagen: "0.3px",
    colisiones: [
      {
        con: "madriguera",
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
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "normal", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado",
    posicionInicialY: 2,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "abierto", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 2,
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "abierto", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado",
    posicionInicialY: 3,
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
    paddingImagen: "1px",
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "abierto", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 3,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "normal", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 4,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "abierto", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 4,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "normal", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 5,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
  {
    idUsarHTML: "zanahoria",
    tipoPersonaje: "zanahoria",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" },
      abierto: { name: "normal", imageUrl: "zanahoriaCosechada" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 5,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
  {
    idUsarHTML: "madriguera",
    tipoPersonaje: "madriguera",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "madriguera" },
      abierto: { name: "abierto", imageUrl: "madriguera" }, //baja a alta? cambiar de color?
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 2,
    posicionInicialX: 5,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    paddingImagen: "1px",
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

miJuego.personajePrincipal.cosecharZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Esta zanahoria ya fue cosechada.");
  }
};

miJuego.personajePrincipal.comerZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "serJuntado");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if (!intento.exito) {
    if (intento.estadoPrevio == "juntado") {
      return this.decirTerminar("¡Oh! Esta zanahoria ya fue comida.");
    } else if (intento.estadoPrevio == "cerrado") {
      return this.decirTerminar("¡Oh! Esta zanahoria aún no fue cosechada.");
    }
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
  if (this.mochila.length === 16) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedaron zanahorias sin cosechar.");
  }
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
  ["avanzar", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["cosechar", "Acciones"],
  ["comer", "Acciones"],
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
miControlador.juego.agregarGlobalConCallback("cosecharZanahoria");
miControlador.juego.agregarGlobalConCallback("comerZanahoria");
miControlador.juego.agregarGlobalConCallback("avanzar");
miControlador.juego.agregarGlobalConCallback("girarIzquierda");
miControlador.juego.agregarGlobalConCallback("girarDerecha");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
