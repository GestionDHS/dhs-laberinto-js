import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import { Dhs_personajes } from "../../clases/Dhs-personajes";
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);
const dimensiones = [7, 8]; //fila, columna

const tablero = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
const coordenadasCaminoPared = generarCoordenadas(tablero);
//Me traigo los personajes a Utilizar
const personajesGaleria = new Dhs_personajes();
const recuadroPintableDeseado = personajesGaleria.obtenerPersonaje("recuadroPintableDeseado");
const fondo = personajesGaleria.obtenerPersonaje("fondo");
const lapiz = personajesGaleria.obtenerPersonaje("lapiz");
//Instancio las estrategias para crear los personajes
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [fondo],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [recuadroPintableDeseado],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [lapiz],
    posiciones: [[3, 0]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
]

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "lapizRojo",
  texto: "Lograste realizar el dibujo",
  oculto: true,
};
miJuego.generarEscenario(dimensiones, 2.5, "white");
miJuego.agregarModal(datosModal);
//Crear los personajes
miJuego.crearPersonajes(conjuntosDePersonajes);
//Setear el Personaje Principal
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[56]);

const miColor = "#FA3939";
const dibujoDeseado = tablero.map((row) =>
  row.map((cell) => (cell === 1 ? false : miColor))
);

miJuego.personajePrincipal.dibujoDeseado = dibujoDeseado;


// BLOCKLY ------------------------------------------------------
const miControlador = new ControladorStandard(miJuego,velocidadInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Lápiz","Repeticiones"])

const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["avanzar_param", "Movimientos"],
  ["girar_clasico", "Movimientos"],
  ["lapiz", "Lápiz"],
  ["repeat_times", "Repeticiones"],
];

const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';
//const bloquesPrecargadosJSON ='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69,"inputs":{"EVENT":{"block":{"type":"avanzar_param","id":"=#y0[*$GJ+W{WlW|MSqI","fields":{"CASILLAS":1},"next":{"block":{"type":"girar_derecha","id":"^*0eVn,V}s/U%UV3z|d;"}}}}}}]}}'
const funcionesAExponer=["avanzar","girarIzquierda","girarDerecha","girarGrados","apuntarEnDireccion","bajarLapiz","subirLapiz","setearColor",]

configurarYRenderizarToolbox(miControlador,categoriaElegida,ordenJerarquicoBloques,bloquesPrecargadosJSON,funcionesAExponer)
