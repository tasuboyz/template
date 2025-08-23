class AIImageGallery {
    constructor() {
        this.images = [];
        this.filteredImages = [];
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.currentModalIndex = 0;
        this.searchTerm = '';
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadImages();
        this.renderGallery();
        this.hideLoading();
    }

    bindEvents() {
        // Category navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryChange(e.target.dataset.category);
            });
        });

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleViewChange(e.target.dataset.view);
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Modal controls
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            this.navigateModal(-1);
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.navigateModal(1);
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadImage();
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('imageModal').classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateModal(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateModal(1);
                        break;
                }
            }
        });
    }

    async loadImages() {
        try {
            // Definisco le categorie e i tipi di file supportati
            const categories = ['fashion', 'grim-reaper', 'characters', 'storyline', 'logos', 'videos'];
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            
            for (const category of categories) {
                await this.scanCategoryFolder(category, imageExtensions);
            }

            // Ordino le immagini per nome
            this.images.sort((a, b) => a.name.localeCompare(b.name));
            this.filteredImages = [...this.images];
            
            console.log(`Loaded ${this.images.length} assets`);
        } catch (error) {
            console.error('Error loading assets:', error);
            this.showError('Error loading assets');
        }
    }

    async scanCategoryFolder(category, extensions) {
        // Simulo la scansione delle cartelle basandomi sulla struttura conosciuta
        const categoryData = this.getCategoryData(category);
        
        categoryData.forEach(filename => {
            const lower = filename.toLowerCase();
            // detect video files by extension
            const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg');
            if (isVideo || extensions.some(ext => lower.endsWith(ext))) {
                const image = {
                    id: `${category}-${filename}`,
                    name: this.formatImageName(filename),
                    category: category,
                    path: `images/${category}/${filename}`,
                    filename: filename,
                    type: isVideo ? 'video' : 'image'
                };
                this.images.push(image);
            }
        });
    }

    getCategoryData(category) {
        // Dati reali basati sulla struttura della cartella
        const categoryFiles = {
            'fashion': [
                'artspace-ai-1754996352187.png',
                'artspace-ai-1754996781883.png',
                'artspace-ai-1755002279454.png',
                'artspace-ai-1755005182621.png',
                'artspace-ai-1755006068849.png',
                'artspace-ai-1755041675911.png',
                'artspace-ai-1755043216344.png',
                'artspace-ai-1755068323241.png',
                'artspace-ai-1755069429414.png',
                'artspace-ai-1755070023248.png',
                'artspace-ai-1755072495858.png',
                'artspace-ai-1755073361845.png',
                'artspace-ai-1755076302209.png',
                'artspace-ai-1755083720134.png',
                'artspace-ai-1755087370201.png',
                'artspace-ai-1755089350628.png',
                'artspace-ai-1755159229255.png',
                'artspace-ai-1755159235096.png',
                'artspace-ai-1755160603490.png',
                'artspace-ai-1755584216032.png',
                'artspace-ai-1755584222937.png',
                'artspace-ai-1755584228563.png',
                'artspace-ai-1755669677698.png',
                'artspace-ai-1755696110957.png',
                'artspace-ai-1755700441956.png',
                'artspace-ai-1755851672313.png',
                'artspace-ai-1755853642690.png',
                'artspace-ai-1755854661802.png'
            ],
            'grim-reaper': [
                'artspace-ai-1755268613507.png',
                'artspace-ai-1755268627366.png',
                'artspace-ai-1755268928337.png',
                'artspace-ai-1755269195765.png',
                'artspace-ai-1755269204926.png',
                'artspace-ai-1755269510068.png',
                'artspace-ai-1755269911302.png',
                'artspace-ai-1755270488353.png',
                'artspace-ai-1755270889474.png',
                'artspace-ai-1755270899067.png',
                'artspace-ai-1755272417740.png',
                'artspace-ai-1755272707905.png',
                'artspace-ai-1755272716471.png',
                'artspace-ai-1755273806967.png',
                'artspace-ai-1755273845901.png',
                'artspace-ai-1755274300032.png',
                'artspace-ai-1755304709438.png',
                'artspace-ai-1755306420677.png',
                'artspace-ai-1755306833051.png',
                'artspace-ai-1755314625546.png',
                'artspace-ai-1755314947002.png',
                'artspace-ai-1755314954377.png',
                'artspace-ai-1755315408833.png'
            ],
            'characters': [
                'michelle/3cd44d5d-ea6f-4a85-93a5-08390a643da6.png',
                'michelle/5bcced6a-a8ed-465d-b36b-c01ece0aa577.png',
                'michelle/639abba0-1062-49d6-b59b-371a0974c168.png',
                'michelle/6de7a771-3d63-4200-be70-40d7fce943c3.png',
                'michelle/70a4b7fa-dea7-4198-aecc-408b665d1336.png',
                'michelle/7d6f0bc9-6652-4afb-b4c5-87f3fcc80e5c.png',
                'michelle/artspace-ai-1754986031177.png'
            ],
            'storyline': [
                'LandScape/artspace-ai-1754384601769.png',
                'LandScape/artspace-ai-1754385998726.png',
                'LandScape/artspace-ai-1754386590025.png',
                'LandScape/artspace-ai-1754386600949.png',
                'LandScape/artspace-ai-1754386880884.png',
                'LandScape/artspace-ai-1754387129163.png',
                'LandScape/artspace-ai-1754387138162.png',
                'LandScape/artspace-ai-1754387343786.png',
                'LandScape/artspace-ai-1754424142945.png',
                'LandScape/artspace-ai-1754424491539.png',
                'LandScape/artspace-ai-1754424805993.png',
                'LandScape/artspace-ai-1754425107386.png',
                'LandScape/artspace-ai-1754425329967.png',
                'LandScape/artspace-ai-1754425419162.png',
                'LandScape/artspace-ai-1754427428766.png',
                'LandScape/artspace-ai-1754428412673.png',
                'LandScape/artspace-ai-1754429064958.png',
                'LandScape/artspace-ai-1754429848306.png',
                'LandScape/artspace-ai-1754431106771.png',
                'LandScape/artspace-ai-1754431349286.png',
                'LandScape/artspace-ai-1754549741624.png',
                'LandScape/artspace-ai-1754549937554.png',
                'LandScape/artspace-ai-1754550163093.png',
                'LandScape/artspace-ai-1754550342325.png',
                'LandScape/artspace-ai-1754550461973.png',
                'LandScape/artspace-ai-1754550649457.png',
                'LandScape/artspace-ai-1755862562601.png',
                'Redpunk/artspace-ai-1755945318871.png',
                'Redpunk/artspace-ai-1755945362315.png',
                'Redpunk/artspace-ai-1755947217021.png',
                'Redpunk/artspace-ai-1755947225741.png',
                'Redpunk/artspace-ai-1755947464877.png'
            ],
            'logos': [],
            'videos': [
                '31e5b78f-f67f-467c-ab74-2a01ea7b2b75.mp4',
                '6b7f7d15-19b3-4632-a9f1-71d27327c23f.mp4',
                '79431982-7cda-4a34-a56b-cbbc4aded0a1.mp4',
                '7b6d639a-eea4-4bc1-bc1e-bed96f395ae5.mp4',
                'c2a0564a-8087-4b10-950c-0a382a2fb1df.mp4',
                'e16ba46d-1028-41b0-a44a-a18f76031575.mp4',
                'michelle running routine.mp4'
            ]
        };

        return categoryFiles[category] || [];
    }

    formatImageName(filename) {
        // Rimuovo l'estensione e formato il nome
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        
        // Se è un nome tipo "artspace-ai-timestamp", lo formato meglio
        if (nameWithoutExt.includes('artspace-ai-')) {
            const timestamp = nameWithoutExt.split('artspace-ai-')[1];
            return `AI Creation ${timestamp}`;
        }
        
        // Altrimenti rimpiazzo i trattini con spazi e capitalizzo
        return nameWithoutExt
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    handleCategoryChange(category) {
        this.currentCategory = category;
        
        // Aggiorno UI
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        this.filterImages();
        this.renderGallery();
    }

    handleViewChange(view) {
        this.currentView = view;
        
        // Aggiorno UI
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        const gallery = document.getElementById('gallery');
        gallery.className = `gallery ${view}`;
    }

    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.filterImages();
        this.renderGallery();
    }

    filterImages() {
        this.filteredImages = this.images.filter(image => {
            const matchesCategory = this.currentCategory === 'all' || image.category === this.currentCategory;
            const matchesSearch = this.searchTerm === '' || 
                                 image.name.toLowerCase().includes(this.searchTerm) ||
                                 image.category.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });
    }

    renderGallery() {
        const gallery = document.getElementById('gallery');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredImages.length === 0) {
            gallery.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        
        gallery.innerHTML = this.filteredImages.map((image, index) => {
            if (image.type === 'video') {
                return `
            <div class="gallery-item" data-index="${index}" onclick="galleryInstance.openModal(${index})">
                <div style="position:relative;">
                    <video class="thumb-video" src="${image.path}" preload="metadata" muted playsinline></video>
                    <div class="video-badge"><i class="fas fa-play"></i> Video</div>
                </div>
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${image.name}</h3>
                    <p class="gallery-item-category">${this.formatCategoryName(image.category)}</p>
                </div>
            </div>
        `;
            }

            return `
            <div class="gallery-item" data-index="${index}" onclick="galleryInstance.openModal(${index})">
                <img src="${image.path}" alt="${image.name}" loading="lazy" 
                     onerror="this.style.display='none'; this.parentElement.style.display='none';">
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${image.name}</h3>
                    <p class="gallery-item-category">${this.formatCategoryName(image.category)}</p>
                </div>
            </div>
        `;
        }).join('');

        // Attiva play/pause sulle miniature dei video per anteprima
        requestAnimationFrame(() => {
            document.querySelectorAll('.thumb-video').forEach(v => {
                // play muted on hover (desktop)
                v.addEventListener('mouseenter', () => {
                    v.play().catch(() => {});
                });
                v.addEventListener('mouseleave', () => {
                    v.pause();
                    try { v.currentTime = 0; } catch (e) {}
                });
            });
        });
    }

    formatCategoryName(category) {
        const categoryNames = {
            'fashion': 'Fashion',
            'grim-reaper': 'Grim Reaper',
            'characters': 'Personaggi',
            'storyline': 'Storyline',
            'logos': 'Loghi',
            'videos': 'Video'
        };
        
        return categoryNames[category] || category;
    }

    openModal(index) {
        this.currentModalIndex = index;
        const image = this.filteredImages[index];
        
        if (!image) return;

        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');

        document.getElementById('modalTitle').textContent = image.name;
        document.getElementById('modalCategory').textContent = this.formatCategoryName(image.category);

        if (image.type === 'video') {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = image.path;
            modalVideo.play().catch(() => {});
        } else {
            modalVideo.pause();
            modalVideo.src = '';
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = image.path;
        }
        
        // Aggiorno i pulsanti di navigazione
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === this.filteredImages.length - 1;
        
        document.getElementById('imageModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
    modalVideo.src = '';
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    }

    navigateModal(direction) {
        const newIndex = this.currentModalIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.filteredImages.length) {
            this.openModal(newIndex);
        }
    }

    downloadImage() {
        const image = this.filteredImages[this.currentModalIndex];
        if (!image) return;

    // For video, force link download; for image, same behavior
    const link = document.createElement('a');
    link.href = image.path;
    link.download = image.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }

    async shareImage() {
        const image = this.filteredImages[this.currentModalIndex];
        if (!image) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: image.name,
                    text: `Check out this AI creation: ${image.name}`,
                    url: window.location.href
                });
            } catch (error) {
                    console.log('Share cancelled');
            }
        } else {
            // Fallback: copia URL negli appunti
            try {
                await navigator.clipboard.writeText(window.location.href);
                    this.showNotification('URL copied to clipboard!');
            } catch (error) {
                    console.error('Unable to copy URL');
            }
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `
            <div class="error-message" style="
                text-align: center;
                padding: 3rem;
                color: white;
                grid-column: 1 / -1;
            ">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>${message}</h3>
                        <p>Check that assets are placed in the correct folder</p>
            </div>
        `;
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
}

// Stili per le animazioni delle notifiche
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Inizializzazione
let galleryInstance;

document.addEventListener('DOMContentLoaded', () => {
    galleryInstance = new AIImageGallery();
});

// Gestione errori globali
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// Service Worker registration per PWA (opzionale)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}
