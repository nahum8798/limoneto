function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return day + '/' + month +'/' + year;
}

const fechaActual = new Date();
const dateAct = document.getElementById('dateAct');


/* poner fecha en html */
dateAct.innerText = formatDate(fechaActual);


// Apertura modal de estadisticas


document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const ventaDetalles = document.getElementById("venta-detalles");
  
    // Muestra el modal cuando se hace clic en un div con clase .flex-sales
    document.querySelectorAll('.flex-sales').forEach(item => {
      item.addEventListener('click', () => {
        const nroVenta = item.querySelector('.nro-venta').textContent;
        const horaVenta = item.querySelector('.hora-venta').textContent;
        const precioVenta = item.querySelector('.precio-venta').textContent;
        
        // Añade los detalles al modal
        ventaDetalles.innerHTML = `<strong>${nroVenta}</strong><br>${horaVenta}<br>${precioVenta}`;
        
        // Muestra el modal
        modal.style.display = "block";
      });
    });
  
    // Oculta el modal cuando se hace clic en el botón de cerrar
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    // Oculta el modal cuando se hace clic fuera del contenido del modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });
  
  
