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
    posiciones: [[2, 2]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [fuego],
    posiciones: [[2, 3]],
    aliasConjunto: "fijosTablero",
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
//Agregamos la img del agua pero con visibilidad hidden
miJuego.personajePrincipal.setearImagenSecundaria(miJuego.personajePrincipal.estadosPosibles.normal.imagenUrl2)


//Método para detectar
miJuego.personajePrincipal.dispararAgua = function () {
  miJuego.personajePrincipal.mostrarImgSecundaria()
  const fuego=this.buscarObjetoAdelante("fuego")
  fuego.estadoActual == "fuegoCero" && this.decirTerminar("¡Oh! ¡Éste fuego ya esta apagado!")
  fuego.estadoActual == "fuegoUno" && fuego.setearEstado("fuegoCero")
  fuego.estadoActual == "fuegoDos" && fuego.setearEstado("fuegoUno")
  fuego.estadoActual == "fuegoTres" && fuego.setearEstado("fuegoDos")
  fuego.estadoActual == "fuegoCuatro" && fuego.setearEstado("fuegoTres")
};

miJuego.personajePrincipal.detectarFuegoApagado=function(){
  const fuego=this.buscarObjetoAdelante("fuego") 
  fuego.estadoActual == "fuegoCero" && this.abrirYMostrarModal()
  return fuego == undefined || fuego.estadoActual == "fuegoCero"
}

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias()
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Eventos", "Acciones","Repeticiones","Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["disparar_agua", "Acciones"],
  ["repeat_until", "Repeticiones"],
  ["sensor_apagar_fuego", "Sensores"],
];

const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer = ["moverDerecha", "moverIzquierda", "dispararAgua","detectarFuegoApagado"]

configurarYRenderizarToolbox(miControlador, categoriaElegida, ordenJerarquicoBloques, bloquesPrecargadosJSON, funcionesAExponer)
