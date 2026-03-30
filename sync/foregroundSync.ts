import NetInfo from "@react-native-community/netinfo";
import { syncDirtyProfile } from "./syncProfile";
import { syncDirtySettings } from "./syncSettings";
import { syncDirtyStreaks } from "./syncStreaks";
import { syncDirtyProgress } from "./syncProgress";
import { authSnapshot } from "@/snapshots/authSnapshot";
import { syncDirtyVocabulary } from "./syncVocabulary";
import { syncEvents } from "./syncEvents";
import { toastSuccess } from "@/services/toast.service";
// import { syncDirtyPerformance } from "./syncPerformace";

export const runForegroundSync = async () => {
    try {
        const net = await NetInfo.fetch();
        if (!net.isConnected) {
            toastSuccess("No Connection!");
            // toastSuccess("No Connection! Sync will run when you're back online.");
            return console.warn("No Connection!");
        }

        if (!authSnapshot.isReady()) {
            console.warn("Auth not ready, skipping sync");
            return;
        }

        const userId = authSnapshot.getUserId()!;
        console.log("🔄 Starting foreground sync for userId:", userId);

        let didWork = false;

        console.log("📤 Syncing events...");
        const eventsResult = await syncEvents().catch(e => { console.error("❌ Events sync threw:", e); return false; });
        console.log("✅ Events done:", eventsResult);
        didWork ||= !!eventsResult;

        console.log("📤 Syncing profile...");
        const profileResult = await syncDirtyProfile(userId).catch(e => { console.error("❌ Profile sync threw:", e); return false; });
        console.log("✅ Profile done:", profileResult);
        didWork ||= !!profileResult;

        console.log("📤 Syncing settings...");
        const settingsResult = await syncDirtySettings(userId).catch(e => { console.error("❌ Settings sync threw:", e); return false; });
        console.log("✅ Settings done:", settingsResult);
        didWork ||= !!settingsResult;

        console.log("📤 Syncing progress...");
        const progressResult = await syncDirtyProgress(userId).catch(e => { console.error("❌ Progress sync threw:", e); return false; });
        console.log("✅ Progress done:", progressResult);
        didWork ||= !!progressResult;

        console.log("📤 Syncing streaks...");
        const streaksResult = await syncDirtyStreaks(userId).catch(e => { console.error("❌ Streaks sync threw:", e); return false; });
        console.log("✅ Streaks done:", streaksResult);
        didWork ||= !!streaksResult;

        console.log("📤 Syncing vocabulary...");
        const vocabResult = await syncDirtyVocabulary(userId).catch(e => { console.error("❌ Vocab sync threw:", e); return false; });
        console.log("✅ Vocab done:", vocabResult);
        didWork ||= !!vocabResult;

        

        console.log("🏁 Foreground sync complete. didWork:", didWork);
        return didWork ? 1 : 0;

    } catch (error) {
        console.error("💥 runForegroundSync top-level error:", error);
    }
};

// export const runForegroundSync = async () => {
//     try {
//         const net = await NetInfo.fetch();
//         if( !net.isConnected ) return console.warn( "No Connection!" );

//         if (!authSnapshot.isReady()) {
//             console.warn("Auth not ready, skipping sync");
//             return;
//         }

//         const userId = authSnapshot.getUserId()!;
//         console.log("Foreground sync task running...");
//         // prarallel version
//         // await Promise.all([
//         //     syncDirtyProfile( userId ), // Meed user ID
//         //     syncDirtySettings( userId ), // Meed user ID
//         //     syncDirtyStreaks( userId ),
//         //     syncDirtyProgress( userId ),
//         //     syncDirtyVocabulary( userId ),
//         //     syncEvents()
//         // ]);

//         let didWork = false;
//         // sequential version
//         didWork ||= !!(await syncDirtyProfile(userId));
//         didWork ||= !!(await syncDirtySettings(userId));
//         didWork ||= !!(await syncDirtyProgress(userId));
//         didWork ||= !!(await syncDirtyStreaks(userId));
//         didWork ||= !!(await syncDirtyVocabulary(userId));
//         didWork ||= !!(await syncEvents());
    
//         console.log("Foreground sync done...");
//         return didWork ? 1 : 0;

//     }
//     catch(error) {
//         console.error("runForegroundSync error:", error)
//     }
// }