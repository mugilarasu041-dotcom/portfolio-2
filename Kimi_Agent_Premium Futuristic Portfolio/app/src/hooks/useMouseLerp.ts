import { useEffect, useRef } from 'react';

interface MousePos {
  x: number;
  y: number;
}

export function useMouseLerp(factor: number = 0.08): React.MutableRefObject<MousePos> {
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });
  const targetRef = useRef<MousePos>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * factor;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * factor;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [factor]);

  return mouseRef;
}
