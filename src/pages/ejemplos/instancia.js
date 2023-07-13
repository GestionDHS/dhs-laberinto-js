import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import { CustomRenderer } from "../../bloques/CustomRender";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomToolbox";

document.querySelector("#appActividad").innerHTML = template(``);

// PRIMERO: instanciar el juego y setear velocidad
const velocidadInicial = 1000;
window.miJuego = new Juego(velocidadInicial);

//SEGUNDO: CREAR MATRIZ PARA TABLERO SIENDO 1: PARED Y 0: CAMINO, se crea la variable dimensiónes.
const dimensiones = [5, 6]; //fila, columna

//tablero y pedirle que rellene árbol y pasto
const tablero = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1],
];

//TERCERO: Definir que objetos van a ser "pared", y cuales "camino"
const arbol = {
  idUsarHTML: "arbol",
  tipoPersonaje: "arbol",
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "arboles" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};
const pasto = {
  idUsarHTML: "camino",
  tipoPersonaje: "camino",
  pintable: true,
  estadosPosibles: {
    normal: { name: "normal", imageUrl: "pasto" },
  },
  estadoInicial: "normal",
  zIndex: 1,
  posicionInicialY: 0,
  posicionInicialX: 0,
  direccionInicial: 0,
  rotable: false,
};

//CUARTO: Setear Modal de Ganar
const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Encontramos 180 monedas de oro.",
  oculto: true,
};

// QUINTO:Para generar el escenario recibe como parametros: dimensiones, el tablero, el anchoBase de los casilleros
//(ojo esta en medida relativa "em") el color de borde y las imagenes de pared y camino...(para los nombres de paredes
// y caminos disponibles visitar el archivo Dhs-galeria.js , dichos nombres son las claves para acceder a los obj.)
miJuego.generarEscenario(dimensiones, tablero, 3, "white", arbol, pasto);
miJuego.agregarModal(datosModal);
miJuego.generarCaminoYpared(dimensiones, tablero, arbol, pasto);

//SEXTO: Definir los Objetos Personajes
//tipoPersonaje : PersonajeBasico / PersonajeMovibleSimple / PersonajeMovibleGrados / PersonajeDibujante
const arrayDePersonajes = [
  {
    idUsarHTML: "lupe",
    tipoPersonaje: "lupe",
    clasePersonaje: "PersonajeDibujante",
    tieneTooltip: true,
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lupe" },
    },
    estadoInicial: "normal",
    posicionInicialY: 3,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 3,
    rotable: true,
    colisiones: [
      {
        con: "lodo",
        factorDeAvance: 0.7,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Me atasqué en el lodo.",
      },
      {
        con: "arbol",
        factorDeAvance: 0.2,
        callback: (x) => {
          x.terminar();
        },
        mensaje: "¡OH NO! Choqué contra un árbol",
      },

      // {
      //   con: "cofre",
      //   factorDeAvance: 1,
      //   callback: (x) => {
      //     //depende si tengo el bloque Abrir Cofre
      //       x.abrir("cofre");
      //   },
      //   mensaje: "¡We are the Champions!",
      // },
    ],
  },
  {
    idUsarHTML: "lodo",
    tipoPersonaje: "lodo",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "lodo" },
    },
    estadoInicial: "normal",
    posicionInicialY: 1,
    posicionInicialX: 3,
    direccionInicial: 0,
    zIndex: 1,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "cofre",
    tipoPersonaje: "cofre",
    estadosPosibles: {
      cerrado: { name: "cerrado", imageUrl: "cofre" },
      abierto: { name: "abierto", imageUrl: "cofreAbierto" },
    },
    estadoInicial: "cerrado", //no seria "cerrado"? y tener una img en "cerrado"
    posicionInicialY: 3,
    posicionInicialX: 4,
    direccionInicial: 0,
    zIndex: 2,
    rotable: false,
    colisiones: [],
  },
  {
    idUsarHTML: "basura",
    tipoPersonaje: "basura",
    estadosPosibles: {
      normal: { name: "normal", imageUrl: "basura" },
      juntado: { name: "juntado", imageUrl: "pasto" },
    },
    estadoInicial: "normal",
    posicionInicialY: 2,
    posicionInicialX: 2,
    direccionInicial: 0,
    zIndex: 2,
    rotable: true,
    colisiones: [],
  },
];

//SEPTIMO: Generar y setear los Personajes - seteo el PersonajePrincipal y sus funciones
miJuego.generarPersonajes(arrayDePersonajes);
// Se debe mirar el arrayDePersonajes para saber en que posición esta el personaje principal
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[30]);

//Método para Abrir el Cofre
miJuego.personajePrincipal.abrirCofre = function () {
  const intento = this.buscarParaRealizarAccion("cofre", "abrirse");

  if (!intento.objetoEncontrado) {
    return this.decirTerminar("Oh! Aquí no hay cofre.");
    //this.abrirModalFalloApertura();
  } else if (!intento.exito) {
    //this.abrirYMostrarModal();
    return this.decirTerminar("Oh! Este cofre ya estaba abierto.");
  } else {
    return this.abrirYMostrarModal();
  }
};

