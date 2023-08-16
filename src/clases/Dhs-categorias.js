export class Dhs_Categorias {
  tipos = [
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
      name: "Acciones",
      categorystyle: "action",
    },
    {
      name: "Repeticiones",
      categorystyle: "loop_category",
    },
    {
      name: "Condicionales",
      categorystyle: "logic_category",
    },
    {
      name: "Sensores",
      categorystyle: "sensor",
    },
  ];

  obtenerCategoriasNecesarias(arrayCategorias) {
    let categoria;
    let aux = [];
    arrayCategorias.forEach((stringABuscar) => {
      categoria = this.tipos.find((tipo) => stringABuscar == tipo.name);
      aux.push(categoria);
    });
    return { tipos: aux };
  }

}
