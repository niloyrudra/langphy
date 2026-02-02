import { useQuery } from "@tanstack/react-query";
import { getLessonsByUnit, saveLessons } from "@/db/lessons.repo";
import { ContentType } from "@/types";
import { normalizeLessons } from "@/utils";
import { fetchLessonsFromAPI } from "@/services/lessons.service";

export const useLessons = ( categoryId: string, unitId: string, type: ContentType ) => {
    return useQuery({
        queryKey: ["lp_lessons", categoryId, unitId, type],
        enabled: !!categoryId && !!unitId && !!type,
        queryFn: async () => {
            try {
                const local = await getLessonsByUnit(unitId, type);

                // ✅ First install / cache miss
                if (local.length === 0) {
                    const apiLessons = await fetchLessonsFromAPI(
                        categoryId,
                        unitId,
                        type
                    );

                    const normalized = normalizeLessons(
                        apiLessons,
                        type
                    );

                    await saveLessons(normalized);

                    return normalized;
                }
                // ✅ Background refresh
                fetchLessonsFromAPI(categoryId, unitId, type)
                    .then(api => normalizeLessons(api, type))
                    .then(saveLessons)
                    .catch(console.warn);

                return local;
            }
            catch(error) {
                console.error("Use Lessons Error:", error)
                return [];
            }
        },
        staleTime: Infinity,
        gcTime: Infinity
    });
};