import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'AI Automation',
  'Prompt Engineering',
  'Portfolio Website Development',
  'AI Chatbot Development',
  'Web Development',
  'Java Projects',
  'Python Projects',
  'AI Video Editing',
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = listRef.current?.querySelectorAll('.service-row');
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
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
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32">
      <div className="container-main">
        <SectionHeader
          label="WHAT I DO"
          heading="Services"
          description="From AI automation to full-stack development, I deliver solutions that drive results."
        />

        <div ref={listRef} className="mt-16">
          {services.map((service, i) => (
            <div
              key={service}
              className="service-row group cursor-pointer opacity-0"
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 159, 28, 0.02)';
                e.currentTarget.style.borderBottomColor = 'rgba(255, 159, 28, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div className="flex items-center justify-between py-8 px-4">
                <div className="flex items-center gap-4">
                  <ChevronRight
                    size={24}
                    className="opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#ff9f1c]"
                    style={{ color: '#ff9f1c' }}
                  />
                  <span
                    className="transition-all duration-300 group-hover:text-[#ff9f1c] group-hover:translate-x-2.5"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service}
                  </span>
                </div>
                <span
                  className="text-label transition-colors duration-300 group-hover:text-[#ff9f1c]"
                  style={{ color: '#555555' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
