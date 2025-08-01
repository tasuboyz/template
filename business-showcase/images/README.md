# 📸 Images Directory

Questa cartella contiene tutte le immagini utilizzate nel template business showcase.

## 🖼️ Immagini Richieste

### Hero Section
- `hero-bg.jpg` - Immagine di sfondo hero (1920x1080px)
- `hero-gradient.svg` - Overlay gradiente SVG

### Portfolio
- `portfolio-1.jpg` - Progetto 1 (800x600px)
- `portfolio-2.jpg` - Progetto 2 (800x600px)
- `portfolio-3.jpg` - Progetto 3 (800x600px)
- `portfolio-4.jpg` - Progetto 4 (800x600px)
- `portfolio-5.jpg` - Progetto 5 (800x600px)
- `portfolio-6.jpg` - Progetto 6 (800x600px)

### Team
- `team-1.jpg` - Membro team 1 (400x400px)
- `team-2.jpg` - Membro team 2 (400x400px)
- `team-3.jpg` - Membro team 3 (400x400px)

### Brand
- `logo.svg` - Logo aziendale vettoriale
- `logo-white.svg` - Logo bianco per dark backgrounds
- `favicon.ico` - Favicon 32x32px

### Decorative
- `pattern-1.svg` - Pattern decorativo 1
- `pattern-2.svg` - Pattern decorativo 2
- `gradient-orb-1.svg` - Sfera gradiente 1
- `gradient-orb-2.svg` - Sfera gradiente 2

## 📏 Specifiche Tecniche

### Formati Supportati
- **JPEG**: Per foto e immagini complesse
- **PNG**: Per immagini con trasparenza
- **SVG**: Per icone e grafiche vettoriali
- **WebP**: Per ottimizzazione avanzata (opzionale)

### Dimensioni Ottimali
- **Hero Images**: 1920x1080px (16:9)
- **Portfolio Items**: 800x600px (4:3)
- **Team Photos**: 400x400px (1:1)
- **Icons**: 24x24px, 32x32px, 48x48px
- **Logo**: Vettoriale (SVG preferito)

### Ottimizzazione
- **Qualità JPEG**: 80-85%
- **Compressione PNG**: Senza perdita
- **SVG**: Minificato e ottimizzato
- **Dimensione max**: 500KB per immagine

## 🎨 Placeholder Utilizzati

Attualmente il template utilizza placeholder CSS e icone Font Awesome invece di immagini reali. Questo permette di:

- ✅ Ridurre le dimensioni del template
- ✅ Permettere personalizzazione immediata
- ✅ Evitare problemi di copyright
- ✅ Migliorare i tempi di caricamento

### Sostituzione Placeholder

Per sostituire i placeholder con immagini reali:

1. **Portfolio Items**:
```html
<!-- Sostituisci questo -->
<div class="placeholder-image gradient-1">
    <i class="fas fa-laptop-code"></i>
</div>

<!-- Con questo -->
<img src="images/portfolio-1.jpg" alt="Progetto 1" class="portfolio-image">
```

2. **Team Members**:
```html
<!-- Sostituisci questo -->
<div class="avatar gradient-avatar-1">
    <i class="fas fa-user"></i>
</div>

<!-- Con questo -->
<img src="images/team-1.jpg" alt="Marco Rossi" class="team-avatar">
```

## 🖼️ Risorse Immagini Gratuite

### Stock Photos
- [Unsplash](https://unsplash.com) - Foto professionali gratuite
- [Pexels](https://pexels.com) - Ampia collezione di immagini
- [Pixabay](https://pixabay.com) - Foto e grafiche gratuite

### Business Images
- [StockVault](https://stockvault.net) - Immagini business
- [Burst](https://burst.shopify.com) - Foto per e-commerce
- [Freepik](https://freepik.com) - Grafica e foto (credit richiesto)

### Icons & Graphics
- [Heroicons](https://heroicons.com) - Icone SVG moderne
- [Feather Icons](https://feathericons.com) - Icone minimali
- [Phosphor Icons](https://phosphoricons.com) - Set completo di icone

### Team Photos
- [Generated Photos](https://generated.photos) - Volti AI generati
- [ThisPersonDoesNotExist](https://thispersondoesnotexist.com) - Foto AI
- [UI Faces](https://uifaces.co) - Avatar per UI

## 🔧 Strumenti di Ottimizzazione

### Online Tools
- [TinyPNG](https://tinypng.com) - Compressione PNG/JPEG
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Ottimizzazione SVG
- [Squoosh](https://squoosh.app) - Compressione avanzata

### CLI Tools
```bash
# ImageMagick per resize batch
magick convert *.jpg -resize 800x600 optimized/

# imagemin per ottimizzazione
imagemin images/*.jpg --out-dir=optimized --plugin=imagemin-mozjpeg

# svgo per SVG
svgo -f images/ -o optimized/
```

## 📱 Responsive Images

Per supportare dispositivi con densità diverse:

```html
<img src="images/portfolio-1.jpg"
     srcset="images/portfolio-1.jpg 1x,
             images/portfolio-1@2x.jpg 2x"
     alt="Progetto 1">
```

### Picture Element
```html
<picture>
    <source media="(min-width: 768px)" srcset="images/hero-desktop.jpg">
    <source media="(min-width: 480px)" srcset="images/hero-tablet.jpg">
    <img src="images/hero-mobile.jpg" alt="Hero Image">
</picture>
```

## 🎯 Guidelines Design

### Stile Fotografico
- **Luminoso e moderno**
- **Colori vibranti ma professionali**
- **Composizione pulita**
- **Focus su tecnologia e innovazione**

### Palette Colori Consigliata
- Primario: #6366f1 (Indigo)
- Secondario: #f59e0b (Amber)
- Accent: #06b6d4 (Cyan)
- Neutri: Scale di grigi

### Tone of Voice Visivo
- **Professionale ma approachable**
- **Innovativo e forward-thinking**
- **Clean e minimale**
- **Energico e dinamico**

## 📋 Checklist Pre-Launch

- [ ] Tutte le immagini sono ottimizzate
- [ ] Alt text sono presenti e descrittivi
- [ ] Immagini responsive implementate
- [ ] Lazy loading configurato
- [ ] WebP fallback (se utilizzato)
- [ ] Copyright cleared per tutte le immagini
- [ ] Favicon aggiornato con brand
- [ ] OG images per social sharing

---

💡 **Tip**: Mantieni una libreria di immagini brand-consistent per future espansioni del sito.
