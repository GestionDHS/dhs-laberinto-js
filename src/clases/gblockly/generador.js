import * as Blockly from 'blockly';

export const generador = new Blockly.Generator('JavaScript');

generador['moverArriba'] = function(block) {
    console.log(block)
    return 'moverArriba();\n';
}
generador['moverAbajo'] = function(block) { // pia
    return 'moverAbajo();\n';
}