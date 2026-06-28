import { useInView } from '@/hooks/useInView';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, heading, description, centered = false }: SectionHeaderProps) {
  const [ref, isInView] = useInView(0.2);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const tl = gsap.timeline();
    tl.to(labelRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to(headingRef.current, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    return () => { tl.kill(); };
  }, [isInView]);

  return (
    <div ref={ref} className={centered ? 'text-center' : ''}>
      <div
        ref={labelRef}
        className={`text-label inline-block opacity-0 ${centered ? '' : 'border-l-2 pl-4'}`}
        style={{
          color: '#ff9f1c',
          borderColor: '#ff9f1c',
          transform: centered ? 'translateY(20px)' : 'translateX(-20px)',
        }}
      >
        {label}
      </div>
      <h2
        ref={headingRef}
        className="text-h1 mt-4 opacity-0"
        style={{ color: '#ffffff', transform: 'translateY(20px)' }}
      >
        {heading}
      </h2>
      {description && (
        <p
          ref={descRef}
          className="text-body mt-6 opacity-0 mx-auto"
          style={{ color: '#a0a0a0', maxWidth: '600px', transform: 'translateY(20px)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
