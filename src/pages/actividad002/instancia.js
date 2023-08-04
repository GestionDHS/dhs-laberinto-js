import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas} from '../../Utils/Funciones';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

const dimensiones = [7, 7]; //fila, columna

const tablero = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const personajesGaleria = new Dhs_personajes();
const recuadroPintableDeseado = personajesGaleria.obtenerPersonaje("recuadroPintableDeseado");
const fondo = personajesGaleria.obtenerPersonaje("fondoGrisClaro");

// const recuadroPintableDeseado = {
//   idUsarHTML: "recuadro-pintable",
//   tipoPersonaje: "recuadro-pintable",
//   estadosPosibles: {
//     normal: { name: "normal", imageUrl: null },
//   },
//   estadoInicial: "normal",
//   zIndex: 1,
//   posicionInicialY: 0,
//   posicionInicialX: 0,
//   direccionInicial: 0,
//   colorFondoInicial: "lightgrey",
//   rotable: false,
// };

const recuadroPintableNoDeseado = { ...recuadroPintableDeseado };
recuadroPintableNoDeseado.colorFondoInicial = "white";

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "lapizRojo",
  texto: "Lograste realizar el dibujo",
  oculto: true,
};
miJuego.generarEscenario(
  dimensiones,
  2.5, 
  "white"
);
miJuego.agregarModal(datosModal);
let coordenadasCaminoPared = generarCoordenadas(tablero);

const lapiz = personajesGaleria.obtenerPersonaje("lapiz");
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
    posiciones: [[3, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
]
// const arrayDePersonajes = [
//   {
//     idUsarHTML: "lapiz",
//     tipoPersonaje: "lapiz",
//     clasePersonaje: "PersonajeDibujante",
//     tieneTooltip: true,
//     estadosPosibles: {
//       normal: { name: "normal", imageUrl: "lapizRojo" },
//     },
//     estadoInicial: "normal",
//     posicionInicialY: 3,
//     posicionInicialX: 0,
//     direccionInicial: 0,
//     zIndex: 3,
//     rotable: true,
//     colisiones: [],
//   },
// ];

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[0]);
const miColor = "#FA3939";

const dibujoDeseado = tablero.map((row) =>
  row.map((cell) => (cell === 0 ? false : miColor))
);

console.log(dibujoDeseado)
console.log(miJuego.personajePrincipal)
miJuego.personajePrincipal.dibujoDeseado = dibujoDeseado;
console.log(miJuego.personajePrincipal.dibujoDeseado)


const miControlador = new ControladorStandard(
  miJuego,
  velocidadInicial
);

const categoriasDeseadas = [
  {
    name: "Eventos",
    categorystyle: "execute",
  },
  {
    name: "Movimientos",
    categorystyle: "movement",
  },
  {
    name: "Lápiz",
    categorystyle: "pencil",
  },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["lapiz", "Lápiz"],
];

bloquesCustomStandardDesados.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});

const render = new CustomRenderer();
render.registrarRender("renderDHS");
miControlador.crearInyectarWorkspace("dhs-blockly-div", {
  toolbox: miControlador.ConfiguradorBloques.toolbox,
  theme: "themeDH",
  renderer: "renderDHS",
  zoom: {
    controls: true,
    pinch: true,
  },
});

const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
miControlador.setearYCargarBloquesIniciales(JSON.parse(bloquesPrecargadosJSON));
miControlador.setearEventoCambioWorkspaceStandard();
miControlador.habilitarDesactivarHuerfanos();
miControlador.crearFuncionesGlobalesStandard();
miControlador.juego.agregarGlobalConCallback("avanzar");
miControlador.juego.agregarGlobalConCallback("girarIzquierda");
miControlador.juego.agregarGlobalConCallback("girarDerecha");
miControlador.juego.agregarGlobalConCallback("girarGrados");
miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
miControlador.juego.agregarGlobalConCallback("bajarLapiz");
miControlador.juego.agregarGlobalConCallback("subirLapiz");
miControlador.juego.agregarGlobalConCallback("setearColor");

const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
