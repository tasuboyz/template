// Elite Store - E-commerce Showcase Application
class EcommerceApp {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentFilter = 'all';
        this.isCartOpen = false;
        this.isSearchOpen = false;
        this.currentProductModal = null;
        
        this.init();
    }

    async init() {
        // Initialize loading screen
        this.showLoadingScreen();
        
        // Generate sample products
        this.generateProducts();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize animations
        this.initializeAnimations();
        
        // Create particles
        this.createParticles();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Initialize header scroll effect
        this.initializeHeaderScroll();
        
        // Initialize counters
        this.initializeCounters();
        
        // Hide loading screen after setup
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'flex';
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    generateProducts() {
        const productData = [
            // Electronics
            { name: 'Smartphone Pro Max', category: 'electronics', price: 999, oldPrice: 1199, rating: 4.8, reviews: 2341, badge: 'Best Seller', icon: 'fas fa-mobile-alt' },
            { name: 'Laptop Gaming Elite', category: 'electronics', price: 1599, oldPrice: 1899, rating: 4.9, reviews: 1876, badge: 'New', icon: 'fas fa-laptop' },
            { name: 'Cuffie Wireless Premium', category: 'electronics', price: 299, oldPrice: 399, rating: 4.7, reviews: 3214, badge: '25% OFF', icon: 'fas fa-headphones' },
            { name: 'Smartwatch Sport', category: 'electronics', price: 399, oldPrice: 499, rating: 4.6, reviews: 1543, badge: 'Hot', icon: 'fas fa-stopwatch' },
            
            // Fashion
            { name: 'Giacca Elegante Uomo', category: 'fashion', price: 199, oldPrice: 299, rating: 4.5, reviews: 876, badge: 'Trending', icon: 'fas fa-user-tie' },
            { name: 'Vestito Donna Premium', category: 'fashion', price: 149, oldPrice: 229, rating: 4.7, reviews: 1234, badge: '35% OFF', icon: 'fas fa-female' },
            { name: 'Sneakers Limited Edition', category: 'fashion', price: 179, oldPrice: 249, rating: 4.8, reviews: 2876, badge: 'Limited', icon: 'fas fa-running' },
            { name: 'Borsa Designer', category: 'fashion', price: 299, oldPrice: 449, rating: 4.6, reviews: 654, badge: 'Luxury', icon: 'fas fa-shopping-bag' },
            
            // Home
            { name: 'Divano Moderno 3 Posti', category: 'home', price: 899, oldPrice: 1199, rating: 4.4, reviews: 432, badge: 'Best Price', icon: 'fas fa-couch' },
            { name: 'Lampada Design LED', category: 'home', price: 129, oldPrice: 179, rating: 4.6, reviews: 876, badge: 'Eco', icon: 'fas fa-lightbulb' },
            { name: 'Set Pentole Professional', category: 'home', price: 199, oldPrice: 299, rating: 4.8, reviews: 1543, badge: 'Chef Choice', icon: 'fas fa-utensils' },
            { name: 'Aspirapolvere Robot', category: 'home', price: 399, oldPrice: 599, rating: 4.7, reviews: 987, badge: 'Smart', icon: 'fas fa-robot' },
            
            // Sports
            { name: 'Bicicletta Mountain Bike', category: 'sports', price: 699, oldPrice: 899, rating: 4.9, reviews: 1876, badge: 'Adventure', icon: 'fas fa-bicycle' },
            { name: 'Set Pesi Palestra', category: 'sports', price: 299, oldPrice: 399, rating: 4.5, reviews: 654, badge: 'Fitness', icon: 'fas fa-dumbbell' },
            { name: 'Scarpe da Corsa Pro', category: 'sports', price: 159, oldPrice: 219, rating: 4.8, reviews: 2341, badge: 'Runner', icon: 'fas fa-running' },
            { name: 'Racchetta Tennis Elite', category: 'sports', price: 199, oldPrice: 279, rating: 4.6, reviews: 432, badge: 'Pro', icon: 'fas fa-table-tennis' }
        ];

        this.products = productData.map((product, index) => ({
            id: index + 1,
            ...product,
            description: this.generateProductDescription(product.name),
            discount: Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        }));

        this.renderProducts();
    }

    generateProductDescription(name) {
        const descriptions = {
            'Smartphone': 'Smartphone di ultima generazione con display OLED, fotocamera professionale e prestazioni eccezionali.',
            'Laptop': 'Laptop ad alte prestazioni perfetto per gaming e lavoro, con processore ultimo modello e scheda grafica dedicata.',
            'Cuffie': 'Cuffie wireless con cancellazione attiva del rumore e qualità audio superiore.',
            'Smartwatch': 'Smartwatch con monitoraggio fitness avanzato e connettività completa.',
            'Giacca': 'Giacca elegante di alta qualità, perfetta per occasioni formali e business.',
            'Vestito': 'Vestito raffinato in tessuto premium, design contemporaneo e vestibilità perfetta.',
            'Sneakers': 'Sneakers edizione limitata con tecnologia avanzata per comfort e stile.',
            'Borsa': 'Borsa di design realizzata con materiali di lusso e dettagli artigianali.',
            'Divano': 'Divano moderno e confortevole, rivestimento di qualità e design contemporaneo.',
            'Lampada': 'Lampada LED di design con controllo intelligente e efficienza energetica.',
            'Set Pentole': 'Set di pentole professionali in acciaio inox, ideale per chef e appassionati.',
            'Aspirapolvere': 'Aspirapolvere robot intelligente con mappatura avanzata e controllo app.',
            'Bicicletta': 'Mountain bike professionale con telaio robusto e componenti di alta qualità.',
            'Set Pesi': 'Set completo di pesi per allenamento domestico, resistenti e versatili.',
            'Scarpe da Corsa': 'Scarpe da corsa professionali con tecnologia di ammortizzazione avanzata.',
            'Racchetta': 'Racchetta da tennis professionale, bilanciata e potente per giocatori esperti.'
        };

        const productType = Object.keys(descriptions).find(key => name.includes(key));
        return descriptions[productType] || 'Prodotto di alta qualità con caratteristiche premium e design eccezionale.';
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        const filteredProducts = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === this.currentFilter);

        filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            grid.appendChild(productCard);
        });

        // Animate product cards
        this.animateProductCards();
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card scroll-reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        card.dataset.category = product.category;

        const stars = this.generateStars(product.rating);
        
        card.innerHTML = `
            <div class="product-image-container">
                <div class="product-image-placeholder">
                    <i class="${product.icon}"></i>
                </div>
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="product-wishlist" onclick="app.toggleWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">€${product.price}</span>
                    ${product.oldPrice ? `<span class="old-price">€${product.oldPrice}</span>` : ''}
                    ${product.discount ? `<span class="discount">-${product.discount}%</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Aggiungi al Carrello
                </button>
            </div>
        `;

        // Add click event for product modal
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart') && !e.target.closest('.product-wishlist')) {
                this.openProductModal(product);
            }
        });

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    animateProductCards() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in-up');
            }, index * 100);
        });
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.getElementById('search-input');
        
        searchBtn.addEventListener('click', () => this.openSearch());
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn.dataset.filter, btn));
        });

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.handleFilter(category);
                this.scrollToSection('products');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        backToTopBtn.addEventListener('click', () => this.scrollToTop());

        // Mobile hamburger menu
        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', () => this.toggleMobileMenu());

        // Quantity selectors in modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-btn')) {
                this.handleQuantityChange(e.target);
            }
        });

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('product-modal') || e.target.classList.contains('search-overlay')) {
                this.closeAllModals();
            }
        });
    }

    openSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        
        searchOverlay.classList.add('active');
        this.isSearchOpen = true;
        
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }

    closeSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        searchOverlay.classList.remove('active');
        this.isSearchOpen = false;
    }

    handleSearch(query) {
        if (query.length < 2) {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        this.renderSearchResults(filteredProducts);
    }

    renderSearchResults(products) {
        const resultsContainer = document.getElementById('search-results');
        
        if (products.length === 0) {
            resultsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><h3>Nessun risultato trovato</h3></div>';
            return;
        }

        resultsContainer.innerHTML = products.map(product => `
            <div class="search-result-item" onclick="app.openProductModal(${product.id}); app.closeSearch();">
                <div class="search-item-icon">
                    <i class="${product.icon}"></i>
                </div>
                <div class="search-item-info">
                    <h4>${product.name}</h4>
                    <p>€${product.price}</p>
                </div>
            </div>
        `).join('');
    }

    handleFilter(filter, btnElement) {
        this.currentFilter = filter;

        // Update active filter button
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        if (btnElement) {
            btnElement.classList.add('active');
        } else {
            // Find and activate the corresponding button
            const targetBtn = Array.from(filterBtns).find(btn => btn.dataset.filter === filter);
            if (targetBtn) targetBtn.classList.add('active');
        }

        // Animate out current products
        const currentCards = document.querySelectorAll('.product-card');
        currentCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }, index * 50);
        });

        // Render new products after animation
        setTimeout(() => {
            this.renderProducts();
        }, 500);
    }

    openProductModal(productId) {
        const product = typeof productId === 'object' ? productId : this.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProductModal = product;
        const modal = document.getElementById('product-modal');
        
        // Populate modal content
        document.getElementById('modal-product-image').src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNjAiPkltYWdlPC90ZXh0Pgo8L3N2Zz4=';
        document.getElementById('modal-product-title').textContent = product.name;
        document.getElementById('modal-current-price').textContent = `€${product.price}`;
        document.getElementById('modal-old-price').textContent = product.oldPrice ? `€${product.oldPrice}` : '';
        document.getElementById('modal-discount').textContent = product.discount ? `-${product.discount}%` : '';
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-stars').innerHTML = this.generateStars(product.rating);
        document.getElementById('modal-reviews').textContent = `(${product.reviews} recensioni)`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentProductModal = null;
    }

    closeAllModals() {
        this.closeProductModal();
        this.closeSearch();
        if (this.isCartOpen) {
            this.toggleCart();
        }
    }

    handleQuantityChange(btn) {
        const qtyInput = btn.parentElement.querySelector('.qty-input');
        const currentValue = parseInt(qtyInput.value);
        
        if (btn.classList.contains('plus')) {
            qtyInput.value = currentValue + 1;
        } else if (btn.classList.contains('minus') && currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.updateCartUI();
        this.showNotification(`${product.name} aggiunto al carrello!`, 'success');
        this.animateCartButton();
    }

    addToCartFromModal() {
        if (!this.currentProductModal) return;
        
        const quantity = parseInt(document.querySelector('.qty-input').value);
        const product = this.currentProductModal;
        
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.updateCartUI();
        this.closeProductModal();
        this.showNotification(`${product.name} aggiunto al carrello!`, 'success');
        this.animateCartButton();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
        this.showNotification('Prodotto rimosso dal carrello', 'success');
    }

    updateCartQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.updateCartUI();
            }
        }
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-cart"></i><h3>Il carrello è vuoto</h3><p>Aggiungi alcuni prodotti per iniziare</p></div>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">€${item.price}</div>
                        <div class="cart-item-quantity">
                            <button class="cart-qty-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-qty-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-remove" onclick="app.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    toggleCart() {
        const cart = document.getElementById('shopping-cart');
        this.isCartOpen = !this.isCartOpen;
        
        if (this.isCartOpen) {
            cart.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            cart.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    toggleWishlist(productId) {
        const btn = event.target.closest('.product-wishlist');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.className = 'fas fa-heart';
            btn.style.background = '#ec4899';
            btn.style.color = 'white';
            this.showNotification('Aggiunto ai preferiti!', 'success');
        } else {
            icon.className = 'far fa-heart';
            btn.style.background = 'white';
            btn.style.color = '#1f2937';
            this.showNotification('Rimosso dai preferiti', 'success');
        }

        // Add heartbeat animation
        btn.classList.add('animate-heartbeat');
        setTimeout(() => {
            btn.classList.remove('animate-heartbeat');
        }, 1500);
    }

    animateCartButton() {
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.classList.add('animate-bounce');
        setTimeout(() => {
            cartBtn.classList.remove('animate-bounce');
        }, 800);
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Il carrello è vuoto!', 'error');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.showNotification(`Checkout completato! Totale: €${total.toFixed(2)}`, 'success');
        
        // Clear cart
        this.cart = [];
        this.updateCartUI();
        this.toggleCart();
    }

    subscribeNewsletter(event) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]').value;
        
        if (email) {
            this.showNotification('Iscrizione completata con successo!', 'success');
            event.target.reset();
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const icon = notification.querySelector('.notification-icon');
        const text = notification.querySelector('.notification-text');

        // Set icon based on type
        if (type === 'success') {
            icon.className = 'notification-icon fas fa-check-circle';
            notification.className = 'notification success';
        } else if (type === 'error') {
            icon.className = 'notification-icon fas fa-exclamation-circle';
            notification.className = 'notification error';
        }

        text.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-visual');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    initializeAnimations() {
        // Add entrance animations to various elements
        const animatedElements = document.querySelectorAll('.category-card, .product-card, .feature, .stat-item');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    createParticles() {
        const heroSection = document.querySelector('.hero');
        const particlesContainer = heroSection.querySelector('.hero-particles');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all scroll-reveal elements
        const scrollElements = document.querySelectorAll('.scroll-reveal, .category-card, .feature, .stat-item');
        scrollElements.forEach(el => observer.observe(el));
    }

    initializeHeaderScroll() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    initializeCounters() {
        const counterElements = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Global functions for onclick events
function toggleCart() {
    app.toggleCart();
}

function closeSearch() {
    app.closeSearch();
}

function closeProductModal() {
    app.closeProductModal();
}

function scrollToSection(sectionId) {
    app.scrollToSection(sectionId);
}

function addToCartFromModal() {
    app.addToCartFromModal();
}

function checkout() {
    app.checkout();
}

function subscribeNewsletter(event) {
    app.subscribeNewsletter(event);
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EcommerceApp();
});

// Additional utility functions
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatCurrency: (amount) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Performance optimizations
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

// Add some CSS animations via JavaScript for enhanced effects
const style = document.createElement('style');
style.textContent = `
    .search-result-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .search-result-item:hover {
        background: var(--bg-secondary);
    }
    
    .search-item-icon {
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
    }
    
    .search-item-info h4 {
        margin: 0 0 0.2rem 0;
        font-size: 1rem;
        font-weight: 600;
    }
    
    .search-item-info p {
        margin: 0;
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .particle {
        position: absolute;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat linear infinite;
    }
`;
document.head.appendChild(style);
