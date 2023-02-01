import { Juego } from "../../clases/Juego";
import { template } from "../../clases/Template";
document.querySelector("#appActividad").innerHTML = template(``);
// document.querySelector("#elemento-escenario").innerHTML = `<div id="dhs-laberinto">
// <div>L</div>
// <div>A</div>
// <div>B</div>
// <div>E</div>
// <div>R</div>
// <div>I</div>
// <div>N</div>
// <div>T</div>
// <div>O</div>
// </div>`

//hacer dos metodos publicos para la instanciacion
const miJuego = new Juego();/* la lista de bloques a generar se la podemos mandar aca mismo */
miJuego.listaBloquesAGenerar = [
  "arriba",
  "abajo",
  "izquierda",
  "derecha",
  "llave",
];
miJuego.renderizarBloquesDisponibles(
  miJuego.listaBloquesDisponibles,
  miJuego.listaBloquesAGenerar
);
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];
const elementoHTMLLaberinto = document.getElementById("elemento-escenario")
miJuego.generarEscenario(tablero, 55,elementoHTMLLaberinto)
