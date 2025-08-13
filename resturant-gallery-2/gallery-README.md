# FoodGallery - Immersive Culinary Experience Template

## 🎨 Design Overview

**FoodGallery** è un template immersivo per ristoranti con design gallery unico ed effetti "WOW". Sviluppato con approccio mobile-first e JavaScript ES6 moderno, offre un'esperienza visiva spettacolare per il settore della ristorazione.

## ✨ Caratteristiche Uniche

### 🎯 Design Gallery Immersivo
- **Hero Section dinamico** con slideshow automatico
- **Gallery interattiva** con filtri e modal avanzato
- **Menu showcase** con hover effects spettacolari
- **Timeline experience** animata per storytelling
- **Instagram integration** per social engagement

### 🚀 Effetti "WOW"
- **Loading screen** animato con progress bar
- **Parallax scrolling** su hero section
- **Staggered animations** per reveal progressivo
- **Smooth scrolling** con easing personalizzato
- **Modal gallery** con navigazione keyboard
- **Hover transformations** su tutti gli elementi interattivi

### 📱 Mobile-First Approach
- **Responsive design** ottimizzato per tutti i dispositivi
- **Touch-friendly** interactions
- **Performance ottimizzata** per mobile
- **Navigation fluida** con hamburger menu animato

## 📁 Struttura Template

```
foodgallery-template/
├── index.html              # HTML5 strutturato e semantico
├── gallery-styles.css      # CSS3 con animazioni avanzate
├── gallery-app.js          # JavaScript ES6 modulare
├── MAPS-SETUP.md          # Guida setup Google Maps (Iframe)
├── maps-test.html         # Test page per mappe iframe
└── README.md               # Documentazione completa
```

## 🎨 Sezioni Template

### 1. **Loading Screen**
```javascript
// Animazione di caricamento progressiva
- Progress bar animata
- Logo con gradient text
- Dots animation
- Fade out smooth al completamento
```

### 2. **Navigation Bar**
```css
- Fixed header con backdrop-filter
- Brand con gradient text effect
- Menu responsive con animazioni
- CTA button con hover effects
- Mobile hamburger menu
```

### 3. **Hero Section Immersivo**
```javascript
- Background slideshow automatico
- Text animations staggered
- Parallax scrolling effect
- Dual CTA buttons
- Scroll indicator animato
```

### 4. **Gallery Interattiva**
```javascript
const galleryFeatures = {
    filters: ['all', 'dishes', 'drinks', 'desserts', 'atmosphere'],
    modal: 'keyboard navigation + smooth transitions',
    hover: 'transform + overlay effects',
    loading: 'lazy loading + fade-in animations'
};
```

### 5. **Menu Showcase**
```css
- Card-based layout con hover reveals
- Price overlay su image hover
- Category filtering dinamico
- Staggered reveal animations
- Background pattern animato
```

### 6. **Chef Story Section**
```javascript
- Split layout design
- Image hover effects
- Achievement badges animati
- Decorative elements
- Call-to-action integrato
```

### 7. **Experience Timeline**
```css
- Vertical timeline design
- Number badges con gradient
- Content cards con shadow
- Progressive reveal su scroll
- Icon animations
```

### 8. **Instagram Gallery**
```javascript
- Grid layout responsivo
- Hover overlay effects
- Social CTA integration
- Image optimization
```

### 9. **Location & Maps (Iframe)**
```javascript
- Google Maps iframe integrazione (no API key)
- Street View immersivo embed
- Overlay informativa personalizzabile
- Indicazioni stradali automatiche
- Design responsive ottimizzato
- Zero configurazione richiesta
```

### 10. **Contact & Reservation**
```javascript
- Split layout con info + form
- Background overlay effects
- Form validation avanzata
- Success notifications
- Dark theme design
```

## 🛠️ Tecnologie e Features

### **JavaScript ES6+ Moderno**
```javascript
class FoodGalleryApp {
    constructor() {
        this.currentSlide = 0;
        this.galleryItems = [];
        this.menuItems = [];
        this.currentModalIndex = 0;
    }
    
    async init() {
        await this.showLoadingScreen();
        this.initNavigation();
        this.initHeroSlider();
        this.loadGalleryData();
        // ... altre inizializzazioni
    }
}
```

### **CSS3 Avanzato**
```css
/* Animazioni fluide */
@keyframes wordReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Gradient text effects */
background: linear-gradient(45deg, #ff6b35, #f7931e);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Backdrop filters */
backdrop-filter: blur(20px);
```

### **Performance Optimizations**
- **Intersection Observer** per scroll animations
- **Lazy loading** per immagini
- **RequestAnimationFrame** per smooth animations
- **Debounced scroll events**
- **CSS containment** per layout optimization

## 🎨 Color Palette & Design System

### **Colori Principali**
```css
:root {
    --primary-gradient: linear-gradient(45deg, #ff6b35, #f7931e);
    --dark-bg: #000;
    --dark-secondary: #1a1a1a;
    --light-bg: #fff;
    --light-secondary: #f8f9fa;
    --text-primary: #333;
    --text-secondary: #666;
    --text-light: rgba(255, 255, 255, 0.8);
}
```

