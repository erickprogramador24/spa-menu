document.addEventListener('DOMContentLoaded', function() {
    // Datos del menú
    const menuData = {
        entradas: [
            {
                nombre: "Bruschetta Clásica",
                descripcion: "Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra",
                precio: "$8.50",
                tags: ["Vegetariano", "Sin gluten"]
            },
            {
                nombre: "Tartar de Atún",
                descripcion: "Atún fresco marinado con aguacate, salsa de soja y chips de wonton",
                precio: "$12.00",
                tags: ["Fresco", "Pescado"]
            },
            {
                nombre: "Croquetas de Jamón Ibérico",
                descripcion: "Crujientes croquetas caseras con jamón ibérico de bellota",
                precio: "$9.50",
                tags: ["Tradicional"]
            }
        ],
        principales: [
            {
                nombre: "Risotto de Champiñones",
                descripcion: "Arroz cremoso con champiñones silvestres, parmesano y trufa",
                precio: "$16.50",
                tags: ["Vegetariano", "Sin gluten"]
            },
            {
                nombre: "Solomillo de Ternera",
                descripcion: "Solomillo a la parrilla con reducción de vino tinto y puré de patatas",
                precio: "$24.00",
                tags: ["Premium", "Carne"]
            },
            {
                nombre: "Pulpo a la Gallega",
                descripcion: "Pulpo cocido con patatas, pimentón y aceite de oliva",
                precio: "$19.50",
                tags: ["Marisco", "Tradicional"]
            },
            {
                nombre: "Pasta Trufada",
                descripcion: "Tagliatelle casera con salsa de trufa negra y champiñones",
                precio: "$18.00",
                tags: ["Vegetariano"]
            }
        ],
        postres: [
            {
                nombre: "Tarta de Queso",
                descripcion: "Clásica tarta de queso con coulis de frutos rojos",
                precio: "$7.50",
                tags: ["Clásico"]
            },
            {
                nombre: "Volcán de Chocolate",
                descripcion: "Delicioso bizcocho de chocolate con corazón líquido y helado de vainilla",
                precio: "$8.50",
                tags: ["Chocolate"]
            },
            {
                nombre: "Crema Catalana",
                descripcion: "La versión tradicional española de la crema brûlée",
                precio: "$6.50",
                tags: ["Tradicional"]
            }
        ],
        bebidas: [
            {
                nombre: "Vino Tinto Reserva",
                descripcion: "Selección de nuestra bodega - Rioja Reserva 2018",
                precio: "$9.00",
                tags: ["Alcohol"]
            },
            {
                nombre: "Cóctel Signature",
                descripcion: "Nuestra creación exclusiva con ginebra, frutas frescas y hierbas",
                precio: "$11.00",
                tags: ["Alcohol", "Signature"]
            },
            {
                nombre: "Limonada Fresca",
                descripcion: "Limonada casera con menta y jengibre",
                precio: "$5.50",
                tags: ["Refrescante", "Sin alcohol"]
            }
        ]
    };

    // Elementos del DOM
    const menuContainer = document.getElementById('menu-container');
    const categoryButtons = document.querySelectorAll('.menu-categories button');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');

    // Cargar categoría inicial
    loadCategory('entradas');

    // Event listeners para los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Cargar la categoría correspondiente
            const category = this.getAttribute('data-category');
            loadCategory(category);
        });
    });

    // Función para cargar una categoría
    function loadCategory(category) {
        const items = menuData[category];
        renderMenu(items);
    }

    // Función para renderizar los ítems del menú
    function renderMenu(items) {
        menuContainer.innerHTML = '';
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item glass';
            
            let tagsHTML = '';
            if (item.tags && item.tags.length > 0) {
                tagsHTML = `<div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`;
            }
            
            menuItem.innerHTML = `
                <h3>${item.nombre} <span class="price">${item.precio}</span></h3>
                <p>${item.descripcion}</p>
                ${tagsHTML}
            `;
            
            menuContainer.appendChild(menuItem);
        });
    }

    // Función de búsqueda
    function searchMenu() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (!searchTerm) {
            // Si no hay término de búsqueda, mostrar la categoría activa
            const activeCategory = document.querySelector('.menu-categories button.active').getAttribute('data-category');
            loadCategory(activeCategory);
            return;
        }
        
        // Buscar en todos los ítems de todas las categorías
        const allItems = Object.values(menuData).flat();
        const filteredItems = allItems.filter(item => 
            item.nombre.toLowerCase().includes(searchTerm) || 
            item.descripcion.toLowerCase().includes(searchTerm) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
        
        renderMenu(filteredItems);
    }

    // Event listeners para la búsqueda
    searchButton.addEventListener('click', searchMenu);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchMenu();
        }
    });
});