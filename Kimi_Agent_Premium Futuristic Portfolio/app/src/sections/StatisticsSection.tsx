import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: '+', label: 'Certificates' },
  { value: 20, suffix: '+', label: 'Technologies Learned' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const [settled, setSettled] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const scrambleFrames = 30; // frames of scrambling
    const totalFrames = 45;

    const animate = () => {
      frame++;

      if (frame <= scrambleFrames) {
        // Scramble phase: show random digits
        const randomVal = Math.floor(Math.random() * target * 1.5);
        setDisplay(randomVal);
      } else if (frame <= totalFrames) {
        // Settle phase: ease toward target
        const progress = (frame - scrambleFrames) / (totalFrames - scrambleFrames);
        const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
        setDisplay(Math.round(target * eased));
      } else {
        setDisplay(target);
        setSettled(true);
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Delay start slightly
    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target]);

  return (
    <span
      style={{
        textShadow: settled
          ? '0 0 40px rgba(255, 159, 28, 0.2)'
          : '0 0 60px rgba(255, 159, 28, 0.4)',
        transition: 'text-shadow 0.5s ease',
      }}
    >
      {display}{suffix}
    </span>
  );
}

export default function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => setInView(true),
        once: true,
      });

      const statEls = statsRef.current?.querySelectorAll('.stat-item');
      if (statEls) {
        gsap.fromTo(
          statEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="relative py-24 md:py-32">
      <div className="container-main text-center">
        <SectionHeader
          label="TRACK RECORD"
          heading="Numbers That Speak"
          centered
        />

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item opacity-0">
              <div
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div
                className="mx-auto mt-4"
                style={{
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(135deg, #ff9f1c 0%, #ff6b00 50%, #ffb627 100%)',
                }}
              />
              <div className="text-label mt-4" style={{ color: '#a0a0a0' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient glow behind numbers */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(255, 159, 28, 0.03) 0%, transparent 70%)',
          animation: 'statGlow 4s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes statGlow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </section>
  );
}
