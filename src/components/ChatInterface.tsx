
import React from 'react';
import { motion } from 'framer-motion';
import ChatInput from './ChatInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChat } from '@/hooks/use-chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import { WiproWatermark } from './WiproBranding';

const ChatInterface: React.FC = () => {
  const isMobile = useIsMobile();
  const { messages, isLoading, handleSendMessage, handleClearChat } = useChat();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-screen relative bg-gradient-to-b from-background to-white/80"
    >
      {/* Enhanced Wipro watermark */}
      <WiproWatermark />
      
      <ChatHeader 
        handleClearChat={handleClearChat}
        hasMessages={messages.length > 0}
        isLoading={isLoading}
        isMobile={isMobile}
      />
      
      <MessageList 
        messages={messages}
        isLoading={isLoading}
      />

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />
    </motion.div>
  );
};

export default ChatInterface;
