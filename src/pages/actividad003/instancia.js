import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];
const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const recuadroPintableDeseado = personajesGaleria.obtenerPersonaje(
  "recuadroPintableDeseado"
);
const fondo = personajesGaleria.obtenerPersonaje("fondo");
const lapiz = personajesGaleria.obtenerPersonaje("lapiz");

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "lapizRojo",
  texto: "Lograste realizar el dibujo",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 2.5, "white");
miJuego.agregarModal(datosModal);

let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [fondo],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [recuadroPintableDeseado],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [lapiz],
    posiciones: [[5, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
];

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);
const miColor = "#FA3939";
const dibujoDeseado = tablero.map((row) =>
  row.map((cell) => (cell === 1 ? false : miColor))
);

miJuego.personajePrincipal.dibujoDeseado = dibujoDeseado;


// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego, velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Lápiz"])
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["lapiz", "Lápiz"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

const funcionesAExponer=["avanzar","girarIzquierda","girarDerecha","girarGrados","apuntarEnDireccion","bajarLapiz","subirLapiz","setearColor"]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)


// miControlador.setearYCargarBloquesIniciales(JSON.parse(bloquesPrecargadosJSON));
// miControlador.setearEventoCambioWorkspaceStandard();
// miControlador.habilitarDesactivarHuerfanos();
// miControlador.crearFuncionesGlobalesStandard();
// miControlador.juego.agregarGlobalConCallback("avanzar");
// miControlador.juego.agregarGlobalConCallback("girarIzquierda");
// miControlador.juego.agregarGlobalConCallback("girarDerecha");
// miControlador.juego.agregarGlobalConCallback("girarGrados");
// miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
// miControlador.juego.agregarGlobalConCallback("bajarLapiz");
// miControlador.juego.agregarGlobalConCallback("subirLapiz");
// miControlador.juego.agregarGlobalConCallback("setearColor");

// const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
// miControlador.setearCallbackInterprete((interpreter, globalObject) => {
//   miControlador.callbackInterpreteStandard(interpreter, globalObject);
//   callBackJuego(interpreter, globalObject);
// });
