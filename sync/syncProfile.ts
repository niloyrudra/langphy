import { getLocalProfile, upsertProfile } from "@/db/profile.repo";
import api from "@/lib/api";

export const syncDirtyProfile = async (userId: string) => {
  try {
    const localProfile = await getLocalProfile(userId);

    // If no local profile → fetch and store
    if (!localProfile) {
      const res = await api.get(`/profile/${userId}`);
      const profile = res.data.profile; // adjust if needed

      if (!profile) throw new Error("No profile found");

      await upsertProfile(profile);
      return true;
    }

    // If not dirty → nothing to sync
    if (!localProfile.dirty) {
      return true;
    }

    // Only sync when dirty
    const res = await api.put(`/profile/update/${localProfile.id}`, {
      username: localProfile.username,
      first_name: localProfile.first_name,
      last_name: localProfile.last_name,
      profile_image: localProfile.profile_image,
    });

    if (res.status !== 200) {
      throw new Error("Failed to sync profile");
    }

    const profile = res.data.profile;

    await upsertProfile({
      id: profile.id,
      email: localProfile.email,
      username: profile.username || null,
      first_name: profile.first_name || null,
      last_name: profile.last_name || null,
      profile_image: profile.profile_image || null,
      created_at: profile.created_at || null,
      dirty: 0
    });

    return true;
  }
  catch(error) {
    console.error("syncProfile error:", error);
    return false;
  }
};