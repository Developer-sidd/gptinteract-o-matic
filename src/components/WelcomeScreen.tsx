
import React from 'react';
import { motion } from 'framer-motion';
import MastercardLogo from './MastercardLogo';
import WiproBranding from './WiproBranding';

const WelcomeScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center justify-center h-full p-8 text-center"
    >
      <MastercardLogo className="mb-4 scale-150" />
      <h2 className="text-2xl font-bold mb-2 text-[#1A1F71]">Welcome to Mastercard Assistant</h2>
      <p className="text-muted-foreground mb-6">Ask me about Mastercard products, services, or request different types of content</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <p className="text-sm text-muted-foreground mb-2">Try using voice input to ask questions</p>
        <div className="flex gap-2 items-center">
          <span className="text-xs bg-[#EB001B]/10 text-[#EB001B] px-2 py-1 rounded-full">
            Voice Enabled
          </span>
          <span className="text-xs bg-[#F79E1B]/10 text-[#F79E1B] px-2 py-1 rounded-full">
            File Uploads
          </span>
          <span className="text-xs bg-[#1A1F71]/10 text-[#1A1F71] px-2 py-1 rounded-full">
            Smart Responses
          </span>
        </div>
      </motion.div>
      <WiproBranding className="mt-8" />
    </motion.div>
  );
};

export default WelcomeScreen;
