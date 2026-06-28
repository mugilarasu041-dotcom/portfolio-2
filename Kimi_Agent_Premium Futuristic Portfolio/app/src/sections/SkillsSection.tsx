import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Brain, Wrench, Palette } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import GlassmorphismCard from '@/components/GlassmorphismCard';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming',
    skills: ['Java', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    skills: ['Prompt Engineering', 'ChatGPT', 'AI Automation', 'Vibe Coding', 'AI Tools'],
  },
  {
    icon: Wrench,
    title: 'Development',
    skills: ['Git', 'GitHub', 'Responsive Design', 'API Integration', 'Web Development'],
  },
  {
    icon: Palette,
    title: 'Creative',
    skills: ['AI Video Editing', 'UI/UX Design', 'Content Creation'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stagger skill tags within each card
      cards?.forEach((card) => {
        const tags = card.querySelectorAll('.skill-tag');
        gsap.fromTo(
          tags,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-32">
      <div className="container-main">
        <SectionHeader
          label="EXPERTISE"
          heading="Skills & Technologies"
          description="A comprehensive toolkit spanning programming, AI, development, and creative disciplines."
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-card opacity-0">
              <GlassmorphismCard>
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(255, 159, 28, 0.1)',
                    border: '1px solid rgba(255, 159, 28, 0.3)',
                  }}
                >
                  <category.icon size={24} style={{ color: '#ff9f1c' }} />
                </div>

                {/* Title */}
                <h3 className="text-h3 mb-6" style={{ color: '#ffffff' }}>
                  {category.title}
                </h3>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag text-label px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[rgba(255,159,28,0.15)] hover:border-[rgba(255,159,28,0.4)]"
                      style={{
                        background: 'rgba(255, 159, 28, 0.08)',
                        border: '1px solid rgba(255, 159, 28, 0.2)',
                        color: '#ff9f1c',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassmorphismCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
