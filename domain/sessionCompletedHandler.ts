import { emitSessionCompletedEvent } from "@/events/localEvents";
import { SessionCompletedInput } from "@/types";
import { updateStreaksIfNeeded } from "./streakRules";
import { updatePerformance } from "./performanceRules";

export const handleSessionCompleted = async ( payload: SessionCompletedInput ) => {
    try {
        // 1️⃣ Streaks (once per day)
        await updateStreaksIfNeeded( payload.userId );

        // 2️⃣ Performance (always)
        await updatePerformance({
            userId: payload.userId,
            type: payload.type,
            score: payload.score,
            maxScore: payload.maxScore
        });

        // 3️⃣ Emit local event (Kafka-friendly)
        await emitSessionCompletedEvent( payload );
    }
    catch(error) {
        console.error("handleSessionCompleted error:", error);
    }
}