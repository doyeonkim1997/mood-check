import React, { useRef, useEffect, useState } from 'react';
    import { X, SwitchCamera, Upload, Camera as CameraIcon } from 'lucide-react';
    import { Button } from './Button';
    
    interface CameraProps {
      onCapture: (base64Image: string) => void;
      onClose: () => void;
    }
    
    export const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
      const videoRef = useRef<HTMLVideoElement>(null);
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const [stream, setStream] = useState<MediaStream | null>(null);
      const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
      const [error, setError] = useState<string>('');
    
      const startCamera = async () => {
        try {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facingMode },
            audio: false,
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setError('');
        } catch (err) {
          console.error("Camera Error:", err);
          setError('카메라를 실행할 수 없어요. 권한을 확인해주세요.');
        }
      };
    
      useEffect(() => {
        startCamera();
        return () => {
          if (stream) stream.getTracks().forEach(track => track.stop());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [facingMode]);
    
      const capture = () => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Flip horizontally if using front camera for mirror effect
            if (facingMode === 'user') {
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
            }
            ctx.drawImage(video, 0, 0);
            // Reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            const base64 = dataUrl.split(',')[1];
            onCapture(base64);
          }
        }
      };
    
      const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            onCapture(base64);
          };
          reader.readAsDataURL(file);
        }
      };
    
      return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          {error ? (
            <div className="text-center p-6 bg-white rounded-2xl mx-4">
              <p className="text-[#333D4B] mb-4 font-medium">{error}</p>
              <Button onClick={onClose} variant="secondary">돌아가기</Button>
            </div>
          ) : (
            <>
              <div className="relative w-full h-full md:max-w-md bg-black overflow-hidden flex flex-col">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={`w-full h-full object-cover flex-1 ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />
                
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pt-12 md:pt-6">
                  <button onClick={onClose} className="p-3 bg-black/20 rounded-full backdrop-blur-md">
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
                    className="p-3 bg-black/20 rounded-full backdrop-blur-md"
                  >
                    <SwitchCamera className="w-6 h-6 text-white" />
                  </button>
                </div>
    
                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-around items-center bg-gradient-to-t from-black/60 to-transparent pb-16">
                   {/* Upload Button */}
                   <div className="relative flex flex-col items-center gap-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-md">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
    
                  {/* Shutter Button */}
                  <button 
                    onClick={capture}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-95 bg-white/20"
                  >
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg" />
                  </button>
                  
                  {/* Spacer to balance layout */}
                  <div className="w-14" />
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </>
          )}
        </div>
      );
    };