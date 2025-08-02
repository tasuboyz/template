/**
 * =============================================================================
 * TEMPLATE SHOWCASE - LANDING PAGE JAVASCRIPT
 * Optimized for GitHub Pages
 * =============================================================================
 */

class TemplateLandingApp {
    constructor() {
        this.isLoaded = false;
        this.particles = [];
        this.observers = new Map();
        this.counters = new Map();
        this.templateData = new Map();
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadTemplateData();
        
        // GitHub Pages optimization: prevent FOUC
        document.body.classList.add('loading');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    /**
     * DOM Ready handler
     */
    onDOMReady() {
        console.log('🚀 Template Showcase - Loaded');
        
        // Remove loading class to prevent FOUC
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Render templates dynamically
        this.renderTemplates();
        
        this.initParticleSystem();
        this.initScrollReveal();
        this.initCounters();
        this.startHeroAnimations();
    }

    /**
     * Render templates dynamically
     */
    renderTemplates() {
        const templatesGrid = document.querySelector('.templates-grid');
        if (!templatesGrid) return;

        // Clear existing content
        templatesGrid.innerHTML = '';

        // Render each template
        this.templateData.forEach((template, templateId) => {
            const templateCard = this.createTemplateCard(templateId, template);
            templatesGrid.appendChild(templateCard);
        });

        // Initialize filters
        this.initTemplateFilters();

        // Update stats
        this.updateStats();
    }

    /**
     * Initialize template filters
     */
    initTemplateFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const templateCards = document.querySelectorAll('.template-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                templateCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'slideInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Create template card element
     */
    createTemplateCard(templateId, template) {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.setAttribute('data-category', template.category);

        // Generate status badges
        const statusBadges = template.status.map(status => {
            const badgeClass = status.toLowerCase().replace(/\s+/g, '-');
            const badgeText = status.charAt(0).toUpperCase() + status.slice(1);
            return `<span class="status-badge ${badgeClass}">${badgeText}</span>`;
        }).join('');

        // Generate feature tags
        const featureTags = template.tags.map(tag => 
            `<span class="feature-tag">${tag}</span>`
        ).join('');

        // Generate tech stack icons
        const techIcons = template.technologies.slice(0, 3).map(tech => {
            const iconMap = {
                'HTML5': 'fab fa-html5',
                'CSS3': 'fab fa-css3-alt',
                'JavaScript ES6+': 'fab fa-js-square',
                'PWA': 'fas fa-mobile-alt',
                'Service Worker': 'fas fa-cog'
            };
            const iconClass = iconMap[tech] || 'fab fa-js-square';
            return `<i class="${iconClass}" title="${tech}"></i>`;
        }).join('');

        // Generate rating stars
        const ratingStars = Array(template.rating).fill().map(() => 
            '<i class="fas fa-star"></i>'
        ).join('');

        card.innerHTML = `
            <div class="template-preview">
                <div class="preview-image ${template.category}-preview">
                    <i class="${template.icon}"></i>
                    <div class="preview-overlay">
                        <div class="preview-actions">
                            <a href="${template.demoUrl}" target="_blank" rel="noopener" class="btn btn-demo">
                                <i class="fas fa-external-link-alt"></i>
                                Demo Live
                            </a>
                            <button class="btn btn-info" onclick="showTemplateInfo('${templateId}')">
                                <i class="fas fa-info-circle"></i>
                                Dettagli
                            </button>
                        </div>
                    </div>
                </div>
                <div class="template-status">
                    ${statusBadges}
                </div>
            </div>
            
            <div class="template-content">
                <h3 class="template-title">${template.shortTitle}</h3>
                <p class="template-description">
                    ${template.shortDescription}
                </p>
                
                <div class="template-features">
                    ${featureTags}
                </div>
                
                <div class="template-tech">
                    <div class="tech-stack">
                        ${techIcons}
                    </div>
                    <div class="template-rating">
                        ${ratingStars}
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Update statistics based on template count
     */
    updateStats() {
        const templateCount = this.templateData.size;
        const categories = new Set();
        
        this.templateData.forEach(template => {
            categories.add(template.category);
        });

        // Update hero stats
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers[0]) statNumbers[0].setAttribute('data-count', templateCount);
        if (statNumbers[2]) statNumbers[2].setAttribute('data-count', categories.size);

        // Update footer links
        this.updateFooterLinks();
    }

    /**
     * Update footer template links
     */
    updateFooterLinks() {
        const footerTemplateSection = document.querySelector('.footer-section:nth-child(2) ul');
        if (!footerTemplateSection) return;

        footerTemplateSection.innerHTML = '';
        
        this.templateData.forEach((template, templateId) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${template.demoUrl}">${template.shortTitle}</a>`;
            footerTemplateSection.appendChild(li);
        });
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => this.onWindowLoad());
        window.addEventListener('scroll', this.debounce(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 100));

