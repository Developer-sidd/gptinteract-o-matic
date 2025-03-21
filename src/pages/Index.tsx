
import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative"
    >
      <title>Mastercard Assistant | Your Personal Financial Guide</title>
      <ChatInterface />
    </motion.div>
  );
};

export default Index;
