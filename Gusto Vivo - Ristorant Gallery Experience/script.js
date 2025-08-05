// ===== CONFIGURAZIONE GALLERIA =====
class RestaurantGallery {
    constructor() {
        this.images = this.generateImageData();
        this.currentFilter = 'all';
        this.itemsPerLoad = 12;
        this.currentlyLoaded = 0;
        this.lightboxIndex = 0;
        this.filteredImages = [...this.images];
        
        this.init();
    }

    // Genera dati fittizi per 300 immagini
    generateImageData() {
        const categories = ['dishes', 'interior', 'atmosphere', 'events'];
        const dishNames = [
            'Spaghetti Carbonara', 'Pizza Margherita', 'Risotto ai Funghi', 'Osso Buco',
            'Tiramisù', 'Panna Cotta', 'Bruschetta', 'Antipasto Misto', 'Lasagne',
            'Gnocchi al Pomodoro', 'Saltimbocca', 'Cacio e Pepe', 'Amatriciana',
            'Parmigiana', 'Cannoli', 'Gelato', 'Carpaccio', 'Minestrone'
        ];
        
        const interiorAreas = [
            'Sala Principale', 'Terrazza', 'Angolo Wine Bar', 'Cucina a Vista',
            'Ingresso', 'Sala Privata', 'Giardino Interno', 'Bar', 'Zona Degustazione'
        ];
        
        const atmosphereScenes = [
            'Cena Romantica', 'Aperitivo', 'Brunch Weekend', 'Cena Famiglia',
            'Business Lunch', 'Degustazione Vini', 'Chef al Lavoro', 'Servizio Tavolo'
        ];
        
        const eventTypes = [
            'Matrimonio', 'Compleanno', 'Anniversario', 'Festa Aziendale',
            'Degustazione', 'Cooking Class', 'Wine Tasting', 'Evento Privato'
        ];

        const images = [];
        
        for (let i = 1; i <= 300; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            let title, description;
            
            switch (category) {
                case 'dishes':
                    const dish = dishNames[Math.floor(Math.random() * dishNames.length)];
                    title = dish;
                    description = `Delizioso ${dish} preparato con ingredienti freschi e ricette tradizionali`;
                    break;
                case 'interior':
                    const area = interiorAreas[Math.floor(Math.random() * interiorAreas.length)];
                    title = area;
                    description = `Atmosfera elegante e accogliente nella nostra ${area.toLowerCase()}`;
                    break;
                case 'atmosphere':
                    const scene = atmosphereScenes[Math.floor(Math.random() * atmosphereScenes.length)];
                    title = scene;
                    description = `Momenti speciali al ristorante durante ${scene.toLowerCase()}`;
                    break;
                case 'events':
                    const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                    title = `Evento ${event}`;
                    description = `Celebrazioni indimenticabili per il vostro ${event.toLowerCase()}`;
                    break;
            }
            
            images.push({
                id: i,
                src: `images/gallery/${category}/${category}_${String(i).padStart(3, '0')}.jpg`,
                thumbnail: `images/gallery/thumbs/${category}_${String(i).padStart(3, '0')}_thumb.jpg`,
                category: category,
                title: title,
                description: description,
                alt: `${title} - La Tavola d'Oro`
            });
        }
        
        return images;
    }

