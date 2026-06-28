import type { ReactNode } from 'react';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassmorphismCard({ children, className = '', style }: GlassmorphismCardProps) {
  return (
    <div
      className={`rounded-[16px] p-8 transition-all duration-400 ${className}`}
      style={{
        background: 'rgba(255, 159, 28, 0.03)',
        border: '1px solid rgba(255, 159, 28, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 159, 28, 0.1)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.4)';
        e.currentTarget.style.boxShadow = '0 12px 48px rgba(255, 159, 28, 0.15), inset 0 1px 0 rgba(255, 159, 28, 0.2)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.background = 'rgba(255, 159, 28, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.15)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 159, 28, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'rgba(255, 159, 28, 0.03)';
      }}
    >
      {children}
    </div>
  );
}
