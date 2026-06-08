import { useEffect, useRef } from 'react';
import { BookOpen, Calendar, MapPin, Hash } from 'lucide-react';
import type { Publication } from '../lib/supabase';

type PublicationsProps = { publications: Publication[] };

export default function Publications({ publications }: PublicationsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (publications.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [publications]);

  if (publications.length === 0) return null;

  return (
    <section id="publications" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Research</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Publications</h2>
          <p className="text-slate-400 mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm leading-relaxed">
            Peer-reviewed research contributions published at academic conferences.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5 animate-on-scroll">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 card-hover"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {/* Topic */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen size={16} className="text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base leading-snug mb-1">
                    {pub.topic}
                  </h3>
                  {/* Authors */}
                  <p className="text-blue-300 text-xs sm:text-sm font-medium">
                    {pub.author_name}
                    {pub.co_authors && (
                      <span className="text-slate-400 font-normal">, {pub.co_authors}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Conference name */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 pl-12 sm:pl-14 italic">
                {pub.conference_name}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pl-12 sm:pl-14">
                {pub.date && (
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Calendar size={11} className="text-slate-600 flex-shrink-0" />
                    {pub.date}
                  </span>
                )}
                {pub.location && (
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <MapPin size={11} className="text-slate-600 flex-shrink-0" />
                    {pub.location}
                  </span>
                )}
                {pub.isbn && (
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Hash size={11} className="text-slate-600 flex-shrink-0" />
                    ISBN: {pub.isbn}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
