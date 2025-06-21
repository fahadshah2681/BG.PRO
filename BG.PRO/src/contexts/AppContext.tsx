import React, { createContext, useContext, useState } from 'react';

type Tool = 'background-remover' | 'background-replacer' | 'image-resizer' | 'image-compressor' | 'format-converter' | 'blur-tool' | 'cartoon-effect' | 'shadow-generator' | 'profile-creator';

interface ProcessedImage {
  original: string;
  processed: string;
  filename: string;
  timestamp: Date;
}

interface AppContextType {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  processedImages: ProcessedImage[];
  addProcessedImage: (image: ProcessedImage) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTool, setCurrentTool] = useState<Tool>('background-remover');
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);

  const addProcessedImage = (image: ProcessedImage) => {
    setProcessedImages(prev => [image, ...prev.slice(0, 9)]); // Keep last 10 images
  };

  const clearHistory = () => {
    setProcessedImages([]);
  };

  return (
    <AppContext.Provider value={{
      currentTool,
      setCurrentTool,
      processedImages,
      addProcessedImage,
      clearHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};