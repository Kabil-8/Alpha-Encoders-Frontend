import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 0.5,
  borderColor = 'rgba(148, 163, 184, 0.08)',
  squareSize = 48,
  hoverFillColor = 'rgba(37, 99, 255, 0.12)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      for (let x = -squareSize; x < canvas.width + squareSize * 2; x += squareSize) {
        for (let y = -squareSize; y < canvas.height + squareSize * 2; y += squareSize) {
          const squareX = Math.round(x + offsetX - squareSize);
          const squareY = Math.round(y + offsetY - squareSize);

          if (
            hoveredSquare.current &&
            hoveredSquare.current.x === Math.floor(squareX / squareSize) &&
            hoveredSquare.current.y === Math.floor(squareY / squareSize)
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // Drift in direction
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x += effectiveSpeed;
          break;
        case 'left':
          gridOffset.current.x -= effectiveSpeed;
          break;
        case 'up':
          gridOffset.current.y -= effectiveSpeed;
          break;
        case 'down':
          // Drifts from top to bottom
          gridOffset.current.y += effectiveSpeed;
          break;
        case 'diagonal':
          gridOffset.current.x += effectiveSpeed;
          gridOffset.current.y += effectiveSpeed;
          break;
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const hoveredX = Math.floor((mouseX + (gridOffset.current.x % squareSize)) / squareSize);
      const hoveredY = Math.floor((mouseY + (gridOffset.current.y % squareSize)) / squareSize);

      hoveredSquare.current = { x: hoveredX, y: hoveredY };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block pointer-events-auto ${className}`}
    />
  );
};
