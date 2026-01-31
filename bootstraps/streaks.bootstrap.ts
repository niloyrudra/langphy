import { upsertStreak } from "@/db/streaks.repo";
import { v4 as uuidv4 } from "uuid";

export const bootstrapStreaks = async (payload: {
  user_id: string;
}) => {
  const now = Date.now();
  await upsertStreak({
    id: payload.user_id,
    user_id: payload.user_id,
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: now,
    updated_at: now,
  });
};
