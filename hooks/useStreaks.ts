import { useQuery } from "@tanstack/react-query";
import { getStreaks } from "@/db/streaks.repo";

export const useStreak = (userId: string) => {
    return useQuery({
        queryKey: ["lp_streaks", userId],
        queryFn: () => getStreaks(userId),
        // initialData: null,
        staleTime: Infinity,
        gcTime: Infinity
    });
}