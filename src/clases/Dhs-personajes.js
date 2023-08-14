
export class Dhs_personajes {
  constructor() {
    this.ready = true;
  }

  obtenerPersonaje(nombre) {
    return this.personajes[nombre];
  }
  personajes = {
    lupe: {
      idUsarHTML: "lupe",
      tipoPersonaje: "lupe",
      clasePersonaje: "PersonajeMovibleSimple",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "lupe" },
      },
      estadoInicial: "normal",
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
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
          // mensaje: "¡We are the Champions!",
        },
      ],
      configPosicionamiento: {},
    },
    lodo: {
      idUsarHTML: "lodo",
      tipoPersonaje: "lodo",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "lodo" },
      },
      estadoInicial: "normal",
      direccionInicial: 0,
      zIndex: 1,
      rotable: false,
      colisiones: [],
      configPosicionamiento: {
        excluyente: false,
      },
    },
    cofre: {
      idUsarHTML: "cofre",
      tipoPersonaje: "cofre",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "cofre" },
        abierto: { name: "abierto", imageUrl: "cofreAbierto" },
      },
      estadoInicial: "cerrado",
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      colisiones: [],
    },
    pasto: {
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
    },
    arbol: {
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
    },
    barrera: {
      tipoPersonaje: "barrera",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "barrera" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
    },
    basura: {
      idUsarHTML: "basura",
      tipoPersonaje: "basura",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "basura" },
        juntado: { name: "juntado", imageUrl: "pasto" }
      },
      estadoInicial: "normal",
      zIndex: 2,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      colisiones: [],
      paddingImagen: "1px",
    },
    lapiz: {
      idUsarHTML: "lapiz",
      tipoPersonaje: "lapiz",
      clasePersonaje: "PersonajeDibujante",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "lapizRojo" },
      },
      estadoInicial: "normal",
      zIndex: 3,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: true,
      colisiones: [],
    },
    fondo: {
      idUsarHTML: "recuadro-pintable",
      tipoPersonaje: "recuadro-pintable",
      tieneTooltip: false,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: null },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      colorFondoInicial: "white",
      rotable: false,
    },
    recuadroPintableDeseado: {
      idUsarHTML: "recuadro-pintable",
      tipoPersonaje: "recuadro-pintable",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: null },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      colorFondoInicial: "lightgrey",
      rotable: false,
    },
    agua: {
      idUsarHTML: "agua",
      tipoPersonaje: "agua",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "agua" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    juncoPastoDelta : {
      idUsarHTML: "juncoPastoDelta",
      tipoPersonaje: "juncoPastoDelta",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "juncoPastoDelta" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    lancha: {
      idUsarHTML: "lancha",
      tipoPersonaje: "lancha",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "lancha" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 90,
      zIndex: 3,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [
        {
          con: "juncoPastoDelta",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra los juncos.",
        },
        {
          con: "plantaReciclajePastoDelta",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.llegarPlanta();
          },
        },
      ],
    },
    plastico:{
      idUsarHTML: "plastico",
      tipoPersonaje: "plastico",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "plastico" },
        juntado: { name: "juntado", imageUrl: "agua" }
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    plantaRecicladora: {
      idUsarHTML: "plantaReciclajePastoDelta",
      tipoPersonaje: "plantaReciclajePastoDelta",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "plantaReciclajePastoDelta" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    calle: {
      idUsarHTML: "calle",
      tipoPersonaje: "calle",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "calle" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    edificiosSendero: {
      idUsarHTML: "edificiosSendero",
      tipoPersonaje: "edificiosSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "edificiosSendero" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    carpincho: {
      idUsarHTML: "carpincho",
      tipoPersonaje: "carpincho",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "carpincho" },
      },
      estadoInicial: "normal",
      posicionInicialY: 3,
      posicionInicialX: 0,
      direccionInicial: 90,
      zIndex: 3,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [
        {
          con: "juncoPastoDelta",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un junco!",
        },
        {
          con: "pastoDelta",
          factorDeAvance: 1,
          mensaje: "¡Extrañana el pasto!",
        },
        {
          con: "edificiosSendero",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un edificio.",
        },
        {
          con: "autoArriba",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un auto.",
        },
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
        },
      ],
    },
    pastoDelta:{
      idUsarHTML: "pastoDelta",
      tipoPersonaje: "pastoDelta",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "pastoDelta" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      colisiones: [],
      paddingImagen: "1px",
    },
    autoArriba:{
      idUsarHTML: "autoArriba",
      tipoPersonaje: "autoArriba",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "autoArriba" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    bandera:{
      idUsarHTML: "bandera",
      tipoPersonaje: "bandera",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bandera" },
        abierto: { name: "abierto", imageUrl: "bandera" },
      },
      estadoInicial: "cerrado",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      colisiones: [],
      paddingImagen: "1px",
    },
    pato:{
      idUsarHTML: "pato",
      tipoPersonaje: "pato",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "pato" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 3,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [
        {
          con: "juncoPastoDelta",
          factorDeAvance: 0.7,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Por aquí no puedo nadar.",
        },
        {
          con: "plastico",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡CUACK, NO! Hay demasiada basura",
        },
  
        {
          con: "familiaPato",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.llegarALaFamilia();
              },
        },
        
      ],
    },
    familiaPato:{
      idUsarHTML: "familiaPato",
      tipoPersonaje: "familiaPato",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "familiaPato" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 1,
      rotable: false,
      colisiones: [],
      paddingImagen: "1px"
    },
    escuelaSendero : {
      idUsarHTML: "escuelaSendero",
      tipoPersonaje: "escuelaSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "escuelaSendero" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    edificiosSendero: {
      idUsarHTML: "edificiosSendero",
      tipoPersonaje: "edificiosSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "edificiosSendero" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    ciclista:{
      idUsarHTML: "ciclista",
      tipoPersonaje: "ciclista",
      clasePersonaje: "PersonajeMovibleSimple",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "ciclista" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 3,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [
        {
          con: "pastoSendero",
          factorDeAvance: 1,
          mensaje: "¡Qué lindo ir por el parque!",
        },
        {
          con: "escuelaSendero",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.llegarEscuela();
          },
          mensaje: "¡Llegué justo para mi clase de inglés!",
        },
        {
          con: "arbolesSendero",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un árbol.",
        },
        {
          con: "edificiosSendero",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un edificio.",
        },
        {
          con: "barrera",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra una barrera.",
        },
        {
          con: "autoEmbotelladoDer",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un auto.",
        },
        {
          con: "autoEmbotelladoIzq",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un auto.",
        },
        {
          con: "casaSendero",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra mi casa.",
        },
      ],
    },
    casaSendero:{
      idUsarHTML: "casaSendero",
      tipoPersonaje: "casaSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "casaSendero" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    pastoSendero:{
      idUsarHTML: "pastoSendero",
      tipoPersonaje: "pastoSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "pastoSendero" },
      },
      estadoInicial: "normal",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      colisiones: [],
      paddingImagen: "1px",
    },
    arbolesSendero:{
      idUsarHTML: "arbolesSendero",
      tipoPersonaje: "arbolesSendero",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "arbolesSendero" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    autoEmbotelladoIzq:{
      idUsarHTML: "autoEmbotelladoIzq",
      tipoPersonaje: "autoEmbotelladoIzq",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "autoEmbotelladoIzq" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 3,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    autoEmbotelladoDer:{
      idUsarHTML: "autoEmbotelladoDer",
      tipoPersonaje: "autoEmbotelladoDer",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "autoEmbotelladoDer" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
      paddingImagen: "1px"
    },
    cerco: {
      tipoPersonaje: "arbol",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "cerco" },
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
    },
    conejo: {
      idUsarHTML: "conejo",
      tipoPersonaje: "conejo",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "conejoDeArriba" },
      },
      estadoInicial: "normal",
      posicionInicialY: 1,
      posicionInicialX: 1,
      direccionInicial: 180,
      zIndex: 3,
      rotable: true,
      paddingImagen: "0.3px",
      colisiones: [
        {
          con: "madriguera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
          // mensaje: "¡We are the Champions!",
        },
        {
          con: "arbol",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un árbol",
        },
      ],
    },
    zanahoria:{
      idUsarHTML: "zanahoria",
      tipoPersonaje: "zanahoria",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "zanahoriaEnterrada" }, 
        abierto: { name: "normal", imageUrl: "zanahoriaCosechada" },
        juntado: { name: "juntado", imageUrl: "pasto" },
      },
      estadoInicial: "cerrado",
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      colisiones: [],
    },
    madriguera: {
      idUsarHTML: "madriguera",
      tipoPersonaje: "madriguera",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "madriguera" },
        abierto: { name: "abierto", imageUrl: "madriguera" }, 
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      colisiones: [],
    },
    minero: {
      idUsarHTML: "minero",
      tipoPersonaje: "minero",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "minero" },
      },
      estadoInicial: "normal",
      direccionInicial: 90,
      zIndex: 3,
      rotable: false,
      colisiones: [
        {
          con: "piedra",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra una piedra.",
        },
        {
          con: "piedraDiamante",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra una piedra.",
        },
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
          // mensaje: "¡We are the Champions!",
        },
      ],
    },
    piedra: {
      idUsarHTML: "piedra",
      tipoPersonaje: "piedra",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "piedra" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    piedraDiamante: {
      idUsarHTML: "piedraDiamante",
      tipoPersonaje: "piedraDiamante",
      estadosPosibles: {
        abierto: { name: "abierto", imageUrl: "piedraDiamante" },
        juntado: { name: "juntado", imageUrl: "caminoCueva" },
      },
      estadoInicial: "abierto", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    caminoCueva: {
      idUsarHTML: "caminoCueva",
      tipoPersonaje: "camino",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "caminoCueva" },
      },
      estadoInicial: "normal", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 0,
      paddingImagen: "0.5px",
      rotable: false,
      colisiones: [],
    },
    diamante: {
      idUsarHTML: "diamante",
      tipoPersonaje: "diamante",
      estadosPosibles: {
        abierto: { name: "abierto", imageUrl: "diamante" },
        juntado: { name: "juntado", imageUrl: "caminoCueva" },
      },
      estadoInicial: "abierto", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "7px",
      colisiones: [],
    },
    cofreCerrado: {
      idUsarHTML: "cofreCerrado",
      tipoPersonaje: "cofreCerrado",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "cofreCerrado" },
      },
      estadoInicial: "cerrado",
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      colisiones: [],
      configPosicionamiento: {
        excluyente: false,
      },
    },
    panda: {
      idUsarHTML: "panda",
      tipoPersonaje: "panda",
      clasePersonaje: "PersonajeMovibleSimple",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "panda" },
      },
      estadoInicial: "normal",
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
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
          // mensaje: "¡We are the Champions!",
        },
      ],
      configPosicionamiento: {},
    },
    bamboo: {
      idUsarHTML: "bamboo",
      tipoPersonaje: "bamboo",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bamboo" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    bambooAncho: {
      idUsarHTML: "bambooAncho",
      tipoPersonaje: "bambooAncho",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bambooAncho" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0px",
      colisiones: [],
    },
    frutilla: {
      idUsarHTML: "frutilla",
      tipoPersonaje: "frutilla",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "frutilla" },
        abierto: { name: "normal", imageUrl: "agua" },
        juntado: { name: "juntado", imageUrl: "agua" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    nubes: {
      idUsarHTML: "nubes",
      tipoPersonaje: "nubes",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "nubes" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    pajaro: {
      idUsarHTML: "pajaro",
      tipoPersonaje: "pajaro",
      clasePersonaje: "PersonajeMovibleGrados",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "pajaro" },
      },
      estadoInicial: "normal",
      direccionInicial: 90,
      zIndex: 3,
      rotable: true,
      colisiones: [
        {
          con: "nube",
          factorDeAvance: 0.7,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! No veo nada... no puedo seguir avanzando.",
        },
        {
          con: "avion",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! Choqué contra un avión.",
        },
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaIsla();
          },
          // mensaje: "¡We are the Champions!",
        },
      ],
    },
    nubesCielo: {
      idUsarHTML: "nubesCielo",
      tipoPersonaje: "nubes",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "nubesCielo" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
  };
}


