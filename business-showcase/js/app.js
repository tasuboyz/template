// ===== BUSINESS SHOWCASE APP =====

class BusinessShowcase {
    constructor() {
        this.isLoading = true;
        this.scrollY = 0;
        this.lastScrollY = 0;
        this.ticking = false;
        this.magneticElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        try {
            this.setupEventListeners();
            this.initializeComponents();
            this.handleLoading();
            this.setupScrollAnimations();
            this.setupMagneticButtons();
            this.setupCustomCursor();
            this.setupParallaxElements();
            this.setupCounterAnimations();
            this.setupTextAnimations();
            this.setupPortfolioFilters();
            this.setupContactForm();
            this.setupNavigationEffects();
        } catch (error) {
            console.error('Error initializing BusinessShowcase:', error);
            // Fallback to basic functionality
            this.initBasicFunctionality();
        }
    }

    // ===== BASIC FALLBACK =====
    initBasicFunctionality() {
        // Basic navigation functionality
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Basic scroll behavior
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.pageYOffset > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // ===== INITIALIZE COMPONENTS =====
    initializeComponents() {
        // Initialize any necessary components
        this.initializeMobileDetection();
        this.initializeReducedMotion();
        this.initializeTheme();
    }

    initializeMobileDetection() {
        this.isMobile = window.innerWidth < 768;
        this.isTouch = 'ontouchstart' in window;
    }

    initializeReducedMotion() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    initializeTheme() {
        // Initialize theme preferences if needed
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        window.addEventListener('load', () => this.handleLoaded());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Touch events for mobile
        window.addEventListener('touchstart', () => this.handleTouchStart());
        window.addEventListener('touchmove', () => this.handleTouchMove());
        
        // Performance monitoring
        this.setupPerformanceObserver();
    }

    // ===== MOUSE MOVE HANDLER =====
    handleMouseMove(e) {
        // Store mouse position for various effects
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update cursor position if custom cursor is active
        if (this.customCursor) {
            this.customCursor.mouseX = e.clientX;
            this.customCursor.mouseY = e.clientY;
        }
    }

    // ===== LOADING SCREEN =====
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const loader = loadingScreen.querySelector('.loader');
        
        // Simulate loading with progressive text changes
        const loadingTexts = [
            'Inizializzazione innovazione...',
            'Caricamento creatività...',
            'Preparazione esperienza...',
            'Quasi pronti...'
        ];
        
        let textIndex = 0;
        const loadingText = loadingScreen.querySelector('.loading-text');
        
        const textInterval = setInterval(() => {
            if (textIndex < loadingTexts.length) {
                loadingText.textContent = loadingTexts[textIndex];
                textIndex++;
            } else {
                clearInterval(textInterval);
            }
        }, 800);
        
        // Enhanced loading animation
        this.animateLoader(loader);
    }

