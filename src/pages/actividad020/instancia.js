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

const personajesGaleria = new Dhs_personajes();
const coordenadasCaminoPared = generarCoordenadas(tablero)
const pared = personajesGaleria.obtenerPersonaje("edificiosSendero");
const camino = personajesGaleria.obtenerPersonaje("calle");
const juncoPastoDelta = personajesGaleria.obtenerPersonaje("juncoPastoDelta");
const pastoDelta = personajesGaleria.obtenerPersonaje("pastoDelta");
const autoArriba = personajesGaleria.obtenerPersonaje("autoArriba");
const carpincho = personajesGaleria.obtenerPersonaje("carpincho");
const bandera = personajesGaleria.obtenerPersonaje("bandera");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "carpinchoReal",
  texto: "¿Sabías que los carpinchos son un tipo de ROEDOR?¡Como los ratones!",
  oculto: true,
};
// "#787878"
miJuego.generarEscenario(dimensiones, 3, "#a0a0a0");
miJuego.agregarModal(datosModal);

const conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [pared],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [camino],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [carpincho],
    posiciones: [[3,0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [juncoPastoDelta],
    posiciones: [[3,4],[4,4],[6,4],[6,6],[4,6]],
    aliasConjunto: "fijoJunco",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pastoDelta],
    posiciones: [[3,5],[4,5],[5,5],[6,5],[5,4],[5,6],[3,6]],
    aliasConjunto: "fijoPastoDelta",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [autoArriba],
    posiciones: [[5, 0], [5, 1], [5, 2], [5, 3], [6, 3]],
    direcciones: [90,90,90,120,180],
    aliasConjunto: "fijoAutoArriba",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[5,6]],
    aliasConjunto: "fijoBandera",
    desapareceAlReiniciar: false,
  },
]

miJuego.crearPersonajes(conjuntosDePersonajes);
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
