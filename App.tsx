import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { AnalyzingView } from './components/AnalyzingView';
import { ResultCard } from './components/ResultCard';
import { Button } from './components/Button';
import { AppState, AuraResult } from './types';
import { analyzeAura } from './services/geminiService';
import { Sparkles, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AuraResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleStart = () => {
    setAppState(AppState.CAMERA);
    setError('');
  };

  const handleCapture = async (base64Image: string) => {
    setCapturedImage(base64Image);
    setAppState(AppState.ANALYZING);
    try {
      const data = await analyzeAura(base64Image);
      setResult(data);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("분석에 실패했어요. 다시 시도해볼까요?");
      setAppState(AppState.IDLE);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCapturedImage('');
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen bg-white text-[#191F28] relative overflow-hidden">
      
      {/* Aurora Background (Global) - Reduced Opacity for better text contrast */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[#E0E7FF] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
        <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-[#F3E8FF] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#FFE4E6] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {appState === AppState.IDLE && (
          <div className="flex flex-col items-center justify-center min-h-screen p-6 py-12">
            <div className="flex flex-col items-center text-center max-w-lg w-full">
              
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-white/50 animate-fade-in-down">
                <Sparkles className="w-3.5 h-3.5 text-[#7AB0FF]" />
                <span className="text-[13px] font-bold text-[#333D4B] tracking-tight">AI 퍼스널 무드 분석</span>
              </div>
              
              {/* Title Area - Removed Glass Backdrop */}
              <div className="relative mb-10">
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] text-[#191F28] mb-6 break-keep">
                  오늘 나의 분위기,<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AB0FF] to-[#9B82F6]">
                    어떤 색일까요?
                  </span>
                </h1>
                
                <p className="text-[#4E5968] text-[17px] leading-relaxed font-bold break-keep">
                  AI가 표정과 스타일을 분석해<br/>
                  나만의 <span className="text-[#333D4B] text-lg">무드 리포트</span>를 만들어드려요.
                </p>
              </div>

              {/* Preview Card Section */}
              <div className="relative w-[280px] mb-12 group cursor-default perspective-[1000px]">
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 text-4xl animate-bounce delay-700 pointer-events-none">✨</div>
                  <div className="absolute -bottom-2 -left-8 text-3xl animate-bounce delay-100 pointer-events-none">🎨</div>

                  {/* Card Body */}
                  <div className="relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-[28px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rotate-[-3deg] transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-105 group-hover:shadow-[0_25px_60px_rgba(122,176,255,0.15)]">
                       
                       {/* Card Header */}
                       <div className="flex items-center gap-3 mb-5">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9E9E] to-[#FFC85C] flex items-center justify-center text-2xl shadow-sm">
                              🍑
                           </div>
                           <div className="text-left">
                               <div className="text-[10px] font-bold text-[#8B95A1] uppercase tracking-wide mb-0.5">PREVIEW</div>
                               <div className="text-[15px] font-bold text-[#333D4B]">인간 복숭아 그 자체</div>
                           </div>
                       </div>
                       
                       {/* Energy Bar Mockup */}
                       <div className="space-y-2 mb-5">
                           <div className="flex justify-between text-xs font-bold">
                               <span className="text-[#6B7684]">상큼 에너지</span>
                               <span className="text-[#FF9E9E]">92%</span>
                           </div>
                           <div className="h-2.5 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
                               <div className="h-full w-[92%] bg-gradient-to-r from-[#FF9E9E] to-[#FFC85C] rounded-full" />
                           </div>
                       </div>

                       {/* Description Mockup */}
                       <div className="bg-white/50 rounded-xl p-3 mb-4 text-left border border-white/50">
                          <p className="text-[12px] text-[#4E5968] leading-relaxed font-medium line-clamp-2">
                             "주변까지 환하게 밝히는 과즙미가 넘쳐요! 웃을 때 올라가는 입꼬리가 매력 포인트 🥰"
                          </p>
                       </div>

                       {/* Tags Mockup */}
                       <div className="flex gap-2 justify-start">
                           <span className="px-2.5 py-1.5 bg-white rounded-lg text-[10px] font-bold text-[#5E6C84] shadow-sm border border-gray-100">#확신의상큼상</span>
                           <span className="px-2.5 py-1.5 bg-white rounded-lg text-[10px] font-bold text-[#5E6C84] shadow-sm border border-gray-100">#인간비타민</span>
                       </div>
                  </div>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium w-full animate-bounce">
                  {error}
                </div>
              )}

              <div className="w-full max-w-xs flex flex-col items-center gap-4">
                <Button onClick={handleStart} className="w-full text-[18px]">
                  3초만에 분석 시작하기
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 text-[#8B95A1] opacity-80">
                  <ShieldCheck size={13} />
                  <p className="text-[11px] font-medium tracking-tight">
                    촬영된 사진은 어디에도 저장되지 않고 분석 즉시 삭제돼요
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {appState === AppState.CAMERA && (
          <Camera onCapture={handleCapture} onClose={() => setAppState(AppState.IDLE)} />
        )}

        {appState === AppState.ANALYZING && (
          <AnalyzingView />
        )}

        {appState === AppState.RESULT && result && (
          <ResultCard data={result} onReset={handleReset} capturedImage={capturedImage} />
        )}
      </div>
    </div>
  );
};

export default App;