import { useEffect, useRef, useState } from 'react';
import { Cpu, Globe, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../lib/supabase';

type ProjectsProps = { projects: Project[] };

const levelColors: Record<string, string> = {
  UG: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PG: 'bg-green-500/10 text-green-400 border-green-500/20',
  Personal: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const projectIcons: Record<string, React.ElementType> = {
  UG: Cpu,
  PG: Globe,
  Personal: FileText,
};

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Log projects to debug
  useEffect(() => {
    console.log('Projects component received:', projects);
    console.log('Projects length:', projects?.length);
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  // Use projects if available, otherwise use empty array
  const displayProjects = Array.isArray(projects) && projects.length > 0 ? projects : [];

  console.log('displayProjects:', displayProjects);

  // Fallback test data for debugging
  const testProjects: Project[] = [
    {
      id: 'test-1',
      title: 'IoT-Based Personal Weather Station',
      description: 'An IoT-based system designed for real-time environmental monitoring to support precision agriculture and industrial safety. The system uses wireless sensor data to collect temperature, humidity, and air quality metrics, enabling data-driven decision-making for crop management and workplace safety protocols.',
      tech_stack: 'IoT, Sensors, Wireless Data',
      level: 'UG',
      sort_order: 1,
      created_at: '2024-01-01'
    },
    {
      id: 'test-2',
      title: 'Emergency Hub Website',
      description: 'A centralized web platform providing rapid access to emergency service contact details and resources across Erode. Features include a searchable database, emergency hotlines directory, location-based services, and quick-dial functionality to improve emergency response times and public safety.',
      tech_stack: 'HTML, CSS, PHP, MySQL',
      level: 'PG',
      sort_order: 2,
      created_at: '2024-02-01'
    },
    {
      id: 'test-3',
      title: 'Passport Registration Website',
      description: 'A web-based application streamlining passport registration for citizens. Implements a user-friendly form interface with validation, document upload functionality, and automated processing to reduce manual paperwork and expedite the passport issuance workflow.',
      tech_stack: 'HTML, CSS, JavaScript',
      level: 'Personal',
      sort_order: 3,
      created_at: '2024-03-01'
    }
  ];

  // Use real data if available, fallback to test data
  const finalProjects = displayProjects.length > 0 ? displayProjects : testProjects;

  console.log('finalProjects:', finalProjects);

  return (
    <section id="projects" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">What I've Built</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Projects</h2>
        </div>

        {finalProjects.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-bg-card border border-blue-500/20 rounded-2xl p-8">
            <p className="text-slate-400 text-sm mb-4">Loading projects...</p>
            <p className="text-xs text-slate-500">If this persists, check the browser console (F12) for errors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {finalProjects.map((project, idx) => {
              const Icon = projectIcons[project.level] || Globe;
              const levelClass = levelColors[project.level] || levelColors['Personal'];
              const techItems = project.tech_stack ? project.tech_stack.split(',').map(t => t.trim()) : [];
              const isExpanded = expandedId === project.id;

              return (
                <div
                  key={project.id}
                  className="bg-bg-card border border-blue-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 card-hover animate-on-scroll flex flex-col transition-all duration-300"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div className="w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11 bg-blue-500/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="sm:block hidden text-blue-400" />
                      <Icon size={16} className="sm:hidden text-blue-400" />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelClass} whitespace-nowrap`}>
                      {project.level || 'Project'}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base leading-snug break-words">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <div className={`overflow-hidden transition-all duration-300 flex-1 mb-4 sm:mb-5 ${isExpanded ? 'max-h-none' : 'max-h-24 sm:max-h-28'}`}>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-normal break-words">
                      {project.description || 'No description available'}
                    </p>
                  </div>

                  {/* Tech stack */}
                  {techItems.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {techItems.map((tech, i) => (
                        <span key={i} className="text-xs bg-bg-elevated text-slate-400 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-white/5 whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expand button */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="mt-auto flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
