import { getDirtyProgress, markProgressClean } from "@/db/progress.repo";
import api from "@/lib/api";

/**
 * Sync all dirty progress rows to backend
 */
export const syncDirtyProgress = async ( userId: string ) => {
  const dirty = await getDirtyProgress();
  if (!dirty.length) return;

  try {
    await api.post(`/progress/bulk-sync`, {
      items: dirty.map(p => ({
        category_id: p.category_id,
        unit_id: p.unit_id,
        content_type: p.content_type,
        content_id: p.content_id,
        session_key: p.session_key,
        lesson_order: p.lesson_order,
        completed: p.completed,
        score: p.score,
        duration_ms: p.duration_ms,
        progress_percent: p.progress_percent,
        // updated_at: p.updated_at,
      })),
    });

    // Mark synced rows as clean
    // await markProgressClean(dirty.map(p => p.id));
    await markProgressClean(dirty);
    console.log(`Progress synced: ${dirty.length} rows`);

    return true;
  } catch (err) {
    console.warn("Progress sync failed, will retry later:", err);
    return false;
  }
};