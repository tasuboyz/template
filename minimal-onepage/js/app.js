// Template Minimal - JavaScript ES6
// Effetti WOW e Interazioni

class MinimalTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupTypewriter();
        this.setupCounters();
        this.setupPortfolioFilter();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupParticles();
        this.setupRippleEffect();
    }

    setupEventListeners() {
        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navigation Links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.handleBackToTop();
            this.handleScrollAnimations();
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        backToTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth scroll for hero buttons
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = btn.getAttribute('onclick');
                if (targetSection) {
                    e.preventDefault();
                    const sectionId = targetSection.match(/'([^']+)'/)?.[1];
                    if (sectionId) {
                        this.scrollToSection(`#${sectionId}`);
                    }
                }
            });
        });
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    handleBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    }

    initializeAnimations() {
        // Initialize Intersection Observer for scroll animations
        this.observeElements();
        
        // Add initial animation classes
        setTimeout(() => {
            document.querySelectorAll('.wow-fade-in, .wow-slide-up, .wow-slide-left, .wow-slide-right, .wow-scale-up').forEach((element, index) => {
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.animation = element.style.animation.replace('forwards', 'forwards');
                }, parseFloat(delay) * 1000);
            });
        }, 100);
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Start counters when they come into view
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        document.querySelectorAll('.scroll-reveal, .slide-in-bottom, .slide-in-left, .slide-in-right, .fade-in, .scale-in, .counter').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const texts = typewriterElement.dataset.text.split(',');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const waitTime = 2000;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isWaiting) {
                setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    typeWriter();
                }, waitTime);
                return;
            }

            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isWaiting = true;
                }
            }

            const speed = isDeleting ? deleteSpeed : typeSpeed;
            setTimeout(typeWriter, speed);
        };

        // Start typewriter effect
        setTimeout(typeWriter, 1000);
    }

    setupCounters() {
        // Counters will be animated when they come into view via Intersection Observer
    }

    animateCounter(element) {
        if (element.classList.contains('animated')) return;
        element.classList.add('animated');

        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    }

    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.dataset.filter;

                portfolioItems.forEach(item => {
                    const category = item.dataset.category;
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('wow-scale-up');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            this.showNotification('Messaggio inviato con successo!', 'success');
            contactForm.reset();

            // In a real application, you would send the data to your server
            console.log('Form data:', data);
        });

        // Enhanced form interactions
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', () => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });

        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }
        }, 5000);
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add scroll-based animations
        const animatedElements = document.querySelectorAll('.slide-in-bottom, .slide-in-left, .slide-in-right, .fade-in, .scale-in');
        
        const handleScroll = () => {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight * 0.8;

                if (elementTop < triggerPoint && !element.classList.contains('animate')) {
                    element.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    }

    setupParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 5;
            
            particle.style.cssText = `
                left: ${startX}px;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particlesContainer.contains(particle)) {
                    particlesContainer.removeChild(particle);
                }
            }, duration * 1000);
        };

        // Create particles periodically
        setInterval(createParticle, 300);
    }

    setupRippleEffect() {
        document.querySelectorAll('.ripple-effect').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Utility method for smooth scrolling to sections
    static scrollToSection(sectionId) {
        const element = document.querySelector(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Method to add dynamic content (for future use)
    addServiceCard(service) {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card wow-scale-up';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-features">
                ${service.features.map(feature => `<span>${feature}</span>`).join('')}
            </div>
        `;

        servicesGrid.appendChild(serviceCard);
    }

    // Method to add portfolio item
    addPortfolioItem(item) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;

        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item wow-scale-up';
        portfolioItem.dataset.category = item.category;
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <div class="image-placeholder">
                    <i class="${item.icon}"></i>
                </div>
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h4>${item.title}</h4>
                        <p>${item.category}</p>
                        <button class="view-project">
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        portfolioGrid.appendChild(portfolioItem);
    }
}

// Global functions for onclick handlers
window.scrollToSection = (sectionId) => {
    MinimalTemplate.scrollToSection(sectionId);
};

// Initialize the template when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinimalTemplate();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Easter egg: Add some fun interactions
    let clickCount = 0;
    document.querySelector('.logo-text')?.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            document.body.style.animation = 'none';
            document.body.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'gradientShift 15s ease infinite';
            
            setTimeout(() => {
                document.body.style.animation = 'none';
                document.body.style.background = '';
                clickCount = 0;
            }, 10000);
        }
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MinimalTemplate;
}
