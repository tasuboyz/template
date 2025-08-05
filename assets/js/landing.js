/* ========================================
   PORTFOLIO & TEMPLATE SHOWCASE
   Interactive JavaScript with WOW Effects
   ======================================== */

// DOM Elements
const elements = {
  mobileToggle: document.getElementById('mobile-toggle'),
  navMenu: document.getElementById('nav-menu'),
  backToTop: document.getElementById('back-to-top'),
  header: document.querySelector('.header'),
  heroStats: document.querySelectorAll('.stat-number'),
  navLinks: document.querySelectorAll('.nav-link'),
  templatesGrid: document.querySelector('.templates-grid'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  modal: document.getElementById('template-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalBody: document.getElementById('modal-body'),
  modalDemoLink: document.getElementById('modal-demo-link')
};

// Global State
const state = {
  currentFilter: 'all',
  scrollPosition: 0,
  isLoading: false,
  templatesData: null
};

// Template Data with Personal Projects Integration
const portfolioData = {
  personal: {
    name: "Tasuhiro Davide Kato",
    tagline: "IT Support & AI Developer",
    description: "Trasformo idee in soluzioni intelligenti attraverso il codice",
    github: "tasuboyz",
    email: "tasuhiro.davide@gmail.com",
    phone: "+39 371-1369107",
    location: "Gussago (BS), Italia"
  },
  projects: [
    {
      id: 'leonardo-ai-bot',
      title: 'Leonardo AI Telegram Bot',
      category: 'ai',
      description: 'Web app Telegram con integrazione completa delle funzionalità Leonardo AI',
      technologies: ['Python', 'Telegram API', 'Leonardo AI', 'Web App'],
      github: 'https://github.com/tasuboyz/Leonardo-AI-Telegram-Bot',
      featured: true,
      image: 'assets/img/leonardo-ai-bot.svg',
      tags: ['AI', 'Telegram', 'Bot', 'Leonardo AI']
    },
    {
      id: 'curation-stats',
      title: 'Steem Curation Analytics',
      category: 'data',
      description: 'Progetto per analizzare i curatori su Steem con metriche avanzate',
      technologies: ['Python', 'Data Analysis', 'Steem API', 'Analytics'],
      github: 'https://github.com/tasuboyz/curation-stats',
      featured: true,
      image: 'assets/img/curation-stats.svg',
      tags: ['Data Analysis', 'Blockchain', 'Steem', 'Analytics']
    },
    {
      id: 'steem-curation-manager',
      title: 'Steem/Hive Curation Manager',
      category: 'automation',
      description: 'Sistema automatizzato per la gestione della curation con modalità automatica',
      technologies: ['Python', 'Automation', 'Steem API', 'Hive API'],
      github: 'https://github.com/tasuboyz/steem___hive_curation_manager',
      featured: true,
      image: 'assets/img/curation-manager.svg',
      tags: ['Automation', 'Blockchain', 'Curation', 'API']
    },
    {
      id: 'telegram-archive-bot',
      title: 'Telegram File Archive Bot',
      category: 'automation',
      description: 'Bot innovativo per controllo remoto di cartelle e file server con funzionalità complete',
      technologies: ['Python', 'Telegram API', 'File Management', 'Server Monitoring'],
      github: 'https://github.com/tasuboyz/Telegram-bot-archive',
      featured: false,
      image: 'assets/img/telegram-archive.svg',
      tags: ['Telegram', 'File Management', 'Server', 'Monitoring']
    },
    {
      id: 'lead-generation',
      title: 'Automated Lead Generation',
      category: 'automation',
      description: 'Sistema per automatizzare l\'estrazione di lead e integrazione CRM',
      technologies: ['Python', 'CRM Integration', 'Data Mining', 'Automation'],
      github: 'https://github.com/tasuboyz/lead-generation',
      featured: false,
      image: 'assets/img/lead-generation.svg',
      tags: ['Lead Generation', 'CRM', 'Automation', 'Business']
    }
  ],
  templates: [
    {
      id: 'business-showcase',
      title: 'Business Pro',
      category: 'business',
      description: 'Template professionale per aziende con sezioni complete e servizi',
      path: 'business-showcase/',
      icon: 'fas fa-briefcase',
      color: '#3498db',
      tags: ['Corporate', 'Professional', 'Services', 'Business']
    },
    {
      id: 'creative-portfolio',
      title: 'Creative Studio',
      category: 'creative',
      description: 'Portfolio creativo per designer, artisti e creativi',
      path: 'creative-portfolio/',
      icon: 'fas fa-palette',
      color: '#e74c3c',
      tags: ['Portfolio', 'Creative', 'Design', 'Art']
    },
    {
      id: 'ecommerce-showcase',
      title: 'Elite Store',
      category: 'ecommerce',
      description: 'Vetrina e-commerce moderna e accattivante per negozi online',
      path: 'ecommerce-showcase/',
      icon: 'fas fa-shopping-cart',
      color: '#f39c12',
      tags: ['E-commerce', 'Store', 'Shopping', 'Online']
    },
    {
      id: 'restaurant-showcase',
      title: 'Bella Vista',
      category: 'restaurant',
      description: 'Template elegante per ristoranti, bar e locali gastronomici',
      path: 'restaurant-showcase/',
      icon: 'fas fa-utensils',
      color: '#27ae60',
      tags: ['Restaurant', 'Food', 'Menu', 'Dining']
    },
    {
      id: 'resturant-gallery',
      title: 'Food Gallery',
      category: 'restaurant',
      description: 'Galleria fotografica per ristoranti con focus sui piatti',
      path: 'resturant-gallery/',
      icon: 'fas fa-images',
      color: '#16a085',
      tags: ['Gallery', 'Food', 'Photography', 'Menu']
    },
    {
      id: 'gusto-vivo-restaurant',
      title: 'Gusto Vivo',
      category: 'restaurant',
      description: 'Esperienza gallery immersiva per ristoranti con 300+ immagini gestite dinamicamente',
      path: 'Gusto Vivo - Ristorant Gallery Experience/',
      icon: 'fas fa-utensils',
      color: '#d4af37',
      image: 'assets/img/gusto-vivo-restaurant.svg',
      tags: ['Restaurant', 'Gallery', 'Immersive', 'Fine Dining']
    },
    {
      id: 'restaurant-gallery-2',
      title: 'FoodGallery Pro',
      category: 'restaurant',
      description: 'Template immersivo per ristoranti con design gallery unico ed effetti WOW',
      path: 'resturant-gallery-2/',
      icon: 'fas fa-camera',
      color: '#8b4513',
      image: 'assets/img/restaurant-gallery-2.svg',
      tags: ['Gallery', 'Immersive', 'WOW Effects', 'Culinary']
    },
    {
      id: 'technology-saas',
      title: 'Tech Innovation',
      category: 'technology',
      description: 'Landing page per startup tech, SaaS e software',
      path: 'technology-saas/',
      icon: 'fas fa-laptop-code',
      color: '#9b59b6',
      tags: ['SaaS', 'Technology', 'Startup', 'Software']
    },
    {
      id: 'medical-healthcare',
      title: 'MediCare Pro',
      category: 'medical',
      description: 'Template professionale per cliniche, medici e centri sanitari',
      path: 'medical-healthcare/',
      icon: 'fas fa-heartbeat',
      color: '#e67e22',
      tags: ['Medical', 'Healthcare', 'Clinic', 'Doctor']
    },
    {
      id: 'educational-academy',
      title: 'EduPro Academy',
      category: 'educational',
      description: 'Piattaforma educativa per scuole, corsi online e formazione',
      path: 'educational-academy/',
      icon: 'fas fa-graduation-cap',
      color: '#2980b9',
      tags: ['Education', 'Academy', 'Learning', 'Course']
    },
    {
      id: 'fashion-beauty',
      title: 'Fashion Elite',
      category: 'fashion',
      description: 'Template elegante per brand di moda, bellezza e lifestyle',
      path: 'fashion-beauty/',
      icon: 'fas fa-gem',
      color: '#ff6b9d',
      tags: ['Fashion', 'Beauty', 'Lifestyle', 'Brand']
    },
    {
      id: 'sports-fitness',
      title: 'FitPro',
      category: 'sports',
      description: 'Template dinamico per palestre, personal trainer e sport',
      path: 'sports-fitness/',
      icon: 'fas fa-dumbbell',
      color: '#e74c3c',
      tags: ['Fitness', 'Gym', 'Sport', 'Training']
    },
    {
      id: 'music-entertainment',
      title: 'Music Arena',
      category: 'music',
      description: 'Template per musicisti, band e eventi musicali',
      path: 'music-entertainment/',
      icon: 'fas fa-music',
      color: '#8e44ad',
      tags: ['Music', 'Band', 'Entertainment', 'Events']
    },
    {
      id: 'wedding-events',
      title: 'Wedding Dreams',
      category: 'wedding',
      description: 'Template romantico per matrimoni ed eventi speciali',
      path: 'wedding-events/',
      icon: 'fas fa-heart',
      color: '#ff69b4',
      tags: ['Wedding', 'Events', 'Romance', 'Celebration']
    },
    {
      id: 'travel-tourism',
      title: 'Travel Explorer',
      category: 'travel',
      description: 'Template avventuroso per agenzie viaggi e turismo',
      path: 'travel-tourism/',
      icon: 'fas fa-plane',
      color: '#00bcd4',
      tags: ['Travel', 'Tourism', 'Adventure', 'Vacation']
    },
    {
      id: 'real-estate-showcase',
      title: 'Real Estate Pro',
      category: 'real-estate',
      description: 'Template professionale per agenzie immobiliari e proprietà',
      path: 'real-estate-showcase/',
      icon: 'fas fa-home',
      color: '#795548',
      tags: ['Real Estate', 'Property', 'Investment', 'Housing']
    },
    {
      id: 'non-profit-charity',
      title: 'Charity Care',
      category: 'non-profit',
      description: 'Template ispirante per organizzazioni no-profit e beneficenza',
      path: 'non-profit-charity/',
      icon: 'fas fa-hands-helping',
      color: '#4caf50',
      tags: ['Charity', 'Non-Profit', 'Donation', 'Cause']
    },
    {
      id: 'minimal-onepage',
      title: 'Minimal One',
      category: 'minimal',
      description: 'Template minimalista one-page per presentazioni essenziali',
      path: 'minimal-onepage/',
      icon: 'fas fa-circle',
      color: '#607d8b',
      tags: ['Minimal', 'One Page', 'Clean', 'Simple']
    }
  ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  initializeAnimations();
  loadTemplates();
  setupScrollEffects();
  startCounterAnimations();
  initializeParticles();
}

// Event Listeners Setup
function setupEventListeners() {
  // Mobile menu toggle
  if (elements.mobileToggle) {
    elements.mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Navigation links
  elements.navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Filter buttons
  elements.filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
  });

  // Back to top button
  if (elements.backToTop) {
    elements.backToTop.addEventListener('click', scrollToTop);
  }

  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Close modal on backdrop click
  if (elements.modal) {
    elements.modal.addEventListener('click', (e) => {
      if (e.target === elements.modal) closeModal();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  elements.mobileToggle.classList.toggle('active');
  elements.navMenu.classList.toggle('mobile-menu');
  elements.navMenu.classList.toggle('active');
  document.body.style.overflow = 
    elements.navMenu.classList.contains('active') ? 'hidden' : '';
}

// Navigation Click Handler
function handleNavClick(e) {
  // Remove active class from all nav links
  elements.navLinks.forEach(link => link.classList.remove('active'));
  // Add active class to clicked link
  e.target.classList.add('active');
  
  // Close mobile menu if open
  if (elements.navMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
}

// Anchor Link Handler
function handleAnchorClick(e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    const headerHeight = elements.header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Scroll Effects
function setupScrollEffects() {
  let ticking = false;
  
  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    state.scrollPosition = scrolled;
    
    // Header scroll effect
    if (scrolled > 50) {
      elements.header.classList.add('scrolled');
    } else {
      elements.header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (elements.backToTop) {
      if (scrolled > 300) {
        elements.backToTop.style.opacity = '1';
        elements.backToTop.style.pointerEvents = 'auto';
      } else {
        elements.backToTop.style.opacity = '0';
        elements.backToTop.style.pointerEvents = 'none';
      }
    }
    
    // Update active navigation based on scroll position
    updateActiveNavigation();
    
    ticking = false;
  }
  
  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestScrollUpdate);
}

// Update Active Navigation
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = elements.header.offsetHeight;
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionHeight = section.offsetHeight;
    
    if (state.scrollPosition >= sectionTop && 
        state.scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Counter Animations
function startCounterAnimations() {
  const observerOptions = {
    threshold: 0.7,
    triggerOnce: true
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  elements.heroStats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Template Loading and Filtering
function loadTemplates() {
  if (!elements.templatesGrid) return;
  
  state.isLoading = true;
  
  // Simulate loading delay for effect
  setTimeout(() => {
    renderTemplates();
    state.isLoading = false;
  }, 1000);
}

function renderTemplates() {
  const allItems = [...portfolioData.projects, ...portfolioData.templates];
  const filteredItems = state.currentFilter === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === state.currentFilter);
  
  const templatesHTML = filteredItems.map(item => createTemplateCard(item)).join('');
  
  elements.templatesGrid.innerHTML = templatesHTML;
  
  // Add event listeners to new cards
  addTemplateCardListeners();
  
  // Animate cards in
  animateTemplateCards();
}

function createTemplateCard(item) {
  const isProject = portfolioData.projects.includes(item);
  const cardType = isProject ? 'project' : 'template';
  const link = isProject ? item.github : item.path;
  
  return `
    <div class="template-card ${cardType}" data-category="${item.category}">
      <div class="card-image">
        ${isProject || item.image ? 
          `<img src="${isProject ? item.image : item.image}" alt="${item.title}" loading="lazy">` :
          `<div class="template-icon" style="background: linear-gradient(135deg, ${item.color}22, ${item.color}44);">
            <i class="${item.icon}" style="color: ${item.color}; font-size: 3rem;"></i>
          </div>`
        }
        <div class="card-overlay">
          <div class="card-actions">
            ${isProject ? 
              `<a href="${item.github}" target="_blank" rel="noopener" class="btn btn-primary">
                <i class="fab fa-github"></i> GitHub
              </a>` :
              `<a href="${item.path}" target="_blank" rel="noopener" class="btn btn-primary">
                <i class="fas fa-eye"></i> Demo
              </a>`
            }
            <button class="btn btn-secondary" onclick="${isProject ? 'showProjectModal' : 'showTemplateModal'}('${item.id}')">
              <i class="fas fa-info-circle"></i> Info
            </button>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3>${item.title}</h3>
          <span class="card-badge ${cardType}" style="${!isProject ? `background: ${item.color}; color: white;` : ''}">${isProject ? 'Progetto' : 'Template'}</span>
        </div>
        <p class="card-description">${item.description}</p>
        <div class="card-tags">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function addTemplateCardListeners() {
  const cards = document.querySelectorAll('.template-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', handleCardHover);
    card.addEventListener('mouseleave', handleCardLeave);
  });
}

function handleCardHover(e) {
  const card = e.currentTarget;
  card.style.transform = 'translateY(-10px) scale(1.02)';
  card.style.boxShadow = 'var(--glow-primary)';
}

function handleCardLeave(e) {
  const card = e.currentTarget;
  card.style.transform = '';
  card.style.boxShadow = '';
}

function animateTemplateCards() {
  const cards = document.querySelectorAll('.template-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Filter Handling
function handleFilterClick(e) {
  const button = e.currentTarget;
  const filter = button.dataset.filter;
  
  // Update active filter button
  elements.filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  
  // Update current filter and re-render
  state.currentFilter = filter;
  renderTemplates();
}

// Modal Functions
function showTemplateModal(itemId) {
  const allItems = [...portfolioData.projects, ...portfolioData.templates];
  const item = allItems.find(i => i.id === itemId);
  
  if (!item) return;
  
  const isProject = portfolioData.projects.includes(item);
  
  elements.modalTitle.textContent = item.title;
  elements.modalBody.innerHTML = createModalContent(item, isProject);
  
  if (isProject) {
    elements.modalDemoLink.href = item.github;
    elements.modalDemoLink.innerHTML = '<i class="fab fa-github"></i> Vedi su GitHub';
  } else {
    elements.modalDemoLink.href = item.path;
    elements.modalDemoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Vedi Demo';
  }
  
  elements.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function createModalContent(item, isProject) {
  return `
    <div class="modal-image">
      ${isProject ? 
        `<img src="${item.image}" alt="${item.title}">` :
        `<div class="template-icon-large" style="background: linear-gradient(135deg, ${item.color}22, ${item.color}44); border-radius: 12px; padding: 2rem; text-align: center;">
          <i class="${item.icon}" style="color: ${item.color}; font-size: 4rem;"></i>
        </div>`
      }
    </div>
    <div class="modal-details">
      <p class="modal-description">${item.description}</p>
      ${isProject && item.technologies ? `
        <div class="modal-tech">
          <h4>Tecnologie utilizzate:</h4>
          <div class="tech-tags">
            ${item.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      <div class="modal-tags">
        <h4>Tags:</h4>
        <div class="tag-list">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      ${!isProject ? `
        <div class="template-info">
          <h4>Caratteristiche Template:</h4>
          <ul class="feature-list">
            <li><i class="fas fa-mobile-alt"></i> Design Responsive</li>
            <li><i class="fas fa-code"></i> Codice Pulito</li>
            <li><i class="fas fa-rocket"></i> Performance Ottimizzate</li>
            <li><i class="fas fa-search"></i> SEO Friendly</li>
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

function closeModal() {
  elements.modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Particle Animation
function initializeParticles() {
  const heroParticles = document.querySelector('.hero-particles');
  if (!heroParticles) return;
  
  // Add random floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: var(--primary-color);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s infinite linear;
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    heroParticles.appendChild(particle);
  }
}

// Animation Utilities
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  document.querySelectorAll('.feature-item, .stat-card, .contact-item').forEach(el => {
    observer.observe(el);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
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

// CSS Animation for floating particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); }
    100% { transform: translateY(-100px) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Export functions for global access
window.showTemplateModal = showTemplateModal;
window.showProjectModal = showProjectModal;
window.closeModal = closeModal;

// Project Modal Function
function showProjectModal(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  
  if (!project) return;
  
  elements.modalTitle.textContent = project.title;
  elements.modalBody.innerHTML = createModalContent(project, true);
  
  elements.modalDemoLink.href = project.github;
  elements.modalDemoLink.innerHTML = '<i class="fab fa-github"></i> Vedi su GitHub';
  
  elements.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
