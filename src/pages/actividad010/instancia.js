import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);
const dimensiones = [8, 10]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const lupe = personajesGaleria.obtenerPersonaje("lupe");
const basura = personajesGaleria.obtenerPersonaje("basura");
const pasto = personajesGaleria.obtenerPersonaje("pasto");
const arbol = personajesGaleria.obtenerPersonaje("arbol");
const bandera = personajesGaleria.obtenerPersonaje("plantaRecicladoraSinFondo");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "basura",
  texto: "¡Quedó todo limpito!.",
  oculto: true,
};

miJuego.generarEscenario(dimensiones, 2.5, "#9ca64e");
miJuego.agregarModal(datosModal);
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [lupe],
    posiciones: [[6, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [arbol],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pasto],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [basura],
    posiciones: [[2,4],[3,3],[5,5],[4,2],[4,6],[3,7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[1, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay basura...");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Ya levantamos la basura de aquí.");
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
  console.log(this.mochila.length);
  if (this.mochila.length === 7) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedo basura por levantar.");
  }
};

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones"])
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["juntar_basura", "Acciones"],
  ["repeat_times", "Repeticiones"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","juntarBasura"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)

