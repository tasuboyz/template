// ===== GLOBAL VARIABLES =====
let currentStorySlide = 0;
const totalStorySlides = 3;
let donationModal = null;
let selectedAmount = 25;
let isMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    initializeLoading();
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeProjects();
    initializeImpactCounters();
    initializeStorySlider();
    initializeDonationModal();
    initializeForms();
    initializeScrollEffects();
    initializeBackToTop();
    initializeParticleEffects();
}

// ===== LOADING SCREEN =====
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== HERO SECTION =====
function initializeHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDonateBtn = document.getElementById('hero-donate');
    const learnMoreBtn = document.getElementById('learn-more');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Typewriter effect for hero title
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('typewriter');
        }, 500);
    }
    
    // Hero buttons
    if (heroDonateBtn) {
        heroDonateBtn.addEventListener('click', () => {
            openDonationModal();
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#mission').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#mission').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        if (parallax) {
            const speed = 0.5;
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-wow');
                const delay = element.getAttribute('data-wow-delay') || '0s';
                
                element.style.animationDelay = delay;
                element.classList.add('animated', animationType);
                element.style.visibility = 'visible';
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-wow attribute
    document.querySelectorAll('[data-wow]').forEach(el => {
        el.style.visibility = 'hidden';
        observer.observe(el);
    });
    
    // Additional reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
}

// ===== PROJECTS SECTION =====
function initializeProjects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Project filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animate progress bars when in view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                    progressBar.classList.add('progress-animated');
                }, 300);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Project donation buttons
    const projectDonateButtons = document.querySelectorAll('.project-donate-btn');
    projectDonateButtons.forEach(button => {
        if (!button.classList.contains('completed')) {
            button.addEventListener('click', () => {
                openDonationModal();
            });
        }
    });
}

// ===== IMPACT COUNTERS =====
function initializeImpactCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== STORY SLIDER =====
function initializeStorySlider() {
    const slides = document.querySelectorAll('.story-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('story-prev');
    const nextBtn = document.getElementById('story-next');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentStorySlide = (currentStorySlide + 1) % totalStorySlides;
        showSlide(currentStorySlide);
    }
    
    function prevSlide() {
        currentStorySlide = (currentStorySlide - 1 + totalStorySlides) % totalStorySlides;
        showSlide(currentStorySlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentStorySlide = index;
            showSlide(currentStorySlide);
        });
    });
    
    // Auto-slide
    setInterval(nextSlide, 6000);
}

// ===== DONATION MODAL =====
function initializeDonationModal() {
    donationModal = document.getElementById('donation-modal');
    const donateButtons = document.querySelectorAll('#donate-btn, #hero-donate, #footer-donate');
    const modalClose = document.getElementById('modal-close');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const customAmountContainer = document.querySelector('.custom-amount-input');
    const typeButtons = document.querySelectorAll('.type-btn');
    const selectedAmountSpan = document.getElementById('selected-amount');
    const impactDescription = document.getElementById('impact-description');
    
    // Open modal
    donateButtons.forEach(button => {
        button.addEventListener('click', openDonationModal);
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeDonationModal);
    }
    
    // Close on backdrop click
    if (donationModal) {
        donationModal.addEventListener('click', (e) => {
            if (e.target === donationModal) {
                closeDonationModal();
            }
        });
    }
    
    // Amount selection
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            if (button.classList.contains('custom-amount')) {
                button.classList.add('active');
                customAmountContainer.style.display = 'block';
                customAmountInput.focus();
            } else {
                button.classList.add('active');
                customAmountContainer.style.display = 'none';
                selectedAmount = parseInt(button.getAttribute('data-amount'));
                updateDonationDisplay();
            }
        });
    });
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            selectedAmount = parseInt(customAmountInput.value) || 0;
            updateDonationDisplay();
        });
    }
    
    // Donation type selection
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    function updateDonationDisplay() {
        if (selectedAmountSpan) {
            selectedAmountSpan.textContent = selectedAmount;
        }
        
        if (impactDescription) {
            let impact = '';
            if (selectedAmount >= 250) {
                impact = `Con €${selectedAmount} puoi sostenere l'educazione di 50 bambini per un mese`;
            } else if (selectedAmount >= 100) {
                impact = `Con €${selectedAmount} puoi fornire cure mediche a 20 persone`;
            } else if (selectedAmount >= 50) {
                impact = `Con €${selectedAmount} puoi garantire acqua potabile a una famiglia per 6 mesi`;
            } else if (selectedAmount >= 25) {
                impact = `Con €${selectedAmount} puoi fornire materiale scolastico a 5 bambini per un mese`;
            } else {
                impact = `Ogni contributo conta e fa la differenza`;
            }
            impactDescription.textContent = impact;
        }
    }
    
    // Initialize display
    updateDonationDisplay();
}

function openDonationModal() {
    if (donationModal) {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = donationModal.querySelector('.modal-content');
        modalContent.style.animation = 'zoomIn 0.3s ease forwards';
    }
}

