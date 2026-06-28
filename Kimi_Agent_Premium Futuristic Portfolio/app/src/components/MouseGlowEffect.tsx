import { useMouseLerp } from '@/hooks/useMouseLerp';
import { useEffect, useState } from 'react';

export default function MouseGlowEffect() {
  const mouseRef = useMouseLerp(0.08);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    const update = () => {
      setPos({ x: mouseRef.current.x, y: mouseRef.current.y });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef]);

  return (
    <div
      className="fixed pointer-events-none z-[1] hidden md:block"
      style={{
        width: '600px',
        height: '600px',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255, 159, 28, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'left, top',
      }}
    />
  );
}
