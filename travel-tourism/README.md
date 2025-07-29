# 🌍 Travel Tourism Template - WonderTravel

Un template moderno e completamente interattivo per agenzie di viaggio e siti turistici, con effetti "WOW" spettacolari e animazioni avanzate.

## ✨ Caratteristiche Principali

### 🎨 Design & UX
- **Design Moderno**: Layout pulito e professionale con gradients e animazioni fluide
- **Responsive**: Ottimizzato per tutti i dispositivi (desktop, tablet, mobile)
- **Animazioni WOW**: Sistema di animazioni avanzato con effetti parallax, particelle e transizioni
- **Interattività**: Elementi interattivi e hover effects magnetici

### 🚀 Funzionalità Tecniche
- **JavaScript ES6+**: Codice moderno e performante
- **CSS Grid & Flexbox**: Layout responsive e flessibile
- **Intersection Observer API**: Animazioni ottimizzate triggered dallo scroll
- **Canvas Particles**: Sistema di particelle interattivo
- **Form Validation**: Validazione real-time dei form

### 🌟 Sezioni Incluse
1. **Hero Section**: Con video background, parallax e floating elements
2. **Statistics**: Contatori animati e statistiche dinamiche
3. **Destinations**: Grid filtrable con modal dettagliati
4. **Experiences**: Slider interattivo con controlli
5. **Reviews**: Testimonials con design accattivante
6. **Booking**: Form di prenotazione completo
7. **Contact**: Informazioni di contatto e mappa

### 🔧 Componenti Interattivi
- **Loading Screen**: Schermata di caricamento animata
- **Navigation**: Menu responsive con smooth scroll
- **Modal System**: Popup dettagliati per destinazioni
- **Filter System**: Filtri interattivi per destinazioni
- **Particle Effects**: Effetti particellari con mouse interaction
- **Scroll Indicators**: Progress bar e indicatori di scroll

## 📦 Struttura del Progetto

```
travel-tourism/
├── index.html              # Pagina principale
├── package.json            # Configurazione NPM
├── README.md               # Documentazione
├── css/
│   ├── main.css            # Stili principali
│   └── animations.css      # Stili per animazioni
├── js/
│   ├── app.js              # Logica principale
│   └── animations.js       # Sistema di animazioni
└── images/
    └── README.md           # Guida per le immagini
```

## 🚀 Installazione e Uso

### Prerequisiti
- Node.js (versione 14 o superiore)
- Browser moderno che supporta ES6+

### Setup Rapido
```bash
# Clona o scarica il template
cd travel-tourism

# Installa le dipendenze (opzionale per sviluppo)
npm install

# Avvia il server di sviluppo
npm start
```

### Aprire il Template
1. **Metodo 1**: Apri direttamente `index.html` nel browser
2. **Metodo 2**: Usa un server locale (consigliato per tutte le funzionalità)
   ```bash
   npm run serve
   ```

## 🎯 Personalizzazione

### Colori e Branding
Modifica le variabili CSS in `css/main.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* Altri colori... */
}
```

### Contenuti
1. **Destinazioni**: Modifica l'oggetto `destinationData` in `js/app.js`
2. **Recensioni**: Aggiorna la sezione reviews nell'HTML
3. **Informazioni di contatto**: Modifica la sezione contact

### Immagini
- Sostituisci i placeholder con immagini reali nella cartella `images/`
- Usa formati moderni (WebP, AVIF) per prestazioni ottimali
- Dimensioni consigliate: 1200x800px per le destinazioni

### Animazioni
- Disabilita animazioni modificando `isReducedMotion` in `js/animations.js`
- Personalizza velocità e timing nelle classi CSS

## 🔧 Configurazione Avanzata

### Sistema di Particelle
```javascript
new ParticleSystem(canvas, {
    particleCount: 60,
    particleSpeed: 0.8,
    connectionDistance: 120,
    colors: ['#667eea', '#764ba2', '#f093fb']
});
```

### Animazioni Scroll
```html
<!-- Elementi con animazioni -->
<div data-aos="fade-up" data-aos-delay="200">Contenuto</div>
<div data-parallax="0.5">Elemento parallax</div>
<div data-counter="1500" data-duration="2000">Contatore</div>
```

## 📱 Responsive Design

Il template è ottimizzato per:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Breakpoints CSS
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

## 🚀 Performance

### Ottimizzazioni Incluse
- **Lazy Loading**: Immagini caricate on-demand
- **Throttled Scroll**: Eventi scroll ottimizzati
- **GPU Acceleration**: Transform 3D per animazioni fluide
- **Minification**: CSS e JS compressi per produzione

### Scripts NPM per Ottimizzazione
```bash
npm run build       # Minifica CSS e JS
npm run optimize    # Ottimizza immagini
npm run lighthouse  # Audit delle performance
```

## 🎨 Customizzazione Stili

### Gradients Personalizzati
```css
.custom-gradient {
    background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

### Animazioni Personalizzate
```css
@keyframes customAnimation {
    0% { /* stato iniziale */ }
    100% { /* stato finale */ }
}

.custom-animate {
    animation: customAnimation 1s ease-in-out;
}
```

## 🔍 SEO e Accessibilità

### SEO Incluso
- Meta tags ottimizzati
- Struttura semantica HTML5
- Schema.org markup (da implementare)
- Open Graph tags

### Accessibilità
- Contrasti colori WCAG compliant
- Navigazione da tastiera
- ARIA labels e roles
- Alternative text per immagini

## 🐛 Troubleshooting

### Problemi Comuni

**Le animazioni non funzionano**
- Verifica che JavaScript sia abilitato
- Controlla la console per errori
- Assicurati che il browser supporti ES6+

**Il form non si invia**
- Implementa la logica server-side per l'invio email
- Modifica `handleFormSubmit()` in `js/app.js`

**Performance lente**
- Riduci il numero di particelle
- Disabilita animazioni non essenziali
- Ottimizza le immagini

## 📚 Risorse Aggiuntive

### Font e Icone
- **Google Fonts**: Playfair Display, Inter
- **Font Awesome**: Icone vettoriali
- **Custom Icons**: Sostituibili con icon font personalizzati

### Librerie Esterne (opzionali)
- AOS (Animate On Scroll)
- GSAP per animazioni avanzate
- Swiper.js per slider
- Leaflet.js per mappe interattive

## 📄 Licenza

Questo template è rilasciato sotto licenza MIT. Puoi utilizzarlo liberamente per progetti personali e commerciali.

## 🤝 Contributi

Per miglioramenti e bug fixes:
1. Fork del repository
2. Crea un branch per le modifiche
3. Commit delle modifiche
4. Push e Pull Request

## 📞 Supporto

Per domande o supporto:
- Apri una issue su GitHub
- Controlla la documentazione
- Verifica gli esempi di codice

---

**Sviluppato con ❤️ per creare esperienze web incredibili nel settore travel & tourism**
