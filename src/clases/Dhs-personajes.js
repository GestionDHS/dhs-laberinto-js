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
      posicionInicialX: 0,
      direccionInicial: 0,
      direccionInicial: 0,
      rotable: true,
      colisiones: [],
    },
    fondoGrisClaro: {
        idUsarHTML: "fondoGrisClaro",
        tipoPersonaje: "fondoGrisClaro",
        tieneTooltip: false,
        estadosPosibles: {
          normal: { name: "normal", imageUrl: "calleClara" },
        },
        estadoInicial: "normal",
        zIndex: 1,
        posicionInicialX: 0,
        direccionInicial: 0,
        direccionInicial: 0,
        rotable: false,
      },
      fondoGrisOscuro: {
        idUsarHTML: "fondoGrisOscuro",
        tipoPersonaje: "fondoGrisOscuro",
        tieneTooltip: false,
        estadosPosibles: {
          normal: { name: "normal", imageUrl: "calle" },
        },
        estadoInicial: "normal",
        zIndex: 1,
        posicionInicialX: 0,
        direccionInicial: 0,
        direccionInicial: 0,
        rotable: false,
      },
  };
}
