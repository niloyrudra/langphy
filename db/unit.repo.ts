import { LocalUnitType } from "@/types";
import { db } from "./index";

export const getUnitsByCategory = async ( categoryId: string ): Promise<LocalUnitType[]> => {
    return await db.getAllAsync<LocalUnitType>(
        `SELECT id, category_id, title, slug FROM lp_units WHERE category_id = ? ORDER BY title ASC`,
        [ categoryId ]
    );
}

export const saveUnits = async ( units: LocalUnitType[] ) => {
    await db.withTransactionAsync( async () => {
        for( const unit of units ) {
            await db.runAsync(`
                INSERT INTO lp_units (id, category_id, title, slug)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    category_id=excluded.category_id,
                    title=excluded.title,
                    slug=excluded.slug
            `, [
                unit.id,
                unit.category_id,
                unit.title,
                unit.slug
            ]);
        }
    });
}

export const clearUnits = async () => {
    try {
        await db.runAsync(`DELETE FROM lp_units`);
        console.log("Cleared all data from lp_units table.");
    }
    catch(error) {
        console.log("clearUnits error:", error);
    }
}