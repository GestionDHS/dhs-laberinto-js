import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_personajes } from '../../clases/Dhs-personajes';
import { generarCoordenadas, configurarYRenderizarToolbox } from '../../Utils/Funciones';
import { Dhs_Categorias } from '../../clases/Dhs-categorias';
import { PersonajesAlAzarExcluyente } from '../../clases/StrategyCreacion';


//El Panda en una linea, coma frutilla aleatorea y gane.
//usar repetir hasta que.

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [5, 7]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const panda = personajesGaleria.obtenerPersonaje("panda");
const cielo = personajesGaleria.obtenerPersonaje("cielo");
const pastoCielo = personajesGaleria.obtenerPersonaje("pastoCielo");
const frutilla = personajesGaleria.obtenerPersonaje("frutilla");
frutilla.paddingImagen = "10px"
const tierra = personajesGaleria.obtenerPersonaje("tierraPasto");
const nube = personajesGaleria.obtenerPersonaje("nubes");

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
    personajes: [panda],
    posiciones: [[3, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [cielo],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [nube],
    posiciones: [[0, 0],[0, 2],[0, 4],[0, 6],[1, 1],[1, 3],[1, 5],[1, 7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pastoCielo],
    posiciones: [[3, 0], [3, 1],[3, 2], [3, 3], [3, 4], [3, 5], [3, 6]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarRangoFijos",
    personajes: [frutilla],
    posiciones: [[3, 2],[3, 3],[3, 4],[3, 5]],
    cantidadMax:1,
    cantidadMin:1,
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: true,
  },
  {
    estrategia: "fijos",
    personajes: [tierra],
    posiciones: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
//miJuego.personajePrincipal.setearEstado("trepando")

//Método para detectar
miJuego.personajePrincipal.detectarFrutilla = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("frutilla") !== undefined
};


miJuego.personajePrincipal.comerFrutilla = function () {
  const intento = this.buscarParaRealizarAccion("frutilla", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay frutilla.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Aqui ya no hay frutilla.");
  } else if (intento.premio?.tipo == "frutilla") {
   this.decir("¡Mmmm! Qué rica frutilla.", 2000);
   this.abrirYMostrarModal()
  }

};

miJuego.personajePrincipal.moverDerecha = function (veces = 1) {
  this.setearEstado("derecha")
  return this.iterarVectorMovimiento(veces, [0, +1]);
}

miJuego.personajePrincipal.moverIzquierda = function (veces = 1) {
  this.setearEstado("izquierda")
  return this.iterarVectorMovimiento(veces, [0, -1]);
}



miJuego.personajePrincipal.moverAbajo = function (veces = 1) {
  if (this.buscarObjetoAdelante("tierra")!= undefined || this.buscarObjetoAdelante("pastoCielo")!= undefined || this.buscarObjetoAdelante("bambooAnchoCamino")!= undefined || this.buscarObjetoAdelante("frutilla")!= undefined ||this.buscarObjetoAdelante("bambooAncho")!= undefined) {
    this.setearEstado("trepando")
    return miJuego.personajePrincipal.iterarVectorMovimiento(veces, [1, 0]);
  } else {
    this.decirTerminar("¡Por aquí no puedo bajar!")
  }
}



// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias()
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Eventos", "Movimientos", "Acciones", "Repeticiones", "Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_sinUp_simple", "Movimientos"],
  ["comer_frutilla", "Acciones"],
  ["repeat_until", "Repeticiones"],
  ["sensor_frutilla", "Sensores"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["moverDerecha", "moverIzquierda", "moverAbajo", "comerFrutilla", "detectarFrutilla"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)
