// ===== ADVANCED ANIMATIONS SYSTEM =====
// Enhanced animations for the Travel Tourism Template

class AnimationEngine {
    constructor() {
        this.observers = [];
        this.animationQueue = [];
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupTypewriterEffects();
        this.setupMorphingShapes();
    }

    // ===== INTERSECTION OBSERVERS =====
    setupIntersectionObservers() {
        if (this.isReducedMotion) return;

        const fadeUpObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const slideObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const direction = entry.target.dataset.slideDirection || 'left';
                        entry.target.classList.add(`animate-slide-${direction}`);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const zoomObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-zoom-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        // Apply observers to elements
        document.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
            fadeUpObserver.observe(el);
        });

        document.querySelectorAll('[data-animate="slide"]').forEach(el => {
            slideObserver.observe(el);
        });

        document.querySelectorAll('[data-animate="zoom"]').forEach(el => {
            zoomObserver.observe(el);
        });

        this.observers.push(fadeUpObserver, slideObserver, zoomObserver);
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;

            // Parallax backgrounds
            document.querySelectorAll('[data-parallax]').forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Fade elements based on scroll
            document.querySelectorAll('[data-scroll-fade]').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                if (elementTop < viewportHeight && elementTop + elementHeight > 0) {
                    const opacity = Math.max(0, Math.min(1, 
                        (viewportHeight - elementTop) / (viewportHeight + elementHeight)
                    ));
                    element.style.opacity = opacity;
                }
            });

            // Scale elements based on scroll
            document.querySelectorAll('[data-scroll-scale]').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                const distance = Math.abs(elementCenter - viewportCenter);
                const maxDistance = viewportHeight / 2;
                const scale = Math.max(0.8, 1 - (distance / maxDistance) * 0.2);
                
                element.style.transform = `scale(${scale})`;
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
        updateScrollAnimations(); // Initial call
    }

    // ===== HOVER EFFECTS =====
    setupHoverEffects() {
        // Magnetic effect for buttons
        document.querySelectorAll('.btn, .card').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;

                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });

        // Ripple effect for buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                if (this.isReducedMotion) return;

                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Tilt effect for cards
        document.querySelectorAll('.destination-card, .experience-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;

                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / rect.width;
                const deltaY = (e.clientY - centerY) / rect.height;
                
                const rotateX = deltaY * -10;
                const rotateY = deltaX * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax-depth]');
        
        window.addEventListener('scroll', () => {
            if (this.isReducedMotion) return;

            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const depth = parseFloat(element.dataset.parallaxDepth) || 1;
                const movement = scrolled * depth;
                element.style.transform = `translateY(${movement}px)`;
            });
        });
    }

    // ===== COUNTER ANIMATIONS =====
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.counter);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                
                const current = Math.floor(target * easeOutCubic);
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !entry.target.dataset.animated) {
                        entry.target.dataset.animated = 'true';
                        animateCounter(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ===== TYPEWRITER EFFECTS =====
    setupTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        const typeWriter = (element) => {
            const text = element.dataset.typewriter;
            const speed = parseInt(element.dataset.typewriterSpeed) || 100;
            let i = 0;
            
            element.textContent = '';
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };
            
            type();
        };

        const typewriterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !entry.target.dataset.typed) {
                        entry.target.dataset.typed = 'true';
                        typeWriter(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        typewriterElements.forEach(element => {
            typewriterObserver.observe(element);
        });
    }

    // ===== MORPHING SHAPES =====
    setupMorphingShapes() {
        const morphingElements = document.querySelectorAll('[data-morph]');
        
        morphingElements.forEach(element => {
            if (this.isReducedMotion) return;

            const shapes = [
                '40% 60% 70% 30% / 40% 40% 60% 50%',
                '70% 30% 50% 50% / 30% 30% 70% 70%',
                '100% 60% 60% 100% / 100% 100% 60% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%'
            ];
            
            let currentShape = 0;
            
            const morphShape = () => {
                element.style.borderRadius = shapes[currentShape];
                currentShape = (currentShape + 1) % shapes.length;
            };
            
            setInterval(morphShape, 3000);
        });
    }

    // ===== STAGGER ANIMATIONS =====
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // ===== TIMELINE ANIMATIONS =====
    createTimeline(animations) {
        let totalDelay = 0;
        
        animations.forEach(({ element, animation, duration = 300, delay = 0 }) => {
            setTimeout(() => {
                if (typeof animation === 'string') {
                    element.classList.add(animation);
                } else if (typeof animation === 'function') {
                    animation(element);
                }
            }, totalDelay + delay);
            
            totalDelay += duration + delay;
        });
    }

    // ===== SCROLL TRIGGERED ANIMATIONS =====
    setupScrollTriggers() {
        const scrollTriggers = document.querySelectorAll('[data-scroll-trigger]');
        
        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const trigger = entry.target.dataset.scrollTrigger;
                        this.executeTrigger(trigger, entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        scrollTriggers.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    executeTrigger(trigger, element) {
        switch (trigger) {
            case 'fade-up':
                element.classList.add('animate-fade-up');
                break;
            case 'slide-left':
                element.classList.add('animate-slide-left');
                break;
            case 'slide-right':
                element.classList.add('animate-slide-right');
                break;
            case 'zoom-in':
                element.classList.add('animate-zoom-in');
                break;
            case 'bounce':
                element.classList.add('animate-bounce');
                break;
            case 'flip':
                element.classList.add('animate-flip');
                break;
            default:
                console.warn(`Unknown animation trigger: ${trigger}`);
        }
    }

    // ===== CLEANUP =====
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.animationQueue = [];
    }
}

// ===== ENHANCED PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        
        this.config = {
            particleCount: options.particleCount || 80,
            particleSpeed: options.particleSpeed || 1,
            connectionDistance: options.connectionDistance || 150,
            colors: options.colors || ['#667eea', '#764ba2', '#f093fb'],
            ...options
        };
        
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                radius: Math.random() * 3 + 1,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }

            // Apply friction
            particle.vx *= 0.999;
            particle.vy *= 0.999;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (this.config.connectionDistance - distance) / this.config.connectionDistance * 0.3;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===== ENHANCED SCROLL PROGRESS =====
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.bindEvents();
    }

    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress-bar';
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(this.progressBar);
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.progressBar.style.width = scrolled + '%';
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    }
}

