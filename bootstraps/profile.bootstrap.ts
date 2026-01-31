import { upsertProfile } from "@/db/profile.repo";

export const bootstrapProfileFromToken = async (payload: {
  id: string;
  email: string;
  created_at: string;
}) => {
  await upsertProfile({
    id: payload.id,
    email: payload.email,
    created_at: payload.created_at,
    username: null,
    first_name: null,
    last_name: null,
    profile_image: null,
    dirty: 0,
  });
};
