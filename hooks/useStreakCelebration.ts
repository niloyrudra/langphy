import { useEffect, useRef, useState } from "react";
import { useStreak } from "./useStreaks"
import { isToday } from "@/utils";

export const useStreakCelebration = ( userId: string ) => {
    const { data: streak, isLoading, isFetching } = useStreak( userId );
    const lastShownRef = useRef<number | null>(null);
    const [ show, setShow ] = useState<boolean>(false);

    useEffect(() => {
        if( isLoading || isFetching ) return;
        if( !streak ) return;
        if( !isToday( streak.last_activity_date ) ) return;
        if( streak.current_streak === 0 ) return;

        // prevent duplicate modal in same day
        if( lastShownRef.current === streak.last_activity_date ) return;

        lastShownRef.current = streak.last_activity_date;
        setShow( true );

    }, [ streak, isLoading, isFetching ]);

    return {
        showStreakModal: show,
        dismiss: () => setShow( false ),
        streak
    }
}