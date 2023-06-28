async function erase() {
    const confirmacion = await Swal.fire({
      title:
        "Con este botón podrás borrar todas las instrucciones ya programadas.",
      text: "¿Deseas eliminarlas?",
      icon: "warning",
      confirmButtonText: "¡Sí, eliminar!",
      showCancelButton: true,
      cancelButtonText: "¡No, cancelar!",
      color: "white",
      background: "gray",
      confirmButtonColor: "#007a4c",
      cancelButtonColor: "#cc5a47",
    });
    if (confirmacion.isConfirmed) {
      let elem = document.querySelector("#dhs-lista2");
      elem.innerHTML = "";
    }
  }