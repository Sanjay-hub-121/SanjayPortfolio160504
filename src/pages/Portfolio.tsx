import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile, Skill, Project, Certification, Experience, Achievement, Training, Publication } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import ExperienceSection from '../components/Experience';
import Achievements from '../components/Achievements';
import Publications from '../components/Publications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [training, setTraining] = useState<Training[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const loadCritical = async () => {
      const [p, s] = await Promise.all([
        supabase.from('profile').select('*').maybeSingle(),
        supabase.from('skills').select('*').order('sort_order'),
      ]);
      if (p.data) setProfile(p.data);
      if (s.data) setSkills(s.data);
    };

    const loadOther = async () => {
      const [pr, c, e, a, t, pub] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('certifications').select('*').order('sort_order'),
        supabase.from('experience').select('*').order('sort_order'),
        supabase.from('achievements').select('*').order('sort_order'),
        supabase.from('training').select('*').order('sort_order'),
        supabase.from('publications').select('*').order('sort_order'),
      ]);
      if (pr.data) setProjects(pr.data);
      if (c.data) setCertifications(c.data);
      if (e.data) setExperience(e.data);
      if (a.data) setAchievements(a.data);
      if (t.data) setTraining(t.data);
      if (pub.data) setPublications(pub.data);
    };

    loadCritical();
    const timer = requestIdleCallback(() => loadOther(), { timeout: 2000 });
    return () => cancelIdleCallback(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certifications certifications={certifications} />
      <ExperienceSection experience={experience} training={training} />
      <Achievements achievements={achievements} />
      <Publications publications={publications} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </div>
  );
}
