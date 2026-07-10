// components/ui/InteractiveWeaveCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveWeaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const threads = [
      { yOffset: 0.3, speed: 0.008, amplitude: 35, frequency: 0.005, color: 'rgba(204, 17, 17, 0.35)', width: 2 },
      { yOffset: 0.4, speed: 0.012, amplitude: 25, frequency: 0.008, color: 'rgba(212, 175, 55, 0.25)', width: 1.5 },
      { yOffset: 0.5, speed: 0.006, amplitude: 45, frequency: 0.004, color: 'rgba(204, 17, 17, 0.2)', width: 1 },
      { yOffset: 0.6, speed: 0.01, amplitude: 30, frequency: 0.007, color: 'rgba(212, 175, 55, 0.3)', width: 2 },
      { yOffset: 0.7, speed: 0.007, amplitude: 40, frequency: 0.006, color: 'rgba(251, 113, 133, 0.15)', width: 1.2 },
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      t += 0.5;

      threads.forEach((thread) => {
        ctx.beginPath();
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width;
        const baseHeight = height * thread.yOffset;

        for (let x = 0; x < width; x += 4) {
          let y = baseHeight + Math.sin(x * thread.frequency + t * thread.speed) * thread.amplitude;
          if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
            const dx = x - mouse.x;
            const dist = Math.sqrt(dx * dx + (y - mouse.y) * (y - mouse.y));
            if (dist < 180) {
              const pull = (180 - dist) / 180;
              y += (mouse.y - y) * pull * 0.45;
            }
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 1 }}
    />
  );
}
