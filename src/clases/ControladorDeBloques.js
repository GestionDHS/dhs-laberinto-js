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
    let basura = document.querySelector("#dhs-basura-lista");
    Sortable.create(elementoUlOrigen, {
      group: {
        name: "sortable",
        pull: "clone",
        put: false,
      },
      sort: false,
      animation: 500,
    });

    Sortable.create(elementoUlDestino, {
      group: {
        name: "sortable",
        pull: true,
      },
      sort: true,
      animation: 400,
      easing: "cubic-bezier(1, 0, 0, 1)",
    });

    Sortable.create(elementoUlDestino, {
      group: {
        name: "basura",
        pull: false,
      },
      sort: false,
      animation: 550,
    });
    Sortable.create(basura, {
      group: {
        name: "basura",
        pull: false,
        put: true,
      },
      animation: 550,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
    });
  }

  borrarTodo() {
    const btn = document.querySelector("#basura");
    btn.addEventListener("click", (e) => {
      this.BorrarListaDeBloques();
    });
  }

  async BorrarListaDeBloques() {
    const confirmacion = await Swal.fire({
      title:
        "Con este botón podrás borrar todas las instrucciones ya programadas.",
      text: "¿Deseas eliminarlas?",
      fontSize: "2rem",
      icon: "warning",
      iconColor: "--color-gris-turquesa",
      confirmButtonText: "¡Sí, eliminar!",
      showCancelButton: true,
      cancelButtonText: "¡No, cancelar!",
      color: "var(--color-blanco)",
      background: "var(--color-secundario)",
      confirmButtonColor: "var(--color-confirmacion)",
      cancelButtonColor: "var(--color-terciario)",
      width: "25em",
      heightAuto:false,
      allowOutsideClick:false,
      backdrop: "rgba(0,0,0,.4)",
    });
    if (confirmacion.isConfirmed) {
      const instrucciones = document.querySelector("#dhs-lista-instrucciones");
      instrucciones.innerHTML = "";
    }
  }
}
