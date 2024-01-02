export default class ConfiguradorBloques {
  constructor() {
    this.toolbox = {
      kind: "categoryToolbox",
      contents: [],
    };
  }

  crearCategoriaToolbox(datosCategoria) {
    this.toolbox.contents.push({
      kind: "category",
      name: datosCategoria.name,
      // custom: datosCategoria.custom,
      // colour: datosCategoria.colour,
      categorystyle: datosCategoria.categorystyle,
      contents: [],
    });
  }

  configurarUnBloqueCustomStandard(
    keywordBloque,
    nombreCategoria = "Acciones"
  ) {
    if (!this[keywordBloque]) {
      throw new Error(
        "No tenemos un método para configurar bloques que coincida con la keyowrd " +
        keywordBloque
      );
    }
    let categoriaBuscada = this.toolbox.contents.find(
      (obj) => obj.kind == "category" && obj.name == nombreCategoria
    );
    if (!categoriaBuscada) {
      throw new Error(
        "No existe la categoría " + nombreCategoria + " en la toolbox"
      );
    } else {
      let generacionBloque = this[keywordBloque]();
      if (Array.isArray(generacionBloque)) {
        categoriaBuscada.contents.push(...generacionBloque);
      } else {
        categoriaBuscada.contents.push(generacionBloque);
      }
    }
  }

  mostrarKeywords() {
    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const methods = [];
    const skip = [
      "constructor",
      "mostrarKeywords",
      "crearCategoriaToolbox",
      "configurarUnBloqueCustomStandard",
    ];
    methodNames.forEach((methodName) => {
      if (typeof this[methodName] === "function") {
        if (!skip.includes(methodName)) {
          methods.push(methodName);
        }
      }
    });
    return methods;
  }

  // --- METODOS DE CONFIGURACION DE BLOQUE ---
  // C/U hace:
  /*
        - Su definición
        - Su registro de "validación"
        - El seteo de su "statement to code" para Blockly.Javascript
        - Retorna el objeto (diccionario) que debe ser usado en Toolbox o un array de objetos (en caso de macro-keywords)
     */

  // BLOQUE "AL EJECUTAR"

  on_execute() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "on_execute",
        message0: "%1 Al ejecutar %2 %3",
        args0: [
          {
            type: "field_image",
            src: "https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_play_circle_filled_white_48px-512.png",
            width: 16,
            height: 16,
            alt: "*",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "EVENT",
          },
        ],
        inputsInline: false,
        // "colour": 230,
        style: "execute_blocks",
        tooltip: "Al presionar 'play', se ejecutarán los bloques que contenga",
        helpUrl: "",
        // "hat": "rounded",
        extensions: ["on_execute_validation"],
      },
    ]);

    Blockly.Extensions.register("on_execute_validation", function () { });

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["on_execute"] = function (block) {
      let code = Blockly.JavaScript.statementToCode(block, "EVENT");
      // console.log(code);
      return code;
    };
    return {
      type: "on_execute",
      kind: "block",
    };
  }

  // ---------------
  // MOVIMIENTOS
  // ---------------

  // MOVIMIENTOS CLASICOS SIN PARAMETROS (SIMPLE)
  move_down_simple() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_down_simple",
        message0: "%1 mover abajo",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784790508314.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
        //tooltip: "moverAbajo()",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["move_down_simple"] = function (block) {
      const code = "moverAbajo();\n";
      return code;
    };

    return {
      type: "move_down_simple",
      kind: "block",
    };
  }
  move_up_simple() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_up_simple",
        message0: "%1 mover arriba",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964785050550748.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["move_up_simple"] = function (block) {
      const code = "moverArriba();\n";
      return code;
    };

    return {
      type: "move_up_simple",
      kind: "block",
    };
  }
  move_trepar_simple() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "mover_trepar_simple",
        message0: "%1 trepar",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964785050550748.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["mover_trepar_simple"] = function (block) {
      const code = "moverArriba();\n";
      return code;
    };

    return {
      type: "mover_trepar_simple",
      kind: "block",
    };
  }
  move_right_simple() {
    // Use Blockly's custom block JSON API to define a new block type.
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_right_simple",
        message0: "%1 mover a la derecha",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784973444275.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
        tooltip: "moverDerecha()",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["move_right_simple"] = function (block) {
      const code = "moverDerecha();\n";
      return code;
    };

    return {
      type: "move_right_simple",
      kind: "block",
    };
  }
  move_left_simple() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_left_simple",
        message0: "%1 mover a la izquierda",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784886798044.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["move_left_simple"] = function (block) {
      const code = "moverIzquierda();\n";
      return code;
    };

    return {
      type: "move_left_simple",
      kind: "block",
    };
  }
  // macro
  move_classic_simple() {
    return [
      this.move_up_simple(),
      this.move_down_simple(),
      this.move_left_simple(),
      this.move_right_simple(),
    ];
  }
  move_sinUp_simple() {
    return [
      this.move_down_simple(),
      this.move_left_simple(),
      this.move_right_simple(),
    ];
  }

  //solo para servir los movimientos de derecha e izquierda
  move_left_right() {
    return [this.move_left_simple(), this.move_right_simple()];
  }

  // MOVIMIENTOS CLASICOS CON PARAMETROS
  move_down_param() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_down_param",
        message0: "%2 mover abajo %1 casillas",
        args0: [
          {
            type: "field_dropdown",
            name: "CASILLAS",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784790508314.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
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
    //cambié javascriptGenerator por  Blockly.JavaScript
    Blockly.JavaScript.forBlock["move_down_param"] = function (block) {
      const casillas = this.getFieldValue("CASILLAS");
      const code = "moverAbajo(" + casillas + ");\n";
      return code;
    };

    return {
      type: "move_down_param",
      kind: "block",
    };
  }
  move_up_param() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_up_param",
        message0: "%2 mover arriba %1 casillas",
        args0: [
          {
            type: "field_dropdown",
            name: "CASILLAS",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964785050550748.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
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
    Blockly.JavaScript.forBlock["move_up_param"] = function (block) {
      const casillas = this.getFieldValue("CASILLAS");
      const code = "moverArriba(" + casillas + ");\n";
      return code;
    };
    return {
      type: "move_up_param",
      kind: "block",
    };
  }
  move_right_param() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_right_param",
        message0: "%2 mover a la derecha %1 casillas",
        args0: [
          {
            type: "field_dropdown",
            name: "CASILLAS",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784973444275.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
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
    Blockly.JavaScript.forBlock["move_right_param"] = function (block) {
      const casillas = this.getFieldValue("CASILLAS");
      const code = "moverDerecha(" + casillas + ");\n";
      return code;
    };

    return {
      type: "move_right_param",
      kind: "block",
    };
  }
  move_left_param() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "move_left_param",
        message0: "%2 mover a la izquierda %1 casillas",
        args0: [
          {
            type: "field_dropdown",
            name: "CASILLAS",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/arrow-131964784886798044.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
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
    Blockly.JavaScript.forBlock["move_left_param"] = function (block) {
      const casillas = this.getFieldValue("CASILLAS");
      const code = "moverIzquierda(" + casillas + ");\n";
      return code;
    };

    return {
      type: "move_left_param",
      kind: "block",
    };
  }
  // macro
  move_classic_param() {
    return [
      this.move_down_param(),
      this.move_up_param(),
      this.move_right_param(),
      this.move_left_param(),
    ];
  }

  //macro Panda
  move_left_right_param() {
    return [this.move_right_param(), this.move_left_param()];
  } CASILLAS

  // MOVIMIENTO POR AVANCE
  avanzar() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "avanzar",
        message0: "%1 avanzar",
        args0: [
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/forward+icon-1320166878041096316.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["avanzar"] = function (block) {
      const code = "avanzar();\n";
      return code;
    };

    return {
      type: "avanzar",
      kind: "block",
    };
  }
  avanzar_param() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "avanzar_param",
        message0: "%2 avanzar %1 casillas",
        args0: [
          {
            type: "field_dropdown",
            name: "CASILLAS",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "field_image",
            src: "https://icons-for-free.com/iconfiles/png/512/forward+icon-1320166878041096316.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
        extensions: ["avanzar_param_validation"],
      },
    ]);

    Blockly.Extensions.register("avanzar_param_validation", function () {
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
    Blockly.JavaScript.forBlock["avanzar_param"] = function (block) {
      const casillas = this.getFieldValue("CASILLAS");
      const code = "avanzar(" + casillas + ");\n";
      return code;
    };

    return {
      type: "avanzar_param",
      kind: "block",
    };
  }

  // GIRO IZQUIERDA DERECHA
  girar_derecha() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "girar_derecha",
        message0: "%1 girar derecha",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/33/33811.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["girar_derecha"] = function (block) {
      const code = "girarDerecha();\n";
      return code;
    };

    return {
      type: "girar_derecha",
      kind: "block",
    };
  }
  girar_izquierda() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "girar_izquierda",
        message0: "%1 girar izquierda",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/32/32418.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "movement_blocks",
      },
    ]);

    // Define how to generate JavaScript from the custom block.
    Blockly.JavaScript.forBlock["girar_izquierda"] = function (block) {
      const code = "girarIzquierda();\n";
      return code;
    };

    return {
      type: "girar_izquierda",
      kind: "block",
    };
  }
  // macro
  girar_clasico() {
    return [this.girar_derecha(), this.girar_izquierda()];
  }

  // MOVIMIENTOS POR GRADOS

  girar_grados() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "girar_grados",
        message0: "%2 girar %1",
        args0: [
          {
            type: "field_dropdown",
            name: "grados",
            options: [
              ["+90°", "90"],
              ["-90°", "-90"],
            ],
          },
          {
            type: "field_image",
            src: "https://cdn.icon-icons.com/icons2/317/PNG/512/compass-icon_34461.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        tooltip: "",
        helpUrl: "",
        style: "movement_blocks",
        // "extensions": ["turn_degrees_validation"],
      },
    ]);

    Blockly.JavaScript.forBlock["girar_grados"] = function (block) {
      const grados = this.getFieldValue("grados");
      const code = "girarGrados(" + grados + ");\n";
      return code;
    };

    return {
      type: "girar_grados",
      kind: "block",
    };
  }

  // APUNTAR POR COORDENADA GRADOS
  apuntar_hacia() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "apuntar_hacia",
        message0: "%2 apuntar a %1",
        args0: [
          {
            type: "field_dropdown",
            name: "grados",
            options: [
              ["0°", "0"],
              ["90°", "90"],
              ["180°", "180"],
              ["270°", "270"],
            ],
          },
          {
            type: "field_image",
            src: "https://cdn.icon-icons.com/icons2/317/PNG/512/compass-icon_34461.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        tooltip: "",
        helpUrl: "",
        style: "movement_blocks",
        // "extensions": ["turn_degrees_validation"],
      },
    ]);

    Blockly.JavaScript.forBlock["apuntar_hacia"] = function (block) {
      const grados = this.getFieldValue("grados");
      const code = "apuntarEnDireccion(" + grados + ");\n";
      return code;
    };

    return {
      type: "apuntar_hacia",
      kind: "block",
    };
  }

  // ---------------
  // FIN MOVIMIENTOS
  // ---------------

  // ---------------
  // ACCIONES
  // ---------------
  abrir_cofre() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "abrir_cofre",
        message0: "%1 abrir cofre",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["abrir_cofre"] = function (block) {
      const code = "abrirCofre();\n";
      return code;
    };

    return {
      type: "abrir_cofre",
      kind: "block",
    };
  }
  juntar_basura() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "juntar_basura",
        message0: "%1 juntar basura",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1686/1686033.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["juntar_basura"] = function (block) {
      const code = "juntarBasura();\n";
      return code;
    };

    return {
      type: "juntar_basura",
      kind: "block",
    };
  }
  comer_frutilla() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "comer_frutilla",
        message0: "%1 comer frutilla",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/590/590772.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["comer_frutilla"] = function (block) {
      const code = "comerFrutilla();";
      return code;
    };

    return {
      type: "comer_frutilla",
      kind: "block",
    };
  }
  comer_bamboo() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "comer_bamboo",
        message0: "%1 comer bambú",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/6485/6485722.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["comer_bamboo"] = function (block) {
      const code = "comerBamboo();";
      return code;
    };

    return {
      type: "comer_bamboo",
      kind: "block",
    };
  }
  //bombero
  disparar_agua() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "disparar_agua",
        message0: "%1 Apagar fuego",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/599/599508.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["disparar_agua"] = function (block) {
      const code = "dispararAgua();";
      return code;
    };

    return {
      type: "disparar_agua",
      kind: "block",
    };
  }
  //conejo
  cosechar() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "cosechar",
        message0: "%1 cosechar zanahoria",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/257/257615.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["cosechar"] = function (block) {
      const code = "cosecharZanahoria();\n";
      return code;
    };

    return {
      type: "cosechar",
      kind: "block",
    };
  }

  comer() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "comer",
        message0: "%1 comer zanahoria",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/257/257615.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["comer"] = function (block) {
      const code = "comerZanahoria();\n";
      return code;
    };

    return {
      type: "comer",
      kind: "block",
    };
  }
  picar_piedra() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "picar_piedra",
        message0: "%1 picar piedra",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/664/664112.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["picar_piedra"] = function (block) {
      const code = "picarPiedra()\n;";
      return code;
    };

    return {
      type: "picar_piedra",
      kind: "block",
    };
  }
  juntar_diamante() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "juntar_diamante",
        message0: "%1 juntar diamante",
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/599/599608.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["juntar_diamante"] = function (block) {
      const code = "juntarDiamante();\n";
      return code;
    };

    return {
      type: "juntar_diamante",
      kind: "block",
    };
  }
  // Lapiz
  bajar_lapiz() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "bajar_lapiz",
        message0: "%1 bajar lápiz",
        args0: [
          {
            type: "field_image",
            src: "https://images.emojiterra.com/twitter/v14.0/512px/270f.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "pencil_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["bajar_lapiz"] = function (block) {
      const code = "bajarLapiz();\n";
      return code;
    };

    return {
      type: "bajar_lapiz",
      kind: "block",
    };
  }
  subir_lapiz() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "subir_lapiz",
        message0: "%1 subir lápiz",
        args0: [
          {
            type: "field_image",
            src: "https://images.emojiterra.com/twitter/v14.0/512px/270f.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "pencil_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["subir_lapiz"] = function (block) {
      const code = "subirLapiz();\n";
      return code;
    };

    return {
      type: "subir_lapiz",
      kind: "block",
    };
  }
  setear_color() {
    // Blockly.common.defineBlocksWithJsonArray([
    //     {
    //         "type": "color_picker",
    //         "message0": "Pick Color %1",
    //         "args0": [
    //             {
    //                 "type": "field_colour",
    //                 "name": "COLOR",
    //                 "colour": "#ff0000"
    //             }
    //         ],
    //         "output": "Colour",
    //         "colour": 230
    //     }
    // ])
    // Blockly.JavaScript["color_picker"] = function (block) {
    //     const code = "setearColor();\n"
    //     return code;
    // };
    // return {
    //     type: "color_picker",
    //     kind: "block",
    // }
  }
  // macro
  lapiz() {
    return [
      this.bajar_lapiz(),
      this.subir_lapiz(),
      // this.setearColor()
    ];
  }
  // BLOQUES PROGRAMACIÓN
  // Repetir, condicionales, etc, etc, etc, (son MUCHISIMOS)

  ifElse() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "if_else",
        message0: "Si %1 %2 entonces... %3 %4 si no... %5 %6",
        args0: [
          {
            type: "input_dummy",
          },
          {
            type: "input_value",
            name: "condicion",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "entonces",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "sino",
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "logic_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["if_else"] = function (block) {
      const condicion = Blockly.JavaScript.valueToCode(
        block,
        "condicion",
        Blockly.JavaScript.ORDER_NONE
      );
      const entonces = Blockly.JavaScript.statementToCode(block, "entonces");
      const sino = Blockly.JavaScript.statementToCode(block, "sino");
      const code =
        "if(" + condicion + "){\n" + entonces + "\n}else{\n" + sino + "\n}";
      return code;
    };

    return {
      type: "if_else",
      kind: "block",
    };
  }
  if() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "if",
        message0: "Si %1 entonces... %2 %3",
        args0: [
          {
            type: "input_value",
            name: "condicion",
            check: "Boolean",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "entonces",
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "logic_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["if"] = function (block) {
      const condicion = Blockly.JavaScript.valueToCode(
        block,
        "condicion",
        Blockly.JavaScript.ORDER_NONE
      );
      const entonces = Blockly.JavaScript.statementToCode(block, "entonces");
      const code = "if(" + condicion + "){\n" + entonces + "\n}\n";
      return code;
    };

    return {
      type: "if",
      kind: "block",
    };
  }
  logic_compare() {
    return {
      kind: "block",
      type: "logic_compare",
    };
  }
  logic_operation() {
    return {
      kind: "block",
      type: "logic_operation",
    };
  }
  logic_boolean() {
    return {
      kind: "block",
      type: "logic_boolean",
    };
  }
  condicionales() {
    return [
      this.if(),
      this.logic_compare(),
      this.logic_operation(),
      // this.logic_boolean(),
    ];
  }
  // Sensores
  sensor_cofre() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_cofre",
        message0: "%1 ¿Hay cofre aquí?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_cofre"] = function (block) {
      const code = "detectarCofre()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_cofre",
      kind: "block",
    };
  }

  sensor_zanahoria() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_zanahoria",
        message0: "%1 ¿Hay zanahoria aquí?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/257/257615.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_zanahoria"] = function (block) {
      const code = "detectarZanahoria()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_zanahoria",
      kind: "block",
    };
  }
  sensor_piedra() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_piedra",
        message0: "%1 ¿Hay piedra adelante?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/7996/7996138.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_piedra"] = function (block) {
      const code = "detectarPiedra()";
      return [code, Blockly.JavaScript.ORDER_NONE];
      //    return code;
    };
    return {
      type: "sensor_piedra",
      kind: "block",
    };
  }

  sensor_avion() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_avion",
        message0: "%1 ¿Hay avión adelante?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/3410/3410900.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_avion"] = function (block) {
      const code = "detectarAvion()";
      return [code, Blockly.JavaScript.ORDER_NONE];
      //    return code;
    };
    return {
      type: "sensor_avion",
      kind: "block",
    };
  }
  sensor_fuego() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_fuego",
        message0: "%1 ¿Hay fuego adelante?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_fuego"] = function (block) {
      const code = "detectarFuego()";
      return [code, Blockly.JavaScript.ORDER_NONE];
      //    return code;
    };
    return {
      type: "sensor_fuego",
      kind: "block",
    };
  }
  sensor_apagar_fuego() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_apagar_fuego",
        message0: "%1 ¿Está apagado el fuego?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_apagar_fuego"] = function (block) {
      const code = "detectarFuegoApagado()";
      return [code, Blockly.JavaScript.ORDER_NONE];
      //    return code;
    };
    return {
      type: "sensor_apagar_fuego",
      kind: "block",
    };
  }

  sensor_diamante() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_diamante",
        message0: "%1 ¿Hay un diamante aquí?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/599/599608.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_diamante"] = function (block) {
      const code = "detectarDiamante()";
      return [code, Blockly.JavaScript.ORDER_NONE];
      //    return code;
    };
    return {
      type: "sensor_diamante",
      kind: "block",
    };
  }

  sensor_frutilla() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_frutilla",
        message0: "%1 ¿Hay frutilla aquí?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/590/590772.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_frutilla"] = function (block) {
      const code = "detectarFrutilla()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_frutilla",
      kind: "block",
    };
  }

  sensor_estacionBombero() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_estacionBombero",
        message0: "%1 ¿Llegué a la estación?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/2052/2052830.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);

    Blockly.JavaScript.forBlock["sensor_estacionBombero"] = function (block) {
      const code = "detectarEstacionBombero()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_estacionBombero",
      kind: "block",
    };
  }

  sensor_tronco() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_tronco",
        message0: "%1 ¿LLegué al tronco?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/2140/2140230.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_tronco"] = function (block) {
      const code = "detectarTronco()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_tronco",
      kind: "block",
    };
  }

  sensor_bamboo() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_bamboo",
        message0: "%1 ¿Hay bambú aquí?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/6485/6485722.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_bamboo"] = function (block) {
      const code = "detectarBamboo()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_bamboo",
      kind: "block",
    };
  }

  sensor_bandera() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "sensor_bandera",
        message0: "%1 ¿Llegó a la bandera?",
        output: null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/4481/4481086.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        style: "sensor_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["sensor_bandera"] = function (block) {
      const code = "detectarBandera()";
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
    return {
      type: "sensor_bandera",
      kind: "block",
    };
  }

  // LOOPS
  repeat_times() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "repeat_times",
        message0: "Repetir %1 veces %2 %3",
        args0: [
          {
            type: "field_dropdown",
            name: "cantidadRepeticiones",
            options: [
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"],
              ["9", "9"],
              ["10", "10"],
            ],
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "accionesARepetir",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["repeat_times"] = function (block) {
      const cantidadRepeticiones = this.getFieldValue("cantidadRepeticiones");
      // console.log(cantidadRepeticiones);
      const accionesARepetir = Blockly.JavaScript.statementToCode(
        block,
        "accionesARepetir"
      );
      // console.log(accionesRepeticion);
      const code = `for (var i = 0; i < ${cantidadRepeticiones}; i++) {
                ${accionesARepetir}
            };`;
      return code;
    };
    return {
      type: "repeat_times",
      kind: "block",
    };
  }
  //REPETIR HASTA que
  repeat_until() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "repeat_until",
        message0: "Repetir hasta que %1 %2",
        args0: [
          {
            type: "input_value",
            name: "condicion",
          },
          {
            type: "input_statement",
            name: "accionesARepetir",
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        tooltip: "",
        helpUrl: "",
        style: "loop_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["repeat_until"] = function (block) {
      const condicion = Blockly.JavaScript.valueToCode(
        block,
        "condicion",
        Blockly.JavaScript.ORDER_NONE
      );
      const acciones = Blockly.JavaScript.statementToCode(
        block,
        "accionesARepetir"
      );
      const code = "while(!" + condicion + "){\n" + acciones + "\n}\n";
      return code;
    };
    return {
      type: "repeat_until",
      kind: "block",
    };
  }

  repeat_while() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "repeat_while",
        message0: "Repetir mientras que %1 %2",
        args0: [
          {
            type: "input_value",
            name: "condicion",
          },
          {
            type: "input_statement",
            name: "accionesARepetir",
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        tooltip: "",
        helpUrl: "",
        style: "loop_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["repeat_while"] = function (block) {
      const condicion = Blockly.JavaScript.valueToCode(
        block,
        "condicion",
        Blockly.JavaScript.ORDER_NONE
      );
      const acciones = Blockly.JavaScript.statementToCode(
        block,
        "accionesARepetir"
      );
      const code = "while(" + condicion + "){\n" + acciones + "\n}\n";
      return code;
    };
    return {
      type: "repeat_while",
      kind: "block",
    };
  }
  // Por el momento no se usan
  // controls_repeat_ext() {
  //     return {
  //         type: "controls_repeat_ext",
  //         kind: "block",
  //     }
  // }

  // controls_whileUntil() {
  //     return {
  //         type: "controls_whileUntil",
  //         kind: "block",
  //     }
  // }

  // controls_for() {
  //     return {
  //         type: "controls_for",
  //         kind: "block",
  //     }
  // }

  // controls_forEach() {
  //     return {
  //         type: "controls_forEach",
  //         kind: "block",
  //     }
  // }

  // controls_flow_statements() {
  //     return {
  //         type: "controls_flow_statements",
  //         kind: "block",
  //     }
  // }

  // controls_forRange() {
  //     return {
  //         type: "controls_forRange",
  //         kind: "block",
  //     }
  // }

  // controls_doWhile() {
  //     return {
  //         type: "controls_doWhile",
  //         kind: "block",
  //     }
  // }

  //Algoritmos
  levantarseDeLaCama() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "levantarse",
        message0: "%1 Levantarse de la cama",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1178/1178862.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["levantarse"] = function (block) {
      const code = "levantarseDeLaCama();\n";
      return code;
    };
    return {
      type: "levantarse",
      kind: "block",
    };
  }
  salirDeCasa() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "salirDeCasa",
        message0: "%1 Salir de casa",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1670/1670080.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["salirDeCasa"] = function (block) {
      const code = "salirDeCasa();\n";
      return code;
    };
    return {
      type: "salirDeCasa",
      kind: "block",
    };
  }
  vestirse() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "vestirse",
        message0: "%1 Vestirse",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/925/925072.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["vestirse"] = function (block) {
      const code = "vestirse();\n";
      return code;
    };
    return {
      type: "vestirse",
      kind: "block",
    };
  }
  lavarseLaCara() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "lavarseLaCara",
        message0: "%1 Lavarse la cara",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1686/1686008.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["lavarseLaCara"] = function (block) {
      const code = "lavarseLaCara();\n";
      return code;
    };
    return {
      type: "lavarseLaCara",
      kind: "block",
    };
  }

  cepillarseLosDientes() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "cepillarseLosDientes",
        message0: "%1 Cepillarse los dientes",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/3023/3023109.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["cepillarseLosDientes"] = function (block) {
      const code = "cepillarseLosDientes();\n";
      return code;
    };
    return {
      type: "cepillarseLosDientes",
      kind: "block",
    };
  }

  desayunar() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "desayunar",
        message0: "%1 Desayunar",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1163/1163016.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["desayunar"] = function (block) {
      const code = "desayunar();\n";
      return code;
    };
    return {
      type: "desayunar",
      kind: "block",
    };
  }

  ponerMaceta() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "ponerMaceta",
        message0: "%1 Poner una maceta",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/3233/3233577.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["ponerMaceta"] = function (block) {
      const code = "ponerMaceta();\n";
      return code;
    };
    return {
      type: "ponerMaceta",
      kind: "block",
    };
  }

  ponerTierra() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "ponerTierra",
        message0: "%1 Poner tierra en la maceta",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/6041/6041477.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["ponerTierra"] = function (block) {
      const code = "ponerTierra();\n";
      return code;
    };
    return {
      type: "ponerTierra",
      kind: "block",
    };
  }

  hacerHueco() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "hacerHueco",
        message0: "%1 Hacer un hueco en la tierra",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/10172/10172854.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["hacerHueco"] = function (block) {
      const code = "hacerHueco();\n";
      return code;
    };
    return {
      type: "hacerHueco",
      kind: "block",
    };
  }

  ponerSemilla() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "ponerSemilla",
        message0: "%1 Poner semilla en el hueco",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/1497/1497611.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["ponerSemilla"] = function (block) {
      const code = "ponerSemilla();\n";
      return code;
    };
    return {
      type: "ponerSemilla",
      kind: "block",
    };
  }

  taparConTierra() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "taparConTierra",
        message0: "%1 Tapar con tierra la semilla",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/6041/6041477.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["taparConTierra"] = function (block) {
      const code = "taparConTierra();\n";
      return code;
    };
    return {
      type: "taparConTierra",
      kind: "block",
    };
  }

  regar() {
    Blockly.common.defineBlocksWithJsonArray([
      {
        type: "regar",
        message0: "%1 Regar",
        // "output": null,
        args0: [
          {
            type: "field_image",
            src: "https://cdn-icons-png.flaticon.com/512/4769/4769911.png",
            width: 16,
            height: 16,
            alt: "*",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "action_blocks",
      },
    ]);
    Blockly.JavaScript.forBlock["regar"] = function (block) {
      const code = "regar();\n";
      return code;
    };
    return {
      type: "regar",
      kind: "block",
    };
  }
  prompt() {
    // Blockly.dialog.setPrompt(function(message, defaultValue, callback) {
    //     console.log('Prompt: ' + message);
    //     CustomDialog.show('Prompt', message, {
    //       showInput: true,
    //       showOkay: true,
    //       onOkay: function() {
    //         callback(CustomDialog.inputField.value);
    //       },
    //       showCancel: true,
    //       onCancel: function() {
    //         callback(null);
    //       },
    //     });
    //     CustomDialog.inputField.value = defaultValue;
    //   });

    Blockly.common.defineBlocksWithJsonArray([
      // {
      //     "type": "prompt",
      //     "name": "Prompt asincrónico",
      //     "inputs": [
      //       {
      //         "type": "input",
      //         "name": "Pregunta",
      //         "value": "¿Cuál es tu nombre?"
      //       }
      //     ],
      //     "outputs": [
      //       {
      //         "type": "output",
      //         "name": "Nombre",
      //         "value": ""
      //       }],
      //     "async": true,
      //   },
      {
        type: "prompt",
        message0: "Preguntar %1",
        args0: [
          {
            type: "field_input",
            name: "pregunta",
          },
        ],
        output: null,
        colour: 232,
        tooltip: "",
        async: true,
      },
    ]);
    Blockly.JavaScript.forBlock["prompt"] = function (block) {
      const pregunta = this.getFieldValue("pregunta");
      const code = "prompt('" + pregunta + "');";
      //return pregunta && [code, Blockly.JavaScript.ORDER_ATOMIC];
      return code;
    };
    return {
      type: "prompt",
      kind: "block",
    };
  }
  var() {
    Blockly.common.defineBlocksWithJsonArray([{
      'type': 'variables_get',
      'message0': '%1 %2',
      'args0': [
        {
          'type': 'field_variable',
          'name': 'VAR',
          'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
        },
        // {
        //   'type': 'input_value',
        //   'name': 'VALUE',
        // }
        {
          "type": "input_end_row"
        },
      ],
      'output': null,
      'helpUrl': '%{BKY_VARIABLES_GET_HELPURL}',
      'tooltip': '%{BKY_VARIABLES_GET_TOOLTIP}',
      "colour": "#F7DD47",
    },
    // Block for variable setter.
    {
      'type': 'variables_set',
      'message0': 'var %1 = %2',
      'args0': [
        {
          'type': 'field_variable',
          'name': 'VAR',
          'variable': 'variable',
        }, {
          "type": "input_value",
          "name": "VAR_NAME"
        }

      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": "#F7DD47",
      'tooltip': '%{BKY_VARIABLES_SET_TOOLTIP}',
      'helpUrl': '%{BKY_VARIABLES_SET_HELPURL}',
      extensions: ["variable_test"]
    },
      //{
      //   "type": "example_variable_untyped",
      //   "message0": "var %1",
      //   "args0": [
      //     {
      //       "type": "field_variable",
      //       "name": "FIELDNAME",
      //       "variable": "nombreDeSuVariable"
      //     }
      //   ],
      //   "colour": "#F7DD47",
      //   onLoad: function () {
      //     this.promptInput = new Blockly.FieldTextInput(this.workspace, 'Quiero renombrar');
      //   },
      //   //Obtiene el nombre de la variable del prompt
      //   onInputChange: function () {
      //     this.field_VAR.setValue(this.promptInput.getValue());
      //   },
      //   //Genera el código JavaScript
      //   generateCode: function (workspace) {
      //     const variableName = this.field_VAR.getValue();
      //     return `
      //       var ${variableName} = null;
      //       function ${variableName}Callback() {
      //         return ${variableName};
      //       }
      //     `;
      //   },
      //   callType_: "my_variable_call",
      // }
    ]),
      // this.validarVariable = (value) =>{
      //   return value.match(/^[a-zA-Z0-9]+$/) && !value.match(/^[0-9]/);
      // }
      Blockly.Extensions.register("variable_test", function () {
        // 4 veces hace la llamada a esta fn, creo q tiene algo que ver los 2 bloques que se generan
        // validar que el nombre de la variable empiece con letras y no con num o caracteres especiales
        this.setOnChange(function (event) {
          console.log("dentro del setOnChange", event.blockId)
          console.log("dentro del setOnChange", event)
          const variable1 = this.getFieldValue("VAR")
          const variable2 = this.getFieldValue("VAR_NAME")
          console.log(variable1 + " " + variable2)
          // let listo= true
          // while(listo){
          //   const variable = this.getFieldValue("VAR");
          //   const validador = variable.match(/^[a-zA-Z0-9]+$/) && !variable.match(/^[0-9]/)
          //   const valid = validador && variable > 2;
          //   if(!valid){
          //    let newName = prompt(`El número de la variable (${variable}) no puede comenzar con simbolos "><@!", ni con numeros y debe contener mas de 3 caracteres.`);
          //    this.setFieldValue(newName, 'VAR');
          //    console.log(newName)
          //   }else{
          //     listo = false
          //   }
          //   console.log(valid? "es valido":"no es valido")
          // }
        });
        //   this.setWarningText(
        //     valid ? null : `El número de la variable (${variable}) no puede comenzar con simbolos "><@!", ni con numeros y debe contener mas de 3 caracteres.`
        //   );
        // });
      })
    //miControlador.obtenerBloquesSerializados()
    // delete Blockly.Blocks['variables_set'];

    // Blockly.common.defineBlocksWithJsonArray([
    //   {
    //     // Crea el bloque de llamado de la variable
    //     type: 'my_variable_call',
    //     message0: '%1',
    //     args0: [
    //       {
    //         type: 'field_variable',
    //         name: 'VAR',
    //       },
    //     ],
    //     output: null,
    //     style: 'variable_blocks',
    //     helpUrl: '%{BKY_VARIABLES_GET_HELPURL}',
    //     tooltip: '%{BKY_VARIABLES_GET_TOOLTIP}',
    //     // Obtiene el nombre de la variable del bloque de variable
    //     onLoad: function () {
    //       const variableBlock = workspace.getById('my_variable');
    //       this.field_VAR.setValue(variableBlock.field_VAR.getValue());
    //     },
    //     // Genera el código JavaScript
    //     generateCode: function (workspace) {
    //       const variableName = this.field_VAR.getValue();
    //       return `
    //         ${variableName}Callback()
    //       `;
    //     },
    //   },
    // ])
    delete Blockly.Blocks['math_change'];

    // Blockly.common.defineBlocksWithJsonArray([{
    //   "type": "example_variable_untyped",
    //   "message0": "var %1",
    //   "args0": [
    //     {
    //       "type": "field_variable",
    //       "name": "FIELDNAME",
    //       "variable": "nombreDeMiVariable"
    //     }
    //   ],
    //   "colour": "#F7DD47",
    // }])
    // Blockly.common.defineBlocksWithJsonArray([{
    //   "type": "example_variable_typed",
    //   "message0": "variable: %1",
    //   "args0": [
    //     {
    //       "type": "field_variable",
    //       "name": "FIELDNAME",
    //       "variable": "nombreDeVariable",
    //       "variableTypes": ["Number", "String"],
    //       "defaultType": "Number"
    //     }
    //   ]
    // }])
    // Blockly.Blocks['variables_create'] = {
    //   /**
    //    * Block for creating a variable.
    //    * @this Blockly.Block
    //    */
    //   init: function() {
    //     console.log("hola variaableee")
    //     this.appendDummyInput()
    //       .appendField('Crear variable');
    //     this.appendStatementInput('variableName')
    //       .setCheck(['String'])
    //       .setTitle('Nombre de la variable');
    //     this.appendStatementInput('initialValue')
    //       .setCheck(['Number', 'String', 'Boolean'])
    //       .setTitle('Valor inicial');
    //     this.setInputsInline(true);
    //     this.setOutput(true, 'Variable');
    //     this.setTooltip('Crea una nueva variable.');
    //   },
    //   /**
    //    * Returns the type of value produced by this block.
    //    * @return {string} The type of value produced.
    //    */
    //   getOutputType: function() {
    //     return 'Variable';
    //   },
    // };
    //   Blockly.Blocks['local-declaration-statement'] = {
    //     /**
    //    * Block for defining a procedure with no return value.
    //    * @this Blockly.Block
    //    */
    //   init: function() {
    //     console.log("estoy en el global-decl-state")
    //     var nameField = new Blockly.FieldTextInput('',
    //         Blockly.Procedures.rename);
    //     nameField.setSpellcheck(false);
    //     this.appendDummyInput()
    //         .appendField("var ")
    //         .appendField(nameField, 'NAME')
    //         .appendField("=")
    //         .appendField('', 'PARAMS');
    //     this.setColour("#FF5733");
    //   }
    //  }
    //   Blockly.common.defineBlocksWithJsonArray([
    //     {
    //       //no existe un create_variable
    //       type: "var",
    //       // 'extensions': [
    //       //     'create_variable_validation',
    //       // ],
    //     },
    //   ]);

    Blockly.JavaScript.forBlock["variables_get"] = function (block) {
      //console.log("entro en el forBlock de variables_get")
      // var variableName = prompt(
      //   "Ingrese el nombre de la variable:",
      //   ""
      // );
      // Blockly.JavaScript.statementToCode(block, "VALUE");
      // Blockly.Variables.createVariable(variableName, "");
      return Blockly.JavaScript.statementToCode(block, "VALUE")
    };

    // function myButton() {
    // //promptName(Msg['NEW_VARIABLE_TITLE'], defaultName, function (text) {
    // //   if (!text) {
    // //     // User canceled prompt.
    // //     if (opt_callback) opt_callback(null);
    // //     return;
    // //   }

    //    //tira error : prompt is not a fn
    //   var variableName = Blockly.prompt(
    //     "Ingrese el nombre de la variable:",
    //     ""
    //   );
    //   Blockly.Variables.createVariable(
    //     Blockly.Msg.NEW_VARIABLE_TITLE,
    //     variableName
    //   );
    // }
    //console.log("estoy en var")
    //no llama a Blockly.JavaScript.forBlock["var"]
    // Blockly.JavaScript.forBlock["var"] = function (block) {
    //     const p = Blockly.dialog.prompt()
    //     console.log(p)
    //     const code = "detectarBandera()";
    //     return [code, Blockly.JavaScript.ORDER_NONE];
    //   };
    return {
      kind: "VARIABLE",
      //kind: "block", //si es de tipo block, necesita si o si le pase el type
      //type: "example_variable_typed",
      //type: "example_variable_untyped",
      //type: "variables_get",
      custom: "VARIABLE",
      //custom:"LEXICAL_VARIABLE",
      //custom: "VARIABLE_DYNAMIC",
      // type:"var",
      // cssConfig: {
      //     "container": "yourClassName"
      //   }

      //   kind: "button",
      //   text: "Crear variable",
      //   callbackKey: "myButton",
      //   callback: myButton,
    };
  }
  procedimientosEstiloJs() {
    Blockly.Blocks['procedures_defnoreturn'] = {
      /**
       * Block for defining a procedure with no return value.
       * @this Blockly.Block
       */
      init: function () {
        var nameField = new Blockly.FieldTextInput('',
          Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
          .appendField("function ")
          .appendField(nameField, 'NAME')
          .appendField("() {")
          .appendField('', 'PARAMS');
        //this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        if ((this.workspace.options.comments ||
          (this.workspace.options.parentWorkspace &&
            this.workspace.options.parentWorkspace.options.comments)) &&
          Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
          this.setCommentText(null);
        }
        this.setColour("#FF5733");
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(true);
        this.appendDummyInput().appendField(" } ")
        this.statementConnection_ = null;
      },
      /**
       * Add or remove the statement block from this function definition.
       * @param {boolean} hasStatements True if a statement block is needed.
       * @this Blockly.Block
       */
      setStatements_: function (hasStatements) {
        if (this.hasStatements_ === hasStatements) {
          return;
        }
        if (hasStatements) {
          this.appendStatementInput('STACK')
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
          if (this.getInput('RETURN')) {
            this.moveInputBefore('STACK', 'RETURN');
          }
        } else {
          this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
      },


      getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, false];
      },

      customContextMenu: function (options) {
        // Add option to create caller.
        var option = { enabled: true };
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        xmlBlock.setAttribute('type', this.callType_);
        //option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
          for (var i = 0; i < this.arguments_.length; i++) {
            var option = { enabled: true };
            var name = this.arguments_[i];
            option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
            //var xmlField = goog.dom.createDom('field', null, name);
            xmlField.setAttribute('name', 'VAR');
            //var xmlBlock = goog.dom.createDom('block', null, xmlField);
            xmlBlock.setAttribute('type', 'variables_get');
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
          }
        }
      },
      callType_: 'procedures_callnoreturn'
    };
    Blockly.Blocks['procedures_callnoreturn'] = {
      /**
       * Block for calling a procedure with no return value.
       * @this Blockly.Block
       */
      init: function () {
        this.appendDummyInput('TOPROW')
          .appendField(this.id, 'NAME')
          .appendField("()");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("FF5733");
        // Tooltip is set in renameProcedure.
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
      },
      /**
       * Returns the name of the procedure this block calls.
       * @return {string} Procedure name.
       * @this Blockly.Block
       */
      getProcedureCall: function () {
        // The NAME field is guaranteed to exist, null will never be returned.
        return /** @type {string} */ (this.getFieldValue('NAME'));
      },
      /**
       * Notification that a procedure is renaming.
       * If the name matches this block's procedure, rename it.
       * @param {string} oldName Previous name of procedure.
       * @param {string} newName Renamed procedure.
       * @this Blockly.Block
       */
      renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
          this.setFieldValue(newName, 'NAME');
          this.setTooltip(
            (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
              Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
              .replace('%1', newName));
        }
      },
      /**
       * Notification that the procedure's parameters have changed.
       * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
       * @param {!Array.<string>} paramIds IDs of params (consistent for each
       *     parameter through the life of a mutator, regardless of param renaming),
       *     e.g. ['piua', 'f8b_', 'oi.o'].
       * @private
       * @this Blockly.Block
       */
      setProcedureParameters_: function (paramNames, paramIds) {

        var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
          this.workspace);
        var mutatorOpen = defBlock && defBlock.mutator &&
          defBlock.mutator.isVisible();
        if (!mutatorOpen) {
          this.quarkConnections_ = {};
          this.quarkIds_ = null;
        }
        if (!paramIds) {
          // Reset the quarks (a mutator is about to open).
          return;
        }

        if (paramIds.length != paramNames.length) {
          throw 'Error: paramNames and paramIds must be the same length.';
        }
        this.setCollapsed(false);
        if (!this.quarkIds_) {
          // Initialize tracking for this block.
          this.quarkConnections_ = {};
          if (paramNames.join('\n') == this.arguments_.join('\n')) {
            // No change to the parameters, allow quarkConnections_ to be
            // populated with the existing connections.
            this.quarkIds_ = paramIds;
          } else {
            this.quarkIds_ = [];
          }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = 0; i < this.arguments_.length; i++) {
          var input = this.getInput('ARG' + i);
          if (input) {
            var connection = input.connection.targetConnection;
            this.quarkConnections_[this.quarkIds_[i]] = connection;
            if (mutatorOpen && connection &&
              paramIds.indexOf(this.quarkIds_[i]) == -1) {
              // This connection should no longer be attached to this block.
              connection.disconnect();
              connection.getSourceBlock().bumpNeighbours_();
            }
          }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.updateShape_();
        this.quarkIds_ = paramIds;
        // Reconnect any child blocks.
        if (this.quarkIds_) {
          for (var i = 0; i < this.arguments_.length; i++) {
            var quarkId = this.quarkIds_[i];
            if (quarkId in this.quarkConnections_) {
              var connection = this.quarkConnections_[quarkId];
              if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
                // Block no longer exists or has been attached elsewhere.
                delete this.quarkConnections_[quarkId];
              }
            }
          }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
          this.render();
        }
      },
      /**
       * Modify this block to have the correct number of arguments.
       * @private
       * @this Blockly.Block
       */
      updateShape_: function () {
        for (var i = 0; i < this.arguments_.length; i++) {
          var field = this.getField('ARGNAME' + i);
          if (field) {
            // Ensure argument name is up to date.
            // The argument name field is deterministic based on the mutation,
            // no need to fire a change event.
            Blockly.Events.disable();
            try {
              field.setValue(this.arguments_[i]);
            } finally {
              Blockly.Events.enable();
            }
          } else {
            // Add new input.
            field = new Blockly.FieldLabel(this.arguments_[i]);
            var input = this.appendValueInput('ARG' + i)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(field, 'ARGNAME' + i);
            input.init();
          }
        }
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
          this.removeInput('ARG' + i);
          i++;
        }
        // Add 'with:' if there are parameters, remove otherwise.
        var topRow = this.getInput('TOPROW');
        if (topRow) {
          if (this.arguments_.length) {
            if (!this.getField('WITH')) {
              topRow.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
              topRow.init();
            }
          } else {
            if (this.getField('WITH')) {
              topRow.removeField('WITH');
            }
          }
        }
      },
      /**
       * Create XML to represent the (non-editable) name and arguments.
       * @return {!Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
          var parameter = document.createElement('arg');
          parameter.setAttribute('name', this.arguments_[i]);
          container.appendChild(parameter);
        }
        return container;
      },
      /**
       * Parse XML to restore the (non-editable) name and parameters.
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
      domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.renameProcedure(this.getProcedureCall(), name);
        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
          if (childNode.nodeName.toLowerCase() == 'arg') {
            args.push(childNode.getAttribute('name'));
            paramIds.push(childNode.getAttribute('paramId'));
          }
        }
        this.setProcedureParameters_(args, paramIds);
      },
      /**
       * Notification that a variable is renaming.
       * If the name matches one of this block's variables, rename it.
       * @param {string} oldName Previous name of variable.
       * @param {string} newName Renamed variable.
       * @this Blockly.Block
       */
      renameVar: function (oldName, newName) {
        for (var i = 0; i < this.arguments_.length; i++) {
          if (Blockly.Names.equals(oldName, this.arguments_[i])) {
            this.arguments_[i] = newName;
            this.getField('ARGNAME' + i).setValue(newName);
          }
        }
      },
      /**
       * Procedure calls cannot exist without the corresponding procedure
       * definition.  Enforce this link whenever an event is fired.
       * @param {!Blockly.Events.Abstract} event Change event.
       * @this Blockly.Block
       */
      onchange: function (event) {
        if (!this.workspace || this.workspace.isFlyout) {
          // Block is deleted or is in a flyout.
          return;
        }
        if (event.type == Blockly.Events.BLOCK_CREATE &&
          event.ids.indexOf(this.id) != -1) {
          // Look for the case where a procedure call was created (usually through
          // paste) and there is no matching definition.  In this case, create
          // an empty definition block with the correct signature.
          var name = this.getProcedureCall();
          var def = Blockly.Procedures.getDefinition(name, this.workspace);

          if (def && (def.type != this.defType_ ||
            JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
            // The signatures don't match.
            def = null;
          }
          if (!def) {
            Blockly.Events.setGroup(event.group);

            block.setAttribute('type', this.defType_);
            var xy = this.getRelativeToSurfaceXY();
            var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
            var y = xy.y + Blockly.SNAP_RADIUS * 2;
            block.setAttribute('x', x);
            block.setAttribute('y', y);
            var mutation = this.mutationToDom();
            block.appendChild(mutation);
            //var field = goog.dom.createDom('field');
            field.setAttribute('name', 'NAME');
            field.appendChild(document.createTextNode(this.getProcedureCall()));
            block.appendChild(field);
            xml.appendChild(block);
            Blockly.Xml.domToWorkspace(xml, this.workspace);
            Blockly.Events.setGroup(false);
          }
        } else if (event.type == Blockly.Events.BLOCK_DELETE) {
          // Look for the case where a procedure definition has been deleted,
          // leaving this block (a procedure call) orphaned.  In this case, delete
          // the orphan.
          var name = this.getProcedureCall();
          var def = Blockly.Procedures.getDefinition(name, this.workspace);
          if (!def) {
            Blockly.Events.setGroup(event.group);
            this.dispose(true, false);
            Blockly.Events.setGroup(false);
          }
        }
      },
      /**
       * Add menu option to find the definition block for this call.
       * @param {!Array} options List of menu options to add to.
       * @this Blockly.Block
       */
      customContextMenu: function (options) {
        var option = { enabled: true };
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
          var def = Blockly.Procedures.getDefinition(name, workspace);
          def && def.select();
        };
        options.push(option);
      },
      defType_: 'procedures_defnoreturn'
    };
    return {
      kind: "procedureCustomizada",
      custom: "PROCEDURE"
    };
  }
  procedimientoEstiloKoff() {
    return {
      kind: "procedureCustomizada",
      custom: "PROCEDURE"
    };
  }
}
