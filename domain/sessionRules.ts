import { db } from "@/db";
import { countCompletedLessons } from "@/db/progress.repo";

export const isSessionCompleted = async ( sessionKey: string, totalLessons: number ) => {
    try {
        const completedCount = await countCompletedLessons( sessionKey );
        return completedCount! >= totalLessons;
    }
    catch(error) {
        console.error("isSessionCompleted func error:", error);
    }
};

export const sumSessionDuration = async ( sessionKey: string ): Promise<number> => {
    try {
        const result = await db.getFirstAsync<{ total: number }>(
            `
            SELECT COALESCE(SUM(duration_ms), 0) AS total
            FROM lp_progress
            WHERE session_key = ?
                AND completed = 1
            `,
            [sessionKey]
        );

        return result?.total ?? 0;
    }
    catch(error) {
        console.error( "sumSessionDuration error:", error );
        return 0;
    }
}