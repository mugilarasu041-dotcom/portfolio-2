import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    })
      .to(logoRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '-=0.1'
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div
        ref={logoRef}
        className="text-hero gradient-text font-bold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        MR
      </div>
      <div className="mt-8 w-[200px] h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: 'linear-gradient(135deg, #ff9f1c 0%, #ff6b00 50%, #ffb627 100%)',
          }}
        />
      </div>
    </div>
  );
}
