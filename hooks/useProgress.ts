import { useQuery } from "@tanstack/react-query";
import { getSessionProgress } from "@/db/progress.repo";

export const useProgress = ( sessionKey: string ) => useQuery({
    queryKey: ["lp_progress", sessionKey],
    queryFn: () => getSessionProgress( sessionKey ),
    // initialData: [],
    staleTime: Infinity,
    gcTime: Infinity
});