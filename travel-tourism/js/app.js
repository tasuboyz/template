// ===== TRAVEL TOURISM TEMPLATE - MAIN JAVASCRIPT =====
// Template 10: Travel/Tourism with WOW Effects
// JavaScript ES6+ - Complete Interactive Experience

class TravelApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.startAnimations();
    }

    // ===== INITIALIZATION =====
    init() {
        this.elements = {
            loadingScreen: document.getElementById('loadingScreen'),
            navbar: document.getElementById('navbar'),
            hamburger: document.getElementById('hamburger'),
            navMenu: document.getElementById('navMenu'),
            heroTitle: document.querySelector('.hero-title'),
            scrollIndicator: document.getElementById('scrollIndicator'),
            exploreBtn: document.getElementById('exploreBtn'),
            watchVideoBtn: document.getElementById('watchVideoBtn'),
            destinationsGrid: document.getElementById('destinationsGrid'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            exploreBtns: document.querySelectorAll('.explore-btn'),
            experienceCards: document.querySelectorAll('.experience-card'),
            expIndicators: document.querySelectorAll('.indicator'),
            expPrev: document.getElementById('expPrev'),
            expNext: document.getElementById('expNext'),
            bookingForm: document.getElementById('bookingForm'),
            backToTop: document.getElementById('backToTop'),
            destinationModal: document.getElementById('destinationModal'),
            videoModal: document.getElementById('videoModal'),
            closeModal: document.getElementById('closeModal'),
            closeVideoModal: document.getElementById('closeVideoModal'),
            particleCanvas: document.getElementById('particleCanvas')
        };

        this.state = {
            currentExperience: 0,
            isScrolling: false,
            particleSystem: null,
            parallaxElements: [],
            countersAnimated: false
        };

        this.destinationData = {
            svizzera: {
                title: "Svizzera Magica",
                price: "€1,299",
                duration: "7 Giorni",
                location: "Zurigo, Interlaken, Lucerna",
                description: "Immergiti nella bellezza delle Alpi svizzere con questo tour completo che ti porterà attraverso i paesaggi più spettacolari d'Europa.",
                highlights: [
                    "Escursione al Matterhorn",
                    "Giro in treno panoramico",
                    "Visita ai castelli medievali",
                    "Degustazione di formaggi locali",
                    "Navigazione sui laghi alpini"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo a Zurigo - City tour" },
                    { day: 2, activity: "Zurigo - Lucerna via Lago dei Quattro Cantoni" },
                    { day: 3, activity: "Lucerna - Interlaken - Jungfraujoch" },
                    { day: 4, activity: "Interlaken - Attività outdoor" },
                    { day: 5, activity: "Interlaken - Zermatt - Matterhorn" },
                    { day: 6, activity: "Zermatt - Berna" },
                    { day: 7, activity: "Berna - Zurigo - Partenza" }
                ]
            },
            giappone: {
                title: "Giappone Mistico",
                price: "€2,199",
                duration: "10 Giorni",
                location: "Tokyo, Kyoto, Osaka",
                description: "Un viaggio attraverso la cultura millenaria del Giappone, dalle metropoli futuristiche ai templi tradizionali.",
                highlights: [
                    "Cerimonia del tè tradizionale",
                    "Visita ai templi di Kyoto",
                    "Esperienza Ryokan",
                    "Mercato del pesce di Tsukiji",
                    "Monte Fuji e Hakone"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo a Tokyo - Shibuya e Harajuku" },
                    { day: 2, activity: "Tokyo - Palazzo Imperiale e Asakusa" },
                    { day: 3, activity: "Tokyo - Tsukiji e Ginza" },
                    { day: 4, activity: "Tokyo - Monte Fuji e Hakone" },
                    { day: 5, activity: "Hakone - Kyoto via Shinkansen" },
                    { day: 6, activity: "Kyoto - Templi e Bamboo Forest" },
                    { day: 7, activity: "Kyoto - Nara (gita giornaliera)" },
                    { day: 8, activity: "Kyoto - Osaka" },
                    { day: 9, activity: "Osaka - Castello e Dotonbori" },
                    { day: 10, activity: "Osaka - Partenza" }
                ]
            },
            kenya: {
                title: "Safari Keniota",
                price: "€3,499",
                duration: "12 Giorni",
                location: "Masai Mara, Amboseli",
                description: "Un'avventura selvaggia nel cuore dell'Africa, alla scoperta dei Big Five e delle tribù Masai.",
                highlights: [
                    "Safari nei parchi nazionali",
                    "Incontro con i Big Five",
                    "Villaggio Masai tradizionale",
                    "Alba in mongolfiera",
                    "Orfanotrofio degli elefanti"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo a Nairobi" },
                    { day: 2, activity: "Nairobi - Lake Nakuru" },
                    { day: 3, activity: "Lake Nakuru - Masai Mara" },
                    { day: 4, activity: "Masai Mara - Safari mattutino e pomeridiano" },
                    { day: 5, activity: "Masai Mara - Villaggio Masai" },
                    { day: 6, activity: "Masai Mara - Mongolfiera all'alba" },
                    { day: 7, activity: "Masai Mara - Lake Naivasha" },
                    { day: 8, activity: "Lake Naivasha - Amboseli" },
                    { day: 9, activity: "Amboseli - Vista del Kilimangiaro" },
                    { day: 10, activity: "Amboseli - Tsavo East" },
                    { day: 11, activity: "Tsavo East - Nairobi" },
                    { day: 12, activity: "Nairobi - Partenza" }
                ]
            },
            caraibi: {
                title: "Caraibi Paradiso",
                price: "€1,899",
                duration: "8 Giorni",
                location: "Barbados, Martinica",
                description: "Relax totale nelle isole caraibiche più belle, tra spiagge paradisiache e acque cristalline.",
                highlights: [
                    "Spiagge di sabbia bianca",
                    "Snorkeling e diving",
                    "Rum tour e degustazioni",
                    "Escursioni nella foresta pluviale",
                    "Cultura creola autentica"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo a Barbados - Bridgetown" },
                    { day: 2, activity: "Barbados - West Coast beaches" },
                    { day: 3, activity: "Barbados - Rum tour e Harrison's Cave" },
                    { day: 4, activity: "Barbados - Snorkeling e relax" },
                    { day: 5, activity: "Barbados - Martinica" },
                    { day: 6, activity: "Martinica - Fort-de-France e jardins" },
                    { day: 7, activity: "Martinica - Vulcano Pelée" },
                    { day: 8, activity: "Martinica - Partenza" }
                ]
            },
            grecia: {
                title: "Grecia Antica",
                price: "€899",
                duration: "5 Giorni",
                location: "Atene, Santorini, Mykonos",
                description: "Un tuffo nella storia antica e nei tramonti più belli del Mediterraneo.",
                highlights: [
                    "Acropoli di Atene",
                    "Tramonti di Santorini",
                    "Vita notturna di Mykonos",
                    "Cucina greca tradizionale",
                    "Archeologia e mitologia"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo ad Atene - Acropoli" },
                    { day: 2, activity: "Atene - Musei e Plaka" },
                    { day: 3, activity: "Atene - Santorini" },
                    { day: 4, activity: "Santorini - Oia e Fira" },
                    { day: 5, activity: "Santorini - Partenza" }
                ]
            },
            thailandia: {
                title: "Thailandia Esotica",
                price: "€1,599",
                duration: "9 Giorni",
                location: "Bangkok, Phuket, Chiang Mai",
                description: "Un mix perfetto di cultura, avventura e relax nella Terra del Sorriso.",
                highlights: [
                    "Templi dorati di Bangkok",
                    "Mercati galleggianti",
                    "Isole tropicali",
                    "Massaggi tradizionali Thai",
                    "Trekking con gli elefanti"
                ],
                itinerary: [
                    { day: 1, activity: "Arrivo a Bangkok" },
                    { day: 2, activity: "Bangkok - Templi e Gran Palazzo" },
                    { day: 3, activity: "Bangkok - Mercati galleggianti" },
                    { day: 4, activity: "Bangkok - Chiang Mai" },
                    { day: 5, activity: "Chiang Mai - Trekking" },
                    { day: 6, activity: "Chiang Mai - Phuket" },
                    { day: 7, activity: "Phuket - Isole Phi Phi" },
                    { day: 8, activity: "Phuket - Relax e spa" },
                    { day: 9, activity: "Phuket - Partenza" }
                ]
            }
        };

        this.setupParticleSystem();
        this.setupIntersectionObserver();
        this.handleLoading();
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Navigation
        this.elements.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        this.elements.navMenu?.addEventListener('click', (e) => this.handleNavClick(e));

        // Hero interactions
        this.elements.exploreBtn?.addEventListener('click', () => this.scrollToDestinations());
        this.elements.watchVideoBtn?.addEventListener('click', () => this.openVideoModal());
        this.elements.scrollIndicator?.addEventListener('click', () => this.scrollToNextSection());

        // Destinations
        this.elements.filterBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterDestinations(e.target.dataset.filter));
        });

        this.elements.exploreBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => this.openDestinationModal(e.target.dataset.destination));
        });

        // Experiences slider
        this.elements.expPrev?.addEventListener('click', () => this.previousExperience());
        this.elements.expNext?.addEventListener('click', () => this.nextExperience());
        this.elements.expIndicators?.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToExperience(index));
        });

        // Form submission
        this.elements.bookingForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Modals
        this.elements.closeModal?.addEventListener('click', () => this.closeModal());
        this.elements.closeVideoModal?.addEventListener('click', () => this.closeVideoModal());
        
        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.destinationModal) this.closeModal();
            if (e.target === this.elements.videoModal) this.closeVideoModal();
        });

        // Back to top
        this.elements.backToTop?.addEventListener('click', () => this.scrollToTop());

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Mouse events for magnetic effect
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    // ===== LOADING SCREEN =====
    handleLoading() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.elements.loadingScreen?.classList.add('hidden');
                this.elements.navbar?.classList.add('visible');
                this.startHeroAnimations();
            }, 3000);
        });
    }

    // ===== HERO ANIMATIONS =====
    startHeroAnimations() {
        // Animate hero title letters
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.animationDelay = `${0.5 + index * 0.2}s`;
        });

        // Start floating elements
        this.animateFloatingElements();
    }

    startAnimations() {
        // Start particle system
        if (this.state.particleSystem) {
            this.state.particleSystem.start();
        }

        // Start experience slider auto-play
        this.startExperienceAutoplay();
    }

    // ===== NAVIGATION =====
    toggleMobileMenu() {
        this.elements.navMenu?.classList.toggle('active');
        this.elements.hamburger?.classList.toggle('active');
    }

    handleNavClick(e) {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            
            if (target.startsWith('#')) {
                this.scrollToSection(target);
                this.elements.navMenu?.classList.remove('active');
                this.elements.hamburger?.classList.remove('active');
            }
        }
    }

    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // ===== SCROLL HANDLING =====
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update navbar
        this.updateNavbar(scrollY);
        
        // Update back to top button
        this.updateBackToTop(scrollY);
        
        // Update parallax elements
        this.updateParallax(scrollY);
        
        // Animate counters when in view
        this.animateCounters();
        
        // Update scroll progress
        this.updateScrollProgress();
        
        // Throttle scroll events
        if (!this.state.isScrolling) {
            window.requestAnimationFrame(() => {
                this.state.isScrolling = false;
            });
            this.state.isScrolling = true;
        }
    }

    updateNavbar(scrollY) {
        if (scrollY > 100) {
            this.elements.navbar?.classList.add('scrolled');
        } else {
            this.elements.navbar?.classList.remove('scrolled');
        }
    }

    updateBackToTop(scrollY) {
        if (scrollY > 500) {
            this.elements.backToTop?.classList.add('visible');
        } else {
            this.elements.backToTop?.classList.remove('visible');
        }
    }

    updateParallax(scrollY) {
        const parallaxBg = document.getElementById('parallaxBg');
        if (parallaxBg) {
            const speed = scrollY * 0.5;
            parallaxBg.style.transform = `translateY(${speed}px)`;
        }

        // Update floating elements
        const floatingElements = document.querySelectorAll('.floating-icon');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        progressBar.style.width = scrolled + '%';
    }

    // ===== DESTINATIONS FILTER =====
    filterDestinations(category) {
        // Update active button
        this.elements.filterBtns?.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Filter cards
        const cards = document.querySelectorAll('.destination-card');
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // ===== DESTINATION MODAL =====
    openDestinationModal(destination) {
        const data = this.destinationData[destination];
        if (!data) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = this.generateDestinationModalContent(data);
        
        this.elements.destinationModal?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    generateDestinationModalContent(data) {
        return `
            <div class="destination-modal-content">
                <div class="modal-header">
                    <h2>${data.title}</h2>
                    <div class="modal-meta">
                        <span class="modal-price">${data.price}</span>
                        <span class="modal-duration">${data.duration}</span>
                    </div>
                </div>
                
                <div class="modal-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${data.location}
                </div>
                
                <div class="modal-description">
                    <p>${data.description}</p>
                </div>
                
                <div class="modal-highlights">
                    <h3>Highlights del Viaggio</h3>
                    <ul>
                        ${data.highlights.map(highlight => `<li><i class="fas fa-check"></i> ${highlight}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-itinerary">
                    <h3>Itinerario Dettagliato</h3>
                    <div class="itinerary-timeline">
                        ${data.itinerary.map(item => `
                            <div class="timeline-item">
                                <div class="timeline-day">Giorno ${item.day}</div>
                                <div class="timeline-activity">${item.activity}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="this.scrollToBooking()">
                        <i class="fas fa-calendar-check"></i>
                        Prenota Ora
                    </button>
                    <button class="btn btn-outline" onclick="this.shareDestination('${data.title}')">
                        <i class="fas fa-share"></i>
                        Condividi
                    </button>
                </div>
            </div>
        `;
    }

    closeModal() {
        this.elements.destinationModal?.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // ===== VIDEO MODAL =====
    openVideoModal() {
        this.elements.videoModal?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeVideoModal() {
        this.elements.videoModal?.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // ===== EXPERIENCES SLIDER =====
    startExperienceAutoplay() {
        setInterval(() => {
            this.nextExperience();
        }, 5000);
    }

    nextExperience() {
        this.state.currentExperience = (this.state.currentExperience + 1) % this.elements.experienceCards.length;
        this.updateExperienceSlider();
    }

    previousExperience() {
        this.state.currentExperience = (this.state.currentExperience - 1 + this.elements.experienceCards.length) % this.elements.experienceCards.length;
        this.updateExperienceSlider();
    }

    goToExperience(index) {
        this.state.currentExperience = index;
        this.updateExperienceSlider();
    }

    updateExperienceSlider() {
        // Update cards
        this.elements.experienceCards?.forEach((card, index) => {
            card.classList.toggle('active', index === this.state.currentExperience);
        });

        // Update indicators
        this.elements.expIndicators?.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.state.currentExperience);
        });
    }

    // ===== COUNTERS ANIMATION =====
    animateCounters() {
        if (this.state.countersAnimated) return;

        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            this.state.countersAnimated = true;
            
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toLocaleString();
                }, 40);
            });
        }
    }

    // ===== FORM HANDLING =====
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.elements.bookingForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.elements.bookingForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showFormSuccess();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.elements.bookingForm.reset();
        }, 2000);
    }

    validateForm(data) {
        const required = ['firstName', 'lastName', 'email'];
        const missing = required.filter(field => !data[field] || data[field].trim() === '');
        
        if (missing.length > 0) {
            this.showFormError(`Campi obbligatori mancanti: ${missing.join(', ')}`);
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showFormError('Indirizzo email non valido');
            return false;
        }
        
        return true;
    }

    showFormSuccess() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Richiesta inviata con successo! Ti contatteremo entro 24 ore.</span>
        `;
        
        this.elements.bookingForm.insertBefore(message, this.elements.bookingForm.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    showFormError(text) {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${text}</span>
        `;
        
        this.elements.bookingForm.insertBefore(message, this.elements.bookingForm.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    // ===== PARTICLE SYSTEM =====
    setupParticleSystem() {
        const canvas = this.elements.particleCanvas;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${240 + Math.random() * 60}, 70%, 60%)`
            };
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(createParticle());
            }
        };

        const updateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (150 - distance) / 150 * 0.2;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            animationId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        this.state.particleSystem = {
            start: () => animate(),
            stop: () => cancelAnimationFrame(animationId)
        };
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== FLOATING ELEMENTS =====
    animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-icon');
        floatingElements.forEach((element, index) => {
            const delay = index * 1000;
            const duration = 3000 + Math.random() * 2000;
            
            element.style.animation = `float ${duration}ms ease-in-out infinite`;
            element.style.animationDelay = `${delay}ms`;
        });
    }

    // ===== UTILITY FUNCTIONS =====
    scrollToDestinations() {
        this.scrollToSection('#destinations');
    }

    scrollToNextSection() {
        const currentSection = this.getCurrentSection();
        const sections = ['#home', '#destinations', '#experiences', '#reviews', '#booking', '#contact'];
        const currentIndex = sections.indexOf(currentSection);
        const nextSection = sections[currentIndex + 1] || sections[0];
        this.scrollToSection(nextSection);
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = '#home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                current = '#' + section.id;
            }
        });
        
        return current;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToBooking() {
        this.closeModal();
        setTimeout(() => {
            this.scrollToSection('#booking');
        }, 300);
    }

    shareDestination(title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Scopri ${title} con WonderTravel!`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without native sharing
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            alert('Link copiato negli appunti!');
        }
    }

    handleKeyPress(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            this.closeModal();
            this.closeVideoModal();
        }
        
        // Arrow keys for experience slider
        if (e.key === 'ArrowLeft') {
            this.previousExperience();
        } else if (e.key === 'ArrowRight') {
            this.nextExperience();
        }
    }

    handleMouseMove(e) {
        // Magnetic effect for buttons
        document.querySelectorAll('.magnetic').forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.15;
            const deltaY = (e.clientY - centerY) * 0.15;
            
            element.style.setProperty('--x', deltaX + 'px');
            element.style.setProperty('--y', deltaY + 'px');
        });
    }

    handleResize() {
        // Update particle system
        if (this.state.particleSystem) {
            this.setupParticleSystem();
        }
    }
}

