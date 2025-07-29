# Assets Images per TechFlow Template

## 📁 Struttura Consigliata

Organizza le tue immagini nelle seguenti cartelle per mantenere il progetto ordinato:

```
images/
├── hero/
│   ├── hero-bg.jpg           # Background hero section
│   ├── hero-gradient.png     # Overlay gradients
│   └── particles.svg         # Particelle SVG alternative
├── features/
│   ├── ai-brain.svg          # Icon AI features
│   ├── automation.svg        # Icon automazione
│   ├── security.svg          # Icon sicurezza
│   ├── scale.svg            # Icon scalabilità
│   ├── api.svg              # Icon API
│   └── dashboard.svg        # Icon dashboard
├── demo/
│   ├── dashboard-preview.png # Screenshot dashboard
│   ├── workflow-diagram.svg  # Diagramma workflow
│   └── api-example.png      # Esempio API
├── pricing/
│   ├── check-icon.svg       # Icon check features
│   └── popular-badge.svg    # Badge "Most Popular"
├── testimonials/
│   ├── client-1.jpg         # Foto cliente 1
│   ├── client-2.jpg         # Foto cliente 2
│   └── client-3.jpg         # Foto cliente 3
├── logos/
│   ├── logo.svg             # Logo principale
│   ├── logo-white.svg       # Logo bianco
│   └── favicon.ico          # Favicon
└── social/
    ├── og-image.jpg         # Open Graph image
    └── twitter-card.jpg     # Twitter Card image
```

## 🎨 Specifiche Tecniche

### Formati Consigliati
- **SVG**: Per icone e illustrazioni vettoriali
- **WebP**: Per immagini fotografiche (con fallback JPG)
- **PNG**: Per immagini con trasparenza
- **JPG**: Per fotografie senza trasparenza

### Dimensioni Ottimali

#### Hero Section
- **Background**: 1920x1080px (16:9)
- **Floating card mockup**: 800x600px

#### Features Icons
- **Dimensione**: 64x64px (SVG scalabile)
- **Stile**: Line art con stroke 2px
- **Colori**: Monocromatici per compatibility

#### Dashboard Screenshots
- **Risoluzione**: 1440x900px
- **Formato**: PNG con background trasparente
- **Dettagli**: Alta definizione per demo

#### Testimonials
- **Avatar**: 120x120px (formato quadrato)
- **Qualità**: Professionale, buona illuminazione

#### Social Media
- **Open Graph**: 1200x630px
- **Twitter Card**: 1200x675px
- **Favicon**: 32x32px, 16x16px, ICO format

## 🖼️ Immagini Placeholder Attuali

Il template include attualmente:
- **Gradients CSS** per backgrounds
- **Particle system** generato via Canvas
- **Icons** Font Awesome CDN
- **Charts** generati via JavaScript

## 🎯 Suggerimenti per Asset Personalizzati

### Hero Background
```css
.hero {
  background: 
    radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%),
    url('images/hero/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

### Feature Icons
```html
<div class="feature-icon">
  <img src="images/features/ai-brain.svg" alt="AI Features" />
</div>
```

### Dashboard Mockup
```html
<div class="demo-screenshot">
  <img src="images/demo/dashboard-preview.png" alt="Dashboard Preview" />
</div>
```

## 🎨 Palette Colori per Asset

### Colori Principali
- **Primary**: #667eea
- **Secondary**: #764ba2
- **Success**: #28ca42
- **Warning**: #ffbd2e
- **Error**: #ff5f57
- **Background**: #0a0a0a
- **Surface**: #1a1a1a

### Gradients
- **Primary**: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- **Success**: linear-gradient(135deg, #28ca42, #20a034)
- **Background**: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)

## 📐 Template Asset Generator

### Figma Template
Crea un template Figma con:
- Artboards per tutte le sezioni
- Component library con icons
- Color styles definiti
- Typography styles impostati

### Sketch Template
- Symbols per elementi ricorrenti
- Color palette importata
- Grid system configurato

### Adobe XD
- Components con states
- Auto-animate per prototipi
- Shared colors e text styles

## 🚀 Ottimizzazione Performance

### Compressione Immagini
```bash
# Installa imagemin per ottimizzazione
npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg

# Converti JPG in WebP
imagemin images/**/*.jpg --out-dir=images/optimized --plugin=webp

# Comprimi JPG
imagemin images/**/*.jpg --out-dir=images/optimized --plugin=mozjpeg
```

### Lazy Loading
```html
<img 
  src="images/placeholder.svg" 
  data-src="images/hero/dashboard-preview.png"
  alt="Dashboard Preview"
  loading="lazy"
  class="lazy-load"
/>
```

### Responsive Images
```html
<picture>
  <source media="(min-width: 768px)" srcset="images/hero/hero-desktop.webp">
  <source media="(min-width: 480px)" srcset="images/hero/hero-tablet.webp">
  <img src="images/hero/hero-mobile.webp" alt="Hero Background">
</picture>
```

## 🎨 Risorse Gratuite Consigliate

### Icone
- **Heroicons**: https://heroicons.com/
- **Phosphor Icons**: https://phosphoricons.com/
- **Lucide**: https://lucide.dev/

### Illustrazioni
- **unDraw**: https://undraw.co/
- **Drawkit**: https://drawkit.com/
- **Blush**: https://blush.design/

### Fotografie
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://pexels.com/
- **Pixabay**: https://pixabay.com/

### Mockups
- **Mockuuups**: https://mockuuups.studio/
- **Smartmockups**: https://smartmockups.com/
- **Placeit**: https://placeit.net/

---

💡 **Tip**: Mantieni un design system coerente per tutti gli asset per garantire un look professionale e armonioso in tutto il template.
