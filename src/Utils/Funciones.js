import { CustomRenderer } from "../bloques/CustomRender";

//************FUNCION QUE BUSCA POSICIONES RAMDOM DEL TABLERO*************/
export function posicionValida(escenario) {
  
}

//************FUNCION QUE VALIDA LAS POSICIONES DEL TABLERO*************/
function estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario) {
  let estaVacio = true;
  const casillero =
    escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX];
  return (
    casillero.ocupantes[0].tipoPersonaje == "camino" &&
    casillero.ocupantes.length == 1
  );
}



// Funcion para generar coordenadas del tablero
export function generarCoordenadas(tablero) {
  let coordenadasPared = [],
    coordenadasCamino = [];

  for (let y = 0; y < tablero.length; y++) {
    for (let x = 0; x < tablero[y].length; x++) {
      let elemento = tablero[y][x];
      elemento === 1
        ? coordenadasPared.push([y, x])
        : coordenadasCamino.push([y, x]);
    }
  }
  return { coordenadasPared, coordenadasCamino };
}

// Funcion que elige personaje random
export function elegirPersonajeRandom(array) {
  const largoArray = array.length;
  const random = Math.floor(Math.random() * largoArray);
  const personajeElegido = array[random];
  return personajeElegido;
}

// Funcion que elige una posicion random de un array y elimina la posicion
export function elegirPosicionRandom(arrayPosiciones, escenario) {
  let posicionProvisoriaY, posicionProvisoriaX, random;
  let posicionesOcupadas = [];
  if (!arrayPosiciones) {
    const dimensionY = escenario.dimensiones[0];
    const dimensionX = escenario.dimensiones[1];
    do {
      posicionProvisoriaY = Math.floor(Math.random() * dimensionY);
      posicionProvisoriaX = Math.floor(Math.random() * dimensionX);
      if (posicionesOcupadas.includes([posicionProvisoriaY, posicionProvisoriaX])) {
        continue;
      }
    } while (!estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario));
      posicionesOcupadas.push([posicionProvisoriaY, posicionProvisoriaX])
      // return [posicionProvisoriaY, posicionProvisoriaX];
  } else {
    const largoArray = arrayPosiciones.length;
    do {
      random = Math.floor(Math.random() * largoArray);
      posicionProvisoriaY = arrayPosiciones[random][0];
      posicionProvisoriaX = arrayPosiciones[random][1];
      if (posicionesOcupadas.includes([posicionProvisoriaY, posicionProvisoriaX])) {
        continue;
      }
    } while (!estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario));
    posicionesOcupadas.push([posicionProvisoriaY, posicionProvisoriaX])
  }
  return [posicionProvisoriaY, posicionProvisoriaX];
}

//Para lanzar errores en consola
export function lanzarExcepcion(texto) {
  throw new Error(texto);
}

//Para obtener una cantidad aleatorea entre un Max y un Min
export const obtenerCantidadAleatoria = function (configuracion) {
  return (
    Math.floor(
      Math.random() *
        (configuracion.cantidadMax - configuracion.cantidadMin + 1)
    ) + configuracion.cantidadMin
  );
};

//********************SETEA POSICIONES **************************/
export const setearPosiciones = function (unPersonaje, unaPosicion) {
  unPersonaje.posicionInicialY = unaPosicion[0];
  unPersonaje.posicionInicialX = unaPosicion[1];
};
//******************SETEA ALIAS PARA TEST Y BOOLEANO PARA REINICIO ********************/
export const setearAliasYAleatorieidad = function (
  unPersonaje,
  desapareceAlReiniciar,
  alias
) {
  unPersonaje.desapareceAlReiniciar = desapareceAlReiniciar;
  unPersonaje.aliasConjunto = alias;
};

export const setearDireccion = function (unPersonaje, direcciones, i) {
  unPersonaje.direccionInicial = direcciones[i];
};
//********************COMANDO QUE SETEA,RENDERIZA Y EXPONE FUNCIONES GLOBALES PARA QUE FUNCIONE EL TOOLBOX ******************/
export const configurarYRenderizarToolbox = function (
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExporner
) {
  categoriaElegida.tipos.forEach((cat) =>
    miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
  );

  ordenJerarquicoBloques.forEach((bl) => {
    miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
  });

  const render = new CustomRenderer();
  render.registrarRender("renderDHS");
  miControlador.crearInyectarWorkspace("dhs-blockly-div", {
    toolbox: miControlador.ConfiguradorBloques.toolbox,
    theme: "themeDH",
    renderer: "renderDHS",
    zoom: {
      controls: true,
      wheel: true,
      pinch: true,
    },
  });
  miControlador.setearYCargarBloquesIniciales(
    JSON.parse(bloquesPrecargadosJSON)
  );
  miControlador.setearEventoCambioWorkspaceStandard();
  miControlador.habilitarDesactivarHuerfanos();
  miControlador.crearFuncionesGlobalesStandard();
  funcionesAExporner.forEach((unaFuncion) =>
    miControlador.juego.agregarGlobalConCallback(unaFuncion)
  );

  const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
  miControlador.setearCallbackInterprete((interpreter, globalObject) => {
    miControlador.callbackInterpreteStandard(interpreter, globalObject);
    callBackJuego(interpreter, globalObject);
  });
};
