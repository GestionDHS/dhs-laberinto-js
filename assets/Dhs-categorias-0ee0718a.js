var c=Object.defineProperty;var s=(o,a,e)=>a in o?c(o,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[a]=e;var i=(o,a,e)=>(s(o,typeof a!="symbol"?a+"":a,e),e);class t{constructor(){i(this,"personajes",{plantarSemilla:{idUsarHTML:"plantarSemilla",tipoPersonaje:"plantarSemilla",tieneTooltip:!0,estadosPosibles:{fondoGris:{name:"fondoGris",imageUrl:"fondoGris"},ponerMaceta:{name:"tomarUnaMaceta",imageUrl:"tomarUnaMaceta"},ponerTierra:{name:"ponerTierra",imageUrl:"ponerTierra"},hacerHueco:{name:"hacerHueco",imageUrl:"hacerHueco"},ponerSemilla:{name:"ponerSemilla",imageUrl:"ponerSemilla"},taparConTierra:{name:"taparConTierra",imageUrl:"taparConTierra"},regar:{name:"regar",imageUrl:"regar"}},estadoInicial:"fondoGris",direccionInicial:0,zIndex:2,rotable:!0,paddingImagen:"1px",colisiones:[],configPosicionamiento:{}},rutina:{idUsarHTML:"rutina",tipoPersonaje:"rutina",tieneTooltip:!0,estadosPosibles:{enLaCama:{name:"enLaCama",imageUrl:"enLaCama"},levantandose:{name:"levantandose",imageUrl:"levantarseDeLacama"},desayunando:{name:"desayunando",imageUrl:"desayunar"},lavandose:{name:"lavandose",imageUrl:"lavarseLaCara"},cepillandose:{name:"cepillandose",imageUrl:"cepillarseDientes"},vistiendose:{name:"vistiendose",imageUrl:"ropa"},saliendo:{name:"saliendo",imageUrl:"salirDeCasa"}},estadoInicial:"enLaCama",direccionInicial:0,zIndex:2,rotable:!0,paddingImagen:"1px",colisiones:[],configPosicionamiento:{}},circuloAmarillo:{idUsarHTML:"circuloAmarillo",tipoPersonaje:"circuloAmarillo",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"circuloAmarilloTransparente"}},estadoInicial:"normal",direccionInicial:0,zIndex:2,rotable:!0,paddingImagen:"1px",colisiones:[],configPosicionamiento:{}},flechaAmarilla:{idUsarHTML:"flechaAmarilla",tipoPersonaje:"flechaAmarilla",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"flechaAmarilla"}},estadoInicial:"normal",direccionInicial:0,zIndex:1,rotable:!0,paddingImagen:"5px",colisiones:[],configPosicionamiento:{}},lupe:{idUsarHTML:"lupe",tipoPersonaje:"lupe",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"lupe"}},estadoInicial:"normal",direccionInicial:0,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"lodo",factorDeAvance:.7,callback:a=>{a.terminar()},mensaje:"¡OH NO! Me atasqué en el lodo."},{con:"arbol",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un árbol"},{con:"bandera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}}],configPosicionamiento:{}},lodo:{idUsarHTML:"lodo",tipoPersonaje:"lodo",estadosPosibles:{normal:{name:"normal",imageUrl:"lodo"}},estadoInicial:"normal",direccionInicial:0,zIndex:1,rotable:!1,paddingImagen:"1px",colisiones:[],configPosicionamiento:{excluyente:!1}},cofre:{idUsarHTML:"cofre",tipoPersonaje:"cofre",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"cofre"},abierto:{name:"abierto",imageUrl:"cofreAbierto"}},estadoInicial:"cerrado",direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},collar:{idUsarHTML:"collar",tipoPersonaje:"collar",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"collar"},abierto:{name:"abierto",imageUrl:"collar"}},estadoInicial:"cerrado",direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},pasto:{idUsarHTML:"camino",tipoPersonaje:"camino",pintable:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"pasto"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,paddingImagen:"1px",rotable:!1},pastoCielo:{idUsarHTML:"camino",tipoPersonaje:"camino",pintable:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"pastoCielo"}},estadoInicial:"normal",zIndex:2,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,paddingImagen:"1px",rotable:!1},arbol:{tipoPersonaje:"arbol",estadosPosibles:{normal:{name:"normal",imageUrl:"arboles"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,paddingImagen:"1px",rotable:!1},barrera:{tipoPersonaje:"barrera",estadosPosibles:{normal:{name:"normal",imageUrl:"barrera"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1},basura:{idUsarHTML:"basura",tipoPersonaje:"basura",estadosPosibles:{normal:{name:"normal",imageUrl:"basura"},juntado:{name:"juntado",imageUrl:"pasto"}},estadoInicial:"normal",zIndex:2,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,colisiones:[],paddingImagen:"1px"},lapiz:{idUsarHTML:"lapiz",tipoPersonaje:"lapiz",clasePersonaje:"PersonajeDibujante",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"lapizRojo"}},estadoInicial:"normal",zIndex:3,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!0,colisiones:[]},fondo:{idUsarHTML:"recuadro-pintable",tipoPersonaje:"recuadro-pintable",tieneTooltip:!1,estadosPosibles:{normal:{name:"normal",imageUrl:null}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,colorFondoInicial:"white",rotable:!1},recuadroPintableDeseado:{idUsarHTML:"recuadro-pintable",tipoPersonaje:"recuadro-pintable",estadosPosibles:{normal:{name:"normal",imageUrl:null}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,colorFondoInicial:"lightgrey",rotable:!1},agua:{idUsarHTML:"agua",tipoPersonaje:"agua",estadosPosibles:{normal:{name:"normal",imageUrl:"agua"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},cielo:{idUsarHTML:"cielo",tipoPersonaje:"cielo",estadosPosibles:{normal:{name:"normal",imageUrl:"cielo"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},juncoPastoDelta:{idUsarHTML:"juncoPastoDelta",tipoPersonaje:"juncoPastoDelta",estadosPosibles:{normal:{name:"normal",imageUrl:"juncoPastoDelta"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},lancha:{idUsarHTML:"lancha",tipoPersonaje:"lancha",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"lancha"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:90,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"juncoPastoDelta",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra los juncos."},{con:"plantaReciclajePastoDelta",factorDeAvance:.4,callback:a=>{a.llegarPlanta()}}]},plastico:{idUsarHTML:"plastico",tipoPersonaje:"plastico",estadosPosibles:{normal:{name:"normal",imageUrl:"plastico"},juntado:{name:"juntado",imageUrl:"agua"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},plantaRecicladora:{idUsarHTML:"plantaReciclajePastoDelta",tipoPersonaje:"plantaReciclajePastoDelta",estadosPosibles:{normal:{name:"normal",imageUrl:"plantaReciclajePastoDelta"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},plantaRecicladoraSinFondo:{idUsarHTML:"plantaReciclajePastoDelta",tipoPersonaje:"plantaReciclajePastoDelta",estadosPosibles:{normal:{name:"normal",imageUrl:"plantaReciclajePastoDeltaSinFondo"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},calle:{idUsarHTML:"calle",tipoPersonaje:"calle",estadosPosibles:{normal:{name:"normal",imageUrl:"calle"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},edificiosSendero:{idUsarHTML:"edificiosSendero",tipoPersonaje:"edificiosSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"edificiosSendero"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},carpincho:{idUsarHTML:"carpincho",tipoPersonaje:"carpincho",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"carpincho"}},estadoInicial:"normal",posicionInicialY:3,posicionInicialX:0,direccionInicial:90,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"juncoPastoDelta",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un junco!"},{con:"pastoDelta",factorDeAvance:1,mensaje:"¡Extrañaba el pasto!"},{con:"edificiosSendero",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un edificio."},{con:"autoArriba",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un auto."},{con:"bandera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}}]},pastoDelta:{idUsarHTML:"pastoDelta",tipoPersonaje:"pastoDelta",estadosPosibles:{normal:{name:"normal",imageUrl:"pastoDelta"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!0,colisiones:[],paddingImagen:"1px"},autoArriba:{idUsarHTML:"autoArriba",tipoPersonaje:"autoArriba",estadosPosibles:{normal:{name:"normal",imageUrl:"autoArriba"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},bandera:{idUsarHTML:"bandera",tipoPersonaje:"bandera",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bandera"},abierto:{name:"abierto",imageUrl:"bandera"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,colisiones:[],paddingImagen:"1px"},pato:{idUsarHTML:"pato",tipoPersonaje:"pato",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"pato"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"juncoPastoDelta",factorDeAvance:.7,callback:a=>{a.terminar()},mensaje:"¡OH NO! Por aquí no puedo nadar."},{con:"plastico",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡CUACK, NO! Hay demasiada basura"},{con:"familiaPato",factorDeAvance:.2,callback:a=>{a.llegarALaFamilia()}}]},familiaPato:{idUsarHTML:"familiaPato",tipoPersonaje:"familiaPato",estadosPosibles:{normal:{name:"normal",imageUrl:"familiaPato"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:1,rotable:!1,colisiones:[],paddingImagen:"1px"},escuelaSendero:{idUsarHTML:"escuelaSendero",tipoPersonaje:"escuelaSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"escuelaSendero"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},edificiosSendero:{idUsarHTML:"edificiosSendero",tipoPersonaje:"edificiosSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"edificiosSendero"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},ciclista:{idUsarHTML:"ciclista",tipoPersonaje:"ciclista",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"ciclista"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"pastoSendero",factorDeAvance:1,mensaje:"¡Qué lindo ir por el parque!"},{con:"escuelaSendero",factorDeAvance:.4,callback:a=>{a.llegarEscuela()},mensaje:"¡Llegué justo para mi clase de inglés!"},{con:"arbolesSendero",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un árbol."},{con:"edificiosSendero",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un edificio."},{con:"barrera",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra una barrera."},{con:"autoEmbotelladoDer",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un auto."},{con:"autoEmbotelladoIzq",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un auto."},{con:"casaSendero",factorDeAvance:.4,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra mi casa."}]},casaSendero:{idUsarHTML:"casaSendero",tipoPersonaje:"casaSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"casaSendero"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},pastoSendero:{idUsarHTML:"pastoSendero",tipoPersonaje:"pastoSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"pastoSendero"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!0,colisiones:[],paddingImagen:"1px"},arbolesSendero:{idUsarHTML:"arbolesSendero",tipoPersonaje:"arbolesSendero",estadosPosibles:{normal:{name:"normal",imageUrl:"arbolesSendero"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},autoEmbotelladoIzq:{idUsarHTML:"autoEmbotelladoIzq",tipoPersonaje:"autoEmbotelladoIzq",estadosPosibles:{normal:{name:"normal",imageUrl:"autoEmbotelladoIzq"}},estadoInicial:"normal",zIndex:1,posicionInicialY:3,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},autoEmbotelladoDer:{idUsarHTML:"autoEmbotelladoDer",tipoPersonaje:"autoEmbotelladoDer",estadosPosibles:{normal:{name:"normal",imageUrl:"autoEmbotelladoDer"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},cerco:{tipoPersonaje:"arbol",estadosPosibles:{normal:{name:"normal",imageUrl:"cerco"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},conejo:{idUsarHTML:"conejo",tipoPersonaje:"conejo",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"conejoDeArriba"}},estadoInicial:"normal",posicionInicialY:1,posicionInicialX:1,direccionInicial:180,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"madriguera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}},{con:"arbol",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un árbol"}]},zanahoria:{idUsarHTML:"zanahoria",tipoPersonaje:"zanahoria",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"zanahoriaEnterrada"},abierto:{name:"normal",imageUrl:"zanahoriaCosechada"},juntado:{name:"juntado",imageUrl:"pasto"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!0,paddingImagen:"1px",colisiones:[]},madriguera:{idUsarHTML:"madriguera",tipoPersonaje:"madriguera",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"madriguera"},abierto:{name:"abierto",imageUrl:"madriguera"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,paddingImagen:"1px",zIndex:2,rotable:!1,colisiones:[]},minero:{idUsarHTML:"minero",tipoPersonaje:"minero",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"minero"}},estadoInicial:"normal",direccionInicial:90,zIndex:3,rotable:!1,paddingImagen:"1px",colisiones:[{con:"piedra",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra una piedra."},{con:"piedraDiamante",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra una piedra."},{con:"bandera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}}]},piedra:{idUsarHTML:"piedra",tipoPersonaje:"piedra",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"piedra"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},piedraDiamante:{idUsarHTML:"piedraDiamante",tipoPersonaje:"piedraDiamante",estadosPosibles:{abierto:{name:"abierto",imageUrl:"piedraDiamante"},juntado:{name:"juntado",imageUrl:"caminoCueva"}},estadoInicial:"abierto",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},caminoCueva:{idUsarHTML:"caminoCueva",tipoPersonaje:"camino",estadosPosibles:{normal:{name:"normal",imageUrl:"caminoCueva"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:0,paddingImagen:"1px",rotable:!1,colisiones:[]},diamante:{idUsarHTML:"diamante",tipoPersonaje:"diamante",estadosPosibles:{abierto:{name:"abierto",imageUrl:"diamante"},juntado:{name:"juntado",imageUrl:"caminoCueva"}},estadoInicial:"abierto",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"7px",colisiones:[]},cofreCerrado:{idUsarHTML:"cofreCerrado",tipoPersonaje:"cofreCerrado",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"cofreCerrado"}},estadoInicial:"cerrado",direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[],configPosicionamiento:{excluyente:!1}},panda:{idUsarHTML:"panda",tipoPersonaje:"panda",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"panda"},trepando:{name:"normal",imageUrl:"pandaTrepadorSinFondo"},izquierda:{name:"normal",imageUrl:"pandaIzquierda"},derecha:{name:"normal",imageUrl:"panda"}},estadoInicial:"normal",direccionInicial:0,zIndex:4,rotable:!0,colisiones:[{con:"bandera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}},{con:"hamacaNeumatico",factorDeAvance:1,callback:a=>{a.llegarALaHamaca()}},{con:"estrella",factorDeAvance:1,callback:a=>{a.llegarALaEstrella()}},{con:"cielo",factorDeAvance:.4,callback:a=>{a.decirTerminar("¡OH! ¡No sé volar!")}},{con:"bambooIzqHoja",factorDeAvance:.2,callback:a=>{a.decirTerminar("¡OH! ¡Me voy a caer si piso aquí!")}}],configPosicionamiento:{}},arbol1:{idUsarHTML:"arbol1",tipoPersonaje:"arbol1",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"arbol1"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},arbol2:{idUsarHTML:"arbol2",tipoPersonaje:"arbol2",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"arbol2"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},arbol3:{idUsarHTML:"arbol3",tipoPersonaje:"arbol3",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"arbol3"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},arbol4:{idUsarHTML:"arbol4",tipoPersonaje:"arbol4",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"arbol4"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},hamacaNeumatico:{idUsarHTML:"hamacaNeumatico",tipoPersonaje:"hamacaNeumatico",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"hamacaNeumatico"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},arbol5:{idUsarHTML:"arbol5",tipoPersonaje:"arbol5",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"arbol5"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},bamboo:{idUsarHTML:"bamboo",tipoPersonaje:"bamboo",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bamboo"},abierto:{name:"normal",imageUrl:"agua"},juntado:{name:"juntado",imageUrl:"agua"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},bambooAncho:{idUsarHTML:"bambooAncho",tipoPersonaje:"bambooAncho",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bambooAncho"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:3,rotable:!1,paddingImagen:"0px",colisiones:[]},bambooAnchoCamino:{idUsarHTML:"bambooAnchoCamino",tipoPersonaje:"bambooAnchoCamino",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bambooAnchoCamino"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},bambooCieloCamino:{idUsarHTML:"bambooCieloCamino",tipoPersonaje:"bambooCieloCamino",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bambooCieloCamino"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},bambooIzqHoja:{idUsarHTML:"bambooIzqHoja",tipoPersonaje:"bambooIzqHoja",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bambooIzqHoja"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},bambooDerechoHoja:{idUsarHTML:"bambooDerechoHoja",tipoPersonaje:"bambooDerechoHoja",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"bambooDerechoHoja"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},tierra:{idUsarHTML:"tierra",tipoPersonaje:"tierra",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"tierra"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:1,rotable:!1,paddingImagen:"0px",colisiones:[]},tierraPasto:{idUsarHTML:"tierraPasto",tipoPersonaje:"tierraPasto",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"tierraPasto"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"0px",colisiones:[]},estrella:{idUsarHTML:"estrella",tipoPersonaje:"estrella",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"estrella"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},estrellaSinFondo:{idUsarHTML:"estrellaSinFondo",tipoPersonaje:"estrellaSinFondo",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"estrellaSinFondo"}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},frutilla:{idUsarHTML:"frutilla",tipoPersonaje:"frutilla",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"frutilla"},abierto:{name:"normal",imageUrl:""},juntado:{name:"juntado",imageUrl:""}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},noPersonaje:{idUsarHTML:"noPersonaje",tipoPersonaje:"noPersonaje",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:""}},estadoInicial:"cerrado",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:0,rotable:!1,paddingImagen:"1px",colisiones:[]},nubes:{idUsarHTML:"nubes",tipoPersonaje:"nubes",estadosPosibles:{normal:{normal:"normal",imageUrl:"nubes"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"1px",colisiones:[]},pajaro:{idUsarHTML:"pajaro",tipoPersonaje:"pajaro",clasePersonaje:"PersonajeMovibleGrados",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"pajaro"}},estadoInicial:"normal",direccionInicial:180,zIndex:3,rotable:!0,colisiones:[{con:"nubes",factorDeAvance:.7,callback:a=>{a.terminar()},mensaje:"¡OH NO! No veo nada... no puedo seguir avanzando."},{con:"nubesCielo",factorDeAvance:.7,callback:a=>{a.terminar()},mensaje:"¡OH NO! No veo nada... no puedo seguir avanzando."},{con:"avion",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Hay aviones por aquí ... no puedo pasar..."},{con:"isla",factorDeAvance:1,callback:a=>{a.llegarALaIsla()}}]},nubesCielo:{idUsarHTML:"nubesCielo",tipoPersonaje:"nubes",estadosPosibles:{normal:{name:"normal",imageUrl:"nubesCielo"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:1,rotable:!1,paddingImagen:"1px",colisiones:[]},avion:{idUsarHTML:"avion",tipoPersonaje:"avion",estadosPosibles:{normal:{name:"normal",imageUrl:"avion"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"0.5px",colisiones:[]},isla:{idUsarHTML:"isla",tipoPersonaje:"isla",estadosPosibles:{normal:{name:"normal",imageUrl:"isla"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"0.5px",colisiones:[]},bombero:{idUsarHTML:"bombero",tipoPersonaje:"bombero",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"bombero",imagenUrl2:"chorroAgua"}},estadoInicial:"normal",direccionInicial:90,zIndex:4,rotable:!0,paddingImagen:"1px",colisiones:[{con:"fuego",factorDeAvance:1,callback:a=>{a.evaluar()}},{con:"arbol",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un árbol"},{con:"estacionBomberos",factorDeAvance:1,callback:a=>{a.llegarALaEstacionBomberos()}}],configPosicionamiento:{}},estacionBomberos:{idUsarHTML:"estacionBomberos",tipoPersonaje:"estacionBomberos",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"estacionBomberos"}},estadoInicial:"normal",direccionInicial:0,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[],configPosicionamiento:{}},fuego:{idUsarHTML:"fuego",tipoPersonaje:"fuego",estadosPosibles:{fuegoCero:{name:"fuegoCero",imageUrl:"fuegoCero"},fuegoUno:{name:"fuegoUno",imageUrl:"fuegoUno"},fuegoDos:{name:"fuegoDos",imageUrl:"fuegoDos"},fuegoTres:{name:"fuegoTres",imageUrl:"fuegoTres"},fuegoCuatro:{name:"fuegoCuatro",imageUrl:"fuegoCuatro"}},estadoInicial:"fuegoCuatro",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:3,rotable:!1,paddingImagen:"0.5px",colisiones:[]},chorroAgua:{idUsarHTML:"chorroAgua",tipoPersonaje:"chorroAgua",estadosPosibles:{normal:{name:"normal",imageUrl:"chorroAgua"}},estadoInicial:"normal",posicionInicialY:0,posicionInicialX:0,direccionInicial:0,zIndex:2,rotable:!1,paddingImagen:"0.5px",colisiones:[]}});this.ready=!0}obtenerPersonaje(a){return this.personajes[a]}}class m{constructor(){i(this,"tipos",[{name:"Eventos",categorystyle:"execute"},{name:"Movimientos",categorystyle:"movement"},{name:"Lápiz",categorystyle:"pencil"},{name:"Acciones",categorystyle:"action"},{name:"Repeticiones",categorystyle:"loops"},{name:"Condicionales",categorystyle:"logic"},{name:"Sensores",categorystyle:"sensor"}])}obtenerCategoriasNecesarias(a){let e,n=[];return a.forEach(r=>{e=this.tipos.find(l=>r==l.name),n.push(e)}),{tipos:n}}}export{t as D,m as a};