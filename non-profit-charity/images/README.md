# 🖼️ Images Directory

Questa cartella contiene tutte le immagini utilizzate nel template Non-Profit/Charity.

## 📁 Struttura Consigliata

```
images/
├── hero/
│   ├── hero-bg.jpg           # Background hero section (1920x1080)
│   ├── hero-overlay.jpg      # Immagine overlay alternativa
│   └── hero-mobile.jpg       # Versione mobile optimized
├── mission/
│   ├── founder-story.jpg     # Foto storia fondatore/fondatrice
│   ├── mission-video-thumb.jpg # Thumbnail video missione
│   └── team-photo.jpg        # Foto team organizzazione
├── projects/
│   ├── education-africa.jpg  # Progetto scuole Africa
│   ├── mobile-clinics.jpg    # Progetto cliniche mobili
│   ├── water-wells.jpg       # Progetto pozzi acqua
│   ├── earthquake-aid.jpg    # Progetto aiuti terremoto
│   └── thumbnails/           # Versioni thumbnail (400x250)
├── impact/
│   ├── testimonial-ahmed.jpg # Foto testimoni (300x300)
│   ├── testimonial-maria.jpg
│   ├── testimonial-james.jpg
│   └── success-stories/      # Gallerie storie successo
├── team/
│   ├── founder.jpg           # Foto fondatori e team
│   ├── volunteers.jpg        # Foto volontari attivi
│   └── staff.jpg            # Foto staff organizzazione
├── logos/
│   ├── logo.svg              # Logo principale SVG
│   ├── logo.png              # Logo PNG alta risoluzione
│   ├── logo-white.svg        # Logo versione bianca
│   ├── favicon.ico           # Favicon
│   └── partners/             # Loghi partner e certificazioni
└── icons/
    ├── heart.svg             # Icona cuore
    ├── hands.svg             # Icona mani
    └── hope.svg              # Icona speranza
```

## 🎨 Specifiche Immagini

### Hero Section
- **Formato**: JPG ottimizzato
- **Dimensioni**: 1920x1080px (16:9)
- **Peso**: < 500KB
- **Soggetti suggeriti**: 
  - Persone aiutate dall'organizzazione
  - Volontari in azione
  - Progetti completati
  - Momenti di gioia e speranza

### Progetti
- **Formato**: JPG/PNG
- **Dimensioni**: 800x500px (16:10)
- **Peso**: < 300KB
- **Stile**: Documentario, autentico
- **Focus**: Beneficiari e impatto reale

### Testimonianze
- **Formato**: JPG
- **Dimensioni**: 300x300px (1:1)
- **Peso**: < 100KB
- **Stile**: Ritratti naturali, sorrisi genuini
- **Background**: Sfondo sfocato o neutro

### Loghi e Icone
- **Formato**: SVG (scalabile)
- **Fallback**: PNG alta risoluzione
- **Colori**: Versioni monocolore e a colori
- **Stile**: Minimalista, riconoscibile

## 📸 Fonti Immagini Consigliate

### Stock Photography (Gratuite)
- **Unsplash** - unsplash.com
- **Pexels** - pexels.com
- **Pixabay** - pixabay.com
- **Freepik** - freepik.com (con attribuzione)

### Stock Photography (Premium)
- **Shutterstock** - shutterstock.com
- **Getty Images** - gettyimages.com
- **Adobe Stock** - stock.adobe.com
- **iStock** - istockphoto.com

### Immagini Autentiche
- **Foto Proprie** - Migliore opzione per autenticità
- **Volontari** - Coinvolgi volontari fotografi
- **Beneficiari** - Con consenso e privacy
- **Eventi** - Documenta attività reali

## 🛠️ Ottimizzazione Immagini

### Tools Raccomandati
```bash
# ImageMagick (command line)
convert input.jpg -quality 85 -resize 1920x1080 output.jpg

# TinyPNG (online)
https://tinypng.com

# Squoosh (Google)
https://squoosh.app

# ImageOptim (Mac)
https://imageoptim.com
```

### Formato per Utilizzo
- **Hero/Background**: WebP con fallback JPG
- **Progetti**: JPG ottimizzato
- **Loghi**: SVG + PNG fallback
- **Icone**: SVG inline
- **Favicon**: ICO + PNG

## 📏 Responsive Images

### Implementazione HTML
```html
<!-- Picture element per responsive -->
<picture>
  <source media="(max-width: 768px)" srcset="images/hero/hero-mobile.jpg">
  <source media="(min-width: 769px)" srcset="images/hero/hero-bg.jpg">
  <img src="images/hero/hero-bg.jpg" alt="Insieme per un futuro migliore">
</picture>

<!-- Srcset per densità pixel -->
<img src="logo.png" 
     srcset="logo.png 1x, logo@2x.png 2x" 
     alt="Logo Fondazione">
```

### CSS Background Images
```css
/* Media queries per background responsivi */
.hero-background {
  background-image: url('../images/hero/hero-bg.jpg');
}

@media (max-width: 768px) {
  .hero-background {
    background-image: url('../images/hero/hero-mobile.jpg');
  }
}
```

## 🔒 Copyright e Licenze

### Immagini Stock
- ✅ **Verificare licenza** prima dell'uso
- ✅ **Attribuzione** quando richiesta
- ✅ **Uso commerciale** permesso
- ❌ **Non ridistribuire** immagini stock

### Immagini Proprie
- ✅ **Consenso persone** fotografate
- ✅ **Release modello** per uso commerciale
- ✅ **Privacy minori** particolare attenzione
- ✅ **Diritti fotografo** se commissionate

## 🎯 Best Practices

### Selezione Immagini
1. **Autenticità** - Preferire foto reali vs stock
2. **Diversità** - Rappresentare tutte le comunità
3. **Qualità** - Alta risoluzione e buona composizione
4. **Coerenza** - Stile visivo uniforme
5. **Emozione** - Immagini che trasmettono il messaggio

### Performance
1. **Compressione** - Bilanciare qualità e dimensione
2. **Lazy Loading** - Caricare solo quando necessario
3. **WebP Format** - Formato moderno per browser supportati
4. **CDN** - Distribuzione geografica per velocità
5. **Caching** - Headers appropriati per cache browser

### Accessibilità
1. **Alt Text** - Descrizioni significative
2. **Contrasto** - Testo leggibile su immagini
3. **Context** - Informazioni non solo visive
4. **Decorative** - Alt vuoto per immagini decorative

## 📋 Checklist Pre-Upload

- [ ] **Ottimizzazione** - Dimensione file appropriata
- [ ] **Risoluzione** - Qualità sufficiente per tutti i dispositivi
- [ ] **Formato** - Formato web-friendly
- [ ] **Nome File** - Descrittivo e SEO-friendly
- [ ] **Alt Text** - Preparato per accessibilità
- [ ] **Licenza** - Verificata e documentata
- [ ] **Backup** - Copia di sicurezza originali

---

*Ogni immagine racconta una storia. Scegliamo quelle che ispirano azione e speranza.* 📸❤️
