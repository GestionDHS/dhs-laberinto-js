export class Dhs_personajes {
  constructor() {
    this.ready = true;
  }

  obtenerPersonaje(nombre) {
    return this.personajes[nombre];
  }
  personajes = {
    plantarSemilla: {
      idUsarHTML: "plantarSemilla",
      tipoPersonaje: "plantarSemilla",
      tieneTooltip: true,
      estadosPosibles: {
        fondoGris: { name: "fondoGris", imageUrl: "fondoGris" },
        ponerMaceta: { name: "tomarUnaMaceta", imageUrl: "tomarUnaMaceta" },
        ponerTierra: { name: "ponerTierra", imageUrl: "ponerTierra" },
        hacerHueco: { name: "hacerHueco", imageUrl: "hacerHueco" },
        ponerSemilla: { name: "ponerSemilla", imageUrl: "ponerSemilla" },
        taparConTierra: { name: "taparConTierra", imageUrl: "taparConTierra" },
        regar: { name: "regar", imageUrl: "regar" },
      },
      estadoInicial: "fondoGris",
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [],
      configPosicionamiento: {},
    },
    rutina: {
      idUsarHTML: "rutina",
      tipoPersonaje: "rutina",
      tieneTooltip: true,
      estadosPosibles: {
        enLaCama: { name: "enLaCama", imageUrl: "enLaCama" },
        levantandose: { name: "levantandose", imageUrl: "levantarseDeLacama" },
        desayunando: { name: "desayunando", imageUrl: "desayunar" },
        lavandose: { name: "lavandose", imageUrl: "lavarseLaCara" },
        cepillandose: { name: "cepillandose", imageUrl: "cepillarseDientes" },
        vistiendose: { name: "vistiendose", imageUrl: "ropa" },
        saliendo: { name: "saliendo", imageUrl: "salirDeCasa" },
      },
      estadoInicial: "enLaCama",
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [],
      configPosicionamiento: {},
    },
    circuloAmarillo: {
      idUsarHTML: "circuloAmarillo",
      tipoPersonaje: "circuloAmarillo",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "circuloAmarilloTransparente" },
      },
      estadoInicial: "normal",
      direccionInicial: 0,
      zIndex: 2,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [],
      configPosicionamiento: {},
    },
    flechaAmarilla: {
      idUsarHTML: "flechaAmarilla",
      tipoPersonaje: "flechaAmarilla",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "flechaAmarilla" },
      },
      estadoInicial: "normal",
      direccionInicial: 0,
      zIndex: 1,
      rotable: true,
      paddingImagen: "5px",
      colisiones: [],
      configPosicionamiento: {},
    },
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
      colisiones: [],
    },
    collar: {
      idUsarHTML: "collar",
      tipoPersonaje: "collar",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "collar" },
        abierto: { name: "abierto", imageUrl: "collar" },
      },
      estadoInicial: "cerrado",
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
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
      paddingImagen: "1px",
      rotable: false,
    },
    pastoCielo: {
      idUsarHTML: "camino",
      tipoPersonaje: "camino",
      pintable: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "pastoCielo" },
      },
      estadoInicial: "normal",
      zIndex: 2,
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
    cielo: {
      idUsarHTML: "cielo",
      tipoPersonaje: "cielo",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "cielo" },
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
    plantaRecicladoraSinFondo: {
      idUsarHTML: "plantaReciclajePastoDelta",
      tipoPersonaje: "plantaReciclajePastoDelta",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "plantaReciclajePastoDeltaSinFondo" },
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
          mensaje: "¡Extrañaba el pasto!",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
      paddingImagen: "1px",
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
        trepando: { name: "normal", imageUrl: "pandaTrepadorSinFondo" },
        izquierda: { name: "normal", imageUrl: "pandaIzquierda" },
        derecha: { name: "normal", imageUrl: "panda" },
      },
      estadoInicial: "normal",
      direccionInicial: 0,
      zIndex: 4,
      rotable: true,
      colisiones: [
        {
          con: "bandera",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaBandera();
          },
          // mensaje: "¡We are the Champions!",
        },
        {
          con: "hamacaNeumatico",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaHamaca();
          },
        },
        {
          con: "estrella",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaEstrella();
          },
        },
        {
          con: "cielo",
          factorDeAvance: 0.4,
          callback: (x) => {
            x.decirTerminar("¡OH! ¡No sé volar!");
          },
        },
        {
          con: "bambooIzqHoja",
          factorDeAvance: 0.2,
          callback: (x) => {
            x.decirTerminar("¡OH! ¡Me voy a caer si piso aquí!");
          },
        },
      ],
      configPosicionamiento: {},
    },
    arbol1: {
      idUsarHTML: "arbol1",
      tipoPersonaje: "arbol1",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "arbol1" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    arbol2: {
      idUsarHTML: "arbol2",
      tipoPersonaje: "arbol2",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "arbol2" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    arbol3: {
      idUsarHTML: "arbol3",
      tipoPersonaje: "arbol3",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "arbol3" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    arbol4: {
      idUsarHTML: "arbol4",
      tipoPersonaje: "arbol4",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "arbol4" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    hamacaNeumatico: {
      idUsarHTML: "hamacaNeumatico",
      tipoPersonaje: "hamacaNeumatico",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "hamacaNeumatico" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    arbol5: {
      idUsarHTML: "arbol5",
      tipoPersonaje: "arbol5",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "arbol5" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    bamboo: {
      idUsarHTML: "bamboo",
      tipoPersonaje: "bamboo",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bamboo" },
        abierto: { name: "normal", imageUrl: "agua" },
        juntado: { name: "juntado", imageUrl: "agua" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
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
      zIndex: 3,
      rotable: false,
      paddingImagen: "0px",
      colisiones: [],
    },
    bambooAnchoCamino: {
      idUsarHTML: "bambooAnchoCamino",
      tipoPersonaje: "bambooAnchoCamino",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bambooAnchoCamino" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    bambooCieloCamino: {
      idUsarHTML: "bambooCieloCamino",
      tipoPersonaje: "bambooCieloCamino",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bambooCieloCamino" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    bambooIzqHoja: {
      idUsarHTML: "bambooIzqHoja",
      tipoPersonaje: "bambooIzqHoja",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bambooIzqHoja" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    bambooDerechoHoja: {
      idUsarHTML: "bambooDerechoHoja",
      tipoPersonaje: "bambooDerechoHoja",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "bambooDerechoHoja" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    tierra: {
      idUsarHTML: "tierra",
      tipoPersonaje: "tierra",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "tierra" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 1,
      rotable: false,
      paddingImagen: "0px",
      colisiones: [],
    },
    tierraPasto: {
      idUsarHTML: "tierraPasto",
      tipoPersonaje: "tierraPasto",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "tierraPasto" },
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
    estrella: {
      idUsarHTML: "estrella",
      tipoPersonaje: "estrella",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "estrella" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    estrellaSinFondo: {
      idUsarHTML: "estrellaSinFondo",
      tipoPersonaje: "estrellaSinFondo",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "estrellaSinFondo" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    frutilla: {
      idUsarHTML: "frutilla",
      tipoPersonaje: "frutilla",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "frutilla" },
        abierto: { name: "normal", imageUrl: "" },
        juntado: { name: "juntado", imageUrl: "" },
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    noPersonaje: {
      idUsarHTML: "noPersonaje",
      tipoPersonaje: "noPersonaje",
      estadosPosibles: {
        cerrado: { name: "cerrado", imageUrl: "" }
      },
      estadoInicial: "cerrado", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 0,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    nubes: {
      idUsarHTML: "nubes",
      tipoPersonaje: "nubes",
      estadosPosibles: {
        normal: { normal: "normal", imageUrl: "nubes" },
      },
      estadoInicial: "normal", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "1px",
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
      direccionInicial: 180,
      zIndex: 3,
      rotable: true,
      colisiones: [
        {
          con: "nubes",
          factorDeAvance: 0.7,
          callback: (x) => {
            x.terminar();
          },
          mensaje: "¡OH NO! No veo nada... no puedo seguir avanzando.",
        },
        {
          con: "nubesCielo",
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
          mensaje: "¡OH NO! Hay aviones por aquí ... no puedo pasar..." 
        },
        {
          con: "isla",
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
        normal: { name: "normal", imageUrl: "nubesCielo" },
      },
      estadoInicial: "normal", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 1,
      rotable: false,
      paddingImagen: "1px",
      colisiones: [],
    },
    avion: {
      idUsarHTML: "avion",
      tipoPersonaje: "avion",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "avion" },
      },
      estadoInicial: "normal", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    isla: {
      idUsarHTML: "isla",
      tipoPersonaje: "isla",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "isla" },
      },
      estadoInicial: "normal", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 2,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    bombero: {
      idUsarHTML: "bombero",
      tipoPersonaje: "bombero",
      clasePersonaje: "PersonajeMovibleSimple",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "bombero",imagenUrl2:"chorroAgua" },
      },
      estadoInicial: "normal",
      direccionInicial: 90,
      zIndex: 4,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [
        {
          con: "fuego",
          factorDeAvance: 1,
          callback: (x) => {
            x.evaluar();
          },
          // mensaje: "¡AY Me quemo!",
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
          con: "estacionBomberos",
          factorDeAvance: 1,
          callback: (x) => {
            x.llegarALaEstacionBomberos();
          },
          // mensaje: "¡We are the Champions!",
        },
      ],
      configPosicionamiento: {},
    },
    estacionBomberos: {
      idUsarHTML: "estacionBomberos",
      tipoPersonaje: "estacionBomberos",
      clasePersonaje: "PersonajeMovibleSimple",
      tieneTooltip: true,
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "estacionBomberos"},
      },
      estadoInicial: "normal",
      direccionInicial: 0,
      zIndex: 3,
      rotable: true,
      paddingImagen: "1px",
      colisiones: [],
      configPosicionamiento: {},
    },
    fuego: {
      idUsarHTML: "fuego",
      tipoPersonaje: "fuego",
      estadosPosibles: {
        fuegoCero: { name: "fuegoCero", imageUrl: "fuegoCero" },
        fuegoUno: { name: "fuegoUno", imageUrl: "fuegoUno" },
        fuegoDos: { name: "fuegoDos", imageUrl: "fuegoDos" },
        fuegoTres: { name: "fuegoTres", imageUrl: "fuegoTres" },
        fuegoCuatro: { name: "fuegoCuatro", imageUrl: "fuegoCuatro" },
      },
      estadoInicial: "fuegoCuatro", 
      posicionInicialY: 0,
      posicionInicialX: 0,
      direccionInicial: 0,
      zIndex: 3,
      rotable: false,
      paddingImagen: "0.5px",
      colisiones: [],
    },
    chorroAgua: {
      idUsarHTML: "chorroAgua",
      tipoPersonaje: "chorroAgua",
      estadosPosibles: {
        normal: { name: "normal", imageUrl: "chorroAgua" },
      },
      estadoInicial: "normal", 
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


