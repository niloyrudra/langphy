import api from "@/lib/api";
import { getDirtyStreaks, markStreaksClean } from "@/db/streaks.repo";

export const syncStreaks = async () => {
    const dirtyStreaks = await getDirtyStreaks();
    if (dirtyStreaks.length === 0) return;

    try {
        const response = await api.post("/streaks/bulk-sync", { items: dirtyStreaks });
        if (response.status !== 200) return;
        await markStreaksClean(dirtyStreaks);

        console.log(`Streaks synced: ${dirtyStreaks.length} events`);

        return dirtyStreaks.length;
    }
    catch(error) {
        console.warn("Streaks sync failed, will retry later:", error);
        return 0;
    }
}