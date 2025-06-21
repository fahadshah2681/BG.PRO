import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import ImagePreview from '../components/ImagePreview';

const BackgroundReplacer: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [backgroundType, setBackgroundType] = useState<'color' | 'gradient' | 'image'>('color');

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ];

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundChange = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would apply the background replacement
    setProcessedImage(originalImage);
    setIsProcessing(false);
  };

  React.useEffect(() => {
    if (originalImage) {
      handleBackgroundChange();
    }
  }, [originalImage, selectedColor, backgroundType]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background_replaced.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage('');
    setProcessedImage('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Background Replacer
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Replace backgrounds with colors, gradients, or custom images. 
          Perfect for product photography and creative projects.
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!originalImage ? (
          <FileUpload
            onFileSelect={handleFileSelect}
            accept="image/*"
            maxSize={10}
          />
        ) : (
          <ImagePreview
            original={originalImage}
            processed={processedImage}
            isProcessing={isProcessing}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        )}
      </motion.div>

      {/* Background Options */}
      {originalImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Background Options
          </h3>

          {/* Background Type Selector */}
          <div className="flex space-x-2 mb-6">
            {[
              { id: 'color', label: 'Solid Color' },
              { id: 'gradient', label: 'Gradient' },
              { id: 'image', label: 'Custom Image' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setBackgroundType(type.id as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  backgroundType === type.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Color Picker */}
          {backgroundType === 'color' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-300 font-mono">
                  {selectedColor}
                </span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-gray-800 dark:border-gray-200 scale-110'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Gradient Picker */}
          {backgroundType === 'gradient' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  style={{ background: gradient }}
                  className="h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform"
                />
              ))}
            </div>
          )}

          {/* Image Upload */}
          {backgroundType === 'image' && (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Upload a background image
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundReplacer;