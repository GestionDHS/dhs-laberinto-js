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
      },
      lapizRepeticiones:{
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
          {
            name: "Repeticiones",
            categorystyle: "loop_category",
          },
          ],
      },
      accionRepeticiones:{
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
            name: "Acciones",
            categorystyle: "action",
          },
          {
            name: "Repeticiones",
            categorystyle: "loop_category",
          },
          ],
      }
  }
}