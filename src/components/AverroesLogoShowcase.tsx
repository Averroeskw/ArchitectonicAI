import React, { useState } from 'react';

interface LogoVariation {
  name: string;
  path: string;
  description: string;
}

const AverroesLogoShowcase: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'isometric' | 'dimetric' | 'trimetric'>('isometric');
  const [selectedLogo, setSelectedLogo] = useState<string>('original');

  const logoVariations: LogoVariation[] = [
    {
      name: 'Original',
      path: '/assets/logos/3d/averroes_averroes_original.svg',
      description: 'Base 3D version of the Averroes logo'
    },
    {
      name: '3D Extruded',
      path: '/assets/logos/3d/averroes_averroes_3d_extruded.svg',
      description: 'Enhanced depth version with more extrusion'
    },
    {
      name: 'Scale 0.7x',
      path: '/assets/logos/3d/averroes_averroes_scale_0.7.svg',
      description: 'Smaller scale version (70%)'
    },
    {
      name: 'Scale 1.2x',
      path: '/assets/logos/3d/averroes_averroes_scale_1.2.svg',
      description: 'Larger scale version (120%)'
    },
    {
      name: 'Scale 1.5x',
      path: '/assets/logos/3d/averroes_averroes_scale_1.5.svg',
      description: 'Large scale version (150%)'
    },
    {
      name: 'Scale 2.0x',
      path: '/assets/logos/3d/averroes_averroes_scale_2.0.svg',
      description: 'Extra large scale version (200%)'
    },
    {
      name: 'Rotated 30°',
      path: '/assets/logos/3d/averroes_averroes_rotated_29deg.svg',
      description: '30-degree rotation'
    },
    {
      name: 'Rotated 45°',
      path: '/assets/logos/3d/averroes_averroes_rotated_45deg.svg',
      description: '45-degree rotation'
    },
    {
      name: 'Rotated 60°',
      path: '/assets/logos/3d/averroes_averroes_rotated_59deg.svg',
      description: '60-degree rotation'
    },
    {
      name: 'Rotated 90°',
      path: '/assets/logos/3d/averroes_averroes_rotated_90deg.svg',
      description: '90-degree rotation'
    }
  ];

  const systemViews = [
    {
      name: 'Isometric',
      value: 'isometric',
      path: '/assets/logos/3d/averroes_logo_system_isometric.svg'
    },
    {
      name: 'Dimetric',
      value: 'dimetric',
      path: '/assets/logos/3d/averroes_logo_system_dimetric.svg'
    },
    {
      name: 'Trimetric',
      value: 'trimetric',
      path: '/assets/logos/3d/averroes_logo_system_trimetric.svg'
    }
  ];

  const selectedLogoData = logoVariations.find(logo => logo.name.toLowerCase().includes(selectedLogo)) || logoVariations[0];
  const selectedSystemView = systemViews.find(view => view.value === selectedView) || systemViews[0];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Averroes Logo 3D Showcase
          </h1>
          <p className="text-lg text-gray-600">
            Explore the 3D transformations of the Averroes logo
          </p>
        </div>

        {/* View Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Views</h2>
          <div className="flex gap-4 mb-6">
            {systemViews.map((view) => (
              <button
                key={view.value}
                onClick={() => setSelectedView(view.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === view.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {view.name}
              </button>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Complete Logo System - {selectedSystemView.name} View</h3>
            <div className="flex justify-center">
              <img
                src={selectedSystemView.path}
                alt={`Averroes Logo System - ${selectedSystemView.name}`}
                className="max-w-full h-auto max-h-96"
              />
            </div>
          </div>
        </div>

        {/* Individual Logo Variations */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Individual Logo Variations</h2>
          
          {/* Logo Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Logo Variation:
            </label>
            <select
              value={selectedLogo}
              onChange={(e) => setSelectedLogo(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {logoVariations.map((logo) => (
                <option key={logo.name} value={logo.name.toLowerCase()}>
                  {logo.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Logo Display */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">{selectedLogoData.name}</h3>
            <p className="text-gray-600 mb-4">{selectedLogoData.description}</p>
            <div className="flex justify-center">
              <img
                src={selectedLogoData.path}
                alt={selectedLogoData.name}
                className="max-w-full h-auto max-h-48"
              />
            </div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">All Logo Variations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {logoVariations.map((logo) => (
              <div
                key={logo.name}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedLogo(logo.name.toLowerCase())}
              >
                <img
                  src={logo.path}
                  alt={logo.name}
                  className="w-full h-auto mb-2"
                />
                <h4 className="text-sm font-medium text-gray-800">{logo.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">How to Use These Logos</h2>
          <div className="space-y-3 text-blue-700">
            <p><strong>1. Direct Import:</strong> Import SVGs directly into your React components</p>
            <p><strong>2. CSS Backgrounds:</strong> Use as background images in your CSS</p>
            <p><strong>3. Dynamic Loading:</strong> Load different variations based on context</p>
            <p><strong>4. Animation:</strong> Use rotation variations for loading animations</p>
            <p><strong>5. Responsive Design:</strong> Use different scales for different screen sizes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverroesLogoShowcase; 