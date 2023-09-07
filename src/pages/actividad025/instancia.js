import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from "../../clases/Dhs-personajes"
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);
const dimensiones = [5, 7]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];
let coordenadasCaminoPared = generarCoordenadas(tablero);
const galeriaPersonajes = new Dhs_personajes();
const pared = galeriaPersonajes.obtenerPersonaje("piedra")
const camino = galeriaPersonajes.obtenerPersonaje("caminoCueva")
const minero = galeriaPersonajes.obtenerPersonaje("minero")
const bandera = galeriaPersonajes.obtenerPersonaje("bandera")
const piedraDiamante = galeriaPersonajes.obtenerPersonaje("piedraDiamante")

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "piedraDiamante",
  texto: "Llegaste al final de la cueva.",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 3, "#593006");
miJuego.agregarModal(datosModal);



const conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [pared],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [camino],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [minero],
    posiciones: [[2, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[2, 6]],
    aliasConjunto: "fijoBandera",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarCantTotal",
    personajes: [piedraDiamante],
    cantidadTotal: 3,
    aliasConjunto: "azarPiedraDiamante",
    desapareceAlReiniciar: true,
  },
]
miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[35]);

//Método para Piedras
miJuego.personajePrincipal.detectarPiedra = function () {
  // devuelve true si encuentra o false si no hay piedra
  return this.buscarObjetoAdelante("piedraDiamante") !== undefined
};
miJuego.personajePrincipal.picarPiedra = function () {
  const intento = this.buscarParaRealizarAccionAdelante("piedraDiamante", "serJuntado");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay piedra.");
  } else if (!intento.exito) {
    return this.decirTerminar("Oh! Esta piedra ya fue picada.");
  }
};

miJuego.personajePrincipal.llegarALaBandera = function () {
    this.abrirYMostrarModal();
};

//******************************************************* */
//    BLOCKLY
//****************************************************** */

//OCTAVO: Creamos una instancia del controlador, argumentos: el juego, velocidad inicial

//****Si necesitamos que el Workspace tenga bloques precargados, lo que hacemos, para obtener el JSON para setearlo es
//****lo siguiente: 
//****1- hacemos global a miControlador "window.miControlador"
//****2 - En el Navegador, cargamos los bloques que necesitamos ya estén preCargados
//****3 - Ponemos en consola éste linea: JSON.stringify(miControlador.obtenerBloquesSerializados()) para Obtener bloques precargados
//****4 - Nos copiamos el string que nos devuelve, y se lo colocamos a la variable "bloquesPrecargadosJSON"
//****5 - Volvemos a poner "miControlador" como const

// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones","Condicionales","Sensores"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar", "Movimientos"],
  ["picar_piedra", "Acciones"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["sensor_piedra", "Sensores"],
];
const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

const funcionesAExponer=["avanzar", "detectarPiedra", "picarPiedra"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
