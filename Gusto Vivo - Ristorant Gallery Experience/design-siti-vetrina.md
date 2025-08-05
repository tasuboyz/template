# Design per Siti Vetrina - Esempi e Specifiche Tecniche

## Esempio 1: Design Minimalista Elegante

### Caratteristiche
- **Estetica pulita** con ampio uso di spazi bianchi
- **Tipografia serif** per trasmettere eleganza e professionalità
- **Palette colori neutri** (bianco, grigio, nero con un accento dorato)
- **Layout asimmetrico** con elementi posizionati strategicamente
- **Immagini di alta qualità** con focus sui dettagli
- **Animazioni sottili** al passaggio del mouse e allo scroll

### Settori Ideali
- Studi di architettura
- Gioiellerie di lusso
- Fotografi professionali
- Consulenti legali

### Specifiche Tecniche

#### Struttura HTML
```html
<header class="minimal-header">
  <nav class="main-navigation">
    <logo class="brand-logo"></logo>
    <ul class="nav-menu"></ul>
  </nav>
</header>

<main class="content-wrapper">
  <section class="hero-section asymmetric-layout">
    <div class="hero-content">
      <h1 class="hero-title serif-font"></h1>
      <p class="hero-subtitle"></p>
      <button class="cta-button minimal-style"></button>
    </div>
    <div class="hero-image">
      <img class="high-quality-image"></img>
    </div>
  </section>
  
  <section class="services-grid">
    <div class="service-card"></div>
    <!-- Ripeti per ogni servizio -->
  </section>
</main>
```

#### CSS Framework
```css
/* Variabili di design */
:root {
  --primary-color: #ffffff;
  --secondary-color: #f8f8f8;
  --accent-color: #d4a574;
  --text-primary: #2c2c2c;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  --spacing-unit: 2rem;
}

/* Layout principale */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-unit);
}

.asymmetric-layout {
  display: grid;
  grid-template-columns: 1fr 1.618fr; /* Proporzione aurea */
  gap: calc(var(--spacing-unit) * 3);
  align-items: center;
}

/* Tipografia */
.serif-font {
  font-family: var(--font-serif);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Animazioni sottili */
.hover-effect {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
```

#### JavaScript per Interazioni
```javascript
// Animazioni scroll-triggered
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

---

## Esempio 2: Design Vibrante e Dinamico

### Caratteristiche
- **Colori vivaci** e gradients accattivanti
- **Tipografia bold** per massimo impatto visivo
- **Layout a carte** con effetti di profondità
- **Micro-interazioni** coinvolgenti
- **Video background** o animazioni Lottie
- **Design mobile-first** ottimizzato per tutti i dispositivi

### Settori Ideali
- Agenzie creative
- Startup tecnologiche
- Fitness e wellness
- Brand lifestyle

### Specifiche Tecniche

#### Struttura HTML
```html
<header class="dynamic-header">
  <nav class="animated-navigation">
    <div class="logo-container">
      <svg class="animated-logo"></svg>
    </div>
    <ul class="nav-items">
      <li class="nav-item interactive"></li>
    </ul>
  </nav>
</header>

<main class="dynamic-content">
  <section class="hero-video-section">
    <video class="background-video" autoplay muted loop>
      <source src="hero-video.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay">
      <h1 class="bold-title gradient-text"></h1>
      <button class="cta-button vibrant-style"></button>
    </div>
  </section>
  
  <section class="cards-grid">
    <div class="feature-card elevated"></div>
    <!-- Ripeti per ogni feature -->
  </section>
</main>
```

#### CSS Framework
```css
/* Variabili di design */
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --shadow-elevated: 0 10px 40px rgba(0,0,0,0.15);
  --font-bold: 'Montserrat', sans-serif;
  --border-radius: 12px;
  --transition-smooth: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Layout dinamico */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 0;
}

.feature-card {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: var(--border-radius);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: var(--transition-smooth);
}

.elevated {
  box-shadow: var(--shadow-elevated);
}

.elevated:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
}

/* Effetti visivi */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animazioni */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animated-logo {
  animation: pulse 2s infinite;
}
```

#### JavaScript per Micro-interazioni
```javascript
// Parallax effect per hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  document.querySelector('.background-video').style.transform = 
    `translateY(${rate}px)`;
});

// Hover effects avanzati per le cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(10px)
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

---

## Esempio 3: Design per Ristorazione - Appetitoso e Funzionale

### Caratteristiche
- **Palette colori caldi** (rosso, arancione, marrone) che stimolano l'appetito
- **Immagini food-focused** di alta qualità con illuminazione professionale
- **Tipografia leggibile** anche su mobile per menu e prezzi
- **Call-to-action prominenti** per prenotazioni e ordini online
- **Integrazione mappe** e informazioni di contatto ben visibili
- **Design responsive** ottimizzato per ordinazioni da mobile
- **Sezioni social** per recensioni e foto dei clienti

