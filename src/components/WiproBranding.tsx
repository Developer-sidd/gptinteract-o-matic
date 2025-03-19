
import React from 'react';
import { motion } from 'framer-motion';

const WiproBranding: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`text-xs text-gray-500 flex items-center ${className}`}
    >
      <span>Powered by</span>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="ml-1 font-bold text-[#12abdb] flex items-center"
      >
        Wipro
        <span className="ml-0.5 text-[#12abdb]">
          <svg width="16" height="16" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 0C26.863 0 0 26.863 0 60C0 93.137 26.863 120 60 120C93.137 120 120 93.137 120 60C120 26.863 93.137 0 60 0ZM89.823 65.698L60 95.52L30.177 65.698C25.583 61.104 25.583 53.658 30.177 49.063C34.771 44.469 42.217 44.469 46.812 49.063L60 62.251L73.188 49.063C77.782 44.469 85.229 44.469 89.823 49.063C94.417 53.658 94.417 61.104 89.823 65.698Z" fill="#12abdb"/>
          </svg>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default WiproBranding;
