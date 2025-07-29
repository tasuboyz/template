/**
 * Animation Engine - Advanced animation system with WOW effects
 * Intersection Observer, GSAP-like animations, and performance optimizations
 */

import { $, $$, observeElements, device, easings, animate, math, logger } from './utils.js';

class AnimationEngine {
    constructor() {
        this.animatedElements = new WeakSet();
        this.observers = new Map();
        this.counters = new Map();
        this.particleSystems = new Map();
        this.isInitialized = false;
        
        this.defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px',
            triggerOnce: true,
            duration: 800,
            delay: 0,
            easing: 'easeOutQuad'
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Check for reduced motion preference
        if (device.prefersReducedMotion()) {
            logger.info('Reduced motion preferred - animations will be minimal');
            this.respectReducedMotion = true;
        }
        
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupParallaxEffects();
        this.setupTextAnimations();
        this.setupLoadingAnimations();
        this.createParticleSystem();
        
        this.isInitialized = true;
        logger.info('Animation Engine initialized');
    }
    
    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        // Fade in animations
        this.observeScrollElements('.fade-in', (element) => {
            this.fadeIn(element);
        });
        
        this.observeScrollElements('.fade-in-up', (element) => {
            this.fadeInUp(element);
        });
        
        this.observeScrollElements('.fade-in-down', (element) => {
            this.fadeInDown(element);
        });
        
        this.observeScrollElements('.fade-in-left', (element) => {
            this.fadeInLeft(element);
        });
        
        this.observeScrollElements('.fade-in-right', (element) => {
            this.fadeInRight(element);
        });
        
        // Scale animations
        this.observeScrollElements('.scale-in', (element) => {
            this.scaleIn(element);
        });
        
        this.observeScrollElements('.scale-in-bounce', (element) => {
            this.scaleInBounce(element);
        });
        
        // Rotation animations
        this.observeScrollElements('.rotate-in', (element) => {
            this.rotateIn(element);
        });
        
        // Flip animations
        this.observeScrollElements('.flip-in-x', (element) => {
            this.flipInX(element);
        });
        
        this.observeScrollElements('.flip-in-y', (element) => {
            this.flipInY(element);
        });
        
