class Personaje {
  constructor(id, nombre, vidas) {
    this.idPersonaje = id;
    this.nombre = nombre;
    this.vivo = true;
    this.vidas = vidas;
    this.vidasRestantes = vidas;// van a tener más de una vida?
  }
}
