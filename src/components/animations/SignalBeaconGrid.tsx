import React, { useEffect, useRef } from 'react';

interface SignalBeaconGridProps {
  className?: string;
}

export const SignalBeaconGrid: React.FC<SignalBeaconGridProps> = ({ className = '' }) => {
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

    // Expanding radio transmission wave rings
    const waves = [
      { r: 20, speed: 0.8 },
      { r: 80, speed: 0.8 },
      { r: 140, speed: 0.8 },
      { r: 200, speed: 0.8 },
      { r: 260, speed: 0.8 },
      { r: 320, speed: 0.8 }
    ];

    const maxR = 380;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const beaconX = width > 900 ? width * 0.72 : width / 2;
      const beaconY = height * 0.35;

      // Draw beacon core
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw expanding waves
      waves.forEach((w) => {
        w.r += w.speed;
        if (w.r > maxR) w.r = 10;

        const opacity = Math.max(0, (1 - w.r / maxR) * 0.45);
        ctx.beginPath();
        ctx.arc(beaconX, beaconY, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Ambient telemetry text
      ctx.font = '10px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
      ctx.fillText('DIRECT COMMS CHANNEL // ENCRYPTED', beaconX - 110, beaconY + 36);
      ctx.fillText('LOC: 10.66° N, 77.00° E // POLLACHI', beaconX - 110, beaconY + 52);
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
