import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
        >
          <div className="w-7 sm:w-8 h-7 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center glow-blue-sm group-hover:scale-110 transition-transform">
            <Code2 size={14} className="sm:block hidden text-white" />
            <Code2 size={12} className="sm:hidden text-white" />
          </div>
          <span className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
            Sanjay<span className="text-blue-400">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:sanjayganeasnt@gmail.com"
            className="btn-primary ml-2 lg:ml-3 !py-2 !px-3 lg:!px-4 !text-xs lg:!text-sm"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-blue-500/10 px-4 sm:px-6 py-3 flex flex-col gap-0.5">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === href.slice(1)
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:sanjayganeasnt@gmail.com"
            className="btn-primary mt-2 justify-center !text-sm"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
