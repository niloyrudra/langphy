import { db } from "@/db";
import { getStreaks, upsertStreak } from "@/db/streaks.repo";

const dayKey = (ts: number) => Math.floor(ts / 86400); // UTC day bucket

export const applyStreakIfEligible = async ({
    userId,
    occurredAt,
}: {
    userId: string;
    occurredAt: number;
}) => {
    const today = dayKey(occurredAt);

    const streak = await db.getFirstAsync<{
        current_streak: number;
        longest_streak: number;
        last_activity_date: number | null;
    }>(
        `SELECT * FROM lp_streaks WHERE user_id = ?`,
        [userId]
    );

    // First-ever streak
    if (!streak) {
        await db.runAsync(
            `
            INSERT INTO lp_streaks (
                user_id,
                current_streak,
                longest_streak,
                last_activity_date,
                updated_at,
                dirty
            ) VALUES (?, 1, 1, ?, ?, 1)
            `,
            [userId, today, occurredAt]
        );
        return {updated: true};
    }

    // Already counted today
    if (streak.last_activity_date === today)  return {updated: false};

    const yesterday = today - 1;

    const nextStreak = streak.last_activity_date === yesterday ? streak.current_streak + 1 : 1;

    const longest = Math.max( streak.longest_streak, nextStreak );

    await db.runAsync(
        `
        UPDATE lp_streaks SET
            current_streak = ?,
            longest_streak = ?,
            last_activity_date = ?,
            updated_at = ?,
            dirty = 1
        WHERE user_id = ?
        `,
        [nextStreak, longest, today, occurredAt, userId]
    );
     return {updated: true};
};



export const updateStreaksIfNeeded = async ( userId: string ) => {
    try {
        const now = Math.floor( Date.now() / 1000 );
        const today = Math.floor( now / 86400 );

        const streak = await getStreaks( userId );

        if( !streak ) {
            return await upsertStreak({
                user_id: userId,
                current_streak: 1,
                longest_streak: 1,
                last_activity_date: today,
                updated_at: now
            });
        }

        if( streak.last_activity_date === today ) return;

        let current = 1;
        if( streak.last_activity_date === today - 1 ) {
            current = streak.current_streak + 1;
        }

        await upsertStreak({
            user_id: userId,
            current_streak: current,
            longest_streak: Math.max(streak.longest_streak, current),
            last_activity_date: today,
            updated_at: now,
        });

    }
    catch(error) {
        console.log("updateStreaksIfNeeded error:", error)
    }
}

export const hasCompletedSessionToday = async (userId: string) => {
    const today = Math.floor(
        new Date().setHours(0, 0, 0, 0) / 1000
    );

    const res = await db.getFirstAsync(
        `
        SELECT 1 FROM lp_streaks
        WHERE user_id = ?
        AND last_activity_date >= ?
        `,
        [userId, today]
    );

    return !!res;
};
