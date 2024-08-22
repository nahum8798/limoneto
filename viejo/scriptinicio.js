function showRegister() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('register-screen').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'none';
}

function registerUser(event) {
    event.preventDefault();
    alert('Cuenta creada exitosamente');
    showLogin();
}

function login(event) {
    event.preventDefault();
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
}

function logout() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

function showChangeUser() {
    document.getElementById('change-user-modal').style.display = 'flex';
}

function changeUser(event) {
    event.preventDefault();
    alert('Usuario cambiado exitosamente');
    document.getElementById('change-user-modal').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
}

function showLogoutConfirmation() {
    document.getElementById('logout-confirmation-modal').style.display = 'flex';
}

function confirmLogout() {
    document.getElementById('logout-confirmation-modal').style.display = 'none';
    logout();
}

function cancelLogout() {
    document.getElementById('logout-confirmation-modal').style.display = 'none';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

