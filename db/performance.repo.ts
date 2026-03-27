import { SessionPerformance, SessionType } from "@/types";
import { db } from "./index";
import { authSnapshot } from "@/snapshots/authSnapshot";
// import { getSessionProgress } from "./progress.repo";

type SessionPerformanceUpsertType = {
  user_id: string;
  sessionKey: string;
  sessionType: SessionType;
  avgScore: number
  totalDurationMs?: number
  completed?: number
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
  sessionKey,
  sessionType,
  avgScore,
  totalDurationMs,
  completed
}: SessionPerformanceUpsertType ) => {
  try {
    const now = Math.floor( Date.now() / 1000 );

    const existing = await db.getFirstAsync<any>(
      `SELECT * FROM lp_session_performance WHERE session_key = ?`,
      [sessionKey]
    );

    if(!existing) {
      await db.runAsync(
        `
        INSERT INTO lp_session_performance
          (user_id, session_key, session_type, avg_score, total_duration_ms, attempts, completed, updated_at, dirty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
        `,
        [
          user_id,
          sessionKey,
          sessionType,
          avgScore,
          totalDurationMs ?? 0,
          avgScore !== undefined ? 1 : 0,
          completed ?? 0,
          now,
        ]
      );
      console.log("Inserted new session performance - sessionKey", sessionKey);
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
        sessionKey,
        user_id
      ]
    );
    console.log( "upsertSessionPerformance updated", newAvg, newAttempts, sessionKey );
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