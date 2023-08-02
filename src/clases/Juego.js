import { Escenario } from "./Escenario";

import {
  PersonajeBasico,
  PersonajeDibujante,
  PersonajeMovibleSimple,
  PersonajeMovibleGrados,
} from "./Personaje";

import {
  TipoCreacion,
  PersonajesFijos,
  PersonajesAlAzarRango,
  PersonajesAlAzarFijos,
  PersonajesAlAzarExcluyente,
} from '../clases/StrategyCreacion';

import { Modal } from "./Modal";




export class Juego {
  constructor(duracionIntervalos = 1000) {
    this.sincronico = true;
    this.duracionIntervalos = duracionIntervalos;
    this.escenario = {};
    this.listaDePersonajes = [];
    this.listaDeAleatoreos = [];
    this.objetoConfiguracionPosicion=null
    this.personajePrincipal = null;
    this.puedeDebeContinuar = true;
    this.funcionesPublicadas = [];
    this.clasesPersonajesPosibles = {
      PersonajeBasico: PersonajeBasico,
      PersonajeDibujante: PersonajeDibujante,
      PersonajeMovibleSimple: PersonajeMovibleSimple,
      PersonajeMovibleGrados: PersonajeMovibleGrados,
    };
    this.configuracionInicialPersonajes = []
    this.tipoCreacionPersonajes = {}
  }

  /*PARA RENDERIZAR ESCENARIO*/
  // La funcion recibe la matriz tablero la unidad de ancho, el color de bordes, nombre imagen pared, nombre imagen camino

  generarEscenario(dimensiones, unidadAnchoDeseada, colorBordes, tablero,camino,pared) {
    const elementoHTMLLaberinto = document.getElementById("elemento-escenario");
    this.escenario = new Escenario(
      dimensiones,
      unidadAnchoDeseada,
      elementoHTMLLaberinto,
      colorBordes,
      tablero,camino,pared
    );
    this.escenario.crearEscenario();
  }
  
  generarCaminoYpared() {
    for (let fila = 0; fila < this.escenario.dimensiones[0]; fila++) {
      for (let col = 0; col <  this.escenario.dimensiones[1]; col++) {
        if (this.escenario.tablero[fila][col] == 1) {
          this.escenario.pared.posicionInicialX = col;
          this.escenario.pared.posicionInicialY = fila;
          this.generarPersonaje(this.escenario.pared);
        } else {
          this.escenario.camino.posicionInicialX = col;
          this.escenario.camino.posicionInicialY = fila;
          this.generarPersonaje(this.escenario.camino);
        }
      }
    }
  }
  limpiarTablero() {
    let personajesAleatorios=this.listaDePersonajes.filter((personaje)=>personaje.eliminarAlReiniciar==true)
    personajesAleatorios.forEach(personaje => {
        personaje.salirDelCasilleroActual()
        personaje.controladorDOM.removerDivDelDOM()
    })
    this.listaDePersonajes = this.listaDePersonajes.filter((personaje)=>personaje.eliminarAlReiniciar!=true)
    return this.listaDePersonajes
  }

  reiniciar() {
    this.puedeDebeContinuar = true;
    let personajes = this.limpiarTablero()
    personajes.forEach((unPersonaje)=>unPersonaje.inicializar())
    this.crearPersonajes(this.tipoCreacionPersonajes.crearPersonajes(this.listaDeAleatoreos,this.objetoConfiguracionPosicion,this.escenario))
  }

  generarPersonaje(personaje) {
    const clasePersonaje = personaje.clasePersonaje;
    let unPersonaje;
    if (clasePersonaje) {
      unPersonaje = new this.clasesPersonajesPosibles[clasePersonaje](
        personaje,
        this
      );
      unPersonaje.aleatoreo = personaje.aleatoreo || false
    } else {
      unPersonaje = new PersonajeBasico(personaje, this);
      unPersonaje.aleatoreo = personaje.aleatoreo || false
    }
    // if(unPersonaje.aleatoreo){
    //   this.listaDeAleatoreos.push(unPersonaje)
    // }
    this.listaDePersonajes.push(unPersonaje);
    unPersonaje.inicializar();
   
  };

