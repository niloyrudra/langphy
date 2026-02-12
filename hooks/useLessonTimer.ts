import { useCallback, useRef } from "react"

export const useLessonTimer = () => {
    const startRef = useRef<number | null>(null);

    const start = useCallback(() => {
        if (startRef.current !== null) return;

        startRef.current = Date.now();
        console.log("***TIMER*** Started...", startRef.current);
    }, []);

    const stop = useCallback(() => {
        if( startRef.current === null ) {
            console.log("***TIMER*** Stopped... at 0");
            return 0
        };

        const duration = Math.max(0, Date.now() - startRef.current); // Prevent Negetive/Edge Case Durations 

        console.log("***TIMER*** Stopped...", Date.now() - startRef.current);

        startRef.current = null;
        
        return duration;
    }, []);
    
    const reset = useCallback(() => {
        startRef.current = null;
        console.log("***TIMER*** Reset...");        
    }, [])

    const isRunning: boolean = startRef.current !== null;

    return { start, stop, reset, isRunning };
}