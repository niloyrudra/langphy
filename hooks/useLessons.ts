import { useQuery } from "@tanstack/react-query";
import { getLessonsByUnit, saveLessons } from "@/db/lessons.repo";
import { SessionType } from "@/types";
import { normalizeLessons } from "@/utils";
import { fetchLessonsFromAPI } from "@/services/lessons.service";
import { toast } from "@backpackapp-io/react-native-toast";
import { toastError, toastSuccess } from "@/services/toast.service";

export const useLessons = ( categoryId: string, unitId: string, type: SessionType ) => {
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

                toastSuccess(`${type.toUpperCase()} Session On!`)

                return local;
            }
            catch(error) {
                console.error("Use Lessons Error:", error);
                toastError(`${type.toUpperCase()} Session failed to load!`)
                return [];
            }
        },
        // staleTime: Infinity,
        gcTime: Infinity
    });
};