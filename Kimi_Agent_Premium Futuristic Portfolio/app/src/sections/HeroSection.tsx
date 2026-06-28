import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Briefcase, Download, Mail, Github, Linkedin } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import GradientButton from '@/components/GradientButton';
import GhostButton from '@/components/GhostButton';

interface HeroSectionProps {
  isLoaded: boolean;
}

const roles = [
  'Computer Science Student',
  'AI Developer',
  'Prompt Engineer',
  'Vibe Coding Developer',
  'Java Developer',
  'Python Developer',
  'AI Video Editor',
];

function FloatingParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 10,
    color: ['#ff9f1c', '#ffb627', '#ff6b00'][Math.floor(Math.random() * 3)],
    opacity: 0.3 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10px',
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.5); }
          90% { opacity: var(--particle-opacity, 0.5); }
          100% { transform: translateY(-110vh) translateX(${Math.random() > 0.5 ? '' : '-'}30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function HeroSection({ isLoaded }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const { text, showCursor } = useTypingEffect({ strings: roles });

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // 1. Profile image fade in
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
    })
      // 3. Name character reveal
      .fromTo(
        nameRef.current,
        { opacity: 0, rotateY: 30, x: -30 },
        { opacity: 1, rotateY: 0, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      // 5. Tagline
      .to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      // 6. CTA buttons
      .to(
        buttonsRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // 7. Social links
      .to(
        socialsRef.current,
        { opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, [isLoaded]);

  const handleNav = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', paddingTop: '72px' }}
    >
      <FloatingParticles />

      <div className="container-main relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-16 items-center py-12">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-start">
          <div
            ref={imageRef}
            className="relative opacity-0"
            style={{ width: 'clamp(280px, 35vw, 450px)', transform: 'scale(0.95)' }}
          >
            {/* Rotating ring */}
            <div
              ref={ringRef}
              className="absolute -inset-3 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, #ff9f1c 25%, transparent 50%, #ff6b00 75%, transparent 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '2px',
                animation: 'ringRotate 8s linear infinite',
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 60px rgba(255, 159, 28, 0.2), 0 0 120px rgba(255, 107, 0, 0.1)',
              }}
            />
            {/* Image */}
            <img
              src="/assets/portrait.png"
              alt="Mugilarasu R — Computer Science Student and AI Developer"
              className="w-full aspect-square object-cover rounded-full relative z-10 transition-transform duration-600 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1
            ref={nameRef}
            className="text-hero opacity-0"
            style={{
              color: '#ffffff',
              textShadow: '0 0 80px rgba(255, 159, 28, 0.15)',
              perspective: '1000px',
            }}
          >
            Mugilarasu R
          </h1>

          <div className="mt-4 h-[clamp(2rem,4vw,3rem)] flex items-center justify-center md:justify-start">
            <span className="text-h2 mr-2" style={{ color: '#a0a0a0', fontWeight: 400 }}>
              I am a{' '}
            </span>
            <span className="text-h2" style={{ color: '#ff9f1c', fontWeight: 400 }}>
              {text}
            </span>
            <span
              className="text-h2 ml-1 inline-block"
              style={{
                color: '#ff9f1c',
                width: '2px',
                animation: showCursor ? 'none' : 'cursorBlink 0.5s steps(1) infinite',
                opacity: showCursor ? 1 : 0,
              }}
            >
              |
            </span>
          </div>

          <p
            ref={taglineRef}
            className="text-body mt-6 mx-auto md:mx-0 opacity-0"
            style={{
              color: '#a0a0a0',
              maxWidth: '500px',
              transform: 'translateY(20px)',
            }}
          >
            Transforming ideas into intelligent digital solutions
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start opacity-0"
            style={{ transform: 'translateY(20px)' }}
          >
            <GradientButton
              icon={<Briefcase size={20} />}
              onClick={() => handleNav('#contact')}
            >
              Hire Me
            </GradientButton>
            <GhostButton
              icon={<Download size={20} />}
              href="#"
            >
              Download Resume
            </GhostButton>
            <GhostButton
              icon={<Mail size={20} />}
              onClick={() => handleNav('#contact')}
            >
              Contact Me
            </GhostButton>
          </div>

          <div
            ref={socialsRef}
            className="flex gap-6 mt-8 justify-center md:justify-start opacity-0"
          >
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>, href: 'https://wa.me/918270495250' },
              { icon: <Mail size={22} />, href: 'mailto:mugiarasu42@gmail.com' },
              { icon: <Github size={22} />, href: '#' },
              { icon: <Linkedin size={22} />, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-[#ff9f1c] hover:-translate-y-[3px]"
                style={{ color: '#555555' }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
