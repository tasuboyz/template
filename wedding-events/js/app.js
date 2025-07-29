// Wedding Events Template - Advanced JavaScript ES6
// Author: Wedding Template Pro
// Version: 1.0.0

class WeddingTemplate {
    constructor() {
        this.isLoaded = false;
        this.currentImageIndex = 0;
        this.galleryImages = [];
        this.init();
    }

    // Initialize all functionality
    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeAnimations();
        this.startCountdown();
        this.generateGallery();
        this.initParticleSystem();
        this.initFloatingHearts();
        this.hideLoadingScreen();
    }

    // Loading Screen Management
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 3000);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoaded = true;
                this.triggerAnimations();
            }, 500);
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Gallery modal
        this.setupGalleryModal();
        
        // RSVP form
        this.setupRSVPForm();
        
        // Gift modal
        this.setupGiftModal();
        
        // Resize handler
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Parallax effects
        this.setupParallax();
    }

    // Navigation Setup
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Scroll Handler
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;

        // Navbar background on scroll
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update parallax elements
        this.updateParallax();
        
        // Check for animations
        this.checkAnimations();
    }

    // Parallax Setup and Update
    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.parallax-element');
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        this.parallaxElements?.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const storySection = document.getElementById('story');
                if (storySection) {
                    storySection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Animation System
    initializeAnimations() {
        // Initialize AOS-like animations
        this.observeElements();
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    checkAnimations() {
        // Additional animation checks
        const staggerItems = document.querySelectorAll('.stagger-item:not(.animate)');
        
        staggerItems.forEach(item => {
            if (this.isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    triggerAnimations() {
        // Trigger initial animations after loading
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Countdown Timer
    startCountdown() {
        const weddingDate = new Date('2025-09-15T14:30:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                this.updateCountdownDisplay(days, hours, minutes, seconds);
            } else {
                this.updateCountdownDisplay(0, 0, 0, 0);
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    updateCountdownDisplay(days, hours, minutes, seconds) {
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
            if (elements[key]) {
                const formattedValue = value.toString().padStart(2, '0');
                if (elements[key].textContent !== formattedValue) {
                    this.animateCountdownChange(elements[key], formattedValue);
                }
            }
        });
    }

    animateCountdownChange(element, newValue) {
        element.style.transform = 'rotateX(90deg)';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'rotateX(0deg)';
        }, 150);
    }

    // Gallery System
    generateGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;

        // Generate placeholder images with beautiful gradients
        const imageCount = 12;
        this.galleryImages = [];

        for (let i = 1; i <= imageCount; i++) {
            const galleryItem = this.createGalleryItem(i);
            galleryGrid.appendChild(galleryItem);
            this.galleryImages.push({
                src: this.generateGradientImage(400, 400, i),
                alt: `Foto romantica ${i}`
            });
        }
    }

    createGalleryItem(index) {
        const item = document.createElement('div');
        item.className = 'gallery-item hover-lift';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index * 100).toString());

        const img = document.createElement('img');
        img.src = this.generateGradientImage(400, 400, index);
        img.alt = `Foto romantica ${index}`;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = '<i class="fas fa-search-plus"></i>';

        item.appendChild(img);
        item.appendChild(overlay);

        item.addEventListener('click', () => {
            this.openGalleryModal(index - 1);
        });

        return item;
    }

    generateGradientImage(width, height, seed) {
        const gradients = [
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #fecfef 0%, #fecfef 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #ff8a80 0%, #ffb74d 100%)',
            'linear-gradient(135deg, #f8bbd9 0%, #f48fb1 100%)',
            'linear-gradient(135deg, #e1bee7 0%, #ba68c8 100%)',
            'linear-gradient(135deg, #c5cae9 0%, #9575cd 100%)',
            'linear-gradient(135deg, #b39ddb 0%, #7986cb 100%)',
            'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)',
            'linear-gradient(135deg, #80deea 0%, #26c6da 100%)',
            'linear-gradient(135deg, #a5d6a7 0%, #66bb6a 100%)'
        ];

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        const colors = this.extractColorsFromGradient(gradients[seed % gradients.length]);
        
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add some romantic elements
        this.addRomanticElements(ctx, width, height, seed);

        return canvas.toDataURL();
    }

    extractColorsFromGradient(gradientString) {
        const colorRegex = /#[a-fA-F0-9]{6}/g;
        const matches = gradientString.match(colorRegex);
        return matches || ['#ff9a9e', '#fecfef'];
    }

    addRomanticElements(ctx, width, height, seed) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        // Add hearts
        for (let i = 0; i < 5; i++) {
            const x = (seed * 47 + i * 73) % width;
            const y = (seed * 31 + i * 91) % height;
            this.drawHeart(ctx, x, y, 10 + (i * 3));
        }
        
        // Add sparkles
        for (let i = 0; i < 20; i++) {
            const x = (seed * 23 + i * 37) % width;
            const y = (seed * 19 + i * 41) % height;
            this.drawSparkle(ctx, x, y, 2 + (i % 3));
        }
    }

    drawHeart(ctx, x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 10, size / 10);
        ctx.beginPath();
        ctx.arc(-5, -5, 5, 0, 2 * Math.PI);
        ctx.arc(5, -5, 5, 0, 2 * Math.PI);
        ctx.moveTo(-5, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(5, 0);
        ctx.fill();
        ctx.restore();
    }

    drawSparkle(ctx, x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.3, -size * 0.3);
        ctx.lineTo(size, 0);
        ctx.lineTo(size * 0.3, size * 0.3);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.3, size * 0.3);
        ctx.lineTo(-size, 0);
        ctx.lineTo(-size * 0.3, -size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Gallery Modal
    setupGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        const closeBtn = document.querySelector('.close-modal');
        const prevBtn = document.getElementById('modal-prev');
        const nextBtn = document.getElementById('modal-next');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeGalleryModal());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateGallery(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateGallery(1));
        }

        // Close on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeGalleryModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal && modal.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeGalleryModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateGallery(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateGallery(1);
                        break;
                }
            }
        });
    }

    openGalleryModal(index) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        
        if (modal && modalImage && this.galleryImages[index]) {
            this.currentImageIndex = index;
            modalImage.src = this.galleryImages[index].src;
            modalImage.alt = this.galleryImages[index].alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateGallery(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.galleryImages.length - 1;
        } else if (this.currentImageIndex >= this.galleryImages.length) {
            this.currentImageIndex = 0;
        }
        
        const modalImage = document.getElementById('modal-image');
        if (modalImage && this.galleryImages[this.currentImageIndex]) {
            modalImage.style.opacity = '0';
            setTimeout(() => {
                modalImage.src = this.galleryImages[this.currentImageIndex].src;
                modalImage.alt = this.galleryImages[this.currentImageIndex].alt;
                modalImage.style.opacity = '1';
            }, 150);
        }
    }

    // RSVP Form
    setupRSVPForm() {
        const form = document.getElementById('rsvp-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRSVPSubmission(form);
        });

        // Add floating labels effect
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleRSVPSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner"></span> Invio in corso...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="success-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="success-checkmark__check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Grazie!</h3>
                <p>La tua conferma è stata ricevuta con successo.</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Gift Modal
    setupGiftModal() {
        const giftButtons = document.querySelectorAll('.gift-btn');
        const giftModal = document.getElementById('gift-modal');
        const closeGiftModal = document.querySelector('.close-gift-modal');
        const amountButtons = document.querySelectorAll('.amount-btn');
        const proceedButton = document.querySelector('.proceed-gift-btn');

        giftButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const giftType = btn.getAttribute('data-gift');
                this.openGiftModal(giftType);
            });
        });

        if (closeGiftModal) {
            closeGiftModal.addEventListener('click', () => {
                giftModal.classList.remove('active');
            });
        }

        amountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                amountButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                document.getElementById('custom-amount').value = '';
            });
        });

        if (proceedButton) {
            proceedButton.addEventListener('click', () => {
                this.handleGiftProceed();
            });
        }

        // Close on background click
        if (giftModal) {
            giftModal.addEventListener('click', (e) => {
                if (e.target === giftModal) {
                    giftModal.classList.remove('active');
                }
            });
        }
    }

    openGiftModal(giftType) {
        const modal = document.getElementById('gift-modal');
        const title = document.getElementById('gift-modal-title');
        const text = document.getElementById('gift-modal-text');

        const giftInfo = {
            house: {
                title: 'Contributo Casa Nuova',
                text: 'Aiutaci a realizzare il sogno della nostra prima casa insieme!'
            },
            honeymoon: {
                title: 'Contributo Luna di Miele',
                text: 'Sostieni il nostro viaggio romantico da sogno!'
            },
            traditional: {
                title: 'Lista Nozze Tradizionale',
                text: 'Scegli dalla nostra lista su Amazon!'
            }
        };

        if (title) title.textContent = giftInfo[giftType]?.title || 'Contributo Regalo';
        if (text) text.textContent = giftInfo[giftType]?.text || 'Grazie per il tuo pensiero!';
        
        modal.classList.add('active');
    }

    handleGiftProceed() {
        const selectedAmount = document.querySelector('.amount-btn.selected');
        const customAmount = document.getElementById('custom-amount').value;
        
        let amount = customAmount || (selectedAmount ? selectedAmount.getAttribute('data-amount') : '50');
        
        // Simulate payment process
        alert(`Grazie! Saresti reindirizzato al pagamento di €${amount}`);
        document.getElementById('gift-modal').classList.remove('active');
    }

    // Particle System
    initParticleSystem() {
        const particleContainer = document.querySelector('.particle-system');
        if (!particleContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and size
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        };

        // Create particles periodically
        setInterval(createParticle, 300);
    }

    // Floating Hearts
    initFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        if (!heartsContainer) return;

        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '♥';
            
            // Random positioning and styling
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            const colors = ['#ff9a9e', '#fecfef', '#ffffff', '#d4af37'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        };

        // Create hearts periodically
        setInterval(createHeart, 800);
    }

    // Utility Functions
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
        };
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    handleResize() {
        // Handle responsive adjustments
        this.updateParallax();
    }
}

// Success Message Styles (injected dynamically)
const successStyles = `
    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .success-message.show {
        opacity: 1;
    }
    
    .success-content h3 {
        margin: 20px 0 10px 0;
        color: var(--accent-color);
        font-family: 'Playfair Display', serif;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = successStyles;
document.head.appendChild(styleSheet);

// Initialize the wedding template when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeddingTemplate();
});

// Add some magic touches
window.addEventListener('load', () => {
    // Add sparkle cursor effect
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            createSparkle(mouseX, mouseY);
        }
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.background = '#d4af37';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle animation
const sparkleAnimation = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

styleSheet.textContent += sparkleAnimation;
