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
                "message0": "Al ejecutar %1 %2",
                "args0": [
                    {
                        "type": "input_dummy",
                    },
                    {
                        "type": "input_statement",
                        "name": "EVENT"
                    }
                ],
                "inputsInline": false,
                "colour": 230,
                "tooltip": "Triggered when the flag is clicked",
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
        Blockly.JavaScript['on_execute'] = function (block) {
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
                "message0": "mover abajo",
                "previousStatement": null,
                "nextStatement": null,
                "style": "list_blocks",
                //tooltip: "moverAbajo()",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript["move_down_simple"] = function (block) {
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
                type: "move_up_simple",
                message0: "mover arriba",
                previousStatement: null,
                nextStatement: null,
                style: "list_blocks",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript["move_up_simple"] = function (block) {
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
        Blockly.JavaScript["move_right_simple"] = function (block) {
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
                type: "move_left_simple",
                message0: "mover a la izquierda",

                previousStatement: null,
                nextStatement: null,
                style: "list_blocks",
            },
        ]);

        // Define how to generate JavaScript from the custom block.
        Blockly.JavaScript["move_left_simple"] = function (block) {
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
        //cambié javascriptGenerator por  Blockly.JavaScript
        Blockly.JavaScript["move_down_param"] = function (block) {
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
        Blockly.JavaScript["move_up_param"] = function (block) {
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
        Blockly.JavaScript["move_right_param"] = function (block) {
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
        Blockly.JavaScript["move_left_param"] = function (block) {
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
    // no existe versión sin parámetros.
    go_forward_param() {
        // avanzar(casillas) "Avanzar" (parametro casillas)
    }

    // GIRO IZQUIERDA DERECHA
    turn_right() {
        // girarDerecha() "Girar a la derecha" (sin parametro)
    }
    turn_left() {
        // girarIzquierda() "Girar a la izquierda" (sin parametro)
    }
    // macro
    turn_classic() {
        this.turn_right();
        this.turn_left();
    }


    // MOVIMIENTOS POR GRADOS

    turn_degrees() {
        // girar(grados) "Girar ____ grados" (elegir entre 2 opciones: -90 o +90)
    }

    // APUNTAR POR COORDENADA GRADOS
    point_degrees_coordinate() {
        // apuntar(grados) -- > "apuntar a " (elegir entre 0 90 180 270)
    }

    // ---------------
    // FIN MOVIMIENTOS
    // ---------------


    // ---------------
    // ACCIONES
    // ---------------
    abrirCofre() {
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "abrir_cofre",
                message0: "Abrir cofre",
                previousStatement: null,
                nextStatement: null,
                style: "list_blocks",
            },
        ]);

        Blockly.JavaScript["abrir_cofre"] = function (block) {
            const code = "abrirCofre();\n"
            return code;
        };

        return {
            type: "abrir_cofre",
            kind: "block",
        }
    }
    juntarBasura() {

    }
    // Lapiz
    bajarLapiz(){
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "bajarLapiz",
                message0: "bajar lápiz",
                previousStatement: null,
                nextStatement: null,
                style: "list_blocks",
            },
        ]);

        Blockly.JavaScript["bajarLapiz"] = function (block) {
            const code = "bajarLapiz();\n"
            return code;
        };

        return {
            type: "bajarLapiz",
            kind: "block",
        }
    }
    subirLapiz(){
        Blockly.common.defineBlocksWithJsonArray([
            {
                type: "subirLapiz",
                message0: "subir lápiz",
                previousStatement: null,
                nextStatement: null,
                style: "list_blocks",
            },
        ]);

        Blockly.JavaScript["subirLapiz"] = function (block) {
            const code = "subirLapiz();\n"
            return code;
        };

        return {
            type: "subirLapiz",
            kind: "block",
        }
    }
    setearColor(){

    }
    // macro
    lapiz(){
        return[
            this.bajarLapiz(),
            this.subirLapiz(),
            // this.setearColor()
        ]
    }
    
    // BLOQUES PROGRAMACIÓN
    // Repetir, condicionales, etc, etc, etc, (son MUCHISIMOS)

}