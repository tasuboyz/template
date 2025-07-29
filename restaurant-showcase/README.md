# 🍝 Bella Vista Restaurant - Template Showcase

Un template moderno e elegante per ristoranti italiani, costruito con **JavaScript ES6+**, **effetti WOW** coinvolgenti e **design responsive** per offrire un'esperienza culinaria digitale indimenticabile.

## ✨ Caratteristiche Principali

### 🎨 Design & UI/UX
- **Design elegante e raffinato** con colori oro e tonalità calde
- **Completamente responsivo** per tutti i dispositivi (mobile-first)
- **Animazioni fluide** e transizioni elaborate
- **Tipografia premium** con Google Fonts (Playfair Display + Poppins)
- **Effetti parallax** e microinterazioni avanzate

### 🍽️ Funzionalità Restaurant
- **Menu digitale interattivo** con filtri per categorie
- **Sistema di prenotazioni online** con form di validazione
- **Gallery fotografica** con effetti hover eleganti
- **Sezione Chef** con biografia e specialità
- **Informazioni contatto** complete con mappa
- **Orari di apertura** e dettagli del ristorante

### 🎯 Effetti WOW & Animazioni
- **Loading screen animato** con logo del ristorante
- **Sistema di particelle** nella hero section
- **Scroll reveal animations** con Intersection Observer
- **Counter animations** per statistiche del ristorante
- **Hover effects** sofisticati su card e bottoni
- **Ripple effects** sui pulsanti interattivi
- **Smooth scrolling** tra le sezioni
- **Form validation** real-time con feedback visivo

### 🔧 Funzionalità Tecniche
- **JavaScript ES6+ puro** senza dipendenze esterne
- **Modular CSS** con variabili CSS custom
- **Performance ottimizzate** con lazy loading
- **Accessibilità** con supporto tastiera e screen reader
- **SEO-friendly** con meta tags ottimizzati
- **Cross-browser compatibility** (IE11+)

## 📁 Struttura del Progetto

```
restaurant-showcase/
├── 📄 index.html              # Pagina principale
├── 🎨 css/
│   ├── main.css              # Stili principali e layout
│   └── animations.css        # Animazioni e effetti WOW
├── 📦 js/
│   └── app.js               # Applicazione JavaScript principale
├── 🖼️ images/              # Cartella per immagini (placeholder)
├── 📋 package.json          # Configurazione npm
└── 📖 README.md            # Documentazione (questo file)
```

## 🚀 Installazione e Avvio

### Metodo 1: Apertura Diretta
```bash
# Clona o scarica i file
# Apri index.html nel browser
```

### Metodo 2: Server Locale (Raccomandato)
```bash
# Installa dipendenze (opzionale per build)
npm install

# Avvia server di sviluppo
npm start
# oppure
npm run dev

# Il sito sarà disponibile su http://localhost:3000
```

### Metodo 3: Server HTTP Semplice
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx http-server -p 8080

# Usando Live Server (VS Code extension)
# Clicca destro su index.html > "Open with Live Server"
```

## 💡 Come Usare

### 1. Personalizzazione dei Colori
I colori sono definiti come variabili CSS in `:root`:
```css
:root {
    --primary-color: #d4af37;        /* Oro principale */
    --secondary-color: #8b4513;      /* Marrone secondario */
    --accent-color: #ff6b35;         /* Arancione accento */
    --bg-color: #1a1a1a;            /* Sfondo scuro */
    --text-color: #ffffff;           /* Testo bianco */
}
```

### 2. Aggiungere Nuovi Piatti al Menu
```html
<div class="menu-item" data-category="antipasti">
    <div class="menu-image">
        <div class="image-placeholder">
            <i class="fas fa-utensils"></i>
        </div>
    </div>
    <div class="menu-content">
        <h3>Nome Piatto</h3>
        <p>Descrizione del piatto</p>
        <div class="menu-price">€00.00</div>
        <div class="menu-rating">
            <!-- Stelle di valutazione -->
        </div>
    </div>