### **Typography**
```css
/* Headers */
font-family: 'Playfair Display', serif;

/* Body text */
font-family: 'Inter', sans-serif;

/* Font weights: 300, 400, 500, 600, 700, 900 */
```

### **Spacing System**
```css
/* Consistent spacing scale */
margin/padding: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 5rem
```

## 🚀 Setup e Customization

### **Quick Start**
```bash
# 1. Download files
# 2. Apri gallery-index.html in browser moderno
# 3. Per sviluppo locale:

# Con Live Server (VS Code)
# Installa estensione Live Server
# Click destro su gallery-index.html -> "Open with Live Server"

# Con Python
python -m http.server 8000

# Con Node.js
npx serve .
```

### **Customization Rapida**

#### 1. **Branding**
```javascript
// Modifica in gallery-app.js
const brandConfig = {
    name: "Il Tuo Ristorante",
    subtitle: "Your Tagline Here",
    colors: {
        primary: "#ff6b35",
        secondary: "#f7931e"
    }
};
```

#### 2. **Gallery Items**
```javascript
// Sostituisci array in loadGalleryData()
this.galleryItems = [
    {
        id: 1,
        category: 'dishes',
        title: 'Tuo Piatto',
        description: 'Descrizione...',
        image: 'path/to/your/image.jpg'
    }
    // ... altri items
];
```

#### 3. **Menu Items**
```javascript
// Modifica in loadMenuData()
this.menuItems = [
    {
        id: 1,
        category: 'antipasti',
        title: 'Nome Piatto',
        description: 'Descrizione dettagliata...',
        price: '€XX',
        image: 'path/to/image.jpg'
    }
    // ... altri piatti
];
```

#### 4. **Contact Info**
```html
<!-- Modifica in gallery-index.html -->
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-map-marker-alt"></i>
    </div>
    <div class="contact-text">
        <h4>Indirizzo</h4>
        <p>Il Tuo Indirizzo</p>
    </div>
</div>
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px+ */

/* Tablet */
@media (max-width: 768px) {
    /* Responsive adjustments */
}

/* Desktop */
@media (min-width: 769px) {
    /* Desktop enhancements */
}

/* Large Desktop */
@media (min-width: 1200px) {
    /* Large screen optimizations */
}
```

## ⚡ Performance Features

### **Loading Optimization**
- **Critical CSS** inline per above-the-fold content
- **Lazy loading** per immagini sotto-fold
- **Font preloading** per typography critica
- **Image optimization** con format moderni

### **Runtime Performance**
- **Intersection Observer** invece di scroll events
- **RequestAnimationFrame** per animations
- **CSS transforms** invece di layout properties
- **Memory management** per modal e gallery

### **Accessibility Features**
- **ARIA labels** completi
- **Keyboard navigation** per modal e menu
- **Focus management** per UX inclusiva
- **Screen reader** compatibility
- **Color contrast** WCAG AA compliant

## 🔧 Advanced Features

### **Modal Gallery System**
```javascript
// Navigation con keyboard
document.addEventListener('keydown', (e) => {
    if (modal?.style.display === 'flex') {
        switch(e.key) {
            case 'Escape': this.closeModal(); break;
            case 'ArrowLeft': this.navigateModal(-1); break;
            case 'ArrowRight': this.navigateModal(1); break;
        }
    }
});
```

### **Smooth Scroll Enhancement**
```javascript
// Custom easing function
easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}
```

### **Performance Monitoring**
```javascript
class PerformanceMonitor {
    measurePageLoad() {
        // First Contentful Paint tracking
        // Time to Interactive measurement
        // Cumulative Layout Shift monitoring
    }
}
```

## 🌐 Browser Support

### **Supporto Garantito**
- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

### **Progressive Enhancement**
- **CSS Grid** con Flexbox fallback
- **Intersection Observer** con scroll fallback
- **Backdrop filter** con solid color fallback

## 🚀 Deployment

### **Static Hosting Consigliato**
```bash
# Netlify (consigliato)
netlify deploy --prod --dir .

# Vercel
vercel --prod

# GitHub Pages
# Commit e push su repository GitHub
# Attiva GitHub Pages nelle settings
```

### **Ottimizzazioni Pre-Deploy**
```bash
# Image optimization
# CSS minification
# JavaScript bundling (opzionale)
# Gzip compression
```

## 📊 SEO & Analytics

### **SEO Ready**
```html
<!-- Meta tags ottimizzati -->
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Structured data per ristoranti -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Restaurant Name",
    // ... structured data
}
</script>
```

### **Analytics Integration**
```javascript
// Google Analytics 4 ready
// Event tracking per interactions
// Performance metrics tracking
// User journey analysis
```

---

**Template Name**: FoodGallery  
**Version**: 1.0.0  
**Release Date**: Agosto 2025  
**License**: MIT  
**Target**: Ristoranti Premium & Fine Dining
