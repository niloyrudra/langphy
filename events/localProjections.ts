import { getStreaks } from "@/db/streaks.repo";
import { subscribe } from "./localBus";
import { queryClient } from "@/queryClient";
import { getSessionProgress } from "@/db/progress.repo";
import { getPerformance } from "@/db/performance.repo";

export const registerLocalProjections = () => {

  subscribe("streak.updated.v1", async (event: any) => {
    const { userId } = event.payload;
    const updated = await getStreaks(userId);

    queryClient.setQueryData(
      ["lp_streaks", userId],
      updated
    );
  });

  subscribe("lesson.completed.v1", async (event: any) => {
    const { sessionKey } = event.payload;
    const updated = await getSessionProgress(sessionKey);

    queryClient.setQueryData(
      ["lp_progress", sessionKey],
      updated
    );
  });

  subscribe("session.completed.v1", async (event: any) => {
    const { performanceSessionKey } = event.payload;
    const updated = await getPerformance(performanceSessionKey);

    queryClient.setQueryData(
      ["lp_session_performance", performanceSessionKey],
      updated
    );
  });

};
