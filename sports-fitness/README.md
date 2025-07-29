# 🏋️ FitZone Pro - Template Sports/Fitness

Template moderno e responsive per centri fitness, palestre e personal trainer con effetti "WOW" avanzati in JavaScript ES6.

## 🌟 Caratteristiche Principali

### ✨ Design & Esperienza Utente
- **Design Moderno**: Layout professionale ottimizzato per il settore fitness
- **Responsive**: Perfettamente funzionante su tutti i dispositivi
- **Loading Screen**: Schermata di caricamento animata con progress bar
- **Animazioni Fluide**: Oltre 30 animazioni CSS3 personalizzate
- **Effetti Particelle**: Sistema di particelle canvas interattivo nell'hero
- **Scroll Animations**: Animazioni trigger al scroll con Intersection Observer

### 🚀 Funzionalità Interattive
- **Navigation Dinamica**: Menu responsive con indicatori di sezione attiva
- **Counter Animations**: Statistiche animate con contatori progressivi
- **Modal System**: Sistema di modali per prenotazioni e tracking progressi
- **Floating Action Button**: FAB con menu di azioni rapide
- **Schedule Filters**: Filtri interattivi per orari delle lezioni
- **Progress Tracking**: Dashboard per monitorare i progressi dell'utente

### 🎯 Sezioni Specializzate
- **Hero Section**: Sezione principale con effetti particelle e call-to-action
- **About**: Presentazione del centro con elementi floating animati
- **Services**: Grid di servizi con hover effects e icone animate
- **Trainers**: Profili dei trainer con social links e overlay effects
- **Schedule**: Orari delle lezioni con sistema di filtri
- **Pricing**: Piani tariffari con card animate e badge "più popolare"
- **Contact**: Form di contatto con validazione e animazioni

### 🔧 Tecnologie Utilizzate
- **HTML5**: Markup semantico e accessibile
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript ES6**: Classi, Arrow Functions, Async/Await, Modules
- **Canvas API**: Sistema particelle per effetti visivi
- **Intersection Observer**: Animazioni ottimizzate al scroll
- **Local Storage**: Salvataggio preferenze utente

## 📁 Struttura File

```
sports-fitness/
├── index.html                 # Pagina principale
├── package.json              # Configurazione NPM
├── README.md                 # Documentazione
├── css/
│   ├── main.css              # Stili principali
│   └── animations.css        # Animazioni personalizzate
├── js/
│   └── app.js                # JavaScript principale (ES6)
└── images/
    └── README.md             # Istruzioni per le immagini
```

## 🎨 Palette Colori

```css
--primary-color: #ff6b35      /* Arancione energico */
--secondary-color: #2c3e50    /* Blu scuro professionale */
--accent-color: #f39c12       /* Giallo accento */
--success-color: #27ae60      /* Verde successo */
--light-gray: #f8f9fa         /* Grigio chiaro */
```

## ⚡ Animazioni Incluse

### Animazioni di Entrata
- `bounceInDown`, `bounceInUp`, `bounceInLeft`, `bounceInRight`
- `zoomIn`, `rotateIn`, `flipInX`, `flipInY`
- `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`

### Animazioni Continue
- `pulse`, `heartbeat`, `shake`, `wobble`, `swing`, `tada`, `jello`

### Animazioni Fitness Specifiche
- `muscleFlexing`, `dumbbellLift`, `cardioHeartbeat`
- `strengthWave`, `yogaFlow`, `particleFloat`

### Animazioni Hover
- `hover-grow`, `hover-shrink`, `hover-float`
- `hover-sink`, `hover-rotate`, `hover-glow`

## 🚀 Installazione e Utilizzo

### Installazione Dipendenze
```bash
npm install
```

### Avvio Server di Sviluppo
```bash
npm start
```
Apre automaticamente il browser su `http://localhost:3000`

### Server Python Alternativo
```bash
npm run serve
```
Utilizza il server Python su `http://localhost:8000`

### Build per Produzione
```bash
npm run build
```
Minifica CSS e JavaScript per deployment

### Validazione e Linting
```bash
npm run lint      # ESLint per JavaScript
npm run validate  # Validazione HTML
npm run format    # Formattazione Prettier
```

## 🎯 Funzionalità Dettagliate

### Sistema di Prenotazioni
- Modal interattivo per prenotazione sessioni
- Form con validazione in tempo reale
- Animazioni di conferma e feedback utente
- Integrazione con calendario (pronto per API)

### Progress Tracking
- Dashboard progressi con grafici circolari animati
- Log degli allenamenti recenti
- Statistiche personalizzate (peso, forza, resistenza)
- Animazioni percentuali progressive

