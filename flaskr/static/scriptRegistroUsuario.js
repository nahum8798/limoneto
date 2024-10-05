let idCliente = 0;
const formularioRegistro = document.getElementById('formulario-registro');
const nombreInput = document.getElementById('nombre');
const cuitInput = document.getElementById('cuit');
const razonSocialInput = document.getElementById('razonSocial');
const direccionInput = document.getElementById('direccion');
const telefonoInput = document.getElementById('telefono');
const correoInput = document.getElementById('correo');
const errorMessage = document.getElementById('error-message');
const confirmDelete = document.getElementById('confirm-delete');
const detalleVenta = document.getElementById('detalle-Venta');
const detalleContenido = document.getElementById('detalle-contenido');

formularioRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Validación que el cliente existe
    const clientes = document.querySelectorAll('#client-list li span:first-child');
    for (const cliente of clientes) {
        if (cliente.textContent === nombreInput.value) {
            mostrarMensajeError('El Cliente ya está registrado');
            return;
        }
    }

    idCliente++;
    const nuevoCliente = document.createElement('li');
    nuevoCliente.id = `cliente-${idCliente}`;
    nuevoCliente.innerHTML = `
        <span>${nombreInput.value}</span>
        <span>${cuitInput.value}</span>
        <button class="view-button" onclick="mostrarDetallesCliente(${idCliente})">Ver</button>
        <button class="delete-button" onclick="eliminarCliente(${idCliente})">Eliminar</button>
    `;

    document.getElementById('client-list').appendChild(nuevoCliente);

    // Limpiar el formulario
    formularioRegistro.reset();
});

            

    // Cerrar el formulario de Registro de Cliente
    document.querySelector('#register-form .close-button').addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'none';
    });

    

    // Cerrar el modal de Cambio de Usuario
    document.querySelector('#user-modal .close-button').addEventListener('click', function() {
        document.getElementById('user-modal').classList.remove('show');
    });

    // Cerrar el modal de Cambio de Usuario al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        const userModal = document.getElementById('user-modal');
        if (event.target === userModal) {
            userModal.classList.remove('show');
        }
    });

    // Cerrar el detalle de cliente
    document.querySelector('#client-details .close-button').addEventListener('click', function() {
        document.getElementById('client-details').style.display = 'none';
    });

    // Cerrar el detalle de venta
    document.querySelector('#detalle-Venta .close-button').addEventListener('click', function() {
        document.getElementById('detalle-Venta').style.display = 'none';
    });

    // Cerrar el confirm-delete-client
    document.querySelector('#confirm-delete-client .btn-secondary').addEventListener('click', function() {
        document.getElementById('confirm-delete-client').classList.remove('show');
    });

    // Cerrar el confirm-delete
    document.querySelector('#confirm-delete .btn-secondary').addEventListener('click', function() {
        document.getElementById('confirm-delete').classList.remove('show');
    });
    




function confirmarEliminacionCliente(confirmacion){
    if(confirmacion){
        const clienteEliminar= document.getElementById(`cliente-${ventaParaEliminar}`);
        if(clienteEliminar){
            clienteEliminar.remove();
        }
    }
    document.getElementById('confirm-delete-client').style.display='none';
}

function confirmarEliminacion(confirmacion){
    if(confirmacion){
        ventaParaEliminar.remove();
    }
    document.getElementById('confirm-delete').style.display='none';
}

function mostrarFormularioRegistro() {
    const form = document.getElementById('register-form');
    const details = document.getElementById('client-details');

    if (form.style.display === 'none') {
        form.style.display = 'block';
        details.style.display = 'none';
    } else {
        form.style.display = 'none';
    }
}

document.querySelector('.register-client-button').addEventListener('click', mostrarFormularioRegistro);

function mostrarDetallesCliente(idCliente) {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('client-details').style.display = 'block';

    // Obtener información del cliente (ejemplo)
    const cliente = document.getElementById(`cliente-${idCliente}`);
    const nombre = cliente.querySelector('span:first-child').textContent;
    const cuit = cliente.querySelector('span:nth-child(2)').textContent;

    // Mostrar la información del cliente
    document.getElementById('cliente-info').innerHTML = `
        <div><span>Nombre/Empresa:</span> <span>${nombre}</span></div>
        <div><span>CUIL/CUIT:</span> <span>${cuit}</span></div>
        <div><span>Razón Social:</span> <span>Ejemplo Razón Social</span></div>
        <div><span>Dirección:</span> <span>Ejemplo Dirección</span></div>
        <div><span>Teléfono:</span> <span>Ejemplo Teléfono</span></div>
        <div><span>Correo Electrónico:</span> <span>ejemplo@email.com</span></div>
    `;

    document.getElementById('ventas-list').innerHTML = `
        <li>Venta 1 <button onclick="mostrarDetalleVenta(${idCliente}, 1)">Ver Detalle</button><button onclick="confirmarEliminacionVenta(this)">Eliminar</button></li>
        <li>Venta 2 <button onclick="mostrarDetalleVenta(${idCliente}, 2)">Ver Detalle</button><button onclick="confirmarEliminacionVenta(this)">Eliminar</button></li>
    `;
    document.getElementById('compras-list').innerHTML = `
        <li>Compra 1 <button onclick="mostrarDetalleCompra(${idCliente}, 1)">Ver Detalle</button></li>
        <li>Compra 2 <button onclick="mostrarDetalleCompra(${idCliente}, 2)">Ver Detalle</button></li>
    `;
}

