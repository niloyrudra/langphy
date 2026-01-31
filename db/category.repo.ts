import { db } from "./index";
import { LocalCategory } from "@/types";
export const getCategories = async (): Promise<LocalCategory[]> => {
    return await db.getAllAsync<LocalCategory>(
        `SELECT id, title, slug, position_at FROM lp_categories ORDER BY position_at ASC`
    );
}

export const saveCategories = async ( categories: LocalCategory[] ) => {
    const now = Date.now();

    await db.withTransactionAsync( async () => {
        for( const category of categories ) {
            await db.runAsync(`
                INSERT INTO lp_categories (id, title, slug, position_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    title=excluded.title,
                    slug=excluded.slug,
                    position_at=excluded.position_at
            `, [
                category.id,
                category.title,
                category.slug,
                category.position_at
            ]);
        }
    });

    // const insertStmt = await db.runAsync(`
    //     INSERT INTO lp_categories (id, title, slug, position_at)
    //     VALUES (?, ?, ?, ?)
    //     ON CONFLICT(id) DO UPDATE SET
    //         title=excluded.title,
    //         slug=excluded.slug,
    //         position_at=excluded.position_at`);
}

export const clearCategories = async () => {
    await db.runAsync(`DELETE FROM lp_categories`);
}