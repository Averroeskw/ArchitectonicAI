#!/bin/bash

# Architectonic AI Platform - Asset Customization Script
# This script replaces all default logos and assets with our custom branding

echo "🎨 Starting Architectonic AI Platform asset customization..."

# Create backup of original assets
echo "📦 Creating backup of original assets..."
mkdir -p backup_assets
cp -r public/assets backup_assets/

# Function to replace logo files
replace_logo() {
    local source="$1"
    local target="$2"
    local description="$3"
    
    if [ -f "$source" ]; then
        cp "$source" "$target"
        echo "✅ $description"
    else
        echo "❌ Source file not found: $source"
    fi
}

# Function to create PNG from SVG
create_png_from_svg() {
    local svg_file="$1"
    local png_file="$2"
    local size="$3"
    local description="$4"
    
    if [ -f "$svg_file" ]; then
        # Using ImageMagick if available, otherwise just copy
        if command -v convert &> /dev/null; then
            convert -background transparent -size "${size}x${size}" "$svg_file" "$png_file"
            echo "✅ $description (${size}x${size})"
        else
            echo "⚠️  ImageMagick not found, skipping PNG conversion for $description"
        fi
    else
        echo "❌ SVG file not found: $svg_file"
    fi
}

echo "🔄 Replacing logo files..."

# Replace main logo files
replace_logo "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/images/logo-primary.svg" "Main logo"
replace_logo "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/images/logo-white.svg" "White logo"
replace_logo "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/images/logo-black.svg" "Black logo"

# Create app icons from our logo
echo "🖼️  Creating app icons..."

# Create different sized icons from our logo
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-40.png" "40" "40px app icon"
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-64.png" "64" "64px app icon"
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-128.png" "128" "128px app icon"
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-256.png" "256" "256px app icon"
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-512.png" "512" "512px app icon"
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-1024.png" "1024" "1024px app icon"

# Create favicon
create_png_from_svg "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-favicon.png" "32" "Favicon"

# Replace main icon files
replace_logo "public/assets/icons/architectonic-app-icon-256.png" "public/assets/icons/icon.png" "Main icon"
replace_logo "public/assets/icons/architectonic-favicon.png" "public/icon.ico" "Favicon"

# Create main SVG icon
replace_logo "public/assets/logos/3d/averroes_averroes_original.svg" "public/assets/icons/architectonic-app-icon-main.svg" "Main SVG icon"

echo "✅ Asset replacement completed!"
echo "📝 Next steps:"
echo "   1. Update manifest.json with new icon references"
echo "   2. Customize color scheme in CSS/Tailwind config"
echo "   3. Update component references to use new assets"
