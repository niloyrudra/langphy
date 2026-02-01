import { getStreaks, upsertStreak } from "@/db/streaks.repo";

export const bootstrapStreaks = async (payload: {
  user_id: string;
}) => {
  try {
    const exits = await getStreaks( payload.user_id );
    if( exits ) {
      console.log("Streak already exists:", exits);
      return;
    }
    const streak = await upsertStreak({
      user_id: payload.user_id,
      current_streak: 0,
      longest_streak: 0,
    });
    console.log("Bootstrapped Streak:", streak);
  }
  catch(error) {
    console.error("Bootstrap Streak Error:", error);
  }
};
