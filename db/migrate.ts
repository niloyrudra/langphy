import { authSnapshot } from "@/snapshots/authSnapshot";
import { db } from "./index";
import {
    CREATE_CATEGORIES_TABLE,
    CREATE_KAFKA_EVENTS_TABLE,
    CREATE_LESSONS_TABLE,
    CREATE_PERFORMANCE_TABLE,
    CREATE_PROFILE_TABLE,
    CREATE_PROGRESS_TABLE,
    CREATE_SETTINGS_TABLE,
    CREATE_STREAKS_TABLE,
    CREATE_UNITS_TABLE
} from "./schema";
import * as SecureStore from "expo-secure-store";

export const runMigrations = async () => {
    // await db.runAsync(`DELETE FROM lp_profiles`);
    // await db.runAsync(`DELETE FROM lp_streaks`);
    // await db.runAsync(`DELETE FROM lp_settngs`);
    // await db.runAsync(`DELETE FROM lp_lesson`);
    // await db.runAsync(`DELETE FROM lp_session_performance`);

    // await SecureStore.deleteItemAsync("accessToken");
    // authSnapshot.clear();

    // await db.runAsync(`DROP TABLE IF EXISTS lp_profiles`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_settings`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_streaks`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_lessons`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_categories`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_units`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_progress`);
    // await db.runAsync(`DROP TABLE IF EXISTS lp_session_performance`);
    
    await Promise.all([
        db.execAsync(CREATE_PROFILE_TABLE),
        db.execAsync(CREATE_SETTINGS_TABLE),
        db.execAsync(CREATE_PROGRESS_TABLE),
        db.execAsync(CREATE_STREAKS_TABLE),
        db.execAsync(CREATE_CATEGORIES_TABLE),
        db.execAsync(CREATE_UNITS_TABLE),
        db.execAsync(CREATE_LESSONS_TABLE),
        db.execAsync(CREATE_PERFORMANCE_TABLE),
        db.execAsync(CREATE_KAFKA_EVENTS_TABLE),
    ]);
};