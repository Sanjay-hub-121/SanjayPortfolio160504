import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Github, Linkedin, Mail, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import type { Profile } from '../lib/supabase';

const SanjayAvatar = lazy(() => import('./Avatar'));
const roles = ['UI/UX Designer', 'Freelancer', 'Web Developer', 'Problem Solver'];

type HeroProps = { profile: Profile | null };

export default function Hero({ profile }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!isDeleting && displayed.length < current.length) {
      timeoutRef.current = window.setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeoutRef.current = window.setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, roleIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Ambient blobs - responsive */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-blue-400/6 blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-6 sm:py-8 lg:py-12 pb-20 sm:pb-12">
        {/* Left – Text */}
        <div className="order-2 md:order-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 uppercase tracking-wider">
            <Sparkles size={10} className="sm:block hidden" />
            <Sparkles size={8} className="sm:hidden" />
            <span className="hidden xs:inline">Available for Freelance Work</span>
            <span className="xs:hidden">Freelance Available</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 sm:mb-4">
            Hi, I'm{' '}
            <span className="text-gradient">{profile?.name || 'Sanjay G'}</span>
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-semibold text-slate-300 mb-2 h-8 sm:h-9 md:h-10 lg:h-10 flex items-center">
            <span className="text-blue-400 truncate">{displayed}</span>
            <span className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-blue-400 ml-0.5 animate-pulse" />
          </div>

          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8 max-w-lg mt-2 sm:mt-4">
            {profile?.bio || 'Crafting beautiful digital experiences through thoughtful design and clean code. Based in Tirupur, Tamil Nadu — ready to bring your vision to life.'}
          </p>

          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-4 sm:mb-8">
            <MapPin size={12} className="sm:block hidden text-blue-400 flex-shrink-0" />
            <MapPin size={10} className="sm:hidden text-blue-400 flex-shrink-0" />
            <span className="truncate">{profile?.location || 'Tirupur, Tamil Nadu, India'}</span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            <a href="mailto:sanjayganeasnt@gmail.com" className="btn-primary !py-2 sm:!py-2.5 !px-3 sm:!px-4 !text-xs sm:!text-sm">
              <Mail size={12} className="sm:block hidden" />
              <Mail size={10} className="sm:hidden" />
              <span className="hidden sm:inline">Get In Touch</span>
              <span className="sm:hidden">Contact</span>
            </a>
            <a
              href={profile?.linkedin || 'https://www.linkedin.com/in/sanjay-g-b2556027b'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 sm:!py-2.5 !px-3 sm:!px-4 !text-xs sm:!text-sm"
            >
              <Linkedin size={12} className="sm:block hidden" />
              <Linkedin size={10} className="sm:hidden" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href={profile?.github_repos || 'https://github.com/Sanjay-hub-121?tab=repositories'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 sm:!py-2.5 !px-3 sm:!px-4 !text-xs sm:!text-sm"
            >
              <Github size={12} className="sm:block hidden" />
              <Github size={10} className="sm:hidden" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          {/* Stats - responsive grid */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-0">
            {[
              { value: '3+', label: 'Projects' },
              { value: '5+', label: 'Certifications' },
              { value: '1', label: 'Internship' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-shrink-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-blue-400">{value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Avatar */}
        <div className="order-1 md:order-2 flex justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-blue-500/10 blur-2xl scale-110 animate-glow" />
            <div
              className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[420px] lg:w-96 lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-500/20 glass animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              <Suspense fallback={<div className="w-full h-full bg-bg-card animate-pulse" />}>
                <SanjayAvatar />
              </Suspense>
            </div>
            {/* Floating badges - responsive */}
            <div className="hidden sm:block absolute -bottom-3 -left-3 glass rounded-lg sm:rounded-xl px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 sm:py-2.5 border border-blue-500/20 shadow-lg">
              <div className="text-xs text-slate-400">Currently studying</div>
              <div className="text-xs sm:text-sm font-semibold text-white">M.Sc. Computer Science</div>
            </div>
            <div className="hidden sm:block absolute -top-3 -right-3 glass rounded-lg sm:rounded-xl px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 sm:py-2.5 border border-blue-500/20 shadow-lg">
              <div className="text-xs text-slate-400">Expertise</div>
              <div className="text-xs sm:text-sm font-semibold text-blue-400">UI/UX Design</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-blue-400 transition-colors flex flex-col items-center gap-1 group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
