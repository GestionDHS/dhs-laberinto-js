import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";


document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego
const miJuego = new Juego();

function global_ejecutar(){
  miJuego.ejecutar();
}
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
  status: {
    normal: { name: "normal", imageUrl: "lupe" },
  },
  statusInicial: "normal",
  posicionInicialY : 1,
  posicionInicialX :1,
  direccionInicial: 0, 
},
{
  idUsarHTML: "lodo",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "lodo" },
  },
  statusInicial: "normal",
  posicionInicialY : 1,
  posicionInicialX :3,
  direccionInicial: 0, 
},
{
  idUsarHTML: "cofre",
  tipoPersonaje: "probando",
  status: {
    normal: { name: "normal", imageUrl: "cofre" },
  },
  statusInicial: "normal",
  posicionInicialY : 3,
  posicionInicialX :4,
  direccionInicial: 0, 
},];



miJuego.generarPersonajes(arrayDePersonajes);

