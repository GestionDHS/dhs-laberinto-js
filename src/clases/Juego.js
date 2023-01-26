import {ControladorDeBloques} from "./ControladorDeBloques"
import { VizualizadorDebugger } from "./VizualizadorDebugger"

export class Juego{

    contructor(listaBloquesAGenerar,listaBloquesDisponibles,listaBloquesInstrucciones/*escenario*/){
        this.controlador = new ControladorDeBloques()
        this.vizualizador= new VizualizadorDebugger()
        this.listaBloquesAGenerar=listaBloquesAGenerar
        this.listaBloquesDisponibles=listaBloquesDisponibles
        this.listaBloquesInstrucciones=listaBloquesInstrucciones
    }
    
  

    renderizarBloquesDisponibles(listaAGenerar){
        console.log('llegue al controlador')
        console.log(listaAGenerar)
      this.controlador.crearBloques(listaAGenerar)
      console.log('salidelMetodo')
      
    }


}

