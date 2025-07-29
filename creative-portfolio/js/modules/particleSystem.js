// ===== GLOBAL PARTICLE SYSTEM WITH ADVANCED EFFECTS =====
export class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.attractors = [];
        this.isActive = false;
        
        this.settings = {
            maxParticles: 100,
            particleSize: { min: 1, max: 4 },
            speed: { min: 0.5, max: 2 },
            opacity: { min: 0.1, max: 0.8 },
            colors: [
                'rgba(78, 205, 196, 0.6)',
                'rgba(255, 107, 107, 0.6)',
                'rgba(255, 159, 67, 0.6)',
                'rgba(156, 136, 255, 0.6)',
                'rgba(255, 255, 255, 0.3)'
            ],
            connectionDistance: 100,
            attractorRadius: 150,
            mouseRadius: 80
        };
        
        this.mouse = { x: 0, y: 0 };
        this.lastTime = 0;
        this.animationId = null;
        
        this.init();
    }

    async init() {
        this.createCanvas();
        this.setupEventListeners();
        this.generateParticles();
        this.start();
        
        console.log('✨ Particle System initialized');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Touch tracking for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        });
        
        // Visibility API for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }

    generateParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.settings.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle(x, y) {
        return {
            x: x !== undefined ? x : Math.random() * window.innerWidth,
            y: y !== undefined ? y : Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * this.settings.speed.max,
            vy: (Math.random() - 0.5) * this.settings.speed.max,
            size: this.settings.particleSize.min + 
                  Math.random() * (this.settings.particleSize.max - this.settings.particleSize.min),
            opacity: this.settings.opacity.min + 
                     Math.random() * (this.settings.opacity.max - this.settings.opacity.min),
            color: this.settings.colors[Math.floor(Math.random() * this.settings.colors.length)],
            life: 1,
            maxLife: 1,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.02,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.05 + Math.random() * 0.1,
            trail: []
        };
    }

    addAttractor(x, y, strength = 1, radius = 150) {
        this.attractors.push({
            x,
            y,
            strength,
            radius,
            active: true
        });
    }

    removeAttractor(index) {
        if (index >= 0 && index < this.attractors.length) {
            this.attractors.splice(index, 1);
        }
    }

    clearAttractors() {
        this.attractors = [];
    }

    // Burst effect for special events
    createBurst(x, y, count = 20, options = {}) {
        const burstOptions = {
            size: options.size || { min: 2, max: 6 },
            speed: options.speed || { min: 2, max: 8 },
            life: options.life || 60,
            colors: options.colors || this.settings.colors,
            ...options
        };
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const speed = burstOptions.speed.min + 
                         Math.random() * (burstOptions.speed.max - burstOptions.speed.min);
            
            const particle = {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: burstOptions.size.min + 
                      Math.random() * (burstOptions.size.max - burstOptions.size.min),
                opacity: 1,
                color: burstOptions.colors[Math.floor(Math.random() * burstOptions.colors.length)],
                life: burstOptions.life,
                maxLife: burstOptions.life,
                angle: angle,
                angleSpeed: (Math.random() - 0.5) * 0.1,
                pulse: 0,
                pulseSpeed: 0.1,
                trail: [],
                burst: true
            };
            
            this.particles.push(particle);
        }
    }

    // Trail effect for mouse movement
    createTrail(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            
            const particle = this.createParticle(x + offsetX, y + offsetY);
            particle.life = 30;
            particle.maxLife = 30;
            particle.trail = true;
            
            this.particles.push(particle);
        }
    }

    update(deltaTime) {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;
            
            // Update angle and pulse
            particle.angle += particle.angleSpeed * deltaTime;
            particle.pulse += particle.pulseSpeed * deltaTime;
            
            // Mouse attraction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.settings.mouseRadius) {
                const force = (1 - distance / this.settings.mouseRadius) * 0.5;
                const angle = Math.atan2(dy, dx);
                particle.vx += Math.cos(angle) * force * deltaTime;
                particle.vy += Math.sin(angle) * force * deltaTime;
            }
            
            // Attractor effects
            this.attractors.forEach(attractor => {
                if (!attractor.active) return;
                
                const dx = attractor.x - particle.x;
                const dy = attractor.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < attractor.radius) {
                    const force = (1 - distance / attractor.radius) * attractor.strength * 0.02;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * deltaTime;
                    particle.vy += Math.sin(angle) * force * deltaTime;
                }
            });
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Boundary wrap
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Update life for burst particles
            if (particle.burst || particle.trail) {
                particle.life--;
                particle.opacity = particle.life / particle.maxLife;
                
                if (particle.life <= 0) {
                    this.particles.splice(index, 1);
                }
            }
            
            // Trail tracking
            if (particle.trail && particle.trail.length) {
                particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
                if (particle.trail.length > 10) {
                    particle.trail.shift();
                }
            }
        });
        
        // Maintain particle count for base particles
        const baseParticles = this.particles.filter(p => !p.burst && !p.trail);
        if (baseParticles.length < this.settings.maxParticles) {
            this.particles.push(this.createParticle());
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.drawConnections();
        
        // Draw particles
        this.particles.forEach(particle => {
            this.drawParticle(particle);
        });
        
        // Draw attractors (for debugging)
        if (false) { // Set to true for debugging
            this.drawAttractors();
        }
    }

    drawParticle(particle) {
        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2);
        
        // Draw trail if exists
        if (particle.trail && particle.trail.length > 1) {
            this.ctx.strokeStyle = particle.color;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
            
            for (let i = 1; i < particle.trail.length; i++) {
                this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
            }
            this.ctx.stroke();
        }
        
        // Main particle
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.angle);
        
        // Glow effect
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = particle.color;
        
        // Particle shape (varies by type)
        this.ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${particle.opacity})`);
        this.ctx.beginPath();
        
        if (particle.burst) {
            // Star shape for burst particles
            this.drawStar(0, 0, 5, pulseSize * 2, pulseSize);
        } else {
            // Circle for normal particles
            this.ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        }
        
        this.ctx.fill();
        this.ctx.restore();
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                // Skip burst/trail particles for connections
                if (p1.burst || p1.trail || p2.burst || p2.trail) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.settings.connectionDistance) {
                    const opacity = (1 - distance / this.settings.connectionDistance) * 0.3;
                    
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawAttractors() {
        this.attractors.forEach(attractor => {
            if (!attractor.active) return;
            
            this.ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(attractor.x, attractor.y, attractor.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.fillStyle = 'rgba(255, 107, 107, 0.1)';
            this.ctx.fill();
        });
    }

    animate(currentTime) {
        if (!this.isActive) return;
        
        const deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to 60fps
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.draw();
        
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.lastTime = performance.now();
        this.animate(this.lastTime);
    }

    pause() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.isActive) {
            this.start();
        }
    }

    stop() {
        this.pause();
        this.particles = [];
        this.attractors = [];
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Preset effects
    startFireworks() {
        const colors = [
            'rgba(255, 107, 107, 0.8)',
            'rgba(78, 205, 196, 0.8)',
            'rgba(255, 159, 67, 0.8)',
            'rgba(156, 136, 255, 0.8)'
        ];
        
        const firework = () => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.7;
            
            this.createBurst(x, y, 30, {
                colors,
                speed: { min: 3, max: 12 },
                size: { min: 2, max: 8 },
                life: 120
            });
            
            setTimeout(firework, 1000 + Math.random() * 2000);
        };
        
        firework();
    }

    startRain() {
        this.settings.colors = ['rgba(173, 216, 230, 0.6)'];
        this.particles.forEach(particle => {
            particle.vy = Math.abs(particle.vy) + 2;
            particle.vx *= 0.1;
        });
    }

    startSnow() {
        this.settings.colors = ['rgba(255, 255, 255, 0.8)'];
        this.particles.forEach(particle => {
            particle.vy = Math.abs(particle.vy) * 0.5;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.size = 2 + Math.random() * 4;
        });
    }

    resetToDefault() {
        this.settings.colors = [
            'rgba(78, 205, 196, 0.6)',
            'rgba(255, 107, 107, 0.6)',
            'rgba(255, 159, 67, 0.6)',
            'rgba(156, 136, 255, 0.6)',
            'rgba(255, 255, 255, 0.3)'
        ];
        this.generateParticles();
    }

    // Utility methods
    setDensity(density) {
        this.settings.maxParticles = Math.max(10, Math.min(200, density));
        this.generateParticles();
    }

    setOpacity(opacity) {
        this.canvas.style.opacity = Math.max(0, Math.min(1, opacity));
    }

    setColors(colors) {
        this.settings.colors = colors;
        this.particles.forEach(particle => {
            particle.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }

    destroy() {
        this.stop();
        
        // Remove event listeners
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Remove canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.attractors = [];
    }
}

// Performance monitor for particle system
export class ParticlePerformanceMonitor {
    constructor(particleSystem) {
        this.particleSystem = particleSystem;
        this.fps = 60;
        this.frameCount = 0;
        this.lastFpsUpdate = performance.now();
        this.performanceHistory = [];
        
        this.startMonitoring();
    }

    startMonitoring() {
        const monitor = () => {
            this.frameCount++;
            const now = performance.now();
            
            if (now - this.lastFpsUpdate >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastFpsUpdate = now;
                
                this.performanceHistory.push(this.fps);
                if (this.performanceHistory.length > 10) {
                    this.performanceHistory.shift();
                }
                
                this.adjustQuality();
            }
            
            if (this.particleSystem.isActive) {
                requestAnimationFrame(monitor);
            }
        };
        
        monitor();
    }

    adjustQuality() {
        const avgFps = this.performanceHistory.reduce((a, b) => a + b, 0) / this.performanceHistory.length;
        
        if (avgFps < 30 && this.particleSystem.settings.maxParticles > 20) {
            // Reduce particle count for better performance
            this.particleSystem.settings.maxParticles = Math.max(20, this.particleSystem.settings.maxParticles - 10);
            console.log('🔧 Reduced particle count for better performance:', this.particleSystem.settings.maxParticles);
        } else if (avgFps > 55 && this.particleSystem.settings.maxParticles < 100) {
            // Increase particle count for better visuals
            this.particleSystem.settings.maxParticles = Math.min(100, this.particleSystem.settings.maxParticles + 5);
        }
    }

    getStats() {
        return {
            fps: this.fps,
            particles: this.particleSystem.particles.length,
            attractors: this.particleSystem.attractors.length,
            avgFps: this.performanceHistory.reduce((a, b) => a + b, 0) / this.performanceHistory.length
        };
    }
}
