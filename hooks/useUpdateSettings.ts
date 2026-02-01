import { getLocalSettings, updateSettingField, upsertSettings } from "@/db/settings.repo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SettingsField =
  | "toggle_theme"
  | "sound_effect"
  | "speaking_service"
  | "reading_service"
  | "listening_service"
  | "writing_service"
  | "practice_service"
  | "quiz_service"
  | "push_notification"
  | "notifications"
  | "language";

export const useUpdateSettings = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            field: SettingsField;
            value: string | number | boolean;
        }) => {
            const result = await updateSettingField({
                user_id: userId,
                field: payload.field,
                value: payload.value
            });

            return result;

            // const current = await getLocalSettings(userId);
            // if (!current) throw new Error("Settings not initialized");

            // const updated = { ...current, ...payload };
            // await upsertSettings(updated);
            // return updated;
        },
        onSuccess: (result: any) => {
            // queryClient.invalidateQueries({ queryKey: ["lp_settings"] });
            queryClient.setQueryData( ["lp_settings", result.user_id], result );
        }
    });
}