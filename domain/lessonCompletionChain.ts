/**
 * lessonCompletionChain
 *
 * Orchestrates everything that happens when a lesson is answered:
 *   1. Mark progress (always)
 *   2. Emit lesson.completed event
 *   3. On final lesson: upsert session performance, apply streak, emit session.completed
 *
 * FIXES from previous version:
 * - Added concurrency guard (isRunning flag) to prevent duplicate calls from
 *   rapid double-taps on the Check button
 * - Guard is per-sessionKey so different sessions don't block each other
 */

import { markLessonCompleted } from "@/db/progress.repo";
import { upsertSessionPerformance } from "@/db/performance.repo";
import { SessionType } from "@/types";
import { avgScore, sumSessionDuration } from "./sessionRules";
import { applyStreakIfEligible } from "./streakRules";
import { enqueueEvent } from "@/events/localEvents";
import { LessonCompletedEvent, SessionCompletedEvent, StreakUpdateEvent } from "@/events/kafkaContracts";
import { toastSuccess } from "@/services/toast.service";

type LessonCompletionChainInput = {
  categoryId: string;
  unitId: string;
  userId: string;
  session_key: string;
  performanceSessionKey: string;
  lessonId: string;
  lessonOrder: number;
  session_type: SessionType;
  score?: number;
  duration_ms: number;
  isFinalLesson: boolean;
};

type LessonCompletionResult = {
  sessionCompleted: boolean;
  streakUpdated?: boolean;
  streakPayload?: any;
};

// Concurrency guard — prevents double-calls from rapid taps
const runningKeys = new Set<string>();

export const lessonCompletionChain = async (
  input: LessonCompletionChainInput
): Promise<LessonCompletionResult> => {
  const guardKey = `${input.userId}:${input.lessonId}`;

  if (runningKeys.has(guardKey)) {
    console.warn("lessonCompletionChain: duplicate call ignored for", guardKey);
    return { sessionCompleted: false };
  }

  runningKeys.add(guardKey);

  try {
    const now = Math.floor(Date.now() / 1000);

    /* 1️⃣ PROGRESS */
    await markLessonCompleted({
      category_id:  input.categoryId,
      unit_id:      input.unitId,
      user_id:      input.userId,
      content_type: input.session_type,
      lessonId:     input.lessonId,
      session_key:  input.session_key,
      score:        input.score,
      duration_ms:  input.duration_ms,
      lesson_order: input.lessonOrder,
    });

    /* 2️⃣ lesson.completed event */
    await enqueueEvent<LessonCompletedEvent>(
      "lesson.completed.v1",
      input.userId,
      `lesson:${input.lessonId}`,
      {
        categoryId:   input.categoryId,
        unitId:       input.unitId,
        userId:       input.userId,
        session_key:  input.session_key,
        lessonId:     input.lessonId,
        session_type: input.session_type,
        score:        input.score,
        duration_ms:  input.duration_ms,
        occurredAt:   now,
      }
    );

    // toastSuccess("Lesson Completed!");

    if (!input.isFinalLesson) return { sessionCompleted: false };

    /* 3️⃣ SESSION PERFORMANCE */
    const [totalDuration, avgLessonScore] = await Promise.all([
      sumSessionDuration(input.session_key),
      avgScore(input.session_key),
    ]);

    await upsertSessionPerformance({
      user_id:        input.userId,
      unit_id:        input.unitId,
      session_key:    input.performanceSessionKey,
      session_type:   input.session_type,
      avgScore:       avgLessonScore ?? 0,
      totalDurationMs: totalDuration,
      completed:      1,
    });

    /* 4️⃣ STREAK */
    const streak = await applyStreakIfEligible({ userId: input.userId, occurredAt: now });

    if (streak.updated) {
      await enqueueEvent<StreakUpdateEvent>(
        "streak.updated.v1",
        input.userId,
        `streak:${input.userId}`,
        { userId: input.userId, occurredAt: now }
      );
      toastSuccess("Streak updated!");
    }

    /* 5️⃣ session.completed event */
    await enqueueEvent<SessionCompletedEvent>(
      "session.completed.v1",
      input.userId,
      `session:${input.performanceSessionKey}`,
      {
        userId:           input.userId,
        unitId:           input.unitId,
        session_key:      input.performanceSessionKey,
        session_type:     input.session_type,
        score:            Math.round(avgLessonScore ?? 0),
        attempts:         1,
        total_duration_ms: totalDuration,
        completed_at:     now,
      }
    );

    toastSuccess("Session Complete!");

    return {
      sessionCompleted: true,
      streakUpdated:    !!streak?.updated,
      streakPayload:    streak?.payload ?? null,
    };
  } finally {
    // Always release the guard, even if something threw
    runningKeys.delete(guardKey);
  }
};