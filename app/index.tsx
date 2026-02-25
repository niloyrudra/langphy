// import 'react-native-get-random-values';
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import { runForegroundSync } from "@/sync/foregroundSync";
import { AppState, Platform } from "react-native";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { useLessonTimer } from "@/hooks/useLessonTimer";
import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { registerForPushNotifications, setupNotificationHandler } from "@/domain/notificationRules";
import api from "@/lib/api";

const App = () => {
  const { user, loading } = useAuth();
  const timer = useLessonTimer();

  React.useEffect(() => {
    (async () => {
      await registerBackgroundSync();
    })();

    warmUpSpeech();
  }, []);

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

        await api.post("/notification/devices/register", {
          token,
          platform: Platform.OS,
        });
      } catch (error) {
        console.warn("Device registration failed", error);
      }
    };

    runForegroundSync(); // app launch
    setupPush();


    return () => sub.remove();
  }, [user]);



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