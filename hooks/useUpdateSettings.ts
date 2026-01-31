import { getLocalSettings, upsertSettings } from "@/db/settings.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSettings = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: Partial<any>) => {
            const current = await getLocalSettings(userId);
            if (!current) throw new Error("Settings not initialized");

            const updated = { ...current, ...updates };
            await upsertSettings(updated);
            return updated;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lp_settings"] });
        }
    });
}