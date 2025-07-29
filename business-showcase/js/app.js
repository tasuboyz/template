/**
 * Main Application Entry Point
 * Orchestrates all components and handles global application state
 */

import { logger, loadingManager, device, emit, storage } from './utils.js';
import themeManager from './themeManager.js';
import animationEngine from './animations.js';
import headerComponent from './components/header.js';
import heroComponent from './components/hero.js';
import servicesComponent from './components/services.js';
import footerComponent from './components/footer.js';

class BusinessShowcaseApp {
    constructor() {
        this.version = '1.0.0';
        this.isInitialized = false;
        this.components = new Map();
        this.globalState = new Map();
        this.eventListeners = new Map();
        
        // Performance monitoring
        this.performanceMetrics = {
            startTime: performance.now(),
            loadTime: null,
            firstPaint: null,
            firstContentfulPaint: null
        };
        
        this.init();
    }
    
    async init() {
        try {
            logger.info(`🚀 BusinessPro Showcase v${this.version} initializing...`);
            
            // Check browser compatibility
            this.checkBrowserCompatibility();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            // Initialize core systems
            await this.initializeCoreSystems();
            
            // Initialize components
            this.initializeComponents();
            
            // Setup global event handlers
            this.setupGlobalEventHandlers();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup analytics
            this.setupAnalytics();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Calculate load time
            this.performanceMetrics.loadTime = performance.now() - this.performanceMetrics.startTime;
            
            logger.success(`✅ Application initialized in ${this.performanceMetrics.loadTime.toFixed(2)}ms`);
            
            // Emit ready event
            emit(document, 'app-ready', {
                version: this.version,
                loadTime: this.performanceMetrics.loadTime,
                components: Array.from(this.components.keys())
            });
            
        } catch (error) {
            logger.error('❌ Application initialization failed:', error);
            this.handleInitializationError(error);
        }
    }
    
    handleInitializationError(error) {
        // Show user-friendly error message
        const errorElement = document.createElement('div');
        errorElement.className = 'initialization-error';
        errorElement.innerHTML = `
            <div class="error-content">
                <h2>⚠️ Errore di Inizializzazione</h2>
                <p>Si è verificato un errore durante il caricamento dell'applicazione.</p>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    Ricarica Pagina
                </button>
                <details style="margin-top: 1rem;">
                    <summary>Dettagli tecnici</summary>
                    <pre style="font-size: 0.8rem; padding: 1rem; background: #f5f5f5;">${error.message}</pre>
                </details>
            </div>
        `;
        
        errorElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10002;
            font-family: system-ui, sans-serif;
            text-align: center;
            padding: 2rem;
        `;
        
        document.body.appendChild(errorElement);
    }
    
    checkBrowserCompatibility() {
        const features = {
            'IntersectionObserver': 'IntersectionObserver' in window,
            'CustomElements': 'customElements' in window,
            'ES6Modules': typeof Symbol !== 'undefined',
            'Fetch': 'fetch' in window,
            'LocalStorage': 'localStorage' in window,
            'CSS Grid': CSS.supports('display', 'grid'),
            'CSS Variables': CSS.supports('--css-var', 'yes')
        };
        
        const unsupportedFeatures = Object.entries(features)
            .filter(([feature, supported]) => !supported)
            .map(([feature]) => feature);
        
        if (unsupportedFeatures.length > 0) {
            logger.warn('⚠️ Some features may not work in this browser:', unsupportedFeatures);
            this.showBrowserCompatibilityWarning(unsupportedFeatures);
        } else {
            logger.info('✅ Browser compatibility check passed');
        }
        
        // Store browser info
        this.globalState.set('browserInfo', {
            userAgent: navigator.userAgent,
            features,
            unsupportedFeatures,
            isMobile: device.isMobile(),
            isTablet: device.isTablet(),
            hasTouch: device.hasTouch(),
            prefersDarkMode: device.prefersDarkMode(),
            prefersReducedMotion: device.prefersReducedMotion()
        });
    }
    
    showBrowserCompatibilityWarning(unsupportedFeatures) {
        const warning = document.createElement('div');
        warning.className = 'browser-warning';
        warning.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Browser Compatibility Notice</h3>
                <p>Some features may not work optimally in your current browser:</p>
                <ul>
                    ${unsupportedFeatures.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p>For the best experience, please use a modern browser like Chrome, Firefox, Safari, or Edge.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    Continue Anyway
                </button>
            </div>
        `;
        
        warning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(warning);
    }
    
