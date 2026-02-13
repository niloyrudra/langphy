import { useQuery } from "@tanstack/react-query";
import { getStreaks } from "@/db/streaks.repo";
import { DBStreak } from "@/types";

export const useStreak = (userId: string) => {
    return useQuery<DBStreak | null>({
        queryKey: [ "lp_streaks", userId ],
        enabled: !!userId,
        queryFn: async () => {
            try {
                console.log("Fetching streaks for userId:", userId);
                const result = await getStreaks( userId );
                return result;
            }
            catch(error) {
                console.error("Error fetching streaks:", error);
                throw error;
            }
        },
        // initialData: null,
        // staleTime: Infinity,
        gcTime: Infinity
    });
}