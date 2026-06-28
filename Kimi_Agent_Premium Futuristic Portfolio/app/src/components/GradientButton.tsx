import type { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export default function GradientButton({ children, icon, onClick, href, className = '', fullWidth = false }: GradientButtonProps) {
  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    background: 'rgba(10, 10, 10, 0.9)',
    color: '#ffffff',
    fontFamily: 'var(--font-display)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    zIndex: 1,
    overflow: 'hidden',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.3s ease',
  };

  const pseudoStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #ff9f1c, #ff6b00, #ffb627, #ff9f1c)',
    zIndex: -1,
    transition: 'all 0.3s ease',
  };

  const inner = (
    <>
      <span style={pseudoStyle} className="gradient-border" />
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = '#ff9f1c';
    el.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.4)';
    const border = el.querySelector('.gradient-border') as HTMLElement;
    if (border) border.style.background = 'linear-gradient(225deg, #ff9f1c, #ff6b00, #ffb627, #ff9f1c)';
  };

  const hoverOut = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = '#ffffff';
    el.style.boxShadow = 'none';
    const border = el.querySelector('.gradient-border') as HTMLElement;
    if (border) border.style.background = 'linear-gradient(135deg, #ff9f1c, #ff6b00, #ffb627, #ff9f1c)';
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        style={baseStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={baseStyle}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {inner}
    </button>
  );
}
