//es responsabilidad del juego rellenarlo
import "../style.css";
import "../styleActividades.css";
import { tacho, play } from "./Iconos";

export function template(element) {
  return `
      <div id="blocklyDiv" style="height: 580px; width: 700px;"></div>
  
      <!-- seccion derecha -->
  
      <section class="panel-derecho flex-col">
      <textarea id="textarea"></textarea>
         <h4 id="dhs-encabezado-desafio">Laberinto</h4>
         <div id="elemento-escenario"></div>
         <button id="dhs-boton">
         <span>EJECUTAR</span>
         <i> ${play} </i>
         </button>
      </section>
    `;
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
