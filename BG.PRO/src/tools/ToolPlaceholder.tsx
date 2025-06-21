import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Sparkles } from 'lucide-react';

interface ToolPlaceholderProps {
  toolName: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({
  toolName,
  icon,
  description,
  features
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            {icon}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {toolName}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-blue-200/20 dark:border-blue-700/20"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-4"
        >
          <Construction className="w-16 h-16 text-blue-500" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Coming Soon!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're working hard to bring you this amazing tool. Stay tuned!
        </p>
        
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            Planned Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolPlaceholder;