# Immagini per Real Estate Showcase

## 📁 Struttura Immagini Consigliata

Per ottenere il massimo impatto visivo dal template, organizza le immagini come segue:

```
images/
├── hero/
│   ├── hero-bg.jpg         # Sfondo hero (1920x1080px)
│   └── hero-overlay.png    # Overlay trasparente
├── properties/
│   ├── villa-moderna.jpg   # Proprietà 1 (400x300px)
│   ├── appartamento.jpg    # Proprietà 2 (400x300px)
│   ├── casa-bifamiliare.jpg # Proprietà 3 (400x300px)
│   ├── ufficio.jpg         # Proprietà 4 (400x300px)
│   ├── attico.jpg          # Proprietà 5 (400x300px)
│   └── villa-storica.jpg   # Proprietà 6 (400x300px)
├── about/
│   └── agenzia.jpg         # Foto agenzia (600x400px)
├── services/
│   ├── service-1.jpg       # Servizio 1 (300x200px)
│   ├── service-2.jpg       # Servizio 2 (300x200px)
│   └── service-3.jpg       # Servizio 3 (300x200px)
└── icons/
    ├── favicon.ico         # Favicon del sito
    └── logo.png            # Logo agenzia (200x60px)
```

## 🖼️ Specifiche Immagini

### Hero Section
- **Dimensioni**: 1920x1080px (Full HD)
- **Formato**: JPG ad alta qualità
- **Peso**: < 300KB (ottimizzato)
- **Contenuto**: Panorama immobiliare, città, case moderne

### Proprietà
- **Dimensioni**: 400x300px (4:3 ratio)
- **Formato**: JPG o WebP
- **Peso**: < 50KB per immagine
- **Contenuto**: Foto esterne e interne delle proprietà

### About Section
- **Dimensioni**: 600x400px
- **Formato**: JPG
- **Peso**: < 80KB
- **Contenuto**: Foto ufficio, team, building aziendale

## 🎨 Linee Guida Visive

### Stile Fotografico
- **Luminosità**: Immagini luminose e accoglienti
- **Contrasto**: Buon contrasto per leggibilità testi
- **Saturazione**: Colori vivaci ma naturali
- **Composizione**: Regola dei terzi, prospettive interessanti

### Filtri Consigliati
- Leggero aumento di saturazione (+10-15%)
- Contrasto leggermente aumentato (+5-10%)
- Correzione automatica bilanciamento colori
- Nitidezza delicata per web

## 🔧 Ottimizzazione Immagini

### Tool Consigliati
- **TinyPNG**: Compressione PNG/JPG online
- **ImageOptim**: Tool desktop per Mac
- **Squoosh**: Tool Google per ottimizzazione
- **GIMP**: Editor gratuito open source

### Comandi Ottimizzazione
```bash
# ImageMagick - ridimensiona e ottimizza
convert input.jpg -resize 400x300^ -gravity center -extent 400x300 -quality 85 output.jpg

# WebP conversion
cwebp input.jpg -q 80 -o output.webp
```

## 📱 Immagini Responsive

Il template supporta immagini responsive. Puoi creare versioni multiple:

```html
<!-- Esempio implementazione -->
<picture>
    <source media="(max-width: 768px)" srcset="images/property-mobile.jpg">
    <source media="(max-width: 1200px)" srcset="images/property-tablet.jpg">
    <img src="images/property-desktop.jpg" alt="Proprietà">
</picture>
```

### Dimensioni Responsive Consigliate
- **Mobile**: 320x240px
- **Tablet**: 600x450px  
- **Desktop**: 800x600px

## 🎯 Immagini Placeholder

Il template include placeholder CSS per sviluppo:

```css
.property-image {
    background: linear-gradient(45deg, #667eea, #764ba2);
    /* Verrà sostituito con immagini reali */
}
```

## 📝 Alt Text e SEO

Ricorda di aggiungere alt text descrittivi:

```html
<img src="villa-moderna.jpg" 
     alt="Villa moderna con piscina a Milano Brera - 4 camere, 300mq">
```

## 🌐 CDN e Performance

Per performance ottimali, considera:

1. **CDN**: Cloudinary, ImageKit, AWS CloudFront
2. **Lazy Loading**: Caricamento differito immagini
3. **Progressive JPEG**: Caricamento progressivo
4. **WebP Fallback**: Formato moderno con fallback

## 📊 Monitoraggio Performance

Controlla le performance con:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools

## 🎨 Palette Colori Suggerita

Per mantenere coerenza visiva:

- **Primario**: #667eea (Blu violetto)
- **Secondario**: #764ba2 (Viola)
- **Accent**: #f093fb (Rosa)
- **Neutri**: #333, #666, #999, #f8f9fa

---

**💡 Tip**: Mantieni uno stile coerente tra tutte le immagini per un look professionale!

**📞 Bisogno di aiuto?** Contatta il team di supporto per assistenza nella selezione e ottimizzazione delle immagini.
