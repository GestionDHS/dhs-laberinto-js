export class Dhs_Categorias {
  obtenerCategoria(nombre) {
    return this.categoriasDeseadas[nombre];
  }
  categoriasDeseadas = {
    eventosMovimientos: {
      tipos: [
        {
          name: "Eventos",
          categorystyle: "execute",
        },
        {
          name: "Movimientos",
          categorystyle: "movement",
        },
      ],
    },
    eventMovAcciones: {
      tipos: [
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
      ],
    },
    accionRepeticiones: {
      tipos: [
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
    },
    lapiz: {
      tipos: [
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
    lapizRepeticiones: {
      tipos: [
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
    lapizCondicional: {
      tipos: [
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
      ],
    },
      repCondiSensor: {
        tipos: [
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
          {
            name: "Condicionales",
            categorystyle: "logic_category",
          },
          {
            name: "Sensores",
            categorystyle: "sensor"
          },
        ],
    },
    pajaro: {
      tipos: [
        {
          name: "Eventos",
          categorystyle: "execute",
        },
        {
          name: "Movimientos",
          categorystyle: "movement",
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
          categorystyle: "sensor"
        },
      ],},
  };
}
