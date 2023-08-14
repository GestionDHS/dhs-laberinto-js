import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';


document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [10, 9]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
]

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const agua = personajesGaleria.obtenerPersonaje("agua");
const pajaro = personajesGaleria.obtenerPersonaje("pajaro");
const avion = personajesGaleria.obtenerPersonaje("avion");
const nubesCielo = personajesGaleria.obtenerPersonaje("nubesCielo")
const isla=personajesGaleria.obtenerPersonaje("isla")

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "pajaro",
  texto: "Lograste esquivar los aviones y emigrar a tiempo!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 2.5, "#9ca64e");
miJuego.agregarModal(datosModal);

let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [nubesCielo],
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
    personajes: [pajaro],
    posiciones: [[0, 4]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [isla],
    posiciones: [[8,7]],
    aliasConjunto: "fijos",
    desapareceAlReiniciar: false,
  },
  {
   estrategia: "posicionExcluyente",
   personajes: [avion],
   posiciones:[[8,5],[6,7]],
   aliasConjunto: "posicionExcluyente",
   desapareceAlReiniciar: true,
 },

];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[90]);

miJuego.personajePrincipal.llegarALaBandera = function () {
    this.abrirYMostrarModal();
};
//Método para Piedras
miJuego.personajePrincipal.detectarAvion = function () {
  // devuelve true si encuentra o false si no hay piedra
  return this.buscarObjetoAdelante("avion") !== undefined
};


miJuego.personajePrincipal.llegarALaIsla = function () {
    this.abrirYMostrarModal();
};

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida=categoria.obtenerCategoria("pajaro")

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["controls", "Repeticiones"],
  ["if", "Condicionales"],
  ["sensor_avion", "Sensores"],
];
const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

const funcionesAExponer=["avanzar", "detectarAvion","girarIzquierda","girarDerecha","apuntarEnDireccion","girarGrados" ]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
