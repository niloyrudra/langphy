import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { getStreaks } from "@/db/streaks.repo";
import { DBStreak } from "@/types";

export const STREAK_KEY = (userId: string) => ["lp_streaks", userId] as const;

export const useStreak = (userId: string) => {
    const queryClient = useQueryClient();

    // Re-fetch streak whenever the app comes back to the foreground.
    // This ensures the local expiry check in getStreaks() runs on resume,
    // so the badge shows 0 immediately if a day has passed.
    useEffect(() => {
        const handleAppStateChange = (nextState: AppStateStatus) => {
            if (nextState === "active" && userId) {
                queryClient.invalidateQueries({ queryKey: STREAK_KEY(userId) });
            }
        };

        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription.remove();
    }, [userId, queryClient]);

    return useQuery<DBStreak | null>({
        queryKey: STREAK_KEY(userId),
        enabled: !!userId,
        queryFn: () => getStreaks(userId),
        gcTime: Infinity,
        staleTime: 0, // always re-fetch on focus/resume
    });
};

// import { useQuery } from "@tanstack/react-query";
// import { getStreaks } from "@/db/streaks.repo";
// import { DBStreak } from "@/types";

// export const useStreak = (userId: string) => {
//     return useQuery<DBStreak | null>({
//         queryKey: [ "lp_streaks", userId ],
//         enabled: !!userId,
//         queryFn: async () => {
//             try {
//                 console.log("Fetching streaks for userId:", userId);
//                 const result = await getStreaks( userId );
//                 return result;
//             }
//             catch(error) {
//                 console.error("Error fetching streaks:", error);
//                 throw error;
//             }
//         },
//         // initialData: null,
//         // staleTime: Infinity,
//         gcTime: Infinity
//     });
// }