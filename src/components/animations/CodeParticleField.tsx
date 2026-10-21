import React, { useEffect, useRef } from 'react';

interface CodeParticleFieldProps {
  className?: string;
}

export const CodeParticleField: React.FC<CodeParticleFieldProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const tokens = [
      '{ TypeScript }',
      '<React.FC />',
      'async / await',
      'const Studio = new Alpha()',
      'git commit -m "ship"',
      'npm run build',
      'Three.js / WebGL',
      'status: 200 OK',
      'Docker container',
      'REST API :9000',
      'TailwindCSS v4',
      'Framer Motion',
      'JWT.verify()',
      'Lighthouse 100%'
    ];

    const particles = Array.from({ length: 22 }, () => ({
      text: tokens[Math.floor(Math.random() * tokens.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -0.35 - Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.2,
      opacity: 0.15 + Math.random() * 0.25,
      size: 10 + Math.floor(Math.random() * 3),
      color: Math.random() > 0.5 ? '#22D3EE' : '#60A5FA'
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.font = `${p.size}px "Share Tech Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.text, p.x, p.y);
        ctx.globalAlpha = 1;
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
};
