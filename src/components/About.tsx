import { useEffect, useRef } from 'react';
import { GraduationCap, Target, BookOpen } from 'lucide-react';
import type { Profile } from '../lib/supabase';

type AboutProps = { profile: Profile | null };

const education = [
  {
    degree: 'M.Sc. Computer Science',
    institution: 'VET Institute of Arts and Science (Co-ed), Erode',
    year: '2024–2026',
    grade: '86.72% (Up to 3rd Semester)',
    icon: GraduationCap,
  },
  {
    degree: 'B.Sc. Computer Science',
    institution: 'Kongu Arts and Science College (Autonomous), Erode',
    year: '2021–2024',
    grade: 'CGPA: 7.11',
    icon: GraduationCap,
  },
  {
    degree: 'HSC',
    institution: 'Velavan Matriculation Higher Secondary School',
    year: '2021',
    grade: '76%',
    icon: BookOpen,
  },
  {
    degree: 'SSLC',
    institution: 'Velavan Matriculation Higher Secondary School',
    year: '2019',
    grade: '83%',
    icon: BookOpen,
  },
];

const interests = ['Web Design', 'Web Development', 'UI/UX Designer'];

export default function About({ profile }: AboutProps) {
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
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Who I Am</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">About Me</h2>
          <p className="text-slate-400 mt-3 sm:mt-4 lg:mt-6 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
            {profile?.objective || 'Aspiring to a UI/UX Designer role where I can apply my knowledge, learn from industry experts, and contribute to innovative projects.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Career objective card */}
          <div className="lg:col-span-1 sm:col-span-2 lg:col-span-1 animate-on-scroll">
            <div className="bg-bg-card border border-blue-500/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 h-full card-hover">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-500/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Target size={18} className="sm:block hidden text-blue-400" />
                <Target size={16} className="sm:hidden text-blue-400" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2 sm:mb-3 text-base sm:text-lg">Career Objective</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {profile?.objective || 'Aspiring to contribute to innovative projects by applying design thinking and technical skills in a professional environment.'}
              </p>
              <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-white/5">
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Interests</div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {interests.map(i => (
                    <span key={i} className="skill-tag !text-xs sm:!text-sm">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="sm:col-span-2 lg:col-span-2 animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <h3 className="font-display font-semibold text-white mb-3 sm:mb-4 lg:mb-5 text-base sm:text-lg flex items-center gap-2">
              <GraduationCap size={18} className="sm:block hidden text-blue-400" />
              <GraduationCap size={16} className="sm:hidden text-blue-400" />
              Educational Credentials
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {education.map(({ degree, institution, year, grade }, idx) => (
                <div
                  key={idx}
                  className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 card-hover flex gap-3 items-start"
                >
                  <div className="w-8 sm:w-9 h-8 sm:h-9 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap size={14} className="sm:block hidden text-blue-400" />
                    <GraduationCap size={12} className="sm:hidden text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5">
                      <span className="font-semibold text-white text-xs sm:text-sm">{degree}</span>
                      <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                        {year}
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs mb-0.5">{institution}</div>
                    <div className="text-slate-500 text-xs font-medium">{grade}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
