
import React, { useState, KeyboardEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if ((inputValue.trim() || selectedFile) && !isLoading) {
      onSendMessage(inputValue, selectedFile || undefined);
      setInputValue('');
      setSelectedFile(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-t bg-background sticky bottom-0 shadow-md">
      <div className="max-w-3xl mx-auto">
        {selectedFile && (
          <div className="flex items-center mb-2 p-2 bg-slate-100 rounded-md">
            <span className="text-sm truncate max-w-[90%]">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFile(null)}
              className="ml-auto"
            >
              ✕
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={triggerFileInput}
            variant="outline"
            size="icon"
            type="button"
            className="border-[#1A1F71] text-[#1A1F71] hover:bg-[#1A1F71]/10"
            disabled={isLoading}
          >
            <Paperclip size={18} />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Mastercard Assistant..."
            className="resize-none min-h-[50px] max-h-[200px]"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={(!inputValue.trim() && !selectedFile) || isLoading} 
            size="icon"
            className="bg-[#1A1F71] hover:bg-[#1A1F71]/90"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
