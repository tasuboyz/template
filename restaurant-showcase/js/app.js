/**
 * =============================================================================
 * BELLA VISTA RESTAURANT - MAIN JAVASCRIPT APPLICATION
 * Modern ES6+ Restaurant Website with WOW Effects
 * =============================================================================
 */

class BellaVistaApp {
    constructor() {
        this.isLoaded = false;
        this.particles = [];
        this.observers = new Map();
        this.counters = new Map();
        this.formValidator = null;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.startLoadingSequence();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('load', () => this.onWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Navigation events
        this.setupNavigationEvents();
        
        // Form events
        this.setupFormEvents();
        
        // Button events
        this.setupButtonEvents();
    }

    /**
     * DOM Ready handler
     */
    onDOMReady() {
        console.log('🎉 Bella Vista - DOM Ready');
        this.initParticleSystem();
        this.initScrollReveal();
        this.initCounters();
        this.initMenuFilters();
    }

    /**
     * Window Load handler
     */
    onWindowLoad() {
        setTimeout(() => {
            this.hideLoadingScreen();
            this.isLoaded = true;
            this.startHeroAnimations();
        }, 2000);
    }

    /**
     * Initialize all components
     */
    initializeComponents() {
        this.formValidator = new FormValidator();
        this.notificationSystem = new NotificationSystem();
        this.scrollProgressIndicator = new ScrollProgressIndicator();
    }

    /**
     * Start loading sequence
     */
    startLoadingSequence() {
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 500);
        }
    }

    /**
     * Hide loading screen with animation
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    /**
     * Start hero section animations
     */
    startHeroAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero .title-line, .hero-subtitle, .hero-buttons, .hero-stats');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Start counter animations
        this.startCounterAnimations();
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        this.updateHeader();
        this.updateBackToTop();
        this.updateParallax();
        this.scrollProgressIndicator?.update();
    }

    /**
     * Handle resize events
     */
    handleResize() {
        if (this.particles.length > 0) {
            this.initParticleSystem();
        }
    }

    /**
     * Update header on scroll
     */
    updateHeader() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    /**
     * Update back to top button
     */
    updateBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    }

    /**
     * Update parallax effects
     */
    updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Initialize particle system
     */
    initParticleSystem() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        // Clear existing particles
        particleContainer.innerHTML = '';
        this.particles = [];

        const particleCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particleContainer);
        }
    }

    /**
     * Create a single particle
     */
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const sizes = ['small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        particle.classList.add(size);
        
        // Random position and timing
        const leftPos = Math.random() * 100;
        const animationDelay = Math.random() * 15;
        const animationDuration = 8 + Math.random() * 8;
        
        particle.style.left = `${leftPos}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${animationDuration}s`;
        
        container.appendChild(particle);
        this.particles.push(particle);
    }

    /**
     * Initialize scroll reveal animations
     */
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealElements = document.querySelectorAll('.menu-item, .feature-item, .gallery-item, .contact-item');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(element => {
                element.classList.add('animate');
            });
        }
    }

    /**
     * Initialize counters
     */
    initCounters() {
        const counterElements = document.querySelectorAll('[data-count]');
        
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counterElements.forEach(element => {
                counterObserver.observe(element);
            });
        }
    }

    /**
     * Start counter animations
     */
    startCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            if (this.isElementInViewport(counter)) {
                this.animateCounter(counter);
            }
        });
    }

    /**
     * Animate a counter element
     */
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);

        element.classList.add('counting');
    }

    /**
     * Check if element is in viewport
     */
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Initialize menu filters
     */
    initMenuFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter menu items
                this.filterMenuItems(menuItems, filter);
            });
        });
    }

    /**
     * Filter menu items with animation
     */
    filterMenuItems(items, filter) {
        items.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.classList.remove('filter-hide');
                    item.classList.add('filter-show');
                }, index * 50);
            } else {
                item.classList.remove('filter-show');
                item.classList.add('filter-hide');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    /**
     * Setup navigation events
     */
    setupNavigationEvents() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link, [data-scroll]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href') || `#${link.dataset.scroll}`;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    // Update active nav link
                    this.updateActiveNavLink(link);
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLinkOnScroll();
        });
    }

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementTop = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    /**
     * Update active nav link based on scroll position
     */
    updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.getElementById('header').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Setup form events
     */
    setupFormEvents() {
        const reservationForm = document.getElementById('reservation-form');
        if (reservationForm) {
            reservationForm.addEventListener('submit', (e) => this.handleReservationSubmit(e));
        }

        // Real-time form validation
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    /**
     * Handle reservation form submission
     */
    handleReservationSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (this.validateReservationForm(form)) {
            this.submitReservation(data);
        }
    }

    /**
     * Validate reservation form
     */
    validateReservationForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }
        
        // Email validation
        if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Inserisci un indirizzo email valido';
        }
        
        // Phone validation
        if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Inserisci un numero di telefono valido';
        }
        
        // Date validation
        if (fieldType === 'date' && value && !this.isValidDate(value)) {
            isValid = false;
            errorMessage = 'Seleziona una data valida';
        }
        
        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    /**
     * Set field validation state
     */
    setFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        
        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        } else {
            formGroup.classList.remove('success');
            formGroup.classList.add('error');
        }
        
        // Show/hide error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!isValid && errorMessage) {
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.color = '#dc3545';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '0.25rem';
                errorElement.style.display = 'block';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Clear field error state
     */
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Email validation
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone validation
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Date validation
     */
    isValidDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }

    /**
     * Submit reservation
     */
    submitReservation(data) {
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.notificationSystem.show('Prenotazione inviata con successo!', 'success');
            
            // Reset form
            document.getElementById('reservation-form').reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear validation states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
            
        }, 2000);
    }

    /**
     * Setup button events
     */
    setupButtonEvents() {
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });

        // View buttons in menu
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuItem = button.closest('.menu-item');
                this.showMenuItemDetails(menuItem);
            });
        });

        // Gallery buttons
        const galleryButtons = document.querySelectorAll('.gallery-btn');
        galleryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const galleryItem = button.closest('.gallery-item');
                this.showGalleryModal(galleryItem);
            });
        });
    }

    /**
     * Create ripple effect on button click
     */
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Show menu item details
     */
    showMenuItemDetails(menuItem) {
        const title = menuItem.querySelector('h3').textContent;
        const description = menuItem.querySelector('p').textContent;
        const price = menuItem.querySelector('.menu-price').textContent;
        
        this.notificationSystem.show(`${title} - ${price}`, 'info', 3000);
    }

    /**
     * Show gallery modal
     */
    showGalleryModal(galleryItem) {
        this.notificationSystem.show('Apertura galleria...', 'info', 2000);
    }
}

