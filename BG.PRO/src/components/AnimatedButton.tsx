import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = ''
}) => {
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-xl";
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600 text-white 
      hover:from-blue-600 hover:to-purple-700 
      shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40
    `,
    secondary: `
      bg-white/10 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 
      border border-gray-200/50 dark:border-gray-700/50
      hover:bg-white/20 dark:hover:bg-gray-800/70
      backdrop-blur-sm
    `,
    ghost: `
      text-gray-700 dark:text-gray-300 
      hover:bg-gray-100/50 dark:hover:bg-gray-800/50
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative flex items-center justify-center space-x-2">
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </div>
    </motion.button>
  );
};

export default AnimatedButton;