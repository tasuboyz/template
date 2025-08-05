#!/usr/bin/env python3
"""
Generatore di immagini placeholder per il sito del ristorante
Crea immagini SVG colorate per simulare foto di piatti, interni, atmosfera ed eventi
"""

import os
import random
from pathlib import Path

def create_svg_image(width, height, title, category, image_id):
    """Crea un'immagine SVG placeholder"""
    
    # Colori per categoria
    colors = {
        'dishes': ['#FF6B35', '#D73502', '#FFD23F'],
        'interior': ['#8B4513', '#A0522D', '#D2B48C'],
        'atmosphere': ['#FFD700', '#FFA500', '#FF8C00'],
        'events': ['#C41E3A', '#8B0000', '#DC143C'],
        'hero': ['#4A2C2A', '#8B4513', '#CD853F'],
        'menu': ['#FF6B35', '#C41E3A', '#FFD23F']
    }
    
    category_colors = colors.get(category, ['#666666', '#999999', '#CCCCCC'])
    primary_color = random.choice(category_colors)
    secondary_color = random.choice([c for c in category_colors if c != primary_color])
    
    # Icone per categoria
    icons = {
        'dishes': ['🍝', '🍕', '🥘', '🍲', '🥗', '🍖', '🧀', '🍷'],
        'interior': ['🪑', '🛏️', '🕯️', '🖼️', '🌿', '💡'],
        'atmosphere': ['✨', '🌟', '💫', '🎭', '🎪', '🎨'],
        'events': ['🎉', '🎂', '🥂', '🎊', '💒', '🎈'],
        'hero': ['🍴', '👨‍🍳', '🏛️'],
        'menu': ['📋', '📖', '📜']
    }
    
    icon = random.choice(icons.get(category, ['🍽️']))
    
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad{image_id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{primary_color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{secondary_color};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow{image_id}">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#grad{image_id})"/>
    
    <!-- Decorative pattern -->
    <pattern id="dots{image_id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.1)"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#dots{image_id})"/>
    
    <!-- Icon -->
    <text x="50%" y="40%" text-anchor="middle" font-size="48" fill="rgba(255,255,255,0.8)">
        {icon}
    </text>
    
    <!-- Title -->
    <text x="50%" y="60%" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" filter="url(#shadow{image_id})">
        {title}
    </text>
    
    <!-- ID -->
    <text x="50%" y="75%" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.8)">
        ID: {image_id}
    </text>
    
    <!-- Category badge -->
    <rect x="10" y="10" width="80" height="25" rx="12" fill="rgba(0,0,0,0.6)"/>
    <text x="50" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="white" font-weight="bold">
        {category.upper()}
    </text>
</svg>'''
    
    return svg_content

def generate_restaurant_images():
    """Genera tutte le immagini per il ristorante"""
    
    base_path = Path('images')
    
    # Immagini hero
    hero_images = [
        ('signature-dish.jpg', 'Piatto Signature', 'hero')
    ]
    
    for filename, title, category in hero_images:
        svg_content = create_svg_image(1200, 800, title, category, 1)
        with open(base_path / 'hero' / filename.replace('.jpg', '.svg'), 'w', encoding='utf-8') as f:
            f.write(svg_content)
    
    # Immagini menu
    dishes_menu = [
        ('antipasto-misto.jpg', 'Antipasto Misto'),
        ('carbonara.jpg', 'Carbonara'),
        ('cacio-pepe.jpg', 'Cacio e Pepe'),
        ('saltimbocca.jpg', 'Saltimbocca'),
        ('branzino.jpg', 'Branzino'),
        ('tiramisu.jpg', 'Tiramisù')
    ]
    
    for i, (filename, title) in enumerate(dishes_menu, 1):
        svg_content = create_svg_image(400, 300, title, 'menu', i)
        with open(base_path / 'dishes' / filename.replace('.jpg', '.svg'), 'w', encoding='utf-8') as f:
            f.write(svg_content)
    
    # Immagini gallery per categorie
    categories = {
        'dishes': [
            'Spaghetti Carbonara', 'Pizza Margherita', 'Risotto ai Funghi', 'Osso Buco',
            'Tiramisù', 'Panna Cotta', 'Bruschetta', 'Antipasto Misto', 'Lasagne',
            'Gnocchi al Pomodoro', 'Saltimbocca', 'Cacio e Pepe', 'Amatriciana',
            'Parmigiana', 'Cannoli', 'Gelato Artigianale', 'Carpaccio', 'Minestrone',
            'Pasta alla Norma', 'Vitello Tonnato', 'Caprese', 'Arancini', 'Focaccia',
            'Ribollita', 'Cacciucco', 'Bistecca Fiorentina', 'Pasta all\'Arrabbiata',
            'Scaloppine', 'Involtini', 'Pasta e Fagioli'
        ],
        'interior': [
            'Sala Principale', 'Terrazza Panoramica', 'Angolo Wine Bar', 'Cucina a Vista',
            'Ingresso Elegante', 'Sala Privata', 'Giardino Interno', 'Bar Centrale',
            'Zona Degustazione', 'Cantina Vini', 'Sala Banchetti', 'Veranda Estiva',
            'Tavolo Chef', 'Angolo Lettura', 'Salottino', 'Bancone Marmo',
            'Soffitto Affrescato', 'Camino Antico', 'Biblioteca Vini', 'Tavolo Imperiale'
        ],
        'atmosphere': [
            'Cena Romantica', 'Aperitivo Serale', 'Brunch Weekend', 'Cena Famiglia',
            'Business Lunch', 'Degustazione Vini', 'Chef al Lavoro', 'Servizio Tavolo',
            'Momenti Conviviali', 'Tramonto Terrazza', 'Candele Accese', 'Risate Tavolo',
            'Toast Celebrativo', 'Preparazione Pasta', 'Servizio Cameriere', 'Tavolo Apparecchiato'
        ],
        'events': [
            'Matrimonio Elegante', 'Compleanno Speciale', 'Anniversario', 'Festa Aziendale',
            'Degustazione Guidata', 'Cooking Class', 'Wine Tasting', 'Evento Privato',
            'Cena di Gala', 'Festa Laurea', 'Baby Shower', 'Addio al Celibato',
            'Comunione', 'Cresima', 'Festa Pensionamento', 'Inaugurazione'
        ]
    }
    
    # Genera immagini per ogni categoria
    for category, titles in categories.items():
        for i, title in enumerate(titles, 1):
            # Pad del numero per ordinamento
            padded_id = str(i).zfill(3)
            filename = f"{category}_{padded_id}.svg"
            
            svg_content = create_svg_image(400, 300, title, category, i)
            category_path = base_path / 'gallery' / category / filename
            
            with open(category_path, 'w', encoding='utf-8') as f:
                f.write(svg_content)
    
    # Genera immagini aggiuntive per raggiungere 300 totali
    additional_images_needed = 300 - sum(len(titles) for titles in categories.values())
    
    if additional_images_needed > 0:
        all_categories = list(categories.keys())
        for i in range(additional_images_needed):
            category = random.choice(all_categories)
            existing_count = len(categories[category])
            new_id = existing_count + i + 1
            
            # Genera titolo casuale
            base_titles = categories[category]
            title = f"{random.choice(base_titles)} Variante {new_id}"
            
            padded_id = str(new_id).zfill(3)
            filename = f"{category}_{padded_id}.svg"
            
            svg_content = create_svg_image(400, 300, title, category, new_id)
            category_path = base_path / 'gallery' / category / filename
            
            with open(category_path, 'w', encoding='utf-8') as f:
                f.write(svg_content)
    
    # Crea logo placeholder
    logo_svg = create_svg_image(100, 100, 'La Tavola d\'Oro', 'hero', 'logo')
    with open(base_path / 'logo.svg', 'w', encoding='utf-8') as f:
        f.write(logo_svg)
    
    print("✅ Immagini generate con successo!")
    print(f"📁 Hero: 1 immagine")
    print(f"🍽️ Menu: {len(dishes_menu)} immagini")
    print(f"🖼️ Gallery: ~300 immagini totali")
    print(f"🏢 Logo: 1 immagine")
    print("\n🎨 Tutte le immagini sono SVG colorate per categoria:")
    print("🔴 Piatti: Rosso/Arancione")
    print("🟤 Interni: Marrone/Beige") 
    print("🟡 Atmosfera: Oro/Giallo")
    print("🟥 Eventi: Rosso scuro/Bordeaux")

if __name__ == "__main__":
    # Crea le directory se non esistono
    base_path = Path('images')
    base_path.mkdir(exist_ok=True)
    
    directories = [
        'hero', 'dishes', 'icons',
        'gallery/dishes', 'gallery/interior', 
        'gallery/atmosphere', 'gallery/events'
    ]
    
    for directory in directories:
        (base_path / directory).mkdir(parents=True, exist_ok=True)
    
    generate_restaurant_images()
