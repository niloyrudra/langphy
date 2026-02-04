import { db } from "@/db";

export const emitSessionCompletedEvent = async (payload: any) => {
    try {
        const now = Math.floor(Date.now() / 1000);
        await db.runAsync(
            `
            INSERT INTO lp_events (type, payload, created_at, synced)
            VALUES (?, ?, ?, 0)
            `,
            [
                "session.completed.v1",
                JSON.stringify(payload),
                now,
            ]
        );
    }
    catch(error) {
        console.error("emitSessionCompletedEvent error:", error)
    }
}
