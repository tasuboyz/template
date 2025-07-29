// Build script per Real Estate Showcase Template
const fs = require('fs');
const path = require('path');

class BuildManager {
    constructor() {
        this.buildInfo = {
            version: '1.0.0',
            buildDate: new Date().toISOString(),
            features: [
                'Sistema di ricerca avanzata',
                'Tour virtuali 360°',
                'Calcolatore mutui interattivo',
                'Mappe interattive',
                'Animazioni WOW.js-like',
                'Design responsive'
            ]
        };
    }

    async build() {
        console.log('🏗️  Avvio build Real Estate Showcase...\n');
        
        try {
            await this.validateFiles();
            await this.optimizeAssets();
            await this.generateBuildInfo();
            await this.createProductionVersion();
            
            console.log('✅ Build completata con successo!');
            console.log(`📦 Versione: ${this.buildInfo.version}`);
            console.log(`📅 Data: ${new Date(this.buildInfo.buildDate).toLocaleString('it-IT')}`);
            
        } catch (error) {
            console.error('❌ Errore durante il build:', error.message);
            process.exit(1);
        }
    }

    async validateFiles() {
        console.log('🔍 Validazione file...');
        
        const requiredFiles = [
            'index.html',
            'css/main.css',
            'css/animations.css',
            'js/app.js',
            'package.json',
            'README.md'
        ];

        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`File mancante: ${file}`);
            }
        }

        console.log('   ✅ Tutti i file richiesti sono presenti');
    }

    async optimizeAssets() {
        console.log('🎨 Ottimizzazione assets...');
        
        // Leggi e ottimizza CSS
        const mainCSS = fs.readFileSync('css/main.css', 'utf8');
        const animationsCSS = fs.readFileSync('css/animations.css', 'utf8');
        
        // Crea versione combinata per produzione
        const combinedCSS = this.combineCSS(mainCSS, animationsCSS);
        
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }
        
        fs.writeFileSync('dist/styles.min.css', combinedCSS);
        console.log('   ✅ CSS ottimizzato e combinato');
        
        // Copia JS
        const appJS = fs.readFileSync('js/app.js', 'utf8');
        fs.writeFileSync('dist/app.min.js', appJS);
        console.log('   ✅ JavaScript copiato');
    }

    combineCSS(mainCSS, animationsCSS) {
        const header = `/* Real Estate Showcase - Production Build v${this.buildInfo.version} */\n`;
        return header + mainCSS + '\n\n' + animationsCSS;
    }

    async generateBuildInfo() {
        console.log('📊 Generazione info build...');
        
        const buildInfo = {
            ...this.buildInfo,
            stats: await this.getProjectStats()
        };

        fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
        console.log('   ✅ Info build generate');
    }

    async getProjectStats() {
        const htmlContent = fs.readFileSync('index.html', 'utf8');
        const cssContent = fs.readFileSync('css/main.css', 'utf8') + 
                          fs.readFileSync('css/animations.css', 'utf8');
        const jsContent = fs.readFileSync('js/app.js', 'utf8');

        return {
            htmlLines: htmlContent.split('\n').length,
            cssLines: cssContent.split('\n').length,
            jsLines: jsContent.split('\n').length,
            totalSize: {
                html: this.formatBytes(Buffer.byteLength(htmlContent, 'utf8')),
                css: this.formatBytes(Buffer.byteLength(cssContent, 'utf8')),
                js: this.formatBytes(Buffer.byteLength(jsContent, 'utf8'))
            }
        };
    }

    async createProductionVersion() {
        console.log('🚀 Creazione versione produzione...');
        
        let htmlContent = fs.readFileSync('index.html', 'utf8');
        
        // Sostituisci i link CSS con la versione ottimizzata
        htmlContent = htmlContent.replace(
            /<link rel="stylesheet" href="css\/main\.css">/,
            '<link rel="stylesheet" href="dist/styles.min.css">'
        );
        htmlContent = htmlContent.replace(
            /<link rel="stylesheet" href="css\/animations\.css">/,
            ''
        );
        
        // Sostituisci il link JS
        htmlContent = htmlContent.replace(
            /<script src="js\/app\.js"><\/script>/,
            '<script src="dist/app.min.js"></script>'
        );

        fs.writeFileSync('dist/index.html', htmlContent);
        console.log('   ✅ Versione produzione creata');
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Metodo per sviluppo locale
    async dev() {
        console.log('🔧 Modalità sviluppo...');
        console.log('📁 File pronti per lo sviluppo:');
        console.log('   - index.html (pagina principale)');
        console.log('   - css/main.css (stili base)');
        console.log('   - css/animations.css (animazioni)');
        console.log('   - js/app.js (JavaScript ES6)');
        console.log('\n💡 Suggerimenti:');
        console.log('   - Usa live-server per hot reload');
        console.log('   - Modifica le proprietà in js/app.js');
        console.log('   - Personalizza colori in css/main.css');
        console.log('\n🚀 Per avviare: npm start');
    }

    // Metodo di cleanup
    async clean() {
        console.log('🧹 Pulizia file build...');
        
        if (fs.existsSync('dist')) {
            fs.rmSync('dist', { recursive: true, force: true });
            console.log('   ✅ Cartella dist rimossa');
        }
        
        console.log('✨ Pulizia completata');
    }
}

// Gestione argomenti command line
const args = process.argv.slice(2);
const command = args[0] || 'build';

const buildManager = new BuildManager();

switch (command) {
    case 'build':
        buildManager.build();
        break;
    case 'dev':
        buildManager.dev();
        break;
    case 'clean':
        buildManager.clean();
        break;
    default:
        console.log('❓ Comandi disponibili:');
        console.log('   node build.js build  - Crea build di produzione');
        console.log('   node build.js dev    - Info modalità sviluppo');
        console.log('   node build.js clean  - Pulisce file build');
}

module.exports = BuildManager;
