import { GeneradorDeBloque } from "./GeneradorDeBloque";

export class ControladorDeBloques {
  constructor() {
    this.generadorDeBloque = new GeneradorDeBloque();
  }

  crearBloques(listaAGenerar) {
    console.log("entro en crearBloques");
    let listaBloques = [];
    console.log("entreAlcontrolador y me voy al generador");
    listaAGenerar.forEach((bloque) => {
      let bloqueGenerado = this.generadorDeBloque.crearBloqueSimple(bloque);
      listaBloques.push(bloqueGenerado);
    });
    return listaBloques;
  }
}
