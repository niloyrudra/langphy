import { getPerformance } from "@/db/performance.repo";
import { SessionPerformance } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePerformance = ( sessionKey: string ) => {
    return useQuery<SessionPerformance | null>({
        queryKey: ["lp_session_performance", sessionKey],
        enabled: !!sessionKey,
        queryFn: () => {
            try {
               return getPerformance(sessionKey)
            }
            catch(error) {
                console.error("usePerformance error:", error)
                return null;
            }
        }
    });
}