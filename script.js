// open modal ------------------------------------------------

const openModalBtn = document.getElementById('open-modal-btn');
const saleModal = document.getElementById('sale-modal');
const closeModalSpan = document.querySelector('.close');
const confirmBtn = document.getElementById('confirm-btn');


/* side menu animation */
function myFunction(x) {
    x.classList.toggle("change");
}

/* agregar productos a modal */

/* apertura de modal-ventas */

openModalBtn.addEventListener('click', function() {
    loadProducts();
    saleModal.style.display = 'block';
    document.getElementById('sale-date').innerText = new Date().toLocaleDateString();
});

closeModalSpan.addEventListener('click', function() {
    saleModal.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == saleModal) {
        saleModal.style.display = 'none';
    }
};


// boton de confirmacio de venta, tambien borra el contenido de la tabla detalle de venta
confirmBtn.addEventListener('click', function() {                                // aca debo encontra la manera de que el detalle de las ventas
    //alert('Venta confirmada');                                                // se guarde en reporte diario
    saleModal.style.display = 'none';
    const tbody = document.querySelector(".sales-table tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
});

function loadProducts() {
    const productList = document.querySelector('.product-list');
    const rows = document.querySelectorAll('.sales-table tbody tr');

    productList.innerHTML = '';

    let subtotal = 0;

    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const productName = cells[1].innerText;
        const quantity = cells[2].getElementsByTagName('input')[0].value;
        const price = parseFloat(cells[3].innerText.replace('$', ''));
        const amount = parseFloat(cells[4].innerText.replace('$', ''));
        
        const productDiv = document.createElement('div');
        productDiv.innerText = `${productName} x${quantity} - $${amount}`;
        productList.appendChild(productDiv);

        subtotal += amount;
    });

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('descuento').innerText = '-';
    document.getElementById('total').innerText = `$${subtotal.toFixed(2)}`;
}

function setPaymentMethod(method) {
    alert(`Método de pago seleccionado: ${method}`);
}

function calculateChange() {
    const paymentAmount = document.getElementById('payment-amount').value;
    const totalAmount = parseFloat(document.getElementById('total').innerText.replace('$', ''));
    const change = paymentAmount - totalAmount;
    document.getElementById('change-amount').value = change >= 0 ? `$${change.toFixed(2)}` : '0';
}
