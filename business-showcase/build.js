/**
 * Build Script for BusinessPro Showcase
 * Ottimizza e prepara l'applicazione per la produzione
 */

const fs = require('fs').promises;
const path = require('path');
const { minify } = require('terser');
const { minify: htmlMinify } = require('html-minifier');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

class BuildOptimizer {
    constructor() {
        this.srcDir = './';
        this.distDir = './dist';
        this.tempDir = './temp';
        
        this.stats = {
            startTime: Date.now(),
            originalSize: 0,
            optimizedSize: 0,
            compressionRatio: 0,
            files: {
                html: 0,
                css: 0,
                js: 0,
                images: 0,
                other: 0
            }
        };
        
        this.config = {
            minifyHTML: true,
            minifyCSS: true,
            minifyJS: true,
            optimizeImages: true,
            generateSourceMaps: true,
            bundleModules: true,
            compressAssets: true
        };
    }
    
    async build() {
        try {
            console.log('🚀 Starting build process...');
            
            // Cleanup and setup
            await this.cleanup();
            await this.setupDirectories();
            
            // Process files
            await this.processHTML();
            await this.processCSS();
            await this.processJavaScript();
            await this.processAssets();
            await this.generateServiceWorker();
            await this.generateManifest();
            
            // Create bundles
            await this.createBundles();
            
            // Generate reports
            await this.generateBuildReport();
            
            // Calculate stats
            this.calculateStats();
            
            console.log('✅ Build completed successfully!');
            this.printStats();
            
        } catch (error) {
            console.error('❌ Build failed:', error);
            process.exit(1);
        }
    }
    
    async cleanup() {
        try {
            await fs.rmdir(this.distDir, { recursive: true });
            await fs.rmdir(this.tempDir, { recursive: true });
        } catch (error) {
            // Directories might not exist
        }
    }
    
    async setupDirectories() {
        const dirs = [
            this.distDir,
            path.join(this.distDir, 'css'),
            path.join(this.distDir, 'js'),
            path.join(this.distDir, 'js', 'components'),
            path.join(this.distDir, 'images'),
            path.join(this.distDir, 'reports'),
            this.tempDir
        ];
        
        for (const dir of dirs) {
            await fs.mkdir(dir, { recursive: true });
        }
    }
    
    async processHTML() {
        console.log('📄 Processing HTML files...');
        
        const htmlContent = await fs.readFile('index.html', 'utf-8');
        
        let optimizedHTML = htmlContent;
        
        if (this.config.minifyHTML) {
            optimizedHTML = htmlMinify(htmlContent, {
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeOptionalTags: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                minifyCSS: true,
                minifyJS: true
            });
        }
        
        // Update asset paths for production
        optimizedHTML = this.updateAssetPaths(optimizedHTML);
        
        await fs.writeFile(path.join(this.distDir, 'index.html'), optimizedHTML);
        
        this.stats.files.html++;
        console.log('✅ HTML processed');
    }
    
