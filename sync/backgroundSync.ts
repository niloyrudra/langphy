import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { syncDirtyProgress } from "./syncProgress";
import { syncDirtyStreaks } from "./syncStreaks";
import NetInfo from "@react-native-community/netinfo";
import { syncDirtyProfile } from "./syncProfile";
import { syncDirtySettings } from "./syncSettings";
import { authSnapshot } from "@/snapshots/authSnapshot";

const BACKGROUND_SYNC_TASK = "BACKGROUND_SYNC_TASK";

export const runSync = async () => {
  try {

    if (!authSnapshot.isReady()) {
      console.warn("Auth not ready, skipping sync");
      return BackgroundTask.BackgroundTaskResult.Success;
    }

    const userId = authSnapshot.getUserId()!;

    // await Promise.all([
    //   syncProfile( userId ),
    //   syncSettings( userId ),
    //   syncProgress( userId ),
    //   syncStreaks( userId )
    // ]);

    let didWork = false;

    didWork ||= !!(await syncDirtyProfile(userId));
    didWork ||= !!(await syncDirtySettings(userId));
    didWork ||= !!(await syncDirtyProgress(userId));
    // didWork ||= await syncPerformance(userId);
    didWork ||= !!(await syncDirtyStreaks(userId));

    return didWork
      ? BackgroundTask.BackgroundTaskResult.Success // NewData
      : BackgroundTask.BackgroundTaskResult.Success; // NoData
  } catch (err) {
    console.error("Background sync failed:", err);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
}

/**
 * Define the background task
 * This runs when the OS schedules your background task
 */
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log("No network connection, skipping background sync.");
      return BackgroundTask.BackgroundTaskResult.Success; // Tasks expect either Success or Failed
    }

    console.log("Background sync task running...");

    // const progressSynced = await syncProgress();
    // const streaksSynced = await syncStreaks();
    // if (!progressSynced && !streaksSynced) {
      // return BackgroundTask.BackgroundTaskResult.Success;
    // }
    
    await runSync();

    console.log("Background sync completed successfully");
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("Error during background sync:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

/**
 * Register the background task with the OS
 */
export const registerBackgroundSync = async () => {
  try {
    // Check if the task is already registered
    const status = await BackgroundTask.getStatusAsync();
    if (status === BackgroundTask.BackgroundTaskStatus.Restricted ) { // Restricted | Available
      console.warn("Background tasks are not allowed on this device.");
      return;
    }

    // Register the task
    await BackgroundTask.registerTaskAsync(BACKGROUND_SYNC_TASK, {
      minimumInterval: 15 * 60, // 15 minutes
    //   startOnBoot: true,
    //   stopOnTerminate: false,
    });

    console.log("Background sync task registered successfully.");
  } catch (error) {
    console.error("Error registering background sync:", error);
  }
};


// 3. Optionally, unregister the background task
export const unregisterBackgroundSync = async () => {
  try {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    console.log("Background sync task unregistered successfully.");
  } catch (error) {
    console.error("Error unregistering background sync:", error);
  }
};