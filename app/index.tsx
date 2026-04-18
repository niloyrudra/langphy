import React from "react";
import { useAuth } from "@/context/AuthContext";
import { speechController } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import { runForegroundSync } from "@/sync/foregroundSync";
import { AppState } from "react-native";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { useLessonTimer } from "@/hooks/useLessonTimer";
import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { registerForPushNotifications, setupNotificationHandler } from "@/domain/notificationRules";
import Constants from "expo-constants";
import { preloadFeedbackSounds } from "@/utils/feedback";
import { registerDevicesForNotification } from "@/services/notification.service";

const isExpoGo = Constants.appOwnership === "expo";

const App = () => {
  const { user, loading } = useAuth();
  const timer = useLessonTimer();

  React.useEffect(() => {
    if(!user) return;
    const sub = AppState.addEventListener("change", state => {
      if (state === "active") {
        timer.reset();
        runForegroundSync();
      }
    });

    setupNotificationHandler(); // 👈 ADD THIS
    const setupPush = async () => {
      try {
        const token = await registerForPushNotifications();
        if (!token) return;
        if (isExpoGo) {
          console.log("Skipping ads in Expo Go");
          return;
        }

        await registerDevicesForNotification(token);
        
      } catch (error) {
        console.warn("Device registration failed", error);
      }
    };

    runForegroundSync(); // app launch
    setupPush();

    return () => sub.remove();
  }, [user]);

  React.useEffect(() => {
    (async () => {
      await registerBackgroundSync();
      await preloadFeedbackSounds();
    })();

    // warmUpSpeech();
    
  }, []);

  React.useEffect(() => {
    speechController.warmUp(); // fire and forget — returns the shared promise
  }, []);

  // ✅ Now conditionals come AFTER hooks
  if (loading) {
    return <LoadingScreenComponent />;
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
};

export default App;