    init() {
        this.setupFilters();
        this.loadImages();
        this.setupLightbox();
        this.updateCounter();
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Rimuovi classe active da tutti i bottoni
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Aggiungi classe active al bottone cliccato
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter;
                this.filterImages(filter);
            });
        });
    }

    filterImages(filter) {
        this.currentFilter = filter;
        this.currentlyLoaded = 0;
        
        if (filter === 'all') {
            this.filteredImages = [...this.images];
        } else {
            this.filteredImages = this.images.filter(img => img.category === filter);
        }
        
        // Pulisci la griglia
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = '';
        
        // Ricarica le immagini
        this.loadImages();
        this.updateCounter();
    }

    loadImages() {
        const galleryGrid = document.getElementById('galleryGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        const endIndex = Math.min(
            this.currentlyLoaded + this.itemsPerLoad,
            this.filteredImages.length
        );
        
        for (let i = this.currentlyLoaded; i < endIndex; i++) {
            const imageData = this.filteredImages[i];
            const galleryItem = this.createGalleryItem(imageData, i);
            galleryGrid.appendChild(galleryItem);
        }
        
        this.currentlyLoaded = endIndex;
        
        // Aggiorna bottone "Carica Altri"
        if (this.currentlyLoaded >= this.filteredImages.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.onclick = () => this.loadImages();
        }
        
        this.updateCounter();
    }

    createGalleryItem(imageData, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => this.openLightbox(index);
        
        galleryItem.innerHTML = `
            <img class="gallery-image" 
                 src="${this.createPlaceholderImage(imageData)}" 
                 alt="${imageData.alt}"
                 loading="lazy">
            <div class="gallery-overlay">
                <h3 class="gallery-title">${imageData.title}</h3>
                <p class="gallery-description">${imageData.description}</p>
            </div>
        `;
        
        return galleryItem;
    }

    // Crea immagini placeholder colorate per la demo
    createPlaceholderImage(imageData) {
        const colors = {
            dishes: ['#FF6B35', '#D73502'],
            interior: ['#8B4513', '#A0522D'],
            atmosphere: ['#FFD700', '#FFA500'],
            events: ['#C41E3A', '#8B0000']
        };
        
        const categoryColors = colors[imageData.category] || ['#666', '#999'];
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Crea gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, categoryColors[0]);
        gradient.addColorStop(1, categoryColors[1]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Aggiungi testo
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(imageData.title, canvas.width / 2, canvas.height / 2 - 10);
        
        ctx.font = '12px Arial';
        ctx.fillText(`ID: ${imageData.id}`, canvas.width / 2, canvas.height / 2 + 15);
        
        return canvas.toDataURL();
    }

    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        
        closeBtn.onclick = () => this.closeLightbox();
        lightbox.onclick = (e) => {
            if (e.target === lightbox) this.closeLightbox();
        };
        
        // Navigazione con tastiera
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.changeLightboxImage(-1);
                if (e.key === 'ArrowRight') this.changeLightboxImage(1);
            }
        });
    }

    openLightbox(index) {
        this.lightboxIndex = index;
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateLightboxContent();
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    changeLightboxImage(direction) {
        this.lightboxIndex += direction;
        
        if (this.lightboxIndex < 0) {
            this.lightboxIndex = this.filteredImages.length - 1;
        } else if (this.lightboxIndex >= this.filteredImages.length) {
            this.lightboxIndex = 0;
        }
        
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const imageData = this.filteredImages[this.lightboxIndex];
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxCounter = document.getElementById('lightboxCounter');
        
        lightboxImage.src = this.createPlaceholderImage(imageData);
        lightboxImage.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        lightboxCounter.textContent = `${this.lightboxIndex + 1} / ${this.filteredImages.length}`;
    }

    updateCounter() {
        const showingCount = document.getElementById('showing-count');
        const totalCount = document.getElementById('total-count');
        
        showingCount.textContent = this.currentlyLoaded;
        totalCount.textContent = this.filteredImages.length;
    }
}

// ===== FILTRO MENU =====
class MenuFilter {
    constructor() {
        this.initializeFilters();
    }
    
