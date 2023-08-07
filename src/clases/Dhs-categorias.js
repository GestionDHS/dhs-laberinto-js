export class Dhs_Categorias {
 
  obtenerCategoria(nombre) {
    return this.categoriasDeseadas[nombre];
  }
  categoriasDeseadas={
      lapiz:{
        tipos : [
            {
              name: "Eventos",
              categorystyle: "execute",
            },
            {
              name: "Movimientos",
              categorystyle: "movement",
            },
            {
              name: "Lápiz",
              categorystyle: "pencil",
            },
          ],
      }
  }
}