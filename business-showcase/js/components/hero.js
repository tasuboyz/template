/**
 * Hero Component - Dynamic hero section with advanced animations and interactions
 * Includes typing effects, particle animations, and interactive elements
 */

import { $, $$, animate, easings, device, emit, logger } from '../utils.js';

class HeroComponent {
    constructor() {
        this.hero = $('#home');
        this.heroTitle = $('.hero-title');
        this.heroSubtitle = $('.hero-subtitle');
        this.heroButtons = $('.hero-buttons');
        this.statsNumbers = $$('.stat-number');
        this.ctaPrimary = $('#cta-primary');
        this.ctaSecondary = $('#cta-secondary');
        this.scrollIndicator = $('.scroll-indicator');
        
        this.isVisible = false;
        this.animationsComplete = false;
        this.particleSystem = null;
        
        this.init();
    }
    
    init() {
        if (!this.hero) {
            logger.warn('Hero section not found');
            return;
        }
        
        this.setupIntersectionObserver();
        this.setupClickHandlers();
        this.setupKeyboardNavigation();
        this.setupDynamicContent();
        this.createFloatingElements();
        this.setupScrollIndicator();
        this.setupParallaxEffect();
        
        logger.info('Hero component initialized');
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationsComplete) {
                    this.startHeroAnimations();
                    this.animationsComplete = true;
                }
                this.isVisible = entry.isIntersecting;
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        });
        
        observer.observe(this.hero);
    }
    
    startHeroAnimations() {
        if (device.prefersReducedMotion()) {
            this.showElementsImmediately();
            return;
        }
        
        // Start title animation
        this.animateTitle();
        
        // Animate subtitle after title
        setTimeout(() => {
            this.animateSubtitle();
        }, 800);
        
        // Animate buttons after subtitle
        setTimeout(() => {
            this.animateButtons();
        }, 1200);
        
        // Start counter animations
        setTimeout(() => {
            this.animateCounters();
        }, 1500);
        
        // Animate floating card
        setTimeout(() => {
            this.animateFloatingCard();
        }, 1000);
    }
    
    showElementsImmediately() {
        // For users who prefer reduced motion
        if (this.heroTitle) this.heroTitle.style.opacity = '1';
        if (this.heroSubtitle) this.heroSubtitle.style.opacity = '1';
        if (this.heroButtons) this.heroButtons.style.opacity = '1';
        
        this.statsNumbers.forEach(stat => {
            const targetValue = parseInt(stat.dataset.count) || 0;
            stat.textContent = targetValue;
        });
    }
    
    animateTitle() {
        if (!this.heroTitle) return;
        
        const spans = this.heroTitle.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    animateSubtitle() {
        if (!this.heroSubtitle) return;
        
        this.heroSubtitle.style.opacity = '0';
        this.heroSubtitle.style.transform = 'translateY(30px)';
        this.heroSubtitle.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            this.heroSubtitle.style.opacity = '1';
            this.heroSubtitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateButtons() {
        if (!this.heroButtons) return;
        
        const buttons = this.heroButtons.querySelectorAll('.btn');
        
        buttons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px) scale(0.9)';
            button.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }
    
    animateCounters() {
        this.statsNumbers.forEach((stat, index) => {
            setTimeout(() => {
                this.animateCounter(stat);
            }, index * 200);
        });
    }
    
    animateCounter(element) {
        const targetValue = parseInt(element.dataset.count) || 0;
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        const duration = 2000;
        
        animate({
            from: 0,
            to: targetValue,
            duration,
            easing: easings.easeOutQuart,
            onUpdate: (value) => {
                element.textContent = prefix + Math.floor(value) + suffix;
            },
            onComplete: () => {
                element.textContent = prefix + targetValue + suffix;
                // Add a subtle scale effect on completion
                element.style.transform = 'scale(1.1)';
                element.style.transition = 'transform 0.2s ease';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }
    
    animateFloatingCard() {
        const floatingCard = $('.hero-card');
        if (!floatingCard) return;
        
        floatingCard.style.opacity = '0';
        floatingCard.style.transform = 'translateY(30px) scale(0.9)';
        floatingCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            floatingCard.style.opacity = '1';
            floatingCard.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    setupClickHandlers() {
        // Primary CTA button
        if (this.ctaPrimary) {
            this.ctaPrimary.addEventListener('click', (e) => {
                this.handlePrimaryCTA(e);
            });
        }
        
        // Secondary CTA button
        if (this.ctaSecondary) {
            this.ctaSecondary.addEventListener('click', (e) => {
                this.handleSecondaryCTA(e);
            });
        }
        
        // Add ripple effect to buttons
        this.addRippleEffect();
    }
    
    handlePrimaryCTA(e) {
        e.preventDefault();
        
        // Add button press animation
        this.animateButtonPress(this.ctaPrimary);
        
        // Scroll to services section or trigger action
        const servicesSection = $('#servizi');
        if (servicesSection) {
            this.scrollToSection(servicesSection);
        }
        
        // Emit custom event
        emit(this.hero, 'cta-primary-click', {
            action: 'scroll-to-services',
            button: this.ctaPrimary
        });
        
        // Track analytics (if needed)
        this.trackButtonClick('primary-cta');
    }
    
    handleSecondaryCTA(e) {
        e.preventDefault();
        
        // Add button press animation
        this.animateButtonPress(this.ctaSecondary);
        
        // Open demo modal or video
        this.openDemoModal();
        
        // Emit custom event
        emit(this.hero, 'cta-secondary-click', {
            action: 'open-demo',
            button: this.ctaSecondary
        });
        
        // Track analytics
        this.trackButtonClick('secondary-cta');
    }
    
    animateButtonPress(button) {
        if (device.prefersReducedMotion()) return;
        
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }
    
    addRippleEffect() {
        const buttons = this.heroButtons?.querySelectorAll('.btn') || [];
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (device.prefersReducedMotion()) return;
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    setupKeyboardNavigation() {
        const buttons = this.heroButtons?.querySelectorAll('.btn') || [];
        
        buttons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
    
    setupDynamicContent() {
        // Dynamic typing effect for title
        this.createTypingEffect();
        
        // Dynamic background particles
        this.createParticleSystem();
        
        // Update time-based content
        this.updateTimeBasedContent();
    }
    
    createTypingEffect() {
        const typewriterElement = $('.typewriter-text');
        if (!typewriterElement) return;
        
        const texts = [
            'Innovazione per il tuo Business',
            'Soluzioni Digitali Avanzate',
            'Tecnologie All\'avanguardia',
            'Il Futuro è Oggi'
        ];
        
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;
        
        const type = () => {
            if (device.prefersReducedMotion()) {
                typewriterElement.textContent = texts[0];
                return;
            }
            
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeedCurrent = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && currentCharIndex === currentText.length) {
                typeSpeedCurrent = pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typeSpeedCurrent = 500;
            }
            
            setTimeout(type, typeSpeedCurrent);
        };
        
        type();
    }
    
    createParticleSystem() {
        if (device.prefersReducedMotion() || device.isMobile()) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'hero-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        
        this.hero.appendChild(particleContainer);
        
        // Create floating particles
        for (let i = 0; i < 15; i++) {
            this.createParticle(particleContainer);
        }
        
        this.particleSystem = particleContainer;
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    createFloatingElements() {
        if (device.prefersReducedMotion() || device.isMobile()) return;
        
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        floatingContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 2;
        `;
        
        this.hero.appendChild(floatingContainer);
        
        // Create different types of floating elements
        this.createFloatingIcons(floatingContainer);
        this.createFloatingShapes(floatingContainer);
        this.createFloatingGradients(floatingContainer);
        
        // Store reference for cleanup
        this.floatingContainer = floatingContainer;
    }
    
    createFloatingIcons(container) {
        const icons = [
            'fas fa-rocket',
            'fas fa-lightbulb',
            'fas fa-chart-line',
            'fas fa-cog',
            'fas fa-star',
            'fas fa-bolt',
            'fas fa-gem',
            'fas fa-magic'
        ];
        
        for (let i = 0; i < 6; i++) {
            const iconElement = document.createElement('div');
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const size = Math.random() * 30 + 20;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const startX = Math.random() * 100;
            const endX = startX + (Math.random() * 40 - 20);
            
            iconElement.innerHTML = `<i class="${icon}"></i>`;
            iconElement.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                color: var(--primary-color);
                opacity: 0.3;
                left: ${startX}%;
                top: 100%;
                animation: floatUpIcon ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                --end-x: ${endX}%;
            `;
            
            container.appendChild(iconElement);
        }
    }
    
    createFloatingShapes(container) {
        const shapes = ['circle', 'square', 'triangle', 'hexagon'];
        
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 40 + 15;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 8;
            const rotation = Math.random() * 360;
            
            shape.className = `floating-shape floating-${shapeType}`;
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: ${Math.random() * 0.4 + 0.1};
                transform: rotate(${rotation}deg);
                animation: floatUpShape ${duration}s linear infinite;
                animation-delay: ${delay}s;
            `;
            
            // Apply shape-specific styles
            switch (shapeType) {
                case 'circle':
                    shape.style.borderRadius = '50%';
                    shape.style.background = 'var(--accent-color)';
                    break;
                case 'square':
                    shape.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                    break;
                case 'triangle':
                    shape.style.width = '0';
                    shape.style.height = '0';
                    shape.style.borderLeft = `${size/2}px solid transparent`;
                    shape.style.borderRight = `${size/2}px solid transparent`;
                    shape.style.borderBottom = `${size}px solid var(--accent-color)`;
                    shape.style.background = 'none';
                    break;
                case 'hexagon':
                    shape.style.background = 'var(--primary-color)';
                    shape.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
                    break;
            }
            
            container.appendChild(shape);
        }
    }
    
    createFloatingGradients(container) {
        for (let i = 0; i < 4; i++) {
            const gradient = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const duration = Math.random() * 25 + 20;
            const delay = Math.random() * 10;
            const hue = Math.random() * 360;
            
            gradient.className = 'floating-gradient';
            gradient.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: 110%;
                border-radius: 50%;
                background: radial-gradient(circle, hsla(${hue}, 70%, 60%, 0.3) 0%, transparent 70%);
                filter: blur(2px);
                animation: floatUpGradient ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(gradient);
        }
    }
    
    setupScrollIndicator() {
        if (!this.scrollIndicator) return;
        
        this.scrollIndicator.addEventListener('click', () => {
            const nextSection = this.hero.nextElementSibling;
            if (nextSection) {
                this.scrollToSection(nextSection);
            }
        });
        
        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5));
            this.scrollIndicator.style.opacity = opacity;
        }, { passive: true });
    }
    
    setupParallaxEffect() {
        if (device.prefersReducedMotion() || device.isMobile()) return;
        
        const parallaxElements = this.hero.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            const heroHeight = this.hero.offsetHeight;
            const heroProgress = Math.min(scrollY / heroHeight, 1);
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    updateTimeBasedContent() {
        const now = new Date();
        const hour = now.getHours();
        
        let greeting = 'Benvenuto';
        if (hour < 12) {
            greeting = 'Buongiorno';
        } else if (hour < 18) {
            greeting = 'Buon pomeriggio';
        } else {
            greeting = 'Buonasera';
        }
        
        const greetingElement = $('.dynamic-greeting');
        if (greetingElement) {
            greetingElement.textContent = greeting;
        }
    }
    
    scrollToSection(targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    openDemoModal() {
        // Create demo modal
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Chiudi demo">&times;</button>
                    <h2>Demo Interattiva</h2>
                    <div class="demo-video">
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>Video Demo</p>
                            <p>Scopri le nostre soluzioni in azione</p>
                        </div>
                    </div>
                    <div class="demo-actions">
                        <button class="btn btn-primary">Richiedi Demo Personalizzata</button>
                        <button class="btn btn-outline">Scarica Brochure</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal in
        const overlay = modal.querySelector('.modal-overlay');
        const content = modal.querySelector('.modal-content');
        
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        content.style.cssText = `
            background: var(--card-bg);
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9) translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        
        // Trigger animations
        setTimeout(() => {
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
        }, 10);
        
        // Close modal handlers
        const closeModal = () => {
            overlay.style.opacity = '0';
            content.style.transform = 'scale(0.9) translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    trackButtonClick(buttonType) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Hero CTA',
                event_label: buttonType,
                page_location: window.location.href
            });
        }
        
        logger.info(`Hero CTA clicked: ${buttonType}`);
    }
    
    // ===== PUBLIC API =====
    
    updateHeroContent(content) {
        if (content.title && this.heroTitle) {
            this.heroTitle.innerHTML = content.title;
        }
        
        if (content.subtitle && this.heroSubtitle) {
            this.heroSubtitle.textContent = content.subtitle;
        }
        
        if (content.primaryButton && this.ctaPrimary) {
            this.ctaPrimary.innerHTML = content.primaryButton;
        }
        
        if (content.secondaryButton && this.ctaSecondary) {
            this.ctaSecondary.innerHTML = content.secondaryButton;
        }
    }
    
    updateStats(stats) {
        stats.forEach((stat, index) => {
            const statElement = this.statsNumbers[index];
            if (statElement) {
                statElement.dataset.count = stat.value;
                statElement.dataset.suffix = stat.suffix || '';
                statElement.dataset.prefix = stat.prefix || '';
                
                // Re-animate counter
                this.animateCounter(statElement);
            }
        });
    }
    
    triggerAnimation() {
        this.animationsComplete = false;
        this.startHeroAnimations();
    }
    
    destroy() {
        // Clean up particle system
        if (this.particleSystem) {
            this.particleSystem.remove();
        }
        
        // Clean up floating elements
        if (this.floatingContainer) {
            this.floatingContainer.remove();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.updateParallax);
        
        logger.info('Hero component destroyed');
    }
}

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
    
    @keyframes floatUpIcon {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(var(--end-x, 0%)) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUpShape {
        0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
            transform: translateY(-10vh) scale(1) rotate(90deg);
        }
        50% {
            transform: translateY(-50vh) scale(1.2) rotate(180deg);
        }
        90% {
            opacity: 0.8;
            transform: translateY(-90vh) scale(0.8) rotate(270deg);
        }
        100% {
            transform: translateY(-110vh) scale(0.3) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUpGradient {
        0% {
            transform: translateY(0) scale(0.3);
            opacity: 0;
        }
        20% {
            opacity: 0.6;
            transform: translateY(-20vh) scale(0.8);
        }
        50% {
            transform: translateY(-50vh) scale(1.2);
        }
        80% {
            opacity: 0.4;
            transform: translateY(-80vh) scale(1);
        }
        100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-elements {
        animation: none !important;
    }
    
    .floating-shape {
        will-change: transform, opacity;
    }
    
    .floating-gradient {
        will-change: transform, opacity;
    }
`;

document.head.appendChild(style);

// Create and export singleton instance
export const heroComponent = new HeroComponent();

export default heroComponent;
