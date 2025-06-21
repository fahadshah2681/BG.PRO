import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import ImagePreview from '../components/ImagePreview';
import GlassmorphismCard from '../components/GlassmorphismCard';
import AnimatedButton from '../components/AnimatedButton';
import { useApp } from '../contexts/AppContext';
import { removeBackground, downloadProcessedImage } from '../services/backgroundRemoval';

const BackgroundRemover: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { addProcessedImage } = useApp();

  const handleFileSelect = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);

    // Process the image with Remove.bg API
    await processImage(file);
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await removeBackground(file);
      
      if (result.success && result.data) {
        setProcessedImage(result.data);
        
        addProcessedImage({
          original: originalImage || URL.createObjectURL(file),
          processed: result.data,
          filename: fileName || file.name,
          timestamp: new Date()
        });
      } else {
        setError(result.error || 'Failed to remove background');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadProcessedImage(processedImage, fileName);
    }
  };

  const handleReset = () => {
    setOriginalImage('');
    setProcessedImage('');
    setFileName('');
    setError('');
  };

  const handleRetry = () => {
    if (originalImage) {
      // Convert data URL back to file for retry
      fetch(originalImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], fileName, { type: blob.type });
          processImage(file);
        });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <motion.div 
            className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl"
            animate={{
              boxShadow: [
                '0 10px 30px rgba(59, 130, 246, 0.3)',
                '0 15px 40px rgba(59, 130, 246, 0.5)',
                '0 10px 30px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Scissors className="w-10 h-10 text-white" />
          </motion.div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Background Remover
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              AI-Powered • Professional Quality
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Remove backgrounds from your images instantly with AI-powered precision using Remove.bg API. 
          Perfect for product photos, portraits, and social media content.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { icon: Sparkles, title: 'AI-Powered', desc: 'Remove.bg API integration', color: 'from-blue-500 to-cyan-500' },
          { icon: Scissors, title: 'Precise Cuts', desc: 'Professional edge detection', color: 'from-purple-500 to-pink-500' },
          { icon: CheckCircle, title: 'Instant Results', desc: 'Process in seconds', color: 'from-green-500 to-emerald-500' }
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassmorphismCard className="p-6 h-full">
                <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </GlassmorphismCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassmorphismCard className="p-6 border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-red-800 dark:text-red-200 font-semibold">Processing Error</h4>
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
              <AnimatedButton
                onClick={handleRetry}
                variant="secondary"
                size="sm"
              >
                Retry
              </AnimatedButton>
            </div>
          </GlassmorphismCard>
        </motion.div>
      )}

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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

      {/* Processing Status */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassmorphismCard className="p-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="text-left">
                <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Removing background...
                </span>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  AI is analyzing your image
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Using advanced AI to precisely detect and remove the background from your image
            </p>
          </GlassmorphismCard>
        </motion.div>
      )}

      {/* Download Options */}
      {processedImage && !isProcessing && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassmorphismCard className="p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Download Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
              >
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    PNG (Transparent)
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Best for overlays and logos
                  </p>
                </div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all group"
              >
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    High Quality
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Original resolution maintained
                  </p>
                </div>
              </motion.button>
            </div>
          </GlassmorphismCard>
        </motion.div>
      )}

      {/* API Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassmorphismCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Remove.bg API Connected
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Professional AI-powered background removal
            </div>
          </div>
        </GlassmorphismCard>
      </motion.div>
    </div>
  );
};

export default BackgroundRemover;