// open modal ------------------------------------------------

const openModalBtn = document.getElementById('open-modal-btn');
const saleModal = document.getElementById('sale-modal');
const closeModalSpan = document.querySelector('.close');
const confirmBtn = document.getElementById('confirm-btn');
const totalElement = document.getElementById('total');  // elemento para el total de la venta


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

   /* // Obtiene el total de la venta desde el modal
    const totalVenta = totalElement.innerText;

    // Crea un nuevo elemento para mostrar la venta en el resumen
    const item = document.createElement("div");


    item.innerText = `Venta #${Math.random().toString(36).substr(2, 9)} - Total: ${totalVenta}`; // Genera un ID de venta aleatorio para demostración

    // Añade el nuevo elemento al contenedor de resumen
    itemSale.appendChild(item);*/
    const totAmount = document.getElementById('total-amount');
    const tbody = document.querySelector(".sales-table tbody");
    totAmount.innerText = '';
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


function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return day + '/' + month +'/' + year;
}





document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        { codigo: '01', nombre: 'Café chico', precio: 1200, costo:900 },
        { codigo: '02', nombre: 'Café grande', precio: 1500, costo:950 },
        { codigo: '03', nombre: 'Café con leche chico', precio: 1300, costo:920 },
        { codigo: '04', nombre: 'Café con leche grande', precio: 1600,costo:1000 },
        { codigo: '05', nombre: 'Cortado chico', precio: 1250, costo: 920 },
        { codigo: '06', nombre: 'Cortado grande', precio: 1550, costo:1000 }
    ];

    function autocomplete(input, array) {
        let currentFocus;

        input.addEventListener("input", function() {
            let list, item, val = this.value;
            closeAllLists();
            if (!val) return false;

            currentFocus = -1;
            list = document.createElement("div");
            list.setAttribute("id", this.id + "autocomplete-list");
            list.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(list);

            for (let i = 0; i < array.length; i++) {
                if (array[i].nombre.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    item = document.createElement("div");
                    item.innerHTML = "<strong>" + array[i].nombre.substr(0, val.length) + "</strong>";
                    item.innerHTML += array[i].nombre.substr(val.length);
                    item.innerHTML += "<input type='hidden' value='" + array[i].nombre + "'>";
                    item.dataset.codigo = array[i].codigo;
                    item.dataset.precio = array[i].precio;
                    item.addEventListener("click", function() {
                        input.value = this.getElementsByTagName("input")[0].value;
                        addProductToContainer(this.dataset.codigo, input.value, this.dataset.precio);
                        closeAllLists();
                        input.value = '';
                    });
                    list.appendChild(item);
                }
            }
        });

        input.addEventListener("keydown", function(e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) { // down arrow
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) { // up arrow
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) { // enter key
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== input) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    function addProductToContainer(codigo, nombre, precio) {
        const container = document.querySelector(".product-container");

        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        const productDetails = document.createElement("span");
        productDetails.innerText = `${nombre} - $${precio}`;
        productDetails.dataset.codigo = codigo;
        productDetails.dataset.precio = precio;

        const removeBtn = document.createElement("span");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerText = "❌";
        removeBtn.addEventListener("click", function() {
            container.removeChild(productItem);
        });

        productItem.appendChild(productDetails);
        productItem.appendChild(removeBtn);
        container.appendChild(productItem);
    }

    function addProductToTable(codigo, nombre, precio, cantidad) {
        const tbody = document.querySelector(".sales-table tbody");
        const tr = document.createElement("tr");

        // Código
        const tdCodigo = document.createElement("td");
        tdCodigo.innerText = codigo;
        tr.appendChild(tdCodigo);

        // Nombre
        const tdNombre = document.createElement("td");
        tdNombre.innerText = nombre;
        tr.appendChild(tdNombre);

        // Cantidad
        const tdCantidad = document.createElement("td");
        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.value = cantidad;
        cantidadInput.min = 1;
        cantidadInput.classList.add("quantity-input");
        tdCantidad.appendChild(cantidadInput);
        tr.appendChild(tdCantidad);

        // Precio unitario
        const tdPrecio = document.createElement("td");
        tdPrecio.innerText = `$${precio}`;
        tr.appendChild(tdPrecio);

        // Importe
        const tdImporte = document.createElement("td");
        tdImporte.innerText = `$${precio * cantidad}`;
        tr.appendChild(tdImporte);

        // Actualiza el importe cuando cambia la cantidad
        cantidadInput.addEventListener("input", function() {
            const cantidad = cantidadInput.value;
            const nuevoImporte = precio * cantidad;
            tdImporte.innerText = `$${nuevoImporte}`;
            updateTotalAmount();
        });

        tbody.appendChild(tr);
        updateTotalAmount();
    }

    function updateTotalAmount() {
        const tbody = document.querySelector(".sales-table tbody");
        const rows = tbody.getElementsByTagName("tr");
        let total = 0;

        for (let i = 0; i < rows.length; i++) {
            const importeCell = rows[i].getElementsByTagName("td")[4];
            const importe = parseFloat(importeCell.innerText.replace('$', ''));
            total += importe;
        }

        document.getElementById("total-amount").innerText = total;
    }

    const inputProducto = document.getElementById("name-product");
    const btnAgregarProducto = document.getElementById("add-product-btn");

    btnAgregarProducto.addEventListener("click", function() {
        const container = document.querySelector(".product-container");
        const productItems = container.querySelectorAll(".product-item");

        productItems.forEach(item => {
            const nombre = item.querySelector("span").innerText.split(" - $")[0];
            const codigo = item.querySelector("span").dataset.codigo;
            const precio = item.querySelector("span").dataset.precio;

            addProductToTable(codigo, nombre, precio, 1);
            container.removeChild(item);
        });
    });

    autocomplete(inputProducto, productos);
});
