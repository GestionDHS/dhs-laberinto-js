import { GeneradorDeBloque } from "./GeneradorDeBloque";

export class Sortable_Blocks {
    constructor(sortableBlocksConfigObj) {
      this.generador= new GeneradorDeBloque()
      this.lista = document.getElementById(sortableBlocksConfigObj.idListaOrigen);
      this.lista2 = document.getElementById(
        sortableBlocksConfigObj.idListaDestino
      );
    //   this.ulEmbedded = document.getElementById(sortableBlocksConfigObj.idUlEmbedded)
      this.listaErase = document.getElementById(
        sortableBlocksConfigObj.idListaErase
      );
      this.botonErase = document.getElementById(
        sortableBlocksConfigObj.idBotonErase
      );
      this.editable = sortableBlocksConfigObj.editable;
      this.edicionHabilitable = sortableBlocksConfigObj.edicionHabilitable;
      this.availableBlocksList = []; // Para clonarlos en B si hay preseteados.
  
      this.sortable = new Sortable(this.lista, {
        group: {
          name: `${sortableBlocksConfigObj.nameGroup}`,
          pull: "clone",
          put: false,
        },
        sort: false,
        animation: 500,
      });
      this.sortable2 = new Sortable(this.lista2, {
        group: {
          name: `${sortableBlocksConfigObj.nameGroup}`,
          pull: true,
        },
        sort: true,
        animation: 400,
        easing: "cubic-bezier(1, 0, 0, 1)",
      });
      
      this.erased =
        Sortable.create(this.listaErase, {
          group: {
            name: "erased",
            pull: false,
            put: true,
          },
          animation: 550,
          forceFallback: false,
          fallbackClass: "sortable-fallback",
        }) ?? console.log("No vino el idListaErase");
      if (this.editable) {
        this.habilitarEdicion();
      } else {
        this.deshabilitarEdicion();
      }
    }
    async erase() {
      const confirmacion = await Swal.fire({
        title:
          "Con este botón podrás borrar todas las instrucciones ya programadas.",
        text: "¿Deseas eliminarlas?",
        icon: "warning",
        confirmButtonText: "¡Sí, eliminar!",
        showCancelButton: true,
        cancelButtonText: "¡No, cancelar!",
        color: "white",
        background: "gray",
        confirmButtonColor: "#007a4c",
        cancelButtonColor: "#cc5a47",
      });
      if (confirmacion.isConfirmed) {
        let elem = document.querySelector("#dhs-lista2");
        elem.innerHTML = "";
      }
    }
    agregarBloqueListaA(direccion) {
      const miBlock = this.generador.crearBloqueSimple(direccion);
      //si sortableEmbedded esta en true -> ponerle sortable al ul interno
      //pars.sortableEmbedded && crearUlEmbedded(pars)
      this.availableBlocksList.push(miBlock);
      this.lista.appendChild(miBlock);
    }
    agregarBloqueListaB(direccion) {
      const miBlock = this.generador.crearBloqueSimple(direccion);
      this.lista2.appendChild(miBlock);
    }
 
    
   
    
    // Obligatoria
    alimentarLog() {
      const bloques = this.sendOrders();
      if (bloques) {
        for (let bl of bloques) {
          // console.log(bl)
          this.handleInstructions(bl);
        }
      }
    }
    // Obligatoria
    // habilitarEdicion() {
    //   if (this.edicionHabilitable) {
    //     this.habilitarErase();
    //     this.habilitarSort();
    //   }
    // }
    // Obligatoria / se precisa para el primer ejercicio
    // deshabilitarEdicion() {
    //   this.deshabilitarErase();
    //   this.deshabilitarSort();
    // }
    // habilitarSort() {
    //   this.sortable.option("disabled", false);
    //   this.sortable2.option("disabled", false);
    // }
    // deshabilitarSort() {
    //   this.sortable.option("disabled", true);
    //   this.sortable2.option("disabled", true);
    // }
    // habilitarErase() {
    //   this.botonErase.addEventListener("click", this.erase);
    //   this.erased.option("disabled", false);
    // }
    // deshabilitarErase() {
    //   this.botonErase.removeEventListener("click", this.erase);
    //   this.erased.option("disabled", true);
    // }
  
    sendOrders() {
      const lista = this.lista2.querySelectorAll("li");
      const bloques = [];
      if (lista.length > 0) {
        //acá tengo que ver si es un block te tipo "repeat"
        for (let item of lista) {
          let parms = [];
          let elementosInput = item.querySelectorAll("li, select");
          //let cantidadRepes = document.getElementById("cantidad-repes")
          //console.log(cantidadRepes.value)
          for (let elIn of elementosInput) {
            //console.log(Object.keys(elIn))
            //console.log(elIn)
            //console.log(elIn.innerHTML)
            //console.log(elIn.value)
            parms.push(elIn.value);
          }
          bloques.push({
            name: item.getAttribute("data-id"),
            valorParametro: parms,
          });
        }
      } else {
        Swal.fire({
          title: "No hay ninguna instrucción para ejecutar.",
          text: "¿Continuamos?",
          icon: "warning",
          confirmButtonText: "Ok",
          color: "white",
          background: "gray",
          confirmButtonColor: "#007a4c",
        });
      }
      return this.ordersToObjects(bloques);
    }
  
    ordersToObjects(arrOfOrders) {
      // const { nombre, personajes } = miJuego//sacar
      const pasosDelAlumno = [];
      const de = "lupe";
      if (arrOfOrders) {
        arrOfOrders.forEach((order, index) => {
          const ord = {
            de, // por defecto, en este juego, siempre será para Lupe.
            numeroDeBloque: index, // el numero de bloque leido (orden)
            valorPrincipal: order.name, // o abajo, derecha, etc. (string)
            valorParametro: order.valorParametro, // para cuando tengamos bloques como "mover 10/20/30 pasos". En nuestro caso, no hay nada.  como en scratch pasa [tiempo,texto]
          };
          pasosDelAlumno.push(ord);
        });
      } else {
        return null;
      }
      return pasosDelAlumno;
    }
  }