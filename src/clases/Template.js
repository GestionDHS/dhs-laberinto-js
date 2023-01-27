//es responsabilidad del juego rellenarlo
import "../style.css";
import "../styleActividades.css";
export function template(element) {
  return `
  <!-- seccion izquierda -->
      <section class="panel-izquierdo">
       <div id="lista-bloques-disponibles">
         <h4>Bloques Disponibles</h4>
         <ul  id="dhs-lista-bloques-disponibles">
           <!-- ver que onda el script -->
         </ul>
       </div>
      </section>
  
      <!-- seccion central -->
  
      <section class="panel-central">
      <div id="dhs-instrucciones">
          <h4 id="dhs-encabezado-lista2">Instrucciones</h4>
          <ul  id="dhs-lista-instrucciones" >
          <!-- ver que onda el script -->
         
          </ul>
      </div>
      </section>
  
      <!-- seccion derecha -->
  
      <section class="panel-derecho">
      <div id="panelJuego">
         <h4 id="dhs-encabezado-desafio">Laberinto</h4>
         <div id="elemento-escenario"></div>
         <button >
           <span>EJECUTAR</span>
         </button>
       </div>
      </section>
    `;
}

/**<img src="${dh}" style="background:black"> */
