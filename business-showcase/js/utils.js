/**
 * Utility functions for the Business Showcase application
 * ES6+ Modern JavaScript utilities with performance optimizations
 */

// ===== DOM UTILITIES =====
export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// Enhanced element creation with properties
export const createElement = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    
    Object.entries(props).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else if (key.startsWith('data-')) {
            element.setAttribute(key, value);
        } else {
            element[key] = value;
        }
    });
    
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    
    return element;
};

// ===== EVENT UTILITIES =====
export const debounce = (func, wait = 300) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

export const throttle = (func, limit = 100) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export const once = (func) => {
    let called = false;
    return (...args) => {
        if (!called) {
            called = true;
            return func.apply(this, args);
        }
    };
};

// ===== ANIMATION UTILITIES =====
export const easings = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInBounce: t => 1 - easings.easeOutBounce(1 - t),
    easeOutBounce: t => {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    }
};

export const animate = ({
    from = 0,
    to = 1,
    duration = 1000,
    easing = easings.easeOutQuad,
    onUpdate = () => {},
    onComplete = () => {}
}) => {
    const startTime = performance.now();
    
    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        const currentValue = from + (to - from) * easedProgress;
        
        onUpdate(currentValue, progress);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            onComplete();
        }
    };
    
    requestAnimationFrame(step);
};

// ===== SCROLL UTILITIES =====
export const getScrollProgress = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return winScroll / height;
};

export const scrollTo = (element, options = {}) => {
    const defaults = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    if (typeof element === 'string') {
        element = $(element);
    }
    
    if (element) {
        element.scrollIntoView({ ...defaults, ...options });
    }
};

export const isElementInViewport = (element, threshold = 0) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= -threshold &&
        rect.left >= -threshold &&
        rect.bottom <= windowHeight + threshold &&
        rect.right <= windowWidth + threshold
    );
};

// ===== INTERSECTION OBSERVER UTILITIES =====
export const createIntersectionObserver = (callback, options = {}) => {
    const defaults = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaults, ...options });
};

export const observeElements = (elements, callback, options = {}) => {
    const observer = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target, entry);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    if (typeof elements === 'string') {
        elements = $$(elements);
    }
    
    if (Array.isArray(elements)) {
        elements.forEach(el => observer.observe(el));
    } else {
        observer.observe(elements);
    }
    
    return observer;
};

// ===== PERFORMANCE UTILITIES =====
export const preloadImages = (urls) => {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        })
    );
};

export const lazyLoad = (selector = '[data-src]') => {
    const images = $$(selector);
    
    const imageObserver = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ===== DEVICE DETECTION =====
export const device = {
    isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: () => /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768,
    isDesktop: () => !device.isMobile() && !device.isTablet(),
    hasTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    prefersDarkMode: () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    prefersReducedMotion: () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// ===== LOCAL STORAGE UTILITIES =====
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('Failed to remove from localStorage:', e);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.warn('Failed to clear localStorage:', e);
            return false;
        }
    }
};

// ===== COLOR UTILITIES =====
export const color = {
    hexToRgb: (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    rgbToHex: (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    
    lighten: (hex, percent) => {
        const rgb = color.hexToRgb(hex);
        if (!rgb) return hex;
        
        const increase = (255 * percent) / 100;
        return color.rgbToHex(
            Math.min(255, Math.floor(rgb.r + increase)),
            Math.min(255, Math.floor(rgb.g + increase)),
            Math.min(255, Math.floor(rgb.b + increase))
        );
    },
    
    darken: (hex, percent) => {
        const rgb = color.hexToRgb(hex);
        if (!rgb) return hex;
        
        const decrease = (255 * percent) / 100;
        return color.rgbToHex(
            Math.max(0, Math.floor(rgb.r - decrease)),
            Math.max(0, Math.floor(rgb.g - decrease)),
            Math.max(0, Math.floor(rgb.b - decrease))
        );
    }
};

// ===== MATH UTILITIES =====
export const math = {
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    lerp: (start, end, t) => start + (end - start) * t,
    map: (value, inMin, inMax, outMin, outMax) => {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },
    randomBetween: (min, max) => Math.random() * (max - min) + min,
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};

// ===== VALIDATION UTILITIES =====
export const validate = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    phone: (phone) => {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    },
    
    url: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    minLength: (value, length) => {
        return value && value.toString().length >= length;
    },
    
    maxLength: (value, length) => {
        return value && value.toString().length <= length;
    }
};

// ===== FORM UTILITIES =====
export const form = {
    serialize: (formElement) => {
        const formData = new FormData(formElement);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        return data;
    },
    
    validate: (formElement, rules = {}) => {
        const errors = {};
        const data = form.serialize(formElement);
        
        Object.entries(rules).forEach(([field, validators]) => {
            const value = data[field];
            const fieldErrors = [];
            
            validators.forEach(validator => {
                if (typeof validator === 'function') {
                    const result = validator(value);
                    if (result !== true) {
                        fieldErrors.push(result);
                    }
                }
            });
            
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors,
            data
        };
    }
};

// ===== CUSTOM EVENTS =====
export const createCustomEvent = (name, detail = {}) => {
    return new CustomEvent(name, {
        detail,
        bubbles: true,
        cancelable: true
    });
};

export const emit = (element, eventName, detail = {}) => {
    const event = createCustomEvent(eventName, detail);
    element.dispatchEvent(event);
    return event;
};

// ===== LOADING STATE MANAGER =====
export class LoadingManager {
    constructor() {
        this.loadingStates = new Set();
        this.callbacks = new Map();
    }
    
    start(id) {
        this.loadingStates.add(id);
        this.updateLoadingState();
    }
    
    stop(id) {
        this.loadingStates.delete(id);
        this.updateLoadingState();
    }
    
    isLoading(id = null) {
        return id ? this.loadingStates.has(id) : this.loadingStates.size > 0;
    }
    
    onStateChange(callback) {
        const id = Symbol();
        this.callbacks.set(id, callback);
        return () => this.callbacks.delete(id);
    }
    
    updateLoadingState() {
        const isLoading = this.loadingStates.size > 0;
        this.callbacks.forEach(callback => callback(isLoading, [...this.loadingStates]));
    }
}

// ===== EXPORT LOADING MANAGER INSTANCE =====
export const loadingManager = new LoadingManager();

// ===== PROMISE UTILITIES =====
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const timeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Operation timed out')), ms)
        )
    ]);
};

export const retry = async (fn, maxAttempts = 3, delayMs = 1000) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === maxAttempts) break;
            await delay(delayMs * attempt);
        }
    }
    
    throw lastError;
};

// ===== CONSOLE UTILITIES (DEVELOPMENT) =====
export const logger = {
    info: (...args) => console.log('%c[INFO]', 'color: blue', ...args),
    warn: (...args) => console.warn('%c[WARN]', 'color: orange', ...args),
    error: (...args) => console.error('%c[ERROR]', 'color: red', ...args),
    success: (...args) => console.log('%c[SUCCESS]', 'color: green', ...args),
    debug: (...args) => {
        // In ambiente browser, mostra sempre i debug (o controlla una variabile globale)
        if (typeof window !== 'undefined' && (window.DEBUG || !window.location.hostname.includes('localhost'))) {
            console.log('%c[DEBUG]', 'color: purple', ...args);
        }
    }
};
