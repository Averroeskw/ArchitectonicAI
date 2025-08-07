# 🚀 Getting Started with Architectonic AI Platform

## 🎯 **Quick Start**

### **1. Installation**
```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd ArchitectonicAI

# Install dependencies
npm install

# Start development server
npm run dev
```

### **2. Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run electron:dev # Start Electron app in development
npm run test         # Run tests
npm run lint         # Run linting
```

## 🏗️ **Platform Overview**

Architectonic AI Platform is a comprehensive AI development suite that includes:

### **Core Features**
- 🧠 **AI Assistant** - Advanced chat interface with vision support
- 🧩 **Code Builder** - WebContainer-powered development environment
- 🔄 **Automation Hub** - N8N workflow automation
- 🎨 **Image Studio** - Local Stable Diffusion with ComfyUI
- 🤖 **Agent Builder** - Visual AI workflow creation
- 📱 **Widget System** - Customizable UI components

### **Technical Stack**
- **Frontend**: React + TypeScript + Vite
- **Desktop**: Electron
- **AI**: Ollama, OpenAI, OpenRouter
- **Styling**: Tailwind CSS
- **Build**: Vite + Electron Builder

## 🎨 **Custom Branding**

### **Logo System**
- **10 Logo Variations**: Original, 3D, scaled, and rotated versions
- **3D Projections**: Isometric, dimetric, and trimetric views
- **Color Palette**: Based on `#3c373b` with complementary colors
- **Interactive Showcase**: Available at `/components/AverroesLogoShowcase`

### **Brand Identity**
- **Primary**: Architectonic AI Platform
- **Assistant**: Archie
- **Core Services**: archie-core-optimiser, archie-mcp
- **Color Scheme**: Professional and modern

## 🔧 **Development**

### **Project Structure**
```
ArchitectonicAI/
├── src/                    # Main source code
│   ├── components/         # React components
│   ├── services/          # AI and backend services
│   └── utils/             # Utility functions
├── archie-core-optimiser/ # Core optimization service
├── archie-mcp/           # Model Context Protocol
├── public/assets/logos/3d/ # Custom logo variations
└── electron/             # Desktop app configuration
```

### **Key Directories**
- `src/components/` - React components and UI
- `src/services/` - AI services and integrations
- `archie-core-optimiser/` - Go-based optimization service
- `archie-mcp/` - MCP server implementation
- `public/assets/` - Static assets and logos

## 🎯 **Customization Guide**

### **1. Logo Integration**
```jsx
// Use our custom logos in components
import LogoOriginal from '/assets/logos/3d/averroes_averroes_original.svg';
import Logo3D from '/assets/logos/3d/averroes_averroes_3d_extruded.svg';

// Display logo variations
<img src={LogoOriginal} alt="Architectonic Logo" />
<img src={Logo3D} alt="3D Logo" />
```

### **2. Color Scheme**
```css
/* Primary brand colors */
--primary: #3c373b;      /* Main brand color */
--secondary: #4ECDC4;    /* Teal accent */
--accent: #FDCB6E;       /* Golden yellow */
--brand-blue: #3498db;   /* Blue variation */
--brand-green: #2ecc71;  /* Green variation */
```

### **3. Component Styling**
```jsx
// Apply brand styling to components
<div className="bg-primary text-white rounded-lg p-4">
  <h2 className="text-2xl font-bold">Architectonic AI Platform</h2>
</div>
```

## 🚀 **Deployment**

### **Desktop App**
```bash
# Build for all platforms
npm run electron:build-all

# Build for specific platform
npm run electron:build-mac
npm run electron:build-win
npm run electron:build-linux
```

### **Web App**
```bash
# Build for web
npm run build

# Preview build
npm run preview
```

### **Docker**
```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## 🔍 **Troubleshooting**

### **Common Issues**
1. **Node.js Version**: Ensure you're using Node.js 18+ or 20+
2. **Dependencies**: Run `npm install` if you encounter module errors
3. **Electron**: Use `npm run electron:dev` for desktop development
4. **Port Conflicts**: Change port in `vite.config.ts` if needed

### **Development Tips**
- Use `npm run dev` for web development
- Use `npm run electron:dev` for desktop app development
- Check `troubleshoot/` directory for specific solutions
- Review `docs/` for detailed documentation

## 📚 **Documentation**

### **Available Resources**
- `README.md` - Main project documentation
- `REBRANDING_SUMMARY.md` - Complete rebranding details
- `docs/` - Technical documentation
- `docs-internal/` - Internal development docs
- `CHANGELOG.md` - Version history

### **External Links**
- [Architectonic AI Platform](https://architectonic.ai/)
- [Discord Community](https://discord.gg/architectonic)
- [Reddit Community](https://www.reddit.com/r/architectonic/)

## 🎉 **Success!**

You now have a fully rebranded **Architectonic AI Platform** ready for development and customization. The platform maintains all the powerful features of the original ClaraVerse while featuring our custom branding and logo system.

**Next Steps:**
1. Start the development server: `npm run dev`
2. Explore the platform features
3. Customize the UI with our branding
4. Deploy your customized version

---

*Built with ❤️ for the Architectonic AI Platform community*
