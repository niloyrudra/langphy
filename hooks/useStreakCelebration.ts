import { useEffect, useRef, useState } from "react";
import { useStreak } from "./useStreaks"
import { isToday } from "@/utils";
// import { useCelebration } from "@/context/CelebrationContext";

export const useStreakCelebration = ( userId: string ) => {
    const { data: streak } = useStreak( userId );
    // const prevStreakRef = useRef<number | null>(null);
    const lastShownRef = useRef<number | null>(null);
    const [ show, setShow ] = useState<boolean>(false);
    // const { triggerStreak } = useCelebration();

    useEffect(() => {
        if( !streak ) return;
        if( !isToday( streak.last_activity_date ) ) return;
        if( streak.current_streak === 0 ) return;

        // prevent duplicate modal in same day
        if( lastShownRef.current === streak.last_activity_date ) return;

        lastShownRef.current = streak.last_activity_date;
        setShow( true );

    }, [ streak?.current_streak ]);

    // useEffect(() => {
    //     if (!streak) return;
    //     if( !isToday( streak.last_activity_date ) ) return;
    //     if( streak.current_streak === 0 ) return;
    //     // prevent duplicate modal in same day
    //     if( lastShownRef.current === streak.last_activity_date ) return;
    //     lastShownRef.current = streak.last_activity_date;

    //     if (
    //         prevStreakRef.current !== null &&
    //         streak.current_streak > prevStreakRef.current
    //     ) {
    //         triggerStreak(streak);
    //     }

    //     prevStreakRef.current = streak.current_streak;
    // }, [streak?.current_streak]);


    return {
        showStreakModal: show,
        dismiss: () => setShow( false ),
        streak
    };
}