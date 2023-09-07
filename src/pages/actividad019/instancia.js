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
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
];
const personajesGaleria = new Dhs_personajes();
const coordenadasCaminoPared = generarCoordenadas(tablero)
const pared = personajesGaleria.obtenerPersonaje("juncoPastoDelta");
const camino = personajesGaleria.obtenerPersonaje("agua");
const pato = personajesGaleria.obtenerPersonaje("pato");
const plastico = personajesGaleria.obtenerPersonaje("plastico");
const familiaPato = personajesGaleria.obtenerPersonaje("familiaPato");

const datosModal = {
  titulo: "¡LLEGAMOS!",
  imagen: "rioParana",
  texto: "¿Sabías que el río Paraná tiene 4880 kilómetros de largo?",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, 2.5, "#357fbf");
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
    personajes: [pato],
    posiciones: [[6, 1]],
    direcciones: [90],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [plastico],
    posiciones: [[2, 1],[3,2],[1,4],[4,4],[6,5]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [familiaPato],
    posiciones: [[1, 5]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  
];


miJuego.crearPersonajes(conjuntosDePersonajes)
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);


miJuego.personajePrincipal.llegarALaFamilia = function () {
  this.abrirYMostrarModal();
};


// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
];

const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["avanzar","girarIzquierda","girarDerecha"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
