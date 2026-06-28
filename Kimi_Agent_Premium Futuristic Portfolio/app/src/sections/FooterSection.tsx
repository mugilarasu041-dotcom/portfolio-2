import { useInView } from '@/hooks/useInView';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FooterSection() {
  const [ref, isInView] = useInView(0.3);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView || !contentRef.current) return;
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [isInView]);

  return (
    <footer
      ref={ref}
      className="relative py-12"
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 159, 28, 0.1)',
      }}
    >
      <div
        ref={contentRef}
        className="container-main flex flex-col md:flex-row items-center justify-between gap-4 opacity-0"
        style={{ transform: 'translateY(20px)' }}
      >
        <div className="text-small" style={{ color: '#555555' }}>
          &copy; 2026 Mugilarasu R. All rights reserved.
        </div>

        <div
          className="text-2xl font-bold gradient-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          MR
        </div>

        <div className="text-small" style={{ color: '#555555' }}>
          Designed with <span style={{ color: '#ff6b00' }}>&hearts;</span> for code
        </div>
      </div>
    </footer>
  );
}
