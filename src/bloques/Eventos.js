import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

Blockly.common.defineBlocksWithJsonArray([
    {
      type: "start",
      message0: "Al presionar ejecutar",
      previousStatement: null,
      nextStatement: null,
      style: "list_blocks",
      extensions: ["start_validation"],
    },
]);
  
javascriptGenerator['start'] = function(block) {
    // No code generation needed for the flag block
    return '';
};
  
