import { getStreaks, upsertStreak } from "@/db/streaks.repo";

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