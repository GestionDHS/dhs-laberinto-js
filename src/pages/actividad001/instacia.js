import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
import {objetosComunes} from "../../clases/ObjetosComunes"


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
const dimensiones = [5,6] //fila, columna
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];
// QUINTO:Para generar el escenario recibe como parametros el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa) el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones,tablero, 3, "white", objetosComunes.arbol, objetosComunes.pasto);

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
    posicionInicialY: 1,
    posicionInicialX: 1,
    direccionInicial: 0,
    zIndex:3,
    colisiones:[{
      con:"lodo", 
      factorDeAvance: 0.7,  
      callback:(x)=>{x.terminar()}, 
      mensaje:"¡OH NO! Me atasqué en el lodo.",
    },
    {
      con:"arbol", 
      factorDeAvance: 0,  
      callback:(x)=>{x.terminar()}, 
      mensaje:"¡OH NO! tus ojos son dos luceros que iluminan mi camino, ayer los cerraste y me hice mierda contra un pino.",
    },
    {
    con:"limitesDelUniverso", 
    factorDeAvance: 0.2,  
    callback:(x)=>{x.terminar()}, 
    mensaje:"¡OH NO! me caí del mapa. ",
    }
  ]
  },

  {  idUsarHTML: "lodo",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "lodo" },
  },
  statusInicial: "normal",
  posicionInicialY: 1,
  posicionInicialX: 3,
  direccionInicial: 0,
  zIndex:1,
  colisiones:{}},
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "probando",
    status: {
      normal: { name: "normal", imageUrl: "cofre" },
    },
    statusInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex:1,
    colisiones:{}
  },
];

miJuego.generarPersonajes(arrayDePersonajes);

