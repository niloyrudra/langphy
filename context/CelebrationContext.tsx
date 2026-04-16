/**
 * CelebrationContext
 *
 * Manages a queue of celebration modals shown after lesson/session completion.
 * Queue is processed one at a time — each modal must be dismissed before the
 * next one appears.
 *
 * FIXES from previous version:
 * 1. Replaced useEffect queue-drain with a single useReducer — eliminates the
 *    race condition where useEffect + resolveCurrent both fired setCurrent/setQueue
 *    in the same render cycle, causing missed or double-shown modals.
 * 2. triggerStreak now dispatches a single batched action so the streak + optional
 *    milestone are added atomically — no stale-closure issue from calling enqueue twice.
 * 3. resolveCurrent advances the queue inside the reducer — one dispatch, one render.
 */

import { createContext, useContext, useReducer, useCallback } from "react";
import {
    DBStreak,
    PracticeResultType,
    SelectiveResultType,
    SessionResultType,
    SpeechResultType,
} from "@/types";
import React from "react";
import { getMilestone, MilestoneDay } from "@/utils/milestone-config";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface LessonPayload {
    actualQuery?: string;
    result: SessionResultType | SelectiveResultType | SpeechResultType | PracticeResultType;
    onRetry: () => void;
    onContinue: () => void;
}

export type CelebrationItem =
    | { type: "lesson_complete"; payload: LessonPayload }
    | { type: "session_complete"; sessionKey: string }
    | { type: "streak"; streak: DBStreak }
    | { type: "streak_milestone"; streak: DBStreak; milestone: MilestoneDay };

// ── Reducer ───────────────────────────────────────────────────────────────────

type State = {
    current: CelebrationItem | null;
    queue: CelebrationItem[];
};

type Action =
    | { type: "ENQUEUE"; items: CelebrationItem[] }
    | { type: "RESOLVE" };

const initialState: State = { current: null, queue: [] };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ENQUEUE": {
            const incoming = action.items;
            if (!state.current) {
                // Nothing showing — promote first item immediately
                const [first, ...rest] = incoming;
                return { current: first, queue: [...state.queue, ...rest] };
            }
            // Something already showing — append to queue
            return { ...state, queue: [...state.queue, ...incoming] };
        }
        case "RESOLVE": {
            if (state.queue.length === 0) {
                return { current: null, queue: [] };
            }
            const [next, ...rest] = state.queue;
            return { current: next, queue: rest };
        }
        default:
            return state;
    }
}

// ── Context ───────────────────────────────────────────────────────────────────

type CelebrationContextType = {
    current: CelebrationItem | null;
    triggerLessonResult: (payload: LessonPayload) => void;
    triggerSessionCompletion: (sessionKey: string) => void;
    triggerStreak: (streak: DBStreak) => void;
    resolveCurrent: () => void;
};

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const CelebrationProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const triggerLessonResult = useCallback((payload: LessonPayload) => {
        dispatch({
            type: "ENQUEUE",
            items: [{ type: "lesson_complete", payload }],
        });
    }, []);

    const triggerSessionCompletion = useCallback((sessionKey: string) => {
        dispatch({
            type: "ENQUEUE",
            items: [{ type: "session_complete", sessionKey }],
        });
    }, []);

    /**
     * Enqueues streak modal + optional milestone in one atomic dispatch.
     * Previous version called enqueue() twice in sequence which could read
     * stale state for the second call.
     */
    const triggerStreak = useCallback((streak: DBStreak) => {
        const items: CelebrationItem[] = [{ type: "streak", streak }];
        const milestone = getMilestone(streak.current_streak);
        if (milestone) {
            items.push({ type: "streak_milestone", streak, milestone });
        }
        dispatch({ type: "ENQUEUE", items });
    }, []);

    const resolveCurrent = useCallback(() => {
        dispatch({ type: "RESOLVE" });
    }, []);

    return (
        <CelebrationContext.Provider
            value={{
                current: state.current,
                triggerLessonResult,
                triggerSessionCompletion,
                triggerStreak,
                resolveCurrent,
            }}
        >
            {children}
        </CelebrationContext.Provider>
    );
};

export const useCelebration = () => {
    const context = useContext(CelebrationContext);
    if (!context) throw new Error("useCelebration must be used within CelebrationProvider");
    return context;
};