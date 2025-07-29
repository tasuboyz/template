// Medical Healthcare Template - Main JavaScript (ES6)
// Effetti WOW e interazioni avanzate

class MedicalTemplate {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.setupCounters();
        this.setupTestimonials();
        this.setupParallax();
        this.setupFormValidation();
        this.setupSmoothScrolling();
        this.setupLoadingScreen();
    }

    init() {
        console.log('🏥 MediCare+ Template Inizializzato');
        this.currentTestimonial = 0;
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.totalTestimonials = this.testimonials.length;
        this.isScrolling = false;
        this.lastScrollTop = 0;
        
        // Creazione delle particelle animate
        this.createFloatingParticles();
        this.createPulseDots();
    }

    bindEvents() {
        // Header scroll effect
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Navigation
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Mobile menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Form submission
        const appointmentForm = document.getElementById('appointment-form');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', this.handleFormSubmission.bind(this));
        }

        // Service cards interactions
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleServiceCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleServiceCardLeave.bind(this));
        });

        // Doctor cards interactions
        document.querySelectorAll('.doctor-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleDoctorCardHover.bind(this));
        });

        // Testimonial controls
        document.getElementById('prev-testimonial')?.addEventListener('click', () => {
            this.changeTestimonial(-1);
        });
        
        document.getElementById('next-testimonial')?.addEventListener('click', () => {
            this.changeTestimonial(1);
        });

        // Play video button
        document.getElementById('play-video')?.addEventListener('click', this.handleVideoPlay.bind(this));

        // Resize handler
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    this.triggerInitialAnimations();
                }, 500);
            }, 2000);
        }
    }

    triggerInitialAnimations() {
        // Animazione del hero
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.animation = 'slideInLeft 1s ease-out forwards';
        }
        
        if (heroImage) {
            heroImage.style.animation = 'slideInRight 1s ease-out forwards';
        }

        // Avvia i contatori
        this.startCounters();
        
        // Animazione delle icone fluttuanti
        this.animateFloatingIcons();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Osserva gli elementi da animare
        document.querySelectorAll('.service-card, .doctor-card, .section-header, .contact-item').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('service-card')) {
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
            
            // Animazione staggered per le service cards
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
        
        if (element.classList.contains('doctor-card')) {
            element.style.animation = 'fadeInScale 0.8s ease-out forwards';
            
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.2}s`;
        }
        
        if (element.classList.contains('section-header')) {
            element.style.animation = 'fadeInDown 0.8s ease-out forwards';
        }
        
        if (element.classList.contains('contact-item')) {
            element.style.animation = 'slideInLeft 0.8s ease-out forwards';
            
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }

        // Rimuovi l'elemento dall'observer
        this.observer.unobserve(element);
    }

    setupCounters() {
        this.counters = document.querySelectorAll('.stat-item[data-counter]');
        this.hasCountersAnimated = false;
    }

    startCounters() {
        if (this.hasCountersAnimated) return;
        
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const numberElement = counter.querySelector('.stat-number');
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current >= target) {
                    numberElement.textContent = target;
                    numberElement.classList.add('counter-animate');
                } else {
                    numberElement.textContent = Math.floor(current);
                    setTimeout(updateCounter, stepDuration);
                }
            };
            
            setTimeout(updateCounter, 500);
        });
        
        this.hasCountersAnimated = true;
    }

    setupTestimonials() {
        if (this.totalTestimonials === 0) return;

        // Crea i dots per i testimonial
        this.createTestimonialDots();
        
        // Auto-scroll testimonials
        this.startTestimonialAutoScroll();
    }

    createTestimonialDots() {
        const dotsContainer = document.querySelector('.testimonials-dots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalTestimonials; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToTestimonial(i));
            dotsContainer.appendChild(dot);
        }
    }

    startTestimonialAutoScroll() {
        setInterval(() => {
            if (!document.querySelector('.testimonials-carousel:hover')) {
                this.changeTestimonial(1);
            }
        }, 5000);
    }

    changeTestimonial(direction) {
        const currentCard = this.testimonials[this.currentTestimonial];
        
        // Rimuovi classe active dal testimonial corrente
        currentCard.classList.remove('active');
        
        // Calcola il nuovo indice
        this.currentTestimonial += direction;
        
        if (this.currentTestimonial >= this.totalTestimonials) {
            this.currentTestimonial = 0;
        } else if (this.currentTestimonial < 0) {
            this.currentTestimonial = this.totalTestimonials - 1;
        }
        
        // Attiva il nuovo testimonial
        this.activateTestimonial(this.currentTestimonial);
    }

    goToTestimonial(index) {
        const currentCard = this.testimonials[this.currentTestimonial];
        currentCard.classList.remove('active');
        
        this.currentTestimonial = index;
        this.activateTestimonial(this.currentTestimonial);
    }

    activateTestimonial(index) {
        const newCard = this.testimonials[index];
        newCard.classList.add('active');
        
        // Aggiorna i dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Effetto di animazione
        newCard.style.animation = 'fadeInScale 0.5s ease-out forwards';
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }

    setupFormValidation() {
        const form = document.getElementById('appointment-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
    }

    validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        const fieldName = field.name;
        
        let isValid = true;
        let errorMessage = '';

        // Rimuovi errori precedenti
        this.clearFieldError(event);

        // Validazione specifica per campo
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Il nome deve contenere almeno 2 caratteri';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Inserisci un indirizzo email valido';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Inserisci un numero di telefono valido';
                }
                break;
                
            case 'specialty':
            case 'date':
            case 'time':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Questo campo è obbligatorio';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.style.animation = 'shake 0.5s ease-out';
    }

    clearFieldError(event) {
        const field = event.target;
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
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

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.getElementById('header');
        
        // Header scroll effect
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Parallax effects
        this.updateParallaxElements(scrollTop);
        
        // Update last scroll position
        this.lastScrollTop = scrollTop;
    }

    updateParallaxElements(scrollTop) {
        // Floating particles
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollTop * 0.2}px)`;
        }

        // Pulse circles
        const pulseCircles = document.querySelectorAll('.pulse-circle');
        pulseCircles.forEach((circle, index) => {
            const speed = 0.1 + (index * 0.05);
            circle.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    }

    handleNavigation(event) {
        const target = event.target;
        
        if (target.classList.contains('nav-link')) {
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    }

    handleServiceCardHover(event) {
        const card = event.target.closest('.service-card');
        const icon = card.querySelector('.service-icon i');
        
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease-out';
            
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        }
    }

    handleServiceCardLeave(event) {
        const card = event.target.closest('.service-card');
        const icon = card.querySelector('.service-icon i');
        
        if (icon) {
            icon.style.animation = '';
        }
    }

    handleDoctorCardHover(event) {
        const card = event.target.closest('.doctor-card');
        const image = card.querySelector('.doctor-image');
        
        if (image) {
            image.style.animation = 'pulse 0.6s ease-out';
            
            setTimeout(() => {
                image.style.animation = '';
            }, 600);
        }
    }

    handleVideoPlay(event) {
        event.preventDefault();
        
        // Simulate video modal
        const modal = this.createVideoModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    createVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'modal video-modal';
        modal.innerHTML = `
            <div class="modal-content video-content">
                <div class="modal-close">&times;</div>
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video Demo - MediCare+ Excellence</p>
                    <small>Clicca per chiudere</small>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        return modal;
    }

    handleFormSubmission(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validazione completa del form
        const isValid = this.validateForm(form);
        
        if (!isValid) {
            this.showFormError('Per favore correggi gli errori nel modulo');
            return;
        }

        // Simula l'invio del form
        this.simulateFormSubmission(submitBtn, formData);
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const fieldValid = this.validateField({ target: field });
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    simulateFormSubmission(submitBtn, formData) {
        // Cambio stato del pulsante
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitBtn.disabled = true;
        
        // Simula chiamata API
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Inviato!';
            submitBtn.style.background = '#22c55e';
            
            setTimeout(() => {
                this.showSuccessModal();
                
                // Reset form
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    document.getElementById('appointment-form').reset();
                }, 2000);
            }, 1000);
        }, 2000);
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    showFormError(message) {
        const form = document.getElementById('appointment-form');
        let errorElement = form.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            form.insertBefore(errorElement, form.firstChild);
        }
        
        errorElement.textContent = message;
        errorElement.style.animation = 'shake 0.5s ease-out';
        
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    createFloatingParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleColors = ['#2563eb', '#0ea5e9', '#22c55e', '#f59e0b'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${particleColors[Math.floor(Math.random() * particleColors.length)]};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticles ${15 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: 0.6;
                pointer-events: none;
            `;
            
            hero.appendChild(particle);
        }
    }

    createPulseDots() {
        const testimonials = document.querySelector('.testimonials-dots');
        if (!testimonials) return;

        // Dots sono già creati in createTestimonialDots()
    }

    animateFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        
        icons.forEach((icon, index) => {
            icon.style.animation = `floatIcon ${3 + Math.random() * 2}s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.5}s`;
        });
    }

    handleResize() {
        // Responsive adjustments
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Pause complex animations on mobile for performance
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    }

    // Utility functions
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
}

// Global functions
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MedicalTemplate();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalTemplate;
}
