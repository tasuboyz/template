// Build script per ottimizzazione del template
const fs = require('fs');
const path = require('path');

class EcommerceBuild {
    constructor() {
        this.sourceDir = './';
        this.buildDir = './dist';
        this.version = '1.0.0';
    }

    async build() {
        console.log('🚀 Iniziando build del template Elite Store...');
        
        try {
            // Crea directory di build
            this.createBuildDirectory();
            
            // Copia file principali
            this.copyMainFiles();
            
            // Ottimizza CSS
            this.optimizeCSS();
            
            // Ottimizza JavaScript
            this.optimizeJS();
            
            // Genera manifest
            this.generateManifest();
            
            // Genera Service Worker
            this.generateServiceWorker();
            
            console.log('✅ Build completata con successo!');
            console.log(`📁 File di output in: ${this.buildDir}`);
            
        } catch (error) {
            console.error('❌ Errore durante il build:', error);
            process.exit(1);
        }
    }

    createBuildDirectory() {
        if (fs.existsSync(this.buildDir)) {
            fs.rmSync(this.buildDir, { recursive: true, force: true });
        }
        fs.mkdirSync(this.buildDir, { recursive: true });
        fs.mkdirSync(path.join(this.buildDir, 'css'), { recursive: true });
        fs.mkdirSync(path.join(this.buildDir, 'js'), { recursive: true });
        fs.mkdirSync(path.join(this.buildDir, 'images'), { recursive: true });
        
        console.log('📁 Directory di build creata');
    }

    copyMainFiles() {
        // Copia HTML
        const htmlContent = fs.readFileSync('./index.html', 'utf8');
        const optimizedHTML = this.minifyHTML(htmlContent);
        fs.writeFileSync(path.join(this.buildDir, 'index.html'), optimizedHTML);
        
        // Copia README e package.json
        fs.copyFileSync('./README.md', path.join(this.buildDir, 'README.md'));
        fs.copyFileSync('./package.json', path.join(this.buildDir, 'package.json'));
        
        console.log('📄 File principali copiati');
    }

    optimizeCSS() {
        // Combina e minifica CSS
        const mainCSS = fs.readFileSync('./css/main.css', 'utf8');
        const animationsCSS = fs.readFileSync('./css/animations.css', 'utf8');
        
        const combinedCSS = `/* Elite Store - Combined CSS v${this.version} */\n${mainCSS}\n\n${animationsCSS}`;
        const minifiedCSS = this.minifyCSS(combinedCSS);
        
        fs.writeFileSync(path.join(this.buildDir, 'css', 'style.min.css'), minifiedCSS);
        console.log('🎨 CSS ottimizzato e minificato');
    }

    optimizeJS() {
        // Minifica JavaScript
        const jsContent = fs.readFileSync('./js/app.js', 'utf8');
        const minifiedJS = this.minifyJS(jsContent);
        
        fs.writeFileSync(path.join(this.buildDir, 'js', 'app.min.js'), minifiedJS);
        console.log('⚡ JavaScript ottimizzato');
    }

    generateManifest() {
        const manifest = {
            name: "Elite Store",
            short_name: "EliteStore",
            description: "Template E-commerce moderno con effetti WOW",
            start_url: "/",
            display: "standalone",
            theme_color: "#6366f1",
            background_color: "#ffffff",
            icons: [
                {
                    src: "images/icon-192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "images/icon-512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        };

        fs.writeFileSync(
            path.join(this.buildDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        );
        console.log('📱 Manifest PWA generato');
    }

    generateServiceWorker() {
        const swContent = `
// Elite Store Service Worker v${this.version}
const CACHE_NAME = 'elite-store-v${this.version}';
const urlsToCache = [
    '/',
    '/css/style.min.css',
    '/js/app.min.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
`;

        fs.writeFileSync(path.join(this.buildDir, 'sw.js'), swContent);
        console.log('🔧 Service Worker generato');
    }

    minifyHTML(html) {
        return html
            .replace(/\s+/g, ' ')
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/>\s+</g, '><')
            .trim();
    }

    minifyCSS(css) {
        return css
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, '}')
            .replace(/,\s+/g, ',')
            .replace(/:\s+/g, ':')
            .replace(/{\s+/g, '{')
            .replace(/}\s+/g, '}')
            .trim();
    }

    minifyJS(js) {
        // Rimozione commenti e spazi superflui (minificazione basic)
        return js
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, ';}')
            .replace(/,\s+/g, ',')
            .replace(/:\s+/g, ':')
            .replace(/{\s+/g, '{')
            .replace(/}\s+/g, '}')
            .trim();
    }
}

// Esegui build se chiamato direttamente
if (require.main === module) {
    const builder = new EcommerceBuild();
    builder.build();
}

module.exports = EcommerceBuild;
