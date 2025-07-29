# 📸 Immagini per FitZone Pro Template

## 🎯 Immagini Necessarie

### Hero Section
- **hero-bg.jpg** (1920x1080px)
  - Immagine di sfondo per la sezione hero
  - Palestra moderna o persone che si allenano
  - Formato: JPG, qualità alta
  - Peso consigliato: < 500KB (ottimizzata)

### About Section
- **about-gym.jpg** (800x600px)
  - Foto dell'interno della palestra
  - Attrezzature moderne e ambiente pulito
  - Formato: JPG o WebP

### Trainers Section
- **trainer-1.jpg** (400x400px) - Marco Rossi
- **trainer-2.jpg** (400x400px) - Sofia Bianchi  
- **trainer-3.jpg** (400x400px) - Alessandro Verde
  - Foto professionali dei personal trainer
  - Formato quadrato per consistenza
  - Sorriso professionale e abbigliamento sportivo

### Services Section (Opzionali)
- **service-personal.jpg** (600x400px) - Personal Training
- **service-group.jpg** (600x400px) - Corsi di Gruppo
- **service-cardio.jpg** (600x400px) - Area Cardio
- **service-weights.jpg** (600x400px) - Sala Pesi
- **service-relax.jpg** (600x400px) - Area Relax
- **service-nutrition.jpg** (600x400px) - Consulenza Nutrizionale

### Gallery (Opzionale)
- **gallery-1.jpg** attraverso **gallery-8.jpg** (800x600px)
  - Foto varie dell'ambiente palestra
  - Persone che si allenano
  - Attrezzature e spazi comuni

## 🎨 Specifiche Tecniche

### Formato e Qualità
- **Formato preferito**: JPG per foto, PNG per loghi
- **Qualità**: 80-90% per bilanciare qualità e peso
- **Formato moderno**: WebP quando possibile (con fallback JPG)

### Dimensioni e Ottimizzazione
- **Responsive**: Utilizzare `srcset` per diverse risoluzioni
- **Retina**: Versioni @2x per display ad alta densità
- **Compressione**: Utilizzare strumenti come TinyPNG o ImageOptim

### SEO e Accessibilità
- **Alt text**: Descrizioni dettagliate per screen readers
- **Nome file**: Descrittivi e con keywords (es: personal-trainer-milano.jpg)
- **Lazy loading**: Implementato per performance

## 📁 Struttura Consigliata

```
images/
├── hero/
│   ├── hero-bg.jpg
│   ├── hero-bg@2x.jpg
│   └── hero-bg.webp
├── about/
│   ├── about-gym.jpg
│   └── about-gym@2x.jpg
├── trainers/
│   ├── trainer-marco.jpg
│   ├── trainer-sofia.jpg
│   └── trainer-alessandro.jpg
├── services/
│   ├── personal-training.jpg
│   ├── group-classes.jpg
│   ├── cardio-zone.jpg
│   ├── weight-room.jpg
│   ├── relax-area.jpg
│   └── nutrition-consulting.jpg
├── gallery/
│   ├── gym-interior-1.jpg
│   ├── gym-interior-2.jpg
│   ├── workout-session-1.jpg
│   ├── workout-session-2.jpg
│   ├── equipment-1.jpg
│   ├── equipment-2.jpg
│   ├── group-class-1.jpg
│   └── group-class-2.jpg
└── icons/
    ├── logo-fitzone.svg
    ├── favicon.ico
    └── apple-touch-icon.png
```

## 🔄 Come Implementare le Immagini

### 1. Sostituisci i Placeholder
Attualmente il template usa placeholder CSS. Sostituisci con:

```html
<!-- Hero Background -->
<div class="hero-background">
  <img src="images/hero/hero-bg.jpg" 
       srcset="images/hero/hero-bg.jpg 1x, images/hero/hero-bg@2x.jpg 2x"
       alt="FitZone Pro - Palestra moderna con attrezzature all'avanguardia">
</div>

<!-- About Image -->
<div class="about-image">
  <img src="images/about/about-gym.jpg" 
       alt="Interno della palestra FitZone Pro con attrezzature moderne">
</div>

<!-- Trainer Images -->
<div class="trainer-image">
  <img src="images/trainers/trainer-marco.jpg" 
       alt="Marco Rossi - Personal Trainer specializzato in trasformazione corporea">
</div>
```

### 2. Aggiungi CSS per le Immagini

```css
/* Responsive Images */
.hero-background img,
.about-image img,
.trainer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Lazy Loading Placeholder */
.img-placeholder {
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}

/* Image Loading Animation */
.img-loading {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.img-loaded {
  opacity: 1;
}
```

### 3. Implementa Lazy Loading

```javascript
// Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('img-loaded');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

## 🎨 Suggerimenti per le Foto

### Foto Trainers
- **Illuminazione**: Luce naturale o studio ben illuminato
- **Sfondo**: Neutro o ambiente palestra
- **Abbigliamento**: Uniforme del centro o sportivo professionale
- **Posa**: Naturale, sicura, sorridente
- **Qualità**: Alta risoluzione, messa a fuoco nitida

### Foto Ambiente
- **Orario**: Evitare ore di punta per spazi meno affollati
- **Angolazione**: Valorizzare spazio e attrezzature
- **Illuminazione**: Sfruttare luce naturale quando possibile
- **Dettagli**: Pulire e organizzare prima dello scatto
- **Prospettiva**: Foto ampie per mostrare la dimensione degli spazi

### Foto Azione
- **Movimento**: Catturare l'energia dell'allenamento
- **Espressioni**: Concentrazione, determinazione, soddisfazione
- **Sicurezza**: Posture corrette e attrezzature appropriate
- **Diversità**: Rappresentare varie età, generi ed etnie
- **Autenticità**: Momenti naturali, non troppo posati

## 🚀 Ottimizzazione Performance

### Compressione
```bash
# ImageOptim (Mac)
imageoptim *.jpg

# TinyPNG (Online)
# https://tinypng.com/

# Squoosh (Web App)
# https://squoosh.app/
```

### Formati Moderni
```html
<!-- WebP con fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrizione">
</picture>
```

### Responsive Images
```html
<!-- Diverse risoluzioni -->
<img srcset="small.jpg 480w, 
             medium.jpg 800w, 
             large.jpg 1200w"
     sizes="(max-width: 480px) 100vw, 
            (max-width: 800px) 50vw, 
            33vw"
     src="medium.jpg" 
     alt="Descrizione">
```

## 📝 Checklist Pre-Deploy

- [ ] Tutte le immagini sono ottimizzate (< 100KB ciascuna)
- [ ] Alt text descrittivi per ogni immagine
- [ ] Versioni @2x per display retina
- [ ] Formati WebP implementati dove possibile
- [ ] Lazy loading configurato
- [ ] Test su dispositivi mobile
- [ ] Verifica velocità caricamento (PageSpeed Insights)

## 🔗 Risorse Utili

### Stock Photos (Licenza Commerciale)
- **Unsplash**: https://unsplash.com/s/photos/gym
- **Pexels**: https://pexels.com/search/fitness/
- **Shutterstock**: Foto premium per uso commerciale
- **Getty Images**: Archivio professionale

### Strumenti Ottimizzazione
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/
- **Photoshop**: Export per Web (Legacy)

### Fonts e Icone
- **Font Awesome**: Icone vettoriali
- **Google Fonts**: Oswald e Open Sans
- **Heroicons**: Icone SVG moderne

---

💡 **Tip**: Investi in foto professionali di qualità. Sono il primo elemento che cattura l'attenzione dei visitatori e trasmette la professionalità del tuo centro fitness!
