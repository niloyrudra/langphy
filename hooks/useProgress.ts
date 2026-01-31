import { useQuery } from "@tanstack/react-query";
import { getAllProgress } from "@/db/progress.repo";

export const useProgress = () => useQuery({
    queryKey: ["lp_progress"],
    queryFn: getAllProgress,
    initialData: [],
});