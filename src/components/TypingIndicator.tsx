
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  // Dot animation variants
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -5, 0] }
  };

  // Different animation durations for each dot
  const transitions = [
    { duration: 0.6, repeat: Infinity, repeatType: 'loop' as const },
    { duration: 0.6, repeat: Infinity, repeatType: 'loop' as const, delay: 0.2 },
    { duration: 0.6, repeat: Infinity, repeatType: 'loop' as const, delay: 0.4 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-4 border-b bg-chat-assistant"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm text-[#1A1F71] font-medium">Mastercard Assistant is typing</span>
        <div className="flex items-center space-x-1">
          <motion.div 
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={transitions[0]}
            className="w-2 h-2 rounded-full bg-[#EB001B]"
          />
          <motion.div 
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={transitions[1]}
            className="w-2 h-2 rounded-full bg-[#F79E1B]"
          />
          <motion.div 
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={transitions[2]}
            className="w-2 h-2 rounded-full bg-[#1A1F71]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
