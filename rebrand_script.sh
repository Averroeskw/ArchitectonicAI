#!/bin/bash

# Architectonic AI Platform Rebranding Script
# This script replaces all Archie/Archie references with Archie/Architectonic

echo "🚀 Starting Architectonic AI Platform rebranding process..."

# Create backup
echo "📦 Creating backup..."
cp -r . ../ArchitectonicAI_backup

# Function to replace text in files
replace_text() {
    local search="$1"
    local replace="$2"
    local description="$3"
    
    echo "🔄 $description..."
    
    # Replace in all text files (excluding binary files and git)
    find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.yml" -o -name "*.yaml" -o -name "*.html" -o -name "*.css" -o -name "*.scss" -o -name "*.sh" -o -name "*.bat" -o -name "*.cjs" -o -name "*.mjs" -o -name "*.config.*" -o -name "Dockerfile" -o -name "*.env*" \) -not -path "./.git/*" -exec sed -i '' "s/$search/$replace/g" {} +
}

# Main branding replacements
replace_text "Archie" "Archie" "Replacing Archie with Archie"
replace_text "archie" "archie" "Replacing archie with archie"
replace_text "ARCHIE" "ARCHIE" "Replacing ARCHIE with ARCHIE"

replace_text "Archie" "Archie" "Replacing Archie with Archie"
replace_text "archie" "archie" "Replacing archie with archie"
replace_text "ARCHIE" "ARCHIE" "Replacing ARCHIE with ARCHIE"

replace_text "ArchieVerse" "ArchitectonicAI" "Replacing ArchieVerse with ArchitectonicAI"
replace_text "archieverse" "architectonicai" "Replacing archieverse with architectonicai"
replace_text "ARCHIEVERSE" "ARCHITECTONICAI" "Replacing ARCHIEVERSE with ARCHITECTONICAI"

# Specific component and service names
replace_text "archie-core-optimiser" "archie-core-optimiser" "Replacing archie-core-optimiser with archie-core-optimiser"
replace_text "archie-mcp" "archie-mcp" "Replacing archie-mcp with archie-mcp"

# Package names and identifiers
replace_text "archie-core" "archie-core" "Replacing archie-core with archie-core"
replace_text "archie-mcp" "archie-mcp" "Replacing archie-mcp with archie-mcp"

# File and directory references
replace_text "archie-core-optimiser" "archie-core-optimiser" "Replacing directory references"
replace_text "archie-mcp" "archie-mcp" "Replacing directory references"

# Brand descriptions and titles
replace_text "Archie AI Platform" "Architectonic AI Platform" "Replacing platform name"
replace_text "Archie AI" "Architectonic AI" "Replacing AI platform name"
replace_text "Archie Platform" "Architectonic Platform" "Replacing platform name"

# URLs and repository references
replace_text "badboysm890/ArchieVerse" "badboysm890/ArchitectonicAI" "Replacing repository references"
replace_text "github.com/badboysm890/ArchieVerse" "github.com/badboysm890/ArchitectonicAI" "Replacing GitHub URLs"

# Component names in code
replace_text "ArchieComponent" "ArchieComponent" "Replacing component names"
replace_text "ArchieService" "ArchieService" "Replacing service names"
replace_text "ArchieConfig" "ArchieConfig" "Replacing config names"

# CSS classes and IDs
replace_text "archie-" "archie-" "Replacing CSS class prefixes"
replace_text "archie_" "archie_" "Replacing CSS ID prefixes"

# Environment variables
replace_text "ARCHIE_" "ARCHIE_" "Replacing environment variable prefixes"

# Documentation and comments
replace_text "Archie's" "Archie's" "Replacing possessive forms"
replace_text "Archie is" "Archie is" "Replacing descriptions"

echo "✅ Rebranding script completed!"
echo "📝 Next steps:"
echo "   1. Review the changes"
echo "   2. Update any remaining references manually"
echo "   3. Test the application"
echo "   4. Update documentation and README files"
