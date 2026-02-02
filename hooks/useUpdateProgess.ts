import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertProgress } from "@/db/progress.repo";
import { ProgressPayload } from "@/types";

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: ProgressPayload) => {
      try {
        await upsertProgress({
          content_type: progress.content_id,
          content_id: progress.content_id,
          completed: progress.completed,
          score: progress.score ?? 0,
          progress_percent: progress.progress_percent ?? 0,
          updated_at: progress.updated_at ?? 0,
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