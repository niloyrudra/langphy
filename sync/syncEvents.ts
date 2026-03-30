import { db } from "@/db"
import api from "@/lib/api";
import { EventIndex } from "@/types";

export const syncEvents = async (): Promise<boolean> => {
  try {
    const events = await db.getAllAsync<EventIndex>(
        `SELECT * FROM lp_event_outbox 
        WHERE published = 0 
        ORDER BY occurred_at ASC`
    );

    if (!events.length) {
        console.log("✅ No events to sync");
        return true;
    }

    let didWork = false;
    for (const event of events) {
        try {
            // ✅ Safe payload parsing
            let parsedPayload: unknown;
            try {
                parsedPayload = JSON.parse(event.payload);
            } catch (parseError) {
                console.error("❌ Invalid JSON payload:", event.event_id);

                // Skip bad event (or you could mark as failed)
                continue;
            }

            // ✅ Normalize event to backend contract
            const normalizedEvent = {
                event_id: event.event_id,
                event_type: event.event_type,
                event_version: 1, // keep consistent with backend schema
                user_id: event.user_id,
                // occurred_at: new Date(event.occurred_at).toISOString(),
                occurred_at: new Date(event.occurred_at * 1000).toISOString(), // ✅ Ensure payload is an object (or wrap in one if needed)
                payload: parsedPayload,
            };

            // ✅ Send to backend (gateway → Kafka)
            await api.post("/events", normalizedEvent);

            // ✅ Mark as published ONLY after success
            await db.runAsync(
                `UPDATE lp_event_outbox 
                SET published = 1 
                WHERE event_id = ?`,
                [event.event_id]
            );

            console.log(`✅ Synced event: ${event.event_id}`);
            didWork = true;
        }
        catch (err: any) {
            console.error("❌ Event failed:", event.event_id);

            if (err.response) {
                console.error("📛 Backend says:", err.response.data);
            } else {
                console.error("📛 Error:", err.message);
            }

            return false;  // ❗ STOP + signal failure
            // break;
        }
    }

    console.log("🚀 syncEvents completed");
    return didWork;
  } catch (error) {
    console.error("❌ syncEvents fatal error:", error);
    return false;
  }
};