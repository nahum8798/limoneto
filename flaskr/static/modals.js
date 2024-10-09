$(document).ready(function() {
    $('#cookieTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

// Función para abrir el modal de modificar conjunto
function openModifyModal() {
    $('#modificarConjuntoModal').modal('show');
}

// Función para guardar los cambios del conjunto modificado
function guardarCambios() {
    let precio = document.getElementById('precio').value;
    let cantMax = document.getElementById('cant-max').value;
    let cantMin = document.getElementById('cant-min').value;

    console.log('Guardando cambios: Precio:', precio, 'Cantidad Máxima:', cantMax, 'Cantidad Mínima:', cantMin);
    $('#modificarConjuntoModal').modal('hide');  // Cerrar el modal después de guardar
}

// Función para abrir el modal de editar producto
function openEditModal(productCode) {
    console.log('Editar producto con código:', productCode);
    $('#editarModal').modal('show');
}

// Función para guardar los cambios de un producto editado
function guardarProducto() {
    let productName = document.getElementById('product-name').value;
    let productPrice = document.getElementById('product-price').value;
    let productQuantity = document.getElementById('product-quantity').value;

    console.log('Producto guardado:', productName, 'Precio:', productPrice, 'Cantidad:', productQuantity);
    $('#editarModal').modal('hide');  // Cerrar el modal después de guardar
}

// Función para abrir el modal de eliminar producto
function openDeleteModal(productCode) {
    console.log('Eliminar producto con código:', productCode);
    $('#eliminarModal').modal('show');
}

// Función para confirmar la eliminación de un producto
function confirmarEliminar() {
    console.log('Producto eliminado');
    $('#eliminarModal').modal('hide');  // Cerrar el modal después de eliminar
}
