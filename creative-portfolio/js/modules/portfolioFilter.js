// ===== PORTFOLIO FILTER WITH SPECTACULAR ANIMATIONS =====
export class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.portfolioGrid = document.querySelector('.portfolio-grid');
        
        this.activeFilter = 'all';
        this.isAnimating = false;
        
        this.init();
    }

    async init() {
        if (!this.portfolioGrid) return;
        
        this.setupEventListeners();
        this.setupInitialState();
        
        console.log('🎨 Portfolio Filter initialized');
    }

    setupEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (this.isAnimating) return;
                
                const filter = button.dataset.filter;
                this.filterPortfolio(filter);
                this.updateActiveButton(button);
            });

            // Add hover effects
            this.addButtonHoverEffects(button);
        });
    }

    setupInitialState() {
        // Show all items initially
        this.portfolioItems.forEach((item, index) => {
            gsap.set(item, {
                opacity: 0,
                y: 50,
                scale: 0.9
            });
            
            // Stagger animation for initial load
            gsap.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });
    }

    addButtonHoverEffects(button) {
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                // Create glow effect
                this.createGlowEffect(button);
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }

    createGlowEffect(button) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            border-radius: inherit;
            opacity: 0;
            z-index: -1;
            filter: blur(10px);
            animation: glowPulse 0.5s ease-out;
        `;
        
        button.style.position = 'relative';
        button.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 500);
    }

    filterPortfolio(filter) {
        if (this.activeFilter === filter) return;
        
        this.isAnimating = true;
        this.activeFilter = filter;
        
        // Create timeline for smooth filtering
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
            }
        });

        // Phase 1: Hide all items
        tl.to(this.portfolioItems, {
            opacity: 0,
            scale: 0.8,
            y: 30,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in'
        });

        // Phase 2: Rearrange and show filtered items
        tl.call(() => {
            this.rearrangeItems(filter);
        });

        tl.to(this.getVisibleItems(filter), {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        // Add particle explosion effect
        this.createFilterEffect();
    }

    rearrangeItems(filter) {
        this.portfolioItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                item.classList.add('visible');
            } else {
                item.style.display = 'none';
                item.classList.remove('visible');
            }
        });

        // Trigger layout recalculation for CSS Grid
        this.portfolioGrid.style.display = 'none';
        this.portfolioGrid.offsetHeight; // Force reflow
        this.portfolioGrid.style.display = '';
    }

    getVisibleItems(filter) {
        return Array.from(this.portfolioItems).filter(item => {
            const category = item.dataset.category;
            return filter === 'all' || category === filter;
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        activeButton.classList.add('active');
        gsap.to(activeButton, {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });

        // Create selection indicator
        this.createSelectionIndicator(activeButton);
    }

    createSelectionIndicator(button) {
        const indicator = document.createElement('div');
        const rect = button.getBoundingClientRect();
        
        indicator.style.cssText = `
            position: fixed;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            border: 2px solid var(--primary-color);
            border-radius: inherit;
            pointer-events: none;
            z-index: 1000;
            opacity: 1;
            animation: selectionPulse 0.6s ease-out;
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 600);
    }

    createFilterEffect() {
        const centerX = this.portfolioGrid.getBoundingClientRect().left + this.portfolioGrid.offsetWidth / 2;
        const centerY = this.portfolioGrid.getBoundingClientRect().top + this.portfolioGrid.offsetHeight / 2;
        
        // Create burst of particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(centerX, centerY, i);
        }
    }

    createParticle(centerX, centerY, index) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * index) / 20;
        const velocity = 100 + Math.random() * 100;
        const size = 4 + Math.random() * 6;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 1;
        `;
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }

    // Advanced portfolio item interactions
    setupPortfolioInteractions() {
        this.portfolioItems.forEach(item => {
            const image = item.querySelector('.project-image');
            const overlay = item.querySelector('.project-overlay');
            const info = item.querySelector('.project-info');
            const button = item.querySelector('.view-project-btn');

            // Magnetic effect
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                
                const rotateX = (deltaY / rect.height) * 10;
                const rotateY = (deltaX / rect.width) * 10;
                
                gsap.to(item, {
                    rotationX: -rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            // Click handler for view project button
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openProjectModal(item);
                });
            }
        });
    }

    openProjectModal(item) {
        const title = item.querySelector('.project-title').textContent;
        const category = item.querySelector('.project-category').textContent;
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
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
            opacity: 0;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--surface-color);
                border-radius: var(--border-radius-lg);
                padding: var(--spacing-2xl);
                max-width: 600px;
                width: 90%;
                text-align: center;
                transform: scale(0.8);
            ">
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">${title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">${category}</p>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-xl);">
                    Questo è un progetto di esempio. In un portfolio reale, qui ci sarebbero
                    dettagli del progetto, immagini aggiuntive e link al progetto live.
                </p>
                <button onclick="this.closest('.modal').remove()" style="
                    background: var(--gradient-primary);
                    border: none;
                    padding: var(--spacing-md) var(--spacing-xl);
                    border-radius: var(--border-radius);
                    color: var(--text-primary);
                    cursor: pointer;
                    font-weight: 600;
                ">Chiudi</button>
            </div>
        `;
        
        modal.classList.add('modal');
        document.body.appendChild(modal);
        
        // Animate modal in
        gsap.to(modal, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(modal.querySelector('div'), {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
            delay: 0.1
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    destroy() {
        // Cleanup event listeners
        this.filterButtons.forEach(button => {
            button.removeEventListener('click', this.filterPortfolio);
        });
        
        // Kill GSAP animations
        gsap.killTweensOf(this.portfolioItems);
        gsap.killTweensOf(this.filterButtons);
    }
}

// CSS for filter animations
const filterStyles = `
    @keyframes glowPulse {
        0% { opacity: 0; }
        50% { opacity: 0.5; }
        100% { opacity: 0; }
    }
    
    @keyframes selectionPulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.7;
        }
        100% {
            transform: scale(1.2);
            opacity: 0;
        }
    }
    
    .portfolio-item {
        transform-style: preserve-3d;
    }
    
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = filterStyles;
document.head.appendChild(styleSheet);
