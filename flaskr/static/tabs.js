// Navegación entre Tabs
let currentTab = 0;
const tabs = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-pane');

// Captura de los botones
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Función para mostrar la pestaña actual
function showTab(n) {
    // Ocultar todas las pestañas
    tabContents.forEach((tabContent, index) => {
        tabContent.classList.remove('show', 'active');
    });
    
    // Mostrar la pestaña correspondiente
    tabContents[n].classList.add('show', 'active');
    
    // Actualizar el estado de los botones
    updateButtons();
}

// Función para ir a la siguiente pestaña
function nextTab() {
    if (currentTab < tabs.length - 1) {
        currentTab++;
        showTab(currentTab);
    }
}

// Función para ir a la pestaña anterior
function prevTab() {
    if (currentTab > 0) {
        currentTab--;
        showTab(currentTab);
    }
}

// Actualizar el estado de los botones
function updateButtons() {
    prevBtn.style.display = currentTab === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = currentTab === tabs.length - 1 ? 'Crear cuenta' : 'Siguiente';
}

// Asignar eventos a los botones
nextBtn.addEventListener('click', nextTab);
prevBtn.addEventListener('click', prevTab);

// Ocultar el botón "Anterior" en la primera pestaña
updateButtons();





