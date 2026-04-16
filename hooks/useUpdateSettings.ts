import { updateSettingField } from "@/db/settings.repo";
import { SettingsFieldType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSettings = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            field: SettingsFieldType;
            value: string | number | boolean;
        }) => {
            const result = await updateSettingField({
                user_id: userId,
                field: payload.field,
                value: payload.value
            });

            return result;
        },
        onSuccess: (updates: any) => {
            queryClient.setQueryData( ["lp_settings", updates.user_id], updates );
        }
    });
}