</div>
```

### 3. Personalizzare le Animazioni
Le animazioni sono controllate da classi CSS e possono essere modificate in `animations.css`:
```css
.reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
```

### 4. Configurare il Form di Prenotazione
Il form di prenotazione include validazione real-time. Per integrare con un backend:
```javascript
// In app.js, modifica la funzione submitReservation
submitReservation(data) {
    fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        this.notificationSystem.show('Prenotazione confermata!', 'success');
    });
}
```

## 🎯 Funzionalità Implementate

### ✅ Core Features
- [x] Loading screen con animazione chef
- [x] Header sticky con scroll effect
- [x] Hero section con particelle animate
- [x] Menu interattivo con filtri
- [x] Sistema di prenotazioni
- [x] Gallery fotografica
- [x] Sezione informazioni ristorante
- [x] Footer completo
- [x] Back to top button
- [x] Sistema di notifiche

### ✅ Animazioni & Effetti
- [x] Fade in/out animations
- [x] Slide animations (left, right, up)
- [x] Scale & zoom effects
- [x] Scroll reveal animations
- [x] Parallax effects
- [x] Particle system
- [x] Hover transitions
- [x] Loading animations
- [x] Counter animations
- [x] Ripple effects
- [x] Form validation animations

### ✅ Responsive Design
- [x] Mobile-first approach
- [x] Tablet optimization
- [x] Desktop enhancement
- [x] Touch-friendly interactions
- [x] Adaptive layouts
- [x] Flexible grid systems

## 🎨 Customizzazione

### Cambiare il Nome del Ristorante
1. Modifica il titolo in `index.html`
2. Aggiorna il logo nella sezione header
3. Cambia i riferimenti nel footer

### Aggiungere Immagini Reali
1. Sostituisci i placeholder in `.image-placeholder`
2. Aggiungi le tue immagini nella cartella `images/`
3. Aggiorna i riferimenti negli `src` delle immagini

### Modificare i Font
```html
<!-- In index.html -->
<link href="https://fonts.googleapis.com/css2?family=TuoFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* In main.css */
:root {
    --font-primary: 'TuoFont', serif;
    --font-secondary: 'AltroFont', sans-serif;
}
```

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 (supporto limitato per alcune animazioni)

## 🔧 Tecnologie Utilizzate

- **HTML5** - Struttura semantica moderna
- **CSS3** - Styling avanzato con Flexbox e Grid
- **JavaScript ES6+** - Logica applicativa moderna
- **Font Awesome** - Icone vettoriali
- **Google Fonts** - Tipografia premium
- **Intersection Observer API** - Scroll animations performanti
- **CSS Custom Properties** - Sistema di variabili

## 📈 Performance

### Ottimizzazioni Implementate
- ✅ Lazy loading per animazioni
- ✅ Debounced scroll events
- ✅ CSS minification ready
- ✅ JavaScript compression ready
- ✅ Optimized asset loading
- ✅ Reduced motion support

### Lighthouse Scores Target
- 🎯 **Performance**: 90+
- 🎯 **Accessibility**: 95+
- 🎯 **Best Practices**: 90+
- 🎯 **SEO**: 95+

## 🚀 Build e Deploy

### Build per Produzione
```bash
# Minifica CSS e JavaScript
npm run build

# I file minificati saranno in:
# css/main.min.css
# js/app.min.js
```

### Deploy su Netlify
1. Connetti il repository GitHub
2. Build command: `npm run build`
3. Publish directory: `/`
4. Deploy automatico su push

### Deploy su Vercel
```bash
npx vercel --prod
```

## 🤝 Contribuzioni

Le contribuzioni sono benvenute! Per contribuire:

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/nuova-feature`)
3. Commit delle modifiche (`git commit -am 'Aggiunge nuova feature'`)
4. Push del branch (`git push origin feature/nuova-feature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🆘 Supporto

Per supporto, bug reports o richieste di feature:

- 📧 Email: support@bellavista-template.com
- 🐛 Issues: [GitHub Issues](https://github.com/bellavista/restaurant-template/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bellavista/restaurant-template/discussions)

## 🎉 Demo Live

🌐 **[Visualizza Demo Live](https://bellavista-restaurant.netlify.app)**

---

## 📸 Screenshots

### Desktop
![Desktop Hero](images/screenshots/desktop-hero.png)
![Desktop Menu](images/screenshots/desktop-menu.png)

### Mobile
![Mobile Hero](images/screenshots/mobile-hero.png)
![Mobile Menu](images/screenshots/mobile-menu.png)

---

<div align="center">

**⭐ Se questo template ti è stato utile, lascia una stella su GitHub! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/bellavista/restaurant-template?style=social)](https://github.com/bellavista/restaurant-template)
[![GitHub forks](https://img.shields.io/github/forks/bellavista/restaurant-template?style=social)](https://github.com/bellavista/restaurant-template)

Made with ❤️ and 🍝 by **Bella Vista Development Team**

</div>
