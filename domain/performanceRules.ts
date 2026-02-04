import { upsertPerformance } from "@/db/performance.repo";
import { SessionType } from "@/types";

type PerformanceInput = {
    userId: string;
    type: SessionType;
    score?: number;
    maxScore?: number;
}

export const updatePerformance = async (payload: PerformanceInput) => {
    try {
        await upsertPerformance({
            userId: payload.userId,
            type: payload.type,
            score: payload.score,
            maxScore: payload.maxScore
        });
    }
    catch(error) {
        console.error("updatePerformance error:", error);
    }
}