// ===== NAVIGATION WITH SMOOTH ANIMATIONS =====
export class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.menuToggle = document.getElementById('menu-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }

    async init() {
        if (!this.navbar) return;
        
        this.setupEventListeners();
        this.setupScrollBehavior();
        this.setupSmoothScrolling();
        
        console.log('🧭 Navigation initialized');
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.navigateToSection(target);
                
                // Close mobile menu if open
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });

            // Hover effects
            this.addLinkHoverEffects(link);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    setupScrollBehavior() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupSmoothScrolling() {
        // Update active link based on scroll position
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.updateActiveLink(id);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-20% 0px -20% 0px'
            }
        );

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));
    }

    addLinkHoverEffects(link) {
        link.addEventListener('mouseenter', () => {
            // Create hover particles
            this.createHoverParticles(link);
        });
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 5;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                opacity: 1;
                transform: scale(0);
                animation: particleExplosion 0.6s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        // Toggle menu classes
        this.navMenu.classList.toggle('mobile-open');
        this.menuToggle.classList.toggle('menu-active');
        
        // Animate hamburger lines
        this.animateHamburger();
        
        // Animate menu items
        if (this.isMenuOpen) {
            this.animateMenuOpen();
        } else {
            this.animateMenuClose();
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    animateHamburger() {
        const lines = this.menuToggle.querySelectorAll('.hamburger-line');
        
        if (this.isMenuOpen) {
            gsap.to(lines[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(lines[1], { opacity: 0, duration: 0.3 });
            gsap.to(lines[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(lines[1], { opacity: 1, duration: 0.3 });
            gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    }

    animateMenuOpen() {
        // Slide menu in
        gsap.fromTo(this.navMenu, 
            { x: '100%' },
            { x: '0%', duration: 0.3, ease: 'power2.out' }
        );

        // Stagger animate nav links
        gsap.fromTo(this.navLinks,
            { opacity: 0, x: 50 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.3, 
                stagger: 0.1, 
                delay: 0.1,
                ease: 'power2.out' 
            }
        );
    }

    animateMenuClose() {
        // Slide menu out
        gsap.to(this.navMenu, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in'
        });
    }

    navigateToSection(target) {
        const element = document.querySelector(target);
        if (!element) return;

        // Calculate offset for fixed header
        const headerHeight = this.navbar.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        // Smooth scroll with easing
        gsap.to(window, {
            scrollTo: { y: elementPosition, autoKill: true },
            duration: 1,
            ease: 'power2.inOut'
        });

        // Add visual feedback
        this.createNavigationFeedback(target);
    }

    createNavigationFeedback(target) {
        // Create a ripple effect from the clicked link
        const activeLink = document.querySelector(`[href="${target}"]`);
        if (!activeLink) return;

        const rect = activeLink.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            z-index: 1000;
            opacity: 0.7;
        `;

        document.body.appendChild(ripple);

        gsap.to(ripple, {
            scale: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
    }

    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1); // Remove #
            
            if (href === activeId) {
                link.classList.add('active');
                // Add glow effect
                link.style.textShadow = '0 0 10px var(--primary-color)';
            } else {
                link.classList.remove('active');
                link.style.textShadow = '';
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
            // Scrolling down - hide navbar
            gsap.to(this.navbar, {
                y: -this.navbar.offsetHeight,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            // Scrolling up - show navbar
            gsap.to(this.navbar, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        this.lastScrollY = currentScrollY;
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    destroy() {
        // Cleanup event listeners
        if (this.menuToggle) {
            this.menuToggle.removeEventListener('click', this.toggleMobileMenu);
        }

        this.navLinks.forEach(link => {
            link.removeEventListener('click', this.navigateToSection);
        });

        document.removeEventListener('click', this.handleOutsideClick);
        document.removeEventListener('keydown', this.handleEscapeKey);
        window.removeEventListener('scroll', this.handleScroll);

        // Kill GSAP animations
        gsap.killTweensOf([this.navbar, this.navMenu, this.navLinks]);
    }
}

// CSS for navigation animations
const navigationStyles = `
    @keyframes particleExplosion {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.7;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: var(--header-height);
            right: 0;
            width: 100%;
            height: calc(100vh - var(--header-height));
            background: rgba(15, 15, 15, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: var(--spacing-2xl);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }

        .nav-menu.mobile-open {
            transform: translateX(0);
        }

        .menu-toggle {
            display: flex !important;
        }

        .hamburger-line {
            transform-origin: center;
        }
    }

    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = navigationStyles;
document.head.appendChild(styleSheet);
