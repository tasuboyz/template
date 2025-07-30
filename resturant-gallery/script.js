// Modern Component-Based Template Showcase Platform per Ristorante
// JavaScript ES6 - Non modulare eccessivamente

class RestaurantShowcase {
    constructor() {
        this.currentImageIndex = 0;
        this.galleryImages = [];
        this.init();
    }

    init() {
        this.initNavigation();
        this.initScrollEffects();
        this.initGallery();
        this.initMenu();
        this.initModal();
        this.initForm();
        this.initAnimations();
    }

    // Navigation Component
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect per navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Smooth scroll per navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll Effects Component
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        // Aggiunge classi di animazione agli elementi
        const fadeElements = document.querySelectorAll('.about-text, .contact-info');
        const slideLeftElements = document.querySelectorAll('.about-image');
        const slideRightElements = document.querySelectorAll('.contact-form');

        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        slideLeftElements.forEach(el => {
            el.classList.add('slide-in-left');
            observer.observe(el);
        });

        slideRightElements.forEach(el => {
            el.classList.add('slide-in-right');
            observer.observe(el);
        });
    }

    // Gallery Component
    initGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Dati delle immagini della galleria
        this.galleryImages = [
            {
                src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
                category: 'food',
                title: 'Risotto ai Funghi Porcini'
            },
            {
                src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
                category: 'food',
                title: 'Pasta Carbonara'
            },
            {
                src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
                category: 'food',
                title: 'Pizza Margherita'
            },
            {
                src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
                category: 'interior',
                title: 'Sala Principale'
            },
            {
                src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
                category: 'interior',
                title: 'Area Bar'
            },
            {
                src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
                category: 'interior',
                title: 'Terrazza Esterna'
            },
            {
                src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
                category: 'events',
                title: 'Cena Romantica'
            },
            {
                src: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=600&h=400&fit=crop',
                category: 'events',
                title: 'Evento Aziendale'
            },
            {
                src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop',
                category: 'food',
                title: 'Tiramisù della Casa'
            },
            {
                src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
                category: 'interior',
                title: 'Cucina a Vista'
            },
            {
                src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
                category: 'food',
                title: 'Antipasti Misti'
            },
            {
                src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop',
                category: 'events',
                title: 'Festa di Compleanno'
            }
        ];

        // Genera HTML per la galleria
        this.renderGallery('all');

        // Event listeners per i filtri
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Aggiorna stato attivo dei bottoni
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filtra e renderizza
                this.renderGallery(filter);
            });
        });
    }

    renderGallery(filter) {
        const galleryGrid = document.getElementById('gallery-grid');
        const filteredImages = filter === 'all' 
            ? this.galleryImages 
            : this.galleryImages.filter(img => img.category === filter);

        galleryGrid.innerHTML = '';

        filteredImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="gallery-overlay">
                    <span>${image.title}</span>
                </div>
            `;

            // Effetto di entrata staggered
            galleryItem.style.opacity = '0';
            galleryItem.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                galleryItem.style.transition = 'all 0.6s ease';
                galleryItem.style.opacity = '1';
                galleryItem.style.transform = 'translateY(0)';
            }, index * 100);

            // Event listener per aprire modal
            galleryItem.addEventListener('click', () => {
                this.openModal(filteredImages, index);
            });

            galleryGrid.appendChild(galleryItem);
        });
    }

    // Menu Component
    initMenu() {
        const menuCards = document.getElementById('menu-cards');
        
        const menuItems = [
            {
                name: 'Risotto all\'Amarone',
                description: 'Risotto cremoso con Amarone della Valpolicella, gorgonzola e noci',
                price: '€28',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop'
            },
            {
                name: 'Branzino in Crosta',
                description: 'Branzino fresco in crosta di sale alle erbe mediterranee',
                price: '€32',
                image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=250&fit=crop'
            },
            {
                name: 'Agnello alle Erbe',
                description: 'Costoletta d\'agnello con rosmarino e riduzione di Barolo',
                price: '€35',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop'
            }
        ];

        menuItems.forEach((item, index) => {
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-card fade-in';
            menuCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">${item.price}</div>
            `;

            // Effetto di entrata
            menuCard.style.animationDelay = `${index * 0.2}s`;
            menuCards.appendChild(menuCard);
        });
    }

    // Modal Component
    initModal() {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const closeBtn = document.querySelector('.close');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        prevBtn.addEventListener('click', () => {
            this.navigateModal(-1);
        });

        nextBtn.addEventListener('click', () => {
            this.navigateModal(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                } else if (e.key === 'ArrowLeft') {
                    this.navigateModal(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateModal(1);
                }
            }
        });
    }

    openModal(images, index) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        
        this.currentImages = images;
        this.currentImageIndex = index;
        
        modalImage.src = images[index].src;
        modalImage.alt = images[index].title;
        modal.style.display = 'block';
    }

    navigateModal(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.currentImages.length - 1;
        } else if (this.currentImageIndex >= this.currentImages.length) {
            this.currentImageIndex = 0;
        }
        
        const modalImage = document.getElementById('modal-image');
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = this.currentImages[this.currentImageIndex].src;
            modalImage.alt = this.currentImages[this.currentImageIndex].title;
            modalImage.style.opacity = '1';
        }, 150);
    }

    // Form Component
    initForm() {
        const form = document.getElementById('reservation-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simula invio form con animazione
            const button = form.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Invio in corso...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Prenotazione Ricevuta!';
                button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                setTimeout(() => {
                    form.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Animations Component
    initAnimations() {
        // Parallax effect per hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Hover effects per card
        const cards = document.querySelectorAll('.menu-card, .gallery-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Utility method per smooth scroll
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Utility functions globali
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Inizializza l'applicazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    const app = new RestaurantShowcase();
    
    // Aggiunge alcuni effetti extra per il "WOW" factor
    addWowEffects();
});

// Effetti aggiuntivi per il "WOW" factor
function addWowEffects() {
    // Cursor trail effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(201,169,110,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Floating particles effect
    createFloatingParticles();

    // Add loading animation
    addLoadingAnimation();
}

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(201,169,110,0.3);
            border-radius: 50%;
            animation: float 20s infinite linear;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add CSS for float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function addLoadingAnimation() {
    // Crea un loader che scompare dopo il caricamento
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2c2c2c, #c9a96e);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 1rem;">Bella Vista</h2>
            <div style="width: 50px; height: 4px; background: rgba(255,255,255,0.3); margin: 0 auto; border-radius: 2px; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: white; transform: translateX(-100%); animation: loading 2s ease-in-out;"></div>
            </div>
        </div>
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes loading {
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Performance optimization: lazy loading per immagini
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
