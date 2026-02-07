import { PerformanceUpdateInput, SessionPerformance, SessionType } from "@/types";
import { db } from "./index";
import { getSessionProgress } from "./progress.repo";

type SessionPerformanceUpsertType = {
  sessionKey: string;
  sessionType: SessionType;
  score?: number
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
  score,
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
      // const lessons = await getSessionProgress(  sessionKey );

      // const totalDuration = lessons?.length > 0 ? lessons.reduce((a, l) => a + l.duration_ms, 0) : 0;

      await db.runAsync(
        `
        INSERT INTO lp_session_performance
          (session_key, session_type, avg_score, total_duration_ms, attempts, completed, updated_at, dirty)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `,
        [
          sessionKey,
          sessionType,
          score ?? null,
          totalDurationMs ?? 0,
          score !== undefined ? 1 : 0,
          completed ?? 0,
          now,
        ]
      );
      return;
    }

    // redo-safe rolling update
    let newAvg = existing.avg_score;
    let newAttempts = existing.attempts;

    if( score !== undefined ) {
      newAvg = existing.attempts === 0 ? score : ( existing.avg_score * existing.attempts + score ) / ( existing.attempts + 1 );
      newAttempts += 1;
    }

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
    return result ?? null;
  }
  catch(error) {
    console.error("getPerformance error:", error);
    return null;
  }
}

export const getTotalCompletedSession = async () => {
  try {
    const avgScore = await db.getFirstAsync(
      'SELECT COUNT(*) FROM lp_session_performance WHERE completed = 1',
    );
    return avgScore
  }
  catch(error) {
    console.error("getAvgScoreBySessionType error:", error);
    return 0;
  }
}

// export const upsertPerformance = async ( payload: PerformanceUpdateInput ) => {
//     try {
//         const now = Math.floor( Date.now() / 1000 );
        
//         const existing = await db.getFirstAsync(
//             `
//             SELECT * FROM lp_performance WHERE user_id = ?
//             `,
//             [payload.userId]
//         );

//         if( !existing ) {
//             await createInitialPerformance( payload, now );
//             return;
//         }

//         await updateExistingPerformance( existing, payload, now )

//     }
//     catch(error) {
//         console.error("upsertPerformance error:", error);
//     }
// }

// export const createInitialPerformance = async (
//     payload: PerformanceUpdateInput,
//     now: number
// ) => {
//     try {
//         const fields = buildPerformanceDelta( payload, null );

//         await db.runAsync(
//             `
//             INSERT INTO lp_performance (
//                 user_id,
//                 total_lessons_completed,
//                 total_session_completed,
//                 practice_completed,
//                 quiz_completed,
//                 reading_completed,
//                 speaking_completed,
//                 listening_completed,
//                 writing_completed,
//                 avg_quiz_score,
//                 avg_speaking_score,
//                 avg_listening_score,
//                 avg_writing_score,
//                 quiz_score_count,
//                 speaking_score_count,
//                 listening_score_count,
//                 writing_score_count,
//                 created_at,
//                 updated_at,
//                 dirty
//             ) VALUES (
//                 ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1
//             )
//             `,
//             [
//                 payload.userId,
//                 fields.totalLessons,
//                 fields.totalSessions,
//                 fields.practice,
//                 fields.quiz,
//                 fields.reading,
//                 fields.speaking,
//                 fields.listening,
//                 fields.writing,
//                 fields.avgQuiz,
//                 fields.avgSpeaking,
//                 fields.avgListening,
//                 fields.avgWriting,
//                 fields.quizCount,
//                 fields.speakingCount,
//                 fields.listeningCount,
//                 fields.writingCount,
//                 now,
//                 now,
//             ]
//         );
//     }
//     catch(error) {
//         console.error("createInitialPerformance error:", error);
//     }
// }

// export const updateExistingPerformance = async (
//     current: any,
//     payload: PerformanceUpdateInput,
//     now: number
// ) => {
//     try {
//         const delta = buildPerformanceDelta( payload, current );

//         await db.runAsync(
//             `
//             UPDATE lp_performance SET
//                 total_lessons_completed = total_lessons_completed + ?,
//                 total_session_completed = total_session_completed + ?,
//                 practice_completed = practice_completed + ?,
//                 quiz_completed = quiz_completed + ?,
//                 reading_completed = reading_completed + ?,
//                 speaking_completed = speaking_completed + ?,
//                 listening_completed = listening_completed + ?,
//                 writing_completed = writing_completed + ?,
//                 avg_quiz_score = ?,
//                 avg_speaking_score = ?,
//                 avg_listening_score = ?,
//                 avg_writing_score = ?,
//                 quiz_score_count = quiz_score_count + ?,
//                 speaking_score_count = speaking_score_count + ?,
//                 listening_score_count = listening_score_count + ?,
//                 writing_score_count = writing_score_count + ?,
//                 updated_at = ?,
//                 dirty = 1
//             WHERE user_id = ?
//             `,
//             [
//                 delta.totalLessons,
//                 delta.totalSessions,
//                 delta.practice,
//                 delta.quiz,
//                 delta.reading,
//                 delta.speaking,
//                 delta.listening,
//                 delta.writing,
//                 delta.avgQuiz,
//                 delta.avgSpeaking,
//                 delta.avgListening,
//                 delta.avgWriting,
//                 delta.quizCount,
//                 delta.speakingCount,
//                 delta.listeningCount,
//                 delta.writingCount,
//                 now,
//                 payload.userId,
//             ]
//         );
//     }
//     catch(error) {
//         console.error("createInitialPerformance error:", error);
//     }
// }

// const buildPerformanceDelta = (input: PerformanceUpdateInput, current: any) => {
//   const base = {
//     totalLessons: 1,
//     totalSessions: 1,
//     practice: 0,
//     quiz: 0,
//     reading: 0,
//     speaking: 0,
//     listening: 0,
//     writing: 0,
//     avgQuiz: current?.avg_quiz_score ?? null,
//     avgSpeaking: current?.avg_speaking_score ?? null,
//     avgListening: current?.avg_listening_score ?? null,
//     avgWriting: current?.avg_writing_score ?? null,
//     quizCount: 0,
//     speakingCount: 0,
//     listeningCount: 0,
//     writingCount: 0,
//   };

//   switch (input.type) {
//     case "practice":
//       base.practice = 1;
//       break;

//     case "quiz":
//     case "reading":
//       base.quiz = 1;
//       if (input.score !== undefined) {
//         base.avgQuiz = rollingAverage(
//           base.avgQuiz,
//           current?.quiz_score_count ?? 0,
//           input.score
//         );
//         base.quizCount = 1;
//       }
//       break;

//     case "speaking":
//       base.speaking = 1;
//       if (input.score !== undefined) {
//         base.avgSpeaking = rollingAverage(
//           base.avgSpeaking,
//           current?.speaking_score_count ?? 0,
//           input.score
//         );
//         base.speakingCount = 1;
//       }
//       break;

//     case "listening":
//       base.listening = 1;
//       if (input.score !== undefined) {
//         base.avgListening = rollingAverage(
//           base.avgListening,
//           current?.listening_score_count ?? 0,
//           input.score
//         );
//         base.listeningCount = 1;
//       }
//       break;

//     case "writing":
//       base.writing = 1;
//       if (input.score !== undefined) {
//         base.avgWriting = rollingAverage(
//           base.avgWriting,
//           current?.writing_score_count ?? 0,
//           input.score
//         );
//         base.writingCount = 1;
//       }
//       break;
//   }

//   return base;
// }