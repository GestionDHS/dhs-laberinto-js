//actividad01 de Programando Robots
import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";
// import { toolbox } from 'blockly/core/utils';

document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
//Blockly

//CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [4, 5]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
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
  imagen: "brujula",
  texto: "Encontramos una brújula antigua!",
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
miJuego.generarEscenario(dimensiones, tablero, 4, "#9ca64e", arbol, pasto);
miJuego.agregarModal(datosModal);
//miJuego.agregarModalError(datosModalError);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);

//tipoPersonaje : Personaje / PersonajeDibujante / PersonajeMovible
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
    posicionInicialX: 3,
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
    idUsarHTML: "cofre",
    tipoPersonaje: "cofre",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
    paddingImagen: "1px",
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[20]);
// window.miJuego.listaDePersonajes;
//Método para Abrir el Cofre
miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay cofre.");
    //this.abrirModalFalloApertura();
  } else if (!intento.exito) {
    //this.abrirYMostrarModal();
    return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.");
  }
  //como hay un cofre solo, validamos la muchila acá
  if (this.mochila.length === 1) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! El cofre está sin abrir.");
  }
};

// miJuego.personajePrincipal.llegarALaBandera = function () {
//    console.log(this.mochila.length)
//   if (this.mochila.length === 1) {
//     this.abrirYMostrarModal();
//   } else {
//     return this.decirTerminar("¡Oh! El cofre está sin abrir.")
//   }
// }

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
  ["move_classic_simple", "Movimientos"],
  // ["move_classic_param", "Movimientos"],
  // ["avanzar_param", "Movimientos"],
  // ["girar_clasico", "Movimientos"],
  // ["girar_grados", "Movimientos"],
  // ["apuntar_hacia", "Movimientos"],
  ["abrir_cofre", "Acciones"],
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
miControlador.juego.agregarGlobalConCallback("moverDerecha");
miControlador.juego.agregarGlobalConCallback("moverAbajo");
miControlador.juego.agregarGlobalConCallback("moverArriba");
miControlador.juego.agregarGlobalConCallback("moverIzquierda");
miControlador.juego.agregarGlobalConCallback("abrirCofre");
// miControlador.juego.agregarGlobalConCallback("juntarBasura");
// miControlador.juego.agregarGlobalConCallback("avanzar");
// miControlador.juego.agregarGlobalConCallback("girarIzquierda");
// miControlador.juego.agregarGlobalConCallback("girarDerecha");
// miControlador.juego.agregarGlobalConCallback("girarGrados");
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