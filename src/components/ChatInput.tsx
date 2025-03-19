
import React, { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t bg-background sticky bottom-0 shadow-md">
      <div className="flex gap-2 max-w-3xl mx-auto">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="resize-none min-h-[50px] max-h-[200px]"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!inputValue.trim() || isLoading} 
          size="icon"
          variant="default"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
