// ===== MUSIC ENTERTAINMENT TEMPLATE - MAIN APPLICATION =====

class MusicEntertainmentApp {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.5;
        this.progress = 0;
        this.duration = 225; // 3:45 in seconds
        this.tracks = [
            { title: "Electronic Dreams", artist: "SoundWave Artist", duration: "3:45", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Neon Nights", artist: "SoundWave Artist", duration: "4:12", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" },
            { title: "Digital Horizon", artist: "SoundWave Artist", duration: "5:23", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop" }
        ];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeComponents();
        
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
            this.startAnimations();
        }, 3000);
    }

    // ===== LOADING SCREEN =====
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = loadingScreen.querySelector('.progress-bar');
        
        // Animate loading progress
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 500);
        
        // Animate loading letters
        const letters = loadingScreen.querySelectorAll('.loading-letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.color = '#ff0080';
                letter.style.textShadow = '0 0 20px #ff0080';
                letter.style.transform = 'scale(1.2)';
            }, index * 100);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }

    // ===== AUDIO VISUALIZER =====
    initAudioVisualizer() {
        const canvas = document.getElementById('audio-visualizer');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const bars = 64;
        const barWidth = canvas.width / bars;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#ff0080');
            gradient.addColorStop(0.5, '#00ffff');
            gradient.addColorStop(1, '#ffd700');
            
            for (let i = 0; i < bars; i++) {
                const barHeight = Math.random() * (this.isPlaying ? 200 : 50) + 10;
                const x = i * barWidth;
                const y = canvas.height - barHeight;
                
                ctx.fillStyle = gradient;
                ctx.globalAlpha = this.isPlaying ? 0.8 : 0.3;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
                
                // Add glow effect
                ctx.shadowColor = '#ff0080';
                ctx.shadowBlur = 20;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
                ctx.shadowBlur = 0;
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ===== PARTICLE SYSTEM =====
    initParticleSystem() {
        const container = document.getElementById('particles');
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 6 + 2;
            const x = Math.random() * window.innerWidth;
            const duration = Math.random() * 6000 + 4000;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.animationDuration = `${duration}ms`;
            
            // Random colors
            const colors = ['#ff0080', '#00ffff', '#ffd700'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration);
        };
        
        // Create particles continuously
        setInterval(createParticle, 300);
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // ===== MUSIC PLAYER =====
    setupMusicPlayer() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const mainPlayBtn = document.getElementById('main-play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const progressBar = document.querySelector('.progress-bar');
        const progress = document.getElementById('progress');
        const progressHandle = document.getElementById('progress-handle');
        const volumeSlider = document.getElementById('master-volume');
        const equalizer = document.querySelector('.equalizer');
        const albumArt = document.querySelector('.album-art');
        
        // Play/Pause functionality
        const togglePlay = () => {
            this.isPlaying = !this.isPlaying;
            
            if (this.isPlaying) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                mainPlayBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Experience</span>';
                equalizer.classList.add('active');
                albumArt.classList.add('playing');
                this.startProgressAnimation();
            } else {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                mainPlayBtn.innerHTML = '<i class="fas fa-play"></i><span>Play Experience</span>';
                equalizer.classList.remove('active');
                albumArt.classList.remove('playing');
                this.stopProgressAnimation();
            }
            
            // Trigger visual effects
            this.triggerBeatDrop();
        };
        
        playPauseBtn.addEventListener('click', togglePlay);
        mainPlayBtn.addEventListener('click', togglePlay);
        
        // Previous/Next track
        prevBtn.addEventListener('click', () => this.previousTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Progress bar interaction
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            this.setProgress(percentage);
        });
        
        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            this.updateVolumeVisuals();
        });
        
        // Track list interaction
        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectTrack(index);
            });
            
            const trackPlayBtn = item.querySelector('.track-play');
            trackPlayBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectTrack(index);
                if (!this.isPlaying) {
                    togglePlay();
                }
            });
        });
    }

    selectTrack(index) {
        this.currentTrack = index;
        this.updateTrackInfo();
        
        // Update active track in list
        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach(item => item.classList.remove('active'));
        trackItems[index].classList.add('active');
        
        // Reset progress
        this.progress = 0;
        this.updateProgressBar();
        
        // Animate track change
        this.animateTrackChange();
    }

    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.selectTrack(this.currentTrack);
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.selectTrack(this.currentTrack);
    }

    updateTrackInfo() {
        const currentTrackEl = document.getElementById('current-track');
        const currentArtistEl = document.getElementById('current-artist');
        const currentAlbumEl = document.getElementById('current-album');
        const durationEl = document.getElementById('duration');
        
        const track = this.tracks[this.currentTrack];
        
        currentTrackEl.textContent = track.title;
        currentArtistEl.textContent = track.artist;
        currentAlbumEl.src = track.image;
        durationEl.textContent = track.duration;
    }

    startProgressAnimation() {
        this.progressInterval = setInterval(() => {
            this.progress += 1;
            if (this.progress >= 100) {
                this.progress = 0;
                this.nextTrack();
            }
            this.updateProgressBar();
        }, (this.duration * 1000) / 100);
    }

    stopProgressAnimation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    setProgress(percentage) {
        this.progress = percentage;
        this.updateProgressBar();
    }

    updateProgressBar() {
        const progressEl = document.getElementById('progress');
        const progressHandle = document.getElementById('progress-handle');
        const currentTimeEl = document.getElementById('current-time');
        
        progressEl.style.width = `${this.progress}%`;
        progressHandle.style.left = `${this.progress}%`;
        
        // Update current time
        const currentSeconds = Math.floor((this.progress / 100) * this.duration);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    animateTrackChange() {
        const albumArt = document.querySelector('.album-art');
        const trackInfo = document.querySelector('.track-info');
        
        // Animate album art
        albumArt.style.transform = 'scale(0.8) rotate(180deg)';
        albumArt.style.opacity = '0.5';
        
        setTimeout(() => {
            albumArt.style.transform = 'scale(1) rotate(0deg)';
            albumArt.style.opacity = '1';
        }, 300);
        
        // Animate track info
        trackInfo.style.transform = 'translateY(-20px)';
        trackInfo.style.opacity = '0';
        
        setTimeout(() => {
            trackInfo.style.transform = 'translateY(0)';
            trackInfo.style.opacity = '1';
        }, 200);
    }

    triggerBeatDrop() {
        const elements = document.querySelectorAll('.hero-title, .main-player, .event-card');
        elements.forEach(el => {
            el.style.animation = 'beatDrop 0.6s ease-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 600);
        });
    }

    updateVolumeVisuals() {
        const volumeIcon = document.querySelector('.volume-control i');
        
        if (this.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        const sections = document.querySelectorAll('section:not(.hero)');
        sections.forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Animate event cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.8, rotation: -10 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });
        
        // Animate track items
        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%'
                    }
                }
            );
        });
        
        // Animate stats counters
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            
            gsap.fromTo(stat,
                { textContent: 0 },
                {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%'
                    },
                    onUpdate: function() {
                        const current = Math.floor(this.targets()[0].textContent);
                        if (target >= 1000000) {
                            stat.textContent = (current / 1000000).toFixed(1) + 'M';
                        } else if (target >= 1000) {
                            stat.textContent = (current / 1000).toFixed(0) + 'K';
                        } else {
                            stat.textContent = current;
                        }
                    }
                }
            );
        });
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
        const form = document.querySelector('.contact-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            
            // Animate button
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Sent!';
                button.style.background = '#00ff00';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    form.reset();
                }, 2000);
            }, 2000);
        });
    }

    // ===== HERO ANIMATIONS =====
    startAnimations() {
        // Animate hero title
        gsap.timeline()
            .fromTo('.title-line', 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out' }
            )
            .fromTo('.hero-subtitle',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo('.hero-controls',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
                '-=0.3'
            )
            .fromTo('.scroll-indicator',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.2'
            );
        
        // Floating animation for logo
        gsap.to('.nav-logo i', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
        
        // Pulse animation for main play button
        gsap.to('.play-btn', {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardControls(e);
        });
        
        // Visibility change (pause when tab is hidden)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                // Optionally pause when tab is hidden
            }
        });
        
        // Touch events for mobile
        this.setupTouchEvents();
    }

    handleResize() {
        // Update canvas size
        const canvas = document.getElementById('audio-visualizer');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    handleKeyboardControls(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                document.getElementById('play-pause-btn').click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextTrack();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.volume = Math.min(1, this.volume + 0.1);
                document.getElementById('master-volume').value = this.volume * 100;
                this.updateVolumeVisuals();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.volume = Math.max(0, this.volume - 0.1);
                document.getElementById('master-volume').value = this.volume * 100;
                this.updateVolumeVisuals();
                break;
        }
    }

    setupTouchEvents() {
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            // Prevent bounce effect on iOS
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
    }

    // ===== COMPONENT INITIALIZATION =====
    initializeComponents() {
        this.initAudioVisualizer();
        this.initParticleSystem();
        this.setupNavigation();
        this.setupMusicPlayer();
        this.setupScrollAnimations();
        this.setupContactForm();
        
        // Initialize track info
        this.updateTrackInfo();
        this.updateProgressBar();
        
        // Add special effects
        this.addSpecialEffects();
    }

    // ===== SPECIAL EFFECTS =====
    addSpecialEffects() {
        // Add glitch effect to title occasionally
        setInterval(() => {
            const title = document.querySelector('.hero-title .highlight');
            if (Math.random() < 0.1) { // 10% chance
                title.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    title.style.animation = '';
                }, 300);
            }
        }, 5000);
        
        // Add random particle bursts
        setInterval(() => {
            if (this.isPlaying) {
                this.createParticleBurst();
            }
        }, 2000);
        
        // Lightning effect on beat drops
        setInterval(() => {
            if (this.isPlaying && Math.random() < 0.2) {
                this.createLightningEffect();
            }
        }, 3000);
    }

    createParticleBurst() {
        const container = document.getElementById('particles');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = (i / 10) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const size = 4 + Math.random() * 8;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.background = '#ffd700';
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            container.appendChild(particle);
            
            // Animate particle
            gsap.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                scale: 0,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            });
        }
    }

    createLightningEffect() {
        const lightning = document.createElement('div');
        lightning.style.position = 'fixed';
        lightning.style.top = '0';
        lightning.style.left = '0';
        lightning.style.width = '100%';
        lightning.style.height = '100%';
        lightning.style.background = 'rgba(255, 255, 255, 0.9)';
        lightning.style.zIndex = '9999';
        lightning.style.pointerEvents = 'none';
        lightning.style.opacity = '0';
        
        document.body.appendChild(lightning);
        
        gsap.to(lightning, {
            opacity: 1,
            duration: 0.05,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                document.body.removeChild(lightning);
            }
        });
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    new MusicEntertainmentApp();
});

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations (fallback)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
    }
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['measure'] });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could send error reports to analytics here
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('SW registered:', registration);
        })
        .catch(error => {
            console.log('SW registration failed:', error);
        });
}
