import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {
  generarCoordenadas,
  configurarYRenderizarToolbox,
} from "../../Utils/Funciones";
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import { Dhs_Categorias } from "../../clases/Dhs-categorias";

document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego y setear velocidad
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

//SEGUNDO: CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO, se crea la variable dimensiónes.
const dimensiones = [9, 3]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
];

//TERCERO: Definir que objetos van a ser "pared", y cuales "camino"
const personajesGaleria = new Dhs_personajes();
const pared = personajesGaleria.obtenerPersonaje("arbol");
const camino = personajesGaleria.obtenerPersonaje("pasto");

//CUARTO: Setear Modal de Ganar
const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};

// QUINTO:Para generar el escenario recibe como parametros: dimensiones, el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa "em") el color de borde ...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, 3, "black");
miJuego.agregarModal(datosModal);
let coordenadasCaminoPared = generarCoordenadas(tablero);

//SEXTO: Definir los Objetos Personajes
//Configurar en el caso del personaje princilal la clasePersonaje : PersonajeBasico / PersonajeMovibleSimple / PersonajeMovibleGrados / PersonajeDibujante
//instanciamos y configuramos su posicionamiento a cada personajes necesarios para el juego
//Configurar si o si el posicionamiento

const lupe = personajesGaleria.obtenerPersonaje("lupe");
const cofre = personajesGaleria.obtenerPersonaje("cofre");
const bandera = personajesGaleria.obtenerPersonaje("bandera");
const lodo = personajesGaleria.obtenerPersonaje("lodo");
const basura = personajesGaleria.obtenerPersonaje("basura");

//SEPTIMO: Generar y setear los Personajes - seteo el PersonajePrincipal y sus funciones
let conjuntosDePersonajes = [
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
    personajes: [lupe],
    posiciones: [[1, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "azarCantidadTotalFijos",
    personajes: [cofre],
    cantidadTotal:3,
    posiciones: [[2,1],[3,1],[4,1],[5,1],[6,1]],
    aliasConjunto: "azarCantidadTotalFijos",
    desapareceAlReiniciar: true,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[7, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  // {
  //   estrategia: "azarRango",
  //   personajes: [lodo, cofre],
  //   cantidadMin: 1,
  //   cantidadMax: 3,
  //   aliasConjunto: "azarRango",
  //   desapareceAlReiniciar: true,
  // },
  // {
  //   estrategia: "azarRangoFijos",
  //   personajes: [lodo, cofre],
  //   cantidadMin: 1,
  //   cantidadMax: 3,
  //   posiciones: [[2, 1],[3, 1],[4, 1],[5, 1]],
  //   aliasConjunto: "azarRangoFijos",
  //   desapareceAlReiniciar: true,
  // },
  //  {
  //   estrategia: "azarFijos",
  //   personajes: [lodo, cofre],
  //   posiciones: [[2, 1],[1, 2]],
  //   aliasConjunto: "azarFijos",
  //   desapareceAlReiniciar: true,
  // },
  //   {
  //     estrategia: "azarExcluyente",
  //    personajes: [lodo,cofre],
  //    posiciones: [[2, 1]],
  //    aliasConjunto: "azarExcluyente",
  //    desapareceAlReiniciar: true,
  //  },
  //   {
  //     estrategia: "posicionExcluyente",
  //    personajes: [lodo,cofre],
  //    posiciones: [[2, 1],[1, 2]],
  //    aliasConjunto: "posicionExcluyente",
  //    desapareceAlReiniciar: true,
  //  },
  //   {
  //    estrategia: "azarCantTotal",
  //   personajes: [basura,lodo],
  //   cantidadTotal: 2,
  //   aliasConjunto: "azarCantTotal",
  //   desapareceAlReiniciar: true,
  // },
  //   {
  //   estrategia: "azarCantidadTotalFijos",
  //   personajes: [lodo, cofre],
  //   cantidadTotal: 2,
  //   posiciones: [[2, 1],[3, 1],[4, 1],[5, 1]],
  //   aliasConjunto: "azarCantidadTotalFijos",
  //   desapareceAlReiniciar: true,
  // },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
//// Se debe mirar el arrayDePersonajes para saber en que posición esta el personaje principal
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[27]);

//Método para el Cofre
miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay cofre.");
  } else if (!intento.exito) {
    return this.decirTerminar("Oh! Este cofre ya estaba abierto.");
  }
};

miJuego.personajePrincipal.detectarCofre = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("cofre") !== undefined
};

miJuego.personajePrincipal.detectarBandera = function () {
  // devuelve true si encuentra o false si no hay bandera
  return this.buscarObjetoEnCasilleroActual("bandera") !== undefined
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
miJuego.personajePrincipal.llegarALaBandera = function () {
  //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
  if (this.mochila.length >= 3) {
    this.abrirYMostrarModal();
  } else {
    return this.decirTerminar("¡Oh! Quedaron cofres sin abrir.");
  }
};

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
window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria = new Dhs_Categorias();
const categoriaElegida = categoria.obtenerCategoriasNecesarias([
  "Eventos",
  "Movimientos",
  "Acciones",
  "Repeticiones",
  "Condicionales",
  "Sensores",
]);

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["repeat_until", "Repeticiones"],
  ["repeat_while", "Repeticiones"],
  ["sensor_cofre", "Sensores"], 
  ["sensor_bandera", "Sensores"],
];

// const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const bloquesPrecargadosJSON = '{ "blocks": { "languageVersion": 0, "blocks": [ { "type": "on_execute", "id": "rwW]g?!-iwJNk))r*~^C", "x": 61, "y": 69, "inputs": { "EVENT": { "block": { "type": "repeat_until", "id": "ESTMctZ21tULm}9}6=`/", "inputs": { "condicion": { "block": { "type": "sensor_bandera", "id": "y-]*geVR`[NPdKWgw?qq" } }, "accionesARepetir": { "block": { "type": "move_down_simple", "id": "PZl/2A1}IC+qu2R,6qK0", "next": { "block": { "type": "if", "id": "Iukc+WZWUCe[6b9-v;MC", "inputs": { "condicion": { "block": { "type": "sensor_cofre", "id": "7:pp?;m6U}^9xIgxUpof" } }, "entonces": { "block": { "type": "abrir_cofre", "id": "s^,J)kRBoD$vIU,9$VQt" } } } } } } } } } } } } ] } }'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre","detectarCofre","detectarBandera"]

configurarYRenderizarToolbox(
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExponer
);
