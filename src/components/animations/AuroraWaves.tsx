import React, { useEffect, useRef } from 'react';

interface AuroraWavesProps {
  className?: string;
}

export const AuroraWaves: React.FC<AuroraWavesProps> = ({ className = '' }) => {
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

    const waves = [
      { y: 0.28, length: 0.0028, amplitude: 45, speed: 0.012, color: 'rgba(34, 211, 238, 0.16)' },
      { y: 0.38, length: 0.0022, amplitude: 55, speed: -0.015, color: 'rgba(37, 99, 255, 0.20)' },
      { y: 0.52, length: 0.0035, amplitude: 65, speed: 0.018, color: 'rgba(99, 102, 241, 0.14)' },
      { y: 0.70, length: 0.0025, amplitude: 40, speed: -0.011, color: 'rgba(34, 211, 238, 0.12)' },
      { y: 0.82, length: 0.0030, amplitude: 50, speed: 0.014, color: 'rgba(59, 130, 246, 0.15)' }
    ];

    let step = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      step += 1;

      waves.forEach((w) => {
        ctx.beginPath();
        const baseH = height * w.y;

        for (let x = 0; x <= width; x += 8) {
          const y = baseH + Math.sin(x * w.length + step * w.speed) * w.amplitude +
                    Math.cos(x * 0.001 + step * (w.speed * 0.5)) * 20;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
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
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
};
