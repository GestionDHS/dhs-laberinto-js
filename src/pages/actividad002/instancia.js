import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";
// import { toolbox } from 'blockly/core/utils';

document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
//Blockly

//CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [7, 7]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const recuadroPintableDeseado = {
  idUsarHTML: "recuadro-pintable",
  tipoPersonaje: "recuadro-pintable",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: null },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  colorFondoInicial: "lightgrey",
  rotable: false,
};

const recuadroPintableNoDeseado = { ...recuadroPintableDeseado };
recuadroPintableNoDeseado.colorFondoInicial = "white";

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "lupe",
  texto: "Lograste realizar el dibujo",
  oculto: true,
};
// const datosModalError = {
//   titulo: "¡Ohh Nooww!",
//   imagen: "monedas", //sacar las monedas - simbolo de prohibido
//   texto: "Oh! Aquí no hay cofre.",
//   oculto: true,
//   color: "red",
// };
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(
  dimensiones,
  tablero,
  2.5, //anchoDeseado
  "white",
  recuadroPintableDeseado,
  recuadroPintableNoDeseado
);
miJuego.agregarModal(datosModal);
//miJuego.agregarModalError(datosModalError);
miJuego.generarCaminoYpared(
  dimensiones,
  tablero,
  recuadroPintableDeseado,
  recuadroPintableNoDeseado
);

//tipoPersonaje : Personaje / PersonajeDibujante / PersonajeMovible
const arrayDePersonajes = [
  {
    idUsarHTML: "lapiz",
    tipoPersonaje: "lapiz",
    clasePersonaje: "PersonajeDibujante",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lapizRojo" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 0,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);

//OJO Al personaje que apuntamos
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);

//Seteo del Dibujo a realizar - Verificación
//OJO - Las dimensiones del tamblero tienen que ser igual a las dimensiones de EJEMPLO_DIBUJO_DESEADO
const miColor = "#FA3939";

const dibujoDeseado = tablero.map((row) =>
  row.map((cell) => (cell === 0 ? false : miColor))
);

miJuego.personajePrincipal.dibujoDeseado = dibujoDeseado;

//Inicializamos todos los personajes

//Generamos el WORKSPACE

const miControlador = new ControladorStandard(
  miJuego,
  velocidadInicial
  // 'dhs-blockly-div',
  // JSON.stringify(toolbox),
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
  // {
  //   name: "Acciones",
  //   categorystyle: "variable_category",
  // },
  // {
  //   name: "Condicionales",
  //   categorystyle: "logic_category",
  // },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

const bloquesCustomStandardDesados = [
  // [nombreBloque, categoriaDestino]
  // [grupoBloques, categoriaDestino]
  ["on_execute", "Eventos"],
  // ["move_classic_simple", "Movimientos"],
  // ["move_classic_param", "Movimientos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  // ["girar_grados", "Movimientos"],
  // ["apuntar_hacia", "Movimientos"],
  // ["abrir_cofre", "Acciones"],
  // ["juntar_basura", "Acciones"],
  ["lapiz", "Lápiz"],
  // ["if", "Condicionales"],
];

bloquesCustomStandardDesados.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});

//pruebas render y theme
// render.makeConstants_()
// const customCategory = new CustomCategory()
// customCategory.setear();
// const theme = customTheme.theme;
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
//miControlador.juego.agregarGlobalConCallback("moverDerecha");
//miControlador.juego.agregarGlobalConCallback("moverAbajo");
//miControlador.juego.agregarGlobalConCallback("moverArriba");
//miControlador.juego.agregarGlobalConCallback("moverIzquierda");
// miControlador.juego.agregarGlobalConCallback("abrirCofre");
// miControlador.juego.agregarGlobalConCallback("juntarBasura");
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
  //callbackExtras(interpreter, globalObject);
});
