import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from "../../clases/Dhs-personajes"
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);
const dimensiones = [3, 7]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
];
let coordenadasCaminoPared = generarCoordenadas(tablero);
const galeriaPersonajes = new Dhs_personajes();
const pared = galeriaPersonajes.obtenerPersonaje("piedra")
const camino = galeriaPersonajes.obtenerPersonaje("caminoCueva")

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 3, "#593006");
miJuego.agregarModal(datosModal);

const minero = galeriaPersonajes.obtenerPersonaje("minero")
const bandera = galeriaPersonajes.obtenerPersonaje("bandera")
const piedraDiamante = galeriaPersonajes.obtenerPersonaje("piedraDiamante")


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
    posiciones: [[1, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[1, 6]],
    aliasConjunto: "fijoBandera",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarFijos",
    personajes: [piedraDiamante],
    // cantidadTotal: 2,
    posiciones: [[1, 1],[1, 2],[1,3],[1,4],[1,5]],
    aliasConjunto: "azarPiedraDiamante",
    desapareceAlReiniciar: true,
  },
]
miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[21]);

//Método para Piedras
miJuego.personajePrincipal.detectarPiedra = function () {
  // devuelve true si encuentra o false si no hay piedra
  return this.buscarObjetoAdelante("piedraDiamante") !== undefined
};
miJuego.personajePrincipal.picarPiedra = function () {
  const intento = this.buscarParaRealizarAccion("piedraDiamante", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay cofre.");
  } else if (!intento.exito) {
    return this.decirTerminar("Oh! Este cofre ya estaba abierto.");
  } else {
    return this.abrirYMostrarModal();
  }
};

// //Método para Juntar Basura
// miJuego.personajePrincipal.juntarBasura = function () {
//   const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
//   if (!intento.objetoEncontrado) {
//     this.decirTerminar("Oh! Aquí no hay basura.");
//   } else if (!intento.exito) {
//     this.decirTerminar("Oh! Hubo un problema al juntar la basura.");
//   }
//   return intento;
// };

// // Lancha
// miJuego.personajePrincipal.llegarPlanta = function () {
//   if (this.mochila.length === 3) {
//     this.abrirYMostrarModal();
//   } else if(!this.intento) {
//     return this.decirTerminar("¡Oh! Quedó basura por levantar.")
//   }
// }

// // Pedro - Lupe
// miJuego.personajePrincipal.llegarEscuela = function () {
//   this.abrirYMostrarModal();
// }

// //Conejo - Nelson
// miJuego.personajePrincipal.cosecharZanahoria = function () {
//   const intento = this.buscarParaRealizarAccion("zanahoria", "abrirse");
//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
//   } else if (!intento.exito) {
//     return this.decirTerminar("¡Oh! Esta zanahoria ya fue cosechada.");
//   } 
// };

// miJuego.personajePrincipal.comerZanahoria = function () {
//   const intento = this.buscarParaRealizarAccion("zanahoria", "serJuntado");
 
//   if (!intento.objetoEncontrado) {
//     return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
//   } else if( intento.estado == "juntado") {
//     return this.decirTerminar("¡Oh! Esta zanahoria ya fue comida.");
//   } else if (!intento.exito ) {
//     return this.decirTerminar("¡Oh! Esta zanahoria aún no fue cosechada.");
//   } 
// };

//Seteo del Dibujo a realizar - Verificación. Para los ejercicios que tienen PersonajesDibujables
// const EJEMPLO_DIBUJO_DESEADO = [
//   [null, null, null, null, null],
//   [null, "#000000", null, "#000000", null],
//   [null, "#000000", null, "#000000", null],
//   [null, null, null, null, null],
// ]
// miJuego.personajePrincipal.dibujoDeseado = EJEMPLO_DIBUJO_DESEADO

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
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida=categoria.obtenerCategoria("mineroCondicional")

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar", "Movimientos"],
  ["picar_piedra", "Acciones"],
  ["if", "Condicionales"],
  ["controls", "Repeticiones"],
  ["sensor_piedra", "Sensores"],
];
const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

const funcionesAExponer=["avanzar", "detectarPiedra", "picarPiedra"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
