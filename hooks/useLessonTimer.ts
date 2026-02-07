import { useRef } from "react"

export const useLessonTimer = () => {
    const startRef = useRef<number | null>(null);

    const start = () => {
        if( startRef.current === null ) startRef.current = Date.now()
    };

    const stop = () => {
        if( startRef.current == null ) return 0;

        const duration = Date.now() - startRef.current;

        startRef.current = null;
        
        return duration;
    }

    const reset = () => {
        startRef.current = null;
    }

    return { start, stop, reset };
}