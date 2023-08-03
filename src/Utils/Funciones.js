//************FUNCION QUE ASIGNA POSICIONES RAMDOM DEL TABLERO*************/
export function posicionValida(escenario) {
 
  const dimensionY = escenario.dimensiones[0];
  const dimensionX = escenario.dimensiones[1];
  let posicionProvisoriaY, posicionProvisoriaX;
 
  do {
    posicionProvisoriaY = Math.floor(Math.random() * dimensionY);
    posicionProvisoriaX = Math.floor(Math.random() * dimensionX);
   
  } while (!estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario)) ;

  return [posicionProvisoriaY, posicionProvisoriaX];
}

//************FUNCION QUE VALIDA LAS POSICIONES DEL TABLERO*************/
 function estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario) {
   const casillero = escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX];
   return (casillero.ocupantes[0].tipoPersonaje == "camino" && casillero.ocupantes.length == 1)
}

// Funcion para generar coordenadas del tablero
export function generarCoordenadas(tablero) {
	let coordenadasPared = [],coordenadasCamino = [];

	for (let y = 0; y < tablero.length; y++) {
		for (let x = 0; x < tablero[y].length; x++) {
      let elemento = tablero[y][x];
			elemento === 1? coordenadasPared.push([y, x]): coordenadasCamino.push([y, x]);
		}
	}
  return {coordenadasPared, coordenadasCamino}
}

// Funcion que elige personaje random
export function elegirPersonajeRandom(array) {
  const largoArray = array.length;
  const random = Math.floor(Math.random() * largoArray)
  const personajeElegido = array[random]
  return personajeElegido;
}

// Funcion que elige un numero random para indice
export function elegirPosicionRandom(array) {
  const largoArray = array.length
  const random = Math.floor(Math.random() * largoArray)
  return random;
}

//Para lanzar errores en consola
export function lanzarExcepcion(texto) {
  throw new Error(texto)
}

//Para obtener una cantidad aleatorea entre un Max y un Min
export  const obtenerCantidadAleatoria = function (configuracion) {
  return (
    Math.floor(
      Math.random() *
        (configuracion.cantidadMax - configuracion.cantidadMin + 1)
    ) + configuracion.cantidadMin
  );
};

//********************SETEA POSICIONES **************************/
export const setearPosiciones= function(unPersonaje,unaPosicion){
  unPersonaje.posicionInicialY = unaPosicion[0];
  unPersonaje.posicionInicialX = unaPosicion[1];
}
//******************SETEA ALIAS PARA TEST Y BOOLEANO PARA REINICIO ********************/
export const setearAliasYAleatorieidad=function(unPersonaje,desapareceAlReiniciar,alias){
  unPersonaje.desapareceAlReiniciar = desapareceAlReiniciar;
  unPersonaje.aliasConjunto = alias;
}