# AI Image Gallery 🎨

Una galleria moderna e responsive per mostrare immagini generate con intelligenza artificiale. Questo progetto è sviluppato interamente con JavaScript ES6 vanilla, senza framework esterni o backend.

## ✨ Caratteristiche

- **🖼️ Galleria Responsiva**: Layout adattivo che funziona su tutti i dispositivi
- **🔍 Ricerca Intelligente**: Cerca immagini per nome o categoria
- **📁 Filtri per Categoria**: Organizza le immagini per tipologia (Fashion, Grim Reaper, Personaggi, ecc.)
- **👁️ Visualizzazione Modale**: Modalità fullscreen per vedere le immagini in dettaglio
- **⬇️ Download Diretto**: Scarica le immagini con un click
- **📱 Condivisione**: Condividi le immagini sui social o copia il link
- **🚀 Performance Ottimizzate**: Lazy loading e cache intelligente
- **🎯 PWA Ready**: Service Worker per performance migliorate

## 🗂️ Struttura del Progetto

```
ai-image-gallery/
├── index.html          # Pagina principale
├── styles.css          # Stili CSS moderni
├── gallery.js          # Logica JavaScript ES6
├── sw.js              # Service Worker (opzionale)
├── README.md          # Documentazione
└── images/            # Cartella delle immagini
    ├── fashion/       # Immagini di moda
    ├── grim-reaper/   # Immagini dark/horror
    ```markdown
    # AI Image Gallery 🎨

    A modern responsive gallery to showcase AI-generated images. This project is built entirely with vanilla ES6 JavaScript, no backend or frameworks required.

    ## ✨ Features

    - **🖼️ Responsive Gallery**: Adaptive layout that works on all devices
    - **🔍 Smart Search**: Search images by name or category
    - **📁 Category Filters**: Organize assets by types (Fashion, Grim Reaper, Characters, etc.)
    - **👁️ Modal Viewer**: Fullscreen viewer for detailed inspection
    - **⬇️ Direct Download**: Download images or videos with one click
    - **📱 Share**: Share assets via native share or copy link
    - **🚀 Performance Optimized**: Lazy loading and intelligent caching
    - **🎯 PWA Ready**: Optional Service Worker for improved performance

    ## 🗂️ Project Structure

    ```
    ai-image-gallery/
    ├── index.html          # Main page
    ├── styles.css          # Modern CSS styles
    ├── gallery.js          # ES6 JavaScript logic
    ├── sw.js               # Service Worker (optional)
    ├── README.md           # Documentation
    └── images/             # Assets folder
        ├── fashion/        # Fashion images
        ├── grim-reaper/    # Dark/horror images
        ├── characters/     # Character portraits
        ├── storyline/      # Narrative landscapes
        └── logos/          # Logos and designs
    ```

    ## 🚀 How to Use

    ### Quick Start

    1. Clone or download the project
    2. Open `index.html` in a modern browser
    3. Add your assets into the appropriate folders under `images/`

    ### Add New Assets

    1. Place assets in the appropriate category folder:
       - `images/fashion/` - fashion images
       - `images/grim-reaper/` - dark/horror images
       - `images/characters/` - character portraits
       - `images/storyline/` - narrative images and landscapes
       - `images/logos/` - logos and branding
       - `images/videos/` - video files (mp4)

    2. Refresh the page to see newly added assets

    ### Supported Formats

    - PNG
    - JPG/JPEG
    - GIF
    - WebP
    - MP4 (videos)

    ## 🛠️ Customization

    ### Add New Categories

    1. Add the category button in `index.html`:
    ```html
    <button class="nav-btn" data-category="new-category">
        <i class="fas fa-icon"></i>
        Category Name
    </button>
    ```

    2. Update `gallery.js` data mapping in `getCategoryData()` to include filenames for the new category.

    3. Create the folder `images/new-category/` and add assets.

    ### Change Colors

    Edit `styles.css` to change theme colors, or update the `theme` object in `config.js` for centralized theme values.

    ### Layout

    - **Grid**: tweak `grid-template-columns` in `.gallery`
    - **Masonry**: tweak `columns` in `.gallery.masonry`
    - **Breakpoints**: adjust media queries in `styles.css`

    ## 🎨 Design Highlights

    - Gradient background and glassmorphism
    - Smooth animations and micro-interactions
    - Ready for dark mode

    ## 📱 Browser Support

    - Chrome 80+
    - Firefox 75+
    - Safari 13+
    - Edge 80+
    - Mobile browsers

    ## 🚀 Performance

    - Lazy loading for assets
    - Optional Service Worker for caching
    - Minimal dependencies (vanilla JS + CSS)

    ## 🔧 Development

    ### Local Development

    Run a local server to avoid CORS issues:
    ```bash
    # Python
    python -m http.server 8000

    # Node.js
    npx serve .

    # VS Code Live Server
    # Install the Live Server extension
    ```

    Open `http://localhost:8000`

    ### Production Tips

    1. Minify CSS/JS
    2. Optimize images (ImageOptim, Squoosh)
    3. Use a CDN for static assets

    ## 📊 Analytics (optional)

    Add Google Analytics snippet to `index.html` if you want usage tracking.

    ## 🤝 Contributing

    1. Fork the repo
    2. Create a branch (`git checkout -b feature/AmazingFeature`)
    3. Commit changes (`git commit -m 'Add AmazingFeature'`)
    4. Push the branch (`git push origin feature/AmazingFeature`)
    5. Open a Pull Request

    ## 📝 License

    Open source under the MIT License.

    ---

    If this project helped you, please give it a star ⭐
    ```