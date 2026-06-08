import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut, Plus, Trash2, Save, Check, AlertCircle, Code2,
  Award, Briefcase, BookOpen, Trophy, Layers, User, ChevronDown, ChevronUp
} from 'lucide-react';
import type {
  Profile, Skill, Project, Certification, Experience, Achievement, Training, Publication
} from '../lib/supabase';

type SectionKey = 'profile' | 'skills' | 'projects' | 'certifications' | 'experience' | 'achievements' | 'training' | 'publications';

function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const show = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  return { toast, show };
}

function Toast({ toast }: { toast: { msg: string; type: 'success' | 'error' } | null }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl transition-all animate-fade-up
      ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
      {toast.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
      {toast.msg}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, open, onToggle }: {
  icon: React.ElementType; title: string; open: boolean; onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 bg-bg-card border border-blue-500/10 rounded-xl hover:border-blue-500/25 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-blue-400" />
        </div>
        <span className="font-display font-semibold text-white text-sm">{title}</span>
      </div>
      {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
    </button>
  );
}

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const { toast, show } = useToast();
  const [openSection, setOpenSection] = useState<SectionKey>('certifications');

  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [profileId, setProfileId] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [training, setTraining] = useState<Training[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    const [p, s, pr, c, e, a, t, pub] = await Promise.all([
      supabase.from('profile').select('*').maybeSingle(),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('certifications').select('*').order('sort_order'),
      supabase.from('experience').select('*').order('sort_order'),
      supabase.from('achievements').select('*').order('sort_order'),
      supabase.from('training').select('*').order('sort_order'),
      supabase.from('publications').select('*').order('sort_order'),
    ]);
    if (p.data) { setProfile(p.data); setProfileId(p.data.id); }
    if (s.data) setSkills(s.data);
    if (pr.data) setProjects(pr.data);
    if (c.data) setCerts(c.data);
    if (e.data) setExperience(e.data);
    if (a.data) setAchievements(a.data);
    if (t.data) setTraining(t.data);
    if (pub.data) setPublications(pub.data);
  };

  const toggle = (k: SectionKey) => setOpenSection(prev => prev === k ? k : k);

  // -- PROFILE --
  const saveProfile = async () => {
    setSaving('profile');
    const { error } = profileId
      ? await supabase.from('profile').update({ ...profile, updated_at: new Date().toISOString() }).eq('id', profileId)
      : await supabase.from('profile').insert(profile);
    setSaving(null);
    error ? show(error.message, 'error') : show('Profile saved!');
  };

  // -- GENERIC CRUD helpers --
  const addItem = async (table: string, item: Record<string, unknown>, setFn: (d: unknown[]) => void) => {
    const { data, error } = await supabase.from(table).insert(item).select().single();
    if (error) { show(error.message, 'error'); return; }
    setFn((prev: unknown[]) => [...prev, data]);
    show('Added!');
  };

  const deleteItem = async (table: string, id: string, setFn: (fn: (p: { id: string }[]) => { id: string }[]) => void) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { show(error.message, 'error'); return; }
    setFn(prev => prev.filter(x => x.id !== id));
    show('Deleted!');
  };

  const updateItem = async (table: string, id: string, patch: Record<string, unknown>) => {
    const { error } = await supabase.from(table).update(patch).eq('id', id);
    if (error) show(error.message, 'error');
  };

  // Inline edit helpers
  const patchSkill = (id: string, patch: Partial<Skill>) => setSkills(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchProject = (id: string, patch: Partial<Project>) => setProjects(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchCert = (id: string, patch: Partial<Certification>) => setCerts(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchExp = (id: string, patch: Partial<Experience>) => setExperience(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchAch = (id: string, patch: Partial<Achievement>) => setAchievements(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchTr = (id: string, patch: Partial<Training>) => setTraining(s => s.map(x => x.id === id ? { ...x, ...patch } : x));
  const patchPub = (id: string, patch: Partial<Publication>) => setPublications(s => s.map(x => x.id === id ? { ...x, ...patch } : x));

  const saveRow = async (table: string, id: string, patch: Record<string, unknown>) => {
    setSaving(id);
    await updateItem(table, id, patch);
    setSaving(null);
    show('Saved!');
  };

  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600 transition-all";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";

  return (
    <div className="min-h-screen bg-bg-primary">
      <Toast toast={toast} />

      {/* Header */}
      <header className="glass border-b border-blue-500/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">Portfolio Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
              View Portfolio
            </a>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-4">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-2xl">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Update your portfolio content — changes save to the database instantly.</p>
        </div>

        {/* PROFILE */}
        <div>
          <SectionHeader icon={User} title="Profile & Bio" open={openSection === 'profile'} onToggle={() => setOpenSection('profile')} />
          {openSection === 'profile' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 space-y-4 -mt-1">
              <div className="grid sm:grid-cols-2 gap-4">
                {(['name', 'title', 'email', 'phone', 'location', 'linkedin', 'github', 'github_repos', 'portfolio'] as const).map(field => (
                  <div key={field}>
                    <label className={labelCls}>{field === 'github_repos' ? 'GitHub Repositories' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      className={inputCls}
                      value={(profile as Record<string, string>)[field] || ''}
                      onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className={labelCls}>Bio</label>
                <textarea rows={3} className={inputCls} value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Career Objective</label>
                <textarea rows={3} className={inputCls} value={profile.objective || ''} onChange={e => setProfile(p => ({ ...p, objective: e.target.value }))} />
              </div>
              <button onClick={saveProfile} disabled={saving === 'profile'} className="btn-primary !py-2.5 !text-sm">
                <Save size={14} />
                {saving === 'profile' ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </div>

        {/* CERTIFICATIONS */}
        <div>
          <SectionHeader icon={Award} title="Certifications" open={openSection === 'certifications'} onToggle={() => setOpenSection('certifications')} />
          {openSection === 'certifications' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-3 mb-4">
                {certs.map(cert => (
                  <div key={cert.id} className="bg-bg-card border border-white/5 rounded-xl p-4">
                    <div className="grid sm:grid-cols-3 gap-3 mb-2">
                      <div className="sm:col-span-1">
                        <label className={labelCls}>Title</label>
                        <input className={inputCls} value={cert.title} onChange={e => patchCert(cert.id, { title: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Issuer</label>
                        <input className={inputCls} value={cert.issuer} onChange={e => patchCert(cert.id, { issuer: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Year</label>
                        <input className={inputCls} value={cert.year} onChange={e => patchCert(cert.id, { year: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveRow('certifications', cert.id, { title: cert.title, issuer: cert.issuer, year: cert.year })}
                        disabled={saving === cert.id}
                        className="btn-primary !py-1.5 !px-3 !text-xs"
                      >
                        <Save size={12} />
                        {saving === cert.id ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => deleteItem('certifications', cert.id, setCerts as Parameters<typeof deleteItem>[2])}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddCertForm onAdd={item => addItem('certifications', item, setCerts as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* EXPERIENCE */}
        <div>
          <SectionHeader icon={Briefcase} title="Experience" open={openSection === 'experience'} onToggle={() => setOpenSection('experience')} />
          {openSection === 'experience' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-3 mb-4">
                {experience.map(exp => (
                  <div key={exp.id} className="bg-bg-card border border-white/5 rounded-xl p-4">
                    <div className="grid sm:grid-cols-2 gap-3 mb-2">
                      <div>
                        <label className={labelCls}>Job Title</label>
                        <input className={inputCls} value={exp.title} onChange={e => patchExp(exp.id, { title: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Company</label>
                        <input className={inputCls} value={exp.company} onChange={e => patchExp(exp.id, { company: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Duration</label>
                        <input className={inputCls} value={exp.duration} onChange={e => patchExp(exp.id, { duration: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Type (Internship/Job)</label>
                        <input className={inputCls} value={exp.type} onChange={e => patchExp(exp.id, { type: e.target.value })} />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className={labelCls}>Description</label>
                      <textarea rows={2} className={inputCls} value={exp.description} onChange={e => patchExp(exp.id, { description: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveRow('experience', exp.id, { title: exp.title, company: exp.company, duration: exp.duration, type: exp.type, description: exp.description })}
                        disabled={saving === exp.id}
                        className="btn-primary !py-1.5 !px-3 !text-xs"
                      >
                        <Save size={12} />
                        {saving === exp.id ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => deleteItem('experience', exp.id, setExperience as Parameters<typeof deleteItem>[2])}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddExpForm onAdd={item => addItem('experience', item, setExperience as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* PROJECTS */}
        <div>
          <SectionHeader icon={Layers} title="Projects" open={openSection === 'projects'} onToggle={() => setOpenSection('projects')} />
          {openSection === 'projects' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-3 mb-4">
                {projects.map(proj => (
                  <div key={proj.id} className="bg-bg-card border border-white/5 rounded-xl p-4">
                    <div className="grid sm:grid-cols-2 gap-3 mb-2">
                      <div>
                        <label className={labelCls}>Title</label>
                        <input className={inputCls} value={proj.title} onChange={e => patchProject(proj.id, { title: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelCls}>Level (UG/PG/Personal)</label>
                        <input className={inputCls} value={proj.level} onChange={e => patchProject(proj.id, { level: e.target.value })} />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className={labelCls}>Description</label>
                      <textarea rows={2} className={inputCls} value={proj.description} onChange={e => patchProject(proj.id, { description: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className={labelCls}>Tech Stack (comma separated)</label>
                      <input className={inputCls} value={proj.tech_stack} onChange={e => patchProject(proj.id, { tech_stack: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveRow('projects', proj.id, { title: proj.title, description: proj.description, tech_stack: proj.tech_stack, level: proj.level })}
                        disabled={saving === proj.id}
                        className="btn-primary !py-1.5 !px-3 !text-xs"
                      >
                        <Save size={12} />
                        {saving === proj.id ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => deleteItem('projects', proj.id, setProjects as Parameters<typeof deleteItem>[2])}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddProjectForm onAdd={item => addItem('projects', item, setProjects as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* SKILLS */}
        <div>
          <SectionHeader icon={Code2} title="Skills" open={openSection === 'skills'} onToggle={() => setOpenSection('skills')} />
          {openSection === 'skills' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {skills.map(skill => (
                  <div key={skill.id} className="bg-bg-card border border-white/5 rounded-xl p-3 flex gap-2 items-end">
                    <div className="flex-1">
                      <label className={labelCls}>Skill Name</label>
                      <input className={inputCls} value={skill.name} onChange={e => patchSkill(skill.id, { name: e.target.value })} />
                    </div>
                    <div className="flex-1">
                      <label className={labelCls}>Category</label>
                      <input className={inputCls} value={skill.category} onChange={e => patchSkill(skill.id, { category: e.target.value })} />
                    </div>
                    <div className="flex gap-1.5 pb-0.5">
                      <button
                        onClick={() => saveRow('skills', skill.id, { name: skill.name, category: skill.category })}
                        disabled={saving === skill.id}
                        className="w-8 h-8 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                      >
                        <Save size={13} />
                      </button>
                      <button
                        onClick={() => deleteItem('skills', skill.id, setSkills as Parameters<typeof deleteItem>[2])}
                        className="w-8 h-8 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddSkillForm onAdd={item => addItem('skills', item, setSkills as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* ACHIEVEMENTS */}
        <div>
          <SectionHeader icon={Trophy} title="Achievements & Awards" open={openSection === 'achievements'} onToggle={() => setOpenSection('achievements')} />
          {openSection === 'achievements' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-3 mb-4">
                {achievements.map(ach => (
                  <div key={ach.id} className="bg-bg-card border border-white/5 rounded-xl p-4">
                    <div className="mb-2">
                      <label className={labelCls}>Title</label>
                      <input className={inputCls} value={ach.title} onChange={e => patchAch(ach.id, { title: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className={labelCls}>Description</label>
                      <textarea rows={2} className={inputCls} value={ach.description} onChange={e => patchAch(ach.id, { description: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveRow('achievements', ach.id, { title: ach.title, description: ach.description })}
                        disabled={saving === ach.id}
                        className="btn-primary !py-1.5 !px-3 !text-xs"
                      >
                        <Save size={12} />
                        {saving === ach.id ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => deleteItem('achievements', ach.id, setAchievements as Parameters<typeof deleteItem>[2])}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddAchievementForm onAdd={item => addItem('achievements', item, setAchievements as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* TRAINING */}
        <div>
          <SectionHeader icon={BookOpen} title="Training" open={openSection === 'training'} onToggle={() => setOpenSection('training')} />
          {openSection === 'training' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-3 mb-4">
                {training.map(tr => (
                  <div key={tr.id} className="bg-bg-card border border-white/5 rounded-xl p-4 flex gap-3 items-end">
                    <div className="flex-1">
                      <label className={labelCls}>Training Title</label>
                      <input className={inputCls} value={tr.title} onChange={e => patchTr(tr.id, { title: e.target.value })} />
                    </div>
                    <div className="w-32">
                      <label className={labelCls}>Duration</label>
                      <input className={inputCls} value={tr.duration} onChange={e => patchTr(tr.id, { duration: e.target.value })} />
                    </div>
                    <div className="flex gap-1.5 pb-0.5">
                      <button
                        onClick={() => saveRow('training', tr.id, { title: tr.title, duration: tr.duration })}
                        disabled={saving === tr.id}
                        className="w-8 h-8 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                      >
                        <Save size={13} />
                      </button>
                      <button
                        onClick={() => deleteItem('training', tr.id, setTraining as Parameters<typeof deleteItem>[2])}
                        className="w-8 h-8 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddTrainingForm onAdd={item => addItem('training', item, setTraining as (d: unknown[]) => void)} />
            </div>
          )}
        </div>

        {/* PUBLICATIONS */}
        <div>
          <SectionHeader icon={BookOpen} title="Publications" open={openSection === 'publications'} onToggle={() => setOpenSection('publications')} />
          {openSection === 'publications' && (
            <div className="bg-bg-secondary border border-blue-500/10 border-t-0 rounded-b-xl p-6 -mt-1">
              <div className="space-y-4 mb-4">
                {publications.map(pub => (
                  <div key={pub.id} className="bg-bg-card border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div><label className={labelCls}>Topic / Title</label><input className={inputCls} value={pub.topic} onChange={e => patchPub(pub.id, { topic: e.target.value })} /></div>
                      <div><label className={labelCls}>Author Name</label><input className={inputCls} value={pub.author_name} onChange={e => patchPub(pub.id, { author_name: e.target.value })} /></div>
                    </div>
                    <div><label className={labelCls}>Co-Authors (optional)</label><input className={inputCls} value={pub.co_authors ?? ''} placeholder="e.g. Dr. Jane Doe, Prof. Smith" onChange={e => patchPub(pub.id, { co_authors: e.target.value || null })} /></div>
                    <div><label className={labelCls}>Conference / Proceeding Name</label><input className={inputCls} value={pub.conference_name} onChange={e => patchPub(pub.id, { conference_name: e.target.value })} /></div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div><label className={labelCls}>Date</label><input className={inputCls} value={pub.date ?? ''} placeholder="March 2025" onChange={e => patchPub(pub.id, { date: e.target.value || null })} /></div>
                      <div><label className={labelCls}>Location</label><input className={inputCls} value={pub.location ?? ''} placeholder="Chennai, India" onChange={e => patchPub(pub.id, { location: e.target.value || null })} /></div>
                      <div><label className={labelCls}>ISBN</label><input className={inputCls} value={pub.isbn ?? ''} placeholder="978-X-XXX-XXXXX-X" onChange={e => patchPub(pub.id, { isbn: e.target.value || null })} /></div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => saveRow('publications', pub.id, { topic: pub.topic, author_name: pub.author_name, co_authors: pub.co_authors, conference_name: pub.conference_name, date: pub.date, location: pub.location, isbn: pub.isbn })}
                        disabled={saving === pub.id}
                        className="w-8 h-8 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                      >
                        <Save size={13} />
                      </button>
                      <button
                        onClick={() => deleteItem('publications', pub.id, setPublications as Parameters<typeof deleteItem>[2])}
                        className="w-8 h-8 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <AddPublicationForm onAdd={item => addItem('publications', item, setPublications as (d: unknown[]) => void)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ---- Add Forms ----

function AddCertForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ title: '', issuer: '', year: '' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Add New Certification</p>
      <div className="grid sm:grid-cols-3 gap-3 mb-3">
        <div><label className={labelCls}>Title</label><input className={inputCls} placeholder="Certification title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div><label className={labelCls}>Issuer</label><input className={inputCls} placeholder="Issuer" value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} /></div>
        <div><label className={labelCls}>Year</label><input className={inputCls} placeholder="2024" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} /></div>
      </div>
      <button onClick={() => { if (form.title) { onAdd({ ...form, sort_order: 99 }); setForm({ title: '', issuer: '', year: '' }); } }} className="btn-outline !py-2 !text-xs">
        <Plus size={13} />Add Certification
      </button>
    </div>
  );
}

function AddExpForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ title: '', company: '', duration: '', type: 'Internship', description: '' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Add New Experience</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div><label className={labelCls}>Job Title</label><input className={inputCls} placeholder="UI/UX Designer" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div><label className={labelCls}>Company</label><input className={inputCls} placeholder="Company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
        <div><label className={labelCls}>Duration</label><input className={inputCls} placeholder="1 Month" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
        <div><label className={labelCls}>Type</label><input className={inputCls} placeholder="Internship" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} /></div>
      </div>
      <div className="mb-3"><label className={labelCls}>Description</label><textarea rows={2} className={inputCls} placeholder="What did you do?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
      <button onClick={() => { if (form.title) { onAdd({ ...form, sort_order: 99 }); setForm({ title: '', company: '', duration: '', type: 'Internship', description: '' }); } }} className="btn-outline !py-2 !text-xs">
        <Plus size={13} />Add Experience
      </button>
    </div>
  );
}

function AddProjectForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ title: '', description: '', tech_stack: '', level: 'Personal' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Add New Project</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div><label className={labelCls}>Title</label><input className={inputCls} placeholder="Project name" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div><label className={labelCls}>Level</label><input className={inputCls} placeholder="UG / PG / Personal" value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} /></div>
      </div>
      <div className="mb-2"><label className={labelCls}>Description</label><textarea rows={2} className={inputCls} placeholder="What does this project do?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
      <div className="mb-3"><label className={labelCls}>Tech Stack (comma separated)</label><input className={inputCls} placeholder="React, Node.js, MongoDB" value={form.tech_stack} onChange={e => setForm(f => ({ ...f, tech_stack: e.target.value }))} /></div>
      <button onClick={() => { if (form.title) { onAdd({ ...form, sort_order: 99 }); setForm({ title: '', description: '', tech_stack: '', level: 'Personal' }); } }} className="btn-outline !py-2 !text-xs">
        <Plus size={13} />Add Project
      </button>
    </div>
  );
}

function AddSkillForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ name: '', category: 'Web Development' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4 flex gap-3 items-end">
      <div className="flex-1"><label className={labelCls}>Skill Name</label><input className={inputCls} placeholder="React" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
      <div className="flex-1"><label className={labelCls}>Category</label><input className={inputCls} placeholder="Web Development" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
      <button onClick={() => { if (form.name) { onAdd({ ...form, sort_order: 99 }); setForm({ name: '', category: 'Web Development' }); } }} className="btn-outline !py-2 !text-xs whitespace-nowrap">
        <Plus size={13} />Add
      </button>
    </div>
  );
}

function AddAchievementForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ title: '', description: '' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Add New Achievement</p>
      <div className="mb-2"><label className={labelCls}>Title</label><input className={inputCls} placeholder="Achievement title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
      <div className="mb-3"><label className={labelCls}>Description</label><textarea rows={2} className={inputCls} placeholder="Brief description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
      <button onClick={() => { if (form.title) { onAdd({ ...form, sort_order: 99 }); setForm({ title: '', description: '' }); } }} className="btn-outline !py-2 !text-xs">
        <Plus size={13} />Add Achievement
      </button>
    </div>
  );
}

function AddTrainingForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ title: '', duration: '' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4 flex gap-3 items-end">
      <div className="flex-1"><label className={labelCls}>Training Title</label><input className={inputCls} placeholder="Training program name" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
      <div className="w-32"><label className={labelCls}>Duration</label><input className={inputCls} placeholder="5 Days" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
      <button onClick={() => { if (form.title) { onAdd({ ...form, sort_order: 99 }); setForm({ title: '', duration: '' }); } }} className="btn-outline !py-2 !text-xs whitespace-nowrap">
        <Plus size={13} />Add
      </button>
    </div>
  );
}

function AddPublicationForm({ onAdd }: { onAdd: (item: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({ topic: '', author_name: '', co_authors: '', conference_name: '', date: '', location: '', isbn: '' });
  const inputCls = "w-full bg-bg-elevated border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-600";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";
  return (
    <div className="border-t border-white/5 pt-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Add New Publication</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className={labelCls}>Topic / Title</label><input className={inputCls} placeholder="Paper title" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} /></div>
        <div><label className={labelCls}>Author Name</label><input className={inputCls} placeholder="Your name" value={form.author_name} onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))} /></div>
      </div>
      <div><label className={labelCls}>Co-Authors (optional)</label><input className={inputCls} placeholder="e.g. Dr. Jane Doe, Prof. Smith" value={form.co_authors} onChange={e => setForm(f => ({ ...f, co_authors: e.target.value }))} /></div>
      <div><label className={labelCls}>Conference / Proceeding Name</label><input className={inputCls} placeholder="International Conference on..." value={form.conference_name} onChange={e => setForm(f => ({ ...f, conference_name: e.target.value }))} /></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div><label className={labelCls}>Date</label><input className={inputCls} placeholder="March 2025" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
        <div><label className={labelCls}>Location</label><input className={inputCls} placeholder="Chennai, India" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
        <div><label className={labelCls}>ISBN</label><input className={inputCls} placeholder="978-X-XXX-XXXXX-X" value={form.isbn} onChange={e => setForm(f => ({ ...f, isbn: e.target.value }))} /></div>
      </div>
      <button
        onClick={() => {
          if (form.topic && form.author_name && form.conference_name) {
            onAdd({ ...form, co_authors: form.co_authors || null, date: form.date || null, location: form.location || null, isbn: form.isbn || null, sort_order: 99 });
            setForm({ topic: '', author_name: '', co_authors: '', conference_name: '', date: '', location: '', isbn: '' });
          }
        }}
        className="btn-outline !py-2 !text-xs"
      >
        <Plus size={13} />Add Publication
      </button>
    </div>
  );
}
