# 🗺️ Google Maps Integration Setup Guide (Iframe Version)

## Overview
La sezione **Location** del template FoodGallery include:
- **Mappa interattiva** tramite iframe (no API key required)
- **Street View** integrato
- **Informazioni di contatto** dettagliate
- **Indicazioni stradali** automatiche
- **Design responsive** ottimizzato

## 🚀 Setup Immediato (No API Key Required!)

### ✅ Vantaggi dell'approccio Iframe
- **Zero configurazione** - funziona immediatamente
- **Nessuna API key** necessaria
- **Quota illimitata** - nessun limite di utilizzo
- **Sempre aggiornato** con le ultime features di Google Maps
- **Sicuro** - nessuna chiave da proteggere

### 📍 Personalizza la Location (Con Marker Visibile)

#### 1. Metodo Semplice - URL Diretto
Per avere **sempre il marker/puntino visibile**, usa questo formato URL:

```html
<iframe src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=it&amp;q=LA_TUA_LATITUDINE,LA_TUA_LONGITUDINE+(Nome%20Ristorante)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
```

**Esempio pratico:**
```html
<iframe src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=it&amp;q=45.4654,9.1859+(FoodGallery%20Restaurant)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
```

#### 2. Genera Nuovo Embed URL con Marker
1. **Vai su Google Maps**: https://maps.google.com
2. **Cerca il tuo indirizzo**: "Il Tuo Ristorante, Città"
3. **Click su "Condividi"** → **"Incorpora mappa"**
4. **Assicurati** che la mappa mostri il marker rosso
5. **Copia il codice iframe** e sostituisci l'src nell'HTML

#### 3. Marker Personalizzato CSS (Sempre Visibile)
Se vuoi garantire che ci sia sempre un marker visibile, aggiungi questo CSS:

```css
.map-container::before {
    content: "📍";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    font-size: 2rem;
    z-index: 5;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    animation: markerBounce 2s infinite;
    pointer-events: none;
}

@keyframes markerBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translate(-50%, -100%);
    }
    40% {
        transform: translate(-50%, -110%);
    }
    60% {
        transform: translate(-50%, -105%);
    }
}
```

#### 3. Personalizza Informazioni
```html
<!-- Modifica nel HTML -->
<div class="map-marker-info">
    <h4>🍽️ Il Tuo Ristorante</h4>
    <p>La Tua Descrizione</p>
    <div class="rating">
        <span class="stars">★★★★★</span>
        <span class="rating-text">4.X (XXX recensioni)</span>
    </div>
</div>
```

#### 4. Aggiorna Coordinate nelle Funzioni JavaScript
Nel file `gallery-app.js`, modifica le coordinate:
```javascript
// Cerca queste funzioni e aggiorna lat/lng
window.openInGoogleMaps = function() {
    const lat = 45.4654;  // La tua latitudine
    const lng = 9.1859;   // La tua longitudine
    // ...
};
```

### 🎨 Customizzazione Avanzata

#### Personalizza Stile Iframe
```css
/* In gallery-styles.css */
.google-map-iframe {
    filter: grayscale(0.2) contrast(1.1);  /* Filtri custom */
    border-radius: 25px;                   /* Bordi più arrotondati */
}

.google-map-iframe:hover {
    filter: grayscale(0) contrast(1.2);
    transform: scale(1.02);
}
```

#### Aggiungere Marker Personalizzato nell'Overlay
```html
<!-- Overlay personalizzato -->
<div class="map-overlay">
    <div class="custom-marker">
        <i class="fas fa-map-marker-alt" style="color: #ff6b35;"></i>
    </div>
    <div class="map-marker-info">
        <!-- Info del ristorante -->
    </div>
</div>
```

### 📱 Opzioni di Embed Avanzate

#### Parametri URL Iframe Personalizzabili
```
https://www.google.com/maps/embed?pb=!1m18
&zoom=16          // Livello zoom (1-20)
&maptype=roadmap  // Tipo mappa: roadmap, satellite, hybrid, terrain
&language=it      // Lingua dell'interfaccia
&region=IT        // Regione per localizzazione
```

