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

export const enqueueEvent = async <T>(
    eventType: string,
    userId: string,
    idempotencyKey: string,
    payload: T
) => {
    try {
        const now = Math.floor( Date.now() / 1000 );
        const eventId = crypto.randomUUID();

        await db.runAsync(
            `INSERT OR IGNORE INTO lp_event_outbox
                (event_id, event_type, user_id, idempotency_key, payload, occurred_at)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                eventId,
                eventType,
                userId,
                idempotencyKey,
                JSON.stringify(payload),
                now
            ]
        );
        return eventId;
    }
    catch(error) {
        console.error( "enqueueEvent error:", error );
        return null;
    }
}