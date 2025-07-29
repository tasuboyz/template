# Template Minimal One Page

Un template moderno e minimal per siti web one-page con effetti "WOW" implementati in JavaScript ES6.

## 🚀 Caratteristiche

### Design
- **Design Minimal e Moderno**: Interfaccia pulita e professionale
- **Completamente Responsive**: Ottimizzato per tutti i dispositivi
- **Animazioni Fluide**: Effetti WOW implementati in JavaScript ES6
- **Gradiente Animati**: Sfondi dinamici e accattivanti
- **Tipografia Moderna**: Font Inter per leggibilità ottimale

### Funzionalità
- **Navigazione Smooth**: Scroll fluido tra le sezioni
- **Typewriter Effect**: Animazione di scrittura dinamica
- **Contatori Animati**: Statistiche che si animano all'scroll
- **Portfolio Filter**: Filtro dinamico per i progetti
- **Form Contacto**: Modulo di contatto funzionale
- **Effetti Parallax**: Elementi flottanti con movimento parallax
- **Particelle Animate**: Effetti di particelle nel background
- **Ripple Effects**: Effetti di onda sui pulsanti
- **Mobile Menu**: Menu hamburger per dispositivi mobili

### Sezioni Incluse
1. **Hero Section**: Con typewriter effect e forme animate
2. **About**: Presentazione con statistiche animate
3. **Services**: Griglia di servizi con hover effects
4. **Portfolio**: Galleria filtrata dei lavori
5. **Contact**: Modulo di contatto e informazioni
6. **Footer**: Footer completo con link social

## 📁 Struttura File

```
minimal-onepage/
├── index.html              # Pagina principale
├── package.json            # Configurazione npm
├── README.md              # Documentazione
├── css/
│   ├── main.css           # Stili principali
│   └── animations.css     # Animazioni e keyframes
└── js/
    └── app.js             # JavaScript ES6 principale
```

## 🛠 Installazione e Utilizzo

### Metodo 1: Utilizzo Diretto
1. Scarica tutti i file
2. Apri `index.html` in un browser moderno

### Metodo 2: Con Live Server (Raccomandato)
```bash
# Installa live-server globalmente (se non già installato)
npm install -g live-server

# Naviga nella cartella del progetto
cd minimal-onepage

# Avvia il server di sviluppo
npm start
```

### Metodo 3: Con Python
```bash
# Naviga nella cartella del progetto
cd minimal-onepage

# Avvia server Python
npm run serve
```

## 🎨 Personalizzazione

### Colori Principali
I colori del template sono definiti tramite gradiente CSS:
```css
/* Gradiente principale */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modifica Testo Typewriter
Nel file `index.html`, cerca l'elemento con classe `typewriter`:
```html
<span class="typewriter" data-text="Testo1,Testo2,Testo3"></span>
```

### Aggiungere Nuovi Servizi
Utilizza il metodo JavaScript:
```javascript
const template = new MinimalTemplate();
template.addServiceCard({
    icon: 'fas fa-icon',
    title: 'Nuovo Servizio',
    description: 'Descrizione del servizio',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
});
```

### Modifica Statistiche
Nel file `index.html`, modifica i valori `data-target`:
```html
<span class="stat-number counter" data-target="150">0</span>
```

## 🚀 Funzionalità JavaScript

### Effetti di Scroll
- **Reveal Animations**: Elementi che si mostrano durante lo scroll
- **Parallax**: Movimento parallax per elementi flottanti
- **Navbar Transparency**: Navbar che cambia opacità

### Animazioni
- **Fade In**: Comparsa graduale
- **Slide**: Scivolamento da diverse direzioni
- **Scale**: Effetti di ingrandimento
- **Rotate**: Rotazioni fluide
- **Typewriter**: Effetto macchina da scrivere

### Interazioni
- **Ripple Effect**: Effetti onda sui click
- **Hover Animations**: Animazioni al passaggio del mouse
- **Mobile Menu**: Menu responsive per mobile
- **Smooth Scroll**: Navigazione fluida

## 📱 Compatibilità

### Browser Supportati
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Dispositivi
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Styling avanzato con Flexbox e Grid
- **JavaScript ES6+**: Logica e interazioni moderne
- **Font Awesome 6**: Icone vettoriali
- **Google Fonts**: Tipografia Inter

## 📈 Performance

### Ottimizzazioni Incluse
- CSS minimalista e ottimizzato
- JavaScript ES6 moderno e efficiente
- Immagini placeholder per caricamento rapido
- Animazioni GPU-accelerated
- Lazy loading per elementi non critici

### Metriche Target
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## 🎯 Utilizzi Consigliati

Questo template è perfetto per:
- Portfolio personali
- Landing page aziendali
- Siti vetrina servizi
- Presentazioni prodotto
- Startup MVP
- Servizi professionali

## 📝 Licenza

MIT License - Libero per uso commerciale e personale.

## 🆘 Supporto

Per domande o problemi:
1. Controlla la documentazione
2. Verifica la compatibilità del browser
3. Assicurati che JavaScript sia abilitato

## 🔄 Versioni Future

### Roadmap
- [ ] Integrazione CMS headless
- [ ] Supporto PWA
- [ ] Modalità dark/light
- [ ] Multilingua
- [ ] Analytics integrato

---

**Creato con ❤️ per il web moderno**
