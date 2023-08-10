import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';


document.querySelector("#appActividad").innerHTML = template(``);

const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 9]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1,1, 1, 1, 1, 1, 0],
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
const nubes = personajesGaleria.obtenerPersonaje("nubes")

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Juntaste todas las monedas de los cofres!",
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
    estrategia: "azarFijos",
    personajes: [frutilla, bamboo],
    posiciones: [[3, 6]],
    aliasConjunto: "aleatoreosTablero",
    desapareceAlReiniciar: true,
  },
];



miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[63]);

//Método para detectar
miJuego.personajePrincipal.detectarFrutilla = function () {
  // devuelve true si encuentra o false si no hay cofre
  return this.buscarObjetoEnCasilleroActual("frutilla") !== undefined
};
miJuego.personajePrincipal.comerFruta = function () {
  const intento = this.buscarParaRealizarAccion("frutilla", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay frutilla.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Este frutilla ya no está.");
  }
};

// miJuego.personajePrincipal.llegarALaBandera = function () {
//   //El if depende de la cantidadTotal de cofres que hayamos seteado arriba
//   if (this.mochila.length === 2) {
//     this.abrirYMostrarModal();
//   } else {
//     return this.decirTerminar("¡Oh! Quedaron cofres sin abrir.");
//   }
// };

// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida=categoria.obtenerCategoria("repCondiSensor")
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["comer_fruta", "Acciones"],
  ["if", "Condicionales"],
  ["controls", "Repeticiones"],
  ["sensor_frutilla", "Sensores"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","comerFruta","detectarFrutilla"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
