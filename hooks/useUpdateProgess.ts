import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertProgress } from "@/db/progress.repo";

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: {
      content_type: string;
      content_id: string;
      completed?: boolean;
      score?: number;
      progressPercent?: number;
      updatedAt: number;
    }) => upsertProgress(progress),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['lp_progress']
        });
    },
  });
};
