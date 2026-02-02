import { db } from "./index";

export type DBProgress = {
  content_type: string;
  content_id: string;
  completed: number;
  score: number;
  progress_percent: number;
  updated_at: number;
  dirty: number;
};

export const getAllProgress = async (): Promise<DBProgress[]> => {
  return await db.getAllAsync<DBProgress>(
    "SELECT * FROM lp_progress"
  );
};

export const getDirtyProgress = async (): Promise<DBProgress[]> => {
  return await db.getAllAsync<DBProgress>(
    "SELECT * FROM lp_progress WHERE dirty = 1"
  );
};

export const upsertProgress = async (p: {
  content_type: string;
  content_id: string;
  completed?: boolean;
  score?: number;
  progress_percent?: number;
  updated_at: number;
}) => {
  await db.runAsync(
    `INSERT OR REPLACE INTO lp_progress
     (content_type, content_id, completed, score, progress_percent, updated_at, dirty)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    [
      p.content_type,
      p.content_id,
      p.completed ? 1 : 0,
      p.score ?? 0,
      p.progress_percent ?? 0,
      p.updated_at,
    ]
  );
};

export const markProgressClean = async (items: DBProgress[]) => {
  if (!items.length) return;

  const ids = items.map(
    () => "(?, ?)"
  ).join(",");

  const params = items.flatMap(p => [
    p.content_type,
    p.content_id,
  ]);

  await db.runAsync(
    `UPDATE lp_progress
     SET dirty = 0
     WHERE (content_type, content_id) IN (${ids})`,
    params
  );
};
