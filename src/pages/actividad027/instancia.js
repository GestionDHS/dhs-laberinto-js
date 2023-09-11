import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import {
  generarCoordenadas,
  configurarYRenderizarToolbox,
} from "../../Utils/Funciones";
import { Dhs_Categorias } from "../../clases/Dhs-categorias";
import { PersonajesAlAzarExcluyente } from "../../clases/StrategyCreacion";

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const panda = personajesGaleria.obtenerPersonaje("panda");
const agua = personajesGaleria.obtenerPersonaje("agua");
const frutilla = personajesGaleria.obtenerPersonaje("frutilla");
const tierra = personajesGaleria.obtenerPersonaje("tierra");
const tierraPasto = personajesGaleria.obtenerPersonaje("tierraPasto");
const nubes = personajesGaleria.obtenerPersonaje("nubes");
const arbol1 = personajesGaleria.obtenerPersonaje("arbol1");
const arbol2 = personajesGaleria.obtenerPersonaje("arbol2");
const arbol3 = personajesGaleria.obtenerPersonaje("arbol3");
const arbol4 = personajesGaleria.obtenerPersonaje("arbol4");
const hamacaNeumatico = personajesGaleria.obtenerPersonaje("hamacaNeumatico");
const arbol5 = personajesGaleria.obtenerPersonaje("arbol5");
const noPersonaje = personajesGaleria.obtenerPersonaje("noPersonaje");
const circuloAmarillo = personajesGaleria.obtenerPersonaje("circuloAmarillo");
const flechaAmarilla = personajesGaleria.obtenerPersonaje("flechaAmarilla");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "caraPanda",
  texto: "¡Objetivo Cumplido!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 3.5, "#375f9e");
miJuego.agregarModal(datosModal);
//fijos,azarRango,azarFijos,azarExcluyente,azarCantTotal,azarCantidadTotalFijos
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [tierra],
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
    personajes: [tierraPasto],
    posiciones: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
    ],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [panda],
    posiciones: [[4, 2]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [circuloAmarillo],
    posiciones: [[4, 2]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [nubes],
    posiciones: [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 5],
      [0, 7],
      [1, 8],
    ],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    //azarExcluyente(hay que pasar, minimo 2 posiciones) - azarFijos
    estrategia: "azarExcluyente",
    personajes: [frutilla, noPersonaje],
    posiciones: [[4, 5]],
    aliasConjunto: "PersonajesAlAzarExcluyente",
    desapareceAlReiniciar: true,
  },
  {
    estrategia: "fijos",
    personajes: [arbol1],
    posiciones: [[2, 7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbol2],
    posiciones: [[2, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbol3],
    posiciones: [[3, 7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbol4],
    posiciones: [[3, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [hamacaNeumatico],
    posiciones: [[4, 7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbol5],
    posiciones: [[4, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
];

miJuego.escenario.iluminarCasilleros([[4,5]],"recuadroLuminoso")
miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[72]);

//Método para detectar
miJuego.personajePrincipal.detectarFrutilla = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("frutilla") !== undefined;
};
miJuego.personajePrincipal.comerFrutilla = function () {
  const intento = this.buscarParaRealizarAccion("frutilla", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay frutilla.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Aqui ya no hay frutilla.");
  } else if (intento.premio?.tipo == "frutilla") {
    return this.decir("¡Mmmm! Qué rica frutilla.");
  }
};

miJuego.personajePrincipal.llegarALaHamaca = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  //console.log(this.mochila[0].tipo) si era un bamboo, la mochila viene vacia,
  //  y si era una frutilla y no se la comio, también viene vacia

  //me fijo en el casillero ver si hay frutilla,si hay y la mochi tiene una frutilla ->gana
  // si no hay frutilla -> gana
  // si hay frutilla y la mochi esta vacia-> muere
  const casilleroAleatoreo =
    miJuego.escenario.objetosCasilleros[4][5].ocupantes.some(
      (p) => p.idHTML == "frutilla"
    );
  if (!casilleroAleatoreo) {
    this.abrirYMostrarModal();
  } else if (this.mochila[0]?.tipo == "frutilla") {
    this.abrirYMostrarModal();
  } else if (this.mochila.length == 0) {
    this.decirTerminar("¡Oh No! Quedó una frutilla sin comer 😟.");
  }
};

// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias();
const categoriaElegida = categoria.obtenerCategoriasNecesarias([
  "Eventos",
  "Movimientos",
  "Acciones",
  "Condicionales",
  "Sensores",
]);
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_left_right_param", "Movimientos"],
  ["comer_frutilla", "Acciones"],
  ["if", "Condicionales"],
  ["sensor_frutilla", "Sensores"],
];

const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = [
  "moverDerecha",
  "moverIzquierda",
  "comerFrutilla",
  "detectarFrutilla",
];

configurarYRenderizarToolbox(
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExponer
);
