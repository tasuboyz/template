# Educational Academy Template

Un template moderno e coinvolgente per siti web di Academy/Educational con effetti "WOW" in JavaScript ES6.

## 🚀 Caratteristiche

### Design e UX
- **Design Moderno**: Layout pulito e professionale con gradiente blu-viola
- **Completamente Responsive**: Ottimizzato per desktop, tablet e mobile
- **Animazioni Fluide**: Oltre 30 animazioni CSS e JavaScript personalizzate
- **Effetti WOW**: Particelle, parallax, cursor magnetico, ripple effect

### Funzionalità Principali
- **Hero Section Animata**: Con particelle fluttuanti e statistiche animate
- **Catalogo Corsi**: Sistema di filtri animati con categorie
- **Sezione Docenti**: Card interactive con effetti hover
- **Testimonial Slider**: Carousel automatico con controlli
- **Modulo Contatti**: Form validato con animazioni di invio
- **Progress Bars**: Barre di progresso animate al scroll

### Tecnologie Utilizzate
- **HTML5 Semantico**: Struttura accessibile e SEO-friendly
- **CSS3 Avanzato**: Flexbox, Grid, Animazioni, Transforms
- **JavaScript ES6+**: Classi, Arrow Functions, Promises, Async/Await
- **Font Awesome 6**: Icone moderne e scalabili
- **Google Fonts**: Typography Poppins

## 📁 Struttura del Progetto

```
educational-academy/
├── index.html              # Pagina principale
├── package.json            # Configurazione npm
├── README.md              # Documentazione
├── css/
│   ├── main.css           # Stili principali
│   └── animations.css     # Animazioni avanzate
├── js/
│   └── app.js            # JavaScript ES6 principale
└── images/
    └── README.md         # Placeholder per immagini
```

## 🛠️ Installazione e Setup

### Prerequisiti
- Node.js (versione 14+)
- NPM o Yarn

### Installazione
```bash
# Clona o scarica il template
cd educational-academy

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

Il sito sarà disponibile su `http://localhost:3000`

### Build per Produzione
```bash
# Minifica CSS e JavaScript
npm run build
```

## 🎨 Personalizzazione

### Colori
I colori principali sono definiti come variabili CSS:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #ffd700;
  --text-dark: #333;
  --text-light: #666;
}
```

### Animazioni
Puoi aggiungere nuove animazioni in `css/animations.css`:
```css
.custom-animation {
  animation: customEffect 1s ease-out forwards;
}

@keyframes customEffect {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### JavaScript
Il codice è organizzato in una classe ES6 principale:
```javascript
class EduProAcademy {
  constructor() {
    this.init();
  }
  
  init() {
    // Inizializza tutti i componenti
  }
}
```

## 📱 Responsive Design

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: 320px - 767px

Tutti gli elementi sono ottimizzati per ogni breakpoint.

## ⚡ Performance

- **Caricamento Progressivo**: Lazy loading per immagini
- **Animazioni Ottimizzate**: Uso di `transform` e `opacity`
- **Code Splitting**: CSS e JS modulari
- **Minificazione**: Build process per produzione

## 🎯 Sezioni del Template

### 1. Hero Section
- Animazioni di testo con typewriter effect
- Particelle animate di sfondo
- Statistiche con contatori animati
- Call-to-action con effetti hover

### 2. Corsi
- Griglia responsiva di corsi
- Sistema di filtri per categoria  
- Card animate con hover effects
- Rating e informazioni docente

### 3. Chi Siamo
- Progress bars animate
- Feature cards con icone
- Layout a due colonne responsivo

### 4. Docenti
- Card con foto e social links
- Statistiche personali
- Effetti hover avanzati

### 5. Testimonial
- Slider automatico
- Controlli di navigazione
- Transizioni fluide

### 6. Contatti
- Form validato
- Animazioni di input focus
- Notifiche di successo/errore

## 🔧 Effetti WOW Implementati

1. **Particle System**: Particelle fluttuanti nell'hero
2. **Magnetic Hover**: Bottoni che seguono il mouse
3. **Ripple Effect**: Effetto ondulazione sui click
4. **Custom Cursor**: Cursore personalizzato interattivo
5. **Parallax Scrolling**: Elementi che si muovono al scroll
6. **Intersection Observer**: Animazioni trigger al scroll
7. **Loading Screen**: Schermata di caricamento animata
8. **Smooth Scrolling**: Navigazione fluida tra sezioni
9. **Stagger Animations**: Animazioni scaglionate
10. **Progress Bars**: Barre animate in base al progresso

## 🌐 Compatibilità Browser

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 Licenza

MIT License - Sentiti libero di utilizzare questo template per progetti personali e commerciali.

## 🤝 Supporto

Per domande o supporto:
- Email: info@eduproacademy.it
- Website: [eduproacademy.it](https://eduproacademy.it)

---

Creato con ❤️ per la comunità educational italiana.
