import { createContext, useContext, useState } from "react";
import { DBStreak, PracticeResultType, SelectiveResultType, SessionResultType, SpeechResultType } from "@/types";
import React from "react";
import { getMilestone, MilestoneDay } from "@/utils/milestone-config";

interface LessonPayload {
    actualQuery?: string;
    result: SessionResultType | SelectiveResultType | SpeechResultType | PracticeResultType;
    onRetry: () => void;
    onContinue: () => void;
};

type Celebration =
    | { type: 'lesson_complete'; payload: LessonPayload;}
    | { type: 'session_complete'; sessionKey: string }
    | { type: 'streak'; streak: DBStreak }
    | { type: 'streak_milestone'; streak: DBStreak; milestone: MilestoneDay }
    | null;

type CelebrationContextType = {
    current: Celebration;
    triggerLessonResult: ( payload: LessonPayload ) => void;
    triggerSessionCompletion: ( sessionKey: string ) => void;
    triggerStreak: ( streak: DBStreak ) => void;
    resolveCurrent: () => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>( undefined );

export const CelebrationProvider = ({ children }: {children: React.ReactNode}) => {
  const [queue, setQueue] = useState<Celebration[]>([]);
  const [current, setCurrent] = useState<Celebration>(null);

    const enqueue = (item: Celebration) => {
        setQueue(prev => [...prev, item]);
    };

    const resolveCurrent = () => {
        setQueue(prev => {
            if (prev.length === 0) {
                setCurrent(null);
                return [];
            }
            const [next, ...rest] = prev;
            setCurrent(next);
            return rest;
        });
    };

    // 🔥 This is the key:
    React.useEffect(() => {
        if (!current && queue.length > 0) {
            const [first, ...rest] = queue;
            setCurrent(first);
            setQueue(rest);
        }
    }, [queue, current]); // 👈 queue.length can miss edge cases where length is same but content changes
    // }, [queue.length, current]); // 👈 depend on length, not full queue object

    // triggerStreak enqueues the regular streak modal first, then — if this
    // streak count is a milestone — enqueues the milestone modal right after.
    // The queue processes them in order so milestone always shows after streak.
    const triggerStreak = React.useCallback((streak: DBStreak) => {
        enqueue({ type: "streak", streak });
        const milestone = getMilestone(streak.current_streak);
        if (milestone) {
            enqueue({ type: "streak_milestone", streak, milestone });
        }
    }, []);

    return (
        <CelebrationContext.Provider
            value={{
                current,
                triggerLessonResult: (payload) => enqueue({ type: "lesson_complete", payload }),
                triggerSessionCompletion: (sessionKey) =>  enqueue({ type: "session_complete", sessionKey }),
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
    if (!context) throw new Error('useCelebration must be used within CelebrationProvider');
    return context;
};