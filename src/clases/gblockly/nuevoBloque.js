import Blockly from "blockly";
import { javascriptGenerator } from 'blockly/javascript';


export default function Bloque(config) {
    Blockly.Blocks[config.type] = {
        init: function () {
            this.jsonInit(config);
            // Blockly.JavaScript[config.type](block);
        },
    }
}

//Vero probando. Pude pero ahora no me acuerdo que toque
// export default class NuevoBloque{
//     constructor(config) {
//         this.bloque= {
//             "type" : config.type,
//             "message0" : config.message0,
//             "previousStatement" : config.previousStatement,
//             "nextStatement": config.nextStatement,
//             "args0": config.args0,
//             "extensions": config.extensions,
//         }
//         //this.codigo = config.type + "();\n"
//     };
//     armar() {
//         Blockly.common.defineBlocksWithJsonArray([this.bloque]);
//     }
//     validar() {
        
//     }
// }

    
    // javascriptGenerator['text_indexOf'] = function (block) {
    //     let code = config.type + "();\n"
    //     return [code. javascriptGenerator.ORDER_FUNCTION_CALL]
    // }
    