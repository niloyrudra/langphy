import { DBStreak, StreaksType } from "@/types";
import { db } from "./index";

export const getStreaks = async ( userId: string ): Promise<DBStreak | null> => {
    try {
        return await db.getFirstAsync<DBStreak>(
            "SELECT * FROM lp_streaks WHERE user_id = ?",
            [userId]
        );
    }
    catch(error) {
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