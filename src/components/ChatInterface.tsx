
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ChatMessage, { MessageType, ContentType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useToast } from "@/components/ui/use-toast";
import MastercardLogo from './MastercardLogo';
import WiproBranding, { WiproWatermark } from './WiproBranding';
import { sendMessage, sendMessageWithFile } from '@/services/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, file?: File) => {
    let userMessageContent = content;
    let userContentType: ContentType = 'text';
    
    // If there's a file, create a file message
    if (file) {
      userContentType = getFileContentType(file);
      if (userContentType === 'image') {
        userMessageContent = URL.createObjectURL(file);
      } else {
        userMessageContent = file.name;
      }
    }

    const userMessage: MessageType = {
      id: uuidv4(),
      role: 'user',
      content: userMessageContent,
      contentType: userContentType,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the Spring Boot backend API with or without file
      const responseContent = file 
        ? await sendMessageWithFile(content, file)
        : await sendMessage(content);
      
      // Determine content type based on response
      let responseType: ContentType = "text";
      
      // Check if response is an image URL
      if (responseContent.startsWith('http') && 
          (responseContent.endsWith('.jpg') || 
           responseContent.endsWith('.png') || 
           responseContent.endsWith('.gif'))) {
        responseType = "image";
      } 
      // Check if response is a JSON table
      else if (responseContent.startsWith('{') && responseContent.includes('"headers"')) {
        responseType = "table";
      } 
      // Check if response is HTML
      else if (responseContent.startsWith('<') && responseContent.includes('</')) {
        responseType = "html";
      }
      
      const assistantMessage: MessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        contentType: responseType,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFileContentType = (file: File): ContentType => {
    if (file.type.startsWith('image/')) {
      return 'image';
    }
    return 'text';
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-screen relative bg-gradient-to-b from-background to-white/80"
    >
      {/* Add Wipro watermark */}
      <WiproWatermark />
      
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
              disabled={messages.length === 0 || isLoading}
              className="border-[#1A1F71] text-[#1A1F71] hover:bg-[#1A1F71]/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {!isMobile && "Clear Chat"}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
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
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </motion.div>
  );
};

export default ChatInterface;
