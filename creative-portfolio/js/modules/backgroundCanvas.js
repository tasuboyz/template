// ===== SPECTACULAR BACKGROUND CANVAS WITH 3D EFFECTS =====
export class BackgroundCanvas {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas?.getContext('2d');
        this.animationId = null;
        this.isActive = false;
        
        // 3D space configuration
        this.scene = {
            objects: [],
            camera: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 }
        };
        
        // Wave parameters
        this.waves = {
            amplitude: 50,
            frequency: 0.01,
            speed: 0.02,
            time: 0
        };
        
        // Geometric shapes
        this.shapes = [];
        this.connections = [];
        
        // Mouse interaction
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
        this.mouseInfluence = 0.0001;
        
        this.init();
    }

    async init() {
        if (!this.canvas || !this.ctx) return;
        
        await this.setupCanvas();
        this.createScene();
        this.setupEventListeners();
        
        console.log('🎨 Background Canvas initialized');
    }

    async setupCanvas() {
        this.resizeCanvas();
        
        // Set canvas style
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.8';
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        this.ctx.scale(dpr, dpr);
        
        // Recreate scene objects with new dimensions
        this.createScene();
    }

    createScene() {
        this.shapes = [];
        this.connections = [];
        
        // Create floating geometric shapes
        this.createFloatingShapes();
        
        // Create connection network
        this.createConnectionNetwork();
        
        // Create wave patterns
        this.createWavePattern();
    }

    createFloatingShapes() {
        const shapeCount = Math.min(20, Math.floor((window.innerWidth * window.innerHeight) / 50000));
        
        for (let i = 0; i < shapeCount; i++) {
            this.shapes.push({
                type: Math.floor(Math.random() * 4), // 0: circle, 1: triangle, 2: square, 3: hexagon
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 1000 + 100,
                size: Math.random() * 30 + 10,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5,
                    z: (Math.random() - 0.5) * 2
                },
                color: this.getRandomColor(),
                alpha: Math.random() * 0.5 + 0.3,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }

    createConnectionNetwork() {
        const nodeCount = Math.min(15, Math.floor(window.innerWidth / 100));
        
        for (let i = 0; i < nodeCount; i++) {
            const node = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                connections: []
            };
            
            this.connections.push(node);
        }
    }

    createWavePattern() {
        this.waves.points = [];
        const pointCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < pointCount; i++) {
            this.waves.points.push({
                x: (window.innerWidth / pointCount) * i,
                baseY: window.innerHeight * 0.7,
                amplitude: this.waves.amplitude * (Math.random() * 0.5 + 0.5),
                frequency: this.waves.frequency * (Math.random() * 0.5 + 0.75),
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    getRandomColor() {
        const colors = [
            { r: 255, g: 107, b: 107 }, // Primary
            { r: 78, g: 205, b: 196 },  // Secondary
            { r: 69, g: 183, b: 209 },  // Accent
            { r: 102, g: 126, b: 234 }, // Purple
            { r: 255, g: 193, b: 7 }    // Yellow
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupEventListeners() {
        // Mouse movement for interactive effects
        document.addEventListener('mousemove', (e) => {
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.prevX = this.mouse.x;
                this.mouse.prevY = this.mouse.y;
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        });

        // Scroll interaction
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            this.scene.rotation.y = scrollPercent * Math.PI * 2;
        });
    }

    startAnimation() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.animate();
        
        console.log('🎬 Background animation started');
    }

    animate() {
        if (!this.isActive) return;
        
        this.updateScene();
        this.renderScene();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateScene() {
        this.waves.time += this.waves.speed;
        
        // Update floating shapes
        this.updateFloatingShapes();
        
        // Update connection network
        this.updateConnectionNetwork();
        
        // Update wave pattern
        this.updateWavePattern();
        
        // Mouse influence
        this.applyMouseInfluence();
    }

    updateFloatingShapes() {
        this.shapes.forEach(shape => {
            // Update position
            shape.x += shape.velocity.x;
            shape.y += shape.velocity.y;
            shape.z += shape.velocity.z;
            
            // Update rotation
            shape.rotation += shape.rotationSpeed;
            
            // Update pulse
            shape.pulse += shape.pulseSpeed;
            
            // Wrap around screen
            if (shape.x < -shape.size) shape.x = window.innerWidth + shape.size;
            if (shape.x > window.innerWidth + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = window.innerHeight + shape.size;
            if (shape.y > window.innerHeight + shape.size) shape.y = -shape.size;
            
            // Z-axis boundaries
            if (shape.z < 50) {
                shape.z = 1000;
                shape.x = Math.random() * window.innerWidth;
                shape.y = Math.random() * window.innerHeight;
            }
            if (shape.z > 1000) {
                shape.z = 50;
            }
        });
    }

    updateConnectionNetwork() {
        this.connections.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary reflection
            if (node.x <= 0 || node.x >= window.innerWidth) node.vx *= -1;
            if (node.y <= 0 || node.y >= window.innerHeight) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(window.innerWidth, node.x));
            node.y = Math.max(0, Math.min(window.innerHeight, node.y));
        });
    }

    updateWavePattern() {
        this.waves.points.forEach(point => {
            const distanceToMouse = Math.sqrt(
                Math.pow(point.x - this.mouse.x, 2) + 
                Math.pow(point.baseY - this.mouse.y, 2)
            );
            
            const mouseInfluence = Math.max(0, 1 - distanceToMouse / 200);
            const extraAmplitude = mouseInfluence * 50;
            
            point.y = point.baseY + 
                Math.sin(this.waves.time + point.phase) * (point.amplitude + extraAmplitude);
        });
    }

    applyMouseInfluence() {
        const mouseVelocity = Math.sqrt(
            Math.pow(this.mouse.x - this.mouse.prevX, 2) + 
            Math.pow(this.mouse.y - this.mouse.prevY, 2)
        );
        
        // Influence shapes near mouse
        this.shapes.forEach(shape => {
            const distance = Math.sqrt(
                Math.pow(shape.x - this.mouse.x, 2) + 
                Math.pow(shape.y - this.mouse.y, 2)
            );
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(shape.y - this.mouse.y, shape.x - this.mouse.x);
                
                shape.velocity.x += Math.cos(angle) * force * this.mouseInfluence * mouseVelocity;
                shape.velocity.y += Math.sin(angle) * force * this.mouseInfluence * mouseVelocity;
                
                // Damping
                shape.velocity.x *= 0.98;
                shape.velocity.y *= 0.98;
            }
        });
    }

    renderScene() {
        if (!this.ctx) return;
        
        // Clear canvas with subtle gradient
        this.clearCanvas();
        
        // Render wave pattern
        this.renderWavePattern();
        
        // Render connection network
        this.renderConnectionNetwork();
        
        // Render floating shapes
        this.renderFloatingShapes();
        
        // Render particle effects
        this.renderParticleEffects();
    }

    clearCanvas() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        gradient.addColorStop(0, 'rgba(15, 15, 15, 1)');
        gradient.addColorStop(0.5, 'rgba(26, 26, 26, 1)');
        gradient.addColorStop(1, 'rgba(15, 15, 15, 1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    renderWavePattern() {
        if (!this.waves.points.length) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.waves.points[0].x, this.waves.points[0].y);
        
        for (let i = 1; i < this.waves.points.length; i++) {
            this.ctx.lineTo(this.waves.points[i].x, this.waves.points[i].y);
        }
        
        this.ctx.lineTo(window.innerWidth, window.innerHeight);
        this.ctx.lineTo(0, window.innerHeight);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        gradient.addColorStop(0, 'rgba(255, 107, 107, 0.05)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0.1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Wave line
        this.ctx.beginPath();
        this.ctx.moveTo(this.waves.points[0].x, this.waves.points[0].y);
        for (let i = 1; i < this.waves.points.length; i++) {
            this.ctx.lineTo(this.waves.points[i].x, this.waves.points[i].y);
        }
        this.ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    renderConnectionNetwork() {
        // Draw connections between nearby nodes
        for (let i = 0; i < this.connections.length; i++) {
            for (let j = i + 1; j < this.connections.length; j++) {
                const node1 = this.connections[i];
                const node2 = this.connections[j];
                
                const distance = Math.sqrt(
                    Math.pow(node1.x - node2.x, 2) + 
                    Math.pow(node1.y - node2.y, 2)
                );
                
                if (distance < 200) {
                    const alpha = (200 - distance) / 200 * 0.2;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.strokeStyle = `rgba(78, 205, 196, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        this.connections.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(78, 205, 196, 0.6)';
            this.ctx.fill();
        });
    }

    renderFloatingShapes() {
        this.shapes.forEach(shape => {
            this.ctx.save();
            
            // 3D perspective effect
            const scale = 1000 / (1000 - shape.z + 100);
            const alpha = Math.max(0.1, shape.alpha * (shape.z / 1000));
            const size = shape.size * scale * (1 + Math.sin(shape.pulse) * 0.1);
            
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);
            this.ctx.scale(scale, scale);
            
            // Create gradient
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gradient.addColorStop(0, `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            
            // Draw shape based on type
            this.drawShape(shape.type, size);
            
            this.ctx.restore();
        });
    }

    drawShape(type, size) {
        this.ctx.beginPath();
        
        switch (type) {
            case 0: // Circle
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                break;
                
            case 1: // Triangle
                this.ctx.moveTo(0, -size);
                this.ctx.lineTo(-size * 0.866, size * 0.5);
                this.ctx.lineTo(size * 0.866, size * 0.5);
                this.ctx.closePath();
                break;
                
            case 2: // Square
                this.ctx.rect(-size, -size, size * 2, size * 2);
                break;
                
            case 3: // Hexagon
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * size;
                    const y = Math.sin(angle) * size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                break;
        }
        
        this.ctx.fill();
    }

    renderParticleEffects() {
        // Subtle particle effects around mouse
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + Date.now() * 0.001;
            const radius = 30 + Math.sin(Date.now() * 0.003 + i) * 10;
            
            const x = this.mouse.x + Math.cos(angle) * radius;
            const y = this.mouse.y + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 107, 107, ${0.3 + Math.sin(Date.now() * 0.005 + i) * 0.2})`;
            this.ctx.fill();
        }
    }

    pause() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resume() {
        if (!this.isActive) {
            this.startAnimation();
        }
    }

    destroy() {
        this.pause();
        
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    handleResize() {
        this.resizeCanvas();
    }
}
