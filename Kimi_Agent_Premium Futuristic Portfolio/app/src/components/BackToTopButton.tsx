import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed z-[100] flex items-center justify-center transition-all duration-400 hover:scale-110"
      aria-label="Back to top"
      style={{
        bottom: '2rem',
        left: '2rem',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 159, 28, 0.1)',
        border: '1px solid rgba(255, 159, 28, 0.3)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 159, 28, 0.2)';
        e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.5)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 159, 28, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 159, 28, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.3)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <ArrowUp size={20} style={{ color: '#ff9f1c' }} />
    </button>
  );
}
