import { SessionType } from "@/types";
import { db } from "./index";

export type DBProgress = {
  content_type: string;
  content_id: string;
  completed: number;
  session_key: string;
  lesson_order?: number;
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

export const getSessionProgress = async (
  sessionKey: string
): Promise<DBProgress[]> => {
  try {
    return await db.getAllAsync<DBProgress>(
      "SELECT * FROM lp_progress WHERE session_key = ?",
      [sessionKey]
    );
  } catch (error) {
    console.error("getSessionProgress error:", error);
    return [];
  }
};

export const upsertProgress = async (p: {
  content_type: string;
  content_id: string;
  session_key: string;
  completed?: boolean;
  score?: number;
  progress_percent?: number;
  updated_at: number;
}) => {
  await db.runAsync(
    `INSERT OR REPLACE INTO lp_progress
     (content_type, content_id, session_key, completed, score, progress_percent, updated_at, dirty)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    [
      p.content_type,
      p.content_id,
      p.session_key,
      p.completed ? 1 : 0,
      p.score ?? 0,
      p.progress_percent ?? 0,
      p.updated_at,
    ]
  );
};

export const countCompletedLessons = async ( sessionKey: string ) => {
  try {
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM lp_progress WHERE session_key = ? AND completed = 1`,
      [sessionKey]
    );

    return result?.count ?? 0;
  }
  catch(error) {
    console.error( "countCompletedLesson error:", error );
  }
}

interface MarkLessonCompleted {
  content_type: SessionType;
  lessonId: string;
  sessionKey: string;
  score?: number
}

export const markLessonCompleted  = async (payload: MarkLessonCompleted) => {
  try {
    const now = Math.floor( Date.now() / 1000 );

    await db.runAsync(
      `
      INSERT INTO lp_progress
        (content_type, content_id, completed, score, progress_percent, session_key, updated_at, dirty)
      VALUES
        (?, ?, 1, ?, 100, ?, ?, 1)
      ON CONFLICT(content_type, content_id)
      DO UPDATE SET
        completed = 1,
        score = excluded.score,
        progress_percent = 100,
        updated_at = excluded.updated_at,
        dirty = 1
      `,
      [
        payload.content_type,
        payload.lessonId,
        payload.score ?? 0,
        payload.sessionKey,
        now
      ]
    );

    return payload;
  }
  catch(error) {
    console.error("markLessonCompleted error:", error)
  }
}

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
