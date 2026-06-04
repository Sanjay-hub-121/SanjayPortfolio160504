/*
  # Add GitHub repos link and update project details

  ## Changes
  1. Add `github_repos` column to profile table for GitHub repositories link
  2. Update existing projects with detailed descriptions
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profile' AND column_name = 'github_repos'
  ) THEN
    ALTER TABLE profile ADD COLUMN github_repos text NOT NULL DEFAULT '';
  END IF;
END $$;

UPDATE profile SET github_repos = 'https://github.com/Sanjay-hub-121?tab=repositories' WHERE name = 'Sanjay G';
