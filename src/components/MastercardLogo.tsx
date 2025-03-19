
import React from 'react';

const MastercardLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex items-center">
        <div className="w-6 h-6 bg-[#EB001B] rounded-full opacity-90"></div>
        <div className="w-6 h-6 bg-[#F79E1B] rounded-full ml-[-10px] opacity-90"></div>
        <div className="w-4 h-4 rounded-full absolute left-[8px] mix-blend-overlay bg-[#FF5F00]"></div>
      </div>
      <span className="ml-2 font-bold text-[#1A1F71]">Mastercard</span>
    </div>
  );
};

export default MastercardLogo;
