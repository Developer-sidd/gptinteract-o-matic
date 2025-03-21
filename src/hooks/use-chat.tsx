
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import { sendMessage, sendMessageWithFile } from '@/services/apiService';
import { MessageType, ContentType } from '@/components/ChatMessage';

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const getFileContentType = (file: File): ContentType => {
    if (file.type.startsWith('image/')) {
      return 'image';
    }
    return 'text';
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

  const handleClearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    handleClearChat
  };
};
