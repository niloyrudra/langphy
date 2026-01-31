import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { ContentType } from "@/types";
import api from "@/lib/api";

type Progress = {
    category_id: string;
    unit_id: string;
    user_id?: string;
    content_type: ContentType;
    content_id: string;
    completed: boolean;
    score: number;
    progressPercent: number;
}

type UpdateProgressPayload = {
    content_type: ContentType;
    content_id: string;
    score?: number;
    progressPercent?: number;
    completed?: boolean;
}

type ProgressContextType = {
    progress: Progress[];
    loading: boolean;
    refreshProgress: () => Promise<void>;
    updateProgress: ( payload: UpdateProgressPayload ) => Promise<void>;
    getProgress: (
        contentType: ContentType,
        contentId: string
    ) => Progress | undefined;
}

const ProgressContext = createContext<ProgressContextType>(null!);

export const ProgressProvider = ({children}: {children: ReactNode}) => {
    const {user} = useAuth()
    const [ progress, setProgress ] = useState<Progress[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    
    const refreshProgress = useCallback(async () => {
        if(!user?.id) return;
        try {
            setLoading(true)
            const res = await api.get(`/progress/${user?.id}`);

            if (res.status !== 200) {
                console.warn("Failed to fetch progress");
                return;
            }

            setProgress(res.data ?? []);
            console.log("Progress data fetch successfully!")
        }
        catch(err) {
            console.error("Progress Context Error:", err)
        }
        finally {
            setLoading(false)
        }
    }, [user?.id]);
    
    const updateProgress = useCallback(async ( payload: UpdateProgressPayload ) => {
        if( !user?.id ) return;
        try {
            setLoading(true)
            await api.post("/progress", {
                user_id: user.id,
                ...payload
            });

            // Always re-sync after mutation
            await refreshProgress();

        }
        catch(err) {
            console.error("Progress data update error:", err)
        }
        finally {
            setLoading(false)
        }
    }, [user?.id, refreshProgress]);

    const getProgress = useCallback( ( contentType: ContentType, contentId: string ) => {
        return progress.find( data => data.content_type === contentType && data.content_id === contentId )
    }, [progress]);

    useEffect(() => {
        // const restoreProgress = async () => {
        //     await refreshProgress();
        // }
        refreshProgress();
    }, [refreshProgress])

    const value = useMemo(() => ({
        progress,
        loading,
        refreshProgress,
        updateProgress,
        getProgress
    }), [progress, loading, refreshProgress, updateProgress, getProgress]);

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}

export const useProgress = () => useContext( ProgressContext );