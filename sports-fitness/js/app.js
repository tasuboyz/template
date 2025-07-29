// ===== FITZONE PRO - MAIN APPLICATION =====

class FitZoneApp {
    constructor() {
        this.isLoaded = false;
        this.scrollPosition = 0;
        this.ticking = false;
        
        // Inizializzazione
        this.init();
    }
    
    init() {
        // Event listeners
        this.bindEvents();
        
        // Inizializza componenti
        this.initLoadingScreen();
        this.initNavigation();
        this.initParticles();
        this.initScrollAnimations();
        this.initCounterAnimations();
        this.initModals();
        this.initFAB();
        this.initScheduleFilters();
        this.initContactForm();
        this.initScrollIndicator();
        
        // Avvia animazioni dopo il caricamento
        setTimeout(() => {
            this.startHeroAnimations();
        }, 3500);
    }
    
    bindEvents() {
        window.addEventListener('load', () => this.handleWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('DOMContentLoaded', () => this.handleDOMLoad());
    }
    
    // ===== LOADING SCREEN =====
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progress = document.querySelector('.loading-progress');
        
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 20;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoaded = true;
                }, 500);
            }
            progress.style.width = currentProgress + '%';
        }, 200);
    }
    
    // ===== NAVIGATION =====
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== PARTICLES SYSTEM =====
    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#ff6b35';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((particle, index) => {
                particles.slice(index + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.strokeStyle = '#ff6b35';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('service-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        setTimeout(() => {
                            entry.target.classList.add('animate-bounce-in-up');
                        }, delay);
                    }
                    
                    if (entry.target.classList.contains('trainer-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                        setTimeout(() => {
                            entry.target.classList.add('animate-flip-in-y');
                        }, delay);
                    }
                    
                    if (entry.target.classList.contains('pricing-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                        setTimeout(() => {
                            entry.target.classList.add('animate-zoom-in');
                        }, delay);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .service-card, .trainer-card, .pricing-card, .contact-item');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
    
    // ===== COUNTER ANIMATIONS =====
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // ===== HERO ANIMATIONS =====
    startHeroAnimations() {
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.classList.add('animate-yoga-flow');
        });
        
        // Animate service icons on hover
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon i');
            
            card.addEventListener('mouseenter', () => {
                icon.classList.add('animate-dumbbell-lift');
            });
            
            card.addEventListener('mouseleave', () => {
                icon.classList.remove('animate-dumbbell-lift');
            });
        });
        
        // Animate trainer social links
        const trainerCards = document.querySelectorAll('.trainer-card');
        trainerCards.forEach(card => {
            const socialLinks = card.querySelectorAll('.social-links a');
            
            socialLinks.forEach((link, index) => {
                link.addEventListener('mouseenter', () => {
                    link.classList.add('animate-bounce-in-up');
                    setTimeout(() => {
                        link.classList.remove('animate-bounce-in-up');
                    }, 800);
                });
            });
        });
    }
    
    // ===== MODALS =====
    initModals() {
        const bookingModal = document.getElementById('booking-modal');
        const progressModal = document.getElementById('progress-modal');
        const modalCloses = document.querySelectorAll('.modal-close');
        
        // Open booking modal
        const bookingButtons = document.querySelectorAll('.service-btn, .trainer-btn, .pricing-btn');
        bookingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.openModal(bookingModal);
            });
        });
        
        // Close modals
        modalCloses.forEach(close => {
            close.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });
        
        // Close modal when clicking outside
        [bookingModal, progressModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Booking form submission
        const bookingForm = document.getElementById('booking-form');
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission(bookingForm);
        });
        
        // Initialize progress circles
        this.initProgressCircles();
    }
    
    openModal(modal) {
        modal.classList.add('show');
        modal.style.animation = 'overlayFadeIn 0.3s ease';
        const content = modal.querySelector('.modal-content');
        content.style.animation = 'modalSlideIn 0.3s ease';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal(modal) {
        const content = modal.querySelector('.modal-content');
        content.style.animation = 'modalSlideOut 0.3s ease';
        modal.style.animation = 'overlayFadeOut 0.3s ease';
        
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 300);
    }
    
    initProgressCircles() {
        const progressCircles = document.querySelectorAll('.progress-circle');
        
        progressCircles.forEach(circle => {
            const progress = circle.getAttribute('data-progress');
            const degree = (progress / 100) * 360;
            
            setTimeout(() => {
                circle.style.background = `conic-gradient(var(--primary-color) ${degree}deg, var(--light-gray) 0deg)`;
            }, 1000);
        });
    }
    
    handleBookingSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Prenotazione...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Prenotazione Confermata!';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                this.closeModal(form.closest('.modal'));
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
                
                // Show success notification
                this.showNotification('Prenotazione confermata! Ti contatteremo presto.', 'success');
            }, 2000);
        }, 2000);
    }
    
    // ===== FLOATING ACTION BUTTON =====
    initFAB() {
        const fab = document.getElementById('main-fab');
        const fabContainer = document.querySelector('.fab-container');
        const fabOptions = document.querySelectorAll('.fab-option');
        
        fab.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
            
            if (fabContainer.classList.contains('active')) {
                fab.innerHTML = '<i class="fas fa-times"></i>';
                fab.style.transform = 'rotate(135deg)';
            } else {
                fab.innerHTML = '<i class="fas fa-plus"></i>';
                fab.style.transform = 'rotate(0deg)';
            }
        });
        
        fabOptions.forEach(option => {
            option.addEventListener('click', () => {
                const action = option.getAttribute('data-action');
                
                switch(action) {
                    case 'booking':
                        this.openModal(document.getElementById('booking-modal'));
                        break;
                    case 'progress':
                        this.openModal(document.getElementById('progress-modal'));
                        break;
                    case 'contact':
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        break;
                }
                
                // Close FAB menu
                fabContainer.classList.remove('active');
                fab.innerHTML = '<i class="fas fa-plus"></i>';
                fab.style.transform = 'rotate(0deg)';
            });
        });
        
        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
                fab.innerHTML = '<i class="fas fa-plus"></i>';
                fab.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // ===== SCHEDULE FILTERS =====
    initScheduleFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const classItems = document.querySelectorAll('.class-item');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter classes
                classItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate-fade-in');
                    }
                });
            });
        });
        
        // Add click animation to class items
        classItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add('animate-pulse');
                setTimeout(() => {
                    item.classList.remove('animate-pulse');
                    
                    // Show booking modal
                    this.openModal(document.getElementById('booking-modal'));
                    
                    // Pre-fill service type
                    const className = item.querySelector('.class-name').textContent;
                    const serviceSelect = document.getElementById('booking-service');
                    serviceSelect.value = 'group';
                    
                }, 300);
            });
        });
    }
    
    // ===== CONTACT FORM =====
    initContactForm() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Floating label effect
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(form);
        });
    }
    
    handleContactSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
                
                // Show success notification
                this.showNotification('Messaggio inviato! Ti risponderemo presto.', 'success');
            }, 2000);
        }, 2000);
    }
    
    // ===== SCROLL INDICATOR =====
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Hide scroll indicator after scrolling
            window.addEventListener('scroll', () => {
                if (window.scrollY > window.innerHeight * 0.5) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            });
        }
    }
    
    // ===== NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--info-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }
    
    removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ===== EVENT HANDLERS =====
    handleWindowLoad() {
        // Additional setup after window load
        this.addHoverEffects();
        this.initParallaxEffects();
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.updateActiveNavLink();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    handleResize() {
        // Update canvas size
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    handleDOMLoad() {
        // Additional DOM setup
        this.preloadImages();
    }
    
    // ===== ADDITIONAL EFFECTS =====
    addHoverEffects() {
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.btn, .service-btn, .trainer-btn, .pricing-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add('hover-glow');
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('hover-glow');
            });
        });
        
        // Add hover effects to cards
        const cards = document.querySelectorAll('.service-card, .trainer-card, .pricing-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-float');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-float');
            });
        });
    }
    
    initParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.floating-element');
    }
    
    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    
    preloadImages() {
        const imageUrls = [
            // Add any images you want to preload
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
}

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function
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
    
    // Throttle function
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
        }
    },
    
    // Get element offset
    getOffset: (element) => {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const elementPosition = utils.getOffset(element).top - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// ===== START APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.fitZoneApp = new FitZoneApp();
});

