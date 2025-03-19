import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ChatMessage, { MessageType, ContentType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useToast } from "@/components/ui/use-toast";
import MastercardLogo from './MastercardLogo';
import { sendMessage } from '@/services/apiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: MessageType = {
      id: uuidv4(),
      role: 'user',
      content: content,
      contentType: 'text',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the Spring Boot backend API
      const responseContent = await sendMessage(content);
      
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

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background p-4 border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <MastercardLogo className="mr-3" />
            <h1 className="text-xl font-bold text-[#1A1F71]">Mastercard Assistant</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearChat}
            disabled={messages.length === 0 || isLoading}
            className="border-[#1A1F71] text-[#1A1F71] hover:bg-[#1A1F71]/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MastercardLogo className="mb-4 scale-150" />
              <h2 className="text-2xl font-bold mb-2 text-[#1A1F71]">Welcome to Mastercard Assistant</h2>
              <p className="text-muted-foreground mb-6">Ask me about Mastercard products, services, or request different types of content</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </>
          )}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
