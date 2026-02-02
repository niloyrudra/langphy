import { upsertStreak } from "@/db/streaks.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStreaks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (streak: any) => await upsertStreak(streak),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['lp_streaks']
            });
        },
    })
}