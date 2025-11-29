import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3550e0" />
          <stop offset="100%" stopColor="#7a9df6" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" rx="20" stroke="url(#logoGradient)" strokeWidth="4" className="opacity-80" />
      <path d="M30 70V30L50 55L70 30V70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="20" r="5" fill="#3550e0" className="animate-pulse" />
    </svg>
  );
};