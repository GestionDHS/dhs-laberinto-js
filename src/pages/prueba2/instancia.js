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
const dimensiones = [3, 9]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
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

const minero = personajesGaleria.obtenerPersonaje("minero");
const piedraDiamante = personajesGaleria.obtenerPersonaje("piedraDiamante");
const bandera = personajesGaleria.obtenerPersonaje("bandera");

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
    personajes: [minero],
    posiciones: [[1, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [piedraDiamante],
    posiciones: [[1,2],[1,3],[1,4],[1,5],[1,6]],
    aliasConjunto: "azarCantidadTotalFijos",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [bandera],
    posiciones: [[1, 7]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
//// Se debe mirar el arrayDePersonajes para saber en que posición esta el personaje principal
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[27]);

//Método para el Cofre
miJuego.personajePrincipal.picarPiedra = function () {
  const intento = this.buscarParaRealizarAccionAdelante("piedraDiamante", "serJuntado");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay piedra.");
  } else if (!intento.exito) {
    return this.decirTerminar("Oh! Esta piedra ya fue picada.");
  }
};

miJuego.personajePrincipal.detectarPiedra = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoAdelante("piedraDiamante") !== undefined
};

miJuego.personajePrincipal.detectarBandera = function () {
  // devuelve true si encuentra o false si no hay bandera
  return this.buscarObjetoEnCasilleroActual("bandera") !== undefined
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
  ["avanzar", "Movimientos"],
  ["picar_piedra", "Acciones"],
  ["if", "Condicionales"],
  ["ifElse", "Condicionales"],
  ["repeat_times", "Repeticiones"],
  ["repeat_until", "Repeticiones"],
  ["repeat_while", "Repeticiones"],
  ["sensor_bandera", "Sensores"],
  ["sensor_piedra", "Sensores"],
];

// const bloquesPrecargadosJSON = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const bloquesPrecargadosJSON = '{ "blocks": { "languageVersion": 0, "blocks": [ { "type": "on_execute", "id": "rwW]g?!-iwJNk))r*~^C", "x": 61, "y": 69, "inputs": { "EVENT": { "block": { "type": "repeat_until", "id": "92fjyVYXU5TdIxB3C?E.", "inputs": { "condicion": { "block": { "type": "sensor_bandera", "id": ".ilIK$MQ@*{#o$i;/y9F" } }, "accionesARepetir": { "block": { "type": "repeat_while", "id": "!r|!J7hcH9eXxwc0wI0A", "inputs": { "condicion": { "block": { "type": "sensor_piedra", "id": "fO3Pcn{h~A/]e(g73/~j" } }, "accionesARepetir": { "block": { "type": "picar_piedra", "id": "JnZXKUgZ?#UewD9]yb*F" } } }, "next": { "block": { "type": "avanzar", "id": "nH1WqXr6~0.RT}?1YO_h" } } } } } } } } } ] } }'

const funcionesAExponer=["avanzar", "picarPiedra", "detectarPiedra", "detectarBandera"]

configurarYRenderizarToolbox(
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExponer
);
