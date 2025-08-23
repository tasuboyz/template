// Configurable settings for AI Image Gallery (English)
const GalleryConfig = {
    // General information
    title: "AI Image Gallery",
    subtitle: "AI Creations Gallery",
    description: "Explore a collection of images generated with artificial intelligence. Each creation showcases modern AI creativity and innovation.",

    // Available categories
    categories: [
        { id: 'all', name: 'All', icon: 'fas fa-th', description: 'Show all assets' },
        { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt', description: 'Fashion and style images' },
        { id: 'grim-reaper', name: 'Grim Reaper', icon: 'fas fa-skull', description: 'Dark and horror imagery' },
        { id: 'characters', name: 'Characters', icon: 'fas fa-users', description: 'Portraits and characters' },
        { id: 'storyline', name: 'Storyline', icon: 'fas fa-book', description: 'Narrative and landscape images' },
        { id: 'logos', name: 'Logos', icon: 'fas fa-palette', description: 'Logos and branding' },
        { id: 'videos', name: 'Videos', icon: 'fas fa-video', description: 'Video assets' }
    ],

    // Display settings
    display: {
        defaultView: 'grid', // 'grid' or 'masonry'
        imagesPerPage: 50,
        lazyLoading: true,
        showImageInfo: true,
        enableSearch: true,
        enableDownload: true,
        enableShare: true
    },

    // Theme
    theme: {
        primary: '#667eea',
        primaryHover: '#5a6fd8',
        secondary: '#764ba2',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBackground: '#ffffff',
        textPrimary: '#333333',
        textSecondary: '#666666'
    },

    // Supported formats
    supportedFormats: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.mp4'],

    // Performance
    performance: {
        enableServiceWorker: true,
        cacheImages: true,
        prefetchNextImages: true,
        imageQuality: 'auto' // 'low', 'medium', 'high', 'auto'
    },

    // Texts (English)
    texts: {
        loading: 'Loading gallery...',
        noResults: 'No results found',
        searchPlaceholder: 'Search images...',
        downloadBtn: 'Download',
        shareBtn: 'Share',
        errorMessage: 'Error loading assets',
        modalPrevious: 'Previous',
        modalNext: 'Next',
        modalClose: 'Close'
    },

    // SEO metadata
    meta: {
        author: 'AI Gallery Creator',
        keywords: 'AI, gallery, images, artificial intelligence, digital art',
        language: 'en',
        robots: 'index, follow'
    },

    // Analytics (optional)
    analytics: {
        enabled: false,
        googleAnalyticsId: '',
        trackDownloads: true,
        trackShares: true,
        trackCategoryChanges: true
    },

    // Social sharing
    social: {
        enableTwitter: true,
        enableFacebook: true,
        enableLinkedIn: true,
        enableWhatsApp: true,
        shareText: 'Check out this awesome AI creation!'
    }
};

// Attach to window for runtime access
if (typeof window !== 'undefined') {
    window.GalleryConfig = GalleryConfig;
}
