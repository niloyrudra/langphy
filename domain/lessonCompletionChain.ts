import { markLessonCompleted } from "@/db/progress.repo";
import { upsertSessionPerformance } from "@/db/performance.repo";
// import { getStreaks, upsertStreak } from "@/db/streaks.repo";
import { SessionType } from "@/types";
import { avgScore, sumSessionDuration } from "./sessionRules";
import { applyStreakIfEligible } from "./streakRules";
import { enqueueEvent } from "@/events/localEvents";
import { LessonCompletedEvent, SessionCompletedEvent, StreakUpdateEvent } from "@/events/kafkaContracts";

type LessonCompletionChainInput = {
  userId: string;
  sessionKey: string;
  performanceSessionKey: string;
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
  // const progressPayload = {
  //   userId: input.userId,
  //   sessionKey: input.sessionKey,
  //   lessonId: input.lessonId,
  //   lessonType: input.lessonType,
  //   score: input.score,
  //   duration_ms: input.duration_ms,
  //   occurredAt: now,
  // };
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

  const totalDuration = await sumSessionDuration(input.sessionKey);
  const avgLessonScore = await avgScore(input.sessionKey);

  /* ----------------------------------
   * 3️⃣ SESSION PERFORMANCE (once)
   * ---------------------------------- */
  await upsertSessionPerformance({
    sessionKey: input.performanceSessionKey,
    sessionType: input.sessionType,
    avgScore: avgLessonScore ?? 0,
    totalDurationMs: totalDuration,
    completed: 1,
  });

  /* ----------------------------------
   * 4️⃣ STREAK (guarded)
   * ---------------------------------- */
  const streak = await applyStreakIfEligible({
    userId: input.userId,
    occurredAt: now,
  });

  if( streak.updated ) {
    await enqueueEvent<StreakUpdateEvent>(
      "streak.updated.v1",
      input.userId,
      `streak:${input.userId}`,
      {
        userId: input.userId,
        occurredAt: now
      }
    );
    console.log("Streak Updated...");
  }


  // 5️⃣ Emit session.completed event
  await enqueueEvent<SessionCompletedEvent>(
    "session.completed.v1",
    input.userId,
    `session:${input.sessionKey}`,
    {
      userId: input.userId,
      sessionKey: input.performanceSessionKey,
      sessionType: input.lessonType,
      total_duration_ms: totalDuration,
      occurredAt: now,
    }
  );

  console.log("Session Completion Updated...");
};