### Settori Ideali
- Ristoranti
- Pizzerie
- Bar e caffetterie
- Servizi catering
- Food truck

### Specifiche Tecniche

#### Struttura HTML
```html
<header class="restaurant-header">
  <nav class="food-navigation">
    <div class="logo-restaurant">
      <img src="logo.png" alt="Nome Ristorante" class="brand-logo">
    </div>
    <ul class="nav-menu-food">
      <li><a href="#menu">Menu</a></li>
      <li><a href="#location">Dove Siamo</a></li>
      <li><a href="#reservations">Prenota</a></li>
      <li><a href="#reviews">Recensioni</a></li>
    </ul>
    <button class="order-online-btn primary-cta">Ordina Online</button>
  </nav>
</header>

<main class="restaurant-content">
  <section class="hero-food-section">
    <div class="hero-image-container">
      <img src="signature-dish.jpg" alt="Piatto signature" class="hero-food-image">
    </div>
    <div class="hero-text-overlay">
      <h1 class="restaurant-title">Benvenuti al [Nome Ristorante]</h1>
      <p class="restaurant-tagline">Cucina autentica dal 1985</p>
      <div class="hero-cta-group">
        <button class="btn-reservation primary">Prenota Tavolo</button>
        <button class="btn-menu secondary">Vedi Menu</button>
      </div>
    </div>
  </section>
  
  <section class="menu-preview">
    <h2 class="section-title">I Nostri Piatti</h2>
    <div class="dishes-grid">
      <div class="dish-card featured">
        <img src="dish1.jpg" alt="Nome piatto" class="dish-image">
        <div class="dish-info">
          <h3 class="dish-name">Nome Piatto</h3>
          <p class="dish-description">Descrizione appetitosa del piatto</p>
          <span class="dish-price">€15.00</span>
        </div>
      </div>
      <!-- Ripeti per ogni piatto -->
    </div>
  </section>
  
  <section class="restaurant-info">
    <div class="location-card">
      <h3>Dove Siamo</h3>
      <address>Via Example 123, Roma</address>
      <div class="map-container">
        <iframe src="google-maps-embed" class="restaurant-map"></iframe>
      </div>
    </div>
    <div class="hours-card">
      <h3>Orari</h3>
      <ul class="opening-hours">
        <li>Lun-Ven: 12:00-15:00, 19:00-23:00</li>
        <li>Sab-Dom: 12:00-23:00</li>
      </ul>
    </div>
  </section>
  
  <section class="social-proof">
    <h2>Cosa Dicono i Nostri Clienti</h2>
    <div class="reviews-carousel">
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review-text">"Cibo eccezionale e servizio impeccabile!"</p>
        <cite class="reviewer-name">- Maria R.</cite>
      </div>
      <!-- Ripeti per altre recensioni -->
    </div>
  </section>
</main>
```

#### CSS Framework
```css
/* Variabili di design per ristorazione */
:root {
  --food-red: #c41e3a;
  --warm-orange: #ff6b35;
  --golden-yellow: #ffd23f;
  --cream-white: #faf7f2;
  --dark-brown: #4a2c2a;
  --font-elegant: 'Playfair Display', serif;
  --font-readable: 'Open Sans', sans-serif;
  --shadow-food: 0 4px 20px rgba(196, 30, 58, 0.2);
  --border-radius-food: 8px;
}

/* Layout ottimizzato per food */
.restaurant-content {
  background-color: var(--cream-white);
}

.hero-food-section {
  position: relative;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-food-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-text-overlay {
  position: absolute;
  text-align: center;
  color: white;
  z-index: 2;
}

.restaurant-title {
  font-family: var(--font-elegant);
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  margin-bottom: 1rem;
}

/* Menu e piatti */
.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.dish-card {
  background: white;
  border-radius: var(--border-radius-food);
  box-shadow: var(--shadow-food);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dish-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(196, 30, 58, 0.3);
}

.dish-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dish-info {
  padding: 1.5rem;
}

.dish-name {
  font-family: var(--font-elegant);
  font-size: 1.4rem;
  color: var(--dark-brown);
  margin-bottom: 0.5rem;
}

.dish-description {
  font-family: var(--font-readable);
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.dish-price {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--food-red);
}

/* Call-to-action buttons */
.primary-cta, .btn-reservation {
  background: linear-gradient(135deg, var(--food-red), var(--warm-orange));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius-food);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.primary-cta:hover, .btn-reservation:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
}

.btn-menu {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 12px 24px;
  border-radius: var(--border-radius-food);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-menu:hover {
  background: white;
  color: var(--food-red);
}

/* Sezione informazioni ristorante */
.restaurant-info {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.location-card, .hours-card {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-food);
  box-shadow: var(--shadow-food);
}

.restaurant-map {
  width: 100%;
  height: 250px;
  border: none;
  border-radius: var(--border-radius-food);
  margin-top: 1rem;
}

/* Recensioni */
.reviews-carousel {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 2rem 0;
  scroll-snap-type: x mandatory;
}

.review-card {
  min-width: 300px;
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-food);
  box-shadow: var(--shadow-food);
  scroll-snap-align: start;
  text-align: center;
}

.stars {
  color: var(--golden-yellow);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .restaurant-title {
    font-size: 2.5rem;
  }
  
  .restaurant-info {
    grid-template-columns: 1fr;
  }
  
  .hero-cta-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .dishes-grid {
    grid-template-columns: 1fr;
  }
}
```

