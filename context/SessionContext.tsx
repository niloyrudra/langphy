import { Lesson, SessionContextType, SessionProviderProps } from "@/types";
import { createContext, useCallback, useContext, useState } from "react";

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [ lessons, setLessons ] = useState<Lesson[]>([]);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [showLessonList, setShowLessonList] = useState<boolean>(false);

    const lessonCompletionHandler = useCallback(() => {
        const currentLesson = lessons[currentPosition]
        currentLesson.completed = true;
    }, [lessons[currentPosition]]);

    return (
        <SessionContext.Provider
            value={{
                lessons,
                currentPosition,
                showLessonList,
                setLessons,
                setCurrentPosition,
                lessonCompletionHandler,
                toggleLessonList: () => setShowLessonList(v => !v),
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const ctx = useContext( SessionContext );

    if( !ctx ) throw new Error( "useSession must be used this inside SessionProvider" );

    return ctx;
}