  setearPersonajePrincipal(personaje) {
    this.personajePrincipal = personaje;
  }

  setearVelocidad(nuevaVelocidad) {
    this.duracionIntervalos = nuevaVelocidad;
    this.listaDePersonajes.forEach((personaje) =>
      personaje.setearVelocidad(nuevaVelocidad)
    );
  }

  setearSincronicidad(boolean) {
    this.sincronico = boolean;
  }

  agregarModal(datosModal) {
    this.datosModal = new Modal(datosModal, this);
    return this.datosModal;
  }
  mostrarModal() {
    this.datosModal.mostrar(this.sincronico);
  }

  habilitarFuncionGlobal(nombre, bindearCon = this.personajePrincipal) {
    window[nombre] = bindearCon[nombre].bind(bindearCon);
  }

  agregarGlobalConCallback(nombre, bindearCon = this.personajePrincipal) {
    this.habilitarFuncionGlobal(nombre, bindearCon);
    this.funcionesPublicadas.push(nombre);
  } // llamar en instancia para cada movimiento deseado

  generarCallbackParaInterprete() {
    const lista = this.funcionesPublicadas;
    return function (interpreter, globalObject) {
      lista.forEach((nombreFuncion) => {
        interpreter.setProperty(
          globalObject,
          nombreFuncion,
          interpreter.createNativeFunction(window[nombreFuncion])
        );
      });
    };
  }

  //-----Posiciones Aleatorias-----//

 // calcularCantidadFijaMaxima(configuracion) {
 //   return (
 //     Math.floor(
 //       Math.random() *
 //       (configuracion.cantidadMaximaFija -
 //         configuracion.cantidadMinimaFija +
 //         1)
 //     ) + configuracion.cantidadMinimaFija
 //   );
 // }

  calcularCasillerosVacios() {
    let casillerosVacios = 0
    this.escenario.objetosCasilleros.forEach(arrObjCasi => {
      arrObjCasi.forEach(casillero => {
        casillero.ocupantes?.forEach(ocupante => {
          if (ocupante.tipoPersonaje == "camino" && casillero.ocupantes.length == 1) {
            casillerosVacios++
          }
        })
      })
    })
    return casillerosVacios
  }
// calcularCantidadPorcentualLibre(configuracion) {
//   return parseInt(this.calcularCasillerosVacios() * (configuracion.cantidadTotalPorcentual / 100))
// }
// calcularCantidadPosicionesFijas(configuracion) {
//   return configuracion.cantidadTotalFija;
// }
// obtenerCantidad(configuracion) {
//   let cantidad = configuracion?.cantidadMaximaFija &&
//     this.calcularCantidadFijaMaxima(configuracion);
//   cantidad = cantidad || (configuracion?.cantidadTotalPorcentual &&
//     this.calcularCantidadPorcentualLibre(configuracion));
//   cantidad = cantidad || (configuracion?.cantidadTotalFija &&
//     this.calcularCantidadPosicionesFijas(configuracion));
//   return cantidad
// }
//
// lanzarExcepcion() {
//   throw new Error(
//     "La configuración de generación de personajes aleatorios necesita determinar la cantidad con alguna de las propiedades dipsonibles"
//   );
// }

//  //Funcion seleccionar un personaje random
//  elegirPersonajeRandom(arrayDePersonajes) {
//    // console.log(arrayDePersonajes);
//    const largoArray = arrayDePersonajes.length;
//    const random = Math.floor(Math.random() * largoArray)
//    // console.log(random);
//    return arrayDePersonajes[random]
//  }
//
//  elegirPosicionRandom(personajeEx) {
//    const posicionesArray = personajeEx.configPosicionamiento.posicionesFijasEx.length
//    const random = Math.floor(Math.random() * posicionesArray)
//    return random;
//  }
//  //Coloca un personaje random en una posicion especifica
//  colocarPersonajeRandomExcluyente(arrayDePersonajes) {
//    const personjeRandom = this.elegirPersonajeRandom(arrayDePersonajes)
//    // const posicionRandom = this.elegirPosicionRandom(personjeRandom)
//    const posiciones = personjeRandom.configPosicionamiento.posicionesFijasEx[0]
//    //console.log(posiciones);
//    personjeRandom.posicionInicialY = posiciones[0]
//    personjeRandom.posicionInicialX =posiciones[1]
//    this.generarPersonaje(personjeRandom);
//  }
//
//  crearPersonajesFijos(arrayDePersonajesFijos) {
//    arrayDePersonajesFijos.forEach((unPersonaje) => {
//      for (let i = 0; i < unPersonaje.configPosicionamiento.posicionesFijas.length; i++) {
 //      unPersonaje.posicionInicialY = unPersonaje.configPosicionamiento.posicionesFijas[i][0]
 //      unPersonaje.posicionInicialX = unPersonaje.configPosicionamiento.posicionesFijas[i][1]
 //      this.generarPersonaje(unPersonaje)
 //    }
 //  })
 //}
 //validarPosicion(posicionProvisoriaY, posicionProvisoriaX) {
 //  return (this.escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX].ocupantes.length == 1 && this.escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX].ocupantes[0].tipoPersonaje == "camino")
 //}

