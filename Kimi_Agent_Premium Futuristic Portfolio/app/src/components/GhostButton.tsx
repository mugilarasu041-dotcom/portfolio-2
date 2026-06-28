import type { ReactNode } from 'react';

interface GhostButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GhostButton({ children, icon, onClick, href, className = '' }: GhostButtonProps) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#a0a0a0',
    fontFamily: 'var(--font-display)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const inner = (
    <>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </>
  );

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.5)';
    e.currentTarget.style.color = '#ffffff';
    e.currentTarget.style.background = 'rgba(255, 159, 28, 0.05)';
  };

  const hoverOut = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    e.currentTarget.style.color = '#a0a0a0';
    e.currentTarget.style.background = 'transparent';
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        style={style}
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
      style={style}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {inner}
    </button>
  );
}
