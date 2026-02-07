import { db } from "@/db"
import api from "@/lib/api";

// interface EventOutbox<T> {
//     event_id: string;
//     userId: string,
//     idempotencyKey: string,
//     payload: T
// }

export const syncEvents = async () => {
    try {
        const events = await db.getAllAsync<any>(
            `SELECT * FROM lp_event_outbox WHERE published = 0 ORDER BY occurred_at ASC`
        );

        for( const event of events ) {
            await api.post("/events", event); // Backend produces to KAFKA

            await db.runAsync(
                `UPDATE lp_event_outbox SET published = 1 WHERE event_id = ?`,
                [ event.event_id ]
            );
        }

    }
    catch(error) {
        console.error("syncEvents error", error);
        return; // stop on first failure (order preserved)
    }
}