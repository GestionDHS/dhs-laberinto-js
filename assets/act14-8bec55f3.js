import"./style-a84a8ce8.js";import{t as l,J as t,C as d,a as m}from"./CustomToolbox-4c8b67cf.js";document.querySelector("#appActividad").innerHTML=l();const r=1e3;window.miJuego=new t(r);const n=[4,5],i=[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]],s={idUsarHTML:"arbol",tipoPersonaje:"arbol",estadosPosibles:{normal:{name:"normal",imageUrl:"arboles"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},c={idUsarHTML:"camino",tipoPersonaje:"camino",estadosPosibles:{normal:{name:"normal",imageUrl:"pasto"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1,paddingImagen:"1px"},g={titulo:"¡BUEN TRABAJO!",imagen:"brujula",texto:"Encontramos una brújula antigua!",oculto:!0};miJuego.generarEscenario(n,i,4,"#9ca64e",s,c);miJuego.agregarModal(g);miJuego.generarCaminoYpared(n,i,s,c);const u=[{idUsarHTML:"lupe",tipoPersonaje:"lupe",clasePersonaje:"PersonajeMovibleSimple",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"lupe"}},estadoInicial:"normal",posicionInicialY:1,posicionInicialX:3,direccionInicial:0,zIndex:3,rotable:!0,paddingImagen:"1px",colisiones:[{con:"bandera",factorDeAvance:1,callback:a=>{a.llegarALaBandera()}},{con:"arbol",factorDeAvance:.2,callback:a=>{a.terminar()},mensaje:"¡OH NO! Choqué contra un árbol"}]},{idUsarHTML:"cofre",tipoPersonaje:"cofre",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"cofre"},abierto:{name:"abierto",imageUrl:"cofreAbierto"}},estadoInicial:"cerrado",posicionInicialY:1,posicionInicialX:1,direccionInicial:0,zIndex:2,rotable:!1,colisiones:[],paddingImagen:"1px"}];miJuego.generarPersonajes(u);miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[20]);miJuego.personajePrincipal.abrirCofre=function(){const a=this.buscarParaRealizarAccion("cofre","abrirse");if(a.objetoEncontrado){if(!a.exito)return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.")}else return this.decirTerminar("¡Oh! Aquí no hay cofre.");if(this.mochila.length===1)this.abrirYMostrarModal();else return this.decirTerminar("¡Oh! El cofre está sin abrir.")};const e=new d(miJuego,r),b=[{name:"Eventos",categorystyle:"execute"},{name:"Movimientos",categorystyle:"movement"},{name:"Acciones",categorystyle:"action"}];b.forEach(a=>e.ConfiguradorBloques.crearCategoriaToolbox(a));const p=[["on_execute","Eventos"],["move_classic_simple","Movimientos"],["abrir_cofre","Acciones"]];p.forEach(a=>{e.ConfiguradorBloques.configurarUnBloqueCustomStandard(...a)});const I=new m;I.registrarRender("renderDHS");e.crearInyectarWorkspace("dhs-blockly-div",{toolbox:e.ConfiguradorBloques.toolbox,theme:"themeDH",renderer:"renderDHS",zoom:{controls:!0,wheel:!0,pinch:!0}});const C='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';e.setearYCargarBloquesIniciales(JSON.parse(C));e.setearEventoCambioWorkspaceStandard();e.habilitarDesactivarHuerfanos();e.crearFuncionesGlobalesStandard();e.juego.agregarGlobalConCallback("moverDerecha");e.juego.agregarGlobalConCallback("moverAbajo");e.juego.agregarGlobalConCallback("moverArriba");e.juego.agregarGlobalConCallback("moverIzquierda");e.juego.agregarGlobalConCallback("abrirCofre");const f=e.juego.generarCallbackParaInterprete();e.setearCallbackInterprete((a,o)=>{e.callbackInterpreteStandard(a,o),f(a,o)});