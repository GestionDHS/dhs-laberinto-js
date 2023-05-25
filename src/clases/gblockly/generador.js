import * as Blockly from 'blockly';

export const generador = new Blockly.Generator('JavaScript');

generador['moverArriba'] = function(block) {
    return 'moverArriba();\n';
}