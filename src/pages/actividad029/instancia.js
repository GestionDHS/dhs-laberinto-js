import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_personajes } from '../../clases/Dhs-personajes';
import { generarCoordenadas, configurarYRenderizarToolbox } from '../../Utils/Funciones';
import { Dhs_Categorias } from '../../clases/Dhs-categorias';
import { PersonajesAlAzarExcluyente } from '../../clases/StrategyCreacion';
import bambooCieloCamino from '../../img/bambooCieloCamino.png';
import pandaTrepadorSinFondo from '../../img/pandaTrepadorSinFondo.png';



document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const panda = personajesGaleria.obtenerPersonaje("panda");
//panda.paddingImagen = "5px"
const cielo = personajesGaleria.obtenerPersonaje("cielo");
const pastoCielo = personajesGaleria.obtenerPersonaje("pastoCielo");
const frutilla = personajesGaleria.obtenerPersonaje("frutilla");
frutilla.paddingImagen = "10px"
const bambooAncho = personajesGaleria.obtenerPersonaje("bambooAncho");
const bambooAnchoCamino = personajesGaleria.obtenerPersonaje("bambooCieloCamino");
const bambooIzq = personajesGaleria.obtenerPersonaje("bambooIzqHoja");
const tierra = personajesGaleria.obtenerPersonaje("tierraPasto");
const estrella = personajesGaleria.obtenerPersonaje("estrella");

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
    posiciones: [[5, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [cielo],
    posiciones: [[0, 0], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pastoCielo],
    posiciones: [[5, 0], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [estrella],
    posiciones: [[0, 1]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bambooIzq],
    posiciones: [[4, 0], [2, 0]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bambooAncho],
    posiciones: [[5, 1]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "filasAleatoriasSimples",
    personajes: [bambooAncho, bambooAnchoCamino, frutilla, cielo],
    aliasConjunto: "filasAleatoriasSimples",
    desapareceAlReiniciar: true,
    anchoMinimo: 3,
    anchoMaximo: 6, // Warning no exceda el tablero.
    filas: [1, 2, 3, 4],
    desdeColumna: 1,
  },
  {
    estrategia: "fijos",
    personajes: [tierra],
    posiciones: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8]],
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
miJuego.personajePrincipal.detectarTronco = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("bambooAncho") !== undefined
};

miJuego.personajePrincipal.comerFrutilla = function () {
  const intento = this.buscarParaRealizarAccion("frutilla", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay frutilla.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Aqui ya no hay frutilla.");
  } else if (intento.premio?.tipo == "frutilla") {
    return this.decir("¡Mmmm! Qué rica frutilla.", 2000);
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


miJuego.personajePrincipal.moverArriba = function (veces = 1) {
  this.setearEstado("trepando")
  if (this.buscarObjetoEnCasilleroActual("bambooAncho") != undefined) {
    return miJuego.personajePrincipal.iterarVectorMovimiento(veces, [-1, 0]);
  }else{
    return miJuego.personajePrincipal.decirTerminar("Por aquí no puedo trepar")
  }

}

miJuego.personajePrincipal.moverAbajo = function (veces = 1) {
  if (this.buscarObjetoAdelante("tierra")!= undefined || this.buscarObjetoAdelante("pastoCielo")!= undefined || this.buscarObjetoAdelante("bambooAnchoCamino")!= undefined || this.buscarObjetoAdelante("frutilla")!= undefined ||this.buscarObjetoAdelante("bambooAncho")!= undefined) {
    this.setearEstado("trepando")
    return miJuego.personajePrincipal.iterarVectorMovimiento(veces, [1, 0]);
  } else {
    this.decirTerminar("¡Por aquí no puedo bajar!")
  }
}

miJuego.personajePrincipal.llegarALaEstrella = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  //console.log(this.mochila[0].tipo) si era un bamboo, la mochila viene vacia,
  //  y si era una frutilla y no se la comio, también viene vacia

  if (this.mochila?.length == 4) {
    this.abrirYMostrarModal();
  } else {
    this.decirTerminar("¡Oh No! Quedaron frutillas sin comer 😟.")
  }
  // const casilleroAleatoreoFrutilla = miJuego.escenario.objetosCasilleros[3][5].ocupantes.some(p=>p.idHTML == "frutilla")
  // if(casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "frutilla"){
  //   this.abrirYMostrarModal();
  // }
  // if(casilleroAleatoreoFrutilla && this.mochila.length == 0){
  //   this.decirTerminar("¡Oh No! Quedó una frutilla sin comer 😟.")
  // }
  // if(!casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "bamboo"){
  //   this.abrirYMostrarModal();
  // }else{
  //   this.decirTerminar("¡Oh No! Quedó un bambú sin comer 😟.");
  // }
};

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias()
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Eventos", "Movimientos", "Acciones", "Repeticiones", "Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_trepar_simple", "Movimientos"],
  ["move_sinUp_simple", "Movimientos"],
  ["comer_frutilla", "Acciones"],
  ["repeat_times", "Repeticiones"],
  ["repeat_until", "Repeticiones"],
  ["sensor_frutilla", "Sensores"],
  ["sensor_tronco", "Sensores"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["moverDerecha", "moverIzquierda", "moverArriba", "moverAbajo", "comerFrutilla", "detectarFrutilla", "detectarTronco"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)
