// FoodGallery - Immersive Culinary Experience App

class FoodGalleryApp {
    constructor() {
        this.currentSlide = 0;
        this.galleryItems = [];
        this.menuItems = [];
        this.instagramItems = [];
        this.currentModalIndex = 0;
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.initNavigation();
        this.initHeroSlider();
        this.loadGalleryData();
        this.loadMenuData();
        this.loadInstagramData();
        this.initScrollAnimations();
        this.initModal();
        this.initFilters();
        this.initForm();
        this.initScrollEffects();
        this.initMapInteractions();
        this.hideLoadingScreen();
    }

    // Loading Screen
    async showLoadingScreen() {
        return new Promise(resolve => {
            const progressBar = document.getElementById('loading-progress');
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }, 100);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Trigger hero animations
        this.animateHeroText();
    }

    animateHeroText() {
        const words = document.querySelectorAll('.word');
        words.forEach((word, index) => {
            const delay = parseInt(word.dataset.delay) || index * 200;
            setTimeout(() => {
                word.style.animationDelay = '0s';
                word.style.animation = 'wordReveal 1s ease-out forwards';
            }, delay);
        });
    }

    // Navigation
    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Smooth scroll to section
                this.scrollToSection(target);
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Hero Slider
    initHeroSlider() {
        const slides = document.querySelectorAll('.hero-bg');
        let currentSlide = 0;

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        // Auto-rotate slides
        setInterval(nextSlide, 5000);
    }

    // Gallery Data and Functions
    loadGalleryData() {
        this.galleryItems = [
            {
                id: 1,
                category: 'dishes',
                title: 'Risotto al Tartufo',
                description: 'Cremoso risotto con tartufo nero pregiato e parmigiano invecchiato',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop'
            },
            {
                id: 2,
                category: 'drinks',
                title: 'Signature Cocktail',
                description: 'Mix esclusivo con gin botanico e essenze mediterranee',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop'
            },
            {
                id: 3,
                category: 'desserts',
                title: 'Tiramisù Decostruito',
                description: 'Interpretazione moderna del classico dolce italiano',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop'
            },
            {
                id: 4,
                category: 'atmosphere',
                title: 'Dining Room',
                description: 'Ambiente elegante e raffinato per una cena indimenticabile',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
            },
            {
                id: 5,
                category: 'dishes',
                title: 'Branzino in Crosta',
                description: 'Branzino fresco in crosta di sale con erbe aromatiche',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop'
            },
            {
                id: 6,
                category: 'drinks',
                title: 'Wine Selection',
                description: 'Selezione di vini pregiati italiani e internazionali',
                image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop'
            },
            {
                id: 7,
                category: 'desserts',
                title: 'Gelato Artigianale',
                description: 'Gelato fatto in casa con ingredienti di prima qualità',
                image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop'
            },
            {
                id: 8,
                category: 'atmosphere',
                title: 'Chef at Work',
                description: 'Il nostro chef all\'opera nella cucina a vista',
                image: 'https://images.unsplash.com/photo-1556909114-5ba02bb89aa2?w=600&h=400&fit=crop'
            }
        ];

        this.renderGallery();
    }

