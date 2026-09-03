'use client';
import { useRef, useState } from 'react';
export default function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ x: (py - 0.5) * -8, y: (px - 0.5) * 8 });
  };
  const onLeave = () => setT({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(1000px) rotateX(${t.x}deg) rotateY(${t.y}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.4s ease' }}
      className={className}
    >
      {children}
    </div>
  );
}
