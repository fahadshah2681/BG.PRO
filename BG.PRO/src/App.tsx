import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BackgroundRemover from './tools/BackgroundRemover';
import BackgroundReplacer from './tools/BackgroundReplacer';
import ToolPlaceholder from './tools/ToolPlaceholder';
import { Crop, Minimize, FileImage, Bluetooth as Blur, Smile, Share as Shadow, User } from 'lucide-react';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentTool } = useApp();

  const renderTool = () => {
    switch (currentTool) {
      case 'background-remover':
        return <BackgroundRemover />;
      case 'background-replacer':
        return <BackgroundReplacer />;
      case 'image-resizer':
        return (
          <ToolPlaceholder
            toolName="Image Resizer"
            icon={<Crop className="w-8 h-8 text-white" />}
            description="Resize and crop your images to perfect dimensions for any platform or use case."
            features={[
              'Smart crop with face detection',
              'Preset sizes for social media',
              'Custom dimensions',
              'Bulk resize multiple images',
              'Maintain aspect ratio options',
              'Advanced cropping tools'
            ]}
          />
        );
      case 'image-compressor':
        return (
          <ToolPlaceholder
            toolName="Image Compressor"
            icon={<Minimize className="w-8 h-8 text-white" />}
            description="Compress images without losing quality. Perfect for web optimization and storage."
            features={[
              'Lossless compression',
              'Lossy compression with quality control',
              'Batch compression',
              'File size preview',
              'Format optimization',
              'WebP conversion'
            ]}
          />
        );
      case 'format-converter':
        return (
          <ToolPlaceholder
            toolName="Format Converter"
            icon={<FileImage className="w-8 h-8 text-white" />}
            description="Convert between image formats including PNG, JPG, WebP, and more."
            features={[
              'Multiple format support',
              'Batch conversion',
              'Quality settings',
              'Metadata preservation',
              'Transparency handling',
              'Color profile management'
            ]}
          />
        );
      case 'blur-tool':
        return (
          <ToolPlaceholder
            toolName="Blur Background"
            icon={<Blur className="w-8 h-8 text-white" />}
            description="Add professional blur effects to your images for stunning depth of field."
            features={[
              'Gaussian blur effects',
              'Motion blur simulation',
              'Selective blur areas',
              'Bokeh effect',
              'Adjustable blur intensity',
              'Preview in real-time'
            ]}
          />
        );
      case 'cartoon-effect':
        return (
          <ToolPlaceholder
            toolName="Cartoon Effect"
            icon={<Smile className="w-8 h-8 text-white" />}
            description="Transform your photos into cartoon-style illustrations with AI."
            features={[
              'Multiple cartoon styles',
              'Edge enhancement',
              'Color quantization',
              'Anime-style conversion',
              'Sketch effects',
              'Adjustable intensity'
            ]}
          />
        );
      case 'shadow-generator':
        return (
          <ToolPlaceholder
            toolName="Shadow Generator"
            icon={<Shadow className="w-8 h-8 text-white" />}
            description="Add realistic shadows to your images and cutouts automatically."
            features={[
              'Natural shadow generation',
              'Multiple shadow types',
              'Adjustable opacity',
              'Direction control',
              'Soft/hard shadow options',
              'Reflection effects'
            ]}
          />
        );
      case 'profile-creator':
        return (
          <ToolPlaceholder
            toolName="Profile Picture Creator"
            icon={<User className="w-8 h-8 text-white" />}
            description="Create perfect profile pictures with circle crops, borders, and effects."
            features={[
              'Circle and square crops',
              'Custom border styles',
              'Glow effects',
              'Multiple sizes',
              'Background removal',
              'Social media templates'
            ]}
          />
        );
      default:
        return <BackgroundRemover />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <BackgroundAnimation />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
        />
        
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              key={currentTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTool()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;