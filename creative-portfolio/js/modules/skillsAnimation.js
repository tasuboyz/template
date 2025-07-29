// ===== SKILLS ANIMATION WITH SPECTACULAR EFFECTS =====
export class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.skillItems = document.querySelectorAll('.skill-item');
        this.toolIcons = document.querySelectorAll('.tool-icon');
        this.statsItems = document.querySelectorAll('.stat-item');
        
        this.animatedSkills = new Set();
        this.observer = null;
        
        this.init();
    }

    async init() {
        this.setupIntersectionObserver();
        this.setupToolIconInteractions();
        this.setupSkillBarEffects();
        
        console.log('💪 Skills Animation initialized');
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skill-progress') && !this.animatedSkills.has(entry.target)) {
                        this.animateSkillBar(entry.target);
                        this.animatedSkills.add(entry.target);
                    } else if (entry.target.classList.contains('stat-item') && !this.animatedSkills.has(entry.target)) {
                        this.animateCounter(entry.target);
                        this.animatedSkills.add(entry.target);
                    }
                }
            });
        }, options);

        // Observe skill bars and stat items
        [...this.skillBars, ...this.statsItems].forEach(el => {
            this.observer.observe(el);
        });
    }

    setupToolIconInteractions() {
        this.toolIcons.forEach((icon, index) => {
            // Hover effects
            icon.addEventListener('mouseenter', () => {
                this.createToolIconEffect(icon);
                
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
                
                // Create orbiting particles
                this.createOrbitingParticles(icon);
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Click effect
            icon.addEventListener('click', () => {
                this.createClickExplosion(icon);
                this.showToolTooltip(icon);
            });

            // Floating animation
            this.addFloatingAnimation(icon, index);
        });
    }

    createToolIconEffect(icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create energy rings
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 10px;
                height: 10px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
                opacity: 0.8;
            `;
            
            document.body.appendChild(ring);
            
            gsap.to(ring, {
                width: 100 + i * 30,
                height: 100 + i * 30,
                opacity: 0,
                duration: 1,
                delay: i * 0.2,
                ease: 'power2.out',
                onComplete: () => ring.remove()
            });
        }
    }

    createOrbitingParticles(icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 8;
            const radius = 40;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: var(--secondary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            // Orbit animation
            gsap.to(particle, {
                motionPath: {
                    path: `M0,0 Q${Math.cos(angle) * radius},${Math.sin(angle) * radius} 0,0`,
                    autoRotate: true
                },
                duration: 2,
                repeat: 2,
                ease: 'none',
                onComplete: () => particle.remove()
            });
        }
    }

    createClickExplosion(icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create explosion particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 50 + Math.random() * 100;
            const size = 3 + Math.random() * 4;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                scale: 0,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    showToolTooltip(icon) {
        const toolName = this.getToolName(icon);
        const rect = icon.getBoundingClientRect();
        
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.bottom + 10}px;
            background: var(--surface-color);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            pointer-events: none;
            z-index: 1001;
            transform: translateX(-50%) translateY(10px);
            opacity: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        tooltip.textContent = toolName;
        document.body.appendChild(tooltip);
        
        gsap.to(tooltip, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
        
        setTimeout(() => {
            gsap.to(tooltip, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => tooltip.remove()
            });
        }, 2000);
    }

    getToolName(icon) {
        const toolMap = {
            'photoshop': 'Adobe Photoshop',
            'figma': 'Figma',
            'sketch': 'Sketch',
            'javascript': 'JavaScript',
            'react': 'React'
        };
        
        const toolType = icon.dataset.tool;
        return toolMap[toolType] || 'Tool';
    }

    addFloatingAnimation(icon, index) {
        gsap.to(icon, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    }

    setupSkillBarEffects() {
        this.skillBars.forEach(bar => {
            const skillItem = bar.closest('.skill-item');
            
            skillItem.addEventListener('mouseenter', () => {
                this.createSkillBarGlow(bar);
            });
        });
    }

    createSkillBarGlow(bar) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border-radius: inherit;
            opacity: 0;
            filter: blur(4px);
            z-index: -1;
            animation: skillGlow 1s ease-out;
        `;
        
        bar.style.position = 'relative';
        bar.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 1000);
    }

    animateSkillBar(bar) {
        const targetWidth = bar.dataset.progress + '%';
        const skillName = bar.closest('.skill-item').querySelector('.skill-name').textContent;
        
        // Create particle trail effect
        this.createSkillParticleTrail(bar);
        
        // Animate bar width
        gsap.fromTo(bar,
            { width: '0%' },
            {
                width: targetWidth,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                    // Create random sparkles during animation
                    if (Math.random() < 0.1) {
                        this.createSkillSparkle(bar);
                    }
                }
            }
        );
        
        // Show percentage tooltip
        this.showSkillPercentage(bar, bar.dataset.progress);
    }

    createSkillParticleTrail(bar) {
        const rect = bar.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${rect.left}px;
                    top: ${rect.top + rect.height / 2}px;
                    width: 3px;
                    height: 3px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    opacity: 0.8;
                `;
                
                document.body.appendChild(particle);
                
                gsap.to(particle, {
                    x: rect.width * (bar.dataset.progress / 100),
                    y: Math.random() * 20 - 10,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                });
            }, i * 200);
        }
    }

    createSkillSparkle(bar) {
        const rect = bar.getBoundingClientRect();
        const currentWidth = parseFloat(getComputedStyle(bar).width);
        
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + currentWidth}px;
            top: ${rect.top + rect.height / 2}px;
            width: 4px;
            height: 4px;
            background: var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(sparkle);
        
        gsap.fromTo(sparkle,
            { scale: 0, opacity: 1 },
            { 
                scale: 2, 
                opacity: 0, 
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => sparkle.remove()
            }
        );
    }

    showSkillPercentage(bar, percentage) {
        const rect = bar.getBoundingClientRect();
        
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            left: ${rect.right}px;
            top: ${rect.top - 30}px;
            background: var(--surface-color);
            color: var(--text-primary);
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            pointer-events: none;
            z-index: 1001;
            opacity: 0;
            transform: translateY(10px);
            border: 1px solid var(--primary-color);
        `;
        
        tooltip.textContent = percentage + '%';
        document.body.appendChild(tooltip);
        
        gsap.to(tooltip, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
            delay: 1.5
        });
        
        setTimeout(() => {
            gsap.to(tooltip, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => tooltip.remove()
            });
        }, 3000);
    }

    animateCounter(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        const targetValue = parseInt(statItem.dataset.count) || 0;
        
        if (!numberElement) return;
        
        // Create counter particles
        this.createCounterParticles(statItem);
        
        // Animate number counting
        gsap.fromTo(numberElement,
            { textContent: 0 },
            {
                textContent: targetValue,
                duration: 2.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    // Add + suffix for growing numbers
                    const currentValue = parseInt(this.targets()[0].textContent);
                    if (currentValue === targetValue) {
                        numberElement.textContent = targetValue + '+';
                    }
                }
            }
        );
        
        // Pulse animation for the stat item
        gsap.fromTo(statItem,
            { scale: 1 },
            {
                scale: 1.05,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                delay: 2
            }
        );
    }

    createCounterParticles(statItem) {
        const rect = statItem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 12;
            const radius = 30;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX + Math.cos(angle) * radius}px;
                top: ${centerY + Math.sin(angle) * radius}px;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transform: scale(0);
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                delay: i * 0.05,
                ease: 'back.out(1.7)'
            });
            
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                delay: 1 + i * 0.05,
                ease: 'power2.in',
                onComplete: () => particle.remove()
            });
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Kill all GSAP animations
        gsap.killTweensOf([...this.toolIcons, ...this.skillBars, ...this.statsItems]);
    }
}

// CSS for skill animations
const skillStyles = `
    @keyframes skillGlow {
        0% { opacity: 0; }
        50% { opacity: 0.5; }
        100% { opacity: 0; }
    }
    
    .skill-item {
        position: relative;
    }
    
    .tool-icon {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .stat-item {
        cursor: default;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = skillStyles;
document.head.appendChild(styleSheet);
