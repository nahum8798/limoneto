// Abre el modal
function openModal() {
    document.getElementById('sale-modal').style.display = 'block';
  }
  
  // Cierra el modal
  function closeModal() {
    document.getElementById('sale-modal').style.display = 'none';
  }
  
  // Cierra el modal cuando se hace clic fuera del contenido del modal
  window.onclick = function(event) {
    var modal = document.getElementById('sale-modal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
  
  // Asocia los botones a las funciones
  document.getElementById('open-modal-btn').addEventListener('click', openModal);
  document.querySelector('.close').addEventListener('click', closeModal);
  