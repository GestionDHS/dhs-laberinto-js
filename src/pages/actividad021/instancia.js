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
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1],  
];

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "ecobrick",
  texto: "En esta planta recicladora transformamos los residuos plásticos en LADRILLOS ECOLÓGICOS.",
  oculto: true,
};

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const agua = personajesGaleria.obtenerPersonaje("agua");
const juncoPastoDelta = personajesGaleria.obtenerPersonaje("juncoPastoDelta");
const lancha = personajesGaleria.obtenerPersonaje("lancha");
const plastico = personajesGaleria.obtenerPersonaje("plastico");
const plantaRecicladora = personajesGaleria.obtenerPersonaje("plantaRecicladora");

miJuego.generarEscenario(dimensiones, 2.7, "#357fbf");
miJuego.agregarModal(datosModal);

const conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [juncoPastoDelta],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [agua],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [lancha],
    posiciones: [[0,5]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [plastico],
    posiciones: [[0,1],[3,1],[5,6]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [plantaRecicladora],
    posiciones: [[6,1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
]

miJuego.crearPersonajes(conjuntosDePersonajes);
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
  ["avanzar_param", "Movimientos"],
  ["apuntar_hacia", "Movimientos"],
  ["juntar_basura", "Acciones"],
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
miControlador.juego.agregarGlobalConCallback("juntarBasura");
miControlador.juego.agregarGlobalConCallback("avanzar");
miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
