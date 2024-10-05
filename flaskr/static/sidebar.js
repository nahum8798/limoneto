function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
}

function closeModal() {
    document.getElementById('modal-cobro').style.display = 'none';
}

function showLogoutConfirmation() {
    // Aquí puedes mostrar un modal de confirmación si es necesario
    console.log("Cerrar sesión");
}