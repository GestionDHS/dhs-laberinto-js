

//************FUNCION QUE ASIGNA POSICIONES RAMDOM DEL TABLERO*************/
export function asignarPosiciones(escenario) {
    let posicionCreacionY,
      posicionCreacionX,
      posicionProvisoriaY,
      posicionProvisoriaX;
    do {
      posicionProvisoriaY = Math.floor(
        Math.random() * escenario.dimensiones[0]
      );
      posicionProvisoriaX = Math.floor(
        Math.random() * escenario.dimensiones[1]
      );
      posicionCreacionY = posicionProvisoriaY;
      posicionCreacionX = posicionProvisoriaX;
    } while (
      !validarPosicion(posicionProvisoriaY, posicionProvisoriaX, escenario)
    );
    return [posicionCreacionY, posicionCreacionX];
  };

  
  //************FUNCION QUE VALIDA LAS POSICIONES DEL TABLERO*************/
  export function validarPosicion(
    posicionProvisoriaY,
    posicionProvisoriaX,
    escenario
  ) {
    return (
      escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX]
        .ocupantes.length == 1 &&
      escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX]
        .ocupantes[0].tipoPersonaje == "camino"
    );
  };

