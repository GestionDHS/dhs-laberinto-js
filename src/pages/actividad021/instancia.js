import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);
const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1],  
];

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
  paddingImagen: "1px"
};

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
  paddingImagen: "1px"
};

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "ecobrick",
  texto: "En esta planta recicladora transformamos los residuos plásticos en LADRILLOS ECOLÓGICOS.",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, tablero, 2.7, "#007a4c", juncoPastoDelta, agua);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, juncoPastoDelta, agua);

const arrayDePersonajes = [
  {
    idUsarHTML: "lancha",
    tipoPersonaje: "lancha",
    clasePersonaje: "PersonajeMovibleGrados",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lancha" },
    },
    estadoInicial: "normal",
    posicionInicialY: 0,
    posicionInicialX: 5,
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
        mensaje: "¡OH NO! Choqué contra los juncos.",
      },
      {
        con: "plantaReciclajePastoDelta",
        factorDeAvance: 0.4,
        callback: (x) => {
          x.llegarPlanta();
        },
      },
    ],
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
      juntado: { name: "juntado", imageUrl: "agua" }
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 0,
    posicionInicialX: 1,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
      juntado: { name: "juntado", imageUrl: "agua" }
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 3,
    posicionInicialX: 1,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
  {
    idUsarHTML: "plastico",
    tipoPersonaje: "plastico",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plastico" },
      juntado: { name: "juntado", imageUrl: "agua" }
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
    idUsarHTML: "plantaReciclajePastoDelta",
    tipoPersonaje: "plantaReciclajePastoDelta",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "plantaReciclajePastoDelta" },
    },
    estadoInicial: "normal",
    zIndex: 1,
    posicionInicialY: 6,
    posicionInicialX: 1,
    direccionInicial: 0,
    rotable: false,
    paddingImagen: "1px"
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

miJuego.personajePrincipal.llegarPlanta = function () {
  if (this.mochila.length === 3) {
    this.abrirYMostrarModal();
  } else if(!this.intento) {
    return this.decirTerminar("¡Oh! Quedó basura por levantar.")
  }
}

miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("plastico", "serJuntado");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay plástico.");
  } else if(!intento.exito) {
    return this.decirTerminar("El plástico ya fue levantado.");
  }
};



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
  {
    name: "Acciones",
    categorystyle: "action",
  },
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
  // ["move_classic_param", "Movimientos"],
  ["avanzar_param", "Movimientos"],
  // ["girar_clasico", "Movimientos"],
  // ["girar_grados", "Movimientos"],
  ["apuntar_hacia", "Movimientos"],
  // ["abrir_cofre", "Acciones"],
  ["juntar_basura", "Acciones"],
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
// miControlador.juego.agregarGlobalConCallback("moverDerecha");
// miControlador.juego.agregarGlobalConCallback("moverAbajo");
// miControlador.juego.agregarGlobalConCallback("moverArriba");
// miControlador.juego.agregarGlobalConCallback("moverIzquierda");
// miControlador.juego.agregarGlobalConCallback("abrirCofre");
miControlador.juego.agregarGlobalConCallback("juntarBasura");
miControlador.juego.agregarGlobalConCallback("avanzar");
// miControlador.juego.agregarGlobalConCallback("girarIzquierda");
// miControlador.juego.agregarGlobalConCallback("girarDerecha");
// miControlador.juego.agregarGlobalConCallback("girarGrados");
miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
// miControlador.juego.agregarGlobalConCallback("bajarLapiz");
// miControlador.juego.agregarGlobalConCallback("subirLapiz");
// miControlador.juego.agregarGlobalConCallback("setearColor");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
  //callbackExtras(interpreter, globalObject);
});
