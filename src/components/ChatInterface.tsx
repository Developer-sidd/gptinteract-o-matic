
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useToast } from "@/components/ui/use-toast";

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
      content,
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
      
      const assistantMessage: MessageType = {
        id: uuidv4(),
        role: 'assistant',
        // Replace with data.response from actual API
        content: `I'm a simulated response to: "${content}"\n\nWhen connected to the Spring Boot backend, I'll provide real responses. Please implement the backend API at http://localhost:8080/api/chat to handle these requests.`,
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
          <h1 className="text-xl font-bold">GPT Clone</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearChat}
            disabled={messages.length === 0 || isLoading}
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
              <h2 className="text-2xl font-bold mb-2">Welcome to GPT Clone</h2>
              <p className="text-muted-foreground mb-6">Ask me anything to start a conversation</p>
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
