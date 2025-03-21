
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion } from 'framer-motion';
import MastercardLogo from './MastercardLogo';
import WiproBranding from './WiproBranding';

interface ChatHeaderProps {
  handleClearChat: () => void;
  hasMessages: boolean;
  isLoading: boolean;
  isMobile: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  handleClearChat, 
  hasMessages, 
  isLoading,
  isMobile 
}) => {
  return (
    <header className="bg-background/80 backdrop-blur-sm p-4 border-b sticky top-0 z-10">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <MastercardLogo className="mr-3" />
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-[#1A1F71]"
          >
            Mastercard Assistant
          </motion.h1>
        </div>
        <div className="flex items-center gap-2">
          <WiproBranding className={isMobile ? "hidden sm:flex" : ""} />
          <Button 
            variant="outline" 
            size={isMobile ? "icon" : "sm"}
            onClick={handleClearChat}
            disabled={!hasMessages || isLoading}
            className="border-[#1A1F71] text-[#1A1F71] hover:bg-[#1A1F71]/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {!isMobile && "Clear Chat"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
