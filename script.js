document.getElementById('btn-cobrar').addEventListener('click', function() {
    document.getElementById('modal-cobro').style.display = 'block';
});

function closeModal() {
    document.getElementById('modal-cobro').style.display = 'none';
}

// Cálculo del vuelto (si es necesario)
document.getElementById('abono-con').addEventListener('input', function() {
    const total = 13950; // Este valor debería ser dinámico
    const pago = parseFloat(this.value);
    const vuelto = pago - total;

    document.getElementById('vuelto').value = vuelto >= 0 ? vuelto : 0;
});
