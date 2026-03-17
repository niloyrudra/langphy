/**
 * syncVocabulary.ts
 *
 * Follows the same dirty-flag pattern as your other background syncs.
 * Call this from your existing registerBackgroundSync() alongside
 * syncProgress, syncStreaks, etc.
 */
import api from "@/lib/api";
import { getDirtyVocabulary, markVocabularyClean } from "@/db/vocabulary.repo";
// import { authSnapshot } from "@/snapshots/authSnapshot";

export const syncDirtyVocabulary = async ( userId: string ): Promise<boolean | undefined> => {
    // const userId = authSnapshot.getUserId();
    // if (!userId) return;

    try {
        const dirty = await getDirtyVocabulary(userId);
        if (!dirty.length) return;

        const words = dirty.map(v => ({
            word:       v.word,
            lemma:      v.lemma,
            pos:        v.pos,
            meaning_en: v.meaning_en,
            unit_id:    v.unit_id,
            category_id: v.category_id,
        }));

        const response = await api.post("/vocabulary/sync", { words });

        if (response.status === 200) {
            await markVocabularyClean(dirty);
            console.log(`[syncDirtyVocabulary] Synced ${dirty.length} words`);
            return true;
        }
        return false;
    } catch (err) {
        // Non-blocking — failed sync will retry on next background tick
        console.warn("[syncDirtyVocabulary] Sync failed (will retry):", err);
        return false;
    }
};