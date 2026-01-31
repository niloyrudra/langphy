import { useQuery } from "@tanstack/react-query";
import { getUnitsByCategory, saveUnits } from "@/db/unit.repo";
import { fetchUnitsFromAPI } from "@/services/unit.service";
import { normalizeUnits } from "@/utils";

export const useUnits = ( categoryId: string ) => {
    return useQuery({
        queryKey: ["lp_units", categoryId],
        enabled: !!categoryId,
        queryFn: async () => {
            try {
                const localUnits = await getUnitsByCategory( categoryId );

                if(localUnits.length > 0) {
                    return localUnits;
                }
    
                const apiUnits = await fetchUnitsFromAPI( categoryId );

                const normalizedUnits = normalizeUnits( apiUnits );
                if(normalizedUnits.length > 0) {
                    await saveUnits( normalizedUnits );
                }
                return normalizedUnits;
            }
            catch(err) {
                console.error("useUnits Error:", err);
                return [];
            }
        },
        // initialData: [],
        staleTime: Infinity, // static data
        gcTime: Infinity,
    });
}