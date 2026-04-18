import { useQuery } from "@tanstack/react-query";
import { getLessonsByUnit, saveLessons } from "@/db/lessons.repo";
import { SessionType } from "@/types";
import { normalizeLessons } from "@/utils";
import { fetchLessonsFromAPI } from "@/services/lessons.service";
import { useNetwork } from "@/context/NetworkContext";

/** Thrown when there is no local cache and the device is offline */
export class OfflineCacheMissError extends Error {
    readonly type = "offline_cache_miss" as const;
    constructor(public sessionType: SessionType) {
        super(`No cached lessons for session type "${sessionType}" and device is offline.`);
    }
}

export const useLessons = ( categoryId: string, unitId: string, type: SessionType ) => {
    const { isOnline } = useNetwork();

    return useQuery({
        queryKey: ["lp_lessons", categoryId, unitId, type],
        enabled: !!categoryId && !!unitId && !!type,
        queryFn:   async () => {
            const local = await getLessonsByUnit(unitId, type);

            // ── Cache hit ──────────────────────────────────────────────────
            if (local.length > 0) {
                // Fire-and-forget background refresh only when online
                if (isOnline) {
                    fetchLessonsFromAPI(categoryId, unitId, type)
                        .then((api) => normalizeLessons(api, type))
                        .then(saveLessons)
                        .catch(() => {
                            // Network dropped during background refresh — ignore,
                            // user already has valid cached data
                        });
                }
                return local;
            }

            // ── Cache miss ─────────────────────────────────────────────────
            if (!isOnline) {
                // Let the session screen render a meaningful offline message
                // instead of an empty FlatList with no explanation
                throw new OfflineCacheMissError(type);
            }

            // Online + cache miss → fetch, persist, return
            const apiLessons  = await fetchLessonsFromAPI(categoryId, unitId, type);
            const normalized  = normalizeLessons(apiLessons, type);
            await saveLessons(normalized);
            return normalized;
        },
        retry: (failureCount, error) => {
            // Don't retry offline cache misses — retrying won't help without a network
            if (error instanceof OfflineCacheMissError) return false;
            return failureCount < 2;
        },
        // staleTime: Infinity,
        gcTime: Infinity
    });
};