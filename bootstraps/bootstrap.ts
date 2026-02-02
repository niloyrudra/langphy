import { useAuth } from "@/context/AuthContext";
import { bootstrapProfileFromToken } from "./profile.bootstrap";
import { bootstrapSettingsFromToken } from "./settings.bootstrap";
import { bootstrapStreaks } from "./streaks.bootstrap";
// import { User } from "@/types";

export const bootstrap = async ( decode: any ) => {
    const {setUser} = useAuth();
    try {
        setUser( { id: decode.id, email: decode.email, created_at: decode.created_at } );
        // Storing profile locally
        await bootstrapProfileFromToken({
            id: decode.id,
            email: decode.email,
            created_at: decode.created_at
        });
        await bootstrapSettingsFromToken({ user_id: decode.id});
        await bootstrapStreaks({ user_id: decode.id });
        console.log("Bootstrapped data from Login");
    }
    catch(error) {
        console.error("Bootstrap Error:", error);
    }
}