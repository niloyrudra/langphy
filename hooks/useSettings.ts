import { getLocalSettings } from "@/db/settings.repo";
import { useQuery } from "@tanstack/react-query";

export const useSettings = (userId: string) => {
    return useQuery({
        queryKey: ["lp_settings", userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await getLocalSettings(userId);
            return res;
        },
        staleTime: Infinity,
        gcTime: Infinity
    });
}