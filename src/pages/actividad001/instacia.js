import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
import { objetosComunes } from "../../clases/ObjetosComunes";

document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego

window.miJuego = new Juego();

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
const listaBloquesAGenerar = [
  "arriba",
  "abajo",
  "izquierda",
  "derecha",
  "llave",
];

miJuego.renderizarBloquesDisponibles(listaBloquesAGenerar);
// CUARTO : CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const dimensiones = [5, 6]; //fila, columna

//aca hay que pasarle el tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
];

const arbol = {
  idUsarHTML: "arbol",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "arboles" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "pasto" },
  },
  statusInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
};

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};
const datosModalError = {
  titulo: "¡Ohh Nooww!",
  imagen: "viod",
  texto: "No habia un cofre acá :(",
  oculto: true,
};
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, tablero, 3, "white", arbol, pasto);
miJuego.agregarModal(datosModal);
miJuego.agregarModalError(datosModalError); // pia
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);
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
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "lupe" },
    },
    statusInicial: "normal",
    posicionInicialY: 3, //1
    posicionInicialX: 3, //1
    direccionInicial: 0,
    zIndex: 3,
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
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "lodo" },
    },
    statusInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 1,
    colisiones: [],
  },
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    statusInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    colisiones: [],
  },
];

miJuego.generarPersonajes(arrayDePersonajes);

//TODO:
/**
 * Mje de Lupe al usuario cuando quiere abrir el cofre y el cofre no está (Pía - fala agregar la foto void)
 * CSS: Arreglar el Modal with, que dependa del tablero (Pía - done)
 * Colisión con la bandera : "Ganar" igual que con el cofre
 * Conectar Blockly con éste motor de juego
 * Lupe: Debe tener un atributo "cantidadElementosJuntados" como si fuera una mochila donde va juntando: basura, manzanas, etc
 
 * Tema Girar:
    * 1: Por Grados 
    * 2: Derecha - Izq : es una abstracción de girar en grados.
    
    * Factor de Rotación no cambia por mas q el carpincho rote, si cambia "Avanzar", porque va a depender de la direccion q apunte
 
 */
