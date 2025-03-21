
import React from 'react';
import { motion } from 'framer-motion';

const WiproBranding: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`flex items-center ${className}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src="/lovable-uploads/54aad671-accd-4411-b5dc-26fe77c8ac89.png" 
          alt="Wipro Logo" 
          className="h-6 object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

// Enhance the watermark component
export const WiproWatermark: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 opacity-5 pointer-events-none z-0">
      <img 
        src="/lovable-uploads/54aad671-accd-4411-b5dc-26fe77c8ac89.png" 
        alt="Wipro Watermark" 
        className="w-32 h-32 object-contain"
      />
    </div>
  );
};

export default WiproBranding;
