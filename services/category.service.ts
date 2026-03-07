import api from "@/lib/api";

export const fetchCategoryFromAPI = async () => {
    try {
        const res = await api.get('/category');
        if(res.status !== 200) return [];
        
        const data = res.data;
        if( data ) {
            return data;
        }
        return [];
    }
    catch(error) {
        console.warn("fetchCategoryFromAPI error:", error);
        return [];
    }
}