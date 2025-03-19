
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center p-4 border-b bg-chat-assistant">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-[#1A1F71] font-medium">Mastercard Assistant is typing</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-[#EB001B] animate-typing-dot-1"></div>
          <div className="w-2 h-2 rounded-full bg-[#F79E1B] animate-typing-dot-2"></div>
          <div className="w-2 h-2 rounded-full bg-[#1A1F71] animate-typing-dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
