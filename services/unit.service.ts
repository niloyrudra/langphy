import api from "@/lib/api";

export const fetchUnitsFromAPI = async (categoryId: string) => {
  try {
    const res = await api.get(`/unit/${categoryId}`);
    if(res.status !== 200) return [];
    return res.data ?? [];
  } catch (err: any) {
    return [];
    // console.error(
    //   "fetchUnitsFromAPI failed",
    //   err?.response?.status,
    //   err?.response?.data
    // );
    // throw err; // let useUnits catch it
  }
};


// import api from "@/lib/api";

// export const fetchUnitsFromAPI = async (categoryId: string) => {
//     try {
//         const res = await api.get(`/units/${categoryId}`);
//         if(res.status !== 200) return [];
    
//         const data = res.data;
//         if( data ) {
//             return data;
//         }
//         return [];
//     }
//     catch(err) {
//         console.error("fetchUnitsFromAPI Error:", err);
//         return [];
//     }
// }