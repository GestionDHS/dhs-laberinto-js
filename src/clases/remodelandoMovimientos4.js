class Personaje { // incluy solo métodos a modificar y/o agregar

    moverse(vectorY, vectorX) {
        // tal cual esta
    }

    // GIROS Y ROTACIONES
    
    apuntarEnDireccion(nuevaDireccion) {
        if (!this.estaVivo) { return false }
        this.direccion = nuevaDireccion;
        this.controladorDOM.rotarPersonaje(this.direccion);
    }

    girarGrados(grados) {
        const nuevaDireccion = this.direccion + grados;
        return this.apuntarEnDireccion(nuevaDireccion)
    }

    girarIzquierda(grados=90) {
        return this.girarGrados(-grados)
    }

    girarDerecha(grados=90) {
        return this.girarGrados(grados)
    }

    // AVANCES
    avanzar(veces = 1) {
        const vector = this.obtenerVectorAvance(this.direccion);
        return this.iterarVectorMovimiento(veces, vector);
    }
    moverArriba(veces = 1) {
        return this.iterarVectorMovimiento(veces, [-1, 0]);
    }
    moverAbajo(veces = 1) {
        return this.iterarVectorMovimiento(veces, [+1, 0]);
    }
    moverIzquierda(veces = 1) {
        return this.iterarVectorMovimiento(veces, [0, -1]);
    }
    moverDerecha(veces = 1) {
        return this.iterarVectorMovimiento(veces, [0, +1]);
    }

    // ACCESORIOS PARA MOVIMIENTOS

    obtenerVectorAvance(direccion) {
        const moduloDireccion360 =  direccion%360; // 0 || +/-90 || +/-180 || +/-270
        const moduloDireccion360Positivo = moduloDireccion360 < 0 ? 360-moduloDireccion360 : moduloDireccion360; // 0 || 90 || 180 || 270 
        const puntoCardinal = moduloDireccion360Positivo/90; // 0 || 1 || 2 || 3
        if(Number.isInteger(puntoCardinal) && puntoCardinal >= 0 && puntoCardinal <= 3){
            const vectores = [[-1,0],[0, +1],[+1, 0],[0,-1]];
            const vectorUsar = vectores[puntoCardinal];
            return vectorUsar
        }else{
            throw new Error("Ocurrió un problema al intentar avanzar() en una dirección no permitida: " + direccion);
        }
    }
    iterarVectorMovimiento(veces, vector) {
        if (!this.estaVivo) { return false }
        if (typeof veces !== "number" || !Number.isInteger(veces) || veces < 1) {
            throw new Error('¡Cuidado! - Esta función de movimiento solo acepta números enteros positivos como parámetros.');
        }
        if (this.juego.sincronico) {
            return this.iterarVectorMovimientoSincronicamente(veces, vector);
        } else {
            return this.iterarVectorMovimientoAsincronicamente(veces, vector);
        }
    }
    iterarVectorMovimientoSincronicamente(veces, vector) {
        let i = 0;
        while (i < veces && this.estaVivo) {
            this.moverse(...vector);
            i++;
        }
        return this.estaVivo;
    }
    iterarVectorMovimientoAsincronicamente(veces, vector) {
        this.moverse(...vector)
        if (veces > 1 && this.estaVivo) {
            setTimeout(() => {
                this.iterarVectorMovimientoAsincronicamente(veces - 1);
            }, this.juego.duracionIntervalos)
        } else {
            return this.estaVivo;
        }
    }

}