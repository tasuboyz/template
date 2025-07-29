# Bella Vista Restaurant - Images Directory

Questa cartella contiene tutte le immagini utilizzate nel template del ristorante.

## Struttura delle Immagini

### 📁 Cartelle Consigliate:
```
images/
├── hero/                 # Immagini hero section
├── menu/                 # Foto dei piatti
├── gallery/              # Gallery del ristorante
├── chef/                 # Foto dello chef
├── restaurant/           # Interni del ristorante
├── logo/                 # Logo e branding
└── icons/               # Icone personalizzate
```

### 🖼️ Formati Supportati:
- **WebP** (raccomandato per le performance)
- **JPEG** (per fotografie)
- **PNG** (per immagini con trasparenza)
- **SVG** (per icone e loghi)

### 📐 Dimensioni Consigliate:

#### Hero Section:
- **Desktop**: 1920x1080px o 1440x810px
- **Mobile**: 768x1024px

#### Menu Items:
- **Card Images**: 400x300px
- **Detail Images**: 800x600px

#### Gallery:
- **Thumbnail**: 300x300px
- **Lightbox**: 1200x800px

#### Chef Photo:
- **Profile**: 300x300px (quadrata)
- **Bio Section**: 400x500px

### 🎨 Placeholder Attuali:
Il template utilizza attualmente placeholder CSS con icone Font Awesome. Per sostituirli con immagini reali:

1. Aggiungi le tue immagini in questa cartella
2. Sostituisci i div `.image-placeholder` con tag `<img>`
3. Aggiorna i riferimenti negli src

### Esempio di Sostituzione:
```html
<!-- Da placeholder -->
<div class="image-placeholder">
    <i class="fas fa-utensils"></i>
</div>

<!-- A immagine reale -->
<img src="images/menu/carbonara.jpg" alt="Spaghetti Carbonara" loading="lazy">
```

### 📷 Suggerimenti per le Foto:

#### Menu:
- Buona illuminazione naturale
- Sfondo pulito e neutro
- Focus sul piatto principale
- Colori vivaci e appetitosi

#### Interni:
- Illuminazione calda e accogliente
- Angoli che mostrano l'atmosfera
- Tavoli apparecchiati elegantemente
- Dettagli dell'arredamento

#### Chef:
- Foto professionale in divisa
- Espressione amichevole e sicura
- Sfondo della cucina (opzionale)
- Alta risoluzione per stampa

### 🔧 Ottimizzazione:
- Comprimi le immagini per il web
- Usa WebP quando possibile
- Implementa lazy loading
- Fornisci più formati (WebP + fallback)

### 📝 Note:
- Tutte le immagini devono essere originali o con licenza appropriata
- Considera l'accessibilità con alt text descrittivi
- Mantieni coerenza nello stile fotografico
- Backup delle immagini originali ad alta risoluzione