    renderGallery(filter = 'all') {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;

        const filteredItems = filter === 'all' 
            ? this.galleryItems 
            : this.galleryItems.filter(item => item.category === filter);

        galleryGrid.innerHTML = '';

        filteredItems.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            galleryGrid.appendChild(galleryItem);
        });

        // Trigger animations
        this.animateGalleryItems();
    }

    createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item fade-in';
        div.style.animationDelay = `${index * 0.1}s`;
        div.dataset.category = item.category;
        div.dataset.index = index;

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-text">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;

        div.addEventListener('click', () => {
            this.openModal(item, this.galleryItems.findIndex(i => i.id === item.id));
        });

        return div;
    }

    animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => observer.observe(item));
    }

    // Menu Data and Functions
    loadMenuData() {
        this.menuItems = [
            {
                id: 1,
                category: 'antipasti',
                title: 'Crudo di Ricciola',
                description: 'Ricciola fresca con agrumi siciliani, olio EVO e pepe rosa',
                price: '€18',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
            },
            {
                id: 2,
                category: 'primi',
                title: 'Risotto all\'Amarone',
                description: 'Risotto mantecato con Amarone della Valpolicella e gorgonzola dolce',
                price: '€22',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
            },
            {
                id: 3,
                category: 'secondi',
                title: 'Agnello alle Erbe',
                description: 'Agnello scottadito con crosta di erbe mediterranee e riduzione di vino',
                price: '€28',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
            },
            {
                id: 4,
                category: 'dolci',
                title: 'Soufflé al Cioccolato',
                description: 'Soufflé caldo al cioccolato fondente con gelato alla vaniglia',
                price: '€12',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
            },
            {
                id: 5,
                category: 'antipasti',
                title: 'Tartare di Tonno',
                description: 'Tartare di tonno rosso con avocado, lime e sesamo tostato',
                price: '€20',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
            },
            {
                id: 6,
                category: 'primi',
                title: 'Linguine all\'Astice',
                description: 'Linguine fresche con astice, pomodorini confit e basilico',
                price: '€26',
                image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
            }
        ];

        this.renderMenu();
    }

    renderMenu(category = 'all') {
        const menuGrid = document.getElementById('menu-grid');
        if (!menuGrid) return;

        const filteredItems = category === 'all' 
            ? this.menuItems 
            : this.menuItems.filter(item => item.category === category);

        menuGrid.innerHTML = '';

        filteredItems.forEach((item, index) => {
            const menuItem = this.createMenuItem(item, index);
            menuGrid.appendChild(menuItem);
        });
    }

    createMenuItem(item, index) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.style.animationDelay = `${index * 0.1}s`;

        div.innerHTML = `
            <div class="menu-item-image" style="background-image: url('${item.image}')">
                <div class="menu-item-overlay">
                    <span class="menu-item-price">${item.price}</span>
                </div>
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.title}</h3>
                <p class="menu-item-description">${item.description}</p>
                <span class="menu-item-category">${item.category}</span>
            </div>
        `;

        return div;
    }

    // Instagram Gallery
    loadInstagramData() {
        this.instagramItems = [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556909114-5ba02bb89aa2?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=300&fit=crop'
        ];

        this.renderInstagram();
    }

    renderInstagram() {
        const instagramGrid = document.getElementById('instagram-grid');
        if (!instagramGrid) return;

        instagramGrid.innerHTML = '';

        this.instagramItems.forEach((image, index) => {
            const div = document.createElement('div');
            div.className = 'instagram-item';
            
            div.innerHTML = `
                <img src="${image}" alt="Instagram post ${index + 1}" loading="lazy">
                <div class="instagram-overlay">
                    <i class="fab fa-instagram"></i>
                </div>
            `;

            instagramGrid.appendChild(div);
        });
    }

    // Modal Functions
    initModal() {
        const modal = document.getElementById('gallery-modal');
        const modalClose = document.getElementById('modal-close');
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');
        const modalOverlay = modal?.querySelector('.modal-overlay');

        modalClose?.addEventListener('click', () => this.closeModal());
        modalOverlay?.addEventListener('click', () => this.closeModal());
        modalPrev?.addEventListener('click', () => this.navigateModal(-1));
        modalNext?.addEventListener('click', () => this.navigateModal(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal?.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateModal(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateModal(1);
                        break;
                }
            }
        });
    }

    openModal(item, index) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        if (modal && modalImage && modalTitle && modalDescription) {
            this.currentModalIndex = index;
            
            modalImage.src = item.image;
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.description;
            
            modal.style.display = 'flex';
            document.body.classList.add('no-scroll');
        }
    }

    closeModal() {
        const modal = document.getElementById('gallery-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    }

    navigateModal(direction) {
        this.currentModalIndex += direction;
        
        if (this.currentModalIndex < 0) {
            this.currentModalIndex = this.galleryItems.length - 1;
        } else if (this.currentModalIndex >= this.galleryItems.length) {
            this.currentModalIndex = 0;
        }
        
        const item = this.galleryItems[this.currentModalIndex];
        this.openModal(item, this.currentModalIndex);
    }

    // Filter Functions
    initFilters() {
        // Gallery filters
        const galleryFilters = document.querySelectorAll('.filter-btn');
        galleryFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                galleryFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderGallery(btn.dataset.filter);
            });
        });

        // Menu filters
        const menuFilters = document.querySelectorAll('.category-btn');
        menuFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                menuFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderMenu(btn.dataset.category);
            });
        });
    }

    // Form Functions
    initForm() {
        const form = document.getElementById('contact-form');
        
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inviando...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.showNotification('Prenotazione inviata con successo! Ti contatteremo presto.', 'success');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special animations for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                        setTimeout(() => {
                            entry.target.style.animation = 'timelineReveal 0.6s ease-out forwards';
                        }, delay);
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.fade-in, .timeline-item, .menu-item');
        animatableElements.forEach(element => observer.observe(element));
    }

    // Scroll Effects
    initScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Parallax effect for hero
            const hero = document.querySelector('.hero-immersive');
            if (hero) {
                const heroHeight = hero.offsetHeight;
                if (scrolled < heroHeight) {
                    const heroContent = hero.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Map Interactions (Iframe-based)
    initMapInteractions() {
        // Add loading animation to map iframe
        const mapIframe = document.getElementById('google-map-iframe');
        if (mapIframe) {
            mapIframe.addEventListener('load', () => {
                console.log('🗺️ Google Maps iframe loaded successfully');
                mapIframe.style.opacity = '1';
            });
            
            // Set initial opacity for smooth loading
            mapIframe.style.opacity = '0';
            mapIframe.style.transition = 'opacity 0.5s ease';
        }

        // Add hover effects to map container
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.addEventListener('mouseenter', () => {
                mapContainer.style.transform = 'scale(1.02)';
            });
            
            mapContainer.addEventListener('mouseleave', () => {
                mapContainer.style.transform = 'scale(1)';
            });
        }

        // Initialize Street View iframe interactions
        const streetViewIframe = document.querySelector('.street-view-iframe');
        if (streetViewIframe) {
            streetViewIframe.addEventListener('load', () => {
                console.log('🏘️ Street View iframe loaded successfully');
                streetViewIframe.style.opacity = '1';
            });
            
            streetViewIframe.style.opacity = '0';
            streetViewIframe.style.transition = 'opacity 0.5s ease';
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${iconMap[type] || iconMap.info}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            border-radius: 10px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Performance optimizations
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
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
    }
}

// Smooth Scroll Enhancement
class SmoothScrollEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Enhanced smooth scrolling for all anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            }
        });
    }

    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80;
        const duration = 1000;
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.monitorScrollPerformance();
        this.trackUserInteractions();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.metrics.pageLoad = {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            };
            
            console.log('Page Load Metrics:', this.metrics.pageLoad);
        });
    }

    monitorScrollPerformance() {
        let scrollCount = 0;
        let lastScrollTime = performance.now();

        const scrollHandler = () => {
            scrollCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastScrollTime > 1000) {
                this.metrics.scrollFPS = scrollCount;
                scrollCount = 0;
                lastScrollTime = currentTime;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    trackUserInteractions() {
        const interactionEvents = ['click', 'scroll', 'keydown'];
        
        interactionEvents.forEach(event => {
            document.addEventListener(event, () => {
                if (!this.metrics.firstInteraction) {
                    this.metrics.firstInteraction = performance.now();
                    console.log('First User Interaction:', this.metrics.firstInteraction);
                }
            }, { once: true, passive: true });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 FoodGallery App Initializing...');
    
    const app = new FoodGalleryApp();
    const smoothScroll = new SmoothScrollEnhancer();
    const performanceMonitor = new PerformanceMonitor();

    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Application Error:', e.error);
        app.showNotification('Si è verificato un errore. Riprova più tardi.', 'error');
    });

    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    console.log('✅ FoodGallery App Initialized Successfully!');
});

// Global functions for Maps (iframe-based)
window.openInGoogleMaps = function() {
    // Coordinates for Milano, Via Gourmet 123 (example)
    const lat = 45.4654;
    const lng = 9.1859;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
};

window.getDirections = function() {
    // Open directions to restaurant
    const lat = 45.4654;
    const lng = 9.1859;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
};

window.viewLargerMap = function() {
    // Open full-size map
    const lat = 45.4654;
    const lng = 9.1859;
    const url = `https://www.google.com/maps/@${lat},${lng},17z`;
    window.open(url, '_blank');
};

// Classes are available globally for potential use in other scripts
window.FoodGalleryApp = FoodGalleryApp;
window.SmoothScrollEnhancer = SmoothScrollEnhancer;
window.PerformanceMonitor = PerformanceMonitor;
