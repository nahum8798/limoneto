
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
