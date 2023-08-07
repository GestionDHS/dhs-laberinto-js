import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { generarCoordenadas } from "../../Utils/Funciones";
import { Dhs_personajes } from "../../clases/Dhs-personajes";

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

// fondo es el blanco
// recuadroPintableDeseado es el dibujo en gris
const recuadroPintableDeseado = {
  idUsarHTML: "recuadro-pintable",
  tipoPersonaje: "recuadro-pintable",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: null },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  colorFondoInicial: "lightgrey",
  rotable: false,
};

const recuadroPintableNoDeseado = { ...recuadroPintableDeseado };
recuadroPintableNoDeseado.colorFondoInicial = "white";

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "lapizRojo",
  texto: "Lograste realizar el dibujo",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 2.5, "white");
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, recuadroPintableDeseado, recuadroPintableNoDeseado);

const arrayDePersonajes = [
  {
    idUsarHTML: "lapiz",
    tipoPersonaje: "lapiz",
    clasePersonaje: "PersonajeDibujante",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lapizRojo" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 0,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

const miColor = "#FA3939";

const dibujoDeseado = tablero.map((row) =>
  row.map((cell) => (cell === 0 ? false : miColor))
);

miJuego.personajePrincipal.dibujoDeseado = dibujoDeseado;

window.miControlador = new ControladorStandard(
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
    name: "Lápiz",
    categorystyle: "pencil",
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
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["lapiz", "Lápiz"],
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
