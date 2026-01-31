import api from "@/lib/api";
import { BackendLesson, Lesson, PracticeSessionType } from "@/types";

export const fetchPracticeData = async (categoryId: string, unitId: string) => {
    try {
        const res = await api.get(`/practices/${categoryId}/${unitId}`);
        if(res.status !== 200) return [];
        
        const data: (PracticeSessionType & BackendLesson)[] = res.data;  
        if( data ) {
            return data
            // setLessons(
            //   data.map((lesson: BackendLesson): Lesson => ({
            //     id: lesson._id,
            //     title: lesson.meaning,
            //     completed: false
            //   }))
            // );
        }
        return [];
    } catch (err) {
        console.error("Error fetching practice data:", err);
        return [];
    }
      
}