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
      configPosicionamiento: {
        excluyente: false,
      },
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
      },
      estadoInicial: "normal",
      zIndex: 1,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      rotable: false,
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
      idUsarHTML: "fondo",
      tipoPersonaje: "fondo",
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
  };
}


