import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertProgress } from "@/db/progress.repo";
import { DBProgress } from "@/types";

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: DBProgress) => {
      try {
        await upsertProgress({
          category_id: progress.category_id,
          unit_id: progress.unit_id,
          content_type: progress.content_id,
          content_id: progress.content_id,
          session_key: progress.session_key,
          completed: progress.completed,
          score: progress.score ?? 0,
          lesson_order: progress.lesson_order ?? 0,
          progress_percent: progress.progress_percent ?? 0,
          duration_ms: progress.duration_ms,
          updated_at: progress.updated_at ?? 0,
          dirty: 1,
        });

      }
      catch(error) {
        console.error("Progress data update error:", error)
        // return [];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lp_progress']
      });
    },
  });
};