import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_personajes } from '../../clases/Dhs-personajes';
import { generarCoordenadas, configurarYRenderizarToolbox } from '../../Utils/Funciones';
import { Dhs_Categorias } from '../../clases/Dhs-categorias';
import { PersonajesAlAzarExcluyente } from '../../clases/StrategyCreacion';

//Bombero en una fila, con escenario aleatorio y fuegos aleatorios
//gana cuando llega a la estacion de bomberos

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [1, 1]; //fila, columna

const tablero = [
  [0],
];

const personajesGaleria = new Dhs_personajes();
const plantarSemilla = personajesGaleria.obtenerPersonaje("plantarSemilla");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "good",
  texto: "¡Objetivo Cumplido!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 15, "white");

miJuego.agregarModal(datosModal);
//fijos,azarRango,azarFijos,azarExcluyente,azarCantTotal,azarCantidadTotalFijos
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [plantarSemilla],
    posiciones: [[0, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
];


miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
miJuego.personajePrincipal.objetivosLogrados = [];

miJuego.personajePrincipal.ponerMaceta = function () {
  if (this.estadoActual == "fondoGris") {
    this.setearEstado("ponerMaceta")
    miJuego.personajePrincipal.objetivosLogrados.push("poner la maceta")
  } else {
    return this.decirTerminar("Ya puse la maceta.");
  }
};

miJuego.personajePrincipal.ponerTierra = function () {
  if (this.estadoActual == "ponerTierra") {
    return this.decirTerminar("Ya puse tierra en la maceta.");
  }
  if (this.estadoActual == "ponerMaceta") {
      this.setearEstado("ponerTierra")
      miJuego.personajePrincipal.objetivosLogrados.push("poner la tierra")
  } else {
    return this.decirTerminar("No puedo poner la tierra porque aún no puse una maceta.");
  }
};

miJuego.personajePrincipal.hacerHueco = function () {
  if (this.estadoActual == "hacerHueco") {
    return this.decirTerminar("Ya hice un hueco en la tierra.");
  }
  if (this.estadoActual == "ponerTierra") {
      this.setearEstado("hacerHueco")
      miJuego.personajePrincipal.objetivosLogrados.push("hacer un hueco")
  } else {
    return this.decirTerminar("No puedo hacer el hueco en la tierra porque aún no puse la tierra.");
  }
};

miJuego.personajePrincipal.ponerSemilla = function () {
  if (this.estadoActual == "ponerSemilla") {
    return this.decirTerminar("Ya puse la semilla en el hueco.");
  }
  if (this.estadoActual == "hacerHueco") {
      this.setearEstado("ponerSemilla")
      miJuego.personajePrincipal.objetivosLogrados.push("poner la semilla")
  } else {
    return this.decirTerminar("No puedo poner la semilla porque aún no hice el hueco en la tierra.");
  }
};

miJuego.personajePrincipal.taparConTierra = function () {
  if (this.estadoActual == "taparConTierra") {
    return this.decirTerminar("Ya tapé con tierra la semilla.");
  }
  if (this.estadoActual == "ponerSemilla") {
      this.setearEstado("taparConTierra")
      miJuego.personajePrincipal.objetivosLogrados.push("tapar con tierra")
  } else {
    return this.decirTerminar("No puedo tapar con tierra la semilla porque aún no puse la semilla.");
  }
};

miJuego.personajePrincipal.regar = function () {
  if (this.estadoActual == "taparConTierra") {
    this.setearEstado("regar")
    miJuego.personajePrincipal.objetivosLogrados.push("regar")
  } 
  //chequear que elementos de array esten en array
  const accionesCopia = new Set(miJuego.personajePrincipal.objetivosLogrados)
  const elementosUnicos = ["poner la maceta", "poner la tierra", "hacer un hueco", "poner la semilla", "tapar con tierra", "regar"]
  const elementosFaltantes = [];
  let resultado;

  for (let elemento of elementosUnicos) {
    if (!accionesCopia.has(elemento)) {
      elementosFaltantes.push(elemento);
    }
  }

  if (elementosFaltantes.length === 0) {
    resultado = { todosPresentes: true };
  } else {
    resultado = { todosPresentes: false, elementosFaltantes };
  }

  if (resultado.todosPresentes === true) {
    //si true mostrarModal
    this.abrirYMostrarModal();
  } else {
    //else morirDecir y detectar que falto y marcarlo en el mensaje
    return this.decirTerminar("No puedo regar la planta aún. Me falta: " + resultado.elementosFaltantes.join(","));
  }
};


let tooltip = miJuego.personajePrincipal.controladorDOM.elementoHTML.querySelector("div.tooltiptext");
tooltip.style.right = "0";
tooltip.style.top = "-50px";
tooltip.style.maxWidth = "100%"
tooltip.style.width = "100%"
tooltip.style.fontSize = "16px"


// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias()
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Eventos", "Acciones"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["taparConTierra", "Acciones"],
  ["ponerTierra", "Acciones"],
  ["regar", "Acciones"],
  ["hacerHueco", "Acciones"],
  ["ponerSemilla", "Acciones"],
  ["ponerMaceta", "Acciones"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["ponerMaceta","ponerTierra","hacerHueco","ponerSemilla","taparConTierra", "regar"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)
