import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ChatMessage, { MessageType, ContentType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useToast } from "@/components/ui/use-toast";
import MastercardLogo from './MastercardLogo';

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
      // TODO: Replace with actual backend API call
      // This is where you would call your Spring Boot backend
      // const response = await fetch('http://localhost:8080/api/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message: content }),
      // });
      
      // if (!response.ok) throw new Error('Failed to get response from server');
      // const data = await response.json();
      
      // Simulate API response for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example response with different content types based on user input
      let responseContent: string = "";
      let responseType: ContentType = "text";
      
      if (content.toLowerCase().includes("image") || content.toLowerCase().includes("picture")) {
        responseContent = "https://picsum.photos/400/300";
        responseType = "image";
      } else if (content.toLowerCase().includes("table")) {
        responseContent = JSON.stringify({
          headers: ["Card Type", "Annual Fee", "Rewards Rate", "Welcome Bonus"],
          rows: [
            ["Mastercard World Elite", "$395", "5%", "60,000 points"],
            ["Mastercard World", "$120", "3%", "30,000 points"],
            ["Mastercard Platinum", "$0", "1%", "10,000 points"]
          ]
        });
        responseType = "table";
      } else if (content.toLowerCase().includes("html")) {
        responseContent = "<div style='color: #1EAEDB; font-weight: bold;'>This is <em>formatted</em> HTML content from Mastercard Assistant</div>";
        responseType = "html";
      } else {
        responseContent = `I'm the Mastercard Assistant. I can help you with information about Mastercard products, services, and more. I can display various content types including images, tables, and formatted text.\n\nTo see examples, try asking me about:\n• Mastercard products (with "table")\n• Show me an image\n• Show HTML content`;
        responseType = "text";
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
