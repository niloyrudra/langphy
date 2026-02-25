import { SessionPerformance, SessionType } from "@/types";
import { db } from "./index";
// import { getSessionProgress } from "./progress.repo";

type SessionPerformanceUpsertType = {
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
          (session_key, session_type, avg_score, total_duration_ms, attempts, completed, updated_at, dirty)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        RETURNING *
        `,
        [
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
      WHERE session_key = ?
      `,
      [
        newAvg,
        newAttempts,
        now,
        sessionKey
      ]
    );
    console.log( "upsertSessionPerformance updated", newAvg, newAttempts, sessionKey );
  }
  catch(error) {
    console.error( "upsertSessionPerformance error:", error );
  }
}

export const getAvgScoreBySessionType = async (sessionType: SessionType) => {
  try {
    const avgScore = await db.getFirstAsync(
      'SELECT AVG(avg_score) FROM lp_session_performance WHERE session_type = ?',
      [sessionType]
    );
    return avgScore
  }
  catch(error) {
    console.error("getAvgScoreBySessionType error:", error);
    return 0;
  }
}

export const getPerformance = async (sessionKey: string): Promise<SessionPerformance | null> => {
  try {
    const result = await db.getFirstAsync<SessionPerformance>(
      'SELECT * FROM lp_session_performance WHERE session_key = ?',
      [sessionKey]
    );
    // console.log("getPerformance result:", result, sessionKey)
    return result ?? null;
  }
  catch(error) {
    console.error("getPerformance error:", error);
    return null;
  }
}

export const getTotalCompletedSession = async () => {
  try {
    const result = await db.getFirstAsync<{count: number}>(
      'SELECT COUNT(*) as count FROM lp_session_performance WHERE completed = 1',
    );
    return result?.count ?? 0;
  }
  catch(error) {
    console.error("getTotalCompletedSession error:", error);
    return 0;
  }
}

export const clearSessionPerformance = async () => {
  try{
    await db.runAsync(`DELETE FROM lp_session_performance`); // DELETE is slower, delete row-by-row | TRUNCATE
    console.log("Cleared all data from lp_session_performance table.");
  }
  catch(error) {
    console.error("clearSessionPerformance error:", error);
  }
}