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
import bambooCieloCamino from "../../img/bambooCieloCamino.png";
import pandaTrepadorSinFondo from "../../img/pandaTrepadorSinFondo.png";

//Bombero con un fuego solo.
//fuego con intensidad aleatorea de 1 a 3
//gana cuando apaga el fuego

document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [5, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const bombero = personajesGaleria.obtenerPersonaje("bombero");
const estacionBomberos = personajesGaleria.obtenerPersonaje("estacionBomberos");
const casilleroBlanco = personajesGaleria.obtenerPersonaje("fondo");
const cielo = personajesGaleria.obtenerPersonaje("cielo");
const nube = personajesGaleria.obtenerPersonaje("nubes");
const pastoCielo = personajesGaleria.obtenerPersonaje("pastoCielo");
const tierra = personajesGaleria.obtenerPersonaje("tierraPasto");
const fuego = personajesGaleria.obtenerPersonaje("fuego");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "fuegoCero",
  texto: "¡Lograste apagar el incendio!",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 3.5, "#375f9e");
miJuego.agregarModal(datosModal);
//fijos,azarRango,azarFijos,azarExcluyente,azarCantTotal,azarCantidadTotalFijos
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [bombero],
    posiciones: [[3, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },

  {
  estrategia: "actividad034",
  personajes: [pastoCielo,fuego,estacionBomberos],
  aliasConjunto: "actividad034",
  desapareceAlReiniciar: true,
  anchoMinimo: 6,//de casilleros donde entraría todo
  anchoMaximo: 8,
  filas: [3],
  desdeColumna: 1, //donde empieza
  cantidadMin:2,
  cantidadMax:3,
  estadoAleatorio: ["fuegoUno", "fuegoDos", "fuegoTres", "fuegoCuatro"],
  desapareceAlReiniciar:true,
},
  {
    estrategia: "fijos",
    personajes: [cielo],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [nube],
    posiciones: [
      [0, 0],
      [0, 2],
      [0, 4],
      [0, 6],
      [0, 8],
    ],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [tierra],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijoTablero",
    desapareceAlReiniciar: false,
  },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
//Agregamos la img del agua pero con visibilidad hidden
miJuego.personajePrincipal.setearImagenSecundaria(
  miJuego.personajePrincipal.estadosPosibles.normal.imagenUrl2
);

//Método para detectar
miJuego.personajePrincipal.dispararAgua = function () {
  //que aparezca el agua
  miJuego.personajePrincipal.mostrarImgSecundaria();
  const fuego = this.buscarObjetoAdelante("fuego");
  fuego.estadoActual == "fuegoCero" &&
    this.decirTerminar("¡Oh! ¡Éste fuego ya esta apagado!");
  fuego.estadoActual == "fuegoUno" && fuego.setearEstado("fuegoCero");
  fuego.estadoActual == "fuegoDos" && fuego.setearEstado("fuegoUno");
  fuego.estadoActual == "fuegoTres" && fuego.setearEstado("fuegoDos");
  fuego.estadoActual == "fuegoCuatro" && fuego.setearEstado("fuegoTres");
};

miJuego.personajePrincipal.detectarFuegoApagado = function () {
  const fuego = this.buscarObjetoAdelante("fuego");
  if (fuego == undefined) {
    this.decirTerminar("¡Aquí no hay fuego!");
  }
  return fuego.estadoActual == "fuegoCero";
};

miJuego.personajePrincipal.detectarEstacionBombero = function () {
  return this.buscarObjetoEnCasilleroActual("estacionBombero") !== undefined;
};

// miJuego.personajePrincipal.terminar = function () {
//   const fueguito=this.buscarObjetoEnCasilleroActual("fuego")
//   if(fueguito.estadoActual!="fuegoCero"){
//     this.estaVivo=false
//     this.juego.puedeDebeContinuar = false;
//   }
// };
miJuego.personajePrincipal.detectarFuego = function () {
  // devuelve true si encuentra o false si no hay piedra
  return this.buscarObjetoAdelante("fuego") !== undefined;
};

miJuego.personajePrincipal.llegarALaEstacionBomberos = function () {
  // const casilleroFuego1 = miJuego.escenario.objetosCasilleros[2][2].ocupantes.some(p=>p.idHTML == "fuego" && p.estadoActual == "fuegoCero")
  // const casilleroFuego2 = miJuego.escenario.objetosCasilleros[2][3].ocupantes.some(p=>p.idHTML == "fuego" && p.estadoActual == "fuegoCero")
  // console.log(casilleroFuego1)
  // console.log(casilleroFuego2)
  // if (casilleroFuego1 && casilleroFuego2) {
  //   this.abrirYMostrarModal();
  // }
  this.abrirYMostrarModal();
};
// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias();
const categoriaElegida = categoria.obtenerCategoriasNecesarias([
  "Eventos",
  "Acciones",
  "Movimientos",
  "Repeticiones",
  "Sensores",
  "Condicionales",
]);

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["disparar_agua", "Acciones"],
  ["move_right_simple", "Movimientos"],
  ["repeat_until", "Repeticiones"],
  ["repeat_times", "Repeticiones"],
  ["sensor_apagar_fuego", "Sensores"],
  ["sensor_estacionBombero", "Sensores"],
  ["sensor_fuego", "Sensores"],
  ["if", "Condicionales"],
];

const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = [
  "moverDerecha",
  "moverIzquierda",
  "dispararAgua",
  "detectarFuegoApagado",
  "detectarFuego",
  "detectarEstacionBombero",
];

configurarYRenderizarToolbox(
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExponer
);
