// ===== CONTACT FORM WITH ADVANCED VALIDATION AND EFFECTS =====
export class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.inputs = this.form?.querySelectorAll('input, textarea');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        
        this.isSubmitting = false;
        this.validationRules = {
            name: { required: true, minLength: 2 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            subject: { required: true, minLength: 3 },
            message: { required: true, minLength: 10 }
        };
        
        this.init();
    }

    async init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupInputEffects();
        
        console.log('📧 Contact Form initialized');
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
            input.addEventListener('focus', () => this.handleFieldFocus(input));
        });

        // Submit button effects
        if (this.submitBtn) {
            this.setupSubmitButtonEffects();
        }
    }

    setupFormValidation() {
        // Add validation indicators
        this.inputs.forEach(input => {
            const container = input.closest('.form-group');
            if (container) {
                // Add validation icon
                const icon = document.createElement('div');
                icon.className = 'validation-icon';
                icon.style.cssText = `
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    opacity: 0;
                    transition: all 0.3s ease;
                    pointer-events: none;
                `;
                container.style.position = 'relative';
                container.appendChild(icon);
            }
        });
    }

    setupInputEffects() {
        this.inputs.forEach(input => {
            // Floating label effect
            this.setupFloatingLabel(input);
            
            // Input glow effect
            input.addEventListener('focus', () => {
                this.createInputGlow(input);
            });
            
            // Typing effect
            input.addEventListener('input', () => {
                this.createTypingEffect(input);
            });
        });
    }

    setupFloatingLabel(input) {
        const label = input.nextElementSibling;
        if (!label || !label.matches('label')) return;

        const updateLabelPosition = () => {
            if (input.value.trim() !== '' || input === document.activeElement) {
                label.classList.add('floating');
            } else {
                label.classList.remove('floating');
            }
        };

        input.addEventListener('focus', updateLabelPosition);
        input.addEventListener('blur', updateLabelPosition);
        input.addEventListener('input', updateLabelPosition);
        
        // Initial check
        updateLabelPosition();
    }

    createInputGlow(input) {
        const container = input.closest('.form-group');
        if (!container) return;

        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            opacity: 0;
            z-index: -1;
            filter: blur(10px);
            animation: inputGlow 0.5s ease-out;
        `;
        
        container.style.position = 'relative';
        container.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 500);
    }

    createTypingEffect(input) {
        if (Math.random() < 0.3) { // Don't spam effects
            const rect = input.getBoundingClientRect();
            const particle = document.createElement('div');
            
            particle.style.cssText = `
                position: fixed;
                left: ${rect.right - 20}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 3px;
                height: 3px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: 20,
                y: -20,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    setupSubmitButtonEffects() {
        this.submitBtn.addEventListener('mouseenter', () => {
            if (!this.isSubmitting) {
                this.createButtonHoverEffect();
            }
        });

        this.submitBtn.addEventListener('click', () => {
            if (!this.isSubmitting) {
                this.createButtonClickEffect();
            }
        });
    }

    createButtonHoverEffect() {
        const rect = this.submitBtn.getBoundingClientRect();
        
        // Create hover particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 8;
            const radius = 50;
            
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: 4px;
                height: 4px;
                background: var(--secondary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(particle, {
                opacity: 0,
                duration: 0.3,
                delay: 0.3,
                onComplete: () => particle.remove()
            });
        }
    }

    createButtonClickEffect() {
        const rect = this.submitBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%);
            opacity: 1;
        `;
        
        document.body.appendChild(ripple);
        
        gsap.to(ripple, {
            width: Math.max(rect.width, rect.height) * 2,
            height: Math.max(rect.width, rect.height) * 2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
    }

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = this.validationRules[fieldName];
        const container = input.closest('.form-group');
        const icon = container?.querySelector('.validation-icon');
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Pattern validation (email)
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        // Min length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Minimum ${rules.minLength} characters required`;
        }
        
        // Update UI
        this.updateFieldValidation(input, isValid, errorMessage, icon);
        
        return isValid;
    }

    updateFieldValidation(input, isValid, errorMessage, icon) {
        const container = input.closest('.form-group');
        
        // Remove existing error
        const existingError = container?.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
            
            if (icon) {
                icon.innerHTML = '<i class="fas fa-check" style="color: var(--secondary-color);"></i>';
                icon.style.opacity = '1';
            }
            
            // Success particles
            this.createValidationParticles(input, true);
            
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
            
            if (icon) {
                icon.innerHTML = '<i class="fas fa-times" style="color: var(--primary-color);"></i>';
                icon.style.opacity = '1';
            }
            
            // Show error message
            if (errorMessage && container) {
                const errorEl = document.createElement('div');
                errorEl.className = 'error-message';
                errorEl.style.cssText = `
                    color: var(--primary-color);
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    opacity: 0;
                    transform: translateY(-10px);
                `;
                errorEl.textContent = errorMessage;
                container.appendChild(errorEl);
                
                gsap.to(errorEl, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            // Error shake animation
            gsap.to(input, {
                x: -10,
                duration: 0.1,
                yoyo: true,
                repeat: 3,
                ease: 'power2.inOut'
            });
        }
    }

    createValidationParticles(input, isValid) {
        const rect = input.getBoundingClientRect();
        const color = isValid ? 'var(--secondary-color)' : 'var(--primary-color)';
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${rect.right - 10}px;
                top: ${rect.top + rect.height / 2}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: Math.random() * 40 - 20,
                y: Math.random() * 40 - 20,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    clearFieldError(input) {
        input.classList.remove('error');
        const container = input.closest('.form-group');
        const errorEl = container?.querySelector('.error-message');
        const icon = container?.querySelector('.validation-icon');
        
        if (errorEl) {
            gsap.to(errorEl, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => errorEl.remove()
            });
        }
        
        if (icon && !input.classList.contains('valid')) {
            icon.style.opacity = '0';
        }
    }

    handleFieldFocus(input) {
        // Create focus ring effect
        const container = input.closest('.form-group');
        if (!container) return;

        const focusRing = document.createElement('div');
        focusRing.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border: 2px solid var(--primary-color);
            border-radius: inherit;
            opacity: 0;
            pointer-events: none;
            z-index: -1;
            animation: focusRing 0.3s ease-out forwards;
        `;
        
        container.appendChild(focusRing);
        
        input.addEventListener('blur', () => {
            focusRing.remove();
        }, { once: true });
    }

    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validate all fields
        let isFormValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormError('Please fix the errors above');
            return;
        }
        
        this.isSubmitting = true;
        this.showSubmittingState();
        
        try {
            // Simulate form submission
            await this.simulateSubmission();
            this.showSuccessState();
        } catch (error) {
            this.showErrorState();
        } finally {
            this.isSubmitting = false;
        }
    }

    async simulateSubmission() {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() < 0.9) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showSubmittingState() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnIcon = this.submitBtn.querySelector('.btn-icon');
        
        if (btnText) btnText.textContent = 'Sending...';
        if (btnIcon) btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        this.submitBtn.disabled = true;
        this.submitBtn.style.opacity = '0.7';
        
        // Create sending animation
        this.createSendingAnimation();
    }

    createSendingAnimation() {
        const rect = this.submitBtn.getBoundingClientRect();
        
        // Create floating email icons
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const email = document.createElement('div');
                email.innerHTML = '<i class="fas fa-envelope" style="color: var(--primary-color); font-size: 16px;"></i>';
                email.style.cssText = `
                    position: fixed;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    pointer-events: none;
                    z-index: 1000;
                    transform: translate(-50%, -50%);
                    opacity: 1;
                `;
                
                document.body.appendChild(email);
                
                gsap.to(email, {
                    x: Math.random() * 200 - 100,
                    y: -100,
                    opacity: 0,
                    rotation: 360,
                    duration: 2,
                    ease: 'power2.out',
                    onComplete: () => email.remove()
                });
            }, i * 500);
        }
    }

    showSuccessState() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnIcon = this.submitBtn.querySelector('.btn-icon');
        
        if (btnText) btnText.textContent = 'Message Sent!';
        if (btnIcon) btnIcon.innerHTML = '<i class="fas fa-check"></i>';
        
        this.submitBtn.style.background = 'var(--gradient-secondary)';
        this.submitBtn.style.opacity = '1';
        
        // Success explosion
        this.createSuccessExplosion();
        
        // Reset form after delay
        setTimeout(() => {
            this.resetForm();
        }, 3000);
        
        // Show success notification
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    createSuccessExplosion() {
        const rect = this.submitBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create celebration particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 6 + 2;
            const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 1;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 100;
            
            gsap.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity - 50,
                opacity: 0,
                scale: 0,
                duration: 2,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    showErrorState() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnIcon = this.submitBtn.querySelector('.btn-icon');
        
        if (btnText) btnText.textContent = 'Failed to Send';
        if (btnIcon) btnIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        
        this.submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff5252)';
        this.submitBtn.style.opacity = '1';
        
        // Error shake
        gsap.to(this.submitBtn, {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: 'power2.inOut'
        });
        
        // Reset after delay
        setTimeout(() => {
            this.resetForm();
        }, 3000);
        
        this.showNotification('Failed to send message. Please try again.', 'error');
    }

    resetForm() {
        this.form.reset();
        this.submitBtn.disabled = false;
        this.submitBtn.style.opacity = '1';
        this.submitBtn.style.background = '';
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnIcon = this.submitBtn.querySelector('.btn-icon');
        
        if (btnText) btnText.textContent = 'Send Message';
        if (btnIcon) btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        
        // Clear all validation states
        this.inputs.forEach(input => {
            input.classList.remove('valid', 'error');
            this.clearFieldError(input);
        });
    }

    showFormError(message) {
        // Create form-level error message
        const existingError = this.form.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.style.cssText = `
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
            font-size: 14px;
            opacity: 0;
            transform: translateY(-10px);
        `;
        errorEl.textContent = message;
        
        this.form.insertBefore(errorEl, this.form.firstChild);
        
        gsap.to(errorEl, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        setTimeout(() => {
            if (errorEl.parentNode) {
                gsap.to(errorEl, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    onComplete: () => errorEl.remove()
                });
            }
        }, 5000);
    }

    showNotification(message, type) {
        // This would typically integrate with a global notification system
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    destroy() {
        // Cleanup event listeners
        this.form?.removeEventListener('submit', this.handleSubmit);
        this.inputs?.forEach(input => {
            input.removeEventListener('blur', this.validateField);
            input.removeEventListener('input', this.clearFieldError);
            input.removeEventListener('focus', this.handleFieldFocus);
        });
        
        // Kill GSAP animations
        gsap.killTweensOf([this.form, this.submitBtn, ...this.inputs]);
    }
}

// CSS for form animations
const formStyles = `
    @keyframes inputGlow {
        0% { opacity: 0; }
        50% { opacity: 0.3; }
        100% { opacity: 0; }
    }
    
    @keyframes focusRing {
        0% { 
            opacity: 0; 
            transform: scale(0.95); 
        }
        100% { 
            opacity: 1; 
            transform: scale(1); 
        }
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group label.floating {
        top: -10px;
        font-size: 0.875rem;
        color: var(--primary-color);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.2);
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = formStyles;
document.head.appendChild(styleSheet);