// ===== CSS INJECTION FOR DYNAMIC STYLES =====
const injectCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideDown 0.3s ease;
        }
        
        .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        
        .destination-modal-content {
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .modal-meta {
            display: flex;
            gap: 1rem;
        }
        
        .modal-price, .modal-duration {
            background: var(--gradient-primary);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
        }
        
        .modal-location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #666;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        
        .modal-description {
            margin-bottom: 2rem;
            line-height: 1.6;
            font-size: 1.1rem;
        }
        
        .modal-highlights h3,
        .modal-itinerary h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .modal-highlights ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-highlights li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.8rem;
            padding: 0.5rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .modal-highlights i {
            color: #28a745;
        }
        
        .itinerary-timeline {
            margin-bottom: 2rem;
        }
        
        .timeline-item {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
        }
        
        .timeline-day {
            background: var(--primary-color);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-weight: 600;
            font-size: 0.9rem;
            white-space: nowrap;
        }
        
        .timeline-activity {
            flex: 1;
            color: #555;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 2px solid #f0f0f0;
        }
        
        @media (max-width: 768px) {
            .modal-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .modal-actions {
                flex-direction: column;
            }
            
            .timeline-item {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    injectCSS();
    new TravelApp();
});

// ===== GLOBAL UTILITIES =====
window.TravelUtils = {
    scrollToBooking() {
        document.querySelector('#booking').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },
    
    shareDestination(title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Scopri ${title} con WonderTravel!`,
                url: window.location.href
            });
        } else {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copiato negli appunti!');
            });
        }
    }
};
