// open modal ------------------------------------------------

const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('sale-modal');
const closeModalBtn = modal.querySelector('.close');

// funcion para abrir el modal
openModalBtn.addEventListener('click', function(){

    modal.style.display = 'block';

})

// funcion para cerrar el modal al hacer click en el boton de cerrar 
closeModalBtn.addEventListener('click', function(){
    modal.style.display = 'none';
})

/* side menu animation */
function myFunction(x) {
    x.classList.toggle("change");
  }

/* agregar productos a modal */

function addProductToModal() {
    
}