  //asignarPosiciones() {
  //  let posicionCreacionY, posicionCreacionX, posicionProvisoriaY, posicionProvisoriaX
  //  do {
  //    posicionProvisoriaY = Math.floor(
  //      Math.random() * this.escenario.dimensiones[0]
  //    );
  //    posicionProvisoriaX = Math.floor(
  //      Math.random() * this.escenario.dimensiones[1]
  //    );
  //    posicionCreacionY = posicionProvisoriaY;
  //    posicionCreacionX = posicionProvisoriaX;
  //  } while (!this.validarPosicion(posicionProvisoriaY, posicionProvisoriaX))
  //  return [posicionCreacionY, posicionCreacionX]
  //}
//calcularAsignarPosiciones(unPersonaje){
//  const posiciones = this.asignarPosiciones()
//  unPersonaje.posicionInicialY = posiciones[0]
//  unPersonaje.posicionInicialX = posiciones[1]
//  return unPersonaje
//}
//obtenerCantidadAleatoria(configuracion) {
//  return this.obtenerCantidad(configuracion) || this.lanzarExcepcion();
//}
//  crearPersonajesAleatorios(arrayDePersonajesAleatorios) {
//    arrayDePersonajesAleatorios.forEach((unPersonaje) => {
//      let cantidad = this.obtenerCantidadAleatoria(unPersonaje.configPosicionamiento)
//      for (let i = 0; i < cantidad; i++) {
//        let personajeAux = this.calcularAsignarPosiciones(unPersonaje)
//        personajeAux.aleatoreo = true
//        this.generarPersonaje(personajeAux)
//      }
//    })
//  }

generarConjuntoDePersonajesACrear(listaDeConjuntosDePersonajes){
  let personajesAGenerar=[]
  const estrategias = {
    fijos: new PersonajesFijos(),
    azarRango: new PersonajesAlAzarRango(),
    PersonajesAlAzarFijos: new PersonajesAlAzarFijos(),
    PersonajesAlAzarExcluyente: new PersonajesAlAzarExcluyente(),
  }
  listaDeConjuntosDePersonajes.forEach( unConjunto => {
    if(this.tipoCreacionPersonajes!=unConjunto.estrategia){this.tipoCreacionPersonajes=estrategias[unConjunto.estrategia]}
    let arrayPersonajesAux=this.tipoCreacionPersonajes.crearPersonajes(unConjunto,this.escenario)
   personajesAGenerar.push(...arrayPersonajesAux)
});
  return personajesAGenerar
}

  crearPersonajes(listaDeConjuntosDePersonajes) {
    let arrayDePersonajes=this.generarConjuntoDePersonajesACrear(listaDeConjuntosDePersonajes)
    arrayDePersonajes.forEach((unPersonaje)=>{
      this.generarPersonaje(unPersonaje)}
  )}

}




//regenerarConjuntosPersonajesAleatorias
//alias testeo (listo)
//regenerarAlReiniciar = configurable en el objeto
//funcion metodo de juego(listo)
//autodestruirse sea del personaje
//objetoconfiguracion cambiar listaDeConjuntosDePersonajes(listo)