    setupPerformanceMonitoring() {
        // Monitor Web Vitals if available
        if ('PerformanceObserver' in window) {
            try {
                // First Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.name === 'first-paint') {
                            this.performanceMetrics.firstPaint = entry.startTime;
                        } else if (entry.name === 'first-contentful-paint') {
                            this.performanceMetrics.firstContentfulPaint = entry.startTime;
                        }
                    });
                }).observe({ entryTypes: ['paint'] });
                
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.performanceMetrics.largestContentfulPaint = lastEntry.startTime;
                }).observe({ entryTypes: ['largest-contentful-paint'] });
                
                // Layout Shift
                new PerformanceObserver((list) => {
                    let cumulativeScore = 0;
                    list.getEntries().forEach(entry => {
                        if (!entry.hadRecentInput) {
                            cumulativeScore += entry.value;
                        }
                    });
                    this.performanceMetrics.cumulativeLayoutShift = cumulativeScore;
                }).observe({ entryTypes: ['layout-shift'] });
                
            } catch (error) {
                logger.warn('Performance monitoring setup failed:', error);
            }
        }
        
        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                this.performanceMetrics.memoryUsage = {
                    used: memory.usedJSHeapSize,
                    total: memory.totalJSHeapSize,
                    limit: memory.jsHeapSizeLimit
                };
            }, 10000); // Check every 10 seconds
        }
    }
    
    async initializeCoreSystems() {
        logger.info('🔧 Initializing core systems...');
        
        // Initialize theme manager
        this.components.set('themeManager', themeManager);
        
        // Initialize animation engine
        this.components.set('animationEngine', animationEngine);
        
        // Setup loading manager
        this.setupLoadingManager();
        
        // Initialize service worker if available
        await this.initializeServiceWorker();
        
        // Setup offline detection
        this.setupOfflineDetection();
        
        // Setup viewport detection
        this.setupViewportDetection();
        
        logger.info('✅ Core systems initialized');
    }
    
    initializeComponents() {
        logger.info('🧩 Initializing components...');
        
        try {
            // Register components
            this.components.set('header', headerComponent);
            this.components.set('hero', heroComponent);
            this.components.set('services', servicesComponent);
            this.components.set('footer', footerComponent);
            
            // Setup component communication
            this.setupComponentCommunication();
            
            logger.info('✅ All components initialized');
            
        } catch (error) {
            logger.error('❌ Component initialization failed:', error);
            throw error;
        }
    }
    
    setupComponentCommunication() {
        // Listen for component events and coordinate responses
        
        // Theme changes
        document.addEventListener('themechange', (e) => {
            logger.info('Theme changed:', e.detail.theme);
            this.globalState.set('currentTheme', e.detail.theme);
            
            // Notify analytics
            this.trackEvent('theme_change', {
                theme: e.detail.theme,
                timestamp: Date.now()
            });
        });
        
        // Navigation events
        document.addEventListener('navigation', (e) => {
            logger.info('Navigation:', e.detail.target);
            this.globalState.set('currentSection', e.detail.target);
            
            // Update page title if needed
            this.updatePageTitle(e.detail.target);
        });
        
        // Service interactions
        document.addEventListener('servicemodalopen', (e) => {
            // Track service interest
            this.trackEvent('service_interest', {
                service: e.detail.service.title,
                category: e.detail.service.category
            });
        });
        
        // Form submissions
        document.addEventListener('form_submit', (e) => {
            // Track form completions
            this.trackEvent('form_completion', {
                form: e.detail.formType,
                timestamp: Date.now()
            });
        });
    }
    
    setupGlobalEventHandlers() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
        
        // Visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Before unload (page exit)
        window.addEventListener('beforeunload', (e) => {
            this.handleBeforeUnload(e);
        });
        
        // Page focus/blur
        window.addEventListener('focus', () => {
            this.handlePageFocus();
        });
        
        window.addEventListener('blur', () => {
            this.handlePageBlur();
        });
    }
    
    handleGlobalKeyboard(e) {
        // Global keyboard shortcuts
        const shortcuts = {
            // Ctrl/Cmd + K: Focus search (if implemented)
            'k': () => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.focusSearch();
                }
            },
            
            // Ctrl/Cmd + /: Show help
            '/': () => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.showKeyboardShortcuts();
                }
            },
            
            // Escape: Close modals/overlays
            'Escape': () => {
                this.closeAllModals();
            }
        };
        
        const handler = shortcuts[e.key];
        if (handler) {
            handler();
        }
    }
    
    handleWindowResize() {
        // Debounced resize handler
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
                isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
                isDesktop: window.innerWidth >= 1024
            };
            
            this.globalState.set('viewport', viewport);
            
            // Emit resize event for components
            emit(document, 'viewport-change', viewport);
            
        }, 250);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            this.globalState.set('isVisible', false);
            this.pauseNonEssentialAnimations();
        } else {
            this.globalState.set('isVisible', true);
            this.resumeAnimations();
        }
    }
    
    handleBeforeUnload(e) {
        // Save any unsaved data
        this.saveApplicationState();
        
        // Track page exit
        this.trackEvent('page_exit', {
            timeOnPage: Date.now() - this.performanceMetrics.startTime,
            scrollDepth: this.getScrollDepth()
        });
    }
    
    handlePageFocus() {
        this.globalState.set('hasFocus', true);
        this.resumeAnimations();
    }
    
    handlePageBlur() {
        this.globalState.set('hasFocus', false);
        this.pauseNonEssentialAnimations();
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e.error, 'javascript');
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.handleGlobalError(e.reason, 'promise');
        });
        
        // Custom error boundary for components
        this.setupComponentErrorBoundary();
    }
    
    setupComponentErrorBoundary() {
        // Create a simple error boundary for component errors
        document.addEventListener('component-error', (e) => {
            logger.error('Component error:', e.detail);
            
            // Try to recover or show fallback UI
            const componentName = e.detail.component;
            this.handleComponentError(componentName, e.detail.error);
        });
    }
    
    handleComponentError(componentName, error) {
        logger.warn(`Component ${componentName} failed, attempting recovery...`);
        
        // Remove failed component from active components
        this.components.delete(componentName);
        
        // Show fallback UI if needed
        const fallbackElement = document.createElement('div');
        fallbackElement.className = 'component-fallback';
        fallbackElement.innerHTML = `
            <p>⚠️ Errore nel componente ${componentName}</p>
        `;
        
        // This is a basic fallback - in a real app you'd have more sophisticated recovery
    }
    
    handleGlobalError(error, type) {
        logger.error(`Global ${type} error:`, error);
        
        // Track error
        this.trackEvent('error', {
            type,
            message: error.message,
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        });
        
        // Show user-friendly error message if critical
        if (this.isCriticalError(error)) {
            this.showErrorMessage('Something went wrong. Please refresh the page.');
        }
    }
    
    isCriticalError(error) {
        const criticalPatterns = [
            'ChunkLoadError',
            'Loading chunk',
            'Loading CSS chunk',
            'Script error'
        ];
        
        return criticalPatterns.some(pattern => 
            error.message && error.message.includes(pattern)
        );
    }
    
    showErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'global-error';
        errorElement.innerHTML = `
            <div class="error-content">
                <h3>⚠️ ${message}</h3>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    Refresh Page
                </button>
            </div>
        `;
        
        errorElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            color: white;
            text-align: center;
        `;
        
        document.body.appendChild(errorElement);
    }
    
    setupLoadingManager() {
        loadingManager.onStateChange((isLoading, activeStates) => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                if (isLoading) {
                    loadingScreen.style.display = 'flex';
                } else {
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }
        });
    }
    
    async initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                logger.info('Service Worker registered:', registration);
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    this.handleServiceWorkerUpdate(registration);
                });
                
            } catch (error) {
                logger.warn('Service Worker registration failed:', error);
            }
        }
    }
    
    handleServiceWorkerUpdate(registration) {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailableNotification();
            }
        });
    }
    
    showUpdateAvailableNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🔄 New version available!</span>
                <button onclick="window.location.reload()" class="btn btn-small btn-primary">
                    Update
                </button>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-small btn-outline">
                    Later
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
    }
    
    setupOfflineDetection() {
        const updateOnlineStatus = () => {
            const isOnline = navigator.onLine;
            this.globalState.set('isOnline', isOnline);
            
            if (isOnline) {
                this.hideOfflineMessage();
            } else {
                this.showOfflineMessage();
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        // Initial status
        updateOnlineStatus();
    }
    
    showOfflineMessage() {
        if (document.querySelector('.offline-message')) return;
        
        const message = document.createElement('div');
        message.className = 'offline-message';
        message.innerHTML = `
            <div class="message-content">
                📡 You're currently offline. Some features may not work.
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #f59e0b;
            color: white;
            padding: 0.5rem;
            text-align: center;
            z-index: 1000;
            font-weight: 500;
        `;
        
        document.body.appendChild(message);
    }
    
    hideOfflineMessage() {
        const message = document.querySelector('.offline-message');
        if (message) {
            message.remove();
        }
    }
    
    setupViewportDetection() {
        const updateViewport = () => {
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
                orientation: window.screen?.orientation?.angle || 0
            };
            
            this.globalState.set('viewport', viewport);
        };
        
        window.addEventListener('resize', updateViewport);
        window.addEventListener('orientationchange', updateViewport);
        
        // Initial viewport
        updateViewport();
    }
    
    setupAnalytics() {
        // Track page view
        this.trackEvent('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            viewport: this.globalState.get('viewport'),
            theme: this.globalState.get('currentTheme')
        });
        
        // Track scroll depth
        this.setupScrollDepthTracking();
        
        // Track time on page
        this.setupTimeTracking();
    }
    
    setupScrollDepthTracking() {
        const thresholds = [25, 50, 75, 90, 100];
        const reached = new Set();
        
        const trackScrollDepth = () => {
            const depth = this.getScrollDepth();
            
            thresholds.forEach(threshold => {
                if (depth >= threshold && !reached.has(threshold)) {
                    reached.add(threshold);
                    this.trackEvent('scroll_depth', {
                        depth: threshold,
                        timestamp: Date.now()
                    });
                }
            });
        };
        
        window.addEventListener('scroll', () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(trackScrollDepth, 100);
        }, { passive: true });
    }
    
    getScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.round((scrollTop / documentHeight) * 100);
    }
    
    setupTimeTracking() {
        // Track time spent on page in intervals
        setInterval(() => {
            if (this.globalState.get('isVisible') && this.globalState.get('hasFocus')) {
                this.trackEvent('time_on_page', {
                    duration: Date.now() - this.performanceMetrics.startTime,
                    timestamp: Date.now()
                });
            }
        }, 30000); // Every 30 seconds
    }
    
    trackEvent(eventName, data) {
        // Console logging for development
        logger.debug(`📊 Analytics: ${eventName}`, data);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter: JSON.stringify(data),
                page_location: window.location.href,
                page_title: document.title
            });
        }
        
        // Custom analytics endpoint
        if (this.analyticsEndpoint) {
            fetch(this.analyticsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    event: eventName,
                    data,
                    timestamp: Date.now(),
                    session: this.getSessionId()
                })
            }).catch(error => {
                logger.warn('Analytics tracking failed:', error);
            });
        }
    }
    
    getSessionId() {
        let sessionId = storage.get('session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            storage.set('session_id', sessionId);
        }
        return sessionId;
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    pauseNonEssentialAnimations() {
        if (animationEngine) {
            animationEngine.pauseAllAnimations();
        }
    }
    
    resumeAnimations() {
        if (animationEngine) {
            animationEngine.resumeAllAnimations();
        }
    }
    
    saveApplicationState() {
        const state = {
            theme: this.globalState.get('currentTheme'),
            timestamp: Date.now(),
            version: this.version
        };
        
        storage.set('app_state', state);
    }
    
    restoreApplicationState() {
        const state = storage.get('app_state');
        if (state && state.version === this.version) {
            if (state.theme) {
                themeManager.setTheme(state.theme, false);
            }
        }
    }
    
    // ===== UTILITY METHODS =====
    
    focusSearch() {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'shortcuts-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h2>⌨️ Keyboard Shortcuts</h2>
                    <div class="shortcuts-list">
                        <div class="shortcut">
                            <kbd>Ctrl/Cmd + K</kbd>
                            <span>Focus Search</span>
                        </div>
                        <div class="shortcut">
                            <kbd>Ctrl/Cmd + /</kbd>
                            <span>Show this help</span>
                        </div>
                        <div class="shortcut">
                            <kbd>Escape</kbd>
                            <span>Close modals</span>
                        </div>
                        <div class="shortcut">
                            <kbd>Ctrl/Cmd + Shift + T</kbd>
                            <span>Toggle theme</span>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="this.closest('.shortcuts-modal').remove()">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    closeAllModals() {
        const modals = document.querySelectorAll('.modal, .demo-modal, .service-modal-container[style*="flex"]');
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            } else {
                modal.remove();
            }
        });
    }
    
    updatePageTitle(section) {
        const titles = {
            home: 'BusinessPro - Soluzioni Innovative',
            servizi: 'I Nostri Servizi - BusinessPro',
            'chi-siamo': 'Chi Siamo - BusinessPro',
            portfolio: 'Portfolio - BusinessPro',
            contatti: 'Contatti - BusinessPro'
        };
        
        if (titles[section]) {
            document.title = titles[section];
        }
    }
    
    // ===== PUBLIC API =====
    
    getComponent(name) {
        return this.components.get(name);
    }
    
    getState(key) {
        return this.globalState.get(key);
    }
    
    setState(key, value) {
        this.globalState.set(key, value);
        emit(document, 'state-change', { key, value });
    }
    
    getPerformanceMetrics() {
        return { ...this.performanceMetrics };
    }
    
    restart() {
        logger.info('🔄 Restarting application...');
        
        // Destroy all components
        this.components.forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        // Clear state
        this.components.clear();
        this.globalState.clear();
        
        // Re-initialize
        this.isInitialized = false;
        this.init();
    }
    
    destroy() {
        logger.info('🗑️ Destroying application...');
        
        // Remove all event listeners
        this.eventListeners.forEach((listener, event) => {
            document.removeEventListener(event, listener);
        });
        
        // Destroy all components
        this.components.forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        // Clear state
        this.components.clear();
        this.globalState.clear();
        this.eventListeners.clear();
        
        // Save final state
        this.saveApplicationState();
        
        logger.info('✅ Application destroyed');
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new BusinessShowcaseApp();
    });
} else {
    window.app = new BusinessShowcaseApp();
}

// Export for module usage
export default BusinessShowcaseApp;
