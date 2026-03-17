import { DBStreak, StreaksType } from "@/types";
import { db } from "./index";

const SECONDS_IN_A_DAY = 86400;

 
export const getStreaks = async (userId: string): Promise<DBStreak | null> => {
    try {
        const streak = await db.getFirstAsync<DBStreak>(
            "SELECT * FROM lp_streaks WHERE user_id = ?",
            [userId]
        );
 
        if (!streak) return null;
 
        // ── Local expiry check ────────────────────────────────────────────
        // If the user hasn't been active for more than 1 day, reset the
        // streak locally so the UI shows 0 immediately without waiting for
        // a backend sync or lesson completion.
        const now = Math.floor(Date.now() / 1000);
        const nowInDays = Math.floor(now / SECONDS_IN_A_DAY); // days since epoch

        // last_activity_date could be days-since-epoch (from PostgreSQL DATE)
        // or a Unix timestamp in seconds — detect which one it is
        const lastActivityInDays = streak.last_activity_date > 100_000
            ? Math.floor(streak.last_activity_date / SECONDS_IN_A_DAY) // it's a Unix timestamp
            : streak.last_activity_date; // it's already days since epoch

        const daysSinceLastActivity = nowInDays - lastActivityInDays;

        // const daysSinceLastActivity = streak.last_activity_date
        //     ? Math.floor((now - streak.last_activity_date) / SECONDS_IN_A_DAY)
        //     : 0;
 
        // console.log("streak debug:", {
        //     last_activity_date: streak.last_activity_date,
        //     now,
        //     diff: now - streak.last_activity_date,
        //     daysSince: daysSinceLastActivity,
        //     current_streak: streak.current_streak,
        // });

        if (daysSinceLastActivity > 1 && streak.current_streak > 0) {
            const reset = await db.getFirstAsync<DBStreak>(
                `UPDATE lp_streaks
                 SET current_streak = 0, dirty = 1, updated_at = ?
                 WHERE user_id = ?
                 RETURNING *`,
                [now, userId]
            );
            return reset ?? streak;
        }
 
        return streak;
    }
    catch (error) {
        console.error("getStreaks error:", error);
        return null;
    }
};

export const getDirtyStreaks = async (userId: string): Promise<DBStreak | null> => {
    return await db.getFirstAsync<DBStreak>(
        "SELECT * FROM lp_streaks WHERE dirty = 1 AND user_id = ?",
        [userId]
    );
};

export const upsertStreak = async (streak: StreaksType) => {
    try {
        const now = Math.floor(Date.now() / 1000);

        const result = await db.getFirstAsync(
            `
            INSERT INTO lp_streaks
                (user_id, current_streak, longest_streak, last_activity_date, updated_at, dirty)
            VALUES (?, ?, ?, ?, ?, 1)
            ON CONFLICT(user_id) DO UPDATE SET
                current_streak = excluded.current_streak,
                longest_streak = excluded.longest_streak,
                last_activity_date = excluded.last_activity_date,
                updated_at = excluded.updated_at,
                dirty = 1
            RETURNING *
            `,
            [
                streak.user_id,
                streak.current_streak,
                streak.longest_streak,
                streak.last_activity_date ?? now,
                streak.updated_at ?? now,
            ]
        );

        return result!;
    }
    catch(error) {
        console.error( "UpsertStreak error", error );
    }
};


export const markStreaksClean = async (items: DBStreak[]) => {
    if (!items.length) return;
    const ids = items.map(
        () => "(?)"
    ).join(",");
    const params = items.flatMap(streak => [ streak.id ]);
    await db.runAsync(
        `UPDATE lp_streaks SET dirty = 0 WHERE id IN ${ids}`,
        params
    );
};

export const clearStreak = async () => {
  try{
    await db.runAsync(`DELETE FROM lp_streaks`);
    console.log("Cleared all data from lp_streaks table.");
  }
  catch(error) {
    console.error("clearStreak error:", error);
  }
}