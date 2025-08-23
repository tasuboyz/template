// Demo data for testing the gallery without real assets
const demoImages = {
    fashion: [
        {
            name: "Elegant Evening Dress",
            url: "https://picsum.photos/400/600?random=1",
            description: "Elegant evening dress generated with AI"
        },
        {
            name: "Street Style Look",
            url: "https://picsum.photos/400/500?random=2",
            description: "Modern street style look"
        },
        {
            name: "Haute Couture Design",
            url: "https://picsum.photos/400/700?random=3",
            description: "Futuristic haute couture design"
        }
    ],
    "grim-reaper": [
        {
            name: "Dark Fantasy Warrior",
            url: "https://picsum.photos/400/600?random=4",
            description: "Dark fantasy warrior"
        },
        {
            name: "Gothic Architecture",
            url: "https://picsum.photos/400/500?random=5",
            description: "Mysterious gothic architecture"
        }
    ],
    characters: [
        {
            name: "Cyberpunk Hero",
            url: "https://picsum.photos/400/600?random=6",
            description: "Cyberpunk hero of the future"
        },
        {
            name: "Fantasy Mage",
            url: "https://picsum.photos/400/550?random=7",
            description: "Fantasy mage with magical powers"
        }
    ],
    storyline: [
        {
            name: "Epic Landscape",
            url: "https://picsum.photos/600/400?random=8",
            description: "Epic fantasy landscape"
        }
    ],
    logos: [
        {
            name: "Modern Logo Design",
            url: "https://picsum.photos/400/400?random=9",
            description: "Modern minimalist logo"
        }
    ]
};

// Function to enable demo mode
function enableDemoMode() {
    // Modifica la classe AIImageGallery per usare dati demo
    const originalLoadImages = AIImageGallery.prototype.loadImages;
    
    AIImageGallery.prototype.loadImages = async function() {
        console.log('Demo mode enabled');
        
        this.images = [];
        
        Object.keys(demoImages).forEach(category => {
            demoImages[category].forEach((item, index) => {
                const image = {
                    id: `${category}-demo-${index}`,
                    name: item.name,
                    category: category,
                    path: item.url,
                    filename: `${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                    description: item.description
                };
                this.images.push(image);
            });
        });

        this.filteredImages = [...this.images];
    console.log(`Loaded ${this.images.length} demo assets`);
    };
}

// Auto-enable demo mode if no real assets found
function checkForRealImages() {
    // Testa se le immagini reali esistono
    const testImage = new Image();
    testImage.onload = function() {
        console.log('Real assets found');
    };
    testImage.onerror = function() {
        console.log('Real assets not found, enabling demo mode');
        enableDemoMode();
    };
    testImage.src = 'images/fashion/artspace-ai-1754996352187.png';
}

// Attiva il controllo al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    checkForRealImages();
});
