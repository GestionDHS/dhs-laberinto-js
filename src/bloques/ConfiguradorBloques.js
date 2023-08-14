export default class ConfiguradorBloques {
    constructor() {
        this.toolbox = {
            kind: "categoryToolbox",
            contents: []
        }
    }

    crearCategoriaToolbox(datosCategoria) {
        this.toolbox.contents.push({
            kind: "category",
            name: datosCategoria.name,
            // custom: datosCategoria.custom,
            // colour: datosCategoria.colour,
            categorystyle: datosCategoria.categorystyle,
            contents: [],
        })
    }

    configurarUnBloqueCustomStandard(keywordBloque, nombreCategoria = "Acciones") {
        if (!this[keywordBloque]) {
            throw new Error("No tenemos un método para configurar bloques que coincida con la keyowrd " + keywordBloque);
        }
        let categoriaBuscada = this.toolbox.contents.find(obj => obj.kind == "category" && obj.name == nombreCategoria);
        if (!categoriaBuscada) {
            throw new Error("No existe la categoría " + nombreCategoria + " en la toolbox");
        } else {
            let generacionBloque = this[keywordBloque]();
            if (Array.isArray(generacionBloque)) {
                categoriaBuscada.contents.push(...generacionBloque);
            } else {
                categoriaBuscada.contents.push(generacionBloque)
            }
        }
    }

    mostrarKeywords() {
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        const methods = [];
        const skip = ["constructor", "mostrarKeywords", "crearCategoriaToolbox", "configurarUnBloqueCustomStandard"]
        methodNames.forEach((methodName) => {
            if (typeof this[methodName] === 'function') {
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
                'type': 'on_execute',
                "message0": "%1 Al ejecutar %2 %3",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_play_circle_filled_white_48px-512.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                    {
                        "type": "input_dummy",
                    },
                    {
                        "type": "input_statement",
                        "name": "EVENT"
                    }
                ],
                "inputsInline": false,
                // "colour": 230,
                "style": "execute_blocks",
                "tooltip": "Al presionar 'play', se ejecutarán los bloques que contenga",
                "helpUrl": "",
                "hat": "rounded",
                'extensions': [
                    'on_execute_validation',
                ],
            },
        ]);

        Blockly.Extensions.register('on_execute_validation', function () {

        });

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript.forBlock['on_execute'] = function (block) {
            let code = Blockly.JavaScript.statementToCode(block, 'EVENT');
            // console.log(code);
            return code;
        }
        return {
            type: "on_execute",
            kind: "block",
        }
    }

    // ---------------
    // MOVIMIENTOS
    // ---------------

    // MOVIMIENTOS CLASICOS SIN PARAMETROS (SIMPLE)
    move_down_simple() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_down_simple",
                "message0": "%1 mover abajo",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784790508314.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
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
        }

    }
    move_up_simple() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_up_simple",
                "message0": "%1 mover arriba",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964785050550748.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript.forBlock["move_up_simple"] = function (block) {
            const code = "moverArriba();\n"
            return code;
        };

        return {
            type: "move_up_simple",
            kind: "block",
        }
    }
    move_right_simple() {
        // Use Blockly's custom block JSON API to define a new block type.
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_right_simple",
                "message0": "%1 mover a la derecha",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784973444275.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "tooltip": "moverDerecha()",
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
        }

    }
    move_left_simple() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_left_simple",
                "message0": "%1 mover a la izquierda",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784886798044.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript.forBlock["move_left_simple"] = function (block) {
            const code = "moverIzquierda();\n"
            return code;
        };

        return {
            type: "move_left_simple",
            kind: "block",
        }
    }
    // macro
    move_classic_simple() {
        return [
            this.move_up_simple(),
            this.move_down_simple(),
            this.move_left_simple(),
            this.move_right_simple(),
        ]
    }

    // MOVIMIENTOS CLASICOS CON PARAMETROS
    move_down_param() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_down_param",
                "message0": "%2 mover abajo %1 casillas",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CASILLAS",
                        "options": [
                            [
                                "1",
                                "1"
                            ],
                            [
                                "2",
                                "2"
                            ],
                            [
                                "3",
                                "3"
                            ],
                            [
                                "4",
                                "4"
                            ],
                            [
                                "5",
                                "5"
                            ],
                            [
                                "6",
                                "6"
                            ],
                            [
                                "7",
                                "7"
                            ],
                            [
                                "8",
                                "8"
                            ],
                            [
                                "9",
                                "9"
                            ],
                            [
                                "10",
                                "10"
                            ],
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784790508314.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "extensions": ["move_down_param_validation"],
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
        }
    }
    move_up_param() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_up_param",
                "message0": "%2 mover arriba %1 casillas",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CASILLAS",
                        "options": [
                            [
                                "1",
                                "1"
                            ],
                            [
                                "2",
                                "2"
                            ],
                            [
                                "3",
                                "3"
                            ],
                            [
                                "4",
                                "4"
                            ],
                            [
                                "5",
                                "5"
                            ],
                            [
                                "6",
                                "6"
                            ],
                            [
                                "7",
                                "7"
                            ],
                            [
                                "8",
                                "8"
                            ],
                            [
                                "9",
                                "9"
                            ],
                            [
                                "10",
                                "10"
                            ],
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964785050550748.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "extensions": ["move_up_param_validation"],
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
        }
    }
    move_right_param() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_right_param",
                "message0": "%2 mover a la derecha %1 casillas",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CASILLAS",
                        "options": [
                            [
                                "1",
                                "1"
                            ],
                            [
                                "2",
                                "2"
                            ],
                            [
                                "3",
                                "3"
                            ],
                            [
                                "4",
                                "4"
                            ],
                            [
                                "5",
                                "5"
                            ],
                            [
                                "6",
                                "6"
                            ],
                            [
                                "7",
                                "7"
                            ],
                            [
                                "8",
                                "8"
                            ],
                            [
                                "9",
                                "9"
                            ],
                            [
                                "10",
                                "10"
                            ],
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784973444275.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "extensions": ["move_right_param_validation"],
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
        }
    }
    move_left_param() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "move_left_param",
                "message0": "%2 mover a la izquierda %1 casillas",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CASILLAS",
                        "options": [
                            [
                                "1",
                                "1"
                            ],
                            [
                                "2",
                                "2"
                            ],
                            [
                                "3",
                                "3"
                            ],
                            [
                                "4",
                                "4"
                            ],
                            [
                                "5",
                                "5"
                            ],
                            [
                                "6",
                                "6"
                            ],
                            [
                                "7",
                                "7"
                            ],
                            [
                                "8",
                                "8"
                            ],
                            [
                                "9",
                                "9"
                            ],
                            [
                                "10",
                                "10"
                            ],
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/arrow-131964784886798044.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "extensions": ["move_left_param_validation"],
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
        }
    }
    // macro
    move_classic_param() {
        return [
            this.move_down_param(),
            this.move_up_param(),
            this.move_right_param(),
            this.move_left_param(),
        ]
    }

    // MOVIMIENTO POR AVANCE 
    avanzar() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "avanzar",
                "message0": "%1 avanzar",
                "args0": [
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/forward+icon-1320166878041096316.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript.forBlock["avanzar"] = function (block) {
            const code = "avanzar();\n"
            return code;
        };

        return {
            type: "avanzar",
            kind: "block",
        }
    }
    avanzar_param() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "avanzar_param",
                "message0": "%2 avanzar %1 casillas",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CASILLAS",
                        "options": [
                            [
                                "1",
                                "1"
                            ],
                            [
                                "2",
                                "2"
                            ],
                            [
                                "3",
                                "3"
                            ],
                            [
                                "4",
                                "4"
                            ],
                            [
                                "5",
                                "5"
                            ],
                            [
                                "6",
                                "6"
                            ],
                            [
                                "7",
                                "7"
                            ],
                            [
                                "8",
                                "8"
                            ],
                            [
                                "9",
                                "9"
                            ],
                            [
                                "10",
                                "10"
                            ],
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://icons-for-free.com/iconfiles/png/512/forward+icon-1320166878041096316.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                      }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
                "extensions": ["avanzar_param_validation"],
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
        }
    }

    // GIRO IZQUIERDA DERECHA
    girar_derecha() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "girar_derecha",
                "message0": "%1 girar derecha",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/33/33811.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
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
        }
    }
    girar_izquierda() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "girar_izquierda",
                "message0": "%1 girar izquierda",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/32/32418.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                "previousStatement": null,
                "nextStatement": null,
                "style": "movement_blocks",
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
        }
    }
    // macro
    girar_clasico() {
        return [
            this.girar_derecha(),
            this.girar_izquierda()
        ]
    }


    // MOVIMIENTOS POR GRADOS

    girar_grados() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "girar_grados",
                "message0": "%2 girar %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "grados",
                        "options": [
                            [
                                "+90°",
                                "90"
                            ],
                            [
                                "-90°",
                                "-90"
                            ]
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://cdn.icon-icons.com/icons2/317/PNG/512/compass-icon_34461.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                      },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": "",
                "style": "movement_blocks",
                // "extensions": ["turn_degrees_validation"],
            }]);
        
        Blockly.JavaScript.forBlock["girar_grados"] = function (block) {
            const grados = this.getFieldValue("grados");
                const code = "girarGrados("+ grados +");\n";
                return code;
            };
    
        return {
            type: "girar_grados",
            kind: "block",
        }
        
    }

    // APUNTAR POR COORDENADA GRADOS
    apuntar_hacia() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "apuntar_hacia",
                "message0": "%2 apuntar a %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "grados",
                        "options": [
                            [
                                "0°",
                                "0"
                            ],
                            [
                                "90°",
                                 "90"
                            ],
                            [
                                "180°",
                                "180"
                            ],
                            [
                                "270°",
                                "270"
                            ]
                        ]
                    },
                    {
                        "type": "field_image",
                        "src": "https://cdn.icon-icons.com/icons2/317/PNG/512/compass-icon_34461.png",
                        "width": 16,
                        "height": 16,
                        "alt": "*"
                    },
                ],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": "",
                "style": "movement_blocks",
                // "extensions": ["turn_degrees_validation"],
            }]);
        
        Blockly.JavaScript.forBlock["apuntar_hacia"] = function (block) {
            const grados = this.getFieldValue("grados");
                const code = "apuntarEnDireccion("+ grados +");\n";
                return code;
            };
    
        return {
            type: "apuntar_hacia",
            kind: "block",
        }
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
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["abrir_cofre"] = function (block) {
            const code = "abrirCofre();\n"
            return code;
        };

        return {
            type: "abrir_cofre",
            kind: "block",
        }
    }
    juntar_basura() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "juntar_basura",
                message0: "%1 juntar basura",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/1686/1686033.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["juntar_basura"] = function (block) {
            const code = "juntarBasura();\n"
            return code;
        };

        return {
            type: "juntar_basura",
            kind: "block",
        }
    }
    comer_fruta() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "comer_fruta",
                message0: "%1 comer fruta",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["comer_fruta"] = function (block) {
            const code = "comerFruta();"
            return code;
        };

        return {
            type: "comer_fruta",
            kind: "block",
        }
    }
    //conejo
    cosechar() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "cosechar",
                message0: "%1 cosechar zanahoria",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/257/257615.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["cosechar"] = function (block) {
            const code = "cosecharZanahoria();\n"
            return code;
        };

        return {
            type: "cosechar",
            kind: "block",
        }
    }

    comer() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "comer",
                message0: "%1 comer zanahoria",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/257/257615.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["comer"] = function (block) {
            const code = "comerZanahoria();\n"
            return code;
        };

        return {
            type: "comer",
            kind: "block",
        }
    }
    picar_piedra() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "picar_piedra",
                message0: "%1 picar piedra",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/664/664112.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["picar_piedra"] = function (block) {
            const code = "picarPiedra();"
            return code;
        };

        return {
            type: "picar_piedra",
            kind: "block",
        }
    }
    juntar_diamante() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "juntar_diamante",
                message0: "%1 juntar diamante",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/599/599608.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "action_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["juntar_diamante"] = function (block) {
            const code = "juntarDiamante();\n"
            return code;
        };

        return {
            type: "juntar_diamante",
            kind: "block",
        }
    }
    // Lapiz
    bajar_lapiz(){
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "bajar_lapiz",
                message0: "%1 bajar lápiz",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://images.emojiterra.com/twitter/v14.0/512px/270f.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "pencil_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["bajar_lapiz"] = function (block) {
            const code = "bajarLapiz();\n"
            return code;
        };

        return {
            type: "bajar_lapiz",
            kind: "block",
        }
    }
    subir_lapiz(){
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "subir_lapiz",
                message0: "%1 subir lápiz",
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://images.emojiterra.com/twitter/v14.0/512px/270f.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                previousStatement: null,
                nextStatement: null,
                style: "pencil_blocks",
            },
        ]);

        Blockly.JavaScript.forBlock["subir_lapiz"] = function (block) {
            const code = "subirLapiz();\n"
            return code;
        };

        return {
            type: "subir_lapiz",
            kind: "block",
        }
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
    lapiz(){
        return[
            this.bajar_lapiz(),
            this.subir_lapiz(),
            // this.setearColor()
        ]
    }
    // BLOQUES PROGRAMACIÓN
    // Repetir, condicionales, etc, etc, etc, (son MUCHISIMOS)
    
    if() {
        return {
            "type": "controls_if",
            "kind": "block",
        }
    }
    logic_compare() {
        return {
            "kind": "block",
            "type": "logic_compare"
          }
    }
    logic_operation() {
        return {
            "kind": "block",
            "type": "logic_operation"
        }
    }
    logic_boolean() {
        return {
            "kind": "block",
            "type": "logic_boolean"
        }
    }
    condicionales() {
        return [
            this.if(),
            this.logic_compare(),
            this.logic_operation(),
            // this.logic_boolean(),
        ]
    }
    // Sensores
    sensor_cofre() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "sensor_cofre",
                "message0": "%1 ¿Hay cofre aquí?",
                "output": null,
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                // "previousStatement": null,
                // "nextStatement": null,
                style: "sensor_blocks",
            },
        ]);
        Blockly.JavaScript.forBlock["sensor_cofre"] = function (block) {
            const code = "detectarCofre()"
            return [code, Blockly.JavaScript.ORDER_NONE]
        };
        return {
            "type": "sensor_cofre",
            "kind": "block",
        }
    }
    sensor_piedra() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "sensor_piedra",
                "message0": "%1 ¿Hay piedra adelante?",
                "output": null,
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/7996/7996138.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                // "previousStatement": null,
                // "nextStatement": null,
                style: "sensor_blocks",
            },
        ]);
        Blockly.JavaScript.forBlock["sensor_piedra"] = function (block) {
            const code = "detectarPiedra()"
            return [code, Blockly.JavaScript.ORDER_NONE]
        //    return code;
        };
        return {
            "type": "sensor_piedra",
            "kind": "block",
        }
    }
    sensor_diamante() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "sensor_diamante",
                "message0": "%1 ¿Hay un diamante aquí?",
                "output": null,
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/599/599608.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                // "previousStatement": null,
                // "nextStatement": null,
                style: "sensor_blocks",
            },
        ]);
        Blockly.JavaScript.forBlock["sensor_diamante"] = function (block) {
            const code = "detectarDiamante()"
            return [code, Blockly.JavaScript.ORDER_NONE]
        //    return code;
        };
        return {
            "type": "sensor_diamante",
            "kind": "block",
        }
    }
    sensor_frutilla() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "sensor_frutilla",
                "message0": "%1 ¿Hay frutilla aquí?",
                "output": null,
                "args0": [
                    {
                      "type": "field_image",
                      "src": "https://cdn-icons-png.flaticon.com/512/4230/4230569.png",
                      "width": 16,
                      "height": 16,
                      "alt": "*"
                    }
                  ],
                // "previousStatement": null,
                // "nextStatement": null,
                style: "sensor_blocks",
            },
        ]);
        Blockly.JavaScript.forBlock["sensor_frutilla"] = function (block) {
            const code = "detectarFrutilla()"
            return [code, Blockly.JavaScript.ORDER_NONE]
        };
        return {
            "type": "sensor_frutilla",
            "kind": "block",
        }
    }

    // LOOPS
    controls_repeat() {
        return {
            type: "controls_repeat",
            kind: "block",
        } 
    }

    controls_repeat_ext() {
        return {
            type: "controls_repeat_ext",
            kind: "block",
        } 
    }

    controls_whileUntil() {
        return {
            type: "controls_whileUntil",
            kind: "block",
        } 
    }

    controls_for() {
        return {
            type: "controls_for",
            kind: "block",
        } 
    }

    controls_forEach() {
        return {
            type: "controls_forEach",
            kind: "block",
        } 
    }

    controls_flow_statements() {
        return {
            type: "controls_flow_statements",
            kind: "block",
        } 
    }

    // controls_forRange() {
    //     return {
    //         type: "controls_forRange",
    //         kind: "block",
    //     } 
    // }

    controls_doWhile() {
        return {
            type: "controls_doWhile",
            kind: "block",
        } 
    }

    controls() {
        return [
            this.controls_repeat(),
            // this.controls_repeat_ext(),
            // this.controls_whileUntil(),
            // this.controls_for(),
            // this.controls_forEach(),
            // this.controls_flow_statements(),
            // this.controls_forRange(),
            // this.controls_doWhile()
        ]
    }

}