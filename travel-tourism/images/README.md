# Immagini per Travel Tourism Template

Questa cartella contiene le immagini per il template Travel Tourism. Per una migliore esperienza, sostituisci i placeholder con immagini reali.

## 📁 Struttura Consigliata

```
images/
├── destinations/
│   ├── switzerland-1200x800.jpg
│   ├── japan-1200x800.jpg
│   ├── kenya-1200x800.jpg
│   ├── caribbean-1200x800.jpg
│   ├── greece-1200x800.jpg
│   └── thailand-1200x800.jpg
├── experiences/
│   ├── adventure-800x600.jpg
│   ├── food-wine-800x600.jpg
│   └── photography-800x600.jpg
├── reviews/
│   ├── reviewer-1-150x150.jpg
│   ├── reviewer-2-150x150.jpg
│   └── reviewer-3-150x150.jpg
├── hero/
│   ├── hero-video.mp4
│   └── hero-background-1920x1080.jpg
└── icons/
    ├── logo.svg
    └── favicon.ico
```

## 🎨 Specifiche Immagini

### Destinazioni
- **Dimensioni**: 1200x800px (ratio 3:2)
- **Formato**: JPG o WebP
- **Qualità**: Alta risoluzione per dispositivi retina
- **Stile**: Paesaggi, monumenti, cultura locale

### Esperienze
- **Dimensioni**: 800x600px (ratio 4:3)
- **Formato**: JPG o WebP
- **Contenuto**: Attività, esperienze, avventure

### Recensioni (Avatar)
- **Dimensioni**: 150x150px (quadrato)
- **Formato**: JPG o PNG
- **Stile**: Foto profilo, volti sorridenti

### Hero Section
- **Video**: MP4, max 50MB, loop
- **Background**: 1920x1080px minimo
- **Stile**: Paesaggio ispirazionale, viaggio

## 🔧 Ottimizzazione

### Formati Consigliati
1. **WebP**: Per browser moderni (-30% dimensioni)
2. **AVIF**: Per browser compatibili (-50% dimensioni)
3. **JPG**: Fallback universale

### Compressione
- **Qualità JPG**: 80-90%
- **Ottimizzazione**: Usa TinyPNG o simili
- **Responsive**: Crea versioni multiple per device

### Implementazione Responsive
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrizione" loading="lazy">
</picture>
```

## 📱 Responsive Images

### Breakpoints
- **Mobile**: 400px width
- **Tablet**: 800px width
- **Desktop**: 1200px width
- **Large**: 1600px width

### Srcset Example
```html
<img src="destination-800.jpg"
     srcset="destination-400.jpg 400w,
             destination-800.jpg 800w,
             destination-1200.jpg 1200w,
             destination-1600.jpg 1600w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     alt="Destinazione">
```

## 🎯 Linee Guida Contenuto

### Foto Destinazioni
- Mostra punti di interesse principali
- Include persone per scala e vita
- Cattura l'essenza del luogo
- Evita sovraffollamento turistico

### Foto Esperienze
- Focus sull'attività specifica
- Mostra emozioni positive
- Include attrezzatura/contesto
- Varietà di età e tipologie

### Video Hero
- Durata: 10-30 secondi
- Movimento fluido e coinvolgente
- Senza audio (autoplay restrictions)
- Loopable perfettamente

## 🔍 SEO per Immagini

### Naming Convention
```
destinazione-luogo-keyword-dimensione.formato
esempio: swiss-alps-skiing-1200x800.jpg
```

### Alt Text
- Descrittivo e specifico
- Include keyword rilevanti
- Max 125 caratteri
- Contesto per non vedenti

### Structured Data
```json
{
  "@type": "ImageObject",
  "url": "https://example.com/image.jpg",
  "caption": "Descrizione immagine",
  "creditText": "Fotografo/Fonte"
}
```

## 🛠️ Tools Consigliati

### Editing
- **Adobe Photoshop**: Professionale
- **GIMP**: Gratuito e open source
- **Canva**: Online, facile da usare
- **Figma**: Design e prototipazione

### Ottimizzazione
- **TinyPNG**: Compressione online
- **ImageOptim**: Mac app
- **Squoosh**: Google web app
- **Sharp**: Node.js processing

### Stock Photos
- **Unsplash**: Foto gratuite di alta qualità
- **Pixabay**: Ampia selezione gratuita
- **Pexels**: Foto e video gratuiti
- **Shutterstock**: Stock premium

## 📋 Checklist Pre-Upload

- [ ] Dimensioni corrette per ogni breakpoint
- [ ] Formato ottimizzato (WebP/AVIF + fallback)
- [ ] Compressione applicata
- [ ] Alt text descrittivo
- [ ] Nome file SEO-friendly
- [ ] Copyright verificato
- [ ] Test su dispositivi diversi

## 🎨 Palette Colori Template

Per mantenere coerenza visiva:
- **Primary**: #667eea
- **Secondary**: #764ba2
- **Accent**: #f093fb
- **Dark**: #2c3e50
- **Light**: #ecf0f1

## 📞 Risorse Aggiuntive

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

---

**Nota**: Sostituire tutti i placeholder con immagini reali per il deployment finale.
