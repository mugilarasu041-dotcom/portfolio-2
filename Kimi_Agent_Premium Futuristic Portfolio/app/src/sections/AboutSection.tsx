import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait parallax
      gsap.to(portraitRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Horizontal rule draw
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ruleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text paragraphs
      const paragraphs = textRef.current?.querySelectorAll('.about-para');
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
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
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container-main">
        <SectionHeader
          label="ABOUT ME"
          heading="Crafting the Future with Code & AI"
        />

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-24 mt-16">
          {/* Portrait Frame */}
          <div ref={portraitRef} className="relative">
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{ aspectRatio: '3/4', border: '1px solid rgba(255, 159, 28, 0.2)' }}
            >
              {/* Corner accents */}
              {[
                'top-2.5 left-2.5 border-t-2 border-l-2',
                'top-2.5 right-2.5 border-t-2 border-r-2',
                'bottom-2.5 left-2.5 border-b-2 border-l-2',
                'bottom-2.5 right-2.5 border-b-2 border-r-2',
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute w-[30px] h-[30px] rounded-sm ${pos}`}
                  style={{
                    borderColor: '#ff9f1c',
                    opacity: 0.5,
                    animation: 'cornerPulse 3s ease-in-out infinite',
                  }}
                />
              ))}
              <img
                src="/assets/portrait.png"
                alt="Mugilarasu R portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef}>
            <div
              ref={ruleRef}
              className="w-20 h-0.5 mb-8 origin-left"
              style={{
                background: 'linear-gradient(135deg, #ff9f1c 0%, #ff6b00 50%, #ffb627 100%)',
                transform: 'scaleX(0)',
              }}
            />

            <p className="about-para text-body" style={{ color: '#a0a0a0', maxWidth: '600px' }}>
              I am Mugilarasu R, an ambitious Computer Science student with a relentless passion
              for Artificial Intelligence, Prompt Engineering, and Full Stack Development. I
              specialize in creating intelligent digital solutions through vibe coding — blending
              creativity with cutting-edge AI tools to build applications that matter. My expertise
              spans AI automation, chatbot development, and building responsive web experiences that
              combine beautiful design with powerful functionality. I believe in the transformative
              power of technology and am dedicated to pushing the boundaries of what&apos;s possible
              with code.
            </p>

            <p
              className="about-para text-body mt-6"
              style={{ color: '#555555', maxWidth: '600px' }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring the latest AI tools, creating
              video content, or experimenting with new automation workflows. I&apos;m always
              learning, always building.
            </p>

            <p
              className="mt-12 text-right"
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: 'rgba(255, 159, 28, 0.4)',
              }}
            >
              Mugilarasu R
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
