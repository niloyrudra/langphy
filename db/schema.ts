export const CREATE_PROFILE_TABLE = `
CREATE TABLE IF NOT EXISTS lp_profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  profile_image TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  dirty INTEGER NOT NULL DEFAULT 0
);
`;

export const CREATE_SETTINGS_TABLE = `
CREATE TABLE IF NOT EXISTS lp_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  theme TEXT DEFAULT 'light',
  sound_effect INTEGER DEFAULT 1,
  speaking_service INTEGER DEFAULT 1,
  reading_service INTEGER DEFAULT 1,
  listening_service INTEGER DEFAULT 1,
  writing_service INTEGER DEFAULT 1,
  practice_service INTEGER DEFAULT 1,
  quiz_service INTEGER DEFAULT 1,
  notifications INTEGER DEFAULT 1,
  language TEXT DEFAULT 'en',
  updated_at INTEGER NOT NULL,
  dirty INTEGER NOT NULL DEFAULT 0
);
`;

export const CREATE_PROGRESS_TABLE = `
CREATE TABLE IF NOT EXISTS lp_progress (
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,

  session_key TEXT NOT NULL,
  lesson_order INTEGER NOT NULL,

  completed INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  progress_percent INTEGER DEFAULT 0,
  updated_at INTEGER NOT NULL,
  dirty INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (content_type, content_id)
);
`;

export const CREATE_STREAKS_TABLE = `
CREATE TABLE IF NOT EXISTS lp_streaks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date INTEGER,
  updated_at INTEGER NOT NULL,
  dirty INTEGER NOT NULL DEFAULT 0
);
`;

export const CREATE_PERFORMANCE_TABLE = `
CREATE TABLE IF NOT EXISTS lp_performance (
  user_id TEXT PRIMARY KEY,
  total_lessons_completed INTEGER NOT NULL DEFAULT 0,
  total_session_completed INTEGER NOT NULL DEFAULT 0,
  practice_completed INTEGER NOT NULL DEFAULT 0,
  quiz_completed INTEGER NOT NULL DEFAULT 0,
  reading_completed INTEGER NOT NULL DEFAULT 0,
  speaking_completed INTEGER NOT NULL DEFAULT 0,
  listening_completed INTEGER NOT NULL DEFAULT 0,
  writing_completed INTEGER NOT NULL DEFAULT 0,
  avg_quiz_score FLOAT,
  avg_speaking_score FLOAT,
  avg_listening_score FLOAT,
  avg_writing_score FLOAT,
  quiz_score_count INTEGER NOT NULL DEFAULT 0,
  speaking_score_count INTEGER NOT NULL DEFAULT 0,
  listening_score_count INTEGER NOT NULL DEFAULT 0,
  writing_score_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  dirty INTEGER NOT NULL DEFAULT 0
)
`;

// TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() is not supported in SQLite, consider using INTEGER to store Unix timestamps

export const CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS lp_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  position_at INTEGER
);
`;

export const CREATE_UNITS_TABLE = `
CREATE TABLE IF NOT EXISTS lp_units (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL
);
`;

export const CREATE_LESSONS_TABLE = `
CREATE TABLE IF NOT EXISTS lp_lessons (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- practice | listening | speaking | reading | writing | quiz
  category_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  payload TEXT NOT NULL, -- JSON blob
  dirty INTEGER DEFAULT 0,
  updated_at INTEGER NOT NULL
);
`;