import"../../style-fd100aa9.js";import{t as s,J as r,g as n,C as i,c as t}from"../../CustomCategory-95d3bfd7.js";import{D as c,a as l}from"../../Dhs-categorias-e45265ef.js";document.querySelector("#appActividad").innerHTML=s();const a=1e3;window.miJuego=new r(a);const d=[9,9],j=[[1,0,1,0,0,1,1,0,1],[0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,1,0,1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,0,1,1,0,0,0,0,0],[1,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0],[1,0,1,1,0,0,0,0,0]],e=new c,o=n(j),p=e.obtenerPersonaje("calle"),u=e.obtenerPersonaje("edificiosSendero"),g=e.obtenerPersonaje("ciclista"),f=e.obtenerPersonaje("barrera"),m=e.obtenerPersonaje("casaSendero"),b=e.obtenerPersonaje("pastoSendero"),P=e.obtenerPersonaje("arbolesSendero"),C=e.obtenerPersonaje("autoEmbotelladoIzq"),A=e.obtenerPersonaje("autoEmbotelladoDer"),S=e.obtenerPersonaje("escuelaSendero"),J={titulo:"¡BUEN TRABAJO!",imagen:"ciclista",texto:"¡Pedro llegó a la escuela a tiempo para su clase de inglés!",oculto:!0};miJuego.generarEscenario(d,2.5,"#a0a0a0");miJuego.agregarModal(J);const E=[{estrategia:"fijos",personajes:[u],posiciones:o.coordenadasPared,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[p],posiciones:o.coordenadasCamino,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[g],posiciones:[[7,1]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[f],posiciones:[[2,1]],aliasConjunto:"fijoBarrera",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[m],posiciones:[[8,1]],aliasConjunto:"fijoCasaSendero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[b],posiciones:[[7,5],[7,6],[7,7],[6,7],[5,7]],aliasConjunto:"fijoPastoSendero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[P],posiciones:[[8,5],[8,6],[8,7],[8,8],[7,8],[6,8],[5,8],[6,6],[5,6],[6,5],[5,5]],aliasConjunto:"fijoArboles",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[C],posiciones:[[3,0],[3,2],[3,3],[3,5],[3,6],[3,8]],aliasConjunto:"fijoAutosIzq",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[A],posiciones:[[4,0],[4,2],[4,3],[4,5],[4,6],[4,8]],aliasConjunto:"fijoAutosDer",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[S],posiciones:[[0,3]],aliasConjunto:"fijoEscuelaSendero",desapareceAlReiniciar:!1}];miJuego.crearPersonajes(E);miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[81]);miJuego.personajePrincipal.llegarEscuela=function(){this.abrirYMostrarModal()};const R=new i(miJuego,a),v=new l,D=v.obtenerCategoriasNecesarias(["Eventos","Movimientos"]),q=[["on_execute","Eventos"],["move_classic_param","Movimientos"]],w='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}',M=["moverDerecha","moverAbajo","moverArriba","moverIzquierda"];t(R,D,q,w,M);
