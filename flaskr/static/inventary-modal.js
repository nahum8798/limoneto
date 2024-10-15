// Obtener los botones y los modales
var modalAgregar = document.getElementById('modal-agregar');
var modalFaltantes = document.getElementById('modal-faltantes');
var modalEliminar = document.getElementById('modal-eliminar');

var btnAgregar = document.querySelector('.btn-agregar');
var btnFaltantes = document.querySelector('.btn-faltantes');
var btnEliminar = document.querySelector('.btn-eliminar');

var closeBtns = document.querySelectorAll('.close');

// Función para abrir el modal de agregar categoría
btnAgregar.onclick = function() {
    modalAgregar.style.display = 'block';
}

// Función para abrir el modal de ver productos faltantes
btnFaltantes.onclick = function() {
    modalFaltantes.style.display = 'block';
}

// Función para abrir el modal de eliminar categoría
btnEliminar.onclick = function() {
    modalEliminar.style.display = 'block';
}

// Función para cerrar los modales
closeBtns.forEach(function(btn) {
    btn.onclick = function() {
        modalAgregar.style.display = 'none';
        modalFaltantes.style.display = 'none';
        modalEliminar.style.display = 'none';
    }
});

// Cerrar los modales si se hace clic fuera del modal
window.onclick = function(event) {
    if (event.target == modalAgregar) {
        modalAgregar.style.display = 'none';
    }
    if (event.target == modalFaltantes) {
        modalFaltantes.style.display = 'none';
    }
    if (event.target == modalEliminar) {
        modalEliminar.style.display = 'none';
    }
}
