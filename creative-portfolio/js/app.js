// ===== MAIN APPLICATION ENTRY POINT =====
import { LoadingScreen } from './modules/loadingScreen.js';
import { CustomCursor } from './modules/customCursor.js';
import { BackgroundCanvas } from './modules/backgroundCanvas.js';
import { Navigation } from './modules/navigation.js';
import { HeroSection } from './modules/heroSection.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';
import { PortfolioFilter } from './modules/portfolioFilter.js';
import { SkillsAnimation } from './modules/skillsAnimation.js';
import { ContactForm } from './modules/contactForm.js';
import { ParticleSystem } from './modules/particleSystem.js';
import { AudioManager } from './modules/audioManager.js';

class CreativePortfolio {
    constructor() {
        this.modules = new Map();
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.loadingScreen = new LoadingScreen();
            await this.loadingScreen.show();

            // Initialize core modules
            await this.initializeModules();

            // Setup event listeners
            this.setupEventListeners();

            // Hide loading screen with delay for effect
            setTimeout(async () => {
                await this.loadingScreen.hide();
                this.isLoaded = true;
                this.startAnimations();
            }, 3000);

        } catch (error) {
            console.error('Failed to initialize Creative Portfolio:', error);
        }
    }

    async initializeModules() {
        const moduleConfigs = [
            { name: 'customCursor', class: CustomCursor },
            { name: 'backgroundCanvas', class: BackgroundCanvas },
            { name: 'navigation', class: Navigation },
            { name: 'heroSection', class: HeroSection },
            { name: 'scrollAnimations', class: ScrollAnimations },
            { name: 'portfolioFilter', class: PortfolioFilter },
            { name: 'skillsAnimation', class: SkillsAnimation },
            { name: 'contactForm', class: ContactForm },
            { name: 'particleSystem', class: ParticleSystem },
            { name: 'audioManager', class: AudioManager }
        ];

        for (const config of moduleConfigs) {
            try {
                const module = new config.class();
                await module.init?.();
                this.modules.set(config.name, module);
                console.log(`✅ ${config.name} initialized successfully`);
            } catch (error) {
                console.warn(`⚠️ Failed to initialize ${config.name}:`, error);
            }
        }
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));

        // Performance monitoring
        if ('PerformanceObserver' in window) {
            this.setupPerformanceObserver();
        }

        // Visibility API for performance optimization
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Prevent right-click context menu (optional for portfolio sites)
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });

        // Easter egg: Konami code
        this.setupKonamiCode();
    }

    setupPerformanceObserver() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.entryType === 'measure') {
                        console.log(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                    }
                });
            });

            observer.observe({ entryTypes: ['measure', 'navigation'] });
        } catch (error) {
            console.warn('Performance Observer not supported');
        }
    }

    setupKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let userInput = [];

        document.addEventListener('keydown', (e) => {
            userInput.push(e.code);
            if (userInput.length > konamiCode.length) {
                userInput.shift();
            }

            if (userInput.join(',') === konamiCode.join(',')) {
                this.activateEasterEgg();
            }
        });
    }

    activateEasterEgg() {
        console.log('🎉 Easter egg activated!');
        
        // Create rainbow effect
        document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 2s ease infinite';

        // Show celebration message
        this.showNotification('🌈 You found the rainbow mode! 🌈', 'success');

        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
            document.body.style.animation = '';
        }, 5000);
    }

    handleResize() {
        this.debounce(() => {
            this.modules.forEach((module) => {
                module.handleResize?.();
            });
        }, 250)();
    }

    handleScroll() {
        if (!this.isLoaded) return;

        requestAnimationFrame(() => {
            this.modules.forEach((module) => {
                module.handleScroll?.();
            });
        });
    }

    handleOrientationChange() {
        setTimeout(() => {
            this.handleResize();
        }, 500);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.modules.forEach((module) => {
                module.pause?.();
            });
        } else {
            // Resume animations when tab becomes visible
            this.modules.forEach((module) => {
                module.resume?.();
            });
        }
    }

    startAnimations() {
        // Start hero animations
        this.modules.get('heroSection')?.startAnimations();
        
        // Start background animations
        this.modules.get('backgroundCanvas')?.startAnimation();
        
        // Start particle system
        this.modules.get('particleSystem')?.start();

        // Initialize scroll-triggered animations
        this.modules.get('scrollAnimations')?.init();

        console.log('🎬 All animations started!');
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ff5252)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    // Utility methods
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

    // Public API methods
    getModule(name) {
        return this.modules.get(name);
    }

    async reinitialize() {
        console.log('Reinitializing Creative Portfolio...');
        await this.init();
    }

    destroy() {
        // Cleanup all modules
        this.modules.forEach((module) => {
            module.destroy?.();
        });
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('orientationchange', this.handleOrientationChange);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        console.log('Creative Portfolio destroyed');
    }
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.creativePortfolio = new CreativePortfolio();
    });
} else {
    window.creativePortfolio = new CreativePortfolio();
}

// Export for potential external access
export default CreativePortfolio;