// ===== ADDITIONAL INTERACTIONS =====

// Hero buttons
document.addEventListener('DOMContentLoaded', () => {
    const startJourneyBtn = document.getElementById('start-journey');
    const watchVideoBtn = document.getElementById('watch-video');
    
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            startJourneyBtn.classList.add('animate-pulse');
            setTimeout(() => {
                startJourneyBtn.classList.remove('animate-pulse');
                document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }
    
    if (watchVideoBtn) {
        watchVideoBtn.addEventListener('click', () => {
            watchVideoBtn.classList.add('animate-heartbeat');
            setTimeout(() => {
                watchVideoBtn.classList.remove('animate-heartbeat');
                // Here you could open a video modal
                window.fitZoneApp.showNotification('Video demo in arrivo!', 'info');
            }, 300);
        });
    }
});

// Special effects for pricing cards
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const amount = card.querySelector('.amount');
            if (amount) {
                amount.classList.add('animate-tada');
                setTimeout(() => {
                    amount.classList.remove('animate-tada');
                }, 1000);
            }
        });
    });
});

// Interactive trainer cards
document.addEventListener('DOMContentLoaded', () => {
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        const trainerBtn = card.querySelector('.trainer-btn');
        
        if (trainerBtn) {
            trainerBtn.addEventListener('click', () => {
                card.classList.add('animate-jello');
                setTimeout(() => {
                    card.classList.remove('animate-jello');
                }, 900);
            });
        }
    });
});

// Service card special effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('animate-zoom-in');
            setTimeout(() => {
                card.classList.remove('animate-zoom-in');
            }, 600);
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            window.fitZoneApp.closeModal(modal);
        });
        
        // Close FAB menu
        const fabContainer = document.querySelector('.fab-container');
        if (fabContainer.classList.contains('active')) {
            fabContainer.classList.remove('active');
            const fab = document.getElementById('main-fab');
            fab.innerHTML = '<i class="fas fa-plus"></i>';
            fab.style.transform = 'rotate(0deg)';
        }
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
            console.log('Swipe up detected');
        } else {
            // Swipe down - could trigger some action
            console.log('Swipe down detected');
        }
    }
}

// Performance optimization
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
