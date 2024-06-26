function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    var mainContent = document.getElementById("mainContent");

    sidebar.classList.toggle("open");
    if (sidebar.classList.contains("open")) {
        mainContent.style.marginLeft = "250px";
    } else {
        mainContent.style.marginLeft = "0";
    }
}

function showLogoutConfirmation() {
    // Lógica para mostrar una confirmación de cierre de sesión
    alert("¿Estás seguro de que deseas cerrar tu cuenta?");
}

function verDetalleVenta() {
    document.getElementById("detalle-venta-modal").style.display = "block";
}

function cerrarDetalleVenta() {
    document.getElementById("detalle-venta-modal").style.display = "none";
}

function verDescuentosAplicados() {
    document.getElementById("descuentos-modal").style.display = "block";
}

function cerrarDescuentos() {
    document.getElementById("descuentos-modal").style.display = "none";
}