import { subscribe } from "./localBus";
import { queryClient } from "@/queryClient";
import { getStreaks } from "@/db/streaks.repo";

export const registerLocalProjections = () => {

  // 🔥 STREAK PROJECTION
  subscribe("streak.updated.v1", async (event: any) => {
    const { userId } = event.payload;

    const updated = await getStreaks(userId);

    queryClient.setQueryData(
      ["lp_streaks", userId],
      updated
    );
  });

};