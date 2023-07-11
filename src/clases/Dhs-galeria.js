import robotlupe from "../img/robotlupe.png"
import lodoPasto from "../img/lodoPasto.png"
import cofrecerradoPasto from "../img/cofrecerradoPasto.png"
import cofreAbierto from "../img/cofreabierto.png"
import arbolesPasto from "../img/arbolesPasto.png"
import muchasmonedas from "../img/muchasMonedas.png"
import pasto from "../img/pasto.png"
import basura from "../img/basura.png"
import lapizRojo from "../img/lapizRojo.png"
import bandera from "../img/banderaRoja.png"
import cerco from "../img/cercoPasto.png"
import conejo from "../img/conejo.png"
import zanahoriaEnterrada from "../img/zanahoriaEnterrada.png"
import zanahoriaCosechada from "../img/zanahoriaCosechada.png"
import conejoDeArriba from "../img/conejoDeArriba.png"
import madriguera from "../img/madriguera.png"
import autoEmbotelladoIzq from "../img/autoEmbotelladoIzq.png"
import autoEmbotelladoDer from "../img/autoEmbotelladoDer.png"
import barrera from "../img/barrera.png"
import casaSendero from "../img/casaSendero.png"
import escuelaSendero from "../img/escuelaSendero.png"
import edificiosSendero from "../img/edificiosSendero.png"
import arbolesSendero from "../img/arbolesSendero.png"
import calle from "../img/calle.png"
import pastoSendero from "../img/pastoSendero.png"
import ciclista from "../img/ciclista.png"
import brujula from "../img/brujula.png"

export class DHS_Gallery {
  constructor() {
    this.ready = true;
  }

  //lo pido por clave , o sea arriba,abajo,lupe,etc
  // obtenerImagenes(imagenesJuego) {
  //   return imagenesJuego.forEach((unElemento) => {
  //     this.imageLib[unElemento];
  //   });
  // }

  obtenerUrlDe(unObjeto) {
    return this.imageLib[unObjeto].url;
  }

  obtenerNombreDe(unObjeto) {
    return this.imageLib[unObjeto].nombre;
  }
  obtenerNombreCompletoDe(dir) {
    return this.imageLib[dir].nombre;
  }
  
