import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVocabulary,
  getVocabularyCount,
  saveVocabularyWords,
//   VocabularyToken,
} from "@/db/vocabulary.repo";

export const VOCABULARY_KEYS = {
  all: (userId: string) => ["vocabulary", userId] as const,
  count: (userId: string) => ["vocabulary", "count", userId] as const,
};

export const useVocabulary = (userId: string) =>
  useQuery({
    queryKey: VOCABULARY_KEYS.all(userId),
    queryFn: () => getAllVocabulary(userId),
    enabled: !!userId,
  });

export const useVocabularyCount = (userId: string) =>
  useQuery({
    queryKey: VOCABULARY_KEYS.count(userId),
    queryFn: () => getVocabularyCount(userId),
    enabled: !!userId,
    staleTime: 30_000,
  });

export const useSaveVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveVocabularyWords,
    onSuccess: (_, variables) => {
      // Invalidate both count and full list so profile + vocabulary screen update
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEYS.all(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEYS.count(variables.userId),
      });
    },
  });
};