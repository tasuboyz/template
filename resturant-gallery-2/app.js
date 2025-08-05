// Restaurant Template App - ES6 Modular JavaScript

class RestaurantApp {
    constructor() {
        this.init();
    }

    init() {
        this.initNavigation();
        this.initCarousel();
        this.initPizzaSlider();
        this.initNewsletter();
        this.initScrollAnimations();
        this.initCookieNotice();
        this.loadPizzaData();
    }

    // Navigation functionality
    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.toggleHamburger(navToggle);
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                this.resetHamburger(navToggle);
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    toggleHamburger(toggle) {
        const bars = toggle.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    }

    resetHamburger(toggle) {
        const bars = toggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }

    // Hero carousel functionality
    initCarousel() {
        const carousel = document.getElementById('pizza-carousel');
        const pizzaImages = [
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&h=500&fit=crop'
        ];

        let currentSlide = 0;

        // Create carousel items
        pizzaImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.style.backgroundImage = `url(${image})`;
            carousel.appendChild(item);
        });

        // Auto-rotate carousel
        setInterval(() => {
            this.rotateCarousel(carousel, currentSlide, pizzaImages.length);
            currentSlide = (currentSlide + 1) % pizzaImages.length;
        }, 4000);
    }

    rotateCarousel(carousel, currentSlide, totalSlides) {
        const items = carousel.querySelectorAll('.carousel-item');
        items[currentSlide].classList.remove('active');
        
        const nextSlide = (currentSlide + 1) % totalSlides;
        items[nextSlide].classList.add('active');
    }

    // Load and display pizza data
    loadPizzaData() {
        const pizzas = [
            {
                name: "Margherita Gourmet",
                description: "Pomodoro San Marzano, mozzarella di bufala, basilico fresco, olio EVO",
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop"
            },
            {
                name: "Quattro Stagioni Premium",
                description: "Prosciutto di Parma, funghi porcini, olive taggiasche, carciofi romani",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
            },
            {
                name: "Pizza del Pescatore",
                description: "Frutti di mare freschi, pomodorini ciliegino, rucola, limone",
                image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop"
            },
            {
                name: "Vegetariana Deluxe",
                description: "Zucchine, melanzane, peperoni, pomodori secchi, formaggio di capra",
                image: "https://images.unsplash.com/photo-1593072948836-ae62a0eb2ed9?w=400&h=300&fit=crop"
            },
            {
                name: "Piccante Speciale",
                description: "Salame piccante, 'nduja calabrese, cipolla rossa, peperoncini freschi",
                image: "https://images.unsplash.com/photo-1600628421060-04e614d24d75?w=400&h=300&fit=crop"
            },
            {
                name: "Pizza Bianca Tartufata",
                description: "Mozzarella, ricotta, tartufo nero, rucola, scaglie di grana",
                image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop"
            }
        ];

        this.renderPizzas(pizzas);
    }

    renderPizzas(pizzas) {
        const pizzaSlider = document.getElementById('pizza-slider');
        pizzaSlider.innerHTML = '';

        pizzas.forEach((pizza, index) => {
            const pizzaItem = this.createPizzaItem(pizza, index);
            pizzaSlider.appendChild(pizzaItem);
        });
    }

    createPizzaItem(pizza, index) {
        const item = document.createElement('div');
        item.className = 'pizza-item fade-in-up';
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <div class="pizza-image" style="background-image: url('${pizza.image}')"></div>
            <div class="pizza-info">
                <h3 class="pizza-name">${pizza.name}</h3>
                <p class="pizza-description">${pizza.description}</p>
            </div>
        `;

        return item;
    }

    // Pizza slider functionality
    initPizzaSlider() {
        const slider = document.getElementById('pizza-slider');
        let isScrolling = false;

        // Add scroll animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        // Observe pizza items when they're created
        setTimeout(() => {
            const pizzaItems = document.querySelectorAll('.pizza-item');
            pizzaItems.forEach(item => observer.observe(item));
        }, 100);
    }

    // Newsletter functionality
    initNewsletter() {
        const form = document.getElementById('newsletter-form');
        
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            this.handleNewsletterSubmission(email);
        });
    }

    handleNewsletterSubmission(email) {
        // Simulate API call
        const button = document.querySelector('#newsletter-form button');
        const originalText = button.textContent;
        
        button.textContent = 'Iscrizione...';
        button.disabled = true;

        setTimeout(() => {
            this.showNotification('Iscrizione completata con successo!', 'success');
            button.textContent = originalText;
            button.disabled = false;
            document.querySelector('#newsletter-form input').value = '';
        }, 2000);
    }

    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        const sections = document.querySelectorAll('.services, .newsletter, .promotions');
        sections.forEach(section => observer.observe(section));
    }

    // Cookie notice functionality
    initCookieNotice() {
        const cookieNotice = document.getElementById('cookie-notice');
        const acceptButton = document.getElementById('accept-cookies');

        // Check if cookies were already accepted
        if (localStorage.getItem('cookies-accepted')) {
            cookieNotice?.classList.add('hidden');
        }

        acceptButton?.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookieNotice.classList.add('hidden');
        });
    }

    // Utility function for notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance optimization utilities
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;

        const updateScrollElements = () => {
            // Add any scroll-based updates here
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }
}

// Analytics and tracking
class Analytics {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackInteractions();
    }

    trackPageView() {
        this.logEvent('page_view', {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        });
    }

    trackInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .cta-button')) {
                this.logEvent('click', {
                    element: e.target.textContent.trim(),
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.logEvent('form_submit', {
                form: e.target.id || 'unknown',
                timestamp: new Date().toISOString()
            });
        });
    }

    logEvent(eventName, data) {
        this.events.push({ eventName, data });
        console.log(`Analytics Event: ${eventName}`, data);
        
        // In a real application, you would send this to your analytics service
        // this.sendToAnalytics(eventName, data);
    }

    sendToAnalytics(eventName, data) {
        // Example API call to analytics service
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventName, data })
        }).catch(err => console.error('Analytics error:', err));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new RestaurantApp();
    const smoothScroll = new SmoothScroll();
    const performanceOptimizer = new PerformanceOptimizer();
    const analytics = new Analytics();

    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
        analytics.logEvent('error', {
            message: e.error.message,
            filename: e.filename,
            lineno: e.lineno,
            timestamp: new Date().toISOString()
        });
    });

    console.log('Restaurant Template App initialized successfully!');
});

// Classes are available globally for potential use in other scripts
window.RestaurantApp = RestaurantApp;
window.SmoothScroll = SmoothScroll;
window.PerformanceOptimizer = PerformanceOptimizer;
window.Analytics = Analytics;
