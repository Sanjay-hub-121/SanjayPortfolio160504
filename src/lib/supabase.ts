import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  objective: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
  updated_at: string;
  github_repos: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  sort_order: number;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  level: string;
  sort_order: number;
  created_at: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  sort_order: number;
  created_at: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  type: string;
  sort_order: number;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
};

export type Training = {
  id: string;
  title: string;
  duration: string;
  sort_order: number;
  created_at: string;
};
