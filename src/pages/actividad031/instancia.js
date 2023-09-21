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

//Bombero con un fuego solo.
//fuego con intensidad aleatorea de 1 a 3
//gana cuando apaga el fuego 

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [4, 6]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const bombero = personajesGaleria.obtenerPersonaje("bombero");
//panda.paddingImagen = "5px"
const cielo = personajesGaleria.obtenerPersonaje("cielo");
const nube = personajesGaleria.obtenerPersonaje("nubes");
const pastoCielo = personajesGaleria.obtenerPersonaje("pastoCielo");
const tierra = personajesGaleria.obtenerPersonaje("tierraPasto");
const fuegoCuatro = personajesGaleria.obtenerPersonaje("fuegoCuatro");

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
    personajes: [bombero],
    posiciones: [[2, 2]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [fuegoCuatro],
    posiciones: [[2, 3]],
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
    posiciones: [[0, 0],[0, 2],[0, 4]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pastoCielo],
    posiciones: [[2, 0],[2, 1], [2, 2], [2, 3], [2, 4], [2, 5]],
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [tierra],
    posiciones: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
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
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Eventos", "Movimientos", "Acciones", "Condicionales", "Repeticiones", "Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_trepar_simple", "Movimientos"],
  ["move_sinUp_simple", "Movimientos"],
  ["comer_frutilla", "Acciones"],
  ["if", "Condicionales"],
  // ["ifElse", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["repeat_until", "Repeticiones"],
  ["sensor_frutilla", "Sensores"],
  ["sensor_tronco", "Sensores"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["moverDerecha", "moverIzquierda", "moverArriba", "moverAbajo", "comerFrutilla", "detectarFrutilla", "detectarTronco"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)