function mostrarMensajeError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}


let ventaParaEliminar;

function confirmarEliminacionVenta(button) {
    ventaParaEliminar = button.parentElement;
    confirmDelete.style.display = 'flex';
}

function confirmarEliminacion(confirmacion) {
    if (confirmacion) {
        ventaParaEliminar.remove(idCliente);
    }
    confirmDelete.style.display = 'none';
}

function mostrarDetalleVenta(idCliente, idVenta) {
    let detalleHtml = '';

    // Ejemplo de datos, puedes reemplazar esto con los datos reales de la venta o compra.
    detalleHtml = `
        <h3>Detalle de venta #${idVenta}</h3>
        <table>
            <tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>
            <tr><td>Café con leche grande</td><td>1</td><td>$1800</td></tr>
            <tr><td>Tortita de jamón y queso</td><td>1</td><td>$1000</td></tr>
            <tr><td>Porción de cheesecake de oreo</td><td>1</td><td>$2500</td></tr>
            <tr><td>Cookies de maracuyá</td><td>2</td><td>$3200</td></tr>
            <tr><td>Trufas</td><td>3</td><td>$450</td></tr>
        </table>
        <p>Fecha: 2024-MM-DD</p>
        <p>Hora: 10:30 am</p>
        <p>Total de la venta: $8950</p>
    `;

    detalleContenido.innerHTML = detalleHtml;
    detalleVenta.style.display = 'block';
}





function imprimirTicket(saleId) {
    // Imprime los detalles de la venta.
    // Puedes usar una ventana emergente para mostrar los detalles.
    // Ejemplo:
    window.open("", "Venta " + saleId, "width=800,height=600");
    // Puedes agregar aquí el código HTML de los detalles de la venta.
}

//function eliminarVenta(saleId) {
    // Elimina la venta del historial.
    // Puedes usar AJAX para eliminar la venta de la base de datos.
    // Ejemplo:
    // $.ajax({
    //     url: "delete_sale.php",
    //     type: "POST",
    //     data: {
    //         saleId: saleId
    //     },
    //     success: function(response) {
    //         // Actualiza la tabla de ventas.
    //     }
    // });
    //alert("Venta " + saleId + " eliminada.");}

//function eliminarCliente() {
    // Elimina el cliente.
    // Puedes usar AJAX para eliminar el cliente de la base de datos.
    // Ejemplo:
    // $.ajax({
    //     url: "delete_client.php",
    //     type: "POST",
    //     data: {
    //         clientId: 1 // ID del cliente
    //     },
    //     success: function(response) {
    //         // Redirecciona a la página de clientes.
    //     }
    // });
    //alert("Cliente eliminado.");}

    
// Obtener referencias a elementos del DOM
const changeUserBtn = document.getElementById('change-user-btn');
const userModal = document.getElementById('user-modal');
const closeModalBtn = userModal.querySelector('.close');
const changeUserForm = document.getElementById('change-user-form');

// Función para abrir el modal de cambio de usuario
changeUserBtn.addEventListener('click', function() {
  userModal.style.display = 'block'; // Mostrar el modal
});

// Función para cerrar el modal
closeModalBtn.addEventListener('click', function() {
  userModal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal haciendo clic fuera de él
window.addEventListener('click', function(event) {
  if (event.target === userModal) {
    userModal.style.display = 'none';
  }
});

// Manejar el envío del formulario de cambio de usuario
changeUserForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de usuario y contraseña
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Aquí podrías implementar la lógica para autenticar al nuevo usuario
  // Por ejemplo, realizar una solicitud al servidor para validar las credenciales del usuario

  // Simulación de cambio de usuario exitoso
  if (username && password) {
    alert(`Usuario cambiado a: ${username}`);
    userModal.style.display = 'none'; // Cerrar el modal después del cambio exitoso
  } else {
    alert('Por favor ingrese un nombre de usuario y contraseña válidos.');
  }
});
