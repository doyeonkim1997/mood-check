import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-6 py-4 rounded-[22px] font-bold transition-all duration-300 transform active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-[17px] tracking-tight flex items-center justify-center";
  
  const variants = {
    // Lighter, Softer Sky Blue Gradient
    primary: "bg-gradient-to-r from-[#7AB0FF] to-[#A0C9FF] text-white hover:to-[#7AB0FF] shadow-[0_10px_25px_rgba(122,176,255,0.4)] hover:shadow-[0_15px_35px_rgba(122,176,255,0.5)] border border-white/30 ring-1 ring-white/40",
    
    // Soft secondary
    secondary: "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB] border border-transparent",
    
    // Ghost
    ghost: "bg-transparent text-[#8B95A1] hover:text-[#4E5968] hover:bg-black/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Shine effect overlay for primary buttons */}
      {variant === 'primary' && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      )}

      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          분석 중...
        </span>
      ) : children}
    </button>
  );
};