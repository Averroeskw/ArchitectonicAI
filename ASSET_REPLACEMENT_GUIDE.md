# 🎨 Architectonic AI Platform - Asset Replacement & Customization Guide

## 📋 **Overview**

This guide provides step-by-step instructions for replacing all default logos, assets, and customizing the design system for the Architectonic AI Platform.

## 🖼️ **Asset Replacement Locations**

### **1. Logo Files**

#### **Main Logos**
- **Location**: `public/assets/images/`
- **Files to Replace**:
  - `logo-primary.svg` - Main brand logo
  - `logo-white.svg` - White version for dark backgrounds
  - `logo-black.svg` - Black version for light backgrounds

#### **App Icons**
- **Location**: `public/assets/icons/`
- **Files to Replace**:
  - `architectonic-app-icon-40.png` - 40x40px icon
  - `architectonic-app-icon-64.png` - 64x64px icon
  - `architectonic-app-icon-128.png` - 128x128px icon
  - `architectonic-app-icon-256.png` - 256x256px icon
  - `architectonic-app-icon-512.png` - 512x512px icon
  - `architectonic-app-icon-1024.png` - 1024x1024px icon
  - `architectonic-favicon.png` - 32x32px favicon
  - `architectonic-app-icon-main.svg` - Main SVG icon

#### **Favicon**
- **Location**: `public/`
- **Files to Replace**:
  - `icon.ico` - Main favicon file

### **2. 3D Logo Variations**
- **Location**: `public/assets/logos/3d/`
- **Available Variations**:
  - `averroes_averroes_original.svg` - Base logo
  - `averroes_averroes_3d_extruded.svg` - 3D extruded version
  - `averroes_averroes_scale_0.7.svg` - 70% scale
  - `averroes_averroes_scale_1.2.svg` - 120% scale
  - `averroes_averroes_scale_1.5.svg` - 150% scale
  - `averroes_averroes_scale_2.0.svg` - 200% scale
  - `averroes_averroes_rotated_29deg.svg` - 29° rotation
  - `averroes_averroes_rotated_45deg.svg` - 45° rotation
  - `averroes_averroes_rotated_59deg.svg` - 59° rotation
  - `averroes_averroes_rotated_90deg.svg` - 90° rotation

#### **System Views**
- `averroes_logo_system_isometric.svg` - Isometric projection
- `averroes_logo_system_dimetric.svg` - Dimetric projection
- `averroes_logo_system_trimetric.svg` - Trimetric projection

## 🎨 **Color Customization**

### **Primary Color Palette**
```css
/* Main Brand Colors */
--architectonic-primary: #3c373b;      /* Main brand color */
--architectonic-secondary: #4ECDC4;    /* Teal accent */
--architectonic-accent: #FDCB6E;       /* Golden yellow */

/* Brand Variations */
--architectonic-blue: #3498db;         /* Blue */
--architectonic-green: #2ecc71;        /* Green */
--architectonic-purple: #A29BFE;       /* Purple */
--architectonic-orange: #E17055;       /* Orange */
```

### **Where to Update Colors**

#### **1. Tailwind Configuration**
- **File**: `tailwind.config.js`
- **Section**: `theme.extend.colors.architectonic`

#### **2. CSS Variables**
- **File**: `src/styles/architectonic.css`
- **Section**: `:root` CSS custom properties

#### **3. Component Styling**
- **Location**: `src/components/`
- **Update**: All component files using Tailwind classes

## 🔧 **Configuration Files to Update**

### **1. Package Configuration**
- **File**: `package.json`
- **Updates**:
  - `name`: "architectonic-ai-platform"
  - `description`: Update with your platform description
  - `author`: Update with your information

### **2. Web App Manifest**
- **File**: `public/manifest.json`
- **Updates**:
  - `name`: "Architectonic AI Platform"
  - `short_name`: "Architectonic"
  - `description`: Update description
  - `theme_color`: "#3c373b"
  - `icons`: Update icon paths

### **3. HTML Head**
- **File**: `index.html`
- **Updates**:
  - `<title>`: Update page title
  - `<meta name="description">`: Update description
  - `<link rel="icon">`: Update favicon path

## 📁 **File Structure for Assets**

