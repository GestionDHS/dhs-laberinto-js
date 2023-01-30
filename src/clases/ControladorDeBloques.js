import { GeneradorDeBloque } from "./GeneradorDeBloque";
import Sortable from "sortablejs";

export class ControladorDeBloques {
  constructor() {
    this.generadorDeBloque = new GeneradorDeBloque();
  }

  crearBloques(listaAGenerar) {
    let listaBloques = [];
    listaAGenerar.forEach((bloque) => {
      let bloqueGenerado = this.generadorDeBloque.crearBloqueSimple(bloque);
      listaBloques.push(bloqueGenerado);
    });
    return listaBloques;
  }
  hacerloSortable(elementoUlOrigen, elementoUlDestino) {
    //let sortableULOrigen = Sortable.create(elemento, options) o new Sortable(elemento, options)
    Sortable.create(elementoUlOrigen, {
      group: {
        name: "sortable" ,
        pull: "clone",
        put: false,
      },
      sort: false,
      animation: 500,
    });
    
    Sortable.create(elementoUlDestino, {
      group: {
        name: "sortable",
        pull: "clone",
      },
      sort: true,
      animation: 400,
      easing: "cubic-bezier(1, 0, 0, 1)",
    });
  }
}
