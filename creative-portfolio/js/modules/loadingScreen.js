// ===== SPECTACULAR LOADING SCREEN WITH 3D EFFECTS =====
export class LoadingScreen {
    constructor() {
        this.element = document.getElementById('loading-screen');
        this.canvas = document.getElementById('loading-canvas');
        this.ctx = this.canvas?.getContext('2d');
        this.progress = 0;
        this.targetProgress = 0;
        this.isVisible = true;
        this.animationId = null;
        
        // 3D particles for loading animation
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        if (!this.element || !this.canvas) return;
        
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.startLoadingAnimation();
        this.simulateLoading();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            const baseSize = 1 + Math.random() * 3;
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 1000 + 1, // Ensure z is never 0
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: Math.random() * 5 + 1,
                size: baseSize,
                baseSize: baseSize,
                color: this.getRandomColor(),
                alpha: Math.max(0.1, Math.random() * 0.8 + 0.2),
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 107, 107, ',
            'rgba(78, 205, 196, ',
            'rgba(69, 183, 209, ',
            'rgba(255, 193, 7, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    startLoadingAnimation() {
        const animate = () => {
            if (!this.isVisible) return;
            
            this.updateParticles();
            this.drawParticles();
            this.updateProgress();
            this.animateLetters();
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    updateParticles() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100 && isFinite(distance) && distance > 0) {
                const force = (100 - distance) / 100;
                const forceX = dx * force * 0.01;
                const forceY = dy * force * 0.01;
                
                // Validate and limit force values
                if (isFinite(forceX)) particle.vx += Math.max(-5, Math.min(5, forceX));
                if (isFinite(forceY)) particle.vy += Math.max(-5, Math.min(5, forceY));
            }
            
            // Limit velocity to prevent extreme values
            particle.vx = Math.max(-10, Math.min(10, particle.vx || 0));
            particle.vy = Math.max(-10, Math.min(10, particle.vy || 0));
            particle.vz = Math.max(0.1, Math.min(5, particle.vz || 1));
            
            // Update position with validation
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z -= particle.vz;
            
            // Ensure positions are finite and within bounds
            if (!isFinite(particle.x)) particle.x = Math.random() * window.innerWidth;
            if (!isFinite(particle.y)) particle.y = Math.random() * window.innerHeight;
            if (!isFinite(particle.z) || particle.z < 1) particle.z = 1000;
            
            // Pulse effect with safe calculations
            particle.pulse = (particle.pulse || 0) + 0.05;
            const baseSize = Math.max(0.5, particle.baseSize || 2);
            const zFactor = Math.max(0.1, Math.min(2, particle.z / 1000 + 0.5));
            particle.size = Math.max(0.1, (Math.sin(particle.pulse) * 0.5 + 1.5) * baseSize * zFactor);
            
            // Reset particle when it goes too far
            if (particle.z <= 0) {
                particle.z = 1000;
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
                particle.baseSize = 1 + Math.random() * 3;
            }
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawParticles() {
        if (!this.ctx) return;
        
        try {
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            // Draw connections between nearby particles
            this.drawConnections();
            
            // Draw particles
            this.particles.forEach(particle => {
                try {
                    const scale = Math.max(0.1, Math.min(10, 1000 / Math.max(1, 1000 - particle.z)));
                    const x = isFinite(particle.x) ? particle.x : this.canvas.width / 2;
                    const y = isFinite(particle.y) ? particle.y : this.canvas.height / 2;
                    const size = Math.max(0.1, Math.min(100, particle.size * scale));
                    const alpha = Math.max(0, Math.min(1, particle.alpha * (particle.z / 1000)));
                    
                    // Validate gradient parameters
                    if (!isFinite(x) || !isFinite(y) || !isFinite(size) || size <= 0) {
                        return; // Skip this particle if values are invalid
                    }
                    
                    // Create gradient
                    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
                    gradient.addColorStop(0, particle.color + alpha + ')');
                    gradient.addColorStop(1, particle.color + '0)');
                    
                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, size, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Add glow effect with safe shadow values
                    if (isFinite(alpha) && isFinite(size)) {
                        this.ctx.shadowColor = particle.color + alpha + ')';
                        this.ctx.shadowBlur = Math.max(0, Math.min(50, size * 2));
                        this.ctx.fill();
                        this.ctx.shadowBlur = 0;
                    }
                } catch (particleError) {
                    // Skip this particle and continue with others
                    console.warn('Error drawing particle:', particleError);
                }
            });
        } catch (error) {
            console.warn('Error in drawParticles:', error);
        }
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle1 = this.particles[i];
                const particle2 = this.particles[j];
                
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = (100 - distance) / 100 * 0.3;
                    
                    this.ctx.strokeStyle = `rgba(255, 107, 107, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateProgress() {
        // Smooth progress animation
        this.progress += (this.targetProgress - this.progress) * 0.1;
        
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = this.progress + '%';
        }
    }

    animateLetters() {
        const letters = document.querySelectorAll('.logo-letter');
        letters.forEach((letter, index) => {
            if (this.progress > index * 12.5) {
                if (!letter.classList.contains('animate-bounceIn')) {
                    letter.classList.add('animate-bounceIn');
                    letter.style.animationDelay = (index * 0.1) + 's';
                }
            }
        });
    }

    simulateLoading() {
        const milestones = [
            { progress: 15, message: 'Inizializzando canvas...', delay: 300 },
            { progress: 30, message: 'Caricando risorse...', delay: 500 },
            { progress: 45, message: 'Preparando animazioni...', delay: 400 },
            { progress: 60, message: 'Configurando interfaccia...', delay: 600 },
            { progress: 75, message: 'Ottimizzando performance...', delay: 400 },
            { progress: 90, message: 'Finalizzando...', delay: 300 },
            { progress: 100, message: 'Completato!', delay: 500 }
        ];

        let currentMilestone = 0;

        const loadNextMilestone = () => {
            if (currentMilestone < milestones.length) {
                const milestone = milestones[currentMilestone];
                
                setTimeout(() => {
                    this.targetProgress = milestone.progress;
                    
                    const loadingText = document.querySelector('.loading-text');
                    if (loadingText) {
                        loadingText.textContent = milestone.message;
                        loadingText.style.animation = 'fadeInUp 0.5s ease';
                    }
                    
                    currentMilestone++;
                    loadNextMilestone();
                }, milestone.delay);
            }
        };

        loadNextMilestone();
    }

    async show() {
        return new Promise((resolve) => {
            this.element.classList.remove('hidden');
            this.isVisible = true;
            resolve();
        });
    }

    async hide() {
        return new Promise((resolve) => {
            // Final animation before hiding
            this.element.style.animation = 'fadeOut 1s ease forwards';
            
            // Stop particle animation
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            setTimeout(() => {
                this.element.classList.add('hidden');
                this.isVisible = false;
                resolve();
            }, 1000);
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.isVisible = false;
    }
}

// CSS for loading animations (added dynamically)
const loadingStyles = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; visibility: hidden; }
    }
    
    .loading-text {
        animation: none !important;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);
