import"./style-fd100aa9.js";import{t as n,g as i,C as t,c,J as l}from"./CustomCategory-95d3bfd7.js";import{D as d,a as u}from"./Dhs-categorias-e45265ef.js";document.querySelector("#appActividad").innerHTML=n();const r=1e3,e=new l(r),p=[8,10],j=[[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],s=i(j),a=new d,b=a.obtenerPersonaje("lupe"),m=a.obtenerPersonaje("basura"),g=a.obtenerPersonaje("pasto"),f=a.obtenerPersonaje("arbol"),h=a.obtenerPersonaje("plantaRecicladoraSinFondo"),P={titulo:"¡BUEN TRABAJO!",imagen:"basura",texto:"¡Quedó todo limpito!.",oculto:!0};e.generarEscenario(p,2.5,"#9ca64e");e.agregarModal(P);let A=[{estrategia:"fijos",personajes:[b],posiciones:[[6,1]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[f],posiciones:s.coordenadasPared,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[g],posiciones:s.coordenadasCamino,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[m],posiciones:[[2,4],[3,3],[5,5],[4,2],[4,6],[3,7]],aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[h],posiciones:[[1,8]],aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1}];e.crearPersonajes(A);e.setearPersonajePrincipal(e.listaDePersonajes[0]);e.personajePrincipal.juntarBasura=function(){const o=this.buscarParaRealizarAccion("basura","serJuntado");if(o.objetoEncontrado){if(!o.exito)return this.decirTerminar("¡Oh! Ya levantamos la basura de aquí.")}else return this.decirTerminar("¡Oh! Aquí no hay basura...")};e.personajePrincipal.llegarALaBandera=function(){if(console.log(this.mochila.length),this.mochila.length===7)this.abrirYMostrarModal();else return this.decirTerminar("¡Oh! Quedo basura por levantar.")};const C=new t(e,r),v=new u,R=v.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones"]),T=[["on_execute","Eventos"],["move_classic_simple","Movimientos"],["juntar_basura","Acciones"],["repeat_times","Repeticiones"]],J='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}',_=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","juntarBasura"];c(C,R,T,J,_);