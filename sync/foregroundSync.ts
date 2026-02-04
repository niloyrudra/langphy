import NetInfo from "@react-native-community/netinfo";
import { syncDirtyProfile } from "./syncProfile";
import { syncDirtySettings } from "./syncSettings";
import { syncDirtyStreaks } from "./syncStreaks";
import { syncDirtyProgress } from "./syncProgress";
import { authSnapshot } from "@/snapshots/authSnapshot";

export const runForegroundSync = async () => {
    try {
        const net = await NetInfo.fetch();
        if( !net.isConnected ) return console.warn( "No Connection!" );

        if (!authSnapshot.isReady()) {
            console.warn("Auth not ready, skipping sync");
            return;
        }

        const userId = authSnapshot.getUserId()!;

        await Promise.all([
            syncDirtyProfile( userId ), // Meed user ID
            syncDirtySettings( userId ), // Meed user ID
            syncDirtyStreaks( userId ),
            syncDirtyProgress( userId )
        ]);

    }
    catch(error) {
        console.error("runForegroundSync error:", error)
    }
}