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
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [10, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const lupe = personajesGaleria.obtenerPersonaje("lupe");
const cofre = personajesGaleria.obtenerPersonaje("cofre");
const pasto = personajesGaleria.obtenerPersonaje("pasto");
const arbol = personajesGaleria.obtenerPersonaje("arbol");
const bandera = personajesGaleria.obtenerPersonaje("bandera");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Juntaste todas las monedas de los cofres!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 2.5, "#9ca64e");
miJuego.agregarModal(datosModal);

let conjuntosDePersonajes = [
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
    personajes: [lupe],
    posiciones: [[1, 4]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarCantidadTotalFijos",
    personajes: [cofre],
    cantidadTotal:3,
    posiciones: [[2,4],[3,4],[4,4],[5,4],[6,4]],
    aliasConjunto: "azarCantidadTotalFijos",
    desapareceAlReiniciar: true,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[8, 4]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[90]);

//Método para Cofre
miJuego.personajePrincipal.detectarCofre = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("cofre") !== undefined
};
miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay cofre.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.");
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  if (this.mochila.length >= 2) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedaron cofres sin abrir.");
  }
};

// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones","Condicionales","Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["if", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["sensor_cofre", "Sensores"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre","detectarCofre"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
