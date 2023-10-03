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
const rutina = personajesGaleria.obtenerPersonaje("rutina");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "escuelaSendero",
  texto: "¡Objetivo Cumplido!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 15, "white");
// document.getElementById("elemento-escenario").lastChild.style.marginLeft = "-30px"

miJuego.agregarModal(datosModal);
//fijos,azarRango,azarFijos,azarExcluyente,azarCantTotal,azarCantidadTotalFijos
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [rutina],
    posiciones: [[0, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
];

// document.querySelector(".juego-escenario").style.paddingRight = "100px"

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
miJuego.personajePrincipal.objetivosLogrados = [];

miJuego.personajePrincipal.levantarseDeLaCama = function () {
  //si levantarse ya esta en objetivosLogrados -> morirDecir ya me levante
  let accion = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "levantarme de la cama")
  if (accion) {
    return this.decirTerminar("Ya me levanté de la cama.");
  } else if (this.estadoActual == "enLaCama") {
    //else Si el estadoActual es en la cama pasa al estado levantandose y pushear levantarse a objetivosLogrados
    this.setearEstado("levantandose")
    miJuego.personajePrincipal.objetivosLogrados.push("levantarme de la cama")
  } else {
    //else morirDecir ya me levante
    return this.decirTerminar("Ya me levanté de la cama.");
  }
};

miJuego.personajePrincipal.desayunar = function () {
  let accionA = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "levantarme de la cama")
  if (accionA) {
    let accionB = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "desayunar")
    if(!accionB){
      this.setearEstado("desayunando")
      miJuego.personajePrincipal.objetivosLogrados.push("desayunar")
    } else {
      return this.decirTerminar("Ya desayuné.");
    }
  } else {
    return this.decirTerminar("No puedo desayunar porque aún no me levanté de la cama.");
  }
};

miJuego.personajePrincipal.cepillarseLosDientes = function () {
  let accionA = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "levantarme de la cama")
  if (accionA) {
    let accionB = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "cepillarme los dientes")
    if(!accionB){
      this.setearEstado("cepillandose")
      miJuego.personajePrincipal.objetivosLogrados.push("cepillarme los dientes")
    } else {
      return this.decirTerminar("Ya me cepillé los dientes.");
    }
  } else {
    return this.decirTerminar("No puedo cepillarme los dientes porque aún no me levanté de la cama.");
  }
};

miJuego.personajePrincipal.lavarseLaCara = function () {
  let accionA = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "levantarme de la cama")
  if (accionA) {
    let accionB = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "lavarme la cara")
    if(!accionB){
      this.setearEstado("lavandose")
      miJuego.personajePrincipal.objetivosLogrados.push("lavarme la cara")
    } else {
      return this.decirTerminar("Ya me lavé la cara.");
    }
  } else {
    return this.decirTerminar("No puedo lavarme la cara porque aún no me levanté de la cama.");
  }
};

miJuego.personajePrincipal.vestirse = function () {
  let accionA = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "levantarme de la cama")
  if (accionA) {
    let accionB = miJuego.personajePrincipal.objetivosLogrados.find(o=>o == "vestirme")
    if(!accionB){
      this.setearEstado("vistiendose")
      miJuego.personajePrincipal.objetivosLogrados.push("vestirme")
    } else {
      return this.decirTerminar("Ya me vestí.");
    }
  } else {
    return this.decirTerminar("No puedo vestirme porque aún no me levanté de la cama.");
  }
};

miJuego.personajePrincipal.salirDeCasa = function () {
  //chequear que elementos de array esten en array
  const accionesCopia = new Set(miJuego.personajePrincipal.objetivosLogrados)
  const elementosUnicos = ["levantarme de la cama", "desayunar", "cepillarme los dientes", "lavarme la cara", "vestirme"]
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
    this.setearEstado("saliendo")
    this.abrirYMostrarModal(); 
    miJuego.personajePrincipal.objetivosLogrados = [];
  } else {
    miJuego.personajePrincipal.objetivosLogrados = [];
    return this.decirTerminar("No puedo salir de casa aún. Me falta: " + resultado.elementosFaltantes.join(","));
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
  ["levantarseDeLaCama", "Acciones"],
  ["salirDeCasa", "Acciones"],
  ["vestirse", "Acciones"],
  ["lavarseLaCara", "Acciones"],
  ["cepillarseLosDientes", "Acciones"],
  ["desayunar", "Acciones"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["levantarseDeLaCama", "salirDeCasa", "desayunar", "vestirse", "lavarseLaCara", "cepillarseLosDientes"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)
