import { db } from "./index";

export type DBStreak = {
    id: string;
    user_id: string;
    current_streak: number;
    longest_streak: number;
    last_activity_date: number;
    updated_at: number;
    dirty: number;
};

export const getStreaks = async (userId: string): Promise<DBStreak | null> => {
    return await db.getFirstAsync<DBStreak>(
        "SELECT * FROM lp_streaks WHERE user_id = ?",
        [userId]
    );
};

export const getDirtyStreaks = async (userId: string): Promise<DBStreak | null> => {
    return await db.getFirstAsync<DBStreak>(
        "SELECT * FROM lp_streaks WHERE dirty = 1 AND user_id = ?",
        [userId]
    );
};
export const upsertStreak = async (s: {
    id: string;
    user_id: string;
    current_streak: number;
    longest_streak: number;
    last_activity_date: number;
    updated_at: number;
}) => {
    await db.runAsync(
        `INSERT OR REPLACE INTO lp_streaks
     (id, user_id, current_streak, longest_streak, last_activity_date, updated_at, dirty)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
            s.id,
            s.user_id,
            s.current_streak,
            s.longest_streak,
            s.last_activity_date,
            s.updated_at,
        ]
    );
};
export const markStreaksClean = async (items: DBStreak[]) => {
    if (!items.length) return;
    const ids = items.map(
        () => "(?)"
    ).join(",");
    const params = items.flatMap(s => [ s.id ]);
    await db.runAsync(
        `UPDATE lp_streaks SET dirty = 0 WHERE id IN ${ids}`,
        params
    );
};