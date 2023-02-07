import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
import { Personaje } from "../../clases/Personaje";

document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego
const miJuego = new Juego();
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
miJuego.generarEscenario(tablero, 3, "white", "arboles", "pasto");

// const arrayDePersonajes= [
//   {
//     nombre: "lupe",
//     filaInicial: ,
//     columnaInicial:  ,
//     estadoInicial:  ,
//   }
// ]
const arrayDePersonajes = [{
  idUsarHTML: "lupe",
  tipoPersonaje: "probando",
  statuses: {
    normal: { name: "normal", imageUrl: "../lupe-commons/img/robotlupe.png" },
  },
  initialStatus: "normal",
  initial_y : 1,
  initial_x :1,
  direccionInicial: 0, 
},
{
  idUsarHTML: "lodo",
  tipoPersonaje: "probando",
  statuses: {
    normal: { name: "normal", imageUrl: "../lupe-commons/img/lodo.png" },
  },
  initialStatus: "normal",
  initial_y : 1,
  initial_x :3,
  direccionInicial: 0, 
},
{
  idUsarHTML: "lupe",
  tipoPersonaje: "probando",
  statuses: {
    normal: { name: "normal", imageUrl: "../lupe-commons/img/cofrecerrado.png" },
  },
  initialStatus: "normal",
  initial_y : 3,
  initial_x :4,
  direccionInicial: 0, 
},];

// const pepito = new Personaje(objeto,miJuego);
// sexto : instancio personajes
// miJuego.generarPersonajes(arrayDePersonajes);

miJuego.generarPersonajes(arrayDePersonajes);