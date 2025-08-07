#!/bin/bash

# Architectonic AI Platform - GitHub Repository Setup Script

echo "🚀 Setting up GitHub repository for Architectonic AI Platform..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📦 Please install it first:"
    echo "   macOS: brew install gh"
    echo "   Then run: gh auth login"
    echo ""
    echo "🔗 Or manually create a repository at: https://github.com/new"
    echo "   Repository name: ArchitectonicAI"
    echo "   Description: Comprehensive AI development suite with privacy-first, client-side AI assistant"
    echo "   Make it Public or Private as preferred"
    echo ""
    echo "After creating the repository, run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/ArchitectonicAI.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "🔐 Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated."

# Create the repository
echo "📦 Creating GitHub repository..."
gh repo create ArchitectonicAI \
    --description "Comprehensive AI development suite with privacy-first, client-side AI assistant" \
    --public \
    --source=. \
    --remote=origin \
    --push

if [ $? -eq 0 ]; then
    echo "✅ Repository created successfully!"
    echo "🌐 Repository URL: https://github.com/$(gh api user --jq .login)/ArchitectonicAI"
    echo ""
    echo "🎉 Your Architectonic AI Platform is now live on GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Visit the repository URL above"
    echo "   2. Update repository description and topics"
    echo "   3. Set up GitHub Pages (if desired)"
    echo "   4. Configure branch protection rules"
    echo "   5. Set up GitHub Actions for CI/CD"
else
    echo "❌ Failed to create repository."
    echo "🔗 Please create it manually at: https://github.com/new"
    echo "   Then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/ArchitectonicAI.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi
