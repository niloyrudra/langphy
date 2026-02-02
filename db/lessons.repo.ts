import { db } from "./index";
import { ContentType } from "@/types";

type LocalLesson = {
    id: string;
    // user_id: string;
    category_id: string;
    unit_id: string;
    type: ContentType;
    payload: string; // JSON stringified content
    dirty?: number;
    updated_at?: number;
}

export const getLessonsByUnit = async (unitId: string, type: ContentType): Promise<LocalLesson[]> => {
    try {
        const lessons = await db.getAllAsync<LocalLesson>(`
            SELECT * FROM lp_lessons WHERE unit_id = ? AND type = ?
        `, [unitId, type]);
        return lessons;
    }
    catch(error) {
        console.error("Get Lessons Error:", error)
        throw error;
    }
}

export const saveLessons = async ( lessons: LocalLesson[] ) => {
    // console.log("(saveLessons)->",lessons.length)
    try {
        await db.withTransactionAsync( async () => {
            for (const lesson of lessons) {
                await db.runAsync(`
                    INSERT INTO lp_lessons (id, category_id, unit_id, type, payload, dirty, updated_at )
                    VALUES ( ?, ?, ?, ?, ?, ?, ? )
                    ON CONFLICT(id) DO UPDATE SET
                        category_id = excluded.category_id,
                        unit_id = excluded.unit_id,
                        type = excluded.type,
                        payload = excluded.payload,
                        dirty = excluded.dirty,
                        updated_at = excluded.updated_at
                `, [
                    lesson.id,
                    lesson.category_id,
                    lesson.unit_id,
                    lesson.type,
                    lesson.payload,
                    lesson.dirty || 0,
                    lesson.updated_at || 0
                ]);
            }
        });
    }
    catch(error) {
        console.error("Upsert Lessons Error:", error)
    }
}

export const clearLessons = async () => {
    try {
        await db.runAsync(`DELETE FROM lp_lessons`);
        console.log("Cleared all lessons from lp_lessons table.");
    }
    catch(error) {
        console.error("Clear Lessons Error:", error)
    }
}