import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
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
// TERCERO: pasarle la lista a la funcion correspondiente del archivo Juego.js para saber
// en que lista debe renderizar
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
