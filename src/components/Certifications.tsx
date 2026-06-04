import { useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import type { Certification } from '../lib/supabase';

type CertificationsProps = { certifications: Certification[] };

export default function Certifications({ certifications }: CertificationsProps) {
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
    <section id="certifications" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">What I've Earned</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 animate-on-scroll">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-2xl p-4 sm:p-5 card-hover flex gap-3 sm:gap-4"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award size={16} className="sm:block hidden text-blue-400" />
                <Award size={14} className="sm:hidden text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5 sm:mb-1 leading-snug">{cert.title}</h3>
                {cert.issuer && (
                  <p className="text-slate-400 text-xs mb-0.5">{cert.issuer}</p>
                )}
                {cert.year && (
                  <span className="text-xs text-blue-400 font-medium">{cert.year}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
