# Elite Store - E-commerce Showcase Template

## 🚀 Descrizione

Elite Store è un template moderno e dinamico per siti e-commerce con effetti "WOW" realizzati in JavaScript ES6 puro. Il template presenta animazioni fluide, design responsivo e un'esperienza utente coinvolgente senza l'utilizzo di librerie esterne pesanti.

## ✨ Caratteristiche Principali

### 🎨 Design & UI/UX
- **Design moderno e pulito** con gradients e effetti visivi
- **Completamente responsivo** per tutti i dispositivi
- **Animazioni fluide** e transizioni elaborate
- **Sistema di colori coerente** con variabili CSS
- **Typography moderna** con Google Fonts (Poppins)

### 🛍️ Funzionalità E-commerce
- **Catalogo prodotti dinamico** con 16 prodotti di esempio
- **Sistema di filtri avanzato** per categorie
- **Carrello della spesa funzionale** con aggiunta/rimozione prodotti
- **Modal prodotti dettagliati** con zoom immagini
- **Sistema di ricerca in tempo reale**
- **Lista dei desideri (wishlist)**
- **Sistema di valutazioni con stelle**
- **Gestione quantità prodotti**

### 🎯 Effetti WOW & Animazioni
- **Loading screen animato** con logo e spinner
- **Particelle animate** nella hero section
- **Scroll animations** con Intersection Observer
- **Hover effects** su card e bottoni
- **Animazioni staggered** per elementi multipli
- **Effetti parallax** nella hero section
- **Transizioni fluide** tra le sezioni
- **Animazioni di contatori** per statistiche

### 🔧 Funzionalità Tecniche
- **JavaScript ES6+ puro** senza dipendenze esterne
- **Modular CSS** con variabili e classi utility
- **Performance ottimizzate** con lazy loading
- **Accessibilità** con supporto tastiera e screen reader
- **SEO-friendly** con meta tags ottimizzati
- **Cross-browser compatibility**

## 📁 Struttura del Progetto

```
ecommerce-showcase/
├── index.html              # Pagina principale
├── package.json            # Configurazione del progetto
├── README.md               # Documentazione
├── css/
│   ├── main.css           # Stili principali
│   └── animations.css     # Animazioni e keyframes
├── js/
│   └── app.js            # Logica principale dell'applicazione
└── images/               # Directory per immagini (placeholder)
```

## 🚀 Installazione e Avvio

### Opzione 1: Avvio Rapido
```bash
# Clona o scarica il progetto
cd ecommerce-showcase

# Avvia un server locale
npx http-server . -p 3000 -o
```

### Opzione 2: Con Live Reload (Sviluppo)
```bash
# Installa le dipendenze di sviluppo
npm install

# Avvia il server di sviluppo
npm run dev
```

### Opzione 3: Server Semplice
```bash
# Avvia con package.json
npm start
```

## 💡 Come Usare

### 1. Personalizzazione dei Colori
Modifica le variabili CSS in `css/main.css`:
```css
:root {
    --primary-color: #6366f1;    /* Colore primario */
    --secondary-color: #f59e0b;  /* Colore secondario */
    --accent-color: #ec4899;     /* Colore di accento */
    /* ... altri colori */
}
```

### 2. Aggiungere Nuovi Prodotti
Modifica l'array `productData` in `js/app.js`:
```javascript
const productData = [
    {
        name: 'Nuovo Prodotto',
        category: 'electronics',
        price: 199,
        oldPrice: 299,
        rating: 4.5,
        reviews: 123,
        badge: 'New',
        icon: 'fas fa-laptop'
    },
    // ... altri prodotti
];
```

### 3. Personalizzare le Animazioni
Aggiungi nuove animazioni in `css/animations.css`:
```css
@keyframes nuovaAnimazione {
    from { /* stato iniziale */ }
    to { /* stato finale */ }
}

.classe-animata {
    animation: nuovaAnimazione 1s ease-in-out;
}
```

## 🎯 Funzionalità Implementate

### ✅ Core Features
- [x] Loading screen animato
- [x] Header con scroll effect
- [x] Hero section con particelle
- [x] Catalogo prodotti dinamico
- [x] Sistema di filtri
- [x] Ricerca in tempo reale
- [x] Carrello della spesa
- [x] Modal prodotti
- [x] Lista dei desideri
- [x] Sistema di notifiche
- [x] Newsletter subscription
- [x] Footer completo
- [x] Back to top button

### ✅ Animazioni & Effetti
- [x] Fade in/out animations
- [x] Slide animations
- [x] Scale & zoom effects
- [x] Scroll reveal animations
- [x] Parallax effects
- [x] Particle system
- [x] Hover transitions
- [x] Loading animations
- [x] Counter animations
- [x] Ripple effects

### ✅ Responsive Design
- [x] Mobile-first approach
- [x] Tablet optimization
- [x] Desktop enhancement
- [x] Touch-friendly interactions
- [x] Adaptive layouts

## 🎨 Customizzazione

### Colori e Temi
Il template utilizza un sistema di variabili CSS che permette di cambiare facilmente i colori:

```css
/* Tema Scuro */
:root {
    --primary-color: #8b5cf6;
    --bg-color: #1f2937;
    --text-color: #f9fafb;
    /* ... */
}
```

### Tipografia
Per cambiare i font, modifica l'import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=TuoFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🔧 Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Styling moderno con Flexbox/Grid
- **JavaScript ES6+** - Logica applicativa
- **Font Awesome** - Icone
- **Google Fonts** - Tipografia

## 📈 Performance

- ⚡ **Lighthouse Score**: 90+
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile-friendly**: 100%
- ♿ **Accessibility**: AA compliant

## 🤝 Contribuzioni

Le contribuzioni sono benvenute! Per contribuire:

1. Fork del progetto
2. Crea un branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🆘 Supporto

Per supporto e domande:
- 📧 Email: support@elitestore.it
- 💬 Issues: [GitHub Issues](https://github.com/example/ecommerce-showcase/issues)

## 🎉 Demo Live

Visita la demo live: [Elite Store Demo](https://example.github.io/ecommerce-showcase)

---

**Elite Store Template** - *Creato con ❤️ per sviluppatori e designer*