#### JavaScript per Funzionalità Ristorazione
```javascript
// Sistema di prenotazione online
class ReservationSystem {
  constructor() {
    this.initializeDatePicker();
    this.initializeTimeSlots();
  }
  
  initializeDatePicker() {
    const dateInput = document.querySelector('#reservation-date');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
  }
  
  initializeTimeSlots() {
    const timeSlots = ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30', '21:00'];
    const timeContainer = document.querySelector('#time-slots');
    
    timeSlots.forEach(time => {
      const button = document.createElement('button');
      button.className = 'time-slot';
      button.textContent = time;
      button.addEventListener('click', (e) => this.selectTimeSlot(e));
      timeContainer.appendChild(button);
    });
  }
  
  selectTimeSlot(event) {
    document.querySelectorAll('.time-slot').forEach(slot => {
      slot.classList.remove('selected');
    });
    event.target.classList.add('selected');
  }
}

// Menu interattivo con filtri
class MenuFilter {
  constructor() {
    this.initializeFilters();
  }
  
  initializeFilters() {
    const filterButtons = document.querySelectorAll('.menu-filter');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => this.filterMenu(e.target.dataset.category));
    });
  }
  
  filterMenu(category) {
    const dishes = document.querySelectorAll('.dish-card');
    dishes.forEach(dish => {
      if (category === 'all' || dish.dataset.category === category) {
        dish.style.display = 'block';
      } else {
        dish.style.display = 'none';
      }
    });
  }
}

// Caricamento lazy delle immagini food
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Integrazione con delivery platforms
class DeliveryIntegration {
  constructor() {
    this.platforms = {
      'deliveroo': 'https://deliveroo.it/restaurant-link',
      'ubereats': 'https://ubereats.com/restaurant-link',
      'justeat': 'https://justeat.it/restaurant-link'
    };
  }
  
  redirectToDelivery(platform) {
    if (this.platforms[platform]) {
      window.open(this.platforms[platform], '_blank');
    }
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  new ReservationSystem();
  new MenuFilter();
  new DeliveryIntegration();
  lazyLoadImages();
});
```

### Elementi Specifici per la Ristorazione

#### Psicologia dei Colori nel Food Design
- **Rosso**: Stimola l'appetito e crea urgenza
- **Arancione**: Evoca calore e convivialità
- **Giallo/Oro**: Suggerisce qualità premium
- **Marrone**: Trasmette autenticità e tradizione

#### Ottimizzazioni UX per Ristoranti
- **Menu digitale** facilmente navigabile
- **Prenotazioni online** integrate
- **Informazioni allergeni** chiaramente visibili
- **Integrazione social** per user-generated content
- **Sistema di recensioni** prominente
- **Ordinazioni takeaway/delivery** semplificate

---

## Considerazioni Tecniche Generali

### Performance
- **Ottimizzazione immagini**: WebP con fallback JPEG
- **Lazy loading** per contenuti below-the-fold
- **Minificazione** di CSS e JavaScript
- **CDN** per risorse statiche

### Accessibilità
- **Contrasto colori** conforme WCAG 2.1 AA
- **Navigazione da tastiera** completa
- **Screen reader** supportato con ARIA labels
- **Riduzione movimento** per utenti sensibili

### SEO
- **Semantic HTML** con tag appropriati
- **Meta tag** ottimizzati
- **Schema markup** per rich snippets
- **Core Web Vitals** ottimizzati

### Tecnologie Consigliate
- **CSS**: Sass/SCSS per organizzazione
- **JavaScript**: ES6+ con bundler (Webpack/Vite)
- **Animazioni**: CSS animations + GSAP per effetti complessi
- **Testing**: Lighthouse per performance audit
