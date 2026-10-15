import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${
        disabled
          ? 'text-white'
          : 'bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-200 bg-[200%_auto] animate-[shine_linear_infinite]'
      } ${className}`}
      style={{
        animationDuration: disabled ? 'none' : animationDuration,
        backgroundImage: disabled
          ? 'none'
          : 'linear-gradient(120deg, rgba(245,248,255,0.7) 0%, rgba(34,211,238,1) 40%, rgba(245,248,255,0.9) 60%, rgba(37,99,255,0.8) 100%)',
        backgroundSize: '200% auto',
      }}
    >
      {text}
    </span>
  );
};
