import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocalProfile, upsertProfile } from "@/db/profile.repo";
// import { PROFILE_QUERY_KEY } from "../queries/useProfile";

export const useUpdateProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<any>) => {
      const current = await getLocalProfile(userId);
      if (!current) throw new Error("Profile not initialized");

      const updated = { ...current, ...updates };

      // ensure upsertProfile receives the shape it expects (requires `id`)
      const profilePayload = {
        id: (updated as any).id ?? (updated as any).id,
        email: (updated as any).email ?? (updated as any).email,
        username: (updated as any).username,
        first_name: (updated as any).first_name,
        last_name: (updated as any).last_name,
        profile_image: (updated as any).profile_image,
      };
      if (!profilePayload.id) throw new Error("Profile id missing");

      await upsertProfile(profilePayload);
      return updated;
    },

    onSuccess: (updated) => {
      queryClient.setQueryData(["lp_profiles"], updated);
    },
  });
};