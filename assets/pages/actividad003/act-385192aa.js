import"../../style-fd100aa9.js";import{t,g as c,C as l,c as d,J as p}from"../../CustomCategory-95d3bfd7.js";import{D as j,a as u}from"../../Dhs-categorias-e45265ef.js";document.querySelector("#appActividad").innerHTML=t();const r=1e3,e=new p(r),g=[7,7],s=[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]],o=c(s),a=new j,m=a.obtenerPersonaje("recuadroPintableDeseado"),b=a.obtenerPersonaje("fondo"),f=a.obtenerPersonaje("lapiz"),P={titulo:"¡BUEN TRABAJO!",imagen:"lapizRojo",texto:"Lograste realizar el dibujo",oculto:!0};e.generarEscenario(g,2.5,"white");e.agregarModal(P);let C=[{estrategia:"fijos",personajes:[b],posiciones:o.coordenadasPared,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[m],posiciones:o.coordenadasCamino,aliasConjunto:"fijosTablero",desapareceAlReiniciar:!1},{estrategia:"fijos",personajes:[f],posiciones:[[5,1]],aliasConjunto:"fijoPrincipal",desapareceAlReiniciar:!1}];e.crearPersonajes(C);e.setearPersonajePrincipal(e.listaDePersonajes[49]);const z="#FA3939",D=s.map(n=>n.map(i=>i===1?!1:z));e.personajePrincipal.dibujoDeseado=D;const v=new l(e,r),A=new u,w=A.obtenerCategoriasNecesarias(["Eventos","Movimientos","Lápiz"]),E=[["on_execute","Eventos"],["avanzar_param","Movimientos"],["girar_clasico","Movimientos"],["lapiz","Lápiz"]],J='{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}',x=["avanzar","girarIzquierda","girarDerecha","girarGrados","apuntarEnDireccion","bajarLapiz","subirLapiz","setearColor"];d(v,w,E,J,x);
