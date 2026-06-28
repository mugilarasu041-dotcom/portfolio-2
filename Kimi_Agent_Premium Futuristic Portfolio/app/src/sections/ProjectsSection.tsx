import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Globe, Cpu, Video, BarChart3, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import GlassmorphismCard from '@/components/GlassmorphismCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Chatbot Platform',
    category: 'AI Development',
    description: 'Intelligent conversational AI built with advanced prompt engineering and natural language processing',
    gradient: 'linear-gradient(135deg, rgba(255, 159, 28, 0.2), rgba(255, 107, 0, 0.1))',
    icon: Bot,
    featured: true,
  },
  {
    title: 'Portfolio Website',
    category: 'Web Development',
    description: 'Premium responsive portfolio showcasing modern web technologies and design principles',
    gradient: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2), rgba(255, 182, 39, 0.1))',
    icon: Globe,
    featured: false,
  },
  {
    title: 'Java Automation Tool',
    category: 'Java Development',
    description: 'Automated workflow system built with Java featuring API integrations and data processing',
    gradient: 'linear-gradient(135deg, rgba(255, 182, 39, 0.2), rgba(255, 159, 28, 0.1))',
    icon: Cpu,
    featured: false,
  },
  {
    title: 'AI Video Suite',
    category: 'AI Creative',
    description: 'AI-powered video editing pipeline leveraging machine learning for content enhancement',
    gradient: 'linear-gradient(135deg, rgba(200, 120, 0, 0.2), rgba(255, 107, 0, 0.1))',
    icon: Video,
    featured: false,
  },
  {
    title: 'Python Data Analyzer',
    category: 'Python Development',
    description: 'Data visualization and analysis tool built with Python for intelligent insights',
    gradient: 'linear-gradient(135deg, rgba(255, 159, 28, 0.15), rgba(255, 182, 39, 0.15))',
    icon: BarChart3,
    featured: false,
  },
  {
    title: 'Prompt Engineering Kit',
    category: 'AI Tools',
    description: 'Comprehensive prompt library and automation toolkit for maximizing AI tool efficiency',
    gradient: 'linear-gradient(135deg, rgba(255, 80, 0, 0.15), rgba(255, 159, 28, 0.2))',
    icon: Sparkles,
    featured: false,
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
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
              trigger: gridRef.current,
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
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
      <div className="container-main">
        <SectionHeader
          label="PORTFOLIO"
          heading="Featured Projects"
          description="A selection of projects showcasing my expertise in AI, web development, and creative technology."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card opacity-0 ${
                project.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <GlassmorphismCard
                className="h-full"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                {/* Preview Area */}
                <div
                  className="relative overflow-hidden group"
                  style={{
                    aspectRatio: project.featured ? '16/12' : '16/10',
                    background: project.gradient,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon
                      size={project.featured ? 64 : 48}
                      style={{ color: 'rgba(255, 159, 28, 0.5)' }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(255, 159, 28, 0.1)' }}
                  />
                  <div className="absolute inset-0 transition-transform duration-600 group-hover:scale-105" />
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <span className="text-label block mb-2" style={{ color: '#ff9f1c' }}>
                    {project.category}
                  </span>
                  <h3 className="text-h3 mb-2" style={{ color: '#ffffff' }}>
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: '#a0a0a0',
                      fontSize: '0.9375rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </GlassmorphismCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
