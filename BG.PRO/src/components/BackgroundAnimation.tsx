import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundAnimation: React.FC = () => {
  const { theme } = useTheme();

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: theme === 'light' 
            ? [
                'linear-gradient(45deg, #f0f9ff, #e0e7ff, #fdf2f8)',
                'linear-gradient(45deg, #ecfdf5, #f0f9ff, #fef3c7)',
                'linear-gradient(45deg, #fdf2f8, #ecfdf5, #e0e7ff)',
                'linear-gradient(45deg, #f0f9ff, #e0e7ff, #fdf2f8)'
              ]
            : [
                'linear-gradient(45deg, #0f172a, #1e1b4b, #581c87)',
                'linear-gradient(45deg, #064e3b, #0f172a, #92400e)',
                'linear-gradient(45deg, #581c87, #064e3b, #1e1b4b)',
                'linear-gradient(45deg, #0f172a, #1e1b4b, #581c87)'
              ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      />

      {/* Floating Geometric Shapes */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-br from-blue-200/30 to-purple-200/30'
              : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
          } backdrop-blur-sm`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}

      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: theme === 'light'
            ? [
                'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%)',
                'radial-gradient(circle at 60% 70%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 30% 40%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 70% 30%, #06b6d4 0%, transparent 50%)',
                'radial-gradient(circle at 80% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 70%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 50% 20%, #06b6d4 0%, transparent 50%)'
              ]
            : [
                'radial-gradient(circle at 20% 50%, #1e40af 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6d28d9 0%, transparent 50%), radial-gradient(circle at 40% 80%, #0891b2 0%, transparent 50%)',
                'radial-gradient(circle at 60% 70%, #1e40af 0%, transparent 50%), radial-gradient(circle at 30% 40%, #6d28d9 0%, transparent 50%), radial-gradient(circle at 70% 30%, #0891b2 0%, transparent 50%)',
                'radial-gradient(circle at 80% 30%, #1e40af 0%, transparent 50%), radial-gradient(circle at 20% 70%, #6d28d9 0%, transparent 50%), radial-gradient(circle at 50% 20%, #0891b2 0%, transparent 50%)'
              ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle System */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              theme === 'light' 
                ? 'bg-blue-400/40' 
                : 'bg-blue-300/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${
          theme === 'light'
            ? 'bg-gradient-to-r from-pink-300/20 to-purple-300/20'
            : 'bg-gradient-to-r from-pink-500/30 to-purple-500/30'
        } blur-xl`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full ${
          theme === 'light'
            ? 'bg-gradient-to-r from-blue-300/20 to-cyan-300/20'
            : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
        } blur-xl`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme === 'light' ? '#3b82f6' : '#60a5fa'} stopOpacity="0" />
            <stop offset="50%" stopColor={theme === 'light' ? '#8b5cf6' : '#a78bfa'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={theme === 'light' ? '#06b6d4' : '#67e8f9'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 Q250,50 500,100 T1000,100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

export default BackgroundAnimation;