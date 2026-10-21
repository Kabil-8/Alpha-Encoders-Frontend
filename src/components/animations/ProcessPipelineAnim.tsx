import React, { useEffect, useRef } from 'react';

interface ProcessPipelineAnimProps {
  className?: string;
}

export const ProcessPipelineAnim: React.FC<ProcessPipelineAnimProps> = ({ className = '' }) => {
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

    // Pipeline pulses traveling through vertical and horizontal conduits
    const pulseCount = 14;
    const pulses = Array.from({ length: pulseCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 1.2 + Math.random() * 2,
      length: 25 + Math.random() * 35,
      direction: Math.random() > 0.5 ? 'h' : 'v'
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Draw faint technical circuit conduits
      ctx.strokeStyle = 'rgba(37, 99, 255, 0.08)';
      ctx.lineWidth = 1;

      // Vertical bus lines
      for (let x = 60; x < width; x += 180) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal bus lines
      for (let y = 100; y < height; y += 220) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw traveling pulses
      pulses.forEach((p) => {
        if (p.direction === 'h') {
          p.x += p.speed;
          if (p.x > width + 50) p.x = -50;

          const grad = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
          grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
          grad.addColorStop(1, 'rgba(34, 211, 238, 0.85)');

          ctx.beginPath();
          ctx.moveTo(p.x - p.length, p.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.shadowColor = '#22D3EE';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          p.y += p.speed;
          if (p.y > height + 50) p.y = -50;

          const grad = ctx.createLinearGradient(p.x, p.y - p.length, p.x, p.y);
          grad.addColorStop(0, 'rgba(37, 99, 255, 0)');
          grad.addColorStop(1, 'rgba(37, 99, 255, 0.85)');

          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.length);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.shadowColor = '#2563FF';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
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
      <canvas ref={canvasRef} className="w-full h-full block opacity-60" />
    </div>
  );
};
