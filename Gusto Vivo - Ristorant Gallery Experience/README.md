# 🍝 La Tavola d'Oro - Sito Vetrina Ristorante

Un sito web completo per ristorante con gallery avanzata per la gestione di centinaia di immagini.

## 🌟 Caratteristiche Principali

### 🖼️ **Gallery Avanzata**
- **300+ immagini** gestite dinamicamente
- **Filtri per categoria**: Piatti, Interni, Atmosfera, Eventi
- **Caricamento progressivo** (lazy loading) per performance ottimali
- **Lightbox interattivo** con navigazione tastiera
- **Responsive design** ottimizzato per mobile

### 🍽️ **Menu Interattivo**
- **Filtri per portata**: Antipasti, Primi, Secondi, Dolci
- **Animazioni fluide** tra le categorie
- **Card responsive** con hover effects
- **Prezzi chiari** e descrizioni appetitose

### 📅 **Sistema Prenotazioni**
- **Form completo** con validazione
- **Date picker** con limitazioni intelligenti
- **Selezione orari** disponibili
- **Gestione numero ospiti**
- **Note aggiuntive** per allergie/occasioni speciali

### 🎨 **Design Specifico per Ristorazione**
- **Palette colori** psicologicamente studiata per stimolare l'appetito
- **Tipografia elegante** (Playfair Display + Open Sans)
- **Effetti hover** appetitosi
- **Animazioni sottili** per coinvolgimento

## 🚀 Tecnologie Utilizzate

- **HTML5 Semantico** per SEO ottimizzato
- **CSS3 Moderno** con CSS Grid e Flexbox
- **JavaScript ES6+** con classi e moduli
- **SVG Images** generate programmaticamente
- **Responsive Design** mobile-first

## 📂 Struttura del Progetto

```
/
├── index.html          # Pagina principale
├── styles.css          # Stili CSS completi
├── script.js           # JavaScript funzionalità
├── generate_images.py  # Script generazione immagini
├── images/
│   ├── hero/           # Immagini hero section
│   ├── dishes/         # Immagini menu piatti
│   ├── gallery/        # Gallery principale
│   │   ├── dishes/     # Foto piatti (75 img)
│   │   ├── interior/   # Foto interni (20 img)
│   │   ├── atmosphere/ # Foto atmosfera (16 img)
│   │   └── events/     # Foto eventi (16 img)
│   └── logo.svg        # Logo ristorante
└── README.md           # Questa documentazione
```

## 🎯 Funzionalità Dettagliate

### Gallery Management
- ✅ **Caricamento incrementale**: Solo 12 immagini alla volta
- ✅ **Filtri avanzati**: Per categoria con contatori dinamici  
- ✅ **Lightbox completo**: Navigazione, zoom, informazioni
- ✅ **Performance**: Lazy loading e ottimizzazione immagini
- ✅ **Accessibilità**: Navigazione da tastiera, screen reader

### User Experience
- ✅ **Smooth scrolling**: Tra le sezioni
- ✅ **Animazioni CSS**: Fade-in, slide-up, hover effects
- ✅ **Mobile responsive**: Breakpoints a 768px e 480px
- ✅ **Touch friendly**: Gesture per mobile e tablet
- ✅ **Fast loading**: Ottimizzazioni performance

### SEO & Performance
- ✅ **Meta tags**: Title, description, keywords
- ✅ **Semantic HTML**: Header, nav, main, section, footer
- ✅ **Schema markup**: Pronto per dati strutturati
- ✅ **Image optimization**: WebP ready con fallback
- ✅ **Core Web Vitals**: Ottimizzato per Google PageSpeed

## 🛠️ Come Utilizzare

### 1. **Avvio Rapido**
```bash
# Apri il file index.html in un browser
# Oppure usa un server locale:
python -m http.server 8000
# Vai su http://localhost:8000
```

### 2. **Personalizzazione Immagini**
```bash
# Modifica generate_images.py per i tuoi contenuti
python generate_images.py
```

### 3. **Configurazione Ristorante**
Modifica in `index.html`:
- Nome ristorante
- Indirizzo e contatti  
- Menu e prezzi
- Orari di apertura
- Link social media

### 4. **Stili Personalizzati**
In `styles.css` modifica le variabili CSS:
```css
:root {
  --food-red: #c41e3a;        /* Colore primario */
  --warm-orange: #ff6b35;     /* Colore secondario */
  --golden-yellow: #ffd23f;   /* Accento oro */
  --font-elegant: 'Playfair Display', serif;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (Layout completo)
- **Tablet**: 768px - 1024px (Layout adattato)
- **Mobile**: < 768px (Stack verticale)
- **Small Mobile**: < 480px (Ottimizzazioni extra)

## 🔧 Customizzazioni Avanzate

### Aggiungere Nuove Categorie Gallery
1. Modifica array `categories` in `script.js`
2. Aggiungi button filter in HTML
3. Aggiorna colori in `generate_images.py`

### Integrazione CMS
Il codice è predisposto per:
- WordPress (custom post types)
- Strapi headless CMS
- Sanity.io
- API REST personalizzate

### Analytics e Tracking
Aggiungi facilmente:
- Google Analytics 4
- Facebook Pixel
- Hotjar heatmaps
- Google Tag Manager

## 🎨 Palette Colori Ristorante

| Categoria | Colore Primario | Colore Secondario | Utilizzo |
|-----------|----------------|-------------------|----------|
| **Principale** | `#c41e3a` (Rosso) | `#ff6b35` (Arancione) | CTA, evidenziazioni |
| **Piatti** | `#FF6B35` | `#D73502` | Card menu, gallery food |
| **Interni** | `#8B4513` | `#A0522D` | Sezioni ambiente |
| **Atmosfera** | `#FFD700` | `#FFA500` | Recensioni, stelle |
| **Eventi** | `#C41E3A` | `#8B0000` | Gallery eventi |

## 🚀 Performance Tips

1. **Immagini WebP**: Converti SVG in WebP per produzione
2. **CDN**: Usa Cloudflare per static assets
3. **Minification**: Comprimi CSS/JS per produzione
4. **Caching**: Imposta headers cache appropriati
5. **Critical CSS**: Inline CSS above-the-fold

## 📞 Supporto

Per domande o personalizzazioni:
- 📧 Email: info@esempio.it
- 📱 WhatsApp: +39 123 456 7890
- 🌐 Website: www.esempio.it

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Utilizzabile liberamente per progetti commerciali e non.

---

**🍝 Buon appetito con il vostro nuovo sito ristorante!**
