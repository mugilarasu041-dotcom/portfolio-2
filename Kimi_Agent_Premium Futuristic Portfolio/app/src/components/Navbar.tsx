import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 159, 28, 0.15)'
            : '1px solid rgba(255, 159, 28, 0.08)',
        }}
      >
        <div className="container-main flex items-center justify-between h-[72px]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-h3 gradient-text font-bold"
          >
            MR
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="relative text-label group"
                style={{ color: '#a0a0a0' }}
              >
                <span className="transition-colors duration-300 group-hover:text-[#ff9f1c]">
                  {link.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: '#ff9f1c' }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} style={{ color: '#ff9f1c' }} />
            ) : (
              <Menu size={24} style={{ color: '#a0a0a0' }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{
            backgroundColor: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-h2 transition-colors duration-300 hover:text-[#ff9f1c]"
              style={{
                color: '#ffffff',
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeInUp 0.4s ease forwards',
                opacity: 0,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
