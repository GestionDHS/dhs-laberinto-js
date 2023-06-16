import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
// import { toolbox } from 'blockly/core/utils';


document.querySelector("#appActividad").innerHTML = template(``);
// PRIMERO: instanciar el juego
const velocidadInicial = 1000
const miJuego = new Juego(velocidadInicial);

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
const listaBloquesAGenerar = [
  "arriba",
  "abajo",
  "izquierda",
  "derecha",
  "llave",
];

// CUARTO : CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [5, 6]; //fila, columna

//aca hay que pasarle el tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

const arbol = {
  idUsarHTML: "arbol",
  tipoPersonaje: "arbol",
  status: {
    normal: { name: "normal", imageUrl: "arboles" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "camino",
  status: {
    normal: { name: "normal", imageUrl: "pasto" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};
const datosModalError = {
  titulo: "¡Ohh Nooww!",
  imagen: "monedas",
  texto: "No habia un cofre acá :(",
  oculto: true,
};
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, tablero, 3, "white", arbol, pasto);
miJuego.agregarModal(datosModal);
miJuego.agregarModalError(datosModalError);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);
//miJuego.generarWorkspace()
// document.getElementById("dhs-boton").addEventListener("click", function (e) {
//   e.preventDefault()
//   miJuego.ejecutar();
// });
// const arrayDePersonajes= [
//   {
//     nombre: "lupe",
//     filaInicial: ,
//     columnaInicial:  ,
//     estadoInicial:  ,
//   }
// ]
const arrayDePersonajes = [
  {
    idUsarHTML: "lupe",
    tipoPersonaje: "lupe",
    status: {
      normal: { name: "normal", imageUrl: "lupe" },
    },
    statusInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    colisiones: [
      {
        con: "lodo",
        factorDeAvance: 0.7,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Me atasqué en el lodo.",
      },
      {
        con: "arbol",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje:
          "¡OH NO! tus ojos son dos luceros que iluminan mi camino, ayer los cerraste y me hice mierda contra un pino.",
      },

      // {
      //   con: "cofre",
      //   factorDeAvance: 1,
      //   callback: (x) => {
      //     //depende si tengo el bloque Abrir Cofre
      //       x.abrir("cofre");
      //   },
      //   mensaje: "¡We are the Champions!",
      // },
    ],
  },

  {
    idUsarHTML: "lodo",
    tipoPersonaje: "lodo",
    status: {
      normal: { name: "normal", imageUrl: "lodo" },
    },
    statusInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "cofre",
    status: {
      normal: { name: "normal", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    statusInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[30])

//Generamos el workspace
const bloquesPrecargadosJSON= '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}'


const miControlador = new ControladorStandard(
  miJuego,
  velocidadInicial,
  // 'dhs-blockly-div', 
  // JSON.stringify(toolbox),
  // bloquesPrecargadosJSON
);

const categoriasDeseadas = [
  {
      name: "Eventos",
      categorystyle: "procedure_category",
  },
  {
      name: "Movimientos",
      categorystyle: "variable_category"
  },
  {
      name: "Lápiz",
      categorystyle: "variable_category"
  },
  {
    name: "Acciones",
    categorystyle: "variable_category"
  }
]
categoriasDeseadas.forEach(cat => miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat));

const bloquesCustomStandardDesados = [
  // [nombreBloque, categoriaDestino]
  // [grupoBloques, categoriaDestino]
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["move_classic_param", "Movimientos"],
  ["abrirCofre", "Acciones"],
  ["lapiz", "Lápiz"]
];

bloquesCustomStandardDesados.forEach(bl => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl)
})

miControlador.crearInyectarWorkspace("dhs-blockly-div", {toolbox: miControlador.ConfiguradorBloques.toolbox})
miControlador.cargarBloquesSerializados(JSON.parse(bloquesPrecargadosJSON));
miControlador.setearEventoCambioWorkspaceStandard();
miControlador.habilitarDesactivarHuerfanos();
miControlador.crearFuncionesGlobalesStandard();
miControlador.juego.agregarGlobalConCallback("moverDerecha");
miControlador.juego.agregarGlobalConCallback("moverAbajo");
miControlador.juego.agregarGlobalConCallback("moverArriba");
miControlador.juego.agregarGlobalConCallback("moverIzquierda");
miControlador.juego.agregarGlobalConCallback("abrirCofre");
const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete(
  (interpreter, globalObject) => {
      miControlador.callbackInterpreteStandard(interpreter, globalObject);
      callBackJuego(interpreter,globalObject)
      //callbackExtras(interpreter, globalObject);
  }
);
//TODO:
/**

 * Mje de Lupe al usuario cuando quiere abrir el cofre y el cofre no está (Pía - fala agregar la foto void)
 * CSS: Arreglar el Modal with, que dependa del tablero (Pía - done)
 * Colisión con la bandera : "Ganar" igual que con el cofre. "Es un colback de Ganaste"
 * Conectar Blockly con éste motor de juego
 * Lupe: Debe tener un atributo "cantidadElementosJuntados" como si fuera una mochila donde va juntando: basura, manzanas, etc
 
 * Tema Girar:
    * 1: Por Grados 
    * 2: Derecha - Izq : es una abstracción de girar en grados.
    
    * Factor de Rotación no cambia por mas q el carpincho rote, si cambia "Avanzar", porque va a depender de la direccion q apunte
 
 */
