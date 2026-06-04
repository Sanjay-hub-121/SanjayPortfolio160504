import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, BookOpen } from 'lucide-react';
import type { Experience, Training } from '../lib/supabase';

type ExperienceProps = { experience: Experience[]; training: Training[] };

export default function ExperienceSection({ experience, training }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Professional Journey</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Experience & Training</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Experience */}
          <div className="animate-on-scroll">
            <h3 className="font-display font-semibold text-white mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 text-base sm:text-lg">
              <Briefcase size={18} className="sm:block hidden text-blue-400" />
              <Briefcase size={16} className="sm:hidden text-blue-400" />
              Work Experience
            </h3>
            {experience.length === 0 ? (
              <p className="text-slate-500 text-xs sm:text-sm">No experience entries yet.</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 card-hover relative overflow-hidden"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-3 sm:top-4 bottom-3 sm:bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-blue-700 rounded-r-full" />
                    <div className="pl-2.5 sm:pl-3">
                      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-xs sm:text-sm">{exp.title}</h4>
                          <p className="text-blue-400 text-xs font-medium truncate">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                            {exp.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar size={10} />
                            {exp.duration}
                          </span>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-slate-400 text-xs leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Training */}
          <div className="animate-on-scroll" style={{ transitionDelay: '0.15s' }}>
            <h3 className="font-display font-semibold text-white mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 text-base sm:text-lg">
              <BookOpen size={18} className="sm:block hidden text-blue-400" />
              <BookOpen size={16} className="sm:hidden text-blue-400" />
              Training Attended
            </h3>
            {training.length === 0 ? (
              <p className="text-slate-500 text-xs sm:text-sm">No training entries yet.</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {training.map((t, idx) => (
                  <div
                    key={t.id}
                    className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 card-hover flex gap-3 sm:gap-4"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <div className="w-8 sm:w-9 h-8 sm:h-9 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen size={14} className="sm:block hidden text-blue-400" />
                      <BookOpen size={12} className="sm:hidden text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-xs sm:text-sm mb-0.5">{t.title}</h4>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} className="text-blue-400 flex-shrink-0" />
                        {t.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
