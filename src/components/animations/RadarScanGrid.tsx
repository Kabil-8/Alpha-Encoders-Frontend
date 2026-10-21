import React, { useEffect, useRef } from 'react';

interface RadarScanGridProps {
  className?: string;
}

export const RadarScanGrid: React.FC<RadarScanGridProps> = ({ className = '' }) => {
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

    // Static project blips around center
    const blips = [
      { angle: 0.45, dist: 160, label: 'TheCustomNest · 0.38s FCP' },
      { angle: 1.25, dist: 220, label: 'JavaLearn · 99 Perf' },
      { angle: 2.15, dist: 190, label: 'EduSphere · 100 SEO' },
      { angle: 3.40, dist: 260, label: 'FlowBoard · WebSockets' },
      { angle: 4.60, dist: 140, label: 'SpendWise AI · Claude 3.5' },
      { angle: 5.30, dist: 210, label: 'EmoLearn · FastAPI' }
    ];

    let angle = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.42;

      // Draw concentric radar rings
      const radii = [80, 160, 240, 320, 420];
      radii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(34, 211, 238, 0.12)' : 'rgba(37, 99, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 450, cy);
      ctx.lineTo(cx + 450, cy);
      ctx.moveTo(cx, cy - 450);
      ctx.lineTo(cx, cy + 450);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.07)';
      ctx.stroke();

      // Radar sweep cone
      angle += 0.015;
      const sweepGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 420);
      sweepGradient.addColorStop(0, 'rgba(34, 211, 238, 0.25)');
      sweepGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 420, angle - 0.4, angle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 420, cy + Math.sin(angle) * 420);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw project blips
      blips.forEach((b) => {
        const bx = cx + Math.cos(b.angle) * b.dist;
        const by = cy + Math.sin(b.angle) * b.dist;

        // Check sweep proximity for pulse
        const diff = Math.abs(((b.angle - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2));
        const isHit = diff < 0.4;

        ctx.beginPath();
        ctx.arc(bx, by, isHit ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isHit ? '#22D3EE' : 'rgba(37, 99, 255, 0.7)';
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = isHit ? 14 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (isHit) {
          ctx.beginPath();
          ctx.arc(bx, by, 12, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
          ctx.stroke();

          ctx.font = '10px "Share Tech Mono", monospace';
          ctx.fillStyle = '#22D3EE';
          ctx.fillText(b.label, bx + 10, by - 4);
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
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
};
