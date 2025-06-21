import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 
        border border-white/20 dark:border-gray-700/30 
        rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20
        before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-br before:from-white/10 before:to-transparent 
        before:pointer-events-none
        ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassmorphismCard;