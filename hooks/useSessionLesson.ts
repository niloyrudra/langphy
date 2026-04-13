/**
 * useSessionLesson — shared logic for all 6 session screens
 *
 * Extracts the identical boilerplate from listening, practice, quiz,
 * reading, speaking, and writing screens:
 *   - activeLessonOrderRef / currentLessonRef / goToNextRef
 *   - activeItemChangeHandler
 *   - onLessonComplete (lessonCompletionChain wrapper)
 *   - timer start effect
 *
 * Each screen just calls this hook and gets back everything it needs.
 * Screen-specific logic (recording, text input, etc.) stays in the screen.
 *
 * USAGE
 * ─────
 *   const {
 *     currentLessonRef,
 *     goToNextRef,
 *     activeItemChangeHandler,
 *     onLessonComplete,
 *   } = useSessionLesson<SpeakingSessionType>({
 *     userId,
 *     categoryId: categoryId as string,
 *     unitId: unitId as string,
 *     slug: slug as SessionType,
 *     lessonCount: lessonData.length,
 *     performanceSessionKey,
 *     onSessionComplete: triggerSessionCompletion,
 *     onStreakUpdate: triggerStreak,
 *   });
 */

import React from "react";
import { useLessonTimer } from "@/hooks/useLessonTimer";
import { lessonCompletionChain } from "@/domain/lessonCompletionChain";
import { SessionType } from "@/types";
import { DBStreak } from "@/types";

interface UseSessionLessonOptions {
    userId: string;
    categoryId: string;
    unitId: string;
    slug: SessionType;
    lessonCount: number;
    performanceSessionKey: string;
    onSessionComplete: (sessionKey: string) => void;
    onStreakUpdate: (streak: DBStreak) => void;
    /** Called when activeItemChange fires — optional extra handler per screen */
    onItemChange?: (index: number) => void;
}

interface UseSessionLessonReturn<T> {
    currentLessonRef: React.MutableRefObject<T | null>;
    goToNextRef: React.MutableRefObject<(() => void) | null>;
    activeLessonOrderRef: React.MutableRefObject<number>;
    /** Pass directly to SessionLayout onActiveItemChange */
    activeItemChangeHandler: (args: { item: T; index: number; goToNext: () => void }) => void;
    /** Call this after a lesson is answered/completed, passing the lesson and score 0–100 */
    onLessonComplete: (lesson: T & { id?: string; _id?: string }, score: number) => Promise<void>;
}

export function useSessionLesson<T extends { id?: string; _id?: string }>(
    options: UseSessionLessonOptions
): UseSessionLessonReturn<T> {
    const {
        userId,
        categoryId,
        unitId,
        slug,
        lessonCount,
        performanceSessionKey,
        onSessionComplete,
        onStreakUpdate,
        onItemChange,
    } = options;

    const { start, stop, isRunning } = useLessonTimer();

    const activeLessonOrderRef = React.useRef<number>(0);
    const currentLessonRef     = React.useRef<T | null>(null);
    const goToNextRef          = React.useRef<(() => void) | null>(null);

    // Start the per-lesson timer once on mount
    React.useEffect(() => {
        if (!isRunning) start();
    }, [isRunning]);

    const activeItemChangeHandler = React.useCallback(
        ({ item, index, goToNext }: { item: T; index: number; goToNext: () => void }) => {
            activeLessonOrderRef.current = index;
            currentLessonRef.current = item;
            goToNextRef.current = goToNext;
            onItemChange?.(index);
        },
        [onItemChange]
    );

    const onLessonComplete = React.useCallback(
        async (lesson: T & { id?: string; _id?: string }, score: number) => {
            if (!userId) return;
            try {
                const duration_ms    = stop();
                const sessionKey     = `${unitId}:${slug}`;
                const lessonOrder    = activeLessonOrderRef.current;
                const isFinalLesson  = lessonOrder === lessonCount - 1;

                const result = await lessonCompletionChain({
                    categoryId,
                    unitId,
                    userId,
                    session_key: sessionKey,
                    performanceSessionKey,
                    lessonId: lesson.id ?? lesson._id ?? "",
                    lessonOrder,
                    session_type: slug,
                    score,
                    duration_ms,
                    isFinalLesson,
                });

                if (result?.sessionCompleted)
                    onSessionComplete(performanceSessionKey);
                if (result?.streakUpdated && result?.streakPayload)
                    onStreakUpdate(result.streakPayload);
            } catch (err) {
                console.error("onLessonComplete error:", err);
            }
        },
        [userId, categoryId, unitId, slug, lessonCount, performanceSessionKey, onSessionComplete, onStreakUpdate, stop]
    );

    return {
        currentLessonRef,
        goToNextRef,
        activeLessonOrderRef,
        activeItemChangeHandler,
        onLessonComplete,
    };
}