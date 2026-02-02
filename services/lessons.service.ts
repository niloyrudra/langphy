import api from "@/lib/api";

export const fetchLessonsFromAPI = async (
    categoryId: string,
    unitId: string,
    type: string
) => {
    try {
        let lessonType = "practices";
        switch(type) {
            case 'practice' :
                lessonType = 'practices';
                break;
            case 'quiz' :
                lessonType = 'quizzes';
                break;
            
            default:
                lessonType = type
        }
        console.log(lessonType)
        const lessons = await api.get(`/${lessonType}/${categoryId}/${unitId}`);
        if (lessons.status !== 200) return [];
        return lessons.data || [];
    }
    catch(error) {
        console.error("Fetch Lessons Error:", error)
        return [];
    }
}