// ===== HERO SECTION WITH SPECTACULAR ANIMATIONS =====
export class HeroSection {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.heroTitle = document.querySelector('.hero-title');
        this.titleLines = document.querySelectorAll('.title-line');
        this.heroGreeting = document.querySelector('.hero-greeting');
        this.ctaButtons = document.querySelectorAll('.cta-button');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.typingText = document.querySelector('.typing-text');
        
        // Typing animation
        this.typingPhrases = [
            'Creo esperienze digitali uniche',
            'Trasformo idee in realtà',
            'Design che emoziona e coinvolge',
            'Innovazione che ispira'
        ];
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }

    async init() {
        if (!this.heroSection) return;
        
        this.setupInitialStates();
        this.setupEventListeners();
        
        console.log('🚀 Hero Section initialized');
    }

    setupInitialStates() {
        // Set initial opacity to 0 for animation elements
        if (this.heroGreeting) {
            this.heroGreeting.style.opacity = '0';
            this.heroGreeting.style.transform = 'translateY(30px)';
        }
        
        this.titleLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(100px)';
        });
        
        this.ctaButtons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(30px)';
        });
        
        if (this.heroImage) {
            this.heroImage.style.opacity = '0';
            this.heroImage.style.transform = 'scale(0.8)';
        }
        
        if (this.scrollIndicator) {
            this.scrollIndicator.style.opacity = '0';
            this.scrollIndicator.style.transform = 'translateY(30px)';
        }
    }

    setupEventListeners() {
        // CTA button effects
        this.ctaButtons.forEach(button => {
            this.addButtonEffects(button);
        });
        
        // Scroll indicator click
        if (this.scrollIndicator) {
            this.scrollIndicator.addEventListener('click', () => {
                this.scrollToNextSection();
            });
        }
        
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            this.handleParallax();
        });
    }

    addButtonEffects(button) {
        // Hover effect with magnetic attraction
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
            button.style.boxShadow = '0 15px 35px rgba(255, 107, 107, 0.4)';
            
            // Add ripple effect
            this.createRipple(button);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        });
        
        // Click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        // Click action
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (button.classList.contains('primary-cta')) {
                this.scrollToPortfolio();
            } else if (button.classList.contains('secondary-cta')) {
                this.scrollToContact();
            }
        });
    }

    createRipple(button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    scrollToNextSection() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    scrollToPortfolio() {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleParallax() {
        const scrollY = window.scrollY;
        const heroHeight = this.heroSection.offsetHeight;
        const scrollPercent = Math.min(scrollY / heroHeight, 1);
        
        // Parallax effect for hero content
        if (this.heroTitle) {
            this.heroTitle.style.transform = `translateY(${scrollY * 0.5}px)`;
            this.heroTitle.style.opacity = 1 - scrollPercent * 0.8;
        }
        
        // Hide scroll indicator when scrolling
        if (this.scrollIndicator) {
            this.scrollIndicator.style.opacity = Math.max(0, 1 - scrollPercent * 2);
        }
    }

    startAnimations() {
        // Animate greeting
        if (this.heroGreeting) {
            gsap.to(this.heroGreeting, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2
            });
        }
        
        // Animate title lines
        this.titleLines.forEach((line, index) => {
            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5 + (index * 0.2)
            });
        });
        
        // Animate CTA buttons
        this.ctaButtons.forEach((button, index) => {
            gsap.to(button, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: 1.2 + (index * 0.1)
            });
        });
        
        // Animate hero image
        if (this.heroImage) {
            gsap.to(this.heroImage, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.8
            });
        }
        
        // Animate scroll indicator
        if (this.scrollIndicator) {
            gsap.to(this.scrollIndicator, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1.8
            });
        }
        
        // Start typing animation
        this.startTypingAnimation();
        
        // Start floating animation for shapes
        this.startFloatingAnimation();
        
        console.log('🎬 Hero animations started');
    }

    startTypingAnimation() {
        if (!this.typingText) return;
        
        const type = () => {
            const currentPhrase = this.typingPhrases[this.currentPhraseIndex];
            
            if (!this.isDeleting && this.currentCharIndex < currentPhrase.length) {
                // Typing
                this.typingText.textContent = currentPhrase.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                setTimeout(type, this.typingSpeed);
                
            } else if (this.isDeleting && this.currentCharIndex > 0) {
                // Deleting
                this.typingText.textContent = currentPhrase.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                setTimeout(type, this.deletingSpeed);
                
            } else if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
                // Pause before deleting
                setTimeout(() => {
                    this.isDeleting = true;
                    type();
                }, this.pauseTime);
                
            } else if (this.isDeleting && this.currentCharIndex === 0) {
                // Move to next phrase
                this.isDeleting = false;
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.typingPhrases.length;
                setTimeout(type, this.typingSpeed);
            }
        };
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }

    startFloatingAnimation() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                y: '-=20',
                duration: 3 + index * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.2
            });
            
            gsap.to(shape, {
                rotation: 360,
                duration: 10 + index * 2,
                ease: 'none',
                repeat: -1
            });
        });
    }

    destroy() {
        // Cleanup event listeners and animations
        window.removeEventListener('scroll', this.handleParallax);
        
        if (this.heroSection) {
            this.heroSection.removeEventListener('mousemove', this.handleMouseMove);
        }
        
        // Kill GSAP animations
        gsap.killTweensOf([
            this.heroGreeting,
            this.titleLines,
            this.ctaButtons,
            this.heroImage,
            this.scrollIndicator,
            '.shape'
        ]);
    }
}

// Add CSS for button ripple effect
const heroStyles = `
    @keyframes rippleEffect {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .cta-button > span {
        position: relative;
        z-index: 1;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = heroStyles;
document.head.appendChild(styleSheet);
