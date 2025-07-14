// js/main.js

let allProducts = []; // Array para almacenar todos los productos cargados

/**
 * Carga los productos desde el archivo JSON.
 * @returns {Promise<Array<Object>>} - Una promesa que resuelve con los productos.
 */
async function fetchProducts() {
    try {
        const response = await fetch('js/data.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de Carga',
            text: 'No se pudieron cargar los productos. Intenta de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
        });
        return []; // Retorna un array vacío en caso de error
    }
}

/**
 * Configura todos los Event Listeners para la página.
 */
function setupEventListeners() {
    const productosContainer = document.getElementById('productos-container');
    const verCarritoBtn = document.getElementById('ver-carrito-btn');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito-btn');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const carritoContainer = document.getElementById('carrito-container');
    const itemsCarritoContainer = document.getElementById('items-carrito');

    // Evento para agregar productos al carrito desde la lista de productos
    if (productosContainer) {
        productosContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn--add-to-cart')) {
                const productId = parseInt(event.target.dataset.id);
                const product = allProducts.find(p => p.id === productId);
                if (product) {
                    addProductToCart(product);
                }
            }
        });
    }

    // Eventos para el carrito: ver, cerrar, ajustar cantidades, eliminar
    if (verCarritoBtn) {
        verCarritoBtn.addEventListener('click', () => {
            toggleVisibility(carritoContainer, true); // Muestra el modal del carrito
            updateCartUI(cart, calculateCartTotal()); // Asegura que el carrito esté actualizado al abrir
        });
    }

    if (cerrarCarritoBtn) {
        cerrarCarritoBtn.addEventListener('click', () => {
            toggleVisibility(carritoContainer, false); // Oculta el modal del carrito
        });
    }

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            checkout();
        });
    }

    // Delegación de eventos para los botones dentro de los ítems del carrito
    if (itemsCarritoContainer) {
        itemsCarritoContainer.addEventListener('click', (event) => {
            const target = event.target;
            const productId = parseInt(target.dataset.id);

            if (target.classList.contains('btn--add-one')) {
                incrementProductQuantity(productId);
            } else if (target.classList.contains('btn--remove-one')) {
                decrementProductQuantity(productId);
            } else if (target.classList.contains('btn--remove-all')) {
                removeProductFromCart(productId);
            }
        });
    }

    // Escuchar la tecla 'Escape' para cerrar el carrito
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleVisibility(carritoContainer, false);
        }
    });

    // Cierre del modal haciendo clic fuera de su contenido (opcional)
    if (carritoContainer) {
        carritoContainer.addEventListener('click', (event) => {
            if (event.target === carritoContainer) {
                toggleVisibility(carritoContainer, false);
            }
        });
    }
}

/**
 * Función de inicialización de la aplicación.
 */
async function init() {
    loadCartFromLocalStorage(); // Cargar el carrito guardado
    allProducts = await fetchProducts(); // Cargar los productos
    renderProductList(allProducts); // Renderizar los productos en la interfaz
    updateCartUI(cart, calculateCartTotal()); // Actualizar el conteo del carrito inicial
    setupEventListeners(); // Configurar todos los eventos
}

// Iniciar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);