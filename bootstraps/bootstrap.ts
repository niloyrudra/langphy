import { bootstrapProfileFromToken } from "./profile.bootstrap";
import { bootstrapSettingsFromToken } from "./settings.bootstrap";
import { bootstrapStreaks } from "./streaks.bootstrap";

export const bootstrap = async ( decode: any ) => {
    try {
        // Storing profile locally
        await Promise.all([
            bootstrapProfileFromToken({
                id: decode.id,
                email: decode.email,
                created_at: decode.created_at
            }),

            bootstrapSettingsFromToken({ user_id: decode.id}),
            
            bootstrapStreaks({ user_id: decode.id }),
        ]);
        console.log("Bootstrapped data from Login");
    }
    catch(error) {
        console.error("Bootstrap Error:", error);
    }
}