### Schedule Manager
- Filtri per tipo di corso (Yoga, HIIT, Strength, Cardio)
- Visualizzazione posti disponibili in tempo reale
- Click per prenotazione diretta
- Animazioni smooth per transizioni filtri

### Notification System
- Notifiche toast animate
- Auto-dismiss configurabile
- Tipologie: success, error, info, warning
- Posizionamento responsive

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px - Layout completo con sidebar
- **Tablet**: 768px - 1024px - Grid adattato e menu collassato
- **Mobile**: < 768px - Stack verticale e menu hamburger

### Touch Support
- Swipe gestures per navigazione mobile
- Touch-friendly button sizing (minimum 44px)
- Hover effects adattati per touch devices

## 🔧 Personalizzazione

### Colori
Modifica le custom properties in `css/main.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... */
}
```

### Animazioni
Personalizza timing e durate in `css/animations.css`:
```css
.your-animation {
  animation: animationName 2s ease-in-out infinite;
}
```

### Contenuti
- Sostituisci i placeholder con contenuti reali
- Aggiungi immagini nella cartella `images/`
- Personalizza i testi nel file `index.html`

## 🌐 SEO e Performance

### Ottimizzazioni Incluse
- Meta tags OpenGraph e Twitter Card
- Schema.org markup per business locale
- Lazy loading per immagini (quando aggiunte)
- Preconnect ai font esterni
- Minificazione CSS/JS per produzione

### Lighthouse Score Target
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🔒 Accessibilità

### Features Implementate
- Navigazione da tastiera completa
- ARIA labels e roles
- Focus indicators visibili
- Color contrast WCAG AA compliant
- Screen reader friendly
- Reduced motion media query support

## 🛠️ Integrazione API

### Endpoints Suggeriti
```javascript
// Prenotazioni
POST /api/bookings
GET /api/bookings/:userId

// Programmazione Corsi
GET /api/schedule
GET /api/classes/:id

// Profili Trainer
GET /api/trainers
GET /api/trainers/:id

// Progress Tracking
GET /api/progress/:userId
POST /api/workouts
```

## 🎭 Effetti WOW Implementati

1. **Particles System**: Canvas con particelle interattive nell'hero
2. **Scroll Animations**: Reveal progressivo degli elementi
3. **Counter Animations**: Statistiche che contano progressivamente
4. **Hover Effects**: Transformazioni 3D sui cards
5. **Loading Sequence**: Caricamento orchestrato con progress bar
6. **Modal Transitions**: Slide e fade effects per modali
7. **FAB Interactions**: Menu a ventaglio animato
8. **Form Validations**: Feedback visivo in tempo reale
9. **Progress Circles**: Grafici circolari animati
10. **Notification Toasts**: Sistema di notifiche animate

## 📊 Analytics Suggerite

### Eventi da Tracciare
- Click sui CTA principali
- Apertura modali prenotazione
- Completamento form contatti
- Interazioni con schedule
- Scroll depth per sezioni
- Time on page per servizi

## 🚀 Deployment

### Hosting Statico (Consigliato)
- **Netlify**: Deploy automatico da Git
- **Vercel**: Ottimizzato per performance
- **GitHub Pages**: Hosting gratuito
- **Firebase Hosting**: CDN globale

### Server Tradizionale
- Upload cartella completa via FTP
- Configurare HTTPS e compressione GZIP
- Impostare cache headers per assets statici

## 🆘 Supporto e Troubleshooting

### Problemi Comuni
1. **Animazioni non funzionano**: Verificare supporto browser per CSS animations
2. **Particelle lag**: Ridurre particleCount in `app.js`
3. **Layout mobile**: Testare su dispositivi reali, non solo dev tools
4. **Form non invia**: Implementare endpoint server per gestione form

### Performance Tips
- Lazy load delle immagini quando possibile
- Utilizzare WebP per immagini quando supportato
- Minimizzare reflow e repaint
- Implementare Service Worker per caching

## 📝 Licenza

Questo template è rilasciato sotto licenza MIT. Vedi `LICENSE` per dettagli.

## 🤝 Contributi

Contributi benvenuti! Apri una issue o una pull request per:
- Bug fixes
- Nuove animazioni
- Miglioramenti performance
- Funzionalità aggiuntive

## 📧 Contatti

- **Email**: dev@fitzonepro.it
- **Website**: https://fitzonepro.it
- **Support**: https://github.com/fitzone/sports-fitness-template/issues

---

🏋️ **Trasforma il tuo business fitness con questo template all'avanguardia!** 💪
