const modificarBtn = document.querySelector('.category-btn-mod');
const cerrarModificar = document.getElementById('mod-conjunto');
let modal = document.getElementById('modificar-conjunto-modal');
let span = document.getElementsByClassName("close")[0];

// modal modificar conjunto
// cuando el usuario hace click en el boton, abre el modal
modificarBtn.addEventListener('click',()=>{
    modal.style.display = "block";
})


// cuando el usuario hace click en <span> (x), cierra el modal
span.addEventListener('click',function() {
    modal.style.display = "none";
})

cerrarModificar.addEventListener('click',()=>{
    modal.style.display = "none";
})