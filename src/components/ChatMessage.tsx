
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ContentRenderer from './ContentRenderer';

export type ContentType = 'text' | 'image' | 'html' | 'table';

export type MessageType = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  contentType: ContentType;
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
      <Avatar className={cn("h-8 w-8", isUser ? "bg-blue-500" : "bg-[#1EAEDB]")}>
        <div className="flex h-full w-full items-center justify-center">
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
        </div>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="font-semibold">{isUser ? 'You' : 'Mastercard Assistant'}</div>
        <ContentRenderer content={message.content} type={message.contentType} />
      </div>
    </div>
  );
};

export default ChatMessage;