//Método para Juntar Basura
miJuego.personajePrincipal.juntarBasura = function () {
  const intento = this.buscarParaRealizarAccion("basura", "serJuntado");
  if (!intento.objetoEncontrado) {
    this.decirTerminar("Oh! Aquí no hay basura.");
  } else if (!intento.exito) {
    this.decirTerminar("Oh! Hubo un problema al juntar la basura.");
  }
  return intento;
};

// Lancha
miJuego.personajePrincipal.llegarPlanta = function () {
  if (this.mochila.length === 3) {
    this.abrirYMostrarModal();
  } else if(!this.intento) {
    return this.decirTerminar("¡Oh! Quedó basura por levantar.")
  }
}

// Pedro - Lupe
miJuego.personajePrincipal.llegarEscuela = function () {
  this.abrirYMostrarModal();
}

//Conejo - Nelson
miJuego.personajePrincipal.cosecharZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "abrirse");
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if (!intento.exito) {
    return this.decirTerminar("¡Oh! Esta zanahoria ya fue cosechada.");
  } 
};

miJuego.personajePrincipal.comerZanahoria = function () {
  const intento = this.buscarParaRealizarAccion("zanahoria", "serJuntado");
 
  if (!intento.objetoEncontrado) {
    return this.decirTerminar("¡Oh! Aquí no hay zanahoria.");
  } else if( intento.estado == "juntado") {
    return this.decirTerminar("¡Oh! Esta zanahoria ya fue comida.");
  } else if (!intento.exito ) {
    return this.decirTerminar("¡Oh! Esta zanahoria aún no fue cosechada.");
  } 
};

//Seteo del Dibujo a realizar - Verificación. Para los ejercicios que tienen PersonajesDibujables
// const EJEMPLO_DIBUJO_DESEADO = [
//   [null, null, null, null, null],
//   [null, "#000000", null, "#000000", null],
//   [null, "#000000", null, "#000000", null],
//   [null, null, null, null, null],
// ]
// miJuego.personajePrincipal.dibujoDeseado = EJEMPLO_DIBUJO_DESEADO

//******************************************************* */
//    BLOCKLY
//****************************************************** */
//OCTAVO: Creamos una instancia del controlador, argumentos: el juego, velocidad inicial

const miControlador = new ControladorStandard(miJuego, velocidadInicial);

//NOVENO: Dejamos habilitadas las categorías que vamos a usar
const categoriasDeseadas = [
  {
    name: "Eventos",
    categorystyle: "execute",
  },
  {
    name: "Movimientos",
    categorystyle: "movement",
  },
  {
    name: "Lápiz",
    categorystyle: "pencil",
  },
  {
    name: "Acciones",
    categorystyle: "action",
  },
  {
    name: "Condicionales",
    categorystyle: "logic_category",
  },
  {
    name: "Repeticiones",
    categorystyle: "loop_category",
  },
];
categoriasDeseadas.forEach((cat) =>
  miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

//DECIMO: Agregamos los bloques a cada categoría
const bloquesCustomStandardDesados = [
  // [nombreBloque, categoriaDestino]
  // [grupoBloques, categoriaDestino]
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["move_classic_param", "Movimientos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["girar_grados", "Movimientos"],
  ["apuntar_hacia", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["juntar_basura", "Acciones"],
  ["lapiz", "Lápiz"],
  ["if", "Condicionales"],
  ["controls", "Repeticiones"],
];

bloquesCustomStandardDesados.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});

//ONCEAVO: Instanciamos el Render y se lo inyectamos al Worckspace
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

//DOCEAVO: Generamos los bloques que quedarán fijos en el worckspace.
const bloquesPrecargadosJSON =
  '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
miControlador.setearYCargarBloquesIniciales(JSON.parse(bloquesPrecargadosJSON));

//Habilitamos funciones para el manejo del workspace
miControlador.setearEventoCambioWorkspaceStandard();
miControlador.habilitarDesactivarHuerfanos();
miControlador.crearFuncionesGlobalesStandard();

//TRECEAVO: Exponemos globalmente las funciones de los bloques, borrar las que no usmos en cada ejercicio.
miControlador.juego.agregarGlobalConCallback("moverDerecha");
miControlador.juego.agregarGlobalConCallback("moverAbajo");
miControlador.juego.agregarGlobalConCallback("moverArriba");
miControlador.juego.agregarGlobalConCallback("moverIzquierda");
miControlador.juego.agregarGlobalConCallback("abrirCofre");
miControlador.juego.agregarGlobalConCallback("juntarBasura");
miControlador.juego.agregarGlobalConCallback("avanzar");
miControlador.juego.agregarGlobalConCallback("girarIzquierda");
miControlador.juego.agregarGlobalConCallback("girarDerecha");
miControlador.juego.agregarGlobalConCallback("girarGrados");
miControlador.juego.agregarGlobalConCallback("apuntarEnDireccion");
miControlador.juego.agregarGlobalConCallback("bajarLapiz");
miControlador.juego.agregarGlobalConCallback("subirLapiz");
miControlador.juego.agregarGlobalConCallback("setearColor");

//Le enviamos las funciones customizadas al interpreter  (No cambia nunca- No se toca)
const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  miControlador.callbackInterpreteStandard(interpreter, globalObject);
  callBackJuego(interpreter, globalObject);
});
