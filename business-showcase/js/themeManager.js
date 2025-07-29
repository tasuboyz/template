/**
 * Theme Manager - Handles light/dark theme switching with smooth transitions
 * Advanced theme management with system preference detection and persistence
 */

import { $, storage, device, emit, logger } from './utils.js';

class ThemeManager {
    constructor() {
        this.themes = {
            light: {
                name: 'Light',
                icon: 'fas fa-sun',
                colors: {
                    primary: '#667eea',
                    accent: '#764ba2',
                    background: '#ffffff',
                    surface: '#f8fafc',
                    text: '#1e293b'
                }
            },
            dark: {
                name: 'Dark',
                icon: 'fas fa-moon',
                colors: {
                    primary: '#818cf8',
                    accent: '#a855f7',
                    background: '#0f172a',
                    surface: '#1e293b',
                    text: '#f1f5f9'
                }
            }
        };
        
        this.currentTheme = 'light';
        this.transitionDuration = 300;
        this.observers = new Set();
        
        this.init();
    }
    
    init() {
        this.detectSystemPreference();
        this.loadSavedTheme();
        this.setupEventListeners();
        this.applyTheme(this.currentTheme, false);
        
        logger.info('Theme Manager initialized', { currentTheme: this.currentTheme });
    }
    
    detectSystemPreference() {
        if (device.prefersDarkMode()) {
            this.currentTheme = 'dark';
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!storage.get('theme-manual-override', false)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    loadSavedTheme() {
        const savedTheme = storage.get('theme', null);
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
    }
    
    setupEventListeners() {
        const themeToggle = $('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Keyboard support
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
        
        // Custom keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        storage.set('theme-manual-override', true);
    }
    
    setTheme(themeName, animate = true) {
        if (!this.themes[themeName]) {
            logger.warn(`Theme "${themeName}" not found`);
            return false;
        }
        
        const previousTheme = this.currentTheme;
        this.currentTheme = themeName;
        
        this.applyTheme(themeName, animate);
        this.updateThemeToggleIcon();
        this.saveTheme();
        this.notifyObservers(previousTheme, themeName);
        
        logger.info(`Theme changed from ${previousTheme} to ${themeName}`);
        return true;
    }
    
    applyTheme(themeName, animate = true) {
        const theme = this.themes[themeName];
        const html = document.documentElement;
        
        if (animate) {
            this.addTransitionClass();
        }
        
        // Apply theme attribute
        html.setAttribute('data-theme', themeName);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme.colors.background);
        
        // Emit theme change event
        emit(document, 'themechange', {
            theme: themeName,
            colors: theme.colors,
            previous: this.currentTheme
        });
        
        if (animate) {
            setTimeout(() => {
                this.removeTransitionClass();
            }, this.transitionDuration);
        }
    }
    
    addTransitionClass() {
        document.body.classList.add('theme-transition');
    }
    
    removeTransitionClass() {
        document.body.classList.remove('theme-transition');
    }
    
    updateThemeToggleIcon() {
        const themeToggle = $('#theme-toggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            const iconClass = this.themes[newTheme].icon;
            icon.className = iconClass;
        }
        
        // Update aria-label for accessibility
        const themeName = this.themes[this.currentTheme].name;
        themeToggle.setAttribute('aria-label', `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`);
        themeToggle.title = `Current: ${themeName} theme`;
    }
    
    updateMetaThemeColor(color) {
        let metaTheme = $('meta[name="theme-color"]');
        
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        
        metaTheme.content = color;
    }
    
    saveTheme() {
        storage.set('theme', this.currentTheme);
    }
    
    getCurrentTheme() {
        return {
            name: this.currentTheme,
            ...this.themes[this.currentTheme]
        };
    }
    
    getAvailableThemes() {
        return Object.keys(this.themes);
    }
    
    addTheme(name, themeConfig) {
        if (this.themes[name]) {
            logger.warn(`Theme "${name}" already exists`);
            return false;
        }
        
        this.themes[name] = {
            name: themeConfig.displayName || name,
            icon: themeConfig.icon || 'fas fa-palette',
            colors: themeConfig.colors || {}
        };
        
        logger.info(`Theme "${name}" added successfully`);
        return true;
    }
    
    removeTheme(name) {
        if (!this.themes[name]) {
            logger.warn(`Theme "${name}" not found`);
            return false;
        }
        
        if (name === this.currentTheme) {
            logger.warn(`Cannot remove active theme "${name}"`);
            return false;
        }
        
        delete this.themes[name];
        logger.info(`Theme "${name}" removed successfully`);
        return true;
    }
    
    // Observer pattern for theme changes
    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }
    
    notifyObservers(previousTheme, newTheme) {
        this.observers.forEach(callback => {
            try {
                callback({
                    previous: previousTheme,
                    current: newTheme,
                    theme: this.getCurrentTheme()
                });
            } catch (error) {
                logger.error('Error in theme observer:', error);
            }
        });
    }
    
    // Advanced features
    scheduleThemeChange(themeName, time) {
        const now = new Date();
        const targetTime = new Date(time);
        const delay = targetTime.getTime() - now.getTime();
        
        if (delay <= 0) {
            logger.warn('Scheduled time must be in the future');
            return null;
        }
        
        const timeoutId = setTimeout(() => {
            this.setTheme(themeName);
            logger.info(`Scheduled theme change to ${themeName} executed`);
        }, delay);
        
        logger.info(`Theme change to ${themeName} scheduled for ${targetTime.toLocaleString()}`);
        return timeoutId;
    }
    
    enableAutoTheme() {
        const now = new Date();
        const hour = now.getHours();
        
        // Auto switch based on time of day
        const shouldBeDark = hour < 6 || hour >= 18;
        const targetTheme = shouldBeDark ? 'dark' : 'light';
        
        if (targetTheme !== this.currentTheme) {
            this.setTheme(targetTheme);
        }
        
        // Schedule next check
        const nextHour = new Date(now);
        nextHour.setHours(now.getHours() + 1, 0, 0, 0);
        
        return setTimeout(() => {
            this.enableAutoTheme();
        }, nextHour.getTime() - now.getTime());
    }
    
    createThemeSelector(container) {
        if (typeof container === 'string') {
            container = $(container);
        }
        
        if (!container) {
            logger.error('Theme selector container not found');
            return;
        }
        
        const selector = document.createElement('div');
        selector.className = 'theme-selector';
        selector.innerHTML = `
            <label for="theme-select">Choose Theme:</label>
            <select id="theme-select" class="theme-select">
                ${Object.entries(this.themes).map(([key, theme]) => 
                    `<option value="${key}" ${key === this.currentTheme ? 'selected' : ''}>
                        ${theme.name}
                    </option>`
                ).join('')}
            </select>
        `;
        
        const select = selector.querySelector('select');
        select.addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });
        
