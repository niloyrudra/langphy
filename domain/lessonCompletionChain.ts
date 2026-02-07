import {
    markLessonCompleted,
} from "@/db/progress.repo";
import { getAvgScoreBySessionType, upsertSessionPerformance } from "@/db/performance.repo";
import { upsertStreak } from "@/db/streaks.repo";
import { SessionType } from "@/types";
import { isSessionCompleted, sumSessionDuration } from "./sessionRules";
import { applyStreakIfEligible, hasCompletedSessionToday } from "./streakRules";
import { enqueueEvent } from "@/events/localEvents";
import { LessonCompletedEvent, SessionCompletedEvent } from "@/events/kafkaContracts";

// type LessonCompletionInput = {
//   userId: string;
//   lessonId: string;
//   sessionKey: string;
//   sessionType: SessionType;
//   totalLessonsInSession: number;
//   score?: number;
// };

type LessonCompletionChainInput = {
  userId: string;
  sessionKey: string;
  sessionType: SessionType;

  lessonId: string;
  lessonOrder: number;
  lessonType: SessionType;

  score?: number;
  duration_ms: number;

  isFinalLesson: boolean;
};

export const lessonCompletionChain = async (
  input: LessonCompletionChainInput
) => {
  const now = Math.floor(Date.now() / 1000);

  /* ----------------------------------
   * 1️⃣ PROGRESS (always)
   * ---------------------------------- */
  await markLessonCompleted({
    content_type: input.lessonType,
    lessonId: input.lessonId,
    sessionKey: input.sessionKey,
    score: input.score,
    duration_ms: input.duration_ms,
    lesson_order: input.lessonOrder,
  });

  // 2️⃣ Emit lesson.completed event
  await enqueueEvent<LessonCompletedEvent>(
    "lesson.completed.v1",
    input.userId,
    `lesson:${input.lessonId}`,
    {
      userId: input.userId,
      sessionKey: input.sessionKey,
      lessonId: input.lessonId,
      lessonType: input.lessonType,
      score: input.score,
      duration_ms: input.duration_ms,
      occurredAt: now,
    }
  );

  /* ----------------------------------
   * STOP if not final lesson
   * ---------------------------------- */
  if (!input.isFinalLesson) return;

  const totalDuration = await sumSessionDuration(input.sessionKey)

  /* ----------------------------------
   * 3️⃣ SESSION PERFORMANCE (once)
   * ---------------------------------- */
  await upsertSessionPerformance({
    sessionKey: input.sessionKey,
    sessionType: input.sessionType,
    score: input.score ?? 0,
    totalDurationMs: totalDuration,
    completed: 1,
  });

  /* ----------------------------------
   * 4️⃣ STREAK (guarded)
   * ---------------------------------- */
  await applyStreakIfEligible({
    userId: input.userId,
    occurredAt: now,
  });

  // 5️⃣ Emit session.completed event
  await enqueueEvent<SessionCompletedEvent>(
    "session.completed.v1",
    input.userId,
    `session:${input.sessionKey}`,
    {
      userId: input.userId,
      sessionKey: input.sessionKey,
      sessionType: input.lessonType,
      total_duration_ms: totalDuration,
      occurredAt: now,
    }
  );
};

// export const lessonCompletionChain = async ({
//   userId,
//   lessonId,
//   sessionKey,
//   sessionType,
//   totalLessonsInSession,
//   score,
// }: LessonCompletionInput) => {

//   // if( !sessionKey ) sessionKey = `${unitId}:${sessionType}`;

//   // 1️⃣ Always update progress
//   await markLessonCompleted({
//     content_type: sessionType,
//     lessonId,
//     sessionKey,
//     score,
//   });

//   // 2️⃣ Check session completion
//   const sessionCompleted = await isSessionCompleted(
//     sessionKey,
//     totalLessonsInSession
//   );

//   await enqueueEvent(
//     "lesson.completed.v1",
//     userId,
//     `lesson:${lessonId}`,
//     {
//       lesson_id: lessonId,
//       session_key: sessionKey,
//       sessionType,
//       score,
//     }
//   );

//   if (!sessionCompleted) return;
  
//   // ### After Session Completion ###

//   // 3️⃣ Update performance (redo-safe)
//   await upsertSessionPerformance({
//     sessionKey,
//     sessionType,
//     score,
//   });

//   // 4️⃣ Update streak ONLY once per day
//   const alreadyCountedToday = await hasCompletedSessionToday(userId);

//   if (!alreadyCountedToday) {
//     const now = Math.floor(Date.now() / 1000);

//     await upsertStreak({
//       user_id: userId,
//       current_streak: 1, // repo handles increment
//       longest_streak: 0, // repo handles max
//       last_activity_date: now,
//       updated_at: now,
//     });
//   }

//   // 5️⃣ Emit local event
//   await enqueueEvent(
//     "session.completed.v1",
//     userId,
//     `session:${sessionKey}`,
//     {
//       session_key: sessionKey,
//       total_lessons: totalLessonsInSession,
//     }
//   );

//   // Session Score
//   const avgScore = await getAvgScoreBySessionType(sessionType);
  
//   await enqueueEvent(
//     "session.scored.v1",
//     userId,
//     `session-score:${sessionKey}`,
//     {
//       session_key: sessionKey,
//       sessionType,
//       avg_score: avgScore,
//       // attempts,
//     }
//   );


// };


// export async function completeLessonChain(input: CompleteLessonChainInput) {
//   const now = Math.floor(Date.now() / 1000);
//   const sessionKey = `${input.unitId}:${input.sessionType}`;

//   /**
//    * 1️⃣ Mark ALL lessons as completed
//    * (safe because INSERT ... ON CONFLICT)
//    */
//   for (const lessonId of input.lessonIds) {
//     await markLessonCompleted({
//       content_type: input.sessionType,
//       lessonId,
//       sessionKey,
//       score: input.score,
//     });
//   }

//   /**
//    * 2️⃣ Update streaks (once per day, internally guarded)
//    */
//   await updateStreaksIfNeeded(input.userId);

//   /**
//    * 3️⃣ Update performance (replays allowed)
//    */
//   await upsertPerformance({
//     userId: input.userId,
//     type: input.sessionType,
//     score: input.score,
//     maxScore: input.maxScore,
//   });

//   /**
//    * 4️⃣ Emit local event (Kafka-friendly)
//    */
//   await emitSessionCompletedEvent({
//     userId: input.userId,
//     sessionKey,
//     sessionType: input.sessionType,
//     score: input.score,
//     timeSpentSec: input.timeSpentSec,
//     timestamp: now,
//   });

//   return {
//     ok: true,
//     sessionKey,
//   };
// }
