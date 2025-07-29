# Wedding Events Template 💒✨

Un template elegante e romantico per matrimoni ed eventi, realizzato con JavaScript ES6 puro e effetti "WOW" avanzati.

## 🌟 Caratteristiche Principali

### ✨ Effetti Visivi Avanzati
- **Particelle fluttuanti** animate in tempo reale
- **Cuori galleggianti** con animazioni CSS3
- **Effetti parallax** fluidi durante lo scroll
- **Galleria fotografica** con modal e navigazione
- **Countdown timer** animato fino al matrimonio
- **Loading screen** con animazioni personalizzate

### 💖 Sezioni Romantiche
- **Hero Section** con nomi degli sposi e countdown
- **La Nostra Storia** con timeline romantica
- **Galleria Momenti** con immagini generate dinamicamente
- **Timeline Matrimonio** con programma dettagliato
- **RSVP Form** con validazione e animazioni
- **Lista Nozze** con sistema di contributi

### 🎨 Design Moderno
- Design responsive mobile-first
- Colori romantici e sfumature eleganti
- Typography raffinata con Google Fonts
- Animazioni fluide con CSS3 e JavaScript
- Interfaccia intuitiva e user-friendly

## 🚀 Demo Live

Apri il file `index.html` nel tuo browser per vedere la demo completa!

## 📁 Struttura del Progetto

```
wedding-events/
├── index.html              # Pagina principale
├── package.json            # Configurazione progetto
├── README.md               # Documentazione
├── css/
│   ├── main.css           # Stili principali
│   └── animations.css     # Animazioni CSS
├── js/
│   └── app.js            # JavaScript ES6 principale
└── images/               # Directory per immagini
```

## ⚡ Installazione e Utilizzo

### 1. Clone del Repository
```bash
git clone https://github.com/yourusername/wedding-events-template.git
cd wedding-events-template
```

### 2. Installazione Dipendenze (Opzionale)
```bash
npm install
```

### 3. Avvio del Server di Sviluppo
```bash
npm start
# oppure
npm run dev
```

### 4. Apertura Diretta
Apri semplicemente `index.html` nel tuo browser preferito!

## 🛠 Personalizzazione

### Modifica dei Dati degli Sposi
Nel file `index.html`, cerca e modifica:
```html
<h1 class="bride-name">Emma</h1>
<h1 class="groom-name">Marco</h1>
<p class="wedding-date">15 Settembre 2025</p>
<p class="wedding-location">Villa San Martino, Firenze</p>
```

### Aggiornamento del Countdown
Nel file `js/app.js`, modifica la data del matrimonio:
```javascript
const weddingDate = new Date('2025-09-15T14:30:00').getTime();
```

### Personalizzazione dei Colori
Nel file `css/main.css`, modifica le variabili CSS:
```css
:root {
    --primary-color: #d4a574;      /* Oro rosa */
    --secondary-color: #f7f1e8;    /* Crema */
    --accent-color: #8b5a3c;       /* Marrone caldo */
    --pink-rose: #f4c2c2;          /* Rosa tenue */
    --gold: #d4af37;               /* Oro */
}
```

### Aggiunta di Immagini Reali
1. Aggiungi le tue foto nella cartella `images/`
2. Modifica la funzione `generateGallery()` in `js/app.js`
3. Sostituisci i placeholder con i percorsi delle tue immagini

## 🎯 Funzionalità JavaScript ES6

### Classe Principale
```javascript
class WeddingTemplate {
    constructor() {
        this.isLoaded = false;
        this.currentImageIndex = 0;
        this.galleryImages = [];
        this.init();
    }
    
    // Metodi per tutte le funzionalità
}
```

### Effetti Dinamici
- **Particle System**: Particelle animate con Canvas API
- **Floating Hearts**: Cuori che fluttuano dalla base verso l'alto
- **Smooth Scrolling**: Navigazione fluida tra sezioni
- **Gallery Modal**: Lightbox avanzato con navigazione
- **Form Validation**: Validazione moderna con feedback visivo

### Responsive Design
- Breakpoints ottimizzati per tutti i dispositivi
- Menu hamburger per mobile
- Layout adattivo per tablet e desktop
- Performance ottimizzate per mobile

## 🎨 Animazioni CSS

### Effetti di Hover
```css
.hover-lift:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Animazioni di Caricamento
```css
@keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}
```

## 📱 Compatibilità Browser

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari
- ✅ Chrome Mobile

## 🔧 Configurazione Avanzata

### Server di Sviluppo
Il template include configurazioni per:
- **Live Server**: Ricaricamento automatico
- **HTTP Server**: Server statico semplice

### Build per Produzione
```bash
npm run build
```

## 📞 RSVP e Lista Nozze

### Sistema RSVP
- Form di conferma presenza
- Validazione campi in tempo reale
- Gestione allergie alimentari
- Animazioni di successo

### Lista Nozze Digitale
- Contributi per casa nuova
- Contributi per luna di miele
- Link a lista tradizionale
- Modal di pagamento simulato

## 🎉 Eventi e Timeline

### Timeline Matrimonio
Programma completamente personalizzabile:
- Cerimonia civile
- Aperitivo di benvenuto
- Sessione fotografica
- Cena e festa

### Gestione Eventi
- Date e orari flessibili
- Descrizioni dettagliate
- Icone personalizzabili
- Animazioni di apparizione

## 💝 Credits

### Fonts
- **Dancing Script**: Per titoli romantici
- **Playfair Display**: Per intestazioni eleganti
- **Lato**: Per testo leggibile

### Icons
- **Font Awesome 6**: Per tutte le icone

### Libraries
- **JavaScript ES6 Puro**: Nessuna dipendenza esterna
- **CSS3 Avanzato**: Animazioni e transizioni moderne

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Apri una issue o invia una pull request.

## 📞 Supporto

Per supporto o domande:
- Email: support@weddingtemplate.pro
- Issues: GitHub Issues

---

**Made with 💖 for unforgettable moments**

*Template Wedding Events v1.0.0*