        // Stagger animations
        this.observeScrollElements('.stagger-container', (container) => {
            this.staggerChildren(container);
        });
    }
    
    observeScrollElements(selector, callback) {
        const elements = $$(selector);
        if (elements.length === 0) return;
        
        const observer = observeElements(elements, (element) => {
            if (this.animatedElements.has(element)) return;
            
            this.animatedElements.add(element);
            callback(element);
        }, {
            threshold: this.defaultOptions.threshold,
            rootMargin: this.defaultOptions.rootMargin
        });
        
        this.observers.set(selector, observer);
    }
    
    // ===== ANIMATION METHODS =====
    fadeIn(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transition = `opacity ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, config.delay);
    }
    
    fadeInUp(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, config.delay);
    }
    
    fadeInDown(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, config.delay);
    }
    
    fadeInLeft(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, config.delay);
    }
    
    fadeInRight(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, config.delay);
    }
    
    scaleIn(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, config.delay);
    }
    
    scaleInBounce(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        element.style.transition = `all ${config.duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, config.delay);
    }
    
    rotateIn(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        }, config.delay);
    }
    
    flipInX(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateX(0deg)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateX(-90deg)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateX(0deg)';
        }, config.delay);
    }
    
    flipInY(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateY(0deg)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateY(-90deg)';
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateY(0deg)';
        }, config.delay);
    }
    
    staggerChildren(container, options = {}) {
        const config = { 
            ...this.defaultOptions, 
            staggerDelay: 100,
            ...options 
        };
        
        const children = Array.from(container.children);
        
        children.forEach((child, index) => {
            const delay = config.delay + (index * config.staggerDelay);
            child.classList.add('stagger-item');
            
            setTimeout(() => {
                this.fadeInUp(child, { ...config, delay: 0 });
            }, delay);
        });
    }
    
    // ===== COUNTER ANIMATIONS =====
    setupCounterAnimations() {
        this.observeScrollElements('[data-count]', (element) => {
            this.animateCounter(element);
        });
    }
    
    animateCounter(element, options = {}) {
        const targetValue = parseInt(element.dataset.count) || 0;
        const duration = options.duration || 2000;
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        
        if (this.counters.has(element)) return;
        this.counters.set(element, true);
        
        animate({
            from: 0,
            to: targetValue,
            duration,
            easing: easings.easeOutQuad,
            onUpdate: (value) => {
                element.textContent = prefix + Math.floor(value) + suffix;
            },
            onComplete: () => {
                element.textContent = prefix + targetValue + suffix;
            }
        });
    }
    
    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxElements = $$('[data-parallax]');
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                if (this.respectReducedMotion) return;
                
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
    
    // ===== TEXT ANIMATIONS =====
    setupTextAnimations() {
        this.observeScrollElements('.text-reveal', (element) => {
            this.revealText(element);
        });
        
        this.observeScrollElements('.typewriter', (element) => {
            this.typewriterEffect(element);
        });
    }
    
    revealText(element, options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        if (this.respectReducedMotion) {
            element.style.opacity = '1';
            return;
        }
        
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all ${config.duration}ms ${config.easing}`;
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, config.delay + (index * 50));
        });
    }
    
    typewriterEffect(element, options = {}) {
        const config = {
            speed: 50,
            cursor: true,
            ...options
        };
        
        if (this.respectReducedMotion) {
            return;
        }
        
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const cursor = config.cursor ? '<span class="cursor">|</span>' : '';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML = text.slice(0, i + 1) + cursor;
                i++;
                setTimeout(type, config.speed);
            } else if (config.cursor) {
                element.innerHTML = text + cursor;
            }
        };
        
        type();
    }
    
    // ===== LOADING ANIMATIONS =====
    setupLoadingAnimations() {
        const loadingScreen = $('#loading-screen');
        if (loadingScreen) {
            this.hideLoadingScreen(loadingScreen);
        }
    }
    
    hideLoadingScreen(loadingScreen, delay = 1500) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, delay);
    }
    
    // ===== PARTICLE SYSTEM =====
    createParticleSystem() {
        const heroSection = $('#home');
        if (!heroSection || this.respectReducedMotion) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        heroSection.appendChild(particleContainer);
        
        this.createParticles(particleContainer, 20);
    }
    
    createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.cssText = `
                position: absolute;
                width: ${math.randomBetween(2, 6)}px;
                height: ${math.randomBetween(2, 6)}px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: ${math.randomBetween(0.3, 0.8)};
                left: ${math.randomBetween(0, 100)}%;
                animation-duration: ${math.randomBetween(3, 8)}s;
                animation-delay: ${math.randomBetween(0, 5)}s;
            `;
            
            container.appendChild(particle);
        }
    }
    
    // ===== CUSTOM ANIMATIONS =====
    createCustomAnimation(element, keyframes, options = {}) {
        const config = {
            duration: 1000,
            easing: 'ease',
            fill: 'forwards',
            ...options
        };
        
        if (this.respectReducedMotion) {
            // Apply final state immediately
            const finalKeyframe = keyframes[keyframes.length - 1];
            Object.assign(element.style, finalKeyframe);
            return;
        }
        
        if (element.animate) {
            return element.animate(keyframes, config);
        } else {
            // Fallback for older browsers
            const finalKeyframe = keyframes[keyframes.length - 1];
            element.style.transition = `all ${config.duration}ms ${config.easing}`;
            Object.assign(element.style, finalKeyframe);
        }
    }
    
    // ===== MORPH ANIMATIONS =====
    morphElement(element, fromPath, toPath, options = {}) {
        const config = {
            duration: 1000,
            easing: 'easeInOutQuad',
            ...options
        };
        
        if (!element.tagName === 'path' || this.respectReducedMotion) return;
        
        animate({
            from: 0,
            to: 1,
            duration: config.duration,
            easing: easings[config.easing] || easings.easeInOutQuad,
            onUpdate: (progress) => {
                // This would require a more complex path interpolation
                // For now, just switch at 50%
                if (progress > 0.5 && element.getAttribute('d') !== toPath) {
                    element.setAttribute('d', toPath);
                }
            }
        });
    }
    
    // ===== HOVER ANIMATIONS =====
    addHoverAnimations() {
        const hoverElements = $$('[data-hover-animation]');
        
        hoverElements.forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, animationType, 'in');
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, animationType, 'out');
            });
        });
    }
    
    triggerHoverAnimation(element, type, direction) {
        if (this.respectReducedMotion) return;
        
        switch (type) {
            case 'lift':
                element.style.transform = direction === 'in' ? 'translateY(-5px)' : 'translateY(0)';
                break;
            case 'scale':
                element.style.transform = direction === 'in' ? 'scale(1.05)' : 'scale(1)';
                break;
            case 'rotate':
                element.style.transform = direction === 'in' ? 'rotate(5deg)' : 'rotate(0deg)';
                break;
        }
    }
    
    // ===== PERFORMANCE MONITORING =====
    measureAnimationPerformance(name, fn) {
        const start = performance.now();
        
        fn();
        
        const end = performance.now();
        const duration = end - start;
        
        if (duration > 16) { // More than one frame at 60fps
            logger.warn(`Animation "${name}" took ${duration.toFixed(2)}ms (> 16ms)`);
        } else {
            logger.debug(`Animation "${name}" took ${duration.toFixed(2)}ms`);
        }
    }
    
    // ===== CLEANUP =====
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.counters.clear();
        this.particleSystems.clear();
        
        // Remove event listeners
        window.removeEventListener('scroll', this.requestParallaxUpdate);
        
        logger.info('Animation Engine destroyed');
    }
    
    // ===== PUBLIC API =====
    addAnimation(selector, animationFn, options = {}) {
        this.observeScrollElements(selector, (element) => {
            animationFn(element, options);
        });
    }
    
    removeAnimation(selector) {
        if (this.observers.has(selector)) {
            this.observers.get(selector).disconnect();
            this.observers.delete(selector);
        }
    }
    
    pauseAllAnimations() {
        const style = document.createElement('style');
        style.id = 'pause-animations';
        style.textContent = `
            *, *::before, *::after {
                animation-play-state: paused !important;
                transition-duration: 0s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    resumeAllAnimations() {
        const pauseStyle = $('#pause-animations');
        if (pauseStyle) {
            pauseStyle.remove();
        }
    }
}

// Create and export singleton instance
export const animationEngine = new AnimationEngine();

// Export individual animation functions for direct use
export {
    AnimationEngine
};

export default animationEngine;
