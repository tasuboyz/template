/**
 * Services Component - Interactive services showcase with filtering and animations
 * Advanced service card interactions with hover effects and modal details
 */

import { $, $$, observeElements, device, emit, logger } from '../utils.js';

class ServicesComponent {
    constructor() {
        this.servicesSection = $('#servizi');
        this.serviceCards = $$('.service-card');
        this.filterButtons = $$('.service-filter');
        this.servicesGrid = $('.services-grid');
        
        this.activeFilter = 'all';
        this.animatedCards = new WeakSet();
        this.services = this.parseServicesData();
        
        this.init();
    }
    
    init() {
        if (!this.servicesSection) {
            logger.warn('Services section not found');
            return;
        }
        
        this.setupCardAnimations();
        this.setupCardInteractions();
        this.setupFilterSystem();
        this.setupAccessibility();
        this.createServiceModals();
        
        logger.info('Services component initialized');
    }
    
    parseServicesData() {
        return this.serviceCards.map(card => ({
            element: card,
            title: card.querySelector('h3')?.textContent || '',
            description: card.querySelector('p')?.textContent || '',
            category: card.dataset.service || 'general',
            features: Array.from(card.querySelectorAll('.service-features li')).map(li => li.textContent),
            icon: card.querySelector('.service-icon i')?.className || '',
            link: card.dataset.link || '#'
        }));
    }
    
    setupCardAnimations() {
        // Intersection Observer for scroll animations
        observeElements(this.serviceCards, (card) => {
            if (this.animatedCards.has(card)) return;
            
            this.animateCardEntry(card);
            this.animatedCards.add(card);
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });
    }
    
    animateCardEntry(card) {
        if (device.prefersReducedMotion()) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            return;
        }
        
