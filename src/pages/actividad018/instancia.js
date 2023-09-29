import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [9, 9]; //fila, columna

const tablero = [
  [1, 0, 1, 0, 0, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 0, 0],
  
];

const personajesGaleria = new Dhs_personajes();
const coordenadasCaminoPared = generarCoordenadas(tablero)
const camino = personajesGaleria.obtenerPersonaje("calle");
const pared = personajesGaleria.obtenerPersonaje("edificiosSendero");
const ciclista = personajesGaleria.obtenerPersonaje("ciclista");
const barrera = personajesGaleria.obtenerPersonaje("barrera");
const casaSendero = personajesGaleria.obtenerPersonaje("casaSendero");
const pastoSendero = personajesGaleria.obtenerPersonaje("pastoSendero");
const arbolesSendero = personajesGaleria.obtenerPersonaje("arbolesSendero");
const autoEmbotelladoIzq = personajesGaleria.obtenerPersonaje("autoEmbotelladoIzq");
const autoEmbotelladoDer = personajesGaleria.obtenerPersonaje("autoEmbotelladoDer");
const escuelaSendero = personajesGaleria.obtenerPersonaje("escuelaSendero");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "ciclista",
  texto: "¡Pedro llegó a la escuela a tiempo para su clase de inglés!",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, 2.5, "#a0a0a0");
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
    personajes: [ciclista],
    posiciones: [[7,1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [barrera],
    posiciones: [[2,1]],
    aliasConjunto: "fijoBarrera",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [casaSendero],
    posiciones: [[8,1]],
    aliasConjunto: "fijoCasaSendero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pastoSendero],
    posiciones: [[7,5],[7,6],[7,7],[6,7],[5,7]],
    aliasConjunto: "fijoPastoSendero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbolesSendero],
    posiciones: [[8,5],[8,6],[8,7],[8,8],[7,8],[6,8],[5,8],[6,6],[5,6],[6,5],[5,5]],
    aliasConjunto: "fijoArboles",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [autoEmbotelladoIzq],
    posiciones: [[3,0],[3,2],[3,3],[3,5],[3,6],[3,8]],
    aliasConjunto: "fijoAutosIzq",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [autoEmbotelladoDer],
    posiciones: [[4,0],[4,2],[4,3],[4,5],[4,6],[4,8]],
    aliasConjunto: "fijoAutosDer",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [escuelaSendero],
    posiciones: [[0,3]],
    aliasConjunto: "fijoEscuelaSendero",
    desapareceAlReiniciar: false,
  },

];

miJuego.crearPersonajes(conjuntosDePersonajes)
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[81]);

miJuego.personajePrincipal.llegarEscuela = function () {
    this.abrirYMostrarModal();
}

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_param", "Movimientos"],
];
const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
