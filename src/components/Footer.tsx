import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';
import type { Profile } from '../lib/supabase';

type FooterProps = { profile: Profile | null };

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-white/5 py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Brand */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="w-6 sm:w-7 h-6 sm:h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <Code2 size={12} className="sm:block hidden text-white" />
              <Code2 size={10} className="sm:hidden text-white" />
            </div>
            <span className="font-display font-bold text-white text-base sm:text-lg">
              Sanjay<span className="text-blue-400">.</span>
            </span>
          </div>

          {/* Credit */}
          <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
            Crafted with <Heart size={10} className="sm:block hidden text-red-400 fill-red-400" />
            <Heart size={9} className="sm:hidden text-red-400 fill-red-400" /> by Sanjay G © {year}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {[
              { icon: Mail, href: `mailto:${profile?.email || 'sanjayganeasnt@gmail.com'}`, label: 'Email' },
              { icon: Linkedin, href: profile?.linkedin || 'https://www.linkedin.com/in/sanjay-g-b2556027b', label: 'LinkedIn' },
              { icon: Github, href: profile?.github_repos || 'https://github.com/Sanjay-hub-121?tab=repositories', label: 'GitHub' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-7 sm:w-8 h-7 sm:h-8 bg-bg-card border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
              >
                <Icon size={12} className="sm:block hidden" />
                <Icon size={10} className="sm:hidden" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
