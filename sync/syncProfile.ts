import { getLocalProfile, upsertProfile } from "@/db/profile.repo";
import api from "@/lib/api";

export const syncDirtyProfile = async (userId: string) => {
  try {
    const localProfile = await getLocalProfile(userId);

    // If no local profile → fetch and store
    if (!localProfile) {
      const res = await api.get(`/profile`);
      const profile = res.data.profile; // adjust if needed

      if (!profile) throw new Error("No profile found");

      await upsertProfile(profile);
      return true;
    }

    // If not dirty → nothing to sync
    if (localProfile.dirty !== 1) {
      return true;
    }

    // Build payload dynamically
    const payload: any = {};

    if (localProfile.username) payload.username = localProfile.username;
    if (localProfile.first_name) payload.first_name = localProfile.first_name;
    if (localProfile.last_name) payload.last_name = localProfile.last_name;
    if (localProfile.profile_image) payload.profile_image = localProfile.profile_image;

    // If nothing changed, skip API call
    if (Object.keys(payload).length === 0) {
      await upsertProfile({
        ...localProfile,
        dirty: 0
      });
      return true;
    }

    const res = await api.put(`/profile/update`, payload);

    // Only sync when dirty
    // const res = await api.put(`/profile/update/${localProfile.id}`, {
    //   username: localProfile.username ?? "",
    //   first_name: localProfile.first_name ?? "",
    //   last_name: localProfile.last_name ?? "",
    //   profile_image: localProfile.profile_image ?? "",
    // });

    if (res.status !== 200) {
      throw new Error("Failed to sync profile");
    }

    const profile = res.data.profile;

    await upsertProfile({
      id: profile.id,
      email: localProfile.email,
      username: profile.username ?? null,
      first_name: profile.first_name ?? null,
      last_name: profile.last_name ?? null,
      profile_image: profile.profile_image ?? null,
      created_at: profile.created_at ?? localProfile.created_at,
      dirty: 0
    });

    return true;
  }
  catch(error) {
    console.error("syncProfile error:", error);
    return false;
  }
};