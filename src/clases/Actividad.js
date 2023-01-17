/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
import { DHS_Gallery } from "./Dhs-galeria";
import { Sortable_Blocks } from "./Sortable_blocks";

class Actividad{
    constructor(botonEjecutar,imagenesJuego){
        this.dhs_gallery= new DHS_Gallery()
        this.botonEjecutar = document.getElementById(gameActConfigObj.idBotonEjecutar)
        this.imagenesJuego=this.dhs_gallery.obtenerImagenes(imagenesJuego)
    }
}

class ActividadOrdenable extends Actividad {
    constructor(unaActividad) {
      super(unaActividad);
       this.interfaceDeBloques = new Sortable_Blocks({
       idListaOrigen: "dhs-lista",
       idListaDestino: "dhs-lista2",
       idListaEliminada: "dhs-erase",
       idBotonEliminar: "dhs-erase-button",
       editable: unaActividad.editable,
       edicionHabilitable: unaActividad.edicionHabilitable,
       })

    }
  }



