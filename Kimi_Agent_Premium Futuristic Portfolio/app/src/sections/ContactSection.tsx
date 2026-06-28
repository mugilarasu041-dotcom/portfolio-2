import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MessageCircle, Mail, Clock, MapPin } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GradientButton from '@/components/GradientButton';

gsap.registerPlugin(ScrollTrigger);

// Particle Orbit Ring - CSS-based particle effect for performance
function ParticleOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const particleCount = window.innerWidth < 768 ? 60 : 150;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      radius: 150 + Math.random() * 100,
      speed: 0.002 + Math.random() * 0.003,
      size: 1.5 + Math.random() * 2.5,
      color: ['#ff9f1c', '#ffb627', '#ff6b00'][Math.floor(Math.random() * 3)],
      opacity: 0.3 + Math.random() * 0.4,
      yOffset: (Math.random() - 0.5) * 60,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      const cx = cw / 2;
      const cy = ch / 2;

      particles.forEach((p) => {
        p.angle += p.speed;

        let x = cx + Math.cos(p.angle) * p.radius;
        let y = cy + Math.sin(p.angle) * p.radius * 0.4 + p.yOffset;

        // Mouse attraction
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          x += dx * 0.02;
          y += dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * 0.15;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0, opacity: 0.7 }}
    />
  );
}

const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 8270495250',
    href: 'https://wa.me/918270495250',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'mugiarasu42@gmail.com',
    href: 'mailto:mugiarasu42@gmail.com',
    external: false,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    external: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
    external: false,
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form fields stagger
      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) {
        gsap.fromTo(
          fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Contact info cards stagger
      const cards = infoRef.current?.querySelectorAll('.contact-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0 1.25rem',
    color: '#ffffff',
    fontSize: '1.125rem',
    fontWeight: 300,
    transition: 'all 0.3s ease',
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[100dvh] overflow-hidden py-24 md:py-32"
    >
      {/* Particle Background */}
      <ParticleOrbit />

      <div className="container-main relative z-10">
        <SectionHeader
          label="GET IN TOUCH"
          heading="Let's Work Together"
          description="Have a project in mind? Let's create something extraordinary."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-16">
          {/* Contact Form */}
          <div ref={formRef}>
            <GlassmorphismCard style={{ padding: '3rem' }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-h3 mb-4" style={{ color: '#ff9f1c' }}>
                    Message Sent!
                  </div>
                  <p className="text-body" style={{ color: '#a0a0a0' }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="form-field opacity-0">
                    <label className="text-label block mb-2" style={{ color: '#a0a0a0' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(255, 159, 28, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 159, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="form-field opacity-0">
                    <label className="text-label block mb-2" style={{ color: '#a0a0a0' }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(255, 159, 28, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 159, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="form-field opacity-0">
                    <label className="text-label block mb-2" style={{ color: '#a0a0a0' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(255, 159, 28, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 159, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="form-field opacity-0">
                    <label className="text-label block mb-2" style={{ color: '#a0a0a0' }}>
                      Your Message
                    </label>
                    <textarea
                      required
                      placeholder="Enter your message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{
                        ...inputStyle,
                        height: 'auto',
                        minHeight: '150px',
                        padding: '1.25rem',
                        resize: 'vertical',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(255, 159, 28, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 159, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="form-field opacity-0">
                    <GradientButton fullWidth icon={<Send size={20} />}>
                      Send Message
                    </GradientButton>
                  </div>
                </form>
              )}
            </GlassmorphismCard>
          </div>

          {/* Contact Info Panel */}
          <div ref={infoRef} className="flex flex-col gap-6">
            {contactMethods.map((method) => (
              <div key={method.label} className="contact-card opacity-0">
                <GlassmorphismCard style={{ padding: '1.5rem' }}>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 159, 28, 0.1)',
                        border: '1px solid rgba(255, 159, 28, 0.2)',
                      }}
                    >
                      <method.icon size={22} style={{ color: '#ff9f1c' }} />
                    </div>
                    <div>
                      <div className="text-label" style={{ color: '#555555' }}>
                        {method.label}
                      </div>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.external ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-body transition-colors duration-300 hover:text-[#ff9f1c]"
                          style={{ color: '#ffffff', fontWeight: 400 }}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <div className="text-body" style={{ color: '#ffffff', fontWeight: 400 }}>
                          {method.value}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassmorphismCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
