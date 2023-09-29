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

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const conejo = personajesGaleria.obtenerPersonaje("conejo");
const zanahoria = personajesGaleria.obtenerPersonaje("zanahoria");
const pasto = personajesGaleria.obtenerPersonaje("pasto");
const arbol = personajesGaleria.obtenerPersonaje("arbol");
const madriguera = personajesGaleria.obtenerPersonaje("madriguera");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "conejo",
  texto: "Te comiste todas las zanahorias y llegaste a la madriguera!",
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
    personajes: [conejo],
    posiciones: [[3, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [madriguera],
    posiciones: [[3, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarCantidadTotalFijos",
    personajes: [zanahoria],
    cantidadTotal:3,
    posiciones: [[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]],
    aliasConjunto: "azarFijos",
    desapareceAlReiniciar: true,
  },
];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[63]);

//Método para Cofre
miJuego.personajePrincipal.detectarZanahoria = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("zanahoria") !== undefined
};

miJuego.personajePrincipal.cosecharZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Esta zanahoria ya fue cosechada.");
  }
};

miJuego.personajePrincipal.comerZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "serJuntado");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if (!intento.exito) {
    if (intento.estadoPrevio == "juntado") {
      return this.decirTerminar("¡Oh! Esta zanahoria ya fue comida.");
    } else if (intento.estadoPrevio == "cerrado") {
      return this.decirTerminar("¡Oh! Esta zanahoria aún no fue cosechada.");
    }
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
  console.log(this.mochila)
  if (this.mochila.length === 6) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedaron zanahorias en el tablero.");
  }
};
// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida=categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones","Condicionales","Sensores"])
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["cosechar", "Acciones"],
  ["comer", "Acciones"],
  ["repeat_times", "Repeticiones"],
  ["if","Condicionales"],
  ["ifElse","Condicionales"],
  ["sensor_zanahoria","Sensores"]
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["cosecharZanahoria","comerZanahoria","avanzar","girarIzquierda","girarDerecha","detectarZanahoria"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
