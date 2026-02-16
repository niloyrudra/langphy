import { createContext, useContext, useState } from "react";
import { DBStreak } from "@/types";
import React from "react";

type Celebration =
    | { type: 'session_complete'; sessionKey: string }
    | { type: 'streak'; streak: DBStreak }
    | null;

type CelebrationContextType = {
    current: Celebration;
    triggerSessionCompletion: ( sessionKey: string ) => void;
    triggerStreak: ( streak: DBStreak ) => void;
    resolveCurrent: () => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>( undefined );

export const CelebrationProvider = ({ children }: {children: React.ReactNode}) => {
  const [queue, setQueue] = useState<Celebration[]>([]);
  const [current, setCurrent] = useState<Celebration>(null);

    const enqueue = (item: Celebration) => {
        // setQueue(prev => {
        //     if (!current) {
        //         setCurrent(item);
        //         return prev;
        //     }
        //     return [...prev, item];
        // });
        setQueue(prev => [...prev, item]);
    };

    const resolveCurrent = () => {
        // setQueue(prev => {
        //     if (prev.length > 0) {
        //         const [next, ...rest] = prev;
        //         setCurrent(next);
        //         return rest;
        //     }
        //     setCurrent(null);
        //     return [];
        // });
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
    }, [queue.length, current]); // 👈 depend on length, not full queue object


    return (
        <CelebrationContext.Provider
            value={{
                current,
                triggerSessionCompletion: (sessionKey) =>  enqueue({ type: "session_complete", sessionKey }),
                triggerStreak: (streak) =>  enqueue({ type: "streak", streak }),
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