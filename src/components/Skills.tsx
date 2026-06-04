import { useEffect, useRef } from 'react';
import { Zap, Palette, Code2, Cloud, Database, Cpu } from 'lucide-react';
import type { Skill } from '../lib/supabase';

type SkillsProps = { skills: Skill[] };

const categoryConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  'Design Tools':    { icon: Palette, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  'Design':          { icon: Palette, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  'Web Development': { icon: Code2,   color: 'text-blue-400', bg: 'bg-blue-500/10' },
  'Programming':     { icon: Zap,     color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  'Database':        { icon: Database, color: 'text-green-400', bg: 'bg-green-500/10' },
  'Cloud':           { icon: Cloud,   color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  'Technology':      { icon: Cpu,     color: 'text-orange-400', bg: 'bg-orange-500/10' },
  'General':         { icon: Zap,     color: 'text-slate-400', bg: 'bg-slate-500/10' },
};

export default function Skills({ skills }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const defaultSkills = [
    { name: 'Figma', category: 'Design Tools' },
    { name: 'Framer', category: 'Design Tools' },
    { name: 'HTML', category: 'Web Development' },
    { name: 'CSS', category: 'Web Development' },
    { name: 'Python', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'MySQL', category: 'Database' },
    { name: 'AWS Cloud', category: 'Cloud' },
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayGrouped = skills.length > 0
    ? grouped
    : defaultSkills.reduce<Record<string, typeof defaultSkills>>((acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
      }, {});

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">What I Know</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Skill Sets</h2>
        </div>

        <div className="animate-on-scroll">
          {/* All skills as tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12">
            {displaySkills.map((skill, idx) => {
              const cfg = categoryConfig[skill.category] || categoryConfig['General'];
              const Icon = cfg.icon;
              return (
                <span
                  key={idx}
                  className="skill-tag text-xs sm:text-sm"
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  <Icon size={11} className={`sm:block hidden ${cfg.color}`} />
                  <Icon size={10} className={`sm:hidden ${cfg.color}`} />
                  {skill.name}
                </span>
              );
            })}
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {Object.entries(displayGrouped).map(([category, items], idx) => {
              const cfg = categoryConfig[category] || categoryConfig['General'];
              const Icon = cfg.icon;
              return (
                <div
                  key={category}
                  className="bg-bg-card border border-blue-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 card-hover"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className={`w-8 sm:w-9 h-8 sm:h-9 ${cfg.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={16} className={`sm:block hidden ${cfg.color}`} />
                    <Icon size={14} className={`sm:hidden ${cfg.color}`} />
                  </div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm mb-2 sm:mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {items.map((s, i) => (
                      <span key={i} className={`text-xs px-2 sm:px-2.5 py-1 rounded-full border ${cfg.bg} border-transparent ${cfg.color} font-medium`}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
