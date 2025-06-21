import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, X } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import AnimatedButton from './AnimatedButton';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  preview?: string;
  onClearPreview?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  accept = "image/*", 
  maxSize = 10,
  preview,
  onClearPreview
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size should be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <GlassmorphismCard className="p-6">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClearPreview}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-xl"
            />
          </div>
        </GlassmorphismCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <GlassmorphismCard 
        className={`transition-all duration-300 ${
          isDragOver ? 'scale-105 shadow-2xl' : ''
        }`}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="relative p-12 text-center"
        >
          <input
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-6">
            <motion.div
              animate={{ 
                y: isDragOver ? -10 : 0,
                scale: isDragOver ? 1.1 : 1
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div 
                  className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(59, 130, 246, 0.3)',
                      '0 15px 40px rgba(139, 92, 246, 0.4)',
                      '0 10px 30px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: isDragOver ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDragOver ? (
                      <Image className="w-10 h-10 text-white" />
                    ) : (
                      <Upload className="w-10 h-10 text-white" />
                    )}
                  </motion.div>
                </motion.div>
                
                {/* Floating particles around upload icon */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      top: `${20 + Math.sin(i * 60) * 30}%`,
                      left: `${20 + Math.cos(i * 60) * 30}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <div>
              <motion.h3 
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3"
                animate={{ color: isDragOver ? '#3b82f6' : undefined }}
              >
                {isDragOver ? 'Drop your image here' : 'Choose or drag an image'}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Supports PNG, JPG, WebP up to {maxSize}MB
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <AnimatedButton variant="primary" size="lg">
                  Browse Files
                </AnimatedButton>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  or drag and drop
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassmorphismCard>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <GlassmorphismCard className="p-4 border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </GlassmorphismCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;