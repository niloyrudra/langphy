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