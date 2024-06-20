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
        
        // Verifica si el contenedor existe
        if (!container) {
            console.error("Contenedor no encontrado.");
            return;
        }
        
        const productItems = container.querySelectorAll(".product-item");
        
        // Verifica si hay elementos de producto
        if (!productItems.length) {
            console.warn("No se encontraron elementos de producto.");
            return;
        }
    
        // Array para almacenar los elementos a eliminar
        const itemsToRemove = [];
    
        productItems.forEach(item => {
            const spanElement = item.querySelector("span");
            
            // Verifica si spanElement existe
            if (!spanElement) {
                console.warn("Elemento span no encontrado en product-item.");
                return;
            }
    
            const nombre = spanElement.innerText.split(" - $")[0];
            const codigo = spanElement.dataset.codigo;
            const precio = spanElement.dataset.precio;
    
            // Verifica si dataset tiene los datos esperados
            if (!codigo || !precio) {
                console.warn("Datos no encontrados en dataset.");
                return;
            }
    
            addProductToTable(codigo, nombre, precio, 1);
    
            // Añade el elemento a la lista de elementos a remover
            itemsToRemove.push(item);
        });
    
        // Remueve los elementos después de la iteración
        itemsToRemove.forEach(item => {
            container.removeChild(item);
        });
    });
    


    /*
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
*/
    autocomplete(inputProducto, productos);
});
