
import React, { useState, KeyboardEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import VoiceInput from './VoiceInput';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if ((inputValue.trim() || selectedFile) && !isLoading) {
      onSendMessage(inputValue, selectedFile || undefined);
      setInputValue('');
      setSelectedFile(null);
      
      // If we're listening, stop
      if (isListening) {
        setIsListening(false);
      }
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

  const handleVoiceTranscript = (text: string) => {
    setInputValue((prev) => (prev ? `${prev} ${text}` : text));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border-t bg-background sticky bottom-0 shadow-md backdrop-blur-sm z-10"
    >
      <div className="max-w-3xl mx-auto">
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center mb-2 p-2 bg-slate-100 rounded-md"
          >
            <span className="text-sm truncate max-w-[90%]">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFile(null)}
              className="ml-auto"
            >
              ✕
            </Button>
          </motion.div>
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
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
          
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Ask Mastercard Assistant..."}
            className="resize-none min-h-[50px] max-h-[200px] flex-1"
            disabled={isLoading}
          />
          
          <VoiceInput 
            onTranscript={handleVoiceTranscript} 
            isListening={isListening}
            setIsListening={setIsListening}
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
    </motion.div>
  );
};

export default ChatInput;
