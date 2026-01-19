import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { useAuth } from "./AuthContext";

type Streaks = {
    current: number;
    longest: number;
    lastPracticeAt: string | null; // ISO string
};

type StreaksContextType = {
    streaks: Streaks | null;
    loading: boolean;
    refresh: () => Promise<void>;
};

const StreaksContext = createContext<StreaksContextType>(null!);

export const StreaksProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [ streaks, setStreaks ] = useState<Streaks | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    const refresh = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE}/streaks/${user.id}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch streaks");
            }

            const data = await res.json();
            const { streak } = data;

            setStreaks({
                current: streak.current_streak ?? 0,
                longest: streak.longest_streak ?? 0,
                lastPracticeAt: streak.last_activity_date ?? null,
            });
        } catch (err) {
            console.error("Streak fetch failed:", err);
            setStreaks({
                current: 0,
                longest: 0,
                lastPracticeAt: null,
            });
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            setStreaks(null);
            return;
        }
        refresh();
    }, [user, refresh]);

    return (
        <StreaksContext.Provider value={{ streaks, loading, refresh }}>
            {children}
        </StreaksContext.Provider>
    );
};

export const useStreaks = () => useContext(StreaksContext);