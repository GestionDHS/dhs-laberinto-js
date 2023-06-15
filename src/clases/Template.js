//es responsabilidad del juego rellenarlo
import "../style.css";
import "../styleActividades.css";
import { trash, play, stop, restart,standingPerson, runningPerson, code, comment } from "./Iconos";

export function template(element) {
  return `
  <header>
  <div>
    <h1>Titu de la act</h1>
  </div>
  <section class="barra">
    <div class="botones">
      <button class="tooltip" id="dhs-boton-ejecutar"><i> ${play} </i><span class="tooltiptext">Ejecutar bloques</span></button>
      <button class="tooltip" id="dhs-boton-detener"><i> ${stop} </i><span class="tooltiptext">Detener ejecución</span></button>
      <button class="tooltip" id="dhs-boton-reiniciar"><i> ${restart} </i><span class="tooltiptext">Reiniciar juego</span></button>
      <button class="tooltip" id="dhs-boton-borrar"><i> ${trash} </i><span class="tooltiptext">Borrar todos los bloques</span></button>
    </div>
    <div class="rango">
      <i class="tooltip"> ${standingPerson} <span class="tooltiptext">Más lento</span></i><input id="dhs-input-acelerador" type="range" min="0" max="2400" step="200"><i class="tooltip"> ${runningPerson} <span class="tooltiptext">Más rápido</span></i>
    </div>
    <div class="mostrar">
      <div>
        <i class="tooltip">${code}<span class="tooltiptext">Mostrar código</span></i>
        <input type="range" value="0" min="0" max="1">
      </div>
      <div>
        <i class="tooltip">${comment}<span class="tooltiptext">Mostrar resultado</span></i>
        <input type="range" value="0" min="0" max="1">
      </div>
    </div>
    <div class="desactivarSueltos">
      <span>Desactivar bloques sueltos</span><input id="dhs-input-bloques-sueltos" type="checkbox">
    </div>
  </section>
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
  </main>`;
}

/**
 * <img src="${dh}" style="background:black"> */

/* dejo aca comentado como estaba saco la clase panel-juego del template porque no se usa ahora ... si despues
 la precisamos queda aca
     <section class="panel-derecho flex-col">
      <div class="panel-juego flex-col">
         <h4 id="dhs-encabezado-desafio">Laberinto</h4>
         <div id="elemento-escenario"></div>
         <button id="dhs-boton">
         <span>EJECUTAR</span>
         <i> ${play} </i>
         </button>
       </div>
      </section>
    `;
    */

/** Sustituimos Todo ésto por Blockly
<!-- seccion izquierda -->
      <section class="panel-izquierdo">
       <div id="lista-bloques-disponibles">
         <h4>Bloques Disponibles</h4>
         <ul  name="listaDeBloquesDisponibles" id="dhs-lista-bloques-disponibles">
           <!-- ver que onda el script -->
         </ul>
       </div>
      </section>
  
      <!-- seccion central -->
  
      <section class="panel-central flex-col">
      <div id="dhs-instrucciones">
          <h4 id="dhs-encabezado-lista2">Instrucciones</h4>
          <ul  name="listaDeInstrucciones"  id="dhs-lista-instrucciones" >
          <!-- ver que onda el script -->
         
          </ul>
      </div>
      <div class="dhs-basura" >
      <ul id="dhs-basura-lista"></ul>
      <i id="basura" > ${tacho} </i>
      </div>
      </section>
 */