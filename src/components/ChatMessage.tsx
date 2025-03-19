
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex gap-3 p-4 border-b", 
        isUser ? "bg-chat-user" : "bg-chat-assistant"
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "bg-blue-500" : "bg-emerald-500")}>
        <div className="flex h-full w-full items-center justify-center">
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
        </div>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="font-semibold">{isUser ? 'You' : 'Assistant'}</div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
