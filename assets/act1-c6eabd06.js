import"./style-fd100aa9.js";import{t as s,C as l,J as c}from"./CustomCategory-cad1fe77.js";document.querySelector("#appActividad").innerHTML=s();const i=1e3,o=new c(i),n=[5,6],t=[[1,1,1,1,1,1],[1,0,0,0,0,1],[1,1,0,1,0,1],[1,0,0,0,0,1],[1,1,1,0,1,1]],d={idUsarHTML:"arbol",tipoPersonaje:"arbol",estadosPosibles:{normal:{name:"normal",imageUrl:"arboles"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1},u={idUsarHTML:"camino",tipoPersonaje:"camino",pintable:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"pasto"}},estadoInicial:"normal",zIndex:1,posicionInicialY:0,posicionInicialX:0,direccionInicial:0,rotable:!1},m={titulo:"¡BUEN TRABAJO!",imagen:"monedas",texto:"Encontramos 180 monedas de oro.",oculto:!0};o.generarEscenario(n,3,"white");o.agregarModal(m);o.generarCaminoYpared(n,t,d,u);const b=[{idUsarHTML:"lupe",tipoPersonaje:"lupe",clasePersonaje:"PersonajeDibujante",tieneTooltip:!0,estadosPosibles:{normal:{name:"normal",imageUrl:"lupe"}},estadoInicial:"normal",posicionInicialY:3,posicionInicialX:3,direccionInicial:0,zIndex:3,rotable:!0,colisiones:[{con:"lodo",factorDeAvance:.7,callback:e=>{e.terminar()},mensaje:"¡OH NO! Me atasqué en el lodo."},{con:"arbol",factorDeAvance:.2,callback:e=>{e.terminar()},mensaje:"¡OH NO! Choqué contra un árbol"}]},{idUsarHTML:"lodo",tipoPersonaje:"lodo",estadosPosibles:{normal:{name:"normal",imageUrl:"lodo"}},estadoInicial:"normal",posicionInicialY:1,posicionInicialX:3,direccionInicial:0,zIndex:1,rotable:!1,colisiones:[]},{idUsarHTML:"cofre",tipoPersonaje:"cofre",estadosPosibles:{cerrado:{name:"cerrado",imageUrl:"cofre"},abierto:{name:"abierto",imageUrl:"cofreAbierto"}},estadoInicial:"cerrado",posicionInicialY:3,posicionInicialX:4,direccionInicial:0,zIndex:2,rotable:!1,colisiones:[]},{idUsarHTML:"basura",tipoPersonaje:"basura",estadosPosibles:{normal:{name:"normal",imageUrl:"basura"},juntado:{name:"juntado",imageUrl:"pasto"}},estadoInicial:"normal",posicionInicialY:2,posicionInicialX:2,direccionInicial:0,zIndex:2,rotable:!0,colisiones:[]}];o.generarPersonajes(b);o.setearPersonajePrincipal(o.listaDePersonajes[30]);o.personajePrincipal.abrirCofre=function(){const e=this.buscarParaRealizarAccion("cofre","abrirse");return e.objetoEncontrado?e.exito?this.abrirYMostrarModal():this.decirTerminar("Oh! Este cofre ya estaba abierto."):this.decirTerminar("Oh! Aquí no hay cofre.")};o.personajePrincipal.juntarBasura=function(){const e=this.buscarParaRealizarAccion("basura","serJuntado");return e.objetoEncontrado?e.exito||this.decirTerminar("Oh! Hubo un problema al juntar la basura."):this.decirTerminar("Oh! Aquí no hay basura."),e};const a=new l(o,i),g=[{name:"Eventos",categorystyle:"execute"},{name:"Movimientos",categorystyle:"movement"},{name:"Lápiz",categorystyle:"pencil"},{name:"Acciones",categorystyle:"action"},{name:"Condicionales",categorystyle:"logic_category"},{name:"Repeticiones",categorystyle:"loop_category"}];g.forEach(e=>a.ConfiguradorBloques.crearCategoriaToolbox(e));const p=[["on_execute","Eventos"],["move_classic_simple","Movimientos"],["move_classic_param","Movimientos"],["avanzar_param","Movimientos"],["girar_clasico","Movimientos"],["girar_grados","Movimientos"],["apuntar_hacia","Movimientos"],["abrir_cofre","Acciones"],["juntar_basura","Acciones"],["lapiz","Lápiz"],["if","Condicionales"],["controls","Repeticiones"]];p.forEach(e=>{a.ConfiguradorBloques.configurarUnBloqueCustomStandard(...e)});const C=new CustomRenderer;C.registrarRender("renderDHS");a.crearInyectarWorkspace("dhs-blockly-div",{toolbox:a.ConfiguradorBloques.toolbox,theme:"themeDH",renderer:"renderDHS",zoom:{controls:!0,wheel:!0,pinch:!0}});const I='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';a.setearYCargarBloquesIniciales(JSON.parse(I));a.setearEventoCambioWorkspaceStandard();a.habilitarDesactivarHuerfanos();a.crearFuncionesGlobalesStandard();a.juego.agregarGlobalConCallback("abrirCofre");a.juego.agregarGlobalConCallback("juntarBasura");a.juego.agregarGlobalConCallback("avanzar");a.juego.agregarGlobalConCallback("girarIzquierda");a.juego.agregarGlobalConCallback("girarDerecha");a.juego.agregarGlobalConCallback("girarGrados");a.juego.agregarGlobalConCallback("apuntarEnDireccion");a.juego.agregarGlobalConCallback("bajarLapiz");a.juego.agregarGlobalConCallback("subirLapiz");a.juego.agregarGlobalConCallback("setearColor");const j=a.juego.generarCallbackParaInterprete();a.setearCallbackInterprete((e,r)=>{a.callbackInterpreteStandard(e,r),j(e,r)});