import NetInfo from "@react-native-community/netinfo";
import { syncDirtyProfile } from "./syncProfile";
import { syncDirtySettings } from "./syncSettings";
import { syncDirtyStreaks } from "./syncStreaks";
import { syncDirtyProgress } from "./syncProgress";
import { authSnapshot } from "@/snapshots/authSnapshot";
import { syncDirtyVocabulary } from "./syncVocabulary";
import { syncEvents } from "./syncEvents";
// import { syncDirtyPerformance } from "./syncPerformace";

export const runForegroundSync = async () => {
    try {
        const net = await NetInfo.fetch();
        if( !net.isConnected ) return console.warn( "No Connection!" );

        if (!authSnapshot.isReady()) {
            console.warn("Auth not ready, skipping sync");
            return;
        }

        const userId = authSnapshot.getUserId()!;
        console.log("Foreground sync task running...");
        // prarallel version
        // await Promise.all([
        //     syncDirtyProfile( userId ), // Meed user ID
        //     syncDirtySettings( userId ), // Meed user ID
        //     syncDirtyStreaks( userId ),
        //     syncDirtyProgress( userId ),
        //     syncDirtyVocabulary( userId ),
        //     syncEvents()
        // ]);

        let didWork = false;
        // sequential version
        didWork ||= !!(await syncDirtyProfile(userId));
        didWork ||= !!(await syncDirtySettings(userId));
        didWork ||= !!(await syncDirtyProgress(userId));
        didWork ||= !!(await syncDirtyStreaks(userId));
        didWork ||= !!(await syncDirtyVocabulary(userId));
        didWork ||= !!(await syncEvents());
    
        console.log("Foreground sync done...");
        return didWork ? 1 : 0;

    }
    catch(error) {
        console.error("runForegroundSync error:", error)
    }
}