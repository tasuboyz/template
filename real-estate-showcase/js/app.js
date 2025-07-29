// Real Estate Showcase JavaScript - ES6
class RealEstateApp {
    constructor() {
        this.properties = [];
        this.filteredProperties = [];
        this.currentFilter = 'all';
        this.searchMode = 'buy';
        this.isWOWInitialized = false;
        
        this.init();
    }

    init() {
        this.initializeWOW();
        this.setupEventListeners();
        this.generateProperties();
        this.renderProperties();
        this.initNavigation();
        this.initMortgageCalculator();
        this.initVirtualTour();
        this.initContactForm();
        this.initStatsCounter();
        this.initMapInteractions();
    }

    // Initialize WOW.js-like animation system
    initializeWOW() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationClass = element.dataset.wow || 'fadeInUp';
                    const delay = element.dataset.wowDelay || '0s';
                    
                    element.style.animationDelay = delay;
                    element.classList.add(animationClass);
                    element.style.visibility = 'visible';
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.wow').forEach(el => {
            observer.observe(el);
        });

        this.isWOWInitialized = true;
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('nav-toggle')?.addEventListener('click', this.toggleMobileMenu);
        
        // Search functionality
        document.getElementById('searchBtn')?.addEventListener('click', this.handleSearch.bind(this));
        document.querySelectorAll('.search-tab').forEach(tab => {
            tab.addEventListener('click', this.handleSearchModeChange.bind(this));
        });

        // Property filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handlePropertyFilter.bind(this));
        });

        // Hero buttons
        document.getElementById('exploreBtn')?.addEventListener('click', this.scrollToProperties);
        document.getElementById('virtualTourBtn')?.addEventListener('click', this.openVirtualTour.bind(this));

        // Modal close
        document.querySelector('.modal-close')?.addEventListener('click', this.closeModal.bind(this));
        document.getElementById('virtualTourModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'virtualTourModal') this.closeModal();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll);
        });

        // Window scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Navigation Functions
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    handleResize() {
        // Handle responsive adjustments
        if (window.innerWidth > 768) {
            document.getElementById('nav-menu')?.classList.remove('active');
            document.getElementById('nav-toggle')?.classList.remove('active');
        }
    }

    initNavigation() {
        // Initialize navigation with current page state
        this.handleScroll();
    }

    // Property Data and Management
    generateProperties() {
        this.properties = [
            {
                id: 1,
                title: 'Villa Moderna con Piscina',
                location: 'Milano, Brera',
                price: 850000,
                type: 'villa',
                bedrooms: 4,
                bathrooms: 3,
                area: 300,
                badge: 'Premium',
                featured: true
            },
            {
                id: 2,
                title: 'Appartamento Centro Storico',
                location: 'Roma, Trastevere',
                price: 320000,
                type: 'apartment',
                bedrooms: 2,
                bathrooms: 2,
                area: 85,
                badge: 'Nuovo',
                featured: true
            },
            {
                id: 3,
                title: 'Casa Bifamiliare con Giardino',
                location: 'Firenze, Oltrarno',
                price: 450000,
                type: 'house',
                bedrooms: 3,
                bathrooms: 2,
                area: 150,
                badge: 'Ottimo Investimento',
                featured: true
            },
            {
                id: 4,
                title: 'Ufficio Open Space',
                location: 'Milano, Porta Nuova',
                price: 680000,
                type: 'office',
                bedrooms: 0,
                bathrooms: 2,
                area: 120,
                badge: 'Business',
                featured: false
            },
            {
                id: 5,
                title: 'Attico con Terrazza',
                location: 'Napoli, Chiaia',
                price: 720000,
                type: 'apartment',
                bedrooms: 3,
                bathrooms: 2,
                area: 110,
                badge: 'Vista Mare',
                featured: true
            },
            {
                id: 6,
                title: 'Villa Storica Restaurata',
                location: 'Verona, Centro',
                price: 1200000,
                type: 'villa',
                bedrooms: 5,
                bathrooms: 4,
                area: 400,
                badge: 'Lusso',
                featured: true
            }
        ];
        
        this.filteredProperties = [...this.properties];
    }

    renderProperties() {
        const container = document.getElementById('propertiesGrid');
        if (!container) return;

        container.innerHTML = '';
        
        this.filteredProperties.forEach((property, index) => {
            const propertyCard = this.createPropertyCard(property, index);
            container.appendChild(propertyCard);
        });

        // Re-initialize WOW for new elements
        if (this.isWOWInitialized) {
            setTimeout(() => {
                container.querySelectorAll('.property-card').forEach((card, index) => {
                    card.classList.add('wow', 'fadeInUp');
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.style.visibility = 'visible';
                    card.classList.add('fadeInUp');
                });
            }, 100);
        }
    }

    createPropertyCard(property, index) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.dataset.type = property.type;
        
        card.innerHTML = `
            <div class="property-image">
                <div class="property-badge">${property.badge}</div>
                <div class="property-price">€ ${property.price.toLocaleString()}</div>
            </div>
            <div class="property-content">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                <div class="property-features">
                    ${property.bedrooms > 0 ? `
                        <div class="feature-item">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms} Camere</span>
                        </div>
                    ` : ''}
                    <div class="feature-item">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} Bagni</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.area} m²</span>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="action-btn" onclick="realEstateApp.viewProperty(${property.id})">
                        <i class="fas fa-eye"></i> Visualizza
                    </button>
                    <button class="action-btn" onclick="realEstateApp.openVirtualTour(${property.id})">
                        <i class="fas fa-vr-cardboard"></i> Tour VR
                    </button>
                    <button class="action-btn" onclick="realEstateApp.contactForProperty(${property.id})">
                        <i class="fas fa-phone"></i> Contatta
                    </button>
                </div>
            </div>
        `;

        // Add click event for card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn')) {
                this.viewProperty(property.id);
            }
        });

        return card;
    }

    // Property Actions
    viewProperty(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (property) {
            console.log('Viewing property:', property);
            // Here you would typically open a detailed view or navigate to property page
            this.showNotification(`Visualizzazione ${property.title}`, 'info');
        }
    }

    contactForProperty(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (property) {
            // Scroll to contact form and pre-fill with property info
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            const messageField = document.querySelector('#contactForm textarea');
            if (messageField) {
                messageField.value = `Sono interessato alla proprietà: ${property.title} - ${property.location}`;
            }
            this.showNotification('Scorri in basso per compilare il modulo di contatto', 'info');
        }
    }

    // Search and Filter Functions
    handleSearch() {
        const location = document.getElementById('searchLocation')?.value || '';
        const propertyType = document.getElementById('propertyType')?.value || '';
        const priceRange = document.getElementById('priceRange')?.value || '';

        console.log('Search parameters:', { location, propertyType, priceRange, mode: this.searchMode });
        
        // Apply filters
        this.filteredProperties = this.properties.filter(property => {
            let matches = true;

            if (propertyType && property.type !== propertyType) {
                matches = false;
            }

            if (priceRange) {
                const [min, max] = this.parsePriceRange(priceRange);
                if (property.price < min || (max && property.price > max)) {
                    matches = false;
                }
            }

            if (location) {
                matches = matches && property.location.toLowerCase().includes(location.toLowerCase());
            }

            return matches;
        });

        this.renderProperties();
        this.scrollToProperties();
        this.showNotification(`Trovate ${this.filteredProperties.length} proprietà`, 'success');
    }

    parsePriceRange(range) {
        const ranges = {
            '0-200000': [0, 200000],
            '200000-500000': [200000, 500000],
            '500000-1000000': [500000, 1000000],
            '1000000+': [1000000, null]
        };
        return ranges[range] || [0, null];
    }

    handleSearchModeChange(e) {
        document.querySelectorAll('.search-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        this.searchMode = e.target.dataset.type;
        console.log('Search mode changed to:', this.searchMode);
    }

    handlePropertyFilter(e) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;

        if (filter === 'all') {
            this.filteredProperties = [...this.properties];
        } else {
            this.filteredProperties = this.properties.filter(property => property.type === filter);
        }

        this.renderProperties();
    }

    scrollToProperties() {
        document.querySelector('#properties')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Mortgage Calculator
    initMortgageCalculator() {
        const loanAmount = document.getElementById('loanAmount');
        const loanRange = document.getElementById('loanRange');
        const interestRate = document.getElementById('interestRate');
        const rateRange = document.getElementById('rateRange');
        const loanTerm = document.getElementById('loanTerm');
        const termRange = document.getElementById('termRange');
        const calculateBtn = document.getElementById('calculateBtn');

        // Sync inputs with range sliders
        this.syncInputs(loanAmount, loanRange);
        this.syncInputs(interestRate, rateRange);
        this.syncInputs(loanTerm, termRange);

        // Calculate on button click or input change
        calculateBtn?.addEventListener('click', this.calculateMortgage.bind(this));
        [loanAmount, interestRate, loanTerm].forEach(input => {
            input?.addEventListener('input', this.calculateMortgage.bind(this));
        });

        // Initial calculation
        this.calculateMortgage();
    }

    syncInputs(input, range) {
        if (!input || !range) return;

        input.addEventListener('input', () => {
            range.value = input.value;
        });

        range.addEventListener('input', () => {
            input.value = range.value;
            this.calculateMortgage();
        });
    }

    calculateMortgage() {
        const amount = parseFloat(document.getElementById('loanAmount')?.value) || 300000;
        const rate = parseFloat(document.getElementById('interestRate')?.value) || 3.5;
        const term = parseFloat(document.getElementById('loanTerm')?.value) || 25;

        const monthlyRate = rate / 100 / 12;
        const numPayments = term * 12;
        
        const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                              (Math.pow(1 + monthlyRate, numPayments) - 1);
        
        const totalPayment = monthlyPayment * numPayments;
        const totalInterest = totalPayment - amount;

        // Update display
        document.getElementById('monthlyPayment').textContent = `€ ${monthlyPayment.toLocaleString('it-IT', { maximumFractionDigits: 0 })}`;
        document.getElementById('totalInterest').textContent = `€ ${totalInterest.toLocaleString('it-IT', { maximumFractionDigits: 0 })}`;
        document.getElementById('totalPayment').textContent = `€ ${totalPayment.toLocaleString('it-IT', { maximumFractionDigits: 0 })}`;

        // Update chart
        this.updatePaymentChart(amount, totalInterest);
    }

    updatePaymentChart(principal, interest) {
        const canvas = document.getElementById('chartCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate angles
        const total = principal + interest;
        const principalAngle = (principal / total) * 2 * Math.PI;
        const interestAngle = (interest / total) * 2 * Math.PI;

        // Draw principal arc
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, principalAngle);
        ctx.fillStyle = '#667eea';
        ctx.fill();

        // Draw interest arc
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, principalAngle, principalAngle + interestAngle);
        ctx.fillStyle = '#f093fb';
        ctx.fill();

        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText('Capitale', centerX, centerY - 40);
        ctx.fillText('Interessi', centerX, centerY + 50);
    }

    // Virtual Tour
    initVirtualTour() {
        const tourControls = document.querySelectorAll('.tour-btn');
        tourControls.forEach(btn => {
            btn.addEventListener('click', this.handleTourControl.bind(this));
        });
    }

    openVirtualTour(propertyId = null) {
        const modal = document.getElementById('virtualTourModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            if (propertyId) {
                const property = this.properties.find(p => p.id === propertyId);
                if (property) {
                    console.log('Opening virtual tour for:', property.title);
                }
            }
        }
    }

    closeModal() {
        const modal = document.getElementById('virtualTourModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    handleTourControl(e) {
        const action = e.target.closest('.tour-btn').id;
        console.log('Tour control action:', action);
        
        switch (action) {
            case 'tourPrev':
                this.showNotification('Vista precedente', 'info');
                break;
            case 'tourNext':
                this.showNotification('Vista successiva', 'info');
                break;
            case 'tourFullscreen':
                this.toggleFullscreen();
                break;
        }
    }

    toggleFullscreen() {
        const tourContainer = document.querySelector('.virtual-tour-container');
        if (!document.fullscreenElement) {
            tourContainer.requestFullscreen?.() || 
            tourContainer.webkitRequestFullscreen?.() || 
            tourContainer.msRequestFullscreen?.();
        } else {
            document.exitFullscreen?.() || 
            document.webkitExitFullscreen?.() || 
            document.msExitFullscreen?.();
        }
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        form?.addEventListener('submit', this.handleContactSubmit.bind(this));
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Contact form submitted:', data);
        
        // Simulate form submission
        this.showNotification('Messaggio inviato con successo! Ti contatteremo presto.', 'success');
        e.target.reset();
    }

    // Statistics Counter
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.classList.add('counting');
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Map Interactions
    initMapInteractions() {
        const mapMarkers = document.querySelectorAll('.map-marker');
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', this.handleMarkerClick.bind(this));
        });
    }

    handleMarkerClick(e) {
        const propertyId = parseInt(e.currentTarget.dataset.property);
        const property = this.properties.find(p => p.id === propertyId);
        
        if (property) {
            this.showNotification(`Proprietà selezionata: ${property.title}`, 'info');
            
            // Simulate property details popup
            setTimeout(() => {
                if (confirm(`Vuoi visualizzare i dettagli di ${property.title}?`)) {
                    this.viewProperty(propertyId);
                }
            }, 500);
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Performance optimization
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
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.realEstateApp = new RealEstateApp();
    console.log('Real Estate Showcase initialized successfully!');
});

// Additional utility functions for global access
const showPropertyDetails = (propertyId) => {
    window.realEstateApp?.viewProperty(propertyId);
};

const openVirtualTour = (propertyId = null) => {
    window.realEstateApp?.openVirtualTour(propertyId);
};

const contactProperty = (propertyId) => {
    window.realEstateApp?.contactForProperty(propertyId);
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealEstateApp;
}