```
public/
├── assets/
│   ├── images/
│   │   ├── logo-primary.svg          # Main logo
│   │   ├── logo-white.svg            # White version
│   │   └── logo-black.svg            # Black version
│   ├── icons/
│   │   ├── architectonic-app-icon-*.png  # App icons (various sizes)
│   │   ├── architectonic-favicon.png     # Favicon
│   │   └── architectonic-app-icon-main.svg  # Main SVG icon
│   └── logos/
│       └── 3d/                      # 3D logo variations
│           ├── averroes_averroes_*.svg
│           └── averroes_logo_system_*.svg
├── icon.ico                          # Main favicon
└── manifest.json                     # Web app manifest
```

## 🚀 **Automated Asset Replacement**

### **Using the Customization Script**
```bash
# Run the asset customization script
chmod +x customize_assets.sh
./customize_assets.sh
```

### **Manual Asset Replacement**
1. **Replace Logo Files**:
   ```bash
   cp your-logo.svg public/assets/images/logo-primary.svg
   cp your-logo-white.svg public/assets/images/logo-white.svg
   cp your-logo-black.svg public/assets/images/logo-black.svg
   ```

2. **Generate App Icons**:
   ```bash
   # Using ImageMagick
   convert your-logo.svg -resize 40x40 public/assets/icons/architectonic-app-icon-40.png
   convert your-logo.svg -resize 64x64 public/assets/icons/architectonic-app-icon-64.png
   # ... repeat for all sizes
   ```

3. **Update Favicon**:
   ```bash
   convert your-logo.svg -resize 32x32 public/icon.ico
   ```

## 🎯 **Component Customization**

### **1. Logo Component Usage**
```jsx
// In your React components
import LogoPrimary from '/assets/images/logo-primary.svg';
import Logo3D from '/assets/logos/3d/averroes_averroes_3d_extruded.svg';

// Usage
<img src={LogoPrimary} alt="Architectonic AI Platform" />
<img src={Logo3D} alt="3D Logo" />
```

### **2. Styling with Custom Classes**
```jsx
// Using our custom CSS classes
<div className="bg-gradient text-white rounded-lg p-4">
  <h1 className="text-gradient">Architectonic AI Platform</h1>
</div>

// Using Tailwind with our custom colors
<div className="bg-architectonic-primary text-white rounded-architectonic p-4">
  <h1 className="text-architectonic-secondary">Welcome</h1>
</div>
```

### **3. Button Styling**
```jsx
// Custom button classes
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-secondary">Secondary Action</button>
<button className="btn btn-accent">Accent Action</button>
<button className="btn btn-outline">Outline Action</button>
```

## 📱 **Responsive Design**

### **Mobile Optimization**
- All assets are optimized for mobile devices
- Icons include multiple sizes for different screen densities
- CSS includes responsive breakpoints

### **Progressive Web App (PWA)**
- Manifest.json configured for PWA installation
- Icons support maskable format for adaptive icons
- Theme colors configured for system integration

## 🔍 **Testing Your Changes**

### **1. Development Server**
```bash
npm run dev
```

### **2. Build Test**
```bash
npm run build
npm run preview
```

### **3. Desktop App Test**
```bash
npm run electron:dev
```

## 📋 **Checklist for Complete Customization**

- [ ] Replace all logo files in `public/assets/images/`
- [ ] Generate and replace app icons in `public/assets/icons/`
- [ ] Update favicon in `public/icon.ico`
- [ ] Update `public/manifest.json` with new icon paths
- [ ] Update `package.json` with new project information
- [ ] Update `index.html` with new title and meta tags
- [ ] Customize colors in `tailwind.config.js`
- [ ] Update component styling to use new color classes
- [ ] Test on development server
- [ ] Test build process
- [ ] Test desktop app (if applicable)

## 🎨 **Design System Guidelines**

### **Typography**
- **Primary Font**: Inter (Google Fonts)
- **Monospace Font**: JetBrains Mono
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### **Spacing**
- **Base Unit**: 0.25rem (4px)
- **Scale**: xs, sm, md, lg, xl, 2xl
- **Container Max Width**: 1200px

### **Border Radius**
- **Default**: 0.75rem (12px)
- **Large**: 1rem (16px)
- **Extra Large**: 1.5rem (24px)

### **Shadows**
- **Default**: Subtle elevation
- **Large**: Medium elevation
- **Extra Large**: High elevation

## 🚀 **Deployment Considerations**

### **GitHub Pages**
- Update repository settings
- Configure custom domain (if applicable)
- Ensure all assets are committed

### **Netlify/Vercel**
- Configure build settings
- Set environment variables
- Test deployment

### **Desktop App**
- Update Electron configuration
- Test packaging process
- Verify icon display

---

**🎉 Your Architectonic AI Platform is now fully customized with your branding!**
