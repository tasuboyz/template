/**
 * Footer Component - Dynamic footer with social media integration and newsletter
 * Advanced footer functionality with scroll-to-top and dynamic content
 */

import { $, $$, scrollTo, device, emit, validate, form, storage, logger } from '../utils.js';

class FooterComponent {
    constructor() {
        this.footer = $('.footer');
        this.backToTop = $('#back-to-top');
        this.socialLinks = $$('.social-links a');
        this.newsletterForm = $('#newsletter-form');
        this.contactForm = $('#contact-form');
        this.footerLinks = $$('.footer-links a');
        
        this.scrollThreshold = 300;
        this.socialStats = new Map();
        
        this.init();
    }
    
    init() {
        if (!this.footer) {
            logger.warn('Footer element not found');
            return;
        }
        
        this.setupBackToTop();
        this.setupSocialLinks();
        this.setupContactForm();
        this.setupNewsletterForm();
        this.setupFooterLinks();
        this.setupDynamicContent();
        this.setupAccessibility();
        
        logger.info('Footer component initialized');
    }
    
    setupBackToTop() {
        if (!this.backToTop) return;
        
        // Show/hide back to top button based on scroll
        this.updateBackToTopVisibility();
        window.addEventListener('scroll', () => {
            this.updateBackToTopVisibility();
        }, { passive: true });
        
        // Click handler
        this.backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Keyboard support
        this.backToTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }
    
    updateBackToTopVisibility() {
        const scrollY = window.pageYOffset;
        const isVisible = scrollY > this.scrollThreshold;
        
        if (isVisible) {
            this.backToTop.classList.add('visible');
            this.backToTop.setAttribute('aria-hidden', 'false');
        } else {
            this.backToTop.classList.remove('visible');
            this.backToTop.setAttribute('aria-hidden', 'true');
        }
    }
    
    scrollToTop() {
        if (device.prefersReducedMotion()) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Add visual feedback
        this.animateBackToTopClick();
        
        // Track usage
        this.trackBackToTopUsage();
    }
    
