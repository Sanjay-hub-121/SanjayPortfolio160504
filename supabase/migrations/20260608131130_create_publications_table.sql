CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  author_name text NOT NULL,
  co_authors text,
  conference_name text NOT NULL,
  date text,
  location text,
  isbn text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_publications" ON publications FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "insert_publications" ON publications FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_publications" ON publications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_publications" ON publications FOR DELETE
  TO authenticated USING (true);
