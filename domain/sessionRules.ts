import { db } from "@/db";
import { countCompletedLessons } from "@/db/progress.repo";
import { authSnapshot } from "@/snapshots/authSnapshot";

export const isSessionCompleted = async ( sessionKey: string, totalLessons: number ) : Promise<boolean> => {
    try {
        const completedCount = await countCompletedLessons( sessionKey );
        return completedCount! >= totalLessons;
    }
    catch(error) {
        console.error("isSessionCompleted func error:", error);
        return false;
    }
};

export const sumSessionDuration = async ( sessionKey: string ): Promise<number> => {
    const userId = authSnapshot.getUserId() ?? "";
    try {
        const result = await db.getFirstAsync<{ total: number }>(
            `
            SELECT COALESCE(SUM(duration_ms), 0) AS total
            FROM lp_progress
            WHERE session_key = ?
                AND completed = 1
                AND user_id = ?
            `,
            [sessionKey, userId]
        );

        return result?.total ?? 0;
    }
    catch(error) {
        console.error( "sumSessionDuration error:", error );
        return 0;
    }
}

export const avgScore = async ( sessionKey: string ): Promise<number> => {
    const userId = authSnapshot.getUserId() ?? "";
    try {
        const result = await db.getFirstAsync<{ avg_score: number }>(
            `
            SELECT COALESCE(AVG(score), 0) AS avg_score
            FROM lp_progress
            WHERE session_key = ?
                AND completed = 1
                AND score IS NOT NULL
                AND user_id = ?
            `,
            [sessionKey, userId]
        );

        return result?.avg_score ?? 0;
    }
    catch(error) {
        console.error( "avgScore error:", error );
        return 0;
    }
}