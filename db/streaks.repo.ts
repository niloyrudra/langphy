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
    user_id: string;
    current_streak: number;
    longest_streak: number;
    last_activity_date?: number;
    updated_at?: number;
}) => {
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
            s.user_id,
            s.current_streak,
            s.longest_streak,
            s.last_activity_date ?? now,
            s.updated_at ?? now,
        ]
    );

    return result!;
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