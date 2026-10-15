import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-3.5 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient-blue inline-block">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
