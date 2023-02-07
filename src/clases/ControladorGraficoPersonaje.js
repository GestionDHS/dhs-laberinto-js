
import { DHS_Gallery } from "./Dhs-galeria";


export class ControladorGraficoPersonaje{
    constructor(){
        this.galeria= new DHS_Gallery()
    }

    renderizarPersonajes(unEscenario,arrayDePersonajes){
        arrayDePersonajes.forEach(unPersonaje => this.crearEnEscenario(unPersonaje,unEscenario))
    }

    crearEnEscenario(unPersonaje,unEscenario){
        console.log(this.galeria.obtenerUrlDe(unPersonaje.nombre))
        const elementoHTMLPersonaje = document.createElement("DIV");
        unEscenario.elementoHTML.appendChild(elementoHTMLPersonaje)
        elementoHTMLPersonaje.classList.add("personaje");
        const reglaPersonajes = document.createElement("STYLE")
        reglaPersonajes.innerHTML = `
      .personaje-imagen{
        background-image: url(${this.galeria.obtenerUrlDe(unPersonaje.nombre)})
      }
      `
      document.querySelector("head").appendChild(reglaPersonajes)
      elementoHTMLPersonaje.classList.add("personaje-imagen");

    }
}
