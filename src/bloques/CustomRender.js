// //Sobreescribir constantes para conexiones
class CustomConstantProvider extends Blockly.geras.ConstantProvider {
    constructor() {
      // Set up all of the constants from the base provider.
      super();
    //    * The width of the notch used for previous and next connections.
      this.NOTCH_WIDTH = 20;
  
    //    * The height of the notch used for previous and next connections.
      this.NOTCH_HEIGHT = 6;
  
    //    * Rounded corner radius.
      this.CORNER_RADIUS = 10;
  
    //    * The height of the puzzle tab used for input and output connections.
      this.TAB_HEIGHT = 20;
    }
  }

export class CustomRenderer extends Blockly.geras.Renderer {
  constructor() {
    super();
  }
  makeConstants_() {
    return new CustomConstantProvider();
  }
  registrarRender(nombre){
     Blockly.blockRendering.register(nombre, CustomRenderer);
  }    
}