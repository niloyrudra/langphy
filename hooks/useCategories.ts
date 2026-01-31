import { useQuery } from "@tanstack/react-query";
import { getCategories, saveCategories } from "@/db/category.repo";
import { fetchCategoryFromAPI } from "@/services/category.service";
import { normalizeCategories } from "@/utils";

export const useCategories = () => {
    return useQuery({
        queryKey: ['lp_categories'],
        queryFn: async () => {
            try {
                const localCategories = await getCategories();
                if(localCategories.length > 0) {
                    return localCategories;
                }
                const apiCategories = await fetchCategoryFromAPI();
                const normalizeCatData = normalizeCategories(apiCategories);
                if(normalizeCatData.length > 0) {
                    await saveCategories(normalizeCatData);
                }
                return normalizeCatData;
            }
            catch( error ) {
                console.error("Error fetching categories:", error);
                return [];
            }
        },
        // initialData: [],
        staleTime: Infinity, // static data
        gcTime: Infinity,
    });
}