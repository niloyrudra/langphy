import { SessionPerformance, SessionType } from "@/types";
import { db } from "./index.native";
import { authSnapshot } from "@/snapshots/authSnapshot";

type SessionPerformanceUpsertType = {
  user_id: string;
  unit_id: string;
  session_key: string;
  session_type: SessionType;
  avgScore: number;
  totalDurationMs?: number;
  completed?: number;
}

const rollingAverage = (
  currentAvg: number | null,
  currentCount: number,
  newValue: number
) => {
  if (!currentAvg || currentCount === 0) return newValue;
  return (currentAvg * currentCount + newValue) / (currentCount + 1);
}

export const upsertSessionPerformance = async ({
  user_id,
  unit_id,
  session_key,
  session_type,
  avgScore,
  totalDurationMs,
  completed
}: SessionPerformanceUpsertType ) => {
  try {
    const now = Math.floor( Date.now() / 1000 );

    const existing = await db.getFirstAsync<any>(
      `SELECT * FROM lp_session_performance WHERE session_key = ?`,
      [session_key]
    );

    if(!existing) {
      await db.runAsync(
        `
        INSERT INTO lp_session_performance
          (user_id, unit_id, session_key, session_type, avg_score, total_duration_ms, attempts, completed, updated_at, dirty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        `,
        [
          user_id,
          unit_id,
          session_key,
          session_type,
          avgScore,
          totalDurationMs ?? 0,
          avgScore !== undefined ? 1 : 0,
          completed ?? 0,
          now,
        ]
      );
      console.log("Inserted new session performance - sessionKey", session_key);
      return;
    }

    // redo-safe rolling update
    let newAvg = existing.avg_score;
    let newAttempts = existing.attempts;

    // if( score !== undefined ) {
    //   newAvg = existing.attempts === 0 ? score : ( existing.avg_score * existing.attempts + score ) / ( existing.attempts + 1 );
    //   newAttempts += 1;
    // }

    await db.runAsync(
      `
      UPDATE lp_session_performance SET
        avg_score = ?,
        attempts = ?,
        updated_at = ?,
        dirty = 1
      WHERE session_key = ? AND user_id = ?
      `,
      [
        newAvg,
        newAttempts,
        now,
        session_key,
        user_id
      ]
    );
    console.log( "upsertSessionPerformance updated", newAvg, newAttempts, session_key );
  }
  catch(error) {
    console.error( "upsertSessionPerformance error:", error );
  }
}

export const getAvgScoreBySessionType = async (sessionType: SessionType) => {
  const userId = authSnapshot.getUserId() ?? "";
  try {
    const avgScore = await db.getFirstAsync(
      'SELECT AVG(avg_score) FROM lp_session_performance WHERE session_type = ? AND user_id = ?',
      [sessionType, userId]
    );
    return avgScore
  }
  catch(error) {
    console.error("getAvgScoreBySessionType error:", error);
    return 0;
  }
}

export const getDirtyPerformance = async (): Promise<SessionPerformance[]> => {
  const userId = authSnapshot.getUserId() ?? "";
  return await db.getAllAsync<SessionPerformance>(
    "SELECT * FROM lp_session_performance WHERE dirty = 1 AND user_id = ?",
    [userId]
  );
};

export const getPerformance = async (sessionKey: string): Promise<SessionPerformance | null> => {
  const userId = authSnapshot.getUserId() ?? "";
  try {
    const result = await db.getFirstAsync<SessionPerformance>(
      'SELECT * FROM lp_session_performance WHERE session_key = ? AND user_id = ?',
      [sessionKey, userId]
    );
    // console.log("getPerformance result:", result, sessionKey)
    return result ?? null;
  }
  catch(error) {
    console.error("getPerformance error:", error);
    return null;
  }
}

export const getTotalCompletedSessions = async () => {
  const userId = authSnapshot.getUserId() ?? "";
  try {
    const result = await db.getFirstAsync<{count: number}>(
      'SELECT COUNT(*) as count FROM lp_session_performance WHERE completed = 1 AND user_id = ?',
      [userId]
    );
    return result?.count ?? 0;
  }
  catch(error) {
    console.error("getTotalCompletedSession error:", error);
    return 0;
  }
}

export const getTotalCompletedUnits = async () => {
  const userId = authSnapshot.getUserId() ?? "";
  try {
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM (
        SELECT SUBSTR(session_key, 1, INSTR(session_key, ':') - 1) as unit_id
        FROM lp_session_performance
        WHERE completed = 1 AND user_id = ?
        GROUP BY unit_id
        HAVING COUNT(DISTINCT session_type) = 6
      )`,
      [userId]
    );
    return result?.count ?? 0;
  } catch (error) {
    console.error("getTotalCompletedUnits error:", error);
    return 0;
  }
};

export const clearSessionPerformance = async () => {
  try{
    await db.runAsync(`DELETE FROM lp_session_performance`); // DELETE is slower, delete row-by-row | TRUNCATE
    console.log("Cleared all data from lp_session_performance table.");
  }
  catch(error) {
    console.error("clearSessionPerformance error:", error);
  }
}

export const markPerformanceClean = async (items: SessionPerformance[]) => {
  if (!items.length) return;

  const placeholders = items.map(
    () => "(?, ?)"
  ).join(",");

  const params = items.flatMap(p => [
    p.session_key,
    p.user_id,
  ]);

  await db.runAsync(
    `UPDATE lp_session_performance
     SET dirty = 0
     WHERE (session_key, user_id) IN (${placeholders})`,
    params
  );
};