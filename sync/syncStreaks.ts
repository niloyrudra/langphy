import api from "@/lib/api";
import { getDirtyStreaks, markStreaksClean } from "@/db/streaks.repo";

export const syncDirtyStreaks = async (userId: string) => {
    const dirtyStreaks = await getDirtyStreaks(userId);
    if (!Array.isArray(dirtyStreaks) || dirtyStreaks.length === 0) return;

    try {
        const response = await api.post("/streaks", { items: dirtyStreaks });
        if (response.status !== 200) return;
        await markStreaksClean(dirtyStreaks);

        console.log(`Streaks synced: ${dirtyStreaks.length} events`);

        return true;
    }
    catch(error) {
        console.warn("Streaks sync failed, will retry later:", error);
        return false;
    }
}