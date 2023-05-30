import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

//Personalizado 100%
export default function Bloque(config) {
  config.forEach((configPorBloque) => {
    //pia
    Blockly.Blocks[configPorBloque.type] = {
      init: function () {
        this.jsonInit(configPorBloque);
        //Blockly.JavaScript[configPorBloque.type](this);//pia
        //Blockly.common.defineBlocksWithJsonArray([this]);//pia
      },
    };
  });
}

//Vero probando. Pude pero ahora no me acuerdo que toque (habia dos export default - pia)
export class NuevoBloque {
  constructor(config) {
    this.bloque = {
      type: config.type,
      message0: config.message0,
      previousStatement: config.previousStatement,
      nextStatement: config.nextStatement,
      args0: config.args0,
      extensions: config.extensions,
      colour: config.color,
    };
    this.codigo = config.type + "();\n";
  }
  armar() {
    //otra manera de armar los bloques
    Blockly.common.defineBlocksWithJsonArray([this.bloque]);
  }
  validar() {}
}
//es para crear bloques nativos modificados
javascriptGenerator["text_indexOf"] = function (block) {
  let code = block.type + "();\n"; //pia - cambie config x block - hay que sacae el \n de acá
  return [code.javascriptGenerator.ORDER_FUNCTION_CALL];
};
// javascriptGenerator['text_indexOf'] = function (block) {
//     let code = config.type + "();\n"
//     return [code.javascriptGenerator.ORDER_FUNCTION_CALL]
// }
