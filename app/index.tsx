// import 'react-native-get-random-values';
import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import React from "react";
// import * as SecureStore from "expo-secure-store";
import { runForegroundSync } from "@/sync/foregroundSync";
// import { useForegroundSync } from "@/sync/useForegroundSync";
import { AppState } from "react-native";
// import * as BackgroundTask from "expo-background-task";
import { registerBackgroundSync } from "@/sync/backgroundSync";
import { useLessonTimer } from "@/hooks/useLessonTimer";

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

    runForegroundSync(); // app launch

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