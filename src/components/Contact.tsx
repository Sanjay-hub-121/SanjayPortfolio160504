import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle } from 'lucide-react';
import type { Profile } from '../lib/supabase';

type ContactProps = { profile: Profile | null };

export default function Contact({ profile }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    window.location.href = `mailto:${profile?.email || 'sanjayganeasnt@gmail.com'}?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`;
    setSent(true);
    setSubmitting(false);
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'sanjayganeasnt@gmail.com',
      href: `mailto:${profile?.email || 'sanjayganeasnt@gmail.com'}`,
    },
    {
      icon: Phone,
      label: 'Mobile',
      value: profile?.phone || '+91 9659073356',
      href: `tel:${profile?.phone || '+919659073356'}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile?.location || 'Tirupur, Tamil Nadu, India',
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'sanjay-g',
      href: profile?.linkedin || 'https://www.linkedin.com/in/sanjay-g-b2556027b',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Sanjayganesan007',
      href: profile?.github || 'https://github.com/Sanjayganesan007',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8 sm:mb-12 lg:mb-16">
          <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Say Hello</span>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">Get In Touch</h2>
          <p className="text-slate-400 mt-3 sm:mt-4 lg:mt-6 max-w-lg text-xs sm:text-sm leading-relaxed">
            Whether you have a project in mind, a question, or just want to connect — I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact info */}
          <div className="animate-on-scroll space-y-2.5 sm:space-y-3 lg:space-y-4">
            {contacts.map(({ icon: Icon, label, value, href }, idx) => (
              <div
                key={label}
                className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 card-hover"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="sm:block hidden text-blue-400" />
                  <Icon size={12} className="sm:hidden text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xs sm:text-sm text-white hover:text-blue-400 transition-colors font-medium truncate"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm text-white font-medium truncate">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {sent ? (
              <div className="bg-bg-card border border-green-500/20 rounded-lg sm:rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full min-h-64">
                <CheckCircle size={36} className="sm:block hidden text-green-400 mb-4" />
                <CheckCircle size={32} className="sm:hidden text-green-400 mb-3" />
                <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-1.5 sm:mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">Your email client should open. I'll get back to you soon.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-outline !text-xs sm:!text-sm !py-2 sm:!py-2.5 !px-3 sm:!px-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-bg-card border border-blue-500/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 sm:mb-1.5 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full bg-bg-elevated border border-white/10 text-white placeholder-slate-600 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 sm:mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full bg-bg-elevated border border-white/10 text-white placeholder-slate-600 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 sm:mb-1.5 font-medium">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full bg-bg-elevated border border-white/10 text-white placeholder-slate-600 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed !py-2 sm:!py-2.5 !text-xs sm:!text-sm"
                >
                  <Send size={13} className="sm:block hidden" />
                  <Send size={11} className="sm:hidden" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
