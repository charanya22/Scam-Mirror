import React from 'react';

interface ScamMirrorLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onClick?: () => void;
}

export function ScamMirrorLogo({
  size = 'md',
  showTagline = false,
  layout = 'horizontal',
  className = '',
  onClick,
}: ScamMirrorLogoProps) {
  // Dimension tokens
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textDimensions = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineDimensions = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${
        layout === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Shield + Mirror Reflection + AI Cyber Element in Soft Pastel Aesthetic */}
      <div
        className={`relative ${iconDimensions[size]} shrink-0 rounded-2xl bg-white border border-[#E2E4F3] shadow-[0_4px_16px_rgba(124,131,253,0.12)] flex items-center justify-center p-1.5 transition-transform hover:scale-105`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Defs for soft pastel gradients */}
          <defs>
            <linearGradient id="pastelShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C83FD" />
              <stop offset="100%" stopColor="#8EC5FC" />
            </linearGradient>
            <linearGradient id="pastelMirrorReflect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#8EC5FC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#B8A9E8" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="pastelAiCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C83FD" />
              <stop offset="100%" stopColor="#B8A9E8" />
            </linearGradient>
          </defs>

          {/* Outer Shield Shell */}
          <path
            d="M18 3L6 8V17C6 24.5 11.2 31.4 18 33C24.8 31.4 30 24.5 30 17V8L18 3Z"
            stroke="url(#pastelShieldGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="#F0F2FF"
          />

          {/* Right-Side Mirror Reflection Pane (Glass Angle) */}
          <path
            d="M18 4.2L28 8.8V17C28 23.5 23.6 29.6 18 31.2V4.2Z"
            fill="url(#pastelMirrorReflect)"
          />

          {/* Mirror Division Center Line */}
          <line
            x1="18"
            y1="5"
            x2="18"
            y2="31"
            stroke="#7C83FD"
            strokeWidth="1.2"
            strokeDasharray="2 1.5"
            strokeOpacity="0.8"
          />

          {/* Mirror Reflection Prismatic Slits */}
          <path
            d="M21 11L25 15M20 18L26 24"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* Central AI / Cybersecurity Detection Node */}
          <circle
            cx="18"
            cy="18"
            r="3.5"
            fill="url(#pastelAiCoreGrad)"
          />
          <circle
            cx="18"
            cy="18"
            r="5.5"
            stroke="#7C83FD"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Subtle Circuit Connection Crosshairs */}
          <path
            d="M11 18H13M23 18H25M18 11V13M18 23V25"
            stroke="#7C83FD"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Soft pastel ambient glow */}
        <div className="absolute inset-0 rounded-2xl bg-[#7C83FD]/5 pointer-events-none blur-[4px]" />
      </div>

      {/* Typography: Deep Navy (#27324A) + Pastel Indigo (#7C83FD) */}
      <div className={layout === 'vertical' ? 'space-y-1' : 'space-y-0.5'}>
        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
          <span
            className={`font-mono font-extrabold tracking-tight text-[#27324A] ${textDimensions[size]}`}
          >
            Scam<span className="text-[#7C83FD]">Mirror</span>
          </span>
          <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#E2E4F3] font-semibold">
            AI
          </span>
        </div>

        {showTagline && (
          <p
            className={`font-sans text-[#68738A] font-medium tracking-normal ${taglineDimensions[size]}`}
          >
            See the manipulation. Stop the scam.
          </p>
        )}
      </div>
    </div>
  );
}
