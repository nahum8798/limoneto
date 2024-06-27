document.addEventListener('DOMContentLoaded', (event) => {
    // Variables iniciales
    let saldoCaja = 0;
    let cajeroActual = '';

    // Función para actualizar los datos del cajero
    function actualizarDatosCajero(cajero) {
        cajeroActual = cajero;
        document.getElementById('cajero-cierre').value = cajeroActual;
        document.getElementById('cajero-retirar').value = cajeroActual;
    }

    // Obtener los botones y ventanas modales
    const btnAbrirCaja = document.getElementById('btn-abrir-caja');
    const ventanaApertura = document.getElementById('ventana-apertura');
    const btnCerrarCaja = document.getElementById('btn-cerrar-caja');
    const ventanaCierre = document.getElementById('ventana-cierre');
    const btnCambiarUsuario = document.getElementById('btn-cambiar-usuario');
    const ventanaCambioUsuario = document.getElementById('ventana-cambio-usuario');

    // Función para mostrar/ocultar botones según el estado de la caja
    function actualizarEstadoCaja(estado) {
        if (estado === 'abierta') {
            btnAbrirCaja.style.display = 'none';
            btnCerrarCaja.style.display = 'block';
        } else {
            btnAbrirCaja.style.display = 'block';
            btnCerrarCaja.style.display = 'none';
            const btnRetirarDinero = document.getElementById('btn-retirar-dinero');
            if (btnRetirarDinero) {
                btnRetirarDinero.remove();
            }
        }
    }

    // Inicializar estado de la caja como cerrada
    actualizarEstadoCaja('cerrada');

    // Apertura de caja
    btnAbrirCaja.onclick = function() {
        ventanaApertura.style.display = 'block';
    }

    // Cerrar caja
    btnCerrarCaja.onclick = function() {
        ventanaCierre.style.display = 'block';
        document.getElementById('fecha-cierre').value = new Date().toLocaleDateString();
        document.getElementById('hora-cierre').value = new Date().toLocaleTimeString();
    }

    // Cambiar usuario
    btnCambiarUsuario.onclick = function() {
        ventanaCambioUsuario.style.display = 'block';
    }

    // Cerrar ventanas modales
    const btnsCerrar = document.querySelectorAll('.cerrar, .btn-cerrar');
    btnsCerrar.forEach(function(btnCerrar) {
        btnCerrar.onclick = function() {
            btnCerrar.closest('.modal').style.display = 'none';
        }
    });

    // Cerrar ventanas modales cuando se hace clic fuera de ellas
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Confirmar apertura de caja
    const btnConfirmarApertura = document.getElementById('confirmar');
    btnConfirmarApertura.onclick = function() {
        cajeroActual = document.getElementById('cajero').value;
        const dineroInicial = parseFloat(document.getElementById('dinero-inicial').value);
        saldoCaja = dineroInicial;
        
        ventanaApertura.style.display = 'none';
        actualizarEstadoCaja('abierta');
        
        // Actualizar datos del cajero en cierre de caja y retiro de dinero
        actualizarDatosCajero(cajeroActual);

        // Crear el botón "Retirar dinero"
        const btnRetirarDinero = document.createElement('button');
        btnRetirarDinero.className = 'boton';
        btnRetirarDinero.id = 'btn-retirar-dinero';
        btnRetirarDinero.innerText = 'Retirar dinero';
        btnAbrirCaja.parentElement.appendChild(btnRetirarDinero);

        // Funcionalidad para el botón "Retirar dinero"
        btnRetirarDinero.onclick = function() {
            abrirModalRetirarDinero();
        }
    }

    // Función para abrir el modal de retirar dinero
    function abrirModalRetirarDinero() {
        const ventanaRetirarDinero = document.getElementById('ventana-retirar-dinero');
        document.getElementById('fecha-retirar').value = new Date().toLocaleDateString();
        document.getElementById('hora-retirar').value = new Date().toLocaleTimeString();
        document.getElementById('cajero-retirar').value = cajeroActual; // Actualizar el cajero en el modal de retiro
        ventanaRetirarDinero.style.display = 'block';
    }

    // Confirmar retiro de dinero
    const btnConfirmarRetiro = document.getElementById('confirmar-retiro');
    btnConfirmarRetiro.onclick = function() {
        const montoRetirar = parseFloat(document.getElementById('monto-retirar').value);
        const motivoRetirar = document.getElementById('motivo-retirar').value;

        if (!isNaN(montoRetirar) && montoRetirar > 0 && motivoRetirar.trim() !== '') {
            saldoCaja -= montoRetirar;
            alert(`Retiro confirmado. Saldo actual de la caja: ${saldoCaja}`);
            document.getElementById('ventana-retirar-dinero').style.display = 'none';
        } else {
            alert('Por favor, ingrese un monto válido y un motivo.');
        }
    }

    // Confirmar cierre de caja
    const btnConfirmarCierre = document.getElementById('confirmar-cierre');
    btnConfirmarCierre.onclick = function() {
        ventanaCierre.style.display = 'none';
        actualizarEstadoCaja('cerrada');
    }

    // Confirmar cambio de usuario
    const formularioCambioUsuario = document.getElementById('formulario-cambio-usuario');
    formularioCambioUsuario.onsubmit = function(event) {
        event.preventDefault();
        const nuevoUsuario = document.getElementById('nuevo-usuario').value;
        actualizarDatosCajero(nuevoUsuario); // Actualizar el cajero actual
        ventanaCambioUsuario.style.display = 'none';
    }
});
