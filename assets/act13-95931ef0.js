import"./style-fd100aa9.js";import{t as n,g as i,C as t,c,J as l}from"./CustomCategory-cad1fe77.js";import{D as d,a as p}from"./Dhs-categorias-48bc0eab.js";document.querySelector("#appActividad").innerHTML=n();const s=1e3,e=new l(s),j=[5,6],f=[[1,1,1,1,1,1],[1,0,0,0,0,1],[1,1,0,1,0,1],[1,0,0,0,0,1],[1,1,1,1,1,1]],o=new d,r=i(f),u=o.obtenerPersonaje("arbol"),m=o.obtenerPersonaje("pasto"),b=o.obtenerPersonaje("lupe"),g=o.obtenerPersonaje("cofre"),P=o.obtenerPersonaje("lodo"),C={titulo:"¡BUEN TRABAJO!",imagen:"monedas",texto:"Encontramos 180 monedas de oro!",oculto:!0};e.generarEscenario(j,3,"#9ca64e");e.agregarModal(C);const h=[{estrategia:"fijos",personajes:[u],posiciones:r.coordenadasPared,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[m],posiciones:r.coordenadasCamino,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[b],posiciones:[[1,1]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[g],posiciones:[[3,4]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[P],posiciones:[[1,3]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1}];e.crearPersonajes(h);e.setearPersonajePrincipal(e.listaDePersonajes[30]);e.personajePrincipal.abrirCofre=function(){const a=this.buscarParaRealizarAccion("cofre","abrirse");if(a.objetoEncontrado){if(!a.exito)return this.decirTerminar("¡Oh! Este cofre ya estaba abierto.")}else return this.decirTerminar("¡Oh! Aquí no hay cofre.");if(this.mochila.length===1)this.abrirYMostrarModal();else return this.decirTerminar("¡Oh! El cofre está sin abrir.")};const A=new t(e,s),v=new p,E=v.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones"]),R=[["on_execute","Eventos"],["move_classic_simple","Movimientos"],["abrir_cofre","Acciones"]],T='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}',x=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre"];c(A,E,R,T,x);