        const cardIndex = Array.from(this.serviceCards).indexOf(card);
        const delay = cardIndex * 150;
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, delay);
    }
    
    setupCardInteractions() {
        this.serviceCards.forEach(card => {
            this.setupCardHoverEffects(card);
            this.setupCardClickHandlers(card);
            this.setupCardFocusHandlers(card);
        });
    }
    
    setupCardHoverEffects(card) {
        if (device.hasTouch()) return; // Skip hover effects on touch devices
        
        const icon = card.querySelector('.service-icon');
        const overlay = card.querySelector('.service-overlay');
        
        card.addEventListener('mouseenter', () => {
            this.animateCardHover(card, true);
            this.trackCardInteraction(card, 'hover');
        });
        
        card.addEventListener('mouseleave', () => {
            this.animateCardHover(card, false);
        });
        
        // Icon rotation on hover
        if (icon) {
            card.addEventListener('mouseenter', () => {
                if (!device.prefersReducedMotion()) {
                    icon.style.transform = 'scale(1.1) rotate(360deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }
    
    animateCardHover(card, isHover) {
        if (device.prefersReducedMotion()) return;
        
        const scale = isHover ? 'scale(1.02)' : 'scale(1)';
        const translateY = isHover ? 'translateY(-10px)' : 'translateY(0)';
        const boxShadow = isHover ? '0 20px 40px rgba(0, 0, 0, 0.15)' : '';
        
        card.style.transform = `${translateY} ${scale}`;
        card.style.boxShadow = boxShadow;
        card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    setupCardClickHandlers(card) {
        const serviceButton = card.querySelector('.service-overlay .btn');
        
        if (serviceButton) {
            serviceButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openServiceModal(card);
            });
        }
        
        // Make entire card clickable
        card.addEventListener('click', () => {
            this.openServiceModal(card);
        });
        
        // Ripple effect on click
        card.addEventListener('click', (e) => {
            this.createRippleEffect(card, e);
        });
    }
    
    setupCardFocusHandlers(card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.querySelector('h3')?.textContent || 'this service'}`);
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openServiceModal(card);
            }
        });
        
        card.addEventListener('focus', () => {
            card.style.outline = '3px solid var(--primary-color)';
            card.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', () => {
            card.style.outline = '';
            card.style.outlineOffset = '';
        });
    }
    
    createRippleEffect(card, event) {
        if (device.prefersReducedMotion()) return;
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: serviceRipple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 10;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupFilterSystem() {
        if (this.filterButtons.length === 0) return;
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter || 'all';
                this.filterServices(filter);
                this.updateActiveFilterButton(button);
            });
        });
    }
    
    filterServices(filter) {
        this.activeFilter = filter;
        
        this.serviceCards.forEach((card, index) => {
            const cardCategory = card.dataset.service || 'general';
            const shouldShow = filter === 'all' || cardCategory === filter;
            
            if (shouldShow) {
                this.showServiceCard(card, index);
            } else {
                this.hideServiceCard(card);
            }
        });
        
        // Emit filter event
        emit(this.servicesSection, 'servicesfiltered', {
            filter,
            visibleCards: this.getVisibleCards().length
        });
        
        this.trackFilterUsage(filter);
    }
    
    showServiceCard(card, index) {
        if (device.prefersReducedMotion()) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            return;
        }
        
        card.style.display = 'block';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, index * 50);
    }
    
    hideServiceCard(card) {
        if (device.prefersReducedMotion()) {
            card.style.display = 'none';
            return;
        }
        
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(20px)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }
    
    updateActiveFilterButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        });
        
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    getVisibleCards() {
        return this.serviceCards.filter(card => {
            const cardCategory = card.dataset.service || 'general';
            return this.activeFilter === 'all' || cardCategory === this.activeFilter;
        });
    }
    
    setupAccessibility() {
        // Add ARIA labels to filter buttons
        this.filterButtons.forEach(button => {
            const filter = button.dataset.filter || button.textContent;
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-label', `Filter services by ${filter}`);
            button.setAttribute('aria-pressed', button.classList.contains('active'));
        });
        
        // Add section labels
        if (this.servicesGrid) {
            this.servicesGrid.setAttribute('role', 'tabpanel');
            this.servicesGrid.setAttribute('aria-label', 'Services grid');
        }
    }
    
    createServiceModals() {
        // Pre-create modal container for better performance
        this.modalContainer = document.createElement('div');
        this.modalContainer.className = 'service-modal-container';
        this.modalContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(this.modalContainer);
    }
    
    openServiceModal(card) {
        const service = this.services.find(s => s.element === card);
        if (!service) return;
        
        const modal = this.createModalContent(service);
        this.modalContainer.innerHTML = '';
        this.modalContainer.appendChild(modal);
        this.modalContainer.style.display = 'flex';
        
        // Animate modal in
        this.animateModalIn(modal);
        
        // Setup modal close handlers
        this.setupModalCloseHandlers();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = modal.querySelector('button, a, input, textarea, select');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        // Track modal open
        this.trackServiceModalOpen(service);
        
        // Emit event
        emit(this.servicesSection, 'servicemodalopen', { service });
    }
    
    createModalContent(service) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Chiudi dettagli servizio">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h2>${service.title}</h2>
                </div>
                
                <div class="modal-body">
                    <p class="service-description">${service.description}</p>
                    
                    <div class="service-features-detailed">
                        <h3>Caratteristiche Principali</h3>
                        <ul>
                            ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-benefits">
                        <h3>Vantaggi</h3>
                        <div class="benefits-grid">
                            <div class="benefit-item">
                                <i class="fas fa-rocket"></i>
                                <h4>Performance</h4>
                                <p>Soluzioni ottimizzate per massime performance</p>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-shield-alt"></i>
                                <h4>Sicurezza</h4>
                                <p>Standard di sicurezza enterprise</p>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-support"></i>
                                <h4>Supporto</h4>
                                <p>Assistenza dedicata 24/7</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-pricing">
                        <h3>Pacchetti Disponibili</h3>
                        <div class="pricing-cards">
                            <div class="pricing-card">
                                <h4>Base</h4>
                                <div class="price">€999</div>
                                <p>Perfetto per piccole aziende</p>
                            </div>
                            <div class="pricing-card featured">
                                <h4>Professional</h4>
                                <div class="price">€1999</div>
                                <p>Ideale per aziende in crescita</p>
                            </div>
                            <div class="pricing-card">
                                <h4>Enterprise</h4>
                                <div class="price">Personalizzato</div>
                                <p>Soluzioni su misura</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-primary btn-full" data-action="contact">
                        <i class="fas fa-envelope"></i>
                        Richiedi Preventivo
                    </button>
                    <button class="btn btn-outline" data-action="demo">
                        <i class="fas fa-play"></i>
                        Vedi Demo
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        this.addModalStyles(modal);
        
        // Setup modal actions
        this.setupModalActions(modal, service);
        
        return modal;
    }
    
    addModalStyles(modal) {
        const overlay = modal.querySelector('.modal-overlay');
        const content = modal.querySelector('.modal-content');
        
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;
        
        content.style.cssText = `
            position: relative;
            background: var(--card-bg);
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.9) translateY(20px);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
    }
    
    setupModalActions(modal, service) {
        const contactBtn = modal.querySelector('[data-action="contact"]');
        const demoBtn = modal.querySelector('[data-action="demo"]');
        
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                this.handleContactRequest(service);
            });
        }
        
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.handleDemoRequest(service);
            });
        }
    }
    
    animateModalIn(modal) {
        const overlay = modal.querySelector('.modal-overlay');
        const content = modal.querySelector('.modal-content');
        
        if (device.prefersReducedMotion()) {
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
            return;
        }
        
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
        }, 10);
    }
    
    setupModalCloseHandlers() {
        const closeBtn = this.modalContainer.querySelector('.modal-close');
        const overlay = this.modalContainer.querySelector('.modal-overlay');
        
        const closeModal = () => {
            this.closeServiceModal();
        };
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        // Escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        
        document.addEventListener('keydown', escapeHandler);
    }
    
    closeServiceModal() {
        const modal = this.modalContainer.querySelector('.service-modal');
        if (!modal) return;
        
        const overlay = modal.querySelector('.modal-overlay');
        const content = modal.querySelector('.modal-content');
        
        if (device.prefersReducedMotion()) {
            this.modalContainer.style.display = 'none';
            document.body.style.overflow = '';
            return;
        }
        
        overlay.style.opacity = '0';
        content.style.transform = 'scale(0.9) translateY(20px)';
        
        setTimeout(() => {
            this.modalContainer.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
        
        // Emit event
        emit(this.servicesSection, 'servicemodalclose');
    }
    
    handleContactRequest(service) {
        // Scroll to contact section with pre-filled form
        const contactSection = $('#contatti');
        if (contactSection) {
            this.closeServiceModal();
            
            setTimeout(() => {
                this.scrollToContact(service);
            }, 400);
        }
        
        this.trackServiceAction(service, 'contact_request');
    }
    
    handleDemoRequest(service) {
        // Open demo for specific service
        this.closeServiceModal();
        
        setTimeout(() => {
            this.openServiceDemo(service);
        }, 400);
        
        this.trackServiceAction(service, 'demo_request');
    }
    
    scrollToContact(service) {
        const contactSection = $('#contatti');
        const subjectField = $('#subject');
        const messageField = $('#message');
        
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Pre-fill form with service info
        if (subjectField) {
            subjectField.value = `Richiesta informazioni: ${service.title}`;
        }
        
        if (messageField) {
            messageField.value = `Sono interessato al servizio "${service.title}". Vorrei ricevere maggiori informazioni e un preventivo personalizzato.`;
        }
    }
    
    openServiceDemo(service) {
        // Create service-specific demo
        console.log(`Opening demo for ${service.title}`);
        // Implementation would depend on specific demo requirements
    }
    
    // ===== ANALYTICS & TRACKING =====
    
    trackCardInteraction(card, action) {
        const service = this.services.find(s => s.element === card);
        if (!service) return;
        
        logger.info(`Service card ${action}: ${service.title}`);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'Services',
                event_label: service.title,
                page_location: window.location.href
            });
        }
    }
    
    trackFilterUsage(filter) {
        logger.info(`Services filtered by: ${filter}`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_services', {
                event_category: 'Services',
                event_label: filter,
                value: this.getVisibleCards().length
            });
        }
    }
    
    trackServiceModalOpen(service) {
        logger.info(`Service modal opened: ${service.title}`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_service_details', {
                event_category: 'Services',
                event_label: service.title,
                page_location: window.location.href
            });
        }
    }
    
    trackServiceAction(service, action) {
        logger.info(`Service action: ${action} for ${service.title}`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'Services',
                event_label: service.title,
                page_location: window.location.href
            });
        }
    }
    
    // ===== PUBLIC API =====
    
    addService(serviceData) {
        const card = this.createServiceCard(serviceData);
        this.servicesGrid.appendChild(card);
        
        this.serviceCards = $$('.service-card');
        this.services = this.parseServicesData();
        
        this.setupCardInteractions();
        
        return card;
    }
    
    removeService(serviceTitle) {
        const service = this.services.find(s => s.title === serviceTitle);
        if (service) {
            service.element.remove();
            this.serviceCards = $$('.service-card');
            this.services = this.parseServicesData();
        }
    }
    
    createServiceCard(data) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.service = data.category || 'general';
        
        card.innerHTML = `
            <div class="service-icon">
                <i class="${data.icon}"></i>
            </div>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <ul class="service-features">
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="service-overlay">
                <button class="btn btn-light">Scopri di più</button>
            </div>
        `;
        
        return card;
    }
    
    destroy() {
        // Remove modal container
        if (this.modalContainer) {
            this.modalContainer.remove();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        logger.info('Services component destroyed');
    }
}

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes serviceRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .service-modal .modal-content {
        padding: 2rem;
    }
    
    .service-modal .modal-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .service-modal .modal-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
    }
    
    .service-modal .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .service-modal .modal-close:hover {
        background: var(--hover-color);
    }
    
    .service-modal .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .service-modal .benefit-item {
        text-align: center;
        padding: 1rem;
        background: var(--section-bg);
        border-radius: 10px;
    }
    
    .service-modal .benefit-item i {
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .service-modal .pricing-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .service-modal .pricing-card {
        text-align: center;
        padding: 1.5rem;
        border: 2px solid var(--border-color);
        border-radius: 15px;
        transition: all 0.3s ease;
    }
    
    .service-modal .pricing-card.featured {
        border-color: var(--primary-color);
        transform: scale(1.05);
    }
    
    .service-modal .pricing-card .price {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0.5rem 0;
    }
    
    .service-modal .modal-footer {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    @media (max-width: 768px) {
        .service-modal .modal-footer {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(style);

// Create and export singleton instance
export const servicesComponent = new ServicesComponent();

export default servicesComponent;
