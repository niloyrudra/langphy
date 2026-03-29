import api from "@/lib/api";
import { getDirtyStreaks, markStreaksClean } from "@/db/streaks.repo";

export const syncDirtyStreaks = async (userId: string) : Promise<boolean> => {
    const dirtyStreaks = await getDirtyStreaks(userId);
    if (!Array.isArray(dirtyStreaks) || dirtyStreaks.length === 0) return false;

    try {
        const response = await api.post("/streaks", { items: dirtyStreaks });
        if (response.status < 200 || response.status >= 300) return false;
        await markStreaksClean(dirtyStreaks);

        console.log(`Streaks synced: ${dirtyStreaks.length} events`);

        return true;
    }
    catch(error) {
        console.warn("Streaks sync failed, will retry later:", error);
        return false;
    }
}