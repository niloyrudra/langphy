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
    const { session_key } = event.payload;
    const updated = await getSessionProgress(session_key);

    queryClient.setQueryData(
      ["lp_progress", session_key],
      updated
    );
  });

  subscribe("session.completed.v1", async (event: any) => {
    const { session_key } = event.payload;
    const updated = await getPerformance(session_key);

    queryClient.setQueryData(
      ["lp_session_performance", session_key],
      updated
    );
  });

};
