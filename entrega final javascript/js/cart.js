// js/cart.js

let cart = []; // Array global para almacenar los productos en el carrito

/**
 * Carga el carrito desde localStorage al inicio.
 */
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('ecommerceCart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            console.error("Error al parsear el carrito de localStorage:", e);
            cart = [];
        }
    }
}

/**
 * Guarda el carrito en localStorage.
 */
function saveCartToLocalStorage() {
    localStorage.setItem('ecommerceCart', JSON.stringify(cart));
}

/**
 * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
 * @param {Object} productToAdd - El objeto producto a agregar.
 */
function addProductToCart(productToAdd) {
    const existingItem = cart.find(item => item.product.id === productToAdd.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product: productToAdd, quantity: 1 });
    }
    saveCartToLocalStorage();
    updateCartUI(cart, calculateCartTotal()); // Actualiza la UI del carrito
    Swal.fire({ // SweetAlert2 para notificación de éxito
        icon: 'success',
        title: '¡Producto Agregado!',
        text: `${productToAdd.nombre} añadido al carrito.`,
        showConfirmButton: false,
        timer: 1500
    });
}

/**
 * Elimina completamente un producto del carrito.
 * @param {number} productId - El ID del producto a eliminar.
 */
function removeProductFromCart(productId) {
    const initialLength = cart.length;
    cart = cart.filter(item => item.product.id !== productId);
    if (cart.length < initialLength) {
        saveCartToLocalStorage();
        updateCartUI(cart, calculateCartTotal());
        Swal.fire({
            icon: 'info',
            title: 'Producto Eliminado',
            text: 'El producto ha sido removido del carrito.',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

/**
 * Decrementa la cantidad de un producto en el carrito. Si llega a 0, lo elimina.
 * @param {number} productId - El ID del producto a decrementar.
 */
function decrementProductQuantity(productId) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            removeProductFromCart(productId); // Si la cantidad es 0 o menos, eliminar
        } else {
            saveCartToLocalStorage();
            updateCartUI(cart, calculateCartTotal());
        }
    }
}

/**
 * Incrementa la cantidad de un producto en el carrito.
 * @param {number} productId - El ID del producto a incrementar.
 */
function incrementProductQuantity(productId) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity++;
        saveCartToLocalStorage();
        updateCartUI(cart, calculateCartTotal());
    }
}

/**
 * Calcula el costo total de todos los productos en el carrito.
 * @returns {number} - El total calculado.
 */
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
}

/**
 * Simula el proceso de finalizar la compra.
 */
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito Vacío',
            text: 'No hay productos en tu carrito para finalizar la compra.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    Swal.fire({
        icon: 'question',
        title: 'Confirmar Compra',
        text: `El total de tu compra es $${calculateCartTotal().toFixed(2)}. ¿Deseas confirmar?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, Finalizar Compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Compra Realizada!',
                'Tu pedido ha sido procesado con éxito.',
                'success'
            );
            cart = []; // Vaciar el carrito
            saveCartToLocalStorage();
            updateCartUI(cart, calculateCartTotal()); // Actualizar la UI
            toggleVisibility(document.getElementById('carrito-container'), false); // Ocultar carrito
        }
    });
}