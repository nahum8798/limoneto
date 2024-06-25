// Seleccion de elementos del DOM
const agregarCategoriaBtn = document.getElementById('agregar-categoria');
const modalBtn = document.querySelector('.modal-btn')
const trahsBtn = document.querySelectorAll('.elimnar-producto-icono')
let modal = document.getElementById('modal');
let span = document.getElementsByClassName("close")[0];



// modal agregar categoria


// cuando el usuario hace click en el boton, abre el modal
agregarCategoriaBtn.addEventListener('click',()=>{
    modal.style.display = "block";
})


// cuando el usuario hace click en <span> (x), cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

modalBtn.addEventListener('click',()=>{
    modal.style.display = "none";
})






// funcionalidades
