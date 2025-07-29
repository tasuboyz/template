// ===== SCROLL-TRIGGERED ANIMATIONS =====
export class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.tl = null;
        
        this.init();
    }

    async init() {
        this.setupScrollTrigger();
        this.setupIntersectionObserver();
        this.setupSpecialAnimations();
        
        console.log('📜 Scroll Animations initialized');
    }

    setupScrollTrigger() {
        // Register ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // About section animations
        this.animateAboutSection();
        
        // Portfolio section animations
        this.animatePortfolioSection();
        
        // Skills section animations
        this.animateSkillsSection();
        
        // Contact section animations
        this.animateContactSection();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '-10% 0px -10% 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        const elementsToObserve = document.querySelectorAll([
            '.scroll-reveal',
            '.scroll-reveal-left',
            '.scroll-reveal-right', 
            '.scroll-reveal-scale',
            '.text-block',
            '.stat-item',
            '.gallery-item',
            '.skill-category',
            '.tool-icon',
            '.contact-item',
            '.social-link',
            '.contact-form-container'
        ].join(', '));

        elementsToObserve.forEach(el => this.observer.observe(el));
    }

    setupSpecialAnimations() {
        // Counter animation for stats
        this.setupCounterAnimations();
        
        // Skill bar animations
        this.setupSkillBarAnimations();
        
        // Portfolio filter animations
        this.setupPortfolioAnimations();
    }

    animateAboutSection() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        // Section header animation
        gsap.fromTo('.about-section .section-number', 
            { opacity: 0, scale: 0.5, rotation: -180 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.about-section .section-title',
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Text blocks stagger animation
        gsap.fromTo('.text-block',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Image gallery animation
        gsap.fromTo('.gallery-item',
            { opacity: 0, scale: 0.8, rotation: -10 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.image-gallery',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    animatePortfolioSection() {
        const portfolioSection = document.getElementById('portfolio');
        if (!portfolioSection) return;

        // Portfolio filter buttons
        gsap.fromTo('.filter-btn',
            { opacity: 0, y: 30, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.portfolio-filter',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Portfolio items with advanced stagger
        gsap.fromTo('.portfolio-item',
            { 
                opacity: 0, 
                y: 100,
                scale: 0.8,
                rotationY: 45
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 1,
                stagger: {
                    amount: 1.2,
                    grid: 'auto',
                    from: 'center'
                },
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.portfolio-grid',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    animateSkillsSection() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        // Skill categories
        gsap.fromTo('.skill-category',
            { opacity: 0, x: -100, rotationY: -45 },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Tool icons with magnetic effect
        gsap.fromTo('.tool-icon',
            { 
                opacity: 0, 
                scale: 0,
                rotation: 180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.tools-showcase',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    animateContactSection() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        // Contact items slide from left
        gsap.fromTo('.contact-item',
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-details',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Social links with bounce
        gsap.fromTo('.social-link',
            { opacity: 0, y: 50, scale: 0 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.social-links',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Contact form with slide up
        gsap.fromTo('.contact-form-container',
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-form-container',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupCounterAnimations() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            const numberElement = item.querySelector('.stat-number');
            const targetValue = parseInt(item.dataset.count);
            
            if (!numberElement || !targetValue) return;

            gsap.fromTo(numberElement,
                { textContent: 0 },
                {
                    textContent: targetValue,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.dataset.progress + '%';
            
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: targetWidth,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    setupPortfolioAnimations() {
        // Advanced hover effects for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const image = item.querySelector('.image-placeholder');
            const overlay = item.querySelector('.project-overlay');
            const info = item.querySelector('.project-info');
            
            item.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.fromTo(info,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, delay: 0.1 }
                );
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    triggerAnimation(element) {
        if (element.classList.contains('scroll-reveal')) {
            gsap.fromTo(element,
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                }
            );
        } else if (element.classList.contains('scroll-reveal-left')) {
            gsap.fromTo(element,
                { opacity: 0, x: -50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                }
            );
        } else if (element.classList.contains('scroll-reveal-right')) {
            gsap.fromTo(element,
                { opacity: 0, x: 50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                }
            );
        } else if (element.classList.contains('scroll-reveal-scale')) {
            gsap.fromTo(element,
                { opacity: 0, scale: 0.8 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.8, 
                    ease: 'back.out(1.7)' 
                }
            );
        }
    }

    // Parallax effect for sections
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    handleResize() {
        // Refresh ScrollTrigger on resize
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.killAll();
        }
        
        gsap.killTweensOf('*');
    }
}
