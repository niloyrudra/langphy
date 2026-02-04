import { markLessonCompleted } from "@/db/progress.repo";
import { updateStreaksIfNeeded } from "./streakRules";
import { upsertPerformance } from "@/db/performance.repo";
import { emitSessionCompletedEvent } from "@/events/localEvents";
import { CompleteLessonChainInput } from "@/types";

export async function completeLessonChain(input: CompleteLessonChainInput) {
  const now = Math.floor(Date.now() / 1000);
  const sessionKey = `${input.unitId}:${input.sessionType}`;

  /**
   * 1️⃣ Mark ALL lessons as completed
   * (safe because INSERT ... ON CONFLICT)
   */
  for (const lessonId of input.lessonIds) {
    await markLessonCompleted({
      content_type: input.sessionType,
      lessonId,
      sessionKey,
      score: input.score,
    });
  }

  /**
   * 2️⃣ Update streaks (once per day, internally guarded)
   */
  await updateStreaksIfNeeded(input.userId);

  /**
   * 3️⃣ Update performance (replays allowed)
   */
  await upsertPerformance({
    userId: input.userId,
    type: input.sessionType,
    score: input.score,
    maxScore: input.maxScore,
  });

  /**
   * 4️⃣ Emit local event (Kafka-friendly)
   */
  await emitSessionCompletedEvent({
    userId: input.userId,
    sessionKey,
    sessionType: input.sessionType,
    score: input.score,
    timeSpentSec: input.timeSpentSec,
    timestamp: now,
  });

  return {
    ok: true,
    sessionKey,
  };
}

// import { markLessonCompleted } from "@/db/progress.repo";
// import { getLessonBySession } from "@/db/lessons.repo";
// import { isSessionCompleted } from "./sessionRules";
// import { handleSessionCompleted } from "./sessionCompletedHandler";

// import { CompleteLessonInput } from "@/types";

// export const completeLessonChain = async ( input: CompleteLessonInput ) => {
//     try {

//         const sessionKey = `${input.unitId}:${input.type}`;
    
//         // 1️⃣ Mark lesson progress (idempotent)
//         await markLessonCompleted({
//             content_type: input.type,
//             lessonId: input.lessonId,
//             sessionKey,
//             score: input.score
//         });
    
//         // 2️⃣ Check if session is now complete
//         const lessons = await getLessonBySession( input.unitId, input.type );
    
//         const completed = await isSessionCompleted( sessionKey, lessons!.length );
    
//         if( ! completed ) return { sessionCompletd: false }
    
//         // 3️⃣ Handle session completion side-effects
//         await handleSessionCompleted({
//             userId: input.userId,
//             sessionKey,
//             type: input.type,
//             score: input.score,
//             maxScore: input.maxScore,
//             timeSpentSec: input.timeSpentSec
//         });
    
//         return {
//             sessionCompleted: true
//         }
//     }
//     catch(error) {
//         console.error("CompleteLessonChain Error:", error)
//     }
// }