    animateBackToTopClick() {
        if (device.prefersReducedMotion()) return;
        
        this.backToTop.style.transform = 'scale(0.9)';
        this.backToTop.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            this.backToTop.style.transform = 'scale(1)';
        }, 100);
    }
    
    setupSocialLinks() {
        this.socialLinks.forEach(link => {
            // Add hover effects
            this.setupSocialLinkHover(link);
            
            // Track clicks
            link.addEventListener('click', (e) => {
                this.trackSocialClick(link);
            });
            
            // Add proper ARIA labels
            this.enhanceSocialAccessibility(link);
        });
        
        // Add social proof indicators
        this.addSocialProofIndicators();
    }
    
    setupSocialLinkHover(link) {
        if (device.hasTouch()) return; // Skip hover on touch devices
        
        const icon = link.querySelector('i');
        if (!icon) return;
        
        link.addEventListener('mouseenter', () => {
            if (!device.prefersReducedMotion()) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    enhanceSocialAccessibility(link) {
        const href = link.getAttribute('href') || '';
        let platform = 'Social Media';
        
        if (href.includes('facebook')) platform = 'Facebook';
        else if (href.includes('twitter')) platform = 'Twitter';
        else if (href.includes('linkedin')) platform = 'LinkedIn';
        else if (href.includes('instagram')) platform = 'Instagram';
        else if (href.includes('youtube')) platform = 'YouTube';
        
        link.setAttribute('aria-label', `Follow us on ${platform} (opens in new tab)`);
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    }
    
    addSocialProofIndicators() {
        // Add follower count indicators (mock data for demo)
        const socialData = {
            facebook: { followers: '2.5K', platform: 'Facebook' },
            twitter: { followers: '1.8K', platform: 'Twitter' },
            linkedin: { followers: '3.2K', platform: 'LinkedIn' },
            instagram: { followers: '4.1K', platform: 'Instagram' }
        };
        
        this.socialLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            let platform = null;
            
            Object.keys(socialData).forEach(key => {
                if (href.includes(key)) {
                    platform = key;
                }
            });
            
            if (platform && socialData[platform]) {
                this.addFollowerCount(link, socialData[platform]);
            }
        });
    }
    
    addFollowerCount(link, data) {
        const tooltip = document.createElement('div');
        tooltip.className = 'social-tooltip';
        tooltip.textContent = `${data.followers} followers`;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-5px);
            background: var(--card-bg);
            color: var(--text-color);
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 100;
        `;
        
        link.style.position = 'relative';
        link.appendChild(tooltip);
        
        link.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        link.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        });
    }
    
    setupContactForm() {
        if (!this.contactForm) return;
        
        const formValidator = this.createFormValidator();
        
        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleContactFormSubmit(formValidator);
        });
        
        // Real-time validation
        this.setupRealTimeValidation();
        
        // Auto-save form data
        this.setupFormAutoSave();
    }
    
    createFormValidator() {
        return {
            name: [
                (value) => validate.required(value) || 'Il nome è obbligatorio',
                (value) => validate.minLength(value, 2) || 'Il nome deve essere di almeno 2 caratteri'
            ],
            email: [
                (value) => validate.required(value) || 'L\'email è obbligatoria',
                (value) => validate.email(value) || 'Inserisci un\'email valida'
            ],
            message: [
                (value) => validate.required(value) || 'Il messaggio è obbligatorio',
                (value) => validate.minLength(value, 10) || 'Il messaggio deve essere di almeno 10 caratteri'
            ]
        };
    }
    
    async handleContactFormSubmit(validator) {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        this.setFormLoading(submitButton, true);
        
        // Validate form
        const validation = form.validate(this.contactForm, validator);
        
        if (!validation.isValid) {
            this.showFormErrors(validation.errors);
            this.setFormLoading(submitButton, false, originalText);
            return;
        }
        
        try {
            // Simulate form submission
            await this.submitContactForm(validation.data);
            
            // Show success message
            this.showFormSuccess();
            
            // Reset form
            this.contactForm.reset();
            this.clearFormErrors();
            
            // Track successful submission
            this.trackFormSubmission('contact', validation.data);
            
        } catch (error) {
            logger.error('Contact form submission failed:', error);
            this.showFormError('Si è verificato un errore. Riprova più tardi.');
        } finally {
            this.setFormLoading(submitButton, false, originalText);
        }
    }
    
    async submitContactForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock success/failure based on email
                if (data.email.includes('error')) {
                    reject(new Error('Submission failed'));
                } else {
                    resolve({ success: true, id: Date.now() });
                }
            }, 2000);
        });
    }
    
    setFormLoading(button, isLoading, originalText = '') {
        if (isLoading) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            button.disabled = true;
        } else {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }
    
    showFormErrors(errors) {
        this.clearFormErrors();
        
        Object.entries(errors).forEach(([field, fieldErrors]) => {
            const input = this.contactForm.querySelector(`[name="${field}"]`);
            if (input) {
                this.addFieldError(input, fieldErrors[0]);
            }
        });
    }
    
    addFieldError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        input.parentNode.appendChild(errorElement);
    }
    
    clearFormErrors() {
        const errorElements = this.contactForm.querySelectorAll('.field-error');
        const errorInputs = this.contactForm.querySelectorAll('.error');
        
        errorElements.forEach(el => el.remove());
        errorInputs.forEach(input => input.classList.remove('error'));
    }
    
    showFormSuccess() {
        const message = this.createMessageElement(
            'Messaggio inviato con successo! Ti risponderemo presto.',
            'success'
        );
        
        this.contactForm.parentNode.insertBefore(message, this.contactForm);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    showFormError(message) {
        const errorElement = this.createMessageElement(message, 'error');
        
        this.contactForm.parentNode.insertBefore(errorElement, this.contactForm);
        
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
    
    createMessageElement(text, type) {
        const element = document.createElement('div');
        element.className = `form-message form-message-${type}`;
        element.textContent = text;
        element.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' ? 
                'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' :
                'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
            }
        `;
        
        return element;
    }
    
    setupRealTimeValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Clear error on input
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorElement = input.parentNode.querySelector('.field-error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        });
    }
    
    validateField(input) {
        const fieldName = input.name;
        const validator = this.createFormValidator()[fieldName];
        
        if (!validator) return;
        
        const value = input.value;
        const errors = [];
        
        validator.forEach(validatorFn => {
            const result = validatorFn(value);
            if (result !== true) {
                errors.push(result);
            }
        });
        
        if (errors.length > 0) {
            this.addFieldError(input, errors[0]);
        }
    }
    
    setupFormAutoSave() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        const formId = 'contact-form-data';
        
        // Load saved data
        const savedData = storage.get(formId, {});
        Object.entries(savedData).forEach(([name, value]) => {
            const input = this.contactForm.querySelector(`[name="${name}"]`);
            if (input && value) {
                input.value = value;
            }
        });
        
        // Save on input
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = form.serialize(this.contactForm);
                storage.set(formId, formData);
            });
        });
        
        // Clear saved data on successful submit
        this.contactForm.addEventListener('submit', () => {
            storage.remove(formId);
        });
    }
    
    setupNewsletterForm() {
        if (!this.newsletterForm) return;
        
        this.newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleNewsletterSubmit();
        });
    }
    
    async handleNewsletterSubmit() {
        const emailInput = this.newsletterForm.querySelector('input[type="email"]');
        const submitButton = this.newsletterForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        // Validate email
        if (!validate.email(email)) {
            this.showNewsletterMessage('Inserisci un\'email valida', 'error');
            return;
        }
        
        // Show loading
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        try {
            // Simulate newsletter subscription
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success
            this.showNewsletterMessage('Iscrizione completata con successo!', 'success');
            emailInput.value = '';
            
            // Track subscription
            this.trackNewsletterSubscription(email);
            
        } catch (error) {
            this.showNewsletterMessage('Errore durante l\'iscrizione. Riprova.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    showNewsletterMessage(text, type) {
        // Remove existing message
        const existingMessage = this.newsletterForm.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `newsletter-message newsletter-${type}`;
        message.textContent = text;
        message.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            text-align: center;
            ${type === 'success' ? 
                'background: #dcfce7; color: #166534;' :
                'background: #fef2f2; color: #dc2626;'
            }
        `;
        
        this.newsletterForm.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 4000);
    }
    
    setupFooterLinks() {
        this.footerLinks.forEach(link => {
            // Add smooth scrolling for internal links
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = $(`#${targetId}`);
                    
                    if (targetElement) {
                        scrollTo(targetElement);
                    }
                });
            }
            
            // Track external link clicks
            if (link.getAttribute('href')?.startsWith('http')) {
                link.addEventListener('click', () => {
                    this.trackExternalLinkClick(link);
                });
            }
        });
    }
    
    setupDynamicContent() {
        this.updateCopyrightYear();
        this.addVersionInfo();
        this.updateCompanyInfo();
    }
    
    updateCopyrightYear() {
        const copyrightElement = this.footer.querySelector('.footer-bottom p');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${currentYear}`
            );
        }
    }
    
    addVersionInfo() {
        // In ambiente browser process.env non esiste, quindi mostriamo sempre la versione
        const versionInfo = document.createElement('div');
        versionInfo.className = 'version-info';
        versionInfo.textContent = `v${typeof VERSION !== 'undefined' ? VERSION : '1.0.0'} - Built ${new Date().toLocaleDateString()}`;
        versionInfo.style.cssText = `
            text-align: center;
            font-size: 0.75rem;
            opacity: 0.5;
            margin-top: 0.5rem;
        `;
        this.footer.appendChild(versionInfo);
    }
    
    updateCompanyInfo() {
        // Update company info based on configuration or API
        const companyInfo = {
            name: 'BusinessPro',
            email: 'info@businesspro.it',
            phone: '+39 123 456 7890',
            address: 'Via Roma 123, Milano'
        };
        
        // Update email links
        const emailLinks = this.footer.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${companyInfo.email}`;
            if (link.textContent.includes('@')) {
                link.textContent = companyInfo.email;
            }
        });
        
        // Update phone links
        const phoneLinks = this.footer.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.href = `tel:${companyInfo.phone}`;
            if (link.textContent.includes('+') || link.textContent.includes('123')) {
                link.textContent = companyInfo.phone;
            }
        });
    }
    
    setupAccessibility() {
        // Add skip link to footer
        const skipLink = document.createElement('a');
        skipLink.href = '#footer';
        skipLink.textContent = 'Skip to footer';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        this.footer.id = 'footer';
        this.footer.setAttribute('role', 'contentinfo');
        
        // Improve form accessibility
        if (this.contactForm) {
            this.contactForm.setAttribute('novalidate', '');
            
            const inputs = this.contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const label = this.contactForm.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    input.setAttribute('aria-describedby', `${input.id}-help`);
                }
            });
        }
    }
    
    // ===== ANALYTICS & TRACKING =====
    
    trackSocialClick(link) {
        const href = link.getAttribute('href') || '';
        let platform = 'unknown';
        
        if (href.includes('facebook')) platform = 'facebook';
        else if (href.includes('twitter')) platform = 'twitter';
        else if (href.includes('linkedin')) platform = 'linkedin';
        else if (href.includes('instagram')) platform = 'instagram';
        
        logger.info(`Social link clicked: ${platform}`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                event_category: 'Footer',
                event_label: platform,
                page_location: window.location.href
            });
        }
    }
    
    trackBackToTopUsage() {
        logger.info('Back to top clicked');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'back_to_top', {
                event_category: 'Footer',
                page_location: window.location.href,
                scroll_depth: Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100)
            });
        }
    }
    
    trackFormSubmission(formType, data) {
        logger.info(`Form submitted: ${formType}`, data);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Footer',
                event_label: formType,
                page_location: window.location.href
            });
        }
    }
    
    trackNewsletterSubscription(email) {
        logger.info('Newsletter subscription:', email);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                event_category: 'Footer',
                page_location: window.location.href
            });
        }
    }
    
    trackExternalLinkClick(link) {
        const href = link.getAttribute('href');
        logger.info('External link clicked:', href);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link', {
                event_category: 'Footer',
                event_label: href,
                page_location: window.location.href
            });
        }
    }
    
    // ===== PUBLIC API =====
    
    addSocialLink(platform, url, icon) {
        const socialLinks = this.footer.querySelector('.social-links');
        if (!socialLinks) return;
        
        const link = document.createElement('a');
        link.href = url;
        link.innerHTML = `<i class="${icon}"></i>`;
        link.setAttribute('aria-label', `Follow us on ${platform}`);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        socialLinks.appendChild(link);
        
        // Setup interactions for new link
        this.setupSocialLinkHover(link);
        this.enhanceSocialAccessibility(link);
        
        return link;
    }
    
    updateContactInfo(info) {
        if (info.email) {
            const emailElements = this.footer.querySelectorAll('a[href^="mailto:"]');
            emailElements.forEach(el => {
                el.href = `mailto:${info.email}`;
                if (el.textContent.includes('@')) {
                    el.textContent = info.email;
                }
            });
        }
        
        if (info.phone) {
            const phoneElements = this.footer.querySelectorAll('a[href^="tel:"]');
            phoneElements.forEach(el => {
                el.href = `tel:${info.phone}`;
                if (el.textContent.includes('+')) {
                    el.textContent = info.phone;
                }
            });
        }
        
        if (info.address) {
            const addressElements = this.footer.querySelectorAll('.contact-method:last-child p');
            if (addressElements.length > 0) {
                addressElements[0].textContent = info.address;
            }
        }
    }
    
    showNewsletterSignup() {
        if (this.newsletterForm) {
            this.newsletterForm.scrollIntoView({ behavior: 'smooth' });
            const emailInput = this.newsletterForm.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.focus();
            }
        }
    }
    
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.updateBackToTopVisibility);
        
        // Clear auto-saved form data
        storage.remove('contact-form-data');
        
        logger.info('Footer component destroyed');
    }
}

// Create and export singleton instance
export const footerComponent = new FooterComponent();

export default footerComponent;