/**
 * Form Validator Class
 */
class FormValidator {
    constructor() {
        this.rules = new Map();
        this.setupDefaultRules();
    }

    setupDefaultRules() {
        this.rules.set('required', (value) => value.trim() !== '');
        this.rules.set('email', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        this.rules.set('phone', (value) => /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{8,}$/.test(value));
        this.rules.set('minLength', (value, length) => value.length >= length);
        this.rules.set('maxLength', (value, length) => value.length <= length);
    }

    validate(field, rules) {
        const value = field.value.trim();
        const errors = [];

        rules.forEach(rule => {
            const [ruleName, ...params] = rule.split(':');
            const validator = this.rules.get(ruleName);
            
            if (validator && !validator(value, ...params)) {
                errors.push(this.getErrorMessage(ruleName, params));
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    getErrorMessage(ruleName, params) {
        const messages = {
            required: 'Questo campo è obbligatorio',
            email: 'Inserisci un indirizzo email valido',
            phone: 'Inserisci un numero di telefono valido',
            minLength: `Minimo ${params[0]} caratteri`,
            maxLength: `Massimo ${params[0]} caratteri`
        };

        return messages[ruleName] || 'Valore non valido';
    }
}

/**
 * Notification System Class
 */
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification');
        this.queue = [];
        this.isShowing = false;
    }

    show(message, type = 'info', duration = 4000) {
        this.queue.push({ message, type, duration });
        if (!this.isShowing) {
            this.processQueue();
        }
    }

    processQueue() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }

        this.isShowing = true;
        const notification = this.queue.shift();
        this.displayNotification(notification);
    }

    displayNotification({ message, type, duration }) {
        const icon = this.getIcon(type);
        const iconElement = this.container.querySelector('.notification-icon');
        const textElement = this.container.querySelector('.notification-text');

        iconElement.className = `notification-icon ${icon}`;
        textElement.textContent = message;
        
        this.container.className = `notification ${type}`;
        this.container.classList.add('show');

        setTimeout(() => {
            this.hide();
        }, duration);
    }

    hide() {
        this.container.classList.remove('show');
        setTimeout(() => {
            this.processQueue();
        }, 300);
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

/**
 * Scroll Progress Indicator Class
 */
class ScrollProgressIndicator {
    constructor() {
        this.createProgressBar();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    update() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

/**
 * Add CSS for ripple animation
 */
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    window.bellaVistaApp = new BellaVistaApp();
    console.log('🍝 Bella Vista Restaurant - Loaded Successfully!');
});

/**
 * Performance optimization: Debounce scroll events
 */
function debounce(func, wait) {
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
