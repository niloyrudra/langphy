import api from "@/lib/api";
import { getLocalProfile, upsertProfile } from "@/db/profile.repo";

export const syncDirtyProfile = async (userId: string) => {
  try {
    let localProfile = await getLocalProfile(userId);
    if (!localProfile || !localProfile.dirty) {
      localProfile = await api.get(`/profile/${userId}`).then(res => res.data.profile);
      if (!localProfile) {
        throw new Error("No profile found to sync");
      }
    };
  
    const res = await api.put(`/profile/update/${localProfile.id}`, {
      username: localProfile.username,
      first_name: localProfile.first_name,
      last_name: localProfile.last_name,
      profile_image: localProfile.profile_image,
    });
  
    if( res.status !== 200) {
      throw new Error("Failed to sync profile");
    }
    const {data: profile} = res.data;
  
    await upsertProfile({
      id: profile.id,
      email: localProfile.email, // email is not updated from server
      username: profile.username || null,
      first_name: profile.first_name || null,
      last_name: profile.last_name || null,
      profile_image: profile.profile_image || null,
      created_at: profile.created_at || null,
    });

    return true;
  }
  catch(error) {
    console.error("syncProfile error:", error);
    return false;
  }
};