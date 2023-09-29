//es responsabilidad del juego rellenarlo
import "../style.css";
import "../styleActividades.css";
import "../styleAnimaciones.css";
import { trash, play, stop, restart,standingPerson, runningPerson, code, comment } from "./Iconos";
import logoBlockly from "../img/logoBlockly.png";
import logoDHS from "../img/logodhsBlack.png";

export function template(element) {
  return `
  <header>
    <div class="botones">
      <button class="tooltip botonera" id="dhs-boton-ejecutar"><i> ${play} </i><span class="tooltiptext">Ejecutar bloques</span></button>
      <button class="tooltip botonera" id="dhs-boton-detener"><i> ${stop} </i><span class="tooltiptext">Detener ejecución</span></button>
      <button class="tooltip botonera" id="dhs-boton-reiniciar">
      <i> ${restart} </i><span class="tooltiptext">Reiniciar juego</span></button>
      <button class="tooltip botonera" id="dhs-boton-borrar"><i> ${trash} </i><span class="tooltiptext">Borrar todos los bloques</span></button>
    </div>
    <div class="rango">
      <button class="tooltip botonera" disabled style="background:none; border:0">
        <i class="tooltip botonera"> ${standingPerson} </i>
        <span class="tooltiptext">Más lento</span>
      </button>
      <input id="dhs-input-acelerador" type="range" min="0" max="2400" step="200">
      <button class="tooltip botonera" disabled style="background:none; border:0">
        <i class="tooltip botonera"> ${runningPerson} </i> 
        <span class="tooltiptext">Más rápido</span>
      </button>
    </div>
    <div class="mostrar">
      <div>
        <i class="tooltip botonera">${code}<span class="tooltiptext">Mostrar código</span></i>
        <input type="range" value="0" min="0" max="1">
      </div>
      <div>
        <i class="tooltip botonera">${comment}<span class="tooltiptext">Mostrar resultado</span></i>
        <input type="range" value="0" min="0" max="1">
      </div>
    </div>
    <div class="desactivarSueltos">
      <span>Desactivar bloques sueltos</span><input id="dhs-input-bloques-sueltos" type="checkbox">
    </div>
  </header>
  <main>
    <div id='dhs-blockly-div' class="espacioBloques"></div>
    </div>
    <div class="juego-escenario">
      <div class="juego">
        <div id="elemento-escenario" class="escenario"></div>
      </div>
      <textarea class="esconder" id="dhs-text-area-codigo-generado" value="" disabled></textarea>
      <textarea class="esconder" id="dhs-text-area-output-generado" value="" disabled></textarea>
    </div>
  </main>
  <footer>
  <div></div>
  <img src="${logoDHS}" id="logoDHS-footer" alt="logo de Digital House Schools">
  <img src="${logoBlockly}" id="logoBlockly-footer" alt="logo de Blockly">
  </footer>`;
}


