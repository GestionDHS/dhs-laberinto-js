
/* PARA GENERAR LOS BLOQUES EN PANTALLA EN CADA UNA DE LAS LISTAS */

// DEBE RECIBIR LA INSTANCIA DEL JUEGO Y LA LISTA DE BLOQUES QUE NECESITO CREAR

 export function generarListaBloquesDisponibles( unJuego ,listaDeBloquesDisponiblesAGenerar)
 {
    unJuego.listaBloquesAGenerar = listaDeBloquesDisponiblesAGenerar
    unJuego.renderizarBloquesDisponibles(
    unJuego.listaBloquesDisponibles,
    unJuego.listaBloquesAGenerar
    );
 }

 export function generarListaBloquesPrecargados( unJuego ,listaDeBloquesPrecargadosAGenerar)
 {
    unJuego.listaBloquesAGenerar = listaDeBloquesPrecargadosAGenerar
    unJuego.renderizarBloquesDisponibles(
    unJuego.listaBloquesInstrucciones,
    unJuego.listaBloquesAGenerar
    );
 }

/*PARA RENDERIZAR ESCENARIO*/
// La funcion recibe  la instancia de juego y el tablero previamente creado
 export function generarEscenario( unJuego , tablero )
 {
    const elementoHTMLLaberinto = document.getElementById("elemento-escenario")
    unJuego.generarEscenario(tablero, 55, elementoHTMLLaberinto)
    //medida en em
 }