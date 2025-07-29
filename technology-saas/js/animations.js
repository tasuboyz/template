// Animazioni Avanzate per TechFlow
class AdvancedAnimations {
    constructor() {
        this.initializeAdvancedEffects();
    }

    initializeAdvancedEffects() {
        this.setupIntersectionObserver();
        this.initializeScrollEffects();
        this.setupParallaxEffects();
        this.initializeMorphingShapes();
        this.setupHoverEffects();
        this.initializeLoadingAnimations();
        this.setupTextAnimations();
        this.initializeBackgroundEffects();
    }

    // Intersection Observer per animazioni trigger
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.25, 0.5, 0.75],
            rootMargin: '-50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // Osserva tutti gli elementi con attributi di animazione
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }

    triggerElementAnimation(element, ratio) {
        const animationType = element.getAttribute('data-animate');
        const delay = parseInt(element.getAttribute('data-delay')) || 0;

        setTimeout(() => {
            switch (animationType) {
                case 'slide-up':
                    this.slideUpAnimation(element);
                    break;
                case 'fade-scale':
                    this.fadeScaleAnimation(element);
                    break;
                case 'bounce-in':
                    this.bounceInAnimation(element);
                    break;
                case 'rotate-in':
                    this.rotateInAnimation(element);
                    break;
                case 'flip':
                    this.flipAnimation(element);
                    break;
                case 'wave':
                    this.waveAnimation(element);
                    break;
                default:
                    this.defaultFadeIn(element);
            }
        }, delay);
    }

    // Animazioni specifiche
    slideUpAnimation(element) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    fadeScaleAnimation(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    bounceInAnimation(element) {
        element.style.transform = 'scale(0.3)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    rotateInAnimation(element) {
        element.style.transform = 'rotate(-180deg) scale(0.5)';
        element.style.opacity = '0';
        element.style.transition = 'all 1s ease-out';
        
        requestAnimationFrame(() => {
            element.style.transform = 'rotate(0deg) scale(1)';
            element.style.opacity = '1';
        });
    }

    flipAnimation(element) {
        element.style.transform = 'perspective(400px) rotateY(90deg)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.transform = 'perspective(400px) rotateY(0deg)';
            element.style.opacity = '1';
        });
    }

    waveAnimation(element) {
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            child.style.transform = 'translateY(20px)';
            child.style.opacity = '0';
            child.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            
            requestAnimationFrame(() => {
                child.style.transform = 'translateY(0)';
                child.style.opacity = '1';
            });
        });
    }

    defaultFadeIn(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    // Effetti Scroll
    initializeScrollEffects() {
        window.addEventListener('scroll', this.handleScrollEffects.bind(this));
        this.handleScrollEffects(); // Initial call
    }

    handleScrollEffects() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Parallax per hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const speed = scrollY * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }

        // Floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Scale effect on scroll
        const scaleElements = document.querySelectorAll('.scale-on-scroll');
        scaleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < windowHeight && rect.bottom > 0;
            
            if (inView) {
                const scale = 1 + (windowHeight - rect.top) / windowHeight * 0.1;
                element.style.transform = `scale(${Math.min(scale, 1.1)})`;
            }
        });

        // Opacity fade on scroll
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const opacity = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            element.style.opacity = opacity;
        });
    }

    // Effetti Parallax
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rect = element.getBoundingClientRect();
                const inView = rect.bottom >= 0 && rect.top <= window.innerHeight;
                
                if (inView) {
                    const yPos = scrolled * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }

    // Forme Morphing
    initializeMorphingShapes() {
        this.createMorphingBlobs();
        this.animateMorphingShapes();
    }

    createMorphingBlobs() {
        const blobContainer = document.createElement('div');
        blobContainer.className = 'morphing-blobs';
        blobContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.className = `blob blob-${i + 1}`;
            blob.style.cssText = `
                position: absolute;
                width: ${200 + i * 100}px;
                height: ${200 + i * 100}px;
                border-radius: 50%;
                opacity: 0.1;
                background: linear-gradient(45deg, #667eea, #764ba2);
                filter: blur(40px);
                animation: morphBlob${i + 1} ${20 + i * 5}s ease-in-out infinite;
            `;
            blobContainer.appendChild(blob);
        }

        document.body.appendChild(blobContainer);
    }

    animateMorphingShapes() {
        // CSS Keyframes per i blob morphing
        const style = document.createElement('style');
        style.textContent = `
            @keyframes morphBlob1 {
                0%, 100% { 
                    transform: translate(0, 0) scale(1) rotate(0deg);
                    border-radius: 50% 50% 50% 50%;
                }
                25% { 
                    transform: translate(100px, -50px) scale(1.2) rotate(90deg);
                    border-radius: 60% 40% 30% 70%;
                }
                50% { 
                    transform: translate(-50px, 100px) scale(0.8) rotate(180deg);
                    border-radius: 30% 60% 70% 40%;
                }
                75% { 
                    transform: translate(-100px, -100px) scale(1.1) rotate(270deg);
                    border-radius: 40% 30% 60% 50%;
                }
            }
            
            @keyframes morphBlob2 {
                0%, 100% { 
                    transform: translate(50vw, 20vh) scale(1) rotate(0deg);
                    border-radius: 40% 60% 30% 70%;
                }
                25% { 
                    transform: translate(80vw, 60vh) scale(1.3) rotate(90deg);
                    border-radius: 70% 30% 60% 40%;
                }
                50% { 
                    transform: translate(20vw, 80vh) scale(0.9) rotate(180deg);
                    border-radius: 50% 50% 50% 50%;
                }
                75% { 
                    transform: translate(10vw, 30vh) scale(1.1) rotate(270deg);
                    border-radius: 30% 70% 40% 60%;
                }
            }
            
            @keyframes morphBlob3 {
                0%, 100% { 
                    transform: translate(80vw, 70vh) scale(1) rotate(0deg);
                    border-radius: 60% 40% 50% 50%;
                }
                33% { 
                    transform: translate(10vw, 10vh) scale(1.2) rotate(120deg);
                    border-radius: 30% 70% 60% 40%;
                }
                66% { 
                    transform: translate(70vw, 40vh) scale(0.8) rotate(240deg);
                    border-radius: 50% 30% 70% 50%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Effetti Hover Avanzati
    setupHoverEffects() {
        // Magnetic effect
        this.setupMagneticElements();
        
        // Glow trail effect
        this.setupGlowTrail();
        
        // Ripple effect
        this.setupRippleEffect();
    }

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupGlowTrail() {
        let trail = [];
        const maxTrail = 10;
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > maxTrail) {
                trail.shift();
            }
            
            this.updateGlowTrail(trail);
        });
    }

    updateGlowTrail(trail) {
        const existing = document.querySelectorAll('.glow-trail-dot');
        existing.forEach(dot => dot.remove());
        
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'glow-trail-dot';
            const opacity = (index / trail.length) * 0.5;
            const size = (index / trail.length) * 20 + 5;
            
            dot.style.cssText = `
                position: fixed;
                left: ${point.x - size/2}px;
                top: ${point.y - size/2}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(102, 126, 234, ${opacity}) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9999;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(dot);
            
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.style.opacity = '0';
                    setTimeout(() => dot.remove(), 300);
                }
            }, 100);
        });
    }

    setupRippleEffect() {
        const rippleElements = document.querySelectorAll('.ripple-effect');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple keyframe
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Animazioni di Caricamento
    initializeLoadingAnimations() {
        this.createLoadingElements();
        this.animateLoadingSequence();
    }

    createLoadingElements() {
        // Skeleton loaders
        const skeletonElements = document.querySelectorAll('[data-skeleton]');
        skeletonElements.forEach(element => {
            element.classList.add('skeleton-loading');
        });
    }

    animateLoadingSequence() {
        const sequence = [
            { selector: '.navbar', delay: 0 },
            { selector: '.hero-title', delay: 200 },
            { selector: '.hero-description', delay: 400 },
            { selector: '.hero-actions', delay: 600 },
            { selector: '.floating-card', delay: 800 }
        ];
        
        sequence.forEach(item => {
            setTimeout(() => {
                const elements = document.querySelectorAll(item.selector);
                elements.forEach(el => {
                    el.classList.add('loaded');
                });
            }, item.delay);
        });
    }

    // Animazioni Testo
    setupTextAnimations() {
        this.initializeTypingEffect();
        this.setupTextReveal();
        this.initializeCounterAnimation();
    }

    initializeTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid #667eea';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }

    setupTextReveal() {
        const revealElements = document.querySelectorAll('[data-text-reveal]');
        
        revealElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            
            element.innerHTML = words.map(word => 
                `<span class="word-reveal">${word}</span>`
            ).join(' ');
            
            const wordElements = element.querySelectorAll('.word-reveal');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        wordElements.forEach((word, index) => {
                            setTimeout(() => {
                                word.style.opacity = '1';
                                word.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            });
            
            observer.observe(element);
            
            // Initial styling
            wordElements.forEach(word => {
                word.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease;
                `;
            });
        });
    }

    initializeCounterAnimation() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        counterElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-counter'));
            const duration = parseInt(element.getAttribute('data-duration')) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(element, target, duration);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    animateCounter(element, target, duration) {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (target - startValue) * this.easeOutQuart(progress));
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    // Effetti Background
    initializeBackgroundEffects() {
        this.createFloatingShapes();
        this.initializeGradientAnimation();
    }

    createFloatingShapes() {
        const container = document.createElement('div');
        container.className = 'floating-shapes';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            shape.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
                animation: floatShape ${10 + Math.random() * 20}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            container.appendChild(shape);
        }
        
        document.body.appendChild(container);
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatShape {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.1;
                }
                50% { 
                    transform: translateY(-100px) rotate(180deg);
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }

    initializeGradientAnimation() {
        const gradientElements = document.querySelectorAll('.animated-bg');
        
        gradientElements.forEach(element => {
            element.style.background = 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)';
            element.style.backgroundSize = '400% 400%';
            element.style.animation = 'gradientShift 15s ease infinite';
        });
    }

    // Cleanup methods
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScrollEffects);
        
        // Remove created elements
        const createdElements = document.querySelectorAll('.morphing-blobs, .floating-shapes, .glow-trail-dot');
        createdElements.forEach(el => el.remove());
    }
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});

// Performance optimization for animations
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
    // Disable complex animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
