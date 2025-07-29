# Immagini Template

Questa directory contiene le immagini utilizzate nel template Elite Store.

## Struttura Consigliata

```
images/
├── products/           # Immagini prodotti
│   ├── electronics/   # Categoria elettronica
│   ├── fashion/       # Categoria moda
│   ├── home/          # Categoria casa
│   └── sports/        # Categoria sport
├── icons/             # Icone e loghi
│   ├── icon-192.png   # Icona PWA 192x192
│   ├── icon-512.png   # Icona PWA 512x512
│   └── logo.svg       # Logo principale
├── hero/              # Immagini hero section
└── backgrounds/       # Sfondi e pattern
```

## Formati Consigliati

- **Prodotti**: WebP, JPG (800x800px ottimale)
- **Icone**: SVG, PNG (trasparente)
- **Hero**: WebP, JPG (1920x1080px)
- **Backgrounds**: WebP, JPG

## Ottimizzazione

Per prestazioni ottimali:
- Usa WebP quando possibile
- Comprimi le immagini (TinyPNG, ImageOptim)
- Usa lazy loading per immagini sotto la fold
- Implementa responsive images con srcset

## Note

Il template attualmente usa placeholder CSS per le immagini.
Per sostituirli con immagini reali, modifica le classi CSS corrispondenti
o aggiorna il JavaScript per utilizzare URL di immagini reali.
