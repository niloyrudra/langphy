import { getLocalProfile, upsertProfile } from "@/db/profile.repo";

export const bootstrapProfileFromToken = async (payload: {
  id: string;
  email: string;
  created_at: string;
}) => {
  try {
    const exits = await getLocalProfile( payload.id );
    if( exits ) {
      console.log("Profile already exists:", exits);
      return;
    }
    const profile = await upsertProfile({
      id: payload.id,
      email: payload.email,
      created_at: payload.created_at,
      username: null,
      first_name: null,
      last_name: null,
      profile_image: null,
      dirty: 0,
    });
    console.log("Bootstrapped Profile:", profile);
  }
  catch(error) {
    console.error("Bootstrap Profile Error:", error);
  }
};