function closeDonationModal() {
    if (donationModal) {
        const modalContent = donationModal.querySelector('.modal-content');
        modalContent.style.animation = 'zoomOut 0.3s ease forwards';
        
        setTimeout(() => {
            donationModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== FORMS =====
function initializeForms() {
    const volunteerForm = document.getElementById('volunteer-form');
    const contactForm = document.getElementById('contact-form');
    const donationForm = document.getElementById('donation-form');
    
    // Volunteer form
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerSubmit);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Donation form
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
    
    // Form validation and animations
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    // Remove previous error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
        }
    }
    
    // Apply styling
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

function handleVolunteerSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const inputs = e.target.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate form submission
        showLoadingButton(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            showSuccessMessage('Candidatura inviata con successo! Ti contatteremo presto.');
            e.target.reset();
            hideLoadingButton(e.target.querySelector('button[type="submit"]'));
        }, 2000);
    } else {
        showErrorMessage('Per favore, compila tutti i campi richiesti correttamente.');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const inputs = e.target.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate form submission
        showLoadingButton(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            showSuccessMessage('Messaggio inviato con successo! Ti risponderemo entro 24 ore.');
            e.target.reset();
            hideLoadingButton(e.target.querySelector('button[type="submit"]'));
        }, 2000);
    } else {
        showErrorMessage('Per favore, compila tutti i campi richiesti correttamente.');
    }
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    if (selectedAmount < 5) {
        showErrorMessage('L\'importo minimo per la donazione è €5.');
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const inputs = e.target.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate payment processing
        showLoadingButton(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            showSuccessMessage(`Grazie per la tua donazione di €${selectedAmount}! Hai fatto la differenza.`);
            closeDonationModal();
            hideLoadingButton(e.target.querySelector('button[type="submit"]'));
            
            // Add celebration effect
            createCelebrationEffect();
        }, 3000);
    } else {
        showErrorMessage('Per favore, compila tutti i campi richiesti correttamente.');
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax elements
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.float');
        floatingElements.forEach(element => {
            const speed = 0.1;
            const yPos = Math.sin(scrolled * 0.01) * 10;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== PARTICLE EFFECTS =====
function initializeParticleEffects() {
    // Add particles to specific sections
    const particleSections = document.querySelectorAll('.hero, .impact-section');
    
    particleSections.forEach(section => {
        section.classList.add('particles');
        createFloatingParticles(section);
    });
}

function createFloatingParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 20 + 10}s linear infinite;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
}

// ===== UTILITY FUNCTIONS =====
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    if (successMessage && successText) {
        successText.textContent = message;
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

function showErrorMessage(message) {
    // Create error message element if it doesn't exist
    let errorMessage = document.getElementById('error-message');
    
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span id="error-text"></span>
            </div>
        `;
        document.body.appendChild(errorMessage);
        
        // Add CSS for error message
        const style = document.createElement('style');
        style.textContent = `
            .error-message {
                position: fixed;
                top: var(--space-xl);
                right: var(--space-xl);
                background: var(--primary-color);
                color: var(--white);
                padding: var(--space-lg);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                z-index: var(--z-tooltip);
                transform: translateX(100%);
                transition: var(--transition-normal);
            }
            .error-message.show {
                transform: translateX(0);
            }
            .error-content {
                display: flex;
                align-items: center;
                gap: var(--space-md);
            }
        `;
        document.head.appendChild(style);
    }
    
    const errorText = document.getElementById('error-text');
    errorText.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

function showLoadingButton(button) {
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
    button.disabled = true;
}

function hideLoadingButton(button) {
    const originalText = button.dataset.originalText;
    button.innerHTML = originalText;
    button.disabled = false;
}

function createCelebrationEffect() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#e74c3c', '#f39c12', '#27ae60', '#3498db'][Math.floor(Math.random() * 4)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10000;
        border-radius: 50%;
        animation: confetti-fall 3s linear forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes particle-float {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes zoomOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    .error {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .focused label {
        color: var(--primary-color);
        transform: translateY(-20px) scale(0.9);
    }
`;
document.head.appendChild(confettiStyle);

// ===== ADDITIONAL INTERACTIVE EFFECTS =====

// Story video modal
document.addEventListener('click', (e) => {
    if (e.target.id === 'story-video') {
        // Create video modal
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen></iframe>
            </div>
        `;
        
        // Add video modal styles
        const videoStyle = document.createElement('style');
        videoStyle.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .video-modal-content {
                position: relative;
                width: 90%;
                max-width: 800px;
                aspect-ratio: 16/9;
            }
            .video-modal-content iframe {
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
            .video-modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                z-index: 1;
            }
        `;
        document.head.appendChild(videoStyle);
        document.body.appendChild(videoModal);
        
        // Close video modal
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal || e.target.classList.contains('video-modal-close')) {
                videoModal.remove();
                videoStyle.remove();
            }
        });
    }
});

// Enhanced hover effects for cards
document.querySelectorAll('.project-card, .impact-card, .opportunity-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealOnScroll.observe(section);
});

// Dynamic background color change based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = Math.floor(scrollPercent * 360);
    document.documentElement.style.setProperty('--dynamic-color', `hsl(${hue}, 70%, 50%)`);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        if (donationModal && donationModal.classList.contains('active')) {
            closeDonationModal();
        }
        
        const videoModal = document.querySelector('.video-modal');
        if (videoModal) {
            videoModal.remove();
        }
    }
    
    // Arrow keys for story navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('story-prev');
        if (prevBtn) prevBtn.click();
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('story-next');
        if (nextBtn) nextBtn.click();
    }
});

// Console message for developers
console.log(`
🎉 Fondazione Speranza Website
👨‍💻 Developed with love for a better world
❤️ Every line of code can make a difference

Features:
✨ WOW Animations
🎨 Interactive UI
📱 Responsive Design
♿ Accessibility Support
🚀 Performance Optimized

If you're interested in contributing to our cause or collaborating on projects like this, contact us!
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }, 1000);
    });
}
