// Fashion Beauty Template - JavaScript ES6
// All-in-one file for complete functionality

class FashionBeautyTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initCustomCursor();
        this.initLoadingScreen();
        this.initNavigation();
        this.initHero();
        this.initCollections();
        this.initLookbook();
        this.initBeautyCarousel();
        this.initContactForm();
        this.initScrollAnimations();
        this.initParticleSystem();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // DOM loaded event
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Fashion Beauty Template Loaded');
            this.showLoadingScreen();
        });

        // Window load event
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateScrollIndicator();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Custom Cursor
    initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .collection-card, .thumb-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.mixBlendMode = 'difference';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.mixBlendMode = 'difference';
            });
        });
    }

    // Loading Screen
    initLoadingScreen() {
        this.loadingScreen = document.getElementById('loading-screen');
    }

    showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Add entrance animations
            this.triggerEntranceAnimations();
        }
    }

    triggerEntranceAnimations() {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `fadeInUp 1s ease ${index * 0.2}s both`;
            }, 500);
        });
    }

    // Navigation
    initNavigation() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');

        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Smooth scroll for nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                    this.closeMobileMenu();
                }
            });
        });

        // Navbar scroll effect
        this.handleNavbarScroll();
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    handleNavbarScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Hero Section
    initHero() {
        this.initHeroBackgrounds();
        this.initHeroButtons();
        this.initFloatingShapes();
    }

    initHeroBackgrounds() {
        const showcaseItems = document.querySelectorAll('.showcase-item');
        showcaseItems.forEach(item => {
            const bg = item.getAttribute('data-bg');
            if (bg) {
                item.style.backgroundImage = `url(${bg})`;
            }
        });
    }

    initHeroButtons() {
        const sparkleButtons = document.querySelectorAll('.sparkle-btn');
        sparkleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createSparkleEffect(e.target);
            });
        });
    }

    createSparkleEffect(element) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-particle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleParticle 1s ease-out forwards;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    initFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            this.animateFloatingShape(shape);
        });
    }

    animateFloatingShape(shape) {
        const duration = 4000 + Math.random() * 4000;
        const delay = Math.random() * 2000;
        
        shape.style.animationDuration = `${duration}ms`;
        shape.style.animationDelay = `${delay}ms`;
    }

    // Collections
    initCollections() {
        this.initCollectionFilters();
        this.initCollectionCards();
    }

    initCollectionFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const collectionCards = document.querySelectorAll('.collection-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter cards
                this.filterCollections(collectionCards, filter);
            });
        });
    }

    filterCollections(cards, filter) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInScale 0.6s ease forwards';
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    initCollectionCards() {
        const cards = document.querySelectorAll('.collection-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });

            // Card click handler
            const cardBtn = card.querySelector('.card-btn');
            if (cardBtn) {
                cardBtn.addEventListener('click', () => {
                    this.handleCardClick(card);
                });
            }
        });
    }

    addCardHoverEffect(card) {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    }

    removeCardHoverEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    }

    handleCardClick(card) {
        // Add ripple effect
        this.createRippleEffect(card);
        
        // Show notification
        this.showNotification('Collection viewed! 💫');
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 107, 157, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Lookbook
    initLookbook() {
        this.currentLookIndex = 0;
        this.lookbookData = this.getLookbookData();
        
        const thumbItems = document.querySelectorAll('.thumb-item');
        thumbItems.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.changeLookbookImage(index);
            });
        });

        // Auto-rotate lookbook
        this.startLookbookAutoRotate();
    }

    getLookbookData() {
        const thumbs = document.querySelectorAll('.thumb-item');
        return Array.from(thumbs).map(thumb => ({
            img: thumb.getAttribute('data-img'),
            title: thumb.getAttribute('data-title'),
            desc: thumb.getAttribute('data-desc')
        }));
    }

    changeLookbookImage(index) {
        if (!this.lookbookData[index]) return;

        const mainImg = document.getElementById('main-lookbook-img');
        const lookTitle = document.getElementById('look-title');
        const lookDesc = document.getElementById('look-description');
        const thumbs = document.querySelectorAll('.thumb-item');

        // Update active thumb
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        thumbs[index].classList.add('active');

        // Fade effect for main image
        mainImg.style.opacity = '0';
        
        setTimeout(() => {
            mainImg.src = this.lookbookData[index].img;
            lookTitle.textContent = this.lookbookData[index].title;
            lookDesc.textContent = this.lookbookData[index].desc;
            mainImg.style.opacity = '1';
        }, 300);

        this.currentLookIndex = index;
    }

    startLookbookAutoRotate() {
        setInterval(() => {
            this.currentLookIndex = (this.currentLookIndex + 1) % this.lookbookData.length;
            this.changeLookbookImage(this.currentLookIndex);
        }, 5000);
    }

    // Beauty Carousel
    initBeautyCarousel() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.product-slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.previousSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Auto-play carousel
        this.startCarouselAutoPlay();

        // Touch/swipe support
        this.initCarouselSwipe();
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        
        this.addSlideAnimation();
    }

    previousSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.slides[this.currentSlide].classList.add('active');
        
        this.addSlideAnimation();
    }

    addSlideAnimation() {
        const activeSlide = this.slides[this.currentSlide];
        activeSlide.style.animation = 'slideInRight 0.5s ease forwards';
        
        setTimeout(() => {
            activeSlide.style.animation = '';
        }, 500);
    }

    startCarouselAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    initCarouselSwipe() {
        const carousel = document.querySelector('.product-carousel');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });

        // Mouse events for desktop
        carousel.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            carousel.style.cursor = 'grabbing';
        });

        carousel.addEventListener('mouseup', (e) => {
            endX = e.clientX;
            this.handleSwipe(startX, endX);
            carousel.style.cursor = 'grab';
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Enhanced form interactions
        this.initFormAnimations();
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission
        this.showFormLoading();

        setTimeout(() => {
            this.hideFormLoading();
            this.showNotification('Message sent successfully! 🎉');
            form.reset();
        }, 2000);

        console.log('Form submitted:', data);
    }

    showFormLoading() {
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }
    }

    hideFormLoading() {
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = 'Send Message <div class="btn-sparkles"></div>';
            submitBtn.disabled = false;
        }
    }

    initFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            
            if (input) {
                input.addEventListener('focus', () => {
                    group.style.transform = 'translateY(-2px)';
                    group.style.boxShadow = '0 5px 15px rgba(255, 107, 157, 0.2)';
                });

                input.addEventListener('blur', () => {
                    group.style.transform = 'translateY(0)';
                    group.style.boxShadow = 'none';
                });
            }
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        this.observedElements = document.querySelectorAll('.animate-on-scroll, .collection-card, .feature-item');
        this.createScrollObserver();
    }

    createScrollObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        this.observedElements.forEach(element => {
            this.scrollObserver.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 0.8s ease';
        
        // Add specific animations based on element type
        if (element.classList.contains('collection-card')) {
            element.style.animation = 'fadeInScale 0.8s ease forwards';
        } else if (element.classList.contains('feature-item')) {
            element.style.animation = 'slideInLeft 0.8s ease forwards';
        }
    }

    // Particle System
    initParticleSystem() {
        this.createParticles();
        this.startParticleAnimation();
    }

    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        
        // Add to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(particleContainer);
        }

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            
            particleContainer.appendChild(particle);
        }
    }

    startParticleAnimation() {
        // Particles are animated via CSS
        // This method can be extended for more complex particle systems
    }

    // Scroll Indicator
    updateScrollIndicator() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        // Update any scroll progress indicators
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // Intersection Observer Setup
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    updateActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Utility Functions
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Parallax effects
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b9d, #c44569);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(255, 107, 157, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease forwards;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
}

// Add necessary CSS animations via JavaScript
const dynamicStyles = `
    <style>
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes sparkleParticle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification {
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .particle {
            animation: floatParticle 6s infinite ease-in-out;
        }
        
        @keyframes floatParticle {
            0% {
                opacity: 0;
                transform: translateY(100vh) scale(0);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(1);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);

// Initialize the template when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FashionBeautyTemplate();
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FashionBeautyTemplate;
}
