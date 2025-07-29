// ===== CUSTOM CURSOR WITH MAGNETIC EFFECTS =====
export class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        
        this.isVisible = false;
        this.isHovering = false;
        this.animationId = null;
        
        this.init();
    }

    init() {
        if (!this.cursor || this.isTouchDevice()) {
            return;
        }

        this.setupEventListeners();
        this.startAnimation();
        this.hide(); // Initially hidden
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (!this.isVisible) {
                this.show();
            }
        });

        // Mouse enter/leave
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());

        // Interactive elements
        this.setupInteractiveElements();

        // Hide cursor when typing
        document.addEventListener('keydown', () => this.hide());
        setTimeout(() => document.addEventListener('keyup', () => this.show()), 100);
    }

    setupInteractiveElements() {
        const interactiveSelectors = [
            'a', 'button', 'input', 'textarea', 'select',
            '.nav-link', '.cta-button', '.filter-btn',
            '.view-project-btn', '.social-link', '.submit-btn'
        ];

        const elements = document.querySelectorAll(interactiveSelectors.join(', '));

        elements.forEach(element => {
            element.addEventListener('mouseenter', () => this.onInteractiveHover(element));
            element.addEventListener('mouseleave', () => this.onInteractiveLeave(element));
            element.addEventListener('mousedown', () => this.onMouseDown());
            element.addEventListener('mouseup', () => this.onMouseUp());
        });

        // Magnetic effect for special elements
        const magneticElements = document.querySelectorAll('.cta-button, .view-project-btn, .submit-btn');
        magneticElements.forEach(element => {
            this.addMagneticEffect(element);
        });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = deltaX * force * 0.3;
                const moveY = deltaY * force * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // Update cursor position for magnetic effect
                this.cursorDot.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
                this.cursorOutline.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            this.cursorDot.style.transform = '';
            this.cursorOutline.style.transform = '';
        });
    }

    onInteractiveHover(element) {
        this.isHovering = true;
        
        // Scale up cursor
        this.cursorDot.style.transform += ' scale(2)';
        this.cursorOutline.style.transform += ' scale(1.5)';
        
        // Change colors based on element type
        if (element.classList.contains('cta-button')) {
            this.cursorDot.style.background = 'var(--secondary-color)';
            this.cursorOutline.style.borderColor = 'var(--secondary-color)';
        } else if (element.classList.contains('social-link')) {
            this.cursorDot.style.background = 'var(--accent-color)';
            this.cursorOutline.style.borderColor = 'var(--accent-color)';
        }
        
        // Add hover effect to element
        element.classList.add('cursor-hover');
        
        // Custom cursor styles for different elements
        if (element.tagName === 'A') {
            this.cursor.classList.add('cursor-link');
        } else if (element.tagName === 'BUTTON') {
            this.cursor.classList.add('cursor-button');
        }
        
        // Create ripple effect
        this.createRippleEffect(element);
    }

    onInteractiveLeave(element) {
        this.isHovering = false;
        
        // Reset cursor
        this.cursorDot.style.transform = this.cursorDot.style.transform.replace(/ scale\([^)]*\)/g, '');
        this.cursorOutline.style.transform = this.cursorOutline.style.transform.replace(/ scale\([^)]*\)/g, '');
        
        // Reset colors
        this.cursorDot.style.background = '';
        this.cursorOutline.style.borderColor = '';
        
        // Remove hover effect
        element.classList.remove('cursor-hover');
        
        // Remove cursor classes
        this.cursor.classList.remove('cursor-link', 'cursor-button');
    }

    onMouseDown() {
        this.cursorDot.style.transform += ' scale(0.8)';
        this.cursorOutline.style.transform += ' scale(1.2)';
        this.cursor.classList.add('cursor-click');
    }

    onMouseUp() {
        this.cursorDot.style.transform = this.cursorDot.style.transform.replace(/ scale\(0\.8\)/g, '');
        this.cursorOutline.style.transform = this.cursorOutline.style.transform.replace(/ scale\(1\.2\)/g, '');
        this.cursor.classList.remove('cursor-click');
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('cursor-ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1000;
            left: ${this.mouseX - size / 2}px;
            top: ${this.mouseY - size / 2}px;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    startAnimation() {
        const animate = () => {
            if (!this.isVisible) {
                this.animationId = requestAnimationFrame(animate);
                return;
            }
            
            // Smooth cursor movement with easing
            const easing = 0.15;
            const outlineEasing = 0.1;
            
            this.dotX += (this.mouseX - this.dotX) * easing;
            this.dotY += (this.mouseY - this.dotY) * easing;
            
            this.outlineX += (this.mouseX - this.outlineX) * outlineEasing;
            this.outlineY += (this.mouseY - this.outlineY) * outlineEasing;
            
            // Apply transforms
            if (this.cursorDot) {
                const currentTransform = this.cursorDot.style.transform;
                const baseTransform = `translate(${this.dotX}px, ${this.dotY}px)`;
                this.cursorDot.style.transform = currentTransform.includes('scale') || currentTransform.includes('rotate') 
                    ? currentTransform.replace(/translate\([^)]*\)/, baseTransform)
                    : baseTransform;
            }
            
            if (this.cursorOutline) {
                const currentTransform = this.cursorOutline.style.transform;
                const baseTransform = `translate(${this.outlineX}px, ${this.outlineY}px)`;
                this.cursorOutline.style.transform = currentTransform.includes('scale') || currentTransform.includes('rotate')
                    ? currentTransform.replace(/translate\([^)]*\)/, baseTransform)
                    : baseTransform;
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    show() {
        if (this.isTouchDevice()) return;
        
        this.isVisible = true;
        this.cursor.style.opacity = '1';
        document.body.style.cursor = 'none';
    }

    hide() {
        this.isVisible = false;
        this.cursor.style.opacity = '0';
        document.body.style.cursor = '';
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        document.body.style.cursor = '';
        
        if (this.cursor) {
            this.cursor.remove();
        }
    }
}

// CSS for cursor effects (added dynamically)
const cursorStyles = `
    .cursor-hover {
        z-index: 999 !important;
    }
    
    .cursor-link .cursor-dot {
        background: var(--accent-color) !important;
    }
    
    .cursor-button .cursor-outline {
        border-color: var(--secondary-color) !important;
        transform: scale(1.3) !important;
    }
    
    .cursor-click .cursor-dot {
        background: var(--primary-color) !important;
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    /* Hide default cursor on interactive elements */
    a, button, input, textarea, select {
        cursor: none !important;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none !important;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);