    initializeFilters() {
        const filterButtons = document.querySelectorAll('.menu-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Rimuovi active da tutti i bottoni
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Aggiungi active al bottone cliccato
                e.target.classList.add('active');
                
                const category = e.target.dataset.category;
                this.filterMenu(category);
            });
        });
    }
    
    filterMenu(category) {
        const dishes = document.querySelectorAll('.dish-card');
        dishes.forEach(dish => {
            if (category === 'all' || dish.dataset.category === category) {
                dish.classList.remove('hidden');
                setTimeout(() => {
                    dish.style.display = 'block';
                    dish.style.opacity = '1';
                    dish.style.transform = 'scale(1)';
                }, 10);
            } else {
                dish.style.opacity = '0';
                dish.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    dish.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ===== SISTEMA PRENOTAZIONI =====
class ReservationSystem {
    constructor() {
        this.initializeDatePicker();
        this.initializeForm();
    }
    
    initializeDatePicker() {
        const dateInput = document.querySelector('#date');
        if (dateInput) {
            const today = new Date();
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 2);
            
            dateInput.min = today.toISOString().split('T')[0];
            dateInput.max = maxDate.toISOString().split('T')[0];
        }
    }
    
    initializeForm() {
        const form = document.getElementById('reservationForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleReservation(new FormData(form));
            });
        }
    }
    
    handleReservation(formData) {
        // Simula invio prenotazione
        const reservationData = {
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            notes: formData.get('notes')
        };
        
        console.log('Prenotazione ricevuta:', reservationData);
        
        // Mostra messaggio di conferma
        alert(`Grazie ${reservationData.name}! La tua prenotazione per ${reservationData.guests} persone il ${reservationData.date} alle ${reservationData.time} è stata ricevuta. Ti contatteremo al ${reservationData.phone} per la conferma.`);
        
        // Reset form
        document.getElementById('reservationForm').reset();
    }
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.restaurant-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== MODAL PRENOTAZIONE =====
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL EFFECTS =====
class ScrollEffects {
    constructor() {
        this.initializeScrollEffects();
        this.initializeNavbarScroll();
    }
    
    initializeScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Osserva elementi da animare
        document.querySelectorAll('.dish-card, .gallery-item, .review-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    initializeNavbarScroll() {
        const header = document.querySelector('.restaurant-header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
            
            // Nascondi/mostra header su scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// ===== LAZY LOADING IMMAGINI =====
class LazyImageLoader {
    constructor() {
        this.initializeLazyLoading();
    }
    
    initializeLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.initializeMobileMenu();
    }
    
    initializeMobileMenu() {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu-food');
        
        if (toggleButton && navMenu) {
            toggleButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                toggleButton.classList.toggle('active');
            });
            
            // Chiudi menu quando si clicca su un link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    toggleButton.classList.remove('active');
                });
            });
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeImages() {
    // Riduce qualità immagini su connessioni lente
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.querySelectorAll('img').forEach(img => {
                if (img.src.includes('gallery')) {
                    img.loading = 'lazy';
                }
            });
        }
    }
}

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza tutte le classi
    const gallery = new RestaurantGallery();
    const menuFilter = new MenuFilter();
    const reservationSystem = new ReservationSystem();
    const scrollEffects = new ScrollEffects();
    const lazyLoader = new LazyImageLoader();
    const mobileMenu = new MobileMenu();
    
    // Ottimizzazioni
    optimizeImages();
    
    // Gestione modal
    const modal = document.getElementById('reservationModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.onclick = closeReservationModal;
    }
    
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeReservationModal();
        };
    }
    
    // Smooth scroll per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    console.log('🍝 Ristorante La Tavola d\'Oro - Website Loaded Successfully!');
    console.log(`📸 Gallery: ${gallery.images.length} immagini generate`);
    console.log('✨ Tutte le funzionalità sono attive');
});

// ===== FUNZIONI GLOBALI PER LIGHTBOX =====
function changeLightboxImage(direction) {
    if (window.restaurantGallery) {
        window.restaurantGallery.changeLightboxImage(direction);
    }
}

// Rendi la gallery accessibile globalmente per il lightbox
document.addEventListener('DOMContentLoaded', () => {
    window.restaurantGallery = new RestaurantGallery();
});
