import React from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Eye } from 'lucide-react';

interface ImagePreviewProps {
  original?: string;
  processed?: string;
  isProcessing?: boolean;
  onDownload?: () => void;
  onReset?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  original,
  processed,
  isProcessing = false,
  onDownload,
  onReset
}) => {
  const [showComparison, setShowComparison] = React.useState(false);

  if (!original && !processed) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              showComparison
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Compare</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          )}
          
          {processed && onDownload && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Image Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {showComparison && original && processed ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Original</h4>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
                <img
                  src={original}
                  alt="Original"
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Processed</h4>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
                <img
                  src={processed}
                  alt="Processed"
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Processing image...</p>
                </div>
              </div>
            )}
            
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
              <img
                src={processed || original}
                alt="Preview"
                className="w-full h-96 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;