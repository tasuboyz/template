// Google Maps Configuration for FoodGallery
// =============================================

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Get Google Maps API Key:
 *    - Go to: https://console.cloud.google.com/
 *    - Create or select a project
 *    - Enable "Maps JavaScript API" and "Places API"
 *    - Create credentials (API Key)
 *    - Restrict the API key to your domain
 * 
 * 2. Replace 'YOUR_API_KEY' in index.html with your actual API key
 * 
 * 3. Update restaurant coordinates below if needed
 */

// Restaurant Configuration
const RESTAURANT_CONFIG = {
    // Coordinates (Update these to your restaurant's actual location)
    coordinates: {
        lat: 45.4654,  // Milan latitude (example)
        lng: 9.1859    // Milan longitude (example)
    },
    
    // Restaurant Details
    name: "FoodGallery",
    subtitle: "Esperienza Culinaria Immersiva",
    address: "Via Gourmet 123, 20121 Milano, Italia",
    phone: "+39 02 1234 5678",
    
    // Business Hours
    hours: {
        monday: "Chiuso",
        tuesday: "19:00 - 24:00",
        wednesday: "19:00 - 24:00", 
        thursday: "19:00 - 24:00",
        friday: "19:00 - 01:00",
        saturday: "19:00 - 01:00",
        sunday: "12:00 - 15:00 | 19:00 - 24:00"
    },
    
    // Rating & Reviews
    rating: 4.9,
    reviewCount: 247
};

// Map Styling Configuration
const MAP_STYLES = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{ "weight": "2.00" }]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#9c9c9c" }]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#7b7b7b" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#c8d7d4" }]
    }
];

// Map Options Configuration
const MAP_OPTIONS = {
    zoom: 16,
    styles: MAP_STYLES,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    fullscreenControl: true,
    scrollwheel: true,
    gestureHandling: 'cooperative'
};

// Custom Marker Icon SVG
const CUSTOM_MARKER_SVG = `
<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f7931e;stop-opacity:1" />
        </linearGradient>
    </defs>
    <path d="M20 0C11.2 0 4 7.2 4 16c0 8.8 16 34 16 34s16-25.2 16-34C36 7.2 28.8 0 20 0z" fill="url(#gradient)"/>
    <circle cx="20" cy="16" r="6" fill="white"/>
    <text x="20" y="20" text-anchor="middle" fill="#ff6b35" font-family="Arial" font-size="12" font-weight="bold">🍽️</text>
</svg>
`;

// Export configurations (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RESTAURANT_CONFIG,
        MAP_STYLES,
        MAP_OPTIONS,
        CUSTOM_MARKER_SVG
    };
}

// Global availability
window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
window.MAP_STYLES = MAP_STYLES;
window.MAP_OPTIONS = MAP_OPTIONS;
window.CUSTOM_MARKER_SVG = CUSTOM_MARKER_SVG;
