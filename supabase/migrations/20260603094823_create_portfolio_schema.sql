/*
  # Sanjay G Portfolio – Full Schema

  ## Summary
  Creates all tables needed to power a dynamic portfolio with an admin CMS.

  ## Tables
  1. `profile` – Single-row owner data (bio, contact, objective)
  2. `skills` – Skill entries with name and category
  3. `projects` – Portfolio project entries
  4. `certifications` – Certification items
  5. `experience` – Work / internship experience entries
  6. `achievements` – Award / achievement entries
  7. `training` – Training program entries

  ## Security
  - RLS enabled on all tables
  - Public (anon) SELECT on all tables (portfolio is public)
  - Only authenticated users can INSERT / UPDATE / DELETE
*/

-- PROFILE
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Sanjay G',
  title text NOT NULL DEFAULT 'UI/UX Designer & Freelancer',
  bio text NOT NULL DEFAULT '',
  objective text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  github text NOT NULL DEFAULT '',
  portfolio text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read profile"
  ON profile FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert profile"
  ON profile FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  tech_stack text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT 'UG',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- CERTIFICATIONS
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read certifications"
  ON certifications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert certifications"
  ON certifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update certifications"
  ON certifications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete certifications"
  ON certifications FOR DELETE
  TO authenticated
  USING (true);

-- EXPERIENCE
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Internship',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert experience"
  ON experience FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update experience"
  ON experience FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete experience"
  ON experience FOR DELETE
  TO authenticated
  USING (true);

-- ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read achievements"
  ON achievements FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update achievements"
  ON achievements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete achievements"
  ON achievements FOR DELETE
  TO authenticated
  USING (true);

-- TRAINING
CREATE TABLE IF NOT EXISTS training (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  duration text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE training ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read training"
  ON training FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert training"
  ON training FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update training"
  ON training FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete training"
  ON training FOR DELETE
  TO authenticated
  USING (true);