    handleLoaded() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoading = false;
                this.startMainAnimations();
            }, 500);
        }, 2000);
    }

    animateLoader(loader) {
        const liquids = loader.querySelectorAll('.liquid');
        liquids.forEach((liquid, index) => {
            liquid.style.animationDelay = `${index * 0.2}s`;
        });
    }

    startMainAnimations() {
        this.animateHeroElements();
        this.setupScrollReveal();
        this.initializeIntersectionObserver();
    }

    // ===== SCROLL REVEAL SETUP =====
    setupScrollReveal() {
        // Initialize scroll reveal for all animated elements
        const elementsToReveal = document.querySelectorAll(
            '.service-card, .portfolio-item, .team-member, .section-header'
        );
        
        elementsToReveal.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // ===== HERO ANIMATIONS =====
    animateHeroElements() {
        try {
            const heroTitle = document.querySelector('.hero-title');
            const heroDescription = document.querySelector('.hero-description');
            const heroButtons = document.querySelector('.hero-buttons');
            const heroStats = document.querySelector('.hero-stats');
            
            // Animate title with safety check
            if (heroTitle) {
                // Check if it's the first time animating to avoid conflicts
                if (!heroTitle.classList.contains('animated')) {
                    heroTitle.classList.add('animated');
                    this.animateText(heroTitle);
                }
            }
            
            // Animate other elements with stagger
            const elements = [heroDescription, heroButtons, heroStats];
            elements.forEach((el, index) => {
                if (el) {
                    el.style.transition = 'all 0.8s ease';
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, (index + 1) * 200);
                }
            });
            
            // Start floating animations
            this.startFloatingElements();
        } catch (error) {
            console.warn('Error animating hero elements:', error);
        }
    }

    animateText(element) {
        if (!element) return;
        
        // Check if element already has title-line structure
        const titleLines = element.querySelectorAll('.title-line');
        
        if (titleLines.length > 0) {
            // Element already has the correct structure, just animate it
            titleLines.forEach((line, index) => {
                line.style.animationDelay = `${0.3 + (index * 0.2)}s`;
            });
        } else {
            // Create character-by-character animation
            const text = element.textContent;
            element.textContent = '';
            element.style.display = 'block'; // Ensure proper display
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.transition = 'all 0.5s ease';
                span.style.transitionDelay = `${index * 0.05}s`;
                span.style.display = 'inline-block';
                element.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 100);
            });
        }
    }

    startFloatingElements() {
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            this.animateFloatingElement(element, speed, index);
        });
    }

    animateFloatingElement(element, speed, index) {
        let position = Math.random() * window.innerHeight;
        
        const animate = () => {
            position -= speed;
            if (position < -100) {
                position = window.innerHeight + 100;
                element.style.left = Math.random() * 100 + '%';
            }
            
            element.style.transform = `translateY(${position}px)`;
            requestAnimationFrame(animate);
        };
        
        setTimeout(() => animate(), index * 1000);
    }

    // ===== SCROLL EFFECTS =====
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollValues();
                this.updateNavbar();
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollValues() {
        this.lastScrollY = this.scrollY;
        this.scrollY = window.pageYOffset;
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        if (this.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (this.scrollY > this.lastScrollY && this.scrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    }

    updateParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(this.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        });
    }

    initializeIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Special observers for specific elements
        this.observeCounters();
        this.observeCards();
    }

    triggerElementAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add specific animations based on element type
        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        } else if (element.classList.contains('portfolio-item')) {
            this.animatePortfolioItem(element);
        } else if (element.classList.contains('team-member')) {
            this.animateTeamMember(element);
        }
    }

    // ===== MAGNETIC BUTTONS =====
    setupMagneticButtons() {
        try {
            this.magneticElements = document.querySelectorAll('.magnetic-btn');
            
            if (this.magneticElements.length === 0) return;
            
            this.magneticElements.forEach(element => {
                if (element) {
                    element.addEventListener('mousemove', (e) => this.handleMagneticMove(e, element));
                    element.addEventListener('mouseleave', () => this.handleMagneticLeave(element));
                }
            });
        } catch (error) {
            console.warn('Error setting up magnetic buttons:', error);
        }
    }

    handleMagneticMove(e, element) {
        if (!element) return;
        
        try {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            const translateX = x * strength;
            const translateY = y * strength;
            
            element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } catch (error) {
            console.warn('Error in magnetic move:', error);
        }
    }

    handleMagneticLeave(element) {
        if (!element) return;
        
        try {
            element.style.transform = 'translate(0, 0)';
        } catch (error) {
            console.warn('Error in magnetic leave:', error);
        }
    }

    // ===== CUSTOM CURSOR =====
    setupCustomCursor() {
        try {
            if (window.innerWidth < 768 || this.isTouch) return; // Skip on mobile and touch devices
            
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);
            
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            
            const animateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                
                requestAnimationFrame(animateCursor);
            };
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            // Cursor effects on hover
            const hoverElements = document.querySelectorAll('a, button, .portfolio-item');
            hoverElements.forEach(el => {
                if (el) {
                    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
                }
            });
            
            animateCursor();
        } catch (error) {
            console.warn('Error setting up custom cursor:', error);
        }
    }

    // ===== COUNTER ANIMATIONS SETUP =====
    setupCounterAnimations() {
        // This method sets up the intersection observer for counters
        // The actual observation is handled in initializeIntersectionObserver
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counter.textContent = '0'; // Reset to 0 initially
        });
    }

    // ===== COUNTERS =====
    observeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                // Add special formatting
                if (element.textContent === '98') {
                    element.textContent += '%';
                } else if (element.textContent === '500') {
                    element.textContent += '+';
                }
            }
        };
        
        updateCounter();
    }

    // ===== CARD ANIMATIONS =====
    observeCards() {
        const cards = document.querySelectorAll('.service-card, .portfolio-item, .team-member');
        
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    animateServiceCard(card) {
        card.style.animation = 'slideInUp 0.8s ease forwards';
        
        // Animate icon
        const icon = card.querySelector('.service-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'bounceIn 0.6s ease forwards';
            }, 200);
        }
    }

    animatePortfolioItem(item) {
        item.style.animation = 'scaleIn 0.6s ease forwards';
    }

    animateTeamMember(member) {
        member.style.animation = 'fadeInUp 0.8s ease forwards';
    }

    // ===== PORTFOLIO FILTERS =====
    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                this.filterPortfolioItems(portfolioItems, filter);
            });
        });
    }

    filterPortfolioItems(items, filter) {
        items.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            setTimeout(() => {
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.animation = 'scaleIn 0.5s ease forwards';
                } else {
                    item.style.animation = 'scaleOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }, index * 50);
        });
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
        
        // Enhanced form animations
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', () => {
                group.classList.add('focused');
                this.animateFormGroup(group, true);
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                    this.animateFormGroup(group, false);
                }
            });
        });
    }

    animateFormGroup(group, focused) {
        const label = group.querySelector('label');
        const line = group.querySelector('.form-line');
        
        if (focused) {
            label.style.transform = 'translateY(-20px) scale(0.8)';
            label.style.color = 'var(--primary-light)';
            line.style.width = '100%';
        } else {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'var(--gray-400)';
            line.style.width = '0%';
        }
    }

    handleFormSubmit(form) {
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Animate submit button
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showFormSuccess(form);
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = 'Messaggio Inviato!';
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 2000);
    }

    showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <p>Messaggio inviato con successo!</p>
        `;
        
        form.appendChild(successMessage);
        successMessage.style.animation = 'slideInUp 0.5s ease forwards';
        
        setTimeout(() => {
            successMessage.style.animation = 'slideInDown 0.5s ease forwards';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);
    }

    // ===== NAVIGATION EFFECTS =====
    setupNavigationEffects() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            this.animateNavMenu(navMenu.classList.contains('active'));
        });
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
        
        // Update active link on scroll
        this.setupScrollSpy(navLinks);
    }

    animateNavMenu(isOpen) {
        const navMenu = document.getElementById('nav-menu');
        const navLinks = navMenu.querySelectorAll('.nav-link');
        
        if (isOpen) {
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80;
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

    setupScrollSpy(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // ===== TEXT ANIMATIONS =====
    setupTextAnimations() {
        const titleElements = document.querySelectorAll('.title-line');
        
        titleElements.forEach((element, index) => {
            element.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }

    // ===== PARALLAX ELEMENTS =====
    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 2}s`;
        });
    }

    // ===== RESIZE HANDLER =====
    handleResize() {
        // Recalculate positions and animations on resize
        this.updateResponsiveElements();
    }

    updateResponsiveElements() {
        // Update magnetic button positions
        this.magneticElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
        
        // Update parallax elements
        this.updateParallax();
    }

    // ===== TOUCH HANDLERS =====
    handleTouchStart() {
        // Handle touch interactions for mobile
        document.body.classList.add('touch-device');
    }

    handleTouchMove() {
        // Optimize scroll performance on touch devices
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollValues();
                this.updateNavbar();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    // ===== PERFORMANCE MONITORING =====
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation'] });
        }
    }

    // ===== UTILITY METHODS =====
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

// ===== ADDITIONAL INTERACTIVE FEATURES =====

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createParticles();
        this.setupMouseTracking();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupMouseTracking() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary collision
            if (particle.x < 0 || particle.x > this.container.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.container.offsetHeight) {
                particle.vy *= -1;
            }

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        });
    }

    drawParticles() {
        // This would typically use canvas, but for simplicity we'll use DOM elements
        // In a real implementation, you'd use canvas for better performance
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    const app = new BusinessShowcase();
    
    // Initialize particle system for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        new ParticleSystem(heroSection);
    }
    
    // Add some easter eggs
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.add('konami-mode');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BusinessShowcase;
}
