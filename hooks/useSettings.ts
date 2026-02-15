import { getLocalSettings } from "@/db/settings.repo";
import { DBSettings } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSettings = (userId: string) => {
    return useQuery<DBSettings | null>({
        queryKey: ["lp_settings", userId],
        enabled: !!userId,
        queryFn: async () => {
            try {
                console.log("Fetching settings for userId:", userId);
                const res = await getLocalSettings(userId);
                return res;
            }
            catch(error) {
                console.error("Error fetching settings:", error);
                throw error;
            }
        },
        staleTime: Infinity,
        gcTime: Infinity
    });
}