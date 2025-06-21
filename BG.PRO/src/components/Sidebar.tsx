import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Palette, Crop, Minimize, FileImage, Bluetooth as Blur, Smile, Share as Shadow, User, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { id: 'background-remover', name: 'Background Remover', icon: Scissors, color: 'from-blue-500 to-blue-600' },
  { id: 'background-replacer', name: 'Background Replacer', icon: Palette, color: 'from-purple-500 to-purple-600' },
  { id: 'image-resizer', name: 'Image Resizer', icon: Crop, color: 'from-green-500 to-green-600' },
  { id: 'image-compressor', name: 'Image Compressor', icon: Minimize, color: 'from-orange-500 to-orange-600' },
  { id: 'format-converter', name: 'Format Converter', icon: FileImage, color: 'from-red-500 to-red-600' },
  { id: 'blur-tool', name: 'Blur Background', icon: Blur, color: 'from-indigo-500 to-indigo-600' },
  { id: 'cartoon-effect', name: 'Cartoon Effect', icon: Smile, color: 'from-pink-500 to-pink-600' },
  { id: 'shadow-generator', name: 'Shadow Generator', icon: Shadow, color: 'from-gray-500 to-gray-600' },
  { id: 'profile-creator', name: 'Profile Picture', icon: User, color: 'from-teal-500 to-teal-600' },
] as const;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentTool, setCurrentTool } = useApp();

  const handleToolSelect = (toolId: any) => {
    setCurrentTool(toolId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Image Tools
                </h2>
                <button
                  onClick={onClose}
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-3">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = currentTool === tool.id;

                  return (
                    <motion.button
                      key={tool.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleToolSelect(tool.id)}
                      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r ' + tool.color + ' text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-r ' + tool.color
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-white'
                        }`} />
                      </div>
                      <span className="font-medium">{tool.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Processing Stats
                </h3>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Images Processed</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>Success Rate</span>
                  <span className="font-semibold text-green-600">99.2%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;