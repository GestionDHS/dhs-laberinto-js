/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
import { DHS_Gallery } from "./Dhs-galeria";

class Actividad{
    constructor(botonEjecutar,imagenesJuego,editable,edicionHabilitable){
        this.dhs_gallery= new DHS_Gallery()
        this.botonEjecutar = document.getElementById(gameActConfigObj.idBotonEjecutar)
        this.imagenesJuego=this.dhs_gallery.obtenerImagenes(arrayPropiedad)
        this.editable= editable
        this.edicionHabilitable= edicionHabilitable
    }
}


