import { db } from "@/db";
import { randomUUID } from 'expo-crypto';
import { dispatchLocalEvent } from "./localBus";
import { EventType } from "@/types";

export const enqueueEvent = async <T>(
    eventType: EventType,
    userId: string,
    idempotencyKey: string,
    payload: T
) => {
    try {
        const now = Math.floor( Date.now() / 1000 );
        const eventId = randomUUID();

        // ✅ Build the full envelope that matches BaseEventSchema
        const envelope = {
            event_id: eventId,
            event_type: eventType,
            event_version: 1,
            occurred_at: new Date().toISOString(), // ✅ Zod requires datetime string
            user_id: userId,
            payload,
        };

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
                JSON.stringify(envelope),
                now
            ]
        );

        // 🔥 Immediately dispatch locally
        await dispatchLocalEvent(eventType, payload);

        return eventId;
    }
    catch(error) {
        console.error( "enqueueEvent error:", error );
        return null;
    }
}