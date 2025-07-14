// js/ui.js

/**
 * Muestra u oculta un elemento HTML aplicando o quitando la clase 'hidden'.
 * @param {HTMLElement} element - El elemento HTML a manipular.
 * @param {boolean} show - True para mostrar, false para ocultar.
 */
function toggleVisibility(element, show) {
    if (element) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

/**
 * Renderiza un solo producto en el contenedor de productos.
 * @param {Object} product - Objeto producto con id, nombre, precio, imagen, descripcion.
 * @returns {HTMLElement} - El elemento HTML del producto.
 */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('producto-card');
    productCard.setAttribute('data-id', product.id); // Para fácil identificación

    productCard.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}" class="producto-card__imagen">
        <h3 class="producto-card__nombre">${product.nombre}</h3>
        <p class="producto-card__descripcion">${product.descripcion}</p>
        <p class="producto-card__precio">$${product.precio.toFixed(2)}</p>
        <button class="btn btn--add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
    `;
    return productCard;
}

/**
 * Renderiza la lista de productos en el contenedor principal.
 * @param {Array<Object>} products - Array de objetos producto.
 */
function renderProductList(products) {
    const container = document.getElementById('productos-container');
    if (!container) return; // Asegurarse de que el contenedor existe

    container.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

/**
 * Renderiza un ítem en la lista del carrito.
 * @param {Object} item - Objeto del carrito con producto y cantidad.
 * @returns {HTMLElement} - El elemento HTML del ítem del carrito.
 */
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('carrito-item');
    cartItem.setAttribute('data-id', item.product.id);

    cartItem.innerHTML = `
        <img src="${item.product.imagen}" alt="${item.product.nombre}" class="carrito-item__imagen">
        <div class="carrito-item__info">
            <h4 class="carrito-item__nombre">${item.product.nombre}</h4>
            <p class="carrito-item__precio">$${item.product.precio.toFixed(2)}</p>
        </div>
        <div class="carrito-item__cantidad-controls">
            <button class="btn btn--small btn--remove-one" data-id="${item.product.id}">-</button>
            <span class="carrito-item__cantidad">${item.quantity}</span>
            <button class="btn btn--small btn--add-one" data-id="${item.product.id}">+</button>
        </div>
        <button class="btn btn--danger btn--remove-all" data-id="${item.product.id}">X</button>
    `;
    return cartItem;
}

/**
 * Actualiza la visualización del carrito de compras.
 * @param {Array<Object>} cartItems - Array de ítems en el carrito.
 * @param {number} total - El costo total del carrito.
 */
function updateCartUI(cartItems, total) {
    const itemsContainer = document.getElementById('items-carrito');
    const totalElement = document.getElementById('total-carrito');
    const cartCountElement = document.getElementById('cantidad-carrito');

    if (!itemsContainer || !totalElement || !cartCountElement) return;

    itemsContainer.innerHTML = ''; // Limpiar antes de volver a renderizar
    if (cartItems.length === 0) {
        itemsContainer.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
    } else {
        cartItems.forEach(item => {
            itemsContainer.appendChild(createCartItemElement(item));
        });
    }

    totalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
}