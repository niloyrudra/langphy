import { useCallback, useRef } from "react"

export const useLessonTimer = () => {
    const startRef = useRef<number | null>(null);

    const start = useCallback(() => {
        if( startRef.current === null ) startRef.current = Date.now()
    }, [Date]);

    const stop = useCallback(() => {
        if( startRef.current == null ) return 0;

        const duration = Date.now() - startRef.current;

        startRef.current = null;
        
        return duration;
    }, [Date]);

    const reset = useCallback(() => {
        startRef.current = null;
    }, [])

    return { start, stop, reset };
}