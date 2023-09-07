import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';
import {PersonajesAlAzarExcluyente} from '../../clases/StrategyCreacion';



document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const panda = personajesGaleria.obtenerPersonaje("panda");
const agua = personajesGaleria.obtenerPersonaje("agua");
const frutilla = personajesGaleria.obtenerPersonaje("frutilla");
const bamboo = personajesGaleria.obtenerPersonaje("bamboo");
const bambooAncho = personajesGaleria.obtenerPersonaje("bambooAncho");
const bambooAnchoCamino = personajesGaleria.obtenerPersonaje("bambooAnchoCamino");
const bambooIzq = personajesGaleria.obtenerPersonaje("bambooIzqHoja");
const bambooDerecho = personajesGaleria.obtenerPersonaje("bambooDerechoHoja");
const nubes = personajesGaleria.obtenerPersonaje("nubes")
const estrella = personajesGaleria.obtenerPersonaje("estrella")

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
    personajes: [bambooAncho],
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
    personajes: [bambooAnchoCamino],
    posiciones: [[4,2],[4,3],[4,4],[4,5],[4,6],[4,7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bambooIzq],
    posiciones: [[2,0],[4,0],[6,0]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bambooDerecho],
    posiciones: [[3,2],[5,2]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [panda],
    posiciones: [[3, 3]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [nubes],
    posiciones: [[0, 1],[1, 2],[0, 3],[1, 5],[0, 7],[1, 8]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  { //azarExcluyente(hay que pasar, minimo 2 posiciones) - azarFijos
    estrategia: "azarExcluyente",
    personajes: [frutilla, bamboo],
    posiciones: [[3, 5]],
    aliasConjunto: "PersonajesAlAzarExcluyente",
    desapareceAlReiniciar: true,
    classCss:"entradaEase"
  },
  {
    estrategia: "fijos",
    personajes: [estrella],
    posiciones: [[3, 7]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[74]);

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
  }else if (intento.premio?.tipo == "frutilla") {
    return this.decir("¡Mmmm! Qué rica frutilla.",2000);
  }

};

miJuego.personajePrincipal.detectarBamboo = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("bamboo") !== undefined
};
miJuego.personajePrincipal.comerBamboo = function () {
  const intento = this.buscarParaRealizarAccion("bamboo", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay bambú.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Aqui ya no hay bambú.");
  }else if (intento.premio?.tipo == "bamboo") {
    return this.decir("¡Mmmm! Qué rica rama de bambú.",2000);
  }

};

miJuego.personajePrincipal.llegarALaEstrella = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  //console.log(this.mochila[0].tipo) si era un bamboo, la mochila viene vacia,
  //  y si era una frutilla y no se la comio, también viene vacia
  const casilleroAleatoreoFrutilla = miJuego.escenario.objetosCasilleros[3][5].ocupantes.some(p=>p.idHTML == "frutilla")
  if(casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "frutilla"){
    this.abrirYMostrarModal();
  }
  if(casilleroAleatoreoFrutilla && this.mochila.length == 0){
    this.decirTerminar("¡Oh No! Quedó una frutilla sin comer 😟.")
  }
  if(!casilleroAleatoreoFrutilla && this.mochila[0]?.tipo == "bamboo"){
    this.abrirYMostrarModal();
  }else{
    this.decirTerminar("¡Oh No! Quedó un bambú sin comer 😟.");
  }
};

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Condicionales","Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_left_right_param", "Movimientos"],
  ["comer_frutilla", "Acciones"],
  ["comer_bamboo", "Acciones"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
  ["sensor_frutilla", "Sensores"],
  ["sensor_bamboo", "Sensores"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverIzquierda","comerFrutilla","comerBamboo","detectarFrutilla","detectarBamboo"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
