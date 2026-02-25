import { DBProgress, SessionType } from "@/types";
import { db } from "./index";

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

export const getSessionProgress = async ( sessionKey: string ): Promise<DBProgress[]> => {
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

export const upsertProgress = async ( p: DBProgress ) => {
  try {
    const result = await db.runAsync(
      `INSERT OR REPLACE INTO lp_progress
      (category_id, unit_id, content_type, content_id, session_key, lesson_order, completed, score, duration_ms, progress_percent, updated_at, dirty)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING session_key`,
      [
        p.category_id,
        p.unit_id,
        p.content_type,
        p.content_id,
        p.session_key,
        p.lesson_order ?? 0, // ✅ REQUIRED
        p.completed ? 1 : 0,
        p.score ?? 0,
        p.duration_ms ?? 0,
        p.progress_percent ?? 0,
        p.updated_at,
        p.dirty ?? 1,
      ]
    );
    console.log("Progress inserted result:", result);
  }
  catch(error) {
    console.error("Progress repo upsertProgress error:", error);
  }
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

export const getCompletedLessons = async () => {
    try {
        const result = await db.getFirstAsync<{count: number}>(`
            SELECT count(*) as count
            FROM lp_progress
            WHERE completed = 1
        `);
        console.log("DB ready check");
        return result?.count ?? 0;
    }
    catch(error) {
        console.error("Get Completed Lessons Error:", error)
        throw error;
    }
}

export const getLessonProgress = async () => {
  try {
    const result = await db.getFirstAsync<{
      completed: number;
      total: number;
    }>(`
      SELECT
        (SELECT COUNT(*) FROM lp_lesson_progress WHERE completed = 1) as completed,
        (SELECT COUNT(*) FROM lp_lessons) as total
    `);

    const completed = result?.completed ?? 0;
    const total = result?.total ?? 0;

    return {
      completed,
      total,
      percentage: total === 0
        ? 0
        : Math.round((completed / total) * 100),
    };
  } catch (error) {
    console.error("Get Lesson Progress Error:", error);
    throw error;
  }
};

interface MarkLessonCompleted {
  category_id: string,
  unit_id: string,
  content_type: SessionType;
  lessonId: string;
  sessionKey: string;
  score?: number;
  duration_ms?: number;
  lesson_order?: number;
}

export const markLessonCompleted  = async (payload: MarkLessonCompleted) => {
  try {
    const now = Math.floor( Date.now() / 1000 );

    await db.runAsync(
      `
      INSERT INTO lp_progress
        (category_id,
        unit_id,
        content_type,
        content_id,
        completed,
        score,
        duration_ms,
        lesson_order,
        progress_percent,
        session_key,
        updated_at,
        dirty)
      VALUES
        (?, ?, ?, ?, 1, ?, ?, ?, 100, ?, ?, 1)
      ON CONFLICT(content_type, content_id)
      DO UPDATE SET
        completed = 1,
        score = excluded.score,
        progress_percent = 100,
        updated_at = excluded.updated_at,
        dirty = 1
      `,
      [
        payload.category_id,
        payload.unit_id,
        payload.content_type,
        payload.lessonId,
        payload.score ?? 0,
        payload.duration_ms ?? 0,
        payload.lesson_order ?? 0,
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

export const clearProgress = async () => {
  try{
    await db.runAsync(`DELETE FROM lp_progress`);
    console.log("Cleared all data from lp_progress table.");
  }
  catch(error) {
    console.error("clearProgress error:", error);
  }
}