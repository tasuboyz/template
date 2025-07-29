// TechFlow - JavaScript principale con effetti WOW
class TechFlowApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.initializeParticles();
        this.initializeTypewriter();
        this.initializeCounters();
        this.initializeScrollAnimations();
        this.initializeInteractiveDemo();
        this.initializePricing();
        this.initializeNavigation();
        this.initializeForm();
        this.initializeFloatingCard();
        this.initializeProgressBars();
        this.initializeCharts();
        this.initializeAPIDemo();
        this.initializeWorkflowDemo();
        this.initializeFeatureAnimations();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
        
        // Navigation
        document.getElementById('hamburger')?.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        // Hero buttons
        document.getElementById('startFreeBtn')?.addEventListener('click', this.handleStartFree.bind(this));
        document.getElementById('watchVideoBtn')?.addEventListener('click', this.handleWatchVideo.bind(this));
        
        // Modal
        document.getElementById('closeModal')?.addEventListener('click', this.closeModal.bind(this));
        
        // Form
        document.getElementById('contactForm')?.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Demo controls
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', this.switchDemo.bind(this));
        });
        
        // API navigation
        document.querySelectorAll('.api-nav-item').forEach(item => {
            item.addEventListener('click', this.switchAPIEndpoint.bind(this));
        });
        
        // Pricing toggle
        document.getElementById('billingToggle')?.addEventListener('click', this.toggleBilling.bind(this));
        
        // Try API buttons
        document.querySelectorAll('.try-api').forEach(btn => {
            btn.addEventListener('click', this.tryAPI.bind(this));
        });
        
        // Workflow demo
        document.getElementById('runWorkflow')?.addEventListener('click', this.runWorkflowDemo.bind(this));
        
        // Refresh data
        document.getElementById('refreshData')?.addEventListener('click', this.refreshAnalyticsData.bind(this));
        
        // Test API
        document.getElementById('testApi')?.addEventListener('click', this.testAPIDemo.bind(this));
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        this.updateActiveNavLink();
        this.revealAnimations();
    }

    handleResize() {
        this.resizeParticleCanvas();
        this.resizeCharts();
    }

    handleLoad() {
        this.startInitialAnimations();
    }

    // Navigation
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        navMenu?.classList.toggle('active');
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

    // Particles System
    initializeParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 60;
        
        this.resizeParticleCanvas();
        this.createParticles();
        this.animateParticles();
    }

    resizeParticleCanvas() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    createParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${240 + Math.random() * 60}, 70%, 60%)`
            });
        }
    }

    animateParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(this.animateParticles.bind(this));
    }

    // Typewriter Effect
    initializeTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        
        const texts = [
            'Intelligenza Artificiale',
            'Automazione Avanzata',
            'Cloud Computing',
            'Machine Learning',
            'Innovazione Digitale'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, speed);
        };
        
        type();
    }

    // Counter Animation
    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
                if (target === 99.9) {
                    element.textContent = '99.9';
                }
            }
        };
        
        updateCounter();
    }

    // Scroll Animations
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => observer.observe(element));
    }

    revealAnimations() {
        // Additional scroll-triggered animations
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Interactive Demo
    initializeInteractiveDemo() {
        this.currentDemo = 'analytics';
        this.updateDemoPanel(this.currentDemo);
    }

    switchDemo(event) {
        const demo = event.target.getAttribute('data-demo');
        if (!demo || demo === this.currentDemo) return;
        
        // Update buttons
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update panels
        this.currentDemo = demo;
        this.updateDemoPanel(demo);
    }

    updateDemoPanel(demo) {
        document.querySelectorAll('.demo-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const targetPanel = document.getElementById(`${demo}-demo`);
        if (targetPanel) {
            targetPanel.classList.add('active');
            
            // Trigger specific animations based on demo
            switch (demo) {
                case 'analytics':
                    this.animateAnalyticsDemo();
                    break;
                case 'automation':
                    this.animateAutomationDemo();
                    break;
                case 'integration':
                    this.animateIntegrationDemo();
                    break;
            }
        }
    }

    animateAnalyticsDemo() {
        const chart = document.getElementById('interactiveChart');
        if (chart) {
            this.drawInteractiveChart(chart);
        }
    }

    animateAutomationDemo() {
        const steps = document.querySelectorAll('.workflow-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
                const status = step.querySelector('.step-status');
                if (status) {
                    status.classList.add('processing');
                    setTimeout(() => {
                        status.classList.remove('processing');
                        status.classList.add('active');
                    }, 1000);
                }
            }, index * 1000);
        });
    }

    animateIntegrationDemo() {
        // Animate API request/response
        setTimeout(() => {
            const response = document.getElementById('apiResponse');
            if (response) {
                response.innerHTML = `<code>{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Mario Rossi",
        "email": "mario@example.com"
      }
    ],
    "total": 1
  },
  "timestamp": "${new Date().toISOString()}"
}</code>`;
            }
        }, 1000);
    }

    // Pricing
    initializePricing() {
        this.isYearly = false;
    }

    toggleBilling() {
        const toggle = document.getElementById('billingToggle');
        const monthlyAmounts = document.querySelectorAll('.amount.monthly');
        const yearlyAmounts = document.querySelectorAll('.amount.yearly');
        
        this.isYearly = !this.isYearly;
        
        if (this.isYearly) {
            toggle.classList.add('active');
            monthlyAmounts.forEach(amount => amount.style.display = 'none');
            yearlyAmounts.forEach(amount => amount.style.display = 'inline');
        } else {
            toggle.classList.remove('active');
            monthlyAmounts.forEach(amount => amount.style.display = 'inline');
            yearlyAmounts.forEach(amount => amount.style.display = 'none');
        }
    }

    // Progress Bars
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Floating Card
    initializeFloatingCard() {
        const card = document.getElementById('floatingCard');
        if (!card) return;
        
        // Add mouse interaction
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }

    // Charts
    initializeCharts() {
        this.drawMiniChart();
    }

    drawMiniChart() {
        const canvas = document.getElementById('miniChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Sample data
        const data = [30, 45, 35, 60, 55, 70, 65, 80, 75, 90];
        const max = Math.max(...data);
        
        // Draw line chart
        ctx.beginPath();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / max) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
        
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / max) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    drawInteractiveChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Sample data for analytics
        const salesData = [
            { month: 'Gen', value: 45000 },
            { month: 'Feb', value: 52000 },
            { month: 'Mar', value: 48000 },
            { month: 'Apr', value: 61000 },
            { month: 'Mag', value: 55000 },
            { month: 'Giu', value: 67000 }
        ];
        
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        const max = Math.max(...salesData.map(d => d.value));
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, height - margin.bottom);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, height - margin.bottom);
        ctx.lineTo(width - margin.right, height - margin.bottom);
        ctx.stroke();
        
        // Draw bars
        const barWidth = chartWidth / salesData.length * 0.8;
        const barSpacing = chartWidth / salesData.length * 0.2;
        
        salesData.forEach((data, index) => {
            const barHeight = (data.value / max) * chartHeight;
            const x = margin.left + index * (barWidth + barSpacing) + barSpacing / 2;
            const y = height - margin.bottom - barHeight;
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw labels
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(data.month, x + barWidth / 2, height - margin.bottom + 20);
        });
    }

    resizeCharts() {
        // Resize charts on window resize
        setTimeout(() => {
            this.drawMiniChart();
            const interactiveChart = document.getElementById('interactiveChart');
            if (interactiveChart) {
                this.drawInteractiveChart(interactiveChart);
            }
        }, 100);
    }

    // API Demo
    initializeAPIDemo() {
        this.currentAPIEndpoint = 'auth';
        this.updateAPIEndpoint(this.currentAPIEndpoint);
    }

    switchAPIEndpoint(event) {
        const endpoint = event.target.getAttribute('data-endpoint');
        if (!endpoint || endpoint === this.currentAPIEndpoint) return;
        
        // Update navigation
        document.querySelectorAll('.api-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update content
        this.currentAPIEndpoint = endpoint;
        this.updateAPIEndpoint(endpoint);
    }

    updateAPIEndpoint(endpoint) {
        document.querySelectorAll('.api-endpoint').forEach(ep => {
            ep.classList.remove('active');
        });
        
        const targetEndpoint = document.getElementById(`${endpoint}-endpoint`);
        if (targetEndpoint) {
            targetEndpoint.classList.add('active');
        }
    }

    tryAPI(event) {
        const endpoint = event.target.getAttribute('data-endpoint');
        const button = event.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Eseguendo...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Completato!';
            button.style.background = 'linear-gradient(135deg, #28ca42, #20a034)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
            
            this.showToast('API testata con successo!');
        }, 2000);
    }

    // Workflow Demo
    runWorkflowDemo() {
        const steps = document.querySelectorAll('.workflow-step');
        const button = document.getElementById('runWorkflow');
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Eseguendo...';
        button.disabled = true;
        
        // Reset steps
        steps.forEach(step => {
            step.classList.remove('active');
            const status = step.querySelector('.step-status');
            status.classList.remove('active', 'processing');
        });
        
        // Animate steps
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
                const status = step.querySelector('.step-status');
                status.classList.add('processing');
                
                setTimeout(() => {
                    status.classList.remove('processing');
                    status.classList.add('active');
                    
                    if (index === steps.length - 1) {
                        button.innerHTML = '<i class="fas fa-play"></i> Esegui';
                        button.disabled = false;
                        this.showToast('Workflow completato con successo!');
                    }
                }, 1500);
            }, index * 2000);
        });
    }

    // Analytics Data Refresh
    refreshAnalyticsData() {
        const salesNumber = document.getElementById('salesNumber');
        const usersNumber = document.getElementById('usersNumber');
        const conversionNumber = document.getElementById('conversionNumber');
        const button = document.getElementById('refreshData');
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Aggiornando...';
        button.disabled = true;
        
        // Simulate data refresh
        setTimeout(() => {
            if (salesNumber) {
                const newSales = 220000 + Math.floor(Math.random() * 50000);
                salesNumber.textContent = `€${newSales.toLocaleString()}`;
            }
            
            if (usersNumber) {
                const newUsers = 11000 + Math.floor(Math.random() * 3000);
                usersNumber.textContent = newUsers.toLocaleString();
            }
            
            if (conversionNumber) {
                const newConversion = (3 + Math.random() * 2).toFixed(2);
                conversionNumber.textContent = `${newConversion}%`;
            }
            
            button.innerHTML = '<i class="fas fa-sync-alt"></i> Aggiorna';
            button.disabled = false;
            
            this.showToast('Dati aggiornati!');
        }, 1500);
    }

    // API Test Demo
    testAPIDemo() {
        const responseElement = document.getElementById('apiResponse');
        const button = document.getElementById('testApi');
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
        button.disabled = true;
        
        setTimeout(() => {
            if (responseElement) {
                responseElement.innerHTML = `<code>{
  "status": "success",
  "data": {
    "response_time": "42ms",
    "server": "eu-west-1",
    "version": "1.2.3"
  },
  "timestamp": "${new Date().toISOString()}"
}</code>`;
            }
            
            button.innerHTML = '<i class="fas fa-code"></i> Test API';
            button.disabled = false;
            
            this.showToast('API testata con successo!');
        }, 2000);
    }

    // Feature Animations
    initializeFeatureAnimations() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.animateFeatureDemo(card, index);
            });
        });
    }

    animateFeatureDemo(card, index) {
        const demo = card.querySelector('.feature-demo');
        if (!demo) return;
        
        switch (index) {
            case 0: // AI Demo
                this.animateAIDemo(demo);
                break;
            case 1: // Workflow Demo
                this.animateWorkflowFeature(demo);
                break;
            case 2: // Security Demo
                this.animateSecurityDemo(demo);
                break;
            case 3: // Scale Demo
                this.animateScaleDemo(demo);
                break;
            case 4: // API Demo
                this.animateAPIFeature(demo);
                break;
            case 5: // Dashboard Demo
                this.animateDashboardFeature(demo);
                break;
        }
    }

    animateAIDemo(demo) {
        const chart = demo.querySelector('.demo-chart');
        if (chart) {
            chart.style.animation = 'none';
            setTimeout(() => {
                chart.style.animation = 'shimmer 2s infinite';
            }, 10);
        }
    }

    animateWorkflowFeature(demo) {
        const nodes = demo.querySelector('.workflow-nodes');
        if (nodes) {
            nodes.classList.add('animate');
            setTimeout(() => {
                nodes.classList.remove('animate');
            }, 2000);
        }
    }

    animateSecurityDemo(demo) {
        const indicator = demo.querySelector('.security-indicator');
        if (indicator) {
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'securityPulse 2s infinite';
            }, 10);
        }
    }

    animateScaleDemo(demo) {
        const bars = demo.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.animation = 'none';
            setTimeout(() => {
                bar.style.animation = `scaleGrow 2s infinite ease-in-out ${index * 0.2}s`;
            }, 10);
        });
    }

    animateAPIFeature(demo) {
        const lines = demo.querySelectorAll('.code-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.animation = `codeFadeIn 0.5s ease-out forwards`;
                line.style.animationDelay = `${index * 0.5}s`;
            }, 10);
        });
    }

    animateDashboardFeature(demo) {
        const values = demo.querySelectorAll('.value');
        values.forEach(value => {
            value.style.animation = 'none';
            setTimeout(() => {
                value.style.animation = 'valueUpdate 2s infinite ease-in-out';
            }, 10);
        });
    }

    // Form Handling
    initializeForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        // Add floating label effect
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const button = event.target.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.classList.add('loading');
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
            
            this.showToast('Messaggio inviato con successo!');
            event.target.reset();
            
            // Remove focused states
            const formGroups = event.target.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('focused'));
        }, 2000);
    }

    // Video Modal
    handleStartFree() {
        // Scroll to demo section
        const demoSection = document.getElementById('demo');
        if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleWatchVideo() {
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        
        if (modal && iframe) {
            iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            modal.classList.add('active');
        }
    }

    closeModal() {
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        
        if (modal && iframe) {
            modal.classList.remove('active');
            iframe.src = '';
        }
    }

    // Toast Notifications
    showToast(message) {
        const toast = document.getElementById('successToast');
        if (!toast) return;
        
        toast.querySelector('span').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Initial Animations
    startInitialAnimations() {
        // Animate progress bars in floating card
        setTimeout(() => {
            const progressBars = document.querySelectorAll('#floatingCard .progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }, 1000);
        
        // Start feature animations
        setTimeout(() => {
            this.initializeFeatureAnimations();
        }, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechFlowApp();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