        // Navigation events
        this.setupNavigationEvents();
        
        // Modal events
        this.setupModalEvents();
        
        // Button events
        this.setupButtonEvents();
    }

    /**
     * Window Load handler
     */
    onWindowLoad() {
        this.isLoaded = true;
        this.startCounterAnimations();
    }

    /**
     * Initialize components
     */
    initializeComponents() {
        // GitHub Pages doesn't need complex initialization
        console.log('📦 Components initialized for GitHub Pages');
    }

    /**
     * Load template data for modals
     */
    loadTemplateData() {
        this.templateData.set('business', {
            title: 'Business Pro - Template Aziendale',
            description: 'Template professionale completo per aziende e studi legali con sistema di temi avanzato.',
            features: [
                'PWA (Progressive Web App) support',
                'Sistema tema chiaro/scuro automatico',
                'Animazioni fluide e performanti',
                'Service Worker per funzionalità offline',
                'Componenti modulari riutilizzabili',
                'SEO ottimizzato e accessibilità WCAG',
                'Form di contatto con validazione',
                'Portfolio filtri dinamici'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'PWA', 'Service Worker'],
            demoUrl: 'business-showcase/',
            github: 'https://github.com/username/template/tree/main/business-showcase'
        });

        this.templateData.set('creative', {
            title: 'Creative Studio - Portfolio Artistico',
            description: 'Portfolio creativo per designer, artisti e freelancer con effetti canvas avanzati.',
            features: [
                'Sistema di particelle canvas interattivo',
                'Audio manager per effetti sonori',
                'Animazioni scroll personalizzate',
                'Portfolio gallery con filtri',
                'Custom cursor animato',
                'Loading screen elaborato',
                'Skill animation con progress bars',
                'Form contatti con micro-interazioni'
            ],
            technologies: ['HTML5 Canvas', 'Web Audio API', 'CSS3', 'JavaScript ES6+', 'GSAP'],
            demoUrl: 'creative-portfolio/',
            github: 'https://github.com/username/template/tree/main/creative-portfolio'
        });

        this.templateData.set('ecommerce', {
            title: 'Elite Store - E-commerce Showcase',
            description: 'E-commerce completo con carrello funzionale e sistema di gestione prodotti.',
            features: [
                'Carrello della spesa funzionale',
                'Sistema filtri per categorie',
                'Ricerca prodotti real-time',
                'Lista dei desideri (wishlist)',
                'Modal prodotti con zoom',
                'Sistema di notifiche toast',
                'Animazioni di caricamento',
                'Newsletter subscription'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage API', 'Intersection Observer'],
            demoUrl: 'ecommerce-showcase/',
            github: 'https://github.com/username/template/tree/main/ecommerce-showcase'
        });

        this.templateData.set('restaurant', {
            title: 'Bella Vista - Ristorante Italiano',
            description: 'Template elegante per ristoranti con menu interattivo e sistema prenotazioni.',
            features: [
                'Menu digitale con filtri categoria',
                'Sistema prenotazioni con validazione',
                'Gallery fotografica interattiva',
                'Sezione chef con biografia',
                'Mappa e informazioni contatto',
                'Effetti oro e design elegante',
                'Animazioni particelle alimentari',
                'Form validation real-time'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Form Validation', 'Particle System'],
            demoUrl: 'restaurant-showcase/',
            github: 'https://github.com/username/template/tree/main/restaurant-showcase'
        });

        this.templateData.set('educational', {
            title: 'EduPro Academy - Educational Template',
            description: 'Template completo per academy e formazione con effetti WOW avanzati.',
            features: [
                'Catalogo corsi con sistema filtri',
                'Sezione docenti con profili dettagliati',
                'Slider testimonial automatico',
                'Sistema particelle hero interattivo',
                'Progress bars animate al scroll',
                'Form contatti con validazione',
                'Effetti magnetici sui bottoni',
                'Custom cursor e ripple effects',
                'Loading screen con animazioni',
                'Statistiche animate con contatori'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Particle System', 'Intersection Observer', 'WOW Effects'],
            demoUrl: 'educational-academy/',
            github: 'https://github.com/username/template/tree/main/educational-academy'
        });

        this.templateData.set('medical', {
            title: 'MediCare Pro - Medical Template',
            description: 'Template professionale per cliniche e studi medici con design rassicurante.',
            features: [
                'Design pulito e professionale',
                'Sistema appuntamenti online',
                'Sezione servizi medici dettagliata',
                'Galleria certificazioni',
                'Profili staff medico',
                'Form contatti validato',
                'Colori rassicuranti (blu/bianco)',
                'Animazioni delicate e professionali'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Form Validation', 'Responsive Design'],
            demoUrl: 'medical-healthcare/',
            github: 'https://github.com/username/template/tree/main/medical-healthcare'
        });

        this.templateData.set('realestate', {
            title: 'Estate Elite - Real Estate Template',
            description: 'Template avanzato per agenzie immobiliari con ricerca proprietà e virtual tour.',
            features: [
                'Ricerca avanzata proprietà',
                'Virtual tour integrati',
                'Mappe interattive con geolocalizzazione',
                'Calcolatori mutui integrati',
                'Gallery proprietà con slider',
                'Filtri per tipologia e prezzo',
                'Form contatti agenti',
                'Sezione testimonial clienti'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Maps API', 'Virtual Tour', 'Calculator'],
            demoUrl: 'real-estate-showcase/',
            github: 'https://github.com/username/template/tree/main/real-estate-showcase'
        });

        // Fashion & Beauty Template
        this.templateData.set('fashion', {
            title: 'Fashion Elite - Beauty & Style',
            description: 'Template elegante per brand di moda e beauty con gallery e catalogo prodotti.',
            features: [
                'Gallery prodotti con zoom',
                'Lookbook interattivo',
                'Sezione brand story',
                'Catalogo collezioni',
                'Instagram feed integration',
                'Newsletter subscription',
                'Video hero backgrounds',
                'Animazioni eleganti'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Video API', 'Social Integration'],
            demoUrl: 'fashion-beauty/',
            github: 'https://github.com/username/template/tree/main/fashion-beauty',
            icon: 'fas fa-tshirt',
            category: 'fashion',
            status: ['live', 'trending'],
            shortTitle: 'Fashion Elite',
            shortDescription: 'Template elegante per brand di moda e beauty con gallery interattiva e catalogo prodotti.',
            tags: ['Gallery', 'Lookbook', 'Video', 'Social'],
            rating: 5
        });

        // Minimal One Page Template
        this.templateData.set('minimal', {
            title: 'Minimal Pro - One Page Clean',
            description: 'Template minimalista one-page per professionisti e freelancer.',
            features: [
                'Design ultra-pulito',
                'Navigazione smooth scroll',
                'Portfolio con lightbox',
                'Form contatti semplificato',
                'Animazioni subtle',
                'Loading veloce',
                'Typography perfetta',
                'Color scheme neutro'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Smooth Scroll', 'Lightbox'],
            demoUrl: 'minimal-onepage/',
            github: 'https://github.com/username/template/tree/main/minimal-onepage',
            icon: 'fas fa-circle',
            category: 'minimal',
            status: ['live', 'clean'],
            shortTitle: 'Minimal Pro',
            shortDescription: 'Template minimalista one-page per professionisti con design ultra-pulito.',
            tags: ['Minimal', 'One Page', 'Clean', 'Portfolio'],
            rating: 5
        });

        // Music & Entertainment Template
        this.templateData.set('music', {
            title: 'Music Pro - Entertainment Hub',
            description: 'Template per artisti musicali e intrattenimento con player audio integrato.',
            features: [
                'Audio player personalizzato',
                'Discografia interattiva',
                'Tour dates e eventi',
                'Video gallery',
                'Social media integration',
                'Fan subscription',
                'Merchandise store',
                'Press kit download'
            ],
            technologies: ['HTML5 Audio', 'CSS3', 'JavaScript ES6+', 'Web Audio API', 'Media Player'],
            demoUrl: 'music-entertainment/',
            github: 'https://github.com/username/template/tree/main/music-entertainment',
            icon: 'fas fa-music',
            category: 'music',
            status: ['live', 'audio'],
            shortTitle: 'Music Pro',
            shortDescription: 'Template per artisti musicali con player audio integrato e discografia.',
            tags: ['Audio', 'Music', 'Events', 'Gallery'],
            rating: 5
        });

        // Non-Profit & Charity Template
        this.templateData.set('nonprofit', {
            title: 'CharityHeart - Non-Profit Template',
            description: 'Template per organizzazioni no-profit con sistema donazioni e volontariato.',
            features: [
                'Sistema donazioni integrate',
                'Iscrizione volontari',
                'Progetti e campagne',
                'Counter donazioni real-time',
                'Storia organizzazione',
                'Team e testimonianze',
                'Eventi e calendario',
                'Newsletter e updates'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Payment Integration', 'Forms'],
            demoUrl: 'non-profit-charity/',
            github: 'https://github.com/username/template/tree/main/non-profit-charity',
            icon: 'fas fa-heart',
            category: 'nonprofit',
            status: ['live', 'social'],
            shortTitle: 'CharityHeart',
            shortDescription: 'Template per organizzazioni no-profit con sistema donazioni e volontariato.',
            tags: ['Donazioni', 'Volontari', 'Social', 'Events'],
            rating: 5
        });

        // Sports & Fitness Template
        this.templateData.set('sports', {
            title: 'FitPro - Sports & Fitness',
            description: 'Template per palestre e centri fitness con booking e programmi allenamento.',
            features: [
                'Booking classi online',
                'Programmi allenamento',
                'Profili trainer',
                'Orari e calendario',
                'Membership plans',
                'Progress tracking',
                'Video workouts',
                'Nutrition tips'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Calendar API', 'Video Player'],
            demoUrl: 'sports-fitness/',
            github: 'https://github.com/username/template/tree/main/sports-fitness',
            icon: 'fas fa-dumbbell',
            category: 'sports',
            status: ['live', 'booking'],
            shortTitle: 'FitPro',
            shortDescription: 'Template per palestre con booking classi e programmi allenamento.',
            tags: ['Booking', 'Fitness', 'Video', 'Calendar'],
            rating: 5
        });

        // Technology & SaaS Template
        this.templateData.set('technology', {
            title: 'TechSaaS - Technology Solutions',
            description: 'Template per startup tecnologiche e SaaS con dashboard e pricing.',
            features: [
                'Hero con animazioni tech',
                'Pricing tables dinamiche',
                'Feature comparison',
                'Dashboard preview',
                'API documentation',
                'Customer testimonials',
                'Integration showcase',
                'Trial signup'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Chart.js', 'API Integration'],
            demoUrl: 'technology-saas/',
            github: 'https://github.com/username/template/tree/main/technology-saas',
            icon: 'fas fa-laptop-code',
            category: 'technology',
            status: ['live', 'saas'],
            shortTitle: 'TechSaaS',
            shortDescription: 'Template per startup tecnologiche con dashboard e pricing dinamici.',
            tags: ['SaaS', 'Tech', 'Dashboard', 'API'],
            rating: 5
        });

        // Travel & Tourism Template
        this.templateData.set('travel', {
            title: 'TravelPro - Tourism & Adventures',
            description: 'Template per agenzie di viaggio con booking e destinazioni interattive.',
            features: [
                'Booking system integrato',
                'Destinazioni interattive',
                'Photo gallery immersiva',
                'Travel packages',
                'Customer reviews',
                'Weather integration',
                'Map exploration',
                'Social sharing'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Booking API', 'Maps Integration'],
            demoUrl: 'travel-tourism/',
            github: 'https://github.com/username/template/tree/main/travel-tourism',
            icon: 'fas fa-plane',
            category: 'travel',
            status: ['live', 'booking'],
            shortTitle: 'TravelPro',
            shortDescription: 'Template per agenzie di viaggio con booking e destinazioni interattive.',
            tags: ['Booking', 'Travel', 'Maps', 'Gallery'],
            rating: 5
        });

        // Wedding & Events Template
        this.templateData.set('wedding', {
            title: 'WeddingBliss - Events & Celebrations',
            description: 'Template elegante per wedding planner ed eventi con RSVP e gallery.',
            features: [
                'RSVP system avanzato',
                'Timeline matrimonio',
                'Guest management',
                'Photo gallery romantica',
                'Location details',
                'Gift registry',
                'Music playlist',
                'Social media wall'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'RSVP System', 'Gallery'],
            demoUrl: 'wedding-events/',
            github: 'https://github.com/username/template/tree/main/wedding-events',
            icon: 'fas fa-heart',
            category: 'wedding',
            status: ['live', 'romantic'],
            shortTitle: 'WeddingBliss',
            shortDescription: 'Template elegante per wedding planner con RSVP e timeline matrimonio.',
            tags: ['RSVP', 'Wedding', 'Events', 'Gallery'],
            rating: 5
        });

        // Aggiungi proprietà mancanti ai template esistenti
        this.templateData.get('business').icon = 'fas fa-briefcase';
        this.templateData.get('business').category = 'business';
        this.templateData.get('business').status = ['live', 'new'];
        this.templateData.get('business').shortTitle = 'Business Pro';
        this.templateData.get('business').shortDescription = 'Template professionale per aziende con tema chiaro/scuro e PWA support.';
        this.templateData.get('business').tags = ['PWA', 'Dark Mode', 'Responsive', 'ES6+'];
        this.templateData.get('business').rating = 5;

        this.templateData.get('creative').icon = 'fas fa-palette';
        this.templateData.get('creative').category = 'creative';
        this.templateData.get('creative').status = ['live', 'featured'];
        this.templateData.get('creative').shortTitle = 'Creative Studio';
        this.templateData.get('creative').shortDescription = 'Portfolio creativo con effetti canvas e audio manager avanzati.';
        this.templateData.get('creative').tags = ['Canvas', 'Audio', 'Particles', 'Portfolio'];
        this.templateData.get('creative').rating = 5;

        this.templateData.get('ecommerce').icon = 'fas fa-shopping-cart';
        this.templateData.get('ecommerce').category = 'ecommerce';
        this.templateData.get('ecommerce').status = ['live', 'popular'];
        this.templateData.get('ecommerce').shortTitle = 'Elite Store';
        this.templateData.get('ecommerce').shortDescription = 'E-commerce completo con carrello funzionale e sistema notifiche.';
        this.templateData.get('ecommerce').tags = ['Carrello', 'Filtri', 'Wishlist', 'Mobile'];
        this.templateData.get('ecommerce').rating = 5;

        this.templateData.get('restaurant').icon = 'fas fa-utensils';
        this.templateData.get('restaurant').category = 'restaurant';
        this.templateData.get('restaurant').status = ['live', 'new'];
        this.templateData.get('restaurant').shortTitle = 'Bella Vista';
        this.templateData.get('restaurant').shortDescription = 'Template elegante per ristoranti con menu interattivo e prenotazioni.';
        this.templateData.get('restaurant').tags = ['Menu', 'Prenotazioni', 'Gallery', 'Elegante'];
        this.templateData.get('restaurant').rating = 5;

        this.templateData.get('educational').icon = 'fas fa-graduation-cap';
        this.templateData.get('educational').category = 'educational';
        this.templateData.get('educational').status = ['live', 'wow'];
        this.templateData.get('educational').shortTitle = 'EduPro Academy';
        this.templateData.get('educational').shortDescription = 'Template completo per academy con catalogo corsi e effetti WOW.';
        this.templateData.get('educational').tags = ['Corsi', 'Docenti', 'WOW Effects', 'Particles'];
        this.templateData.get('educational').rating = 5;

        this.templateData.get('medical').icon = 'fas fa-heartbeat';
        this.templateData.get('medical').category = 'medical';
        this.templateData.get('medical').status = ['live', 'professional'];
        this.templateData.get('medical').shortTitle = 'MediCare Pro';
        this.templateData.get('medical').shortDescription = 'Template professionale per cliniche con sistema appuntamenti.';
        this.templateData.get('medical').tags = ['Appuntamenti', 'Servizi', 'Certificazioni', 'Clean'];
        this.templateData.get('medical').rating = 5;

        this.templateData.get('realestate').icon = 'fas fa-home';
        this.templateData.get('realestate').category = 'realestate';
        this.templateData.get('realestate').status = ['live', 'premium'];
        this.templateData.get('realestate').shortTitle = 'Estate Elite';
        this.templateData.get('realestate').shortDescription = 'Template avanzato per agenzie immobiliari con virtual tour e mappe.';
        this.templateData.get('realestate').tags = ['Ricerca', 'Virtual Tour', 'Mappe', 'Calcolatori'];
        this.templateData.get('realestate').rating = 5;
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        this.updateHeader();
        this.updateBackToTop();
        this.updateActiveNavLink();
    }

    /**
     * Handle resize events
     */
    handleResize() {
        if (this.particles.length > 0) {
            this.initParticleSystem();
        }
    }

    /**
     * Update header on scroll
     */
    updateHeader() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    /**
     * Update back to top button
     */
    updateBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    }

    /**
     * Update active navigation link based on scroll
     */
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Initialize particle system for hero background
     */
    initParticleSystem() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        // Clear existing particles
        particleContainer.innerHTML = '';
        this.particles = [];

        const particleCount = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particleContainer);
        }
    }

    /**
     * Create a single particle
     */
    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${220 + Math.random() * 60}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        container.appendChild(particle);
        this.particles.push(particle);
    }

    /**
     * Initialize scroll reveal animations
     */
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealElements = document.querySelectorAll('.template-card, .feature-item, .contact-item');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(element => {
                element.classList.add('animate');
            });
        }
    }

    /**
     * Initialize counters
     */
    initCounters() {
        const counterElements = document.querySelectorAll('[data-count]');
        
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counterElements.forEach(element => {
                counterObserver.observe(element);
            });
        }
    }

    /**
     * Start hero animations
     */
    startHeroAnimations() {
        // Animations are handled by CSS, just ensure they trigger
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-actions');
        heroElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    /**
     * Start counter animations
     */
    startCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            if (this.isElementInViewport(counter)) {
                this.animateCounter(counter);
            }
        });
    }

    /**
     * Animate a counter element
     */
    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);

        element.classList.add('counting');
    }

    /**
     * Check if element is in viewport
     */
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Setup navigation events
     */
    setupNavigationEvents() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        });
    }

    /**
     * Setup modal events
     */
    setupModalEvents() {
        const modal = document.getElementById('template-modal');
        const modalClose = document.querySelector('.modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    /**
     * Setup button events
     */
    setupButtonEvents() {
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Hero action buttons
        const heroButtons = document.querySelectorAll('.hero-actions .btn[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementTop = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }

    /**
     * Show template info modal
     */
    showTemplateInfo(templateId) {
        const templateInfo = this.templateData.get(templateId);
        if (!templateInfo) return;

        const modal = document.getElementById('template-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalDemoLink = document.getElementById('modal-demo-link');

        modalTitle.textContent = templateInfo.title;
        modalDemoLink.href = templateInfo.demoUrl;

        // Build modal content
        modalBody.innerHTML = `
            <div class="template-modal-content">
                <p class="template-modal-description">${templateInfo.description}</p>
                
                <h4>🚀 Caratteristiche Principali:</h4>
                <ul class="template-modal-features">
                    ${templateInfo.features.map(feature => `<li>✨ ${feature}</li>`).join('')}
                </ul>
                
                <h4>🛠️ Tecnologie Utilizzate:</h4>
                <div class="template-modal-tech">
                    ${templateInfo.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                
                <div class="template-modal-links">
                    <a href="${templateInfo.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Demo Live
                    </a>
                    <a href="${templateInfo.github}" target="_blank" rel="noopener" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Codice Sorgente
                    </a>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            <style>
                .template-modal-content {
                    font-family: var(--font-primary);
                }
                
                .template-modal-description {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }
                
                .template-modal-content h4 {
                    color: var(--text-primary);
                    margin: 1.5rem 0 1rem 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                
                .template-modal-features {
                    list-style: none;
                    margin-bottom: 2rem;
                }
                
                .template-modal-features li {
                    margin-bottom: 0.5rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                
                .template-modal-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }
                
                .tech-badge {
                    padding: 0.25rem 0.75rem;
                    background: var(--gradient-primary);
                    color: white;
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .template-modal-links {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
            </style>
        `;

        // Inject styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'modal-styles';
            styleElement.innerHTML = modalStyles;
            document.head.appendChild(styleElement);
        }

        modal.classList.add('active');
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('template-modal');
        modal.classList.remove('active');
    }

    /**
     * Debounce utility function
     */
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
}

/**
 * Global function to show template info (called from HTML)
 */
function showTemplateInfo(templateId) {
    if (window.templateApp) {
        window.templateApp.showTemplateInfo(templateId);
    }
}

/**
 * Global function to close modal (called from HTML)
 */
function closeModal() {
    if (window.templateApp) {
        window.templateApp.closeModal();
    }
}

/**
 * Add floating animation CSS
 */
const floatingCSS = `
<style>
@keyframes float {
    0% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.8;
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: translateY(0px) rotate(360deg);
        opacity: 0.8;
    }
}

/* GitHub Pages specific optimizations */
.hero-particles {
    will-change: transform;
    contain: layout style paint;
}

/* Reduce animations on slower devices */
@media (max-width: 768px), (prefers-reduced-motion: reduce) {
    .hero-particles {
        display: none;
    }
    
    * {
        animation-duration: 0.3s !important;
    }
}
</style>
`;

// Inject floating animation CSS
document.head.insertAdjacentHTML('beforeend', floatingCSS);

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    // GitHub Pages optimization: ensure all resources are loaded
    if (document.readyState === 'complete') {
        window.templateApp = new TemplateLandingApp();
    } else {
        window.addEventListener('load', () => {
            window.templateApp = new TemplateLandingApp();
        });
    }
    
    console.log('🎯 Template Showcase - GitHub Pages Ready!');
});

/**
 * GitHub Pages Analytics (optional)
 * Uncomment and configure if you want to track usage
 */
/*
function trackTemplateView(templateName) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'template_view', {
            'template_name': templateName
        });
    }
}

function trackDemoClick(templateName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'demo_click', {
            'template_name': templateName
        });
    }
}
*/
