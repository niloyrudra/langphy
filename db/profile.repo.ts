import { db } from "./index";

export type DBProfile = {
  id: string;
  email: string;
  created_at: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_image: string | null;
  updated_at: number;
  dirty: number;
};

export const getLocalProfile = async (userId: string): Promise<DBProfile | null> => {
  const result = await db.getFirstAsync<DBProfile>(
    "SELECT * FROM lp_profiles WHERE id = ? LIMIT 1",
    [userId]
  );
  return result || null;
}

export const getDirtyProfiles = async (userId: string): Promise<DBProfile[]> => {
  const result = await db.getAllAsync<DBProfile>(
    "SELECT * FROM lp_profiles WHERE dirty = 1 AND id = ?",
    [userId]
  );
  return result;
}

export const upsertProfile = async (p: {
  id: string;
  email: string;
  created_at: string;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_image?: string | null;
  dirty?: number;
}): Promise<DBProfile> => {
  const now = Math.floor(Date.now() / 1000);
  const result = await db.getFirstAsync<DBProfile>(
    `
      INSERT OR REPLACE INTO lp_profiles (
        id,
        email,
        username,
        first_name,
        last_name,
        profile_image,
        created_at,
        updated_at,
        dirty
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    [
      p.id,
      p.email,
      p.username || null,
      p.first_name || null,
      p.last_name || null,
      p.profile_image || null,
      p.created_at || now, // created_at
      now, // updated_at
      p.dirty || 1
    ]
  );
  return result!;
};

export const clearProfile = async () => {
  try{
    await db.runAsync(`DELETE FROM lp_profiles`);
    console.log("Cleared all data from lp_profiles table.");
  }
  catch(error) {
    console.error("clearProfile error:", error);
  }
}

export const markProfileClean = async (profile: DBProfile) => {
  await db.runAsync(
    `UPDATE lp_profiles SET dirty = 0 WHERE id = ?`,
    [profile.id]
  );
};