    updateAssetPaths(html) {
        // Update CSS paths
        html = html.replace(/href="css\//g, 'href="css/');
        
        // Update JS paths
        html = html.replace(/src="js\//g, 'src="js/');
        
        // Update image paths
        html = html.replace(/src="images\//g, 'src="images/');
        
        // Add cache busting
        const timestamp = Date.now();
        html = html.replace(/\.css"/g, `.css?v=${timestamp}"`);
        html = html.replace(/\.js"/g, `.js?v=${timestamp}"`);
        
        return html;
    }
    
    async processCSS() {
        console.log('🎨 Processing CSS files...');
        
        const cssFiles = [
            'css/main.css',
            'css/themes.css',
            'css/animations.css'
        ];
        
        for (const file of cssFiles) {
            try {
                const content = await fs.readFile(file, 'utf-8');
                let optimizedCSS = content;
                
                if (this.config.minifyCSS) {
                    const result = await postcss([
                        autoprefixer(),
                        cssnano({
                            preset: 'default'
                        })
                    ]).process(content, { from: file });
                    
                    optimizedCSS = result.css;
                }
                
                const outputPath = path.join(this.distDir, file);
                await fs.writeFile(outputPath, optimizedCSS);
                
                this.stats.files.css++;
                
            } catch (error) {
                console.warn(`⚠️ Could not process ${file}:`, error.message);
            }
        }
        
        console.log('✅ CSS processed');
    }
    
    async processJavaScript() {
        console.log('📦 Processing JavaScript files...');
        
        const jsFiles = [
            'js/utils.js',
            'js/themeManager.js',
            'js/animations.js',
            'js/components/header.js',
            'js/components/hero.js',
            'js/components/services.js',
            'js/components/footer.js',
            'js/app.js'
        ];
        
        for (const file of jsFiles) {
            try {
                const content = await fs.readFile(file, 'utf-8');
                let optimizedJS = content;
                
                if (this.config.minifyJS) {
                    const result = await minify(content, {
                        compress: {
                            dead_code: true,
                            drop_console: true,
                            drop_debugger: true,
                            keep_fargs: false,
                            unsafe_comps: true,
                            unsafe_math: true
                        },
                        mangle: {
                            toplevel: true
                        },
                        output: {
                            comments: false
                        },
                        sourceMap: this.config.generateSourceMaps ? {
                            filename: path.basename(file),
                            url: path.basename(file) + '.map'
                        } : false
                    });
                    
                    optimizedJS = result.code;
                    
                    if (result.map && this.config.generateSourceMaps) {
                        await fs.writeFile(
                            path.join(this.distDir, file + '.map'),
                            result.map
                        );
                    }
                }
                
                const outputPath = path.join(this.distDir, file);
                await fs.mkdir(path.dirname(outputPath), { recursive: true });
                await fs.writeFile(outputPath, optimizedJS);
                
                this.stats.files.js++;
                
            } catch (error) {
                console.warn(`⚠️ Could not process ${file}:`, error.message);
            }
        }
        
        console.log('✅ JavaScript processed');
    }
    
    async processAssets() {
        console.log('🖼️ Processing assets...');
        
        // Copy manifest
        try {
            const manifest = await fs.readFile('manifest.json', 'utf-8');
            await fs.writeFile(path.join(this.distDir, 'manifest.json'), manifest);
        } catch (error) {
            console.warn('⚠️ Could not copy manifest.json');
        }
        
        // Copy service worker
        try {
            const sw = await fs.readFile('sw.js', 'utf-8');
            await fs.writeFile(path.join(this.distDir, 'sw.js'), sw);
        } catch (error) {
            console.warn('⚠️ Could not copy sw.js');
        }
        
        // Create placeholder images directory
        await fs.mkdir(path.join(this.distDir, 'images'), { recursive: true });
        
        // Create placeholder images info
        const imagesInfo = {
            note: 'This project uses placeholder images. In production, replace with actual optimized images.',
            requirements: {
                'hero-bg.jpg': '1920x1080px - Hero background image',
                'about-image.jpg': '600x400px - About section image',
                'icon-192.png': '192x192px - PWA icon',
                'icon-512.png': '512x512px - PWA icon',
                'screenshot-mobile.png': '375x812px - Mobile screenshot for app stores',
                'screenshot-desktop.png': '1920x1080px - Desktop screenshot for app stores'
            },
            optimization: {
                format: 'Use WebP for better compression with JPEG/PNG fallbacks',
                compression: 'Optimize images to 85% quality for best balance',
                responsive: 'Provide multiple sizes for responsive images',
                lazy: 'All images should be lazy-loaded for performance'
            }
        };
        
        await fs.writeFile(
            path.join(this.distDir, 'images', 'README.json'),
            JSON.stringify(imagesInfo, null, 2)
        );
        
        console.log('✅ Assets processed');
    }
    
    async generateServiceWorker() {
        console.log('⚡ Updating Service Worker...');
        
        try {
            let swContent = await fs.readFile('sw.js', 'utf-8');
            
            // Update cache version with timestamp
            const cacheVersion = `businesspro-v1.0.0-${Date.now()}`;
            swContent = swContent.replace(
                /const CACHE_NAME = '[^']+'/,
                `const CACHE_NAME = '${cacheVersion}'`
            );
            
            // Add build timestamp
            swContent = `// Build: ${new Date().toISOString()}\n${swContent}`;
            
            await fs.writeFile(path.join(this.distDir, 'sw.js'), swContent);
            
        } catch (error) {
            console.warn('⚠️ Could not update service worker:', error.message);
        }
    }
    
    async generateManifest() {
        console.log('📱 Processing PWA Manifest...');
        
        try {
            const manifestContent = await fs.readFile('manifest.json', 'utf-8');
            const manifest = JSON.parse(manifestContent);
            
            // Update version
            manifest.version = `1.0.0-${Date.now()}`;
            
            // Ensure all paths are correct
            manifest.start_url = '/';
            manifest.scope = '/';
            
            await fs.writeFile(
                path.join(this.distDir, 'manifest.json'),
                JSON.stringify(manifest, null, 2)
            );
            
        } catch (error) {
            console.warn('⚠️ Could not process manifest:', error.message);
        }
    }
    
    async createBundles() {
        if (!this.config.bundleModules) return;
        
        console.log('📦 Creating bundles...');
        
        // Create CSS bundle
        try {
            const cssFiles = ['main.css', 'themes.css', 'animations.css'];
            let bundledCSS = '';
            
            for (const file of cssFiles) {
                const content = await fs.readFile(path.join(this.distDir, 'css', file), 'utf-8');
                bundledCSS += `/* ${file} */\n${content}\n\n`;
            }
            
            await fs.writeFile(path.join(this.distDir, 'css', 'bundle.css'), bundledCSS);
            
        } catch (error) {
            console.warn('⚠️ Could not create CSS bundle:', error.message);
        }
        
        // Create JS bundle (basic concatenation - for production use proper bundler)
        try {
            const jsFiles = [
                'utils.js',
                'themeManager.js',
                'animations.js',
                'components/header.js',
                'components/hero.js',
                'components/services.js',
                'components/footer.js',
                'app.js'
            ];
            
            let bundledJS = '';
            
            for (const file of jsFiles) {
                const content = await fs.readFile(path.join(this.distDir, 'js', file), 'utf-8');
                bundledJS += `/* ${file} */\n${content}\n\n`;
            }
            
            await fs.writeFile(path.join(this.distDir, 'js', 'bundle.js'), bundledJS);
            
        } catch (error) {
            console.warn('⚠️ Could not create JS bundle:', error.message);
        }
    }
    
    async generateBuildReport() {
        console.log('📊 Generating build report...');
        
        const report = {
            buildTime: new Date().toISOString(),
            version: '1.0.0',
            stats: this.stats,
            config: this.config,
            files: await this.getFileList(),
            performance: {
                buildDuration: Date.now() - this.stats.startTime,
                compressionRatio: this.stats.compressionRatio,
                totalFiles: Object.values(this.stats.files).reduce((a, b) => a + b, 0)
            },
            recommendations: this.getOptimizationRecommendations()
        };
        
        await fs.writeFile(
            path.join(this.distDir, 'reports', 'build-report.json'),
            JSON.stringify(report, null, 2)
        );
        
        // Generate HTML report
        const htmlReport = this.generateHTMLReport(report);
        await fs.writeFile(
            path.join(this.distDir, 'reports', 'build-report.html'),
            htmlReport
        );
    }
    
    async getFileList() {
        const files = [];
        
        const scanDir = async (dir, basePath = '') => {
            const items = await fs.readdir(path.join(this.distDir, basePath));
            
            for (const item of items) {
                const itemPath = path.join(basePath, item);
                const fullPath = path.join(this.distDir, itemPath);
                const stat = await fs.stat(fullPath);
                
                if (stat.isDirectory()) {
                    await scanDir(fullPath, itemPath);
                } else {
                    files.push({
                        path: itemPath,
                        size: stat.size,
                        type: path.extname(item).slice(1) || 'unknown'
                    });
                }
            }
        };
        
        await scanDir(this.distDir);
        return files;
    }
    
    getOptimizationRecommendations() {
        const recommendations = [];
        
        if (this.stats.compressionRatio < 0.3) {
            recommendations.push('Consider enabling gzip compression on your server');
        }
        
        if (this.stats.files.js > 10) {
            recommendations.push('Consider bundling JavaScript files to reduce HTTP requests');
        }
        
        if (this.stats.files.css > 5) {
            recommendations.push('Consider bundling CSS files to reduce HTTP requests');
        }
        
        recommendations.push('Implement HTTP/2 server push for critical resources');
        recommendations.push('Use a CDN for static assets');
        recommendations.push('Implement lazy loading for non-critical resources');
        
        return recommendations;
    }
    
    generateHTMLReport(report) {
        return `
            <!DOCTYPE html>
            <html lang="it">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Build Report - BusinessPro Showcase</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 2rem; background: #f8fafc; }
                    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem; }
                    h2 { color: #334155; margin-top: 2rem; }
                    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; }
                    .stat { background: #f1f5f9; padding: 1rem; border-radius: 6px; text-align: center; }
                    .stat-value { font-size: 2rem; font-weight: bold; color: #3b82f6; }
                    .stat-label { color: #64748b; font-size: 0.9rem; }
                    .files-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
                    .file-type { background: #e2e8f0; padding: 1rem; border-radius: 6px; text-align: center; }
                    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 6px; overflow-x: auto; }
                    .recommendation { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin: 0.5rem 0; }
                    .success { color: #059669; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 Build Report</h1>
                    <p class="success">Build completed successfully at ${report.buildTime}</p>
                    
                    <h2>📊 Statistics</h2>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">${report.performance.buildDuration}ms</div>
                            <div class="stat-label">Build Duration</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${report.performance.totalFiles}</div>
                            <div class="stat-label">Total Files</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${Math.round(report.stats.compressionRatio * 100)}%</div>
                            <div class="stat-label">Compression Ratio</div>
                        </div>
                    </div>
                    
                    <h2>📁 File Types</h2>
                    <div class="files-grid">
                        ${Object.entries(report.stats.files).map(([type, count]) => `
                            <div class="file-type">
                                <div class="stat-value">${count}</div>
                                <div class="stat-label">${type.toUpperCase()} files</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <h2>💡 Recommendations</h2>
                    ${report.recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
                    
                    <h2>⚙️ Configuration</h2>
                    <pre>${JSON.stringify(report.config, null, 2)}</pre>
                </div>
            </body>
            </html>
        `;
    }
    
    calculateStats() {
        // Calculate compression ratio and other stats
        if (this.stats.originalSize > 0) {
            this.stats.compressionRatio = 1 - (this.stats.optimizedSize / this.stats.originalSize);
        }
    }
    
    printStats() {
        console.log('\n📊 Build Statistics:');
        console.log(`⏱️  Build time: ${Date.now() - this.stats.startTime}ms`);
        console.log(`📁 Total files processed: ${Object.values(this.stats.files).reduce((a, b) => a + b, 0)}`);
        console.log(`📄 HTML files: ${this.stats.files.html}`);
        console.log(`🎨 CSS files: ${this.stats.files.css}`);
        console.log(`📦 JS files: ${this.stats.files.js}`);
        console.log(`📊 Build report generated in: dist/reports/`);
        console.log('\n✅ Ready for deployment!\n');
    }
}

// Run build if called directly
if (require.main === module) {
    const optimizer = new BuildOptimizer();
    optimizer.build();
}

module.exports = BuildOptimizer;
