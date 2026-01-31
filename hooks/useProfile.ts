import { getLocalProfile } from "@/db/profile.repo";
import { QueryClient, useQuery } from "@tanstack/react-query"

export const useProfile = (userId: string) => useQuery({
    queryKey: ["lp_profiles", userId],
    enabled: !!userId,
    queryFn: async () => await getLocalProfile(userId),
    staleTime: Infinity,
    gcTime: Infinity,
});