        // Update selector when theme changes
        this.subscribe(({ current }) => {
            select.value = current;
        });
        
        container.appendChild(selector);
        return selector;
    }
    
    // Theme animation effects
    createThemeTransition(type = 'fade') {
        const overlay = document.createElement('div');
        overlay.className = `theme-transition-overlay theme-transition-${type}`;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity ${this.transitionDuration}ms ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger animation
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, this.transitionDuration);
        }, this.transitionDuration / 2);
    }
    
    // Performance monitoring
    measureThemeChangePerformance() {
        const start = performance.now();
        
        const cleanup = this.subscribe(() => {
            const end = performance.now();
            const duration = end - start;
            logger.debug(`Theme change took ${duration.toFixed(2)}ms`);
            cleanup();
        });
        
        return start;
    }
    
    // Accessibility features
    announceThemeChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Theme changed to ${this.themes[this.currentTheme].name}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Cleanup method
    destroy() {
        this.observers.clear();
        const themeToggle = $('#theme-toggle');
        if (themeToggle) {
            themeToggle.removeEventListener('click', this.toggleTheme);
        }
        logger.info('Theme Manager destroyed');
    }
}

// Create and export singleton instance
export const themeManager = new ThemeManager();

// Add CSS for theme transitions
const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }
    
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
    
    .theme-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .theme-select {
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--input-bg);
        color: var(--text-color);
        font-family: inherit;
    }
    
    .theme-transition-overlay {
        background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
    }
`;

document.head.appendChild(style);

// Export theme manager as default
export default themeManager;
