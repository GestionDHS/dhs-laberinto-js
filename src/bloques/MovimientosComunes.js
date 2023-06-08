import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

// Blockly.JavaScript = new Blockly.Generator("JavaScript");
// bloque mover abajo
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_down_param",
    message0: "mover abajo %1 casillas",
    args0: [
      {
        type: "field_number",
        name: "CASILLAS",
        value: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
    extensions: ["move_down_param_validation"],
  },
]);

Blockly.Extensions.register("move_down_param_validation", function () {
  this.setOnChange(function (event) {
    const casillas = this.getFieldValue("CASILLAS");
    const valid = casillas >= 1;
    this.setWarningText(
      valid
        ? null
        : `El número de casillas (${casillas}) no puede ser menor a 1.`
    );
  });
});

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_down_param"] = function (block) {
  const casillas = this.getFieldValue("CASILLAS");
  const code = "moverAbajo(" + casillas + ");\n";
  return code;
};
// ---------------------------------
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "move_down_simple",
    "message0": "mover abajo",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    //tooltip: "moverAbajo()",
  },
]);

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_down_simple"] = function (block) {
  miJuego.listaDePersonajes[30].moverAbajo();
  const code = "moverAbajo();\n";
  // return code;
  console.log("estoy en mover abajo");
  //console.log(miJuego.listaDePersonajes[30]);

  return code;
};

//BLOQUE MOVER ARRIBA
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_up_param",
    message0: "mover arriba %1 casillas",
    args0: [
      {
        type: "field_number",
        name: "CASILLAS",
        value: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
    extensions: ["move_up_param_validation"],
  },
]);

Blockly.Extensions.register("move_up_param_validation", function () {
  this.setOnChange(function (event) {
    const casillas = this.getFieldValue("CASILLAS");
    const valid = casillas >= 1;
    this.setWarningText(
      valid
        ? null
        : `El número de casillas (${casillas}) no puede ser menor a 1.`
    );
  });
});

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_up_param"] = function (block) {
  const casillas = this.getFieldValue("CASILLAS");
  const code = "moverArriba(" + casillas + ");\n";
  return code;
};

Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_up_simple",
    message0: "mover arriba",
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
  },
]);

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_up_simple"] = function (block) {
  const code = "moverArriba();\n"
  //miJuego.listaDePersonajes[30].moverArriba();
  return code;
};

//BLOQUE MOVER DERECHA
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_right_param",
    message0: "mover a la derecha %1 casillas",
    args0: [
      {
        type: "field_number",
        name: "CASILLAS",
        value: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
    extensions: ["move_right_param_validation"],
  },
]);

Blockly.Extensions.register("move_right_param_validation", function () {
  this.setOnChange(function (event) {
    const casillas = this.getFieldValue("CASILLAS");
    const valid = casillas >= 1;
    this.setWarningText(
      valid
        ? null
        : `El número de casillas (${casillas}) no puede ser menor a 1.`
    );
  });
});

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_right_param"] = function (block) {
  const casillas = this.getFieldValue("CASILLAS");
  const code = "moverDerecha(" + casillas + ");\n";
  return code;
};
// -------------------
// Use Blockly's custom block JSON API to define a new block type.
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "move_right_simple",
    "message0": "mover a la derecha",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "moverDerecha()",
    // "args1": [
    //   {
    //     "type": "input_statement",
    //     "name": "MOVERDERECHA",
    //   },
    // ],
  },
]);

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_right_simple"] = function (block) {
  miJuego.listaDePersonajes[30].moverDerecha();
  // console.log(miJuego.listaDePersonajes[30]);
  console.log("estoy en mover derecha- moverDerecha()");
  //Blockly.Tooltip.setCustomTooltip()
  const code = "moverDerecha()";

  return code;
};

//BLOQUE MOVER IZQUIERDA
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_left_param",
    message0: "mover a la izquierda %1 casillas",
    args0: [
      {
        type: "field_number",
        name: "CASILLAS",
        value: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
    extensions: ["move_left_param_validation"],
  },
]);

Blockly.Extensions.register("move_left_param_validation", function () {
  this.setOnChange(function (event) {
    const casillas = this.getFieldValue("CASILLAS");
    const valid = casillas >= 1;
    this.setWarningText(
      valid
        ? null
        : `El número de casillas (${casillas}) no puede ser menor a 1.`
    );
  });
});

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_left_param"] = function (block) {
  const casillas = this.getFieldValue("CASILLAS");
  const code = "moverIzquierda(" + casillas + ");\n";
  return code;
};
// -----------------------------------
// Use Blockly's custom block JSON API to define a new block type.
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "move_left_simple",
    message0: "mover a la izquierda",

    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
  },
]);

// Define how to generate JavaScript from the custom block.
javascriptGenerator["move_left_simple"] = function (block) {
  const code = "moverIzquierda();\n"
  // return code
  miJuego.listaDePersonajes[30].moverIzquierda();
  return code;
};
