
import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego
const miJuego = new Juego()

// SEGUNDO: crear la lista de bloques disponibles y precargados a generar
const listaBloquesAGenerar = [
  "arriba",
  "abajo",
  "izquierda",
  "derecha",
  "llave",
];

// TERCERO: usar las funciones de instancia para renderizar los bloques

miJuego.renderizarBloquesDisponibles(listaBloquesAGenerar)


//que vaya como método de Juego



// CUARTO : CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

// QUINTO: usar funcion de instancia para renderizar el tablero
miJuego.generarEscenario(tablero,55,"red")