// ===== ENHANCED CURSOR EFFECTS =====
class CursorEffects {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.createCursor();
        this.bindEvents();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #667eea;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;

        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        this.follower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.15s ease;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';

            this.follower.style.left = e.clientX - 20 + 'px';
            this.follower.style.top = e.clientY - 20 + 'px';
        });

        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'scale(0.8)';
            this.follower.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'scale(1)';
            this.follower.style.transform = 'scale(1)';
        });

        // Hide cursor on touch devices
        document.addEventListener('touchstart', () => {
            this.cursor.style.display = 'none';
            this.follower.style.display = 'none';
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Initialize animation engine
        new AnimationEngine();
        
        // Initialize particle system
        const particleCanvas = document.getElementById('particleCanvas');
        if (particleCanvas) {
            new ParticleSystem(particleCanvas, {
                particleCount: 60,
                particleSpeed: 0.8,
                connectionDistance: 120
            });
        }
        
        // Initialize scroll progress
        new ScrollProgress();
        
        // Initialize cursor effects (only on desktop)
        if (!('ontouchstart' in window)) {
            new CursorEffects();
        }
    }
});

// ===== EXPORT FOR EXTERNAL USE =====
window.AnimationEngine = AnimationEngine;
window.ParticleSystem = ParticleSystem;
window.ScrollProgress = ScrollProgress;
window.CursorEffects = CursorEffects;
