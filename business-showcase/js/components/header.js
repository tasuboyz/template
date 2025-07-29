/**
 * Header Component - Responsive navigation with smooth scrolling and theme toggle
 * Advanced header functionality with scroll effects and mobile optimization
 */

import { $, $$, throttle, scrollTo, device, emit, logger } from '../utils.js';

class HeaderComponent {
    constructor() {
        this.header = $('#header');
        this.navbar = $('.navbar');
        this.navMenu = $('#nav-menu');
        this.navToggle = $('#nav-toggle');
        this.navLinks = $$('.nav-link');
        this.themeToggle = $('#theme-toggle');
        
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        if (!this.header) {
            logger.warn('Header element not found');
            return;
        }
        
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupAccessibility();
        
        logger.info('Header component initialized');
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Keyboard support for menu toggle
            this.navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu();
                }
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', throttle(() => {
            this.handleResize();
        }, 250));
        
        // Theme toggle animation
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.animateThemeToggle();
            });
        }
    }
    
    setupScrollEffects() {
        const handleScroll = throttle(() => {
            this.updateHeaderOnScroll();
        }, 16); // 60fps
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    updateHeaderOnScroll() {
        const currentScrollY = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScrollY > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (this.shouldHideOnScroll()) {
            if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
                this.hideHeader();
            } else if (currentScrollY < this.lastScrollY) {
                this.showHeader();
            }
        }
        
        this.lastScrollY = currentScrollY;
        
        // Update active navigation
        this.updateActiveNavigation();
    }
    
    shouldHideOnScroll() {
        // Only hide on mobile or when explicitly enabled
        return device.isMobile() || this.header.dataset.hideOnScroll === 'true';
    }
    
    hideHeader() {
        this.header.style.transform = 'translateY(-100%)';
        this.header.classList.add('header-hidden');
    }
    
    showHeader() {
        this.header.style.transform = 'translateY(0)';
        this.header.classList.remove('header-hidden');
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = $(`#${targetId}`);
                    
                    if (targetElement) {
                        this.scrollToSection(targetElement, link);
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }
    
    scrollToSection(targetElement, clickedLink) {
        // Calculate offset for fixed header
        const headerHeight = this.header.offsetHeight;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px extra padding
        
        // Smooth scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update active state immediately
        this.setActiveLink(clickedLink);
        
        // Emit navigation event
        emit(document, 'navigation', {
            target: targetElement.id,
            link: clickedLink
        });
        
        // Update URL hash (optional)
        if (history.pushState) {
            history.pushState(null, null, `#${targetElement.id}`);
        }
    }
    
    setupActiveNavigation() {
        // Set initial active state
        this.updateActiveNavigation();
        
        // Handle initial hash in URL
        if (window.location.hash) {
            const targetElement = $(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    this.scrollToSection(targetElement, this.getNavLinkByHref(window.location.hash));
                }, 100);
            }
        }
    }
    
    updateActiveNavigation() {
        const sections = $$('section[id]');
        const scrollPosition = window.pageYOffset + this.header.offsetHeight + 50;
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });
        
        if (activeSection) {
            const activeLink = this.getNavLinkByHref(`#${activeSection.id}`);
            this.setActiveLink(activeLink);
        }
    }
    
    getNavLinkByHref(href) {
        return this.navLinks.find(link => link.getAttribute('href') === href);
    }
    
    setActiveLink(activeLink) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        this.navToggle.setAttribute('aria-expanded', 'true');
        
        // Animate menu items
        this.animateMenuItems('in');
        
        // Focus first menu item for accessibility
        const firstLink = this.navMenu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
        
        // Prevent body scroll on mobile
        if (device.isMobile()) {
            document.body.style.overflow = 'hidden';
        }
        
        emit(this.header, 'menuopen');
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        
        // Animate menu items
        this.animateMenuItems('out');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        emit(this.header, 'menuclose');
    }
    
    animateMenuItems(direction) {
        if (device.prefersReducedMotion()) return;
        
        const menuItems = this.navMenu.querySelectorAll('.nav-link');
        
        menuItems.forEach((item, index) => {
            const delay = index * 50;
            
            if (direction === 'in') {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                item.style.transition = `all 0.3s ease ${delay}ms`;
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.transition = `all 0.2s ease ${(menuItems.length - index) * 30}ms`;
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
            }
        });
    }
    
    animateThemeToggle() {
        if (device.prefersReducedMotion()) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                icon.style.transform = '';
            }, 500);
        }
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Reset any styles that might have been set for mobile
        if (window.innerWidth > 768) {
            this.navMenu.style.removeProperty('transform');
            document.body.style.overflow = '';
        }
    }
    
    setupAccessibility() {
        // Set initial ARIA attributes
        if (this.navToggle) {
            this.navToggle.setAttribute('aria-expanded', 'false');
            this.navToggle.setAttribute('aria-controls', 'nav-menu');
            this.navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        }
        
        // Add role attributes
        if (this.navMenu) {
            this.navMenu.setAttribute('role', 'navigation');
            this.navMenu.setAttribute('aria-label', 'Main navigation');
        }
        
        // Skip to content link (for screen readers)
        this.createSkipLink();
    }
    
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // ===== PUBLIC API =====
    
    addNavItem(text, href, position = 'end') {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = href;
        a.textContent = text;
        a.className = 'nav-link';
        
        li.appendChild(a);
        
        if (position === 'start') {
            this.navMenu.insertBefore(li, this.navMenu.firstChild);
        } else {
            this.navMenu.appendChild(li);
        }
        
        // Re-initialize nav links array
        this.navLinks = $$('.nav-link');
        this.setupSmoothScrolling();
        
        return li;
    }
    
    removeNavItem(href) {
        const link = this.getNavLinkByHref(href);
        if (link && link.parentElement) {
            link.parentElement.remove();
            this.navLinks = $$('.nav-link');
        }
    }
    
    setLogo(text, href = '#') {
        const logo = $('.logo');
        if (logo) {
            logo.textContent = text;
            if (logo.tagName === 'A') {
                logo.href = href;
            }
        }
    }
    
    addHeaderAction(element) {
        const navActions = $('.nav-actions');
        if (navActions) {
            navActions.insertBefore(element, this.navToggle);
        }
    }
    
    // Progress bar for scroll
    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        const updateProgress = throttle(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, 16);
        
        window.addEventListener('scroll', updateProgress, { passive: true });
        
        return progressBar;
    }
    
    // Destroy method for cleanup
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.updateHeaderOnScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('click', this.closeMobileMenu);
        document.removeEventListener('keydown', this.closeMobileMenu);
        
        // Close mobile menu if open
        this.closeMobileMenu();
        
        logger.info('Header component destroyed');
    }
}

// Create and export singleton instance
export const headerComponent = new HeaderComponent();

export default headerComponent;
