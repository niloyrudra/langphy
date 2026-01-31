import { getDirtyProgress, markProgressClean } from "@/db/progress.repo";
import api from "@/lib/api";

/**
 * Sync all dirty progress rows to backend
 */
export const syncProgress = async () => {
  const dirty = await getDirtyProgress();
  if (!dirty.length) return;

  try {
    await api.post("/progress/bulk-sync", {
      items: dirty.map(p => ({
        content_type: p.content_type,
        content_id: p.content_id,
        completed: p.completed,
        score: p.score,
        progress_percent: p.progress_percent,
        updated_at: p.updated_at,
      })),
    });

    // Mark synced rows as clean
    // await markProgressClean(dirty.map(p => p.id));
    await markProgressClean(dirty);
    console.log(`Progress synced: ${dirty.length} rows`);

    return dirty.length;
  } catch (err) {
    console.warn("Progress sync failed, will retry later:", err);
    return 0;
  }
};