#### Esempio URL Completo Personalizzato
```html
<iframe src="https://www.google.com/maps/embed
    ?pb=!1m18!1m12!1m3!1d2798.0184226165985
    !2d9.183401!3d45.465422!2m3!1f0!2f0!3f0
    !3m2!1i1024!2i768!4f13.1!3m3!1m2
    !1s0x4786c6aec34b8b79%3A0x8b1e1c9b8c1e1c9b
    !2sIl%20Tuo%20Ristorante
    !5e0!3m2!1sit!2sit!4v1692000000000!5m2!1sit!2sit
    &zoom=17
    &maptype=roadmap"
    loading="lazy">
</iframe>
```

## 🔧 Troubleshooting

### Mappa Non Carica
1. **Controlla URL iframe**: Deve essere valido e accessibile
2. **Verifica connessione**: Test su dispositivi diversi
3. **Controllo browser**: Alcuni ad-blocker possono bloccare iframe

### Coordinate Errate
1. **Trova coordinate esatte**: Google Maps → Click destro → "Cosa c'è qui?"
2. **Genera nuovo embed**: Usa il tool di embed di Google Maps
3. **Test coordinates**: Verifica su maps.google.com

### Street View Non Disponibile
Se Street View non è disponibile per la tua location:
```html
<!-- Rimuovi o sostituisci la sezione Street View -->
<div class="street-view-section">
    <h3>La Nostra Location</h3>
    <div class="location-images">
        <!-- Usa foto del ristorante invece -->
        <img src="restaurant-exterior.jpg" alt="Esterno ristorante">
    </div>
</div>
```

## 🌐 Alternative Gratuite

### OpenStreetMap (Leaflet)
Se preferisci non usare Google Maps:

```html
<!-- Sostituisci Google Maps con Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
```

```javascript
// Inizializza Leaflet map
const map = L.map('google-map').setView([45.4654, 9.1859], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([45.4654, 9.1859]).addTo(map)
    .bindPopup('FoodGallery<br>Esperienza Culinaria Immersiva');
```

## 📱 Mobile Optimization

Le mappe sono già ottimizzate per mobile con:
- **Gesture handling** cooperativo
- **Touch-friendly** controls
- **Responsive** overlay info
- **Adaptive** height su schermi piccoli

## 🔐 Sicurezza & Performance

### Best Practices Implementate
- ✅ **API Key restrictions** per dominio
- ✅ **Lazy loading** della mappa
- ✅ **Error handling** robusto
- ✅ **Fallback** per connessioni lente
- ✅ **Custom styling** ottimizzato

### Monitoraggio Quota
- **Gratuito**: 28,000 map loads/mese
- **Monitoring**: Google Cloud Console → Maps APIs

## 🎯 Funzionalità Incluse

### ✨ Features Principali
- [x] Mappa interattiva con controlli personalizzati
- [x] Marker personalizzato con animazioni
- [x] Info window con informazioni dettagliate
- [x] Street View integrato
- [x] Indicazioni stradali automatiche
- [x] Design responsive per tutti i dispositivi
- [x] Stile mappa personalizzato brand-aligned
- [x] Gestione errori e fallback
- [x] Performance optimization

### 🎨 Design Elements
- [x] Card informative con hover effects
- [x] Icone gradient personalizzate
- [x] Orari di apertura strutturati
- [x] Opzioni di trasporto pubblico
- [x] Rating e recensioni display
- [x] Call-to-action buttons
- [x] Mobile-first approach

## 📞 Supporto

Per problemi specifici:
1. **Verifica console browser** per errori JavaScript
2. **Controlla Network tab** per richieste API fallite
3. **Testa su dispositivi** diversi
4. **Valida coordinate** su Google Maps

---

**Ultima modifica**: Agosto 2025  
**Compatibilità**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+  
**License**: MIT
