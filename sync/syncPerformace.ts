import { getDirtyPerformance, markPerformanceClean } from "@/db/performance.repo";
import api from "@/lib/api";

/**
 * Sync all dirty progress rows to backend
 */
export const syncDirtyPerformance = async ( userId: string ) => {
  const dirty = await getDirtyPerformance();
  if (!dirty.length) return;

  try {
    await api.post(`/performance/bulk-sync`, {
      items: dirty.map(p => ({
        session_key: p.session_key,
        session_type: p.session_type,
        user_id: userId,
        avg_score: p.avg_score,
        attempts: p.attempts,
        total_duration_ms: p.total_duration_ms,
        completed: p.completed,
        updated_at: p.updated_at,
      })),
    });

    // Mark synced rows as clean
    // await markPerformanceClean(dirty.map(p => p.id));
    await markPerformanceClean(dirty);
    console.log(`Performance synced: ${dirty.length} rows`);

    return true;
  } catch (err) {
    console.warn("Performance sync failed, will retry later:", err);
    return false;
  }
};