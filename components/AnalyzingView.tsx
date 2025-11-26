import React from 'react';

export const AnalyzingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative">
      <div className="relative mb-10">
        {/* Animated rings */}
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20 blur-xl delay-75"></div>
        <div className="absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-20 blur-xl delay-150" style={{ animationDuration: '3s' }}></div>
        
        {/* Center Spinner */}
        <div className="relative w-28 h-28">
           <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3182F6] border-r-[#9B82F6] animate-spin" style={{ animationDuration: '1.5s' }}></div>
           <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#FF8E9E] border-l-[#FFC85C] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
           
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-4xl animate-bounce">✨</span>
           </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-[#191F28] mb-3 animate-pulse">
        분위기를 읽고 있어요
      </h2>
      <p className="text-[#6B7684] text-[15px] font-medium leading-relaxed">
        잠시만 기다려주세요.<br/>
        AI가 매력을 분석 중이에요.
      </p>
    </div>
  );
};