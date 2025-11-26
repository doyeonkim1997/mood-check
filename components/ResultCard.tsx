import React from 'react';
import { AuraResult } from '../types';
import { Button } from './Button';
import { Share2, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  data: AuraResult;
  onReset: () => void;
  capturedImage: string; // Base64
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, onReset, capturedImage }) => {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 분위기 분석 결과',
          text: `오늘 나의 무드는 "${data.vibeTitle}" ${data.spiritEmoji}\n#무드체크 #AI분석`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      alert("결과가 클립보드에 복사되었어요!");
      navigator.clipboard.writeText(`오늘 나의 무드: ${data.vibeTitle} ${data.spiritEmoji}`);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-[380px] bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/60 animate-fade-in-up">
        
        {/* Image Header */}
        <div className="relative h-[320px] w-full overflow-hidden">
          <img 
            src={`data:image/jpeg;base64,${capturedImage}`} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-3">
               <span className="text-[11px] font-bold tracking-wider uppercase">Today's Vibe</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight break-keep">{data.vibeTitle}</h1>
          </div>
          
          <div className="absolute top-6 right-6 text-6xl drop-shadow-lg transform hover:scale-110 transition-transform cursor-default">
            {data.spiritEmoji}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-7 space-y-8">
          
          {/* Energy Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#333D4B] font-bold text-lg">에너지 레벨</span>
              <span className="text-2xl font-extrabold" style={{ color: data.auraColorHex }}>{data.energyLevel}%</span>
            </div>
            <div className="h-4 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                style={{ width: `${data.energyLevel}%`, backgroundColor: data.auraColorHex }}
              />
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-[#F2F4F6]">
            <p className="text-[#333D4B] text-[15px] leading-relaxed break-keep font-medium">
              {data.description}
            </p>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-2.5">
            {data.hashtags.map((tag, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#4E5968] border border-[#E5E8EB] shadow-sm tracking-tight"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={handleShare} variant="primary" className="w-full flex items-center justify-center gap-2 py-4 text-[17px]">
              <Share2 size={20} strokeWidth={2.5} />
              친구에게 자랑하기
            </Button>
            <Button onClick={onReset} variant="ghost" className="w-full flex items-center justify-center gap-2 py-3 text-[#8B95A1]">
              <RefreshCw size={16} />
              다시 하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};