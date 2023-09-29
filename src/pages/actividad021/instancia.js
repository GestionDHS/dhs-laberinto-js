import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);
const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1],  
];

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "ecobrick",
  texto: "En esta planta recicladora transformamos los residuos plásticos en LADRILLOS ECOLÓGICOS.",
  oculto: true,
};

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const agua = personajesGaleria.obtenerPersonaje("agua");
const juncoPastoDelta = personajesGaleria.obtenerPersonaje("juncoPastoDelta");
const lancha = personajesGaleria.obtenerPersonaje("lancha");
const plastico = personajesGaleria.obtenerPersonaje("plastico");
const plantaRecicladora = personajesGaleria.obtenerPersonaje("plantaRecicladora");

miJuego.generarEscenario(dimensiones, 2.7, "#357fbf");
miJuego.agregarModal(datosModal);

const conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [juncoPastoDelta],
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
    personajes: [lancha],
    posiciones: [[0,5]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [plastico],
    posiciones: [[0,1],[3,1],[5,6]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [plantaRecicladora],
    posiciones: [[6,1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
]

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

miJuego.personajePrincipal.llegarPlanta = function () {
  if (this.mochila.length === 3) {
    this.abrirYMostrarModal();
  } else if(!this.intento) {
    return this.decirTerminar("¡Oh! Quedó basura por levantar.")
  }
}

miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("plastico", "serJuntado");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay plástico.");
  } else if(!intento.exito) {
    return this.decirTerminar("El plástico ya fue levantado.");
  }
};

// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["apuntar_hacia", "Movimientos"],
  ["juntar_basura", "Acciones"],
];
const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["juntarBasura","avanzar","apuntarEnDireccion"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
