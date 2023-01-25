import { DHS_Gallery } from "./Dhs-galeria";

export class GeneradorDeBloque {
  constructor(galeriaImagenes) {
    this.galeriaImagenes=new DHS_Gallery()
  }
 
  crearBloqueSimple(direccion) {
    bloqueACrear=this.obtenerParametros(direccion)
    const blockListItem = document.createElement("li");
      if(bloqueACrear.rutaImagen){
        const icon = document.createElement("IMG");
        icon.alt = bloqueACrear.nombreCompleto;
        icon.src = bloqueACrear.rutaImagen;
        blockListItem.appendChild(icon);
      }
      const caja = document.createElement("DIV");
      const txt = document.createElement("SPAN");
      txt.innerHTML = bloqueACrear.nombreCompleto;
      caja.appendChild(txt);
      blockListItem.appendChild(caja);

    return blockListItem;
  }

  obtenerParametros(direccion) {
    return {
      nombreCompleto:this.galeriaImagenes.obtenerNombreCompletoDe(direccion),
      rutaImagen:this.galeriaImagenes.obtenerUrlDe(direccion),
      clave:direccion,
      inputElements: x.enableParameters ? [inputPasos.cloneNode(true)] : null,
    }
  }
  // crearBloqueconInputoSelect() {}
  // crarBloqueEmbeboido() {
  //   //repet
  // }
}