  imageLib = {
    ciclista: {
      themes: [""],
      url: ciclista,
      nombre: "ciclista",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    pastoSendero: {
      themes: [""],
      url: pastoSendero,
      nombre: "pastoSendero",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    calle: {
      themes: [""],
      url: calle,
      nombre: "calle",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    escuelaSendero: {
      themes: [""],
      url: escuelaSendero,
      nombre: "escuelaSendero",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    edificiosSendero: {
      themes: [""],
      url: edificiosSendero,
      nombre: "edificiosSendero",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/building" title="building icons">Building icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    casaSendero: {
      themes: [""],
      url: casaSendero,
      nombre: "casaSendero",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/home" title="home icons">Home icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    barrera: {
      themes: [""],
      url: barrera,
      nombre: "barrera",
      parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/barrier" title="barrier icons">Barrier icons created by nawicon - Flaticon</a></p>',
      showLicense: true,
    },
    autoEmbotelladoIzq: {
      themes: [""],
      url: autoEmbotelladoIzq,
      nombre: "autoEmbotelladoIzq",
      parrafoLicencia: '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    autoEmbotelladoDer: {
      themes: [""],
      url: autoEmbotelladoDer,
      nombre: "autoEmbotelladoDer",
      parrafoLicencia: '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    arbolesSendero: {
      themes: [""],
      url: arbolesSendero,
      nombre: "arbolesSendero",
      parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    conejoDeArriba: {
      themes: [""],
      url: conejoDeArriba,
      nombre: "conejoDeArriba",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    conejo: {
      themes: [""],
      url: conejo,
      nombre: "conejo",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    madriguera: {
      themes: [""],
      url: madriguera,
      nombre: "madriguera",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    zanahoriaEnterrada: {
      themes: [""],
      url: zanahoriaEnterrada,
      nombre: "zanahoriaEnterrada",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    zanahoriaCosechada: {
      themes: [""],
      url: zanahoriaCosechada,
      nombre: "zanahoriaCosechada",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    lapizRojo: {
      themes: [""],
      url: lapizRojo,
      nombre: "lapizRojo",
      parrafoLicencia:
        '<p>Imagen desarrollada por Digital House</p>',
      showLicense: true,
    },
    basura: {
      themes: ["lupe"],
      url: basura,
      nombre: "basura",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/garbage" title="garbage icons">Garbage icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
     lupe: {
      themes: ["lupe"],
      url: robotlupe,
      nombre: "Lupe",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    arboles: {
      themes: ["lupe"],
      url: arbolesPasto,
      nombre: "Árboles",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    cerco: {
      themes: ["cerco"],
      url: cerco,
      nombre: "Cerco",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    pasto: {
      themes: ["lupe"],
      url: pasto,
      nombre: "Pasto",
      parrafoLicencia: "<p>Digital House</p>",
    },
    cofre: {
      themes: ["lupe"],
      url: cofrecerradoPasto,
      nombre: "Cofre Cerrado",
      parrafoLicencia:
        '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    cofreAbierto: {
      themes: ["lupe"],
      url: cofreAbierto,
      nombre: "Cofre Abierto",
      parrafoLicencia:
        '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    monedas: {
      themes: ["lupe"],
      url: muchasmonedas,
      nombre: "Monedas",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/monedas" title="monedas iconos">Monedas iconos creados por turkkub - Flaticon</a></p>',
      showLicense: true,
    },
    lodo: {
      themes: ["lupe"],
      url: lodoPasto,
      nombre: "Lodo",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tropical" title="tropical icons">Tropical icons created by Marz Gallery - Flaticon</a></p>',
      showLicense: true,
    },
    llave: {
      themes: ["lupe"],
      url: "../../img/bloques/llave-square-blanco.png",
      nombre: "Abrir Cofre",
      parrafoLicencia:
        '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    brujula: {
      themes: ["lupe"],
      url: brujula,
      nombre: "Brújula",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/brujula" title="brújula iconos">Brújula iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    bandera: {
      themes: ["lupe"],
      url: bandera,
      nombre: "Bandera",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/bandera-roja" title="bandera-roja iconos">Bandera-roja iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    collar: {
      themes: ["lupe"],
      url: "../lupe-commons/img/collar-perlas.png",
      nombre: "Perlas",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/perla" title="perla iconos">Perla iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    void: {
      themes: [],
      url: "../delta-commons/img/void.png",
      nombre: "Vacío",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloAmarilloTransparente: {
      themes: [],
      url: "../city-commons/img/circulo-amarillo-transparente.png",
      nombre: "Circulo Amarillo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloVerdeTransparente: {
      themes: [],
      url: "../delta-commons/img/circulo-verde-transparente.png",
      nombre: "Circulo Verde",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloRojoTransparente: {
      themes: [],
      url: "../delta-commons/img/circulo-rojo-transparente.png",
      nombre: "Circulo Rojo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    // for theme delta
    agua: {
      themes: ["delta"],
      url: "../delta-commons/img/agua.png",
      nombre: "Agua",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    pastoDelta: {
      themes: ["delta"],
      url: "../delta-commons/img/pasto-delta.png",
      nombre: "Pasto Delta",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    juncoPastoDelta: {
      themes: ["delta"],
      url: "../delta-commons/img/junco-pasto-delta.png",
      nombre: "Juncos",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    carpincho: {
      themes: ["delta"],
      url: "../delta-commons/img/carpincho-arriba.png",
      nombre: "Martín el Carpincho",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    pato: {
      themes: ["delta"],
      url: "../delta-commons/img/pato-arriba.png",
      nombre: "Pato Miguel",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: false,
    },
    lancha: {
      themes: ["delta"],
      url: "../delta-commons/img/lancha.png",
      nombre: "Lancha",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    plantaReciclajePastoDelta: {
      themes: ["delta"],
      url: "../delta-commons/img/planta-reciclaje-pasto-delta.png",
      nombre: "Planta Reciclaje",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/recycling-plant" title="recycling plant icons">Recycling plant icons created by surang - Flaticon</a></p>',
      showLicense: true,
    },
    reciclar: {
      themes: ["delta"],
      url: "../../img/bloques/reciclar-blanco.png",
      nombre: "Planta Reciclaje",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="" title="Tempo_doloe"> Tempo_doloe </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    plastico: {
      themes: ["delta"],
      url: "../delta-commons/img/plastico-agua.png",
      nombre: "Plástico",
      parrafoLicencia:
        '<p> Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon"> wanicon </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>',
      showLicense: true,
    },
    ecobrick: {
      themes: ["delta"],
      url: "../delta-commons/img/ecobrick.jpg",
      nombre: "Ecobrick",
      parrafoLicencia: "unknown",
      showLicense: false,
    },
    realCarpincho: {
      themes: ["delta"],
      url: "../delta-commons/img/real-carpincho.png",
      nombre: "Carpincho Real",
      parrafoLicencia: "unknown",
      showLicense: false,
    },
    rioParana: {
      themes: ["delta"],
      url: "../delta-commons/img/rio-parana.png",
      nombre: "Río Paraná",
      parrafoLicencia: "unknown",
      showLicense: false,
    },
    familiaPato: {
      themes: ["delta"],
      url: "../delta-commons/img/familia-pato.png",
      nombre: "Familia Patorutti",
      parrafoLicencia: "Digital House",
      showLicense: false,
    },
  };
}
