import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { runForegroundSync } from "@/sync/foregroundSync";
import { useForegroundSync } from "@/sync/useForegroundSync";
import { AppState } from "react-native";
// import * as BackgroundTask from "expo-background-task";
import { registerBackgroundSync } from "@/sync/backgroundSync";

const App = () => {
  const { user, loading } = useAuth();
  if( loading ) return (<LoadingScreenComponent />);
  
  React.useEffect(() => {
    // console.log(process.env.EXPO_PUBLIC_API_BASE)
    // console.log("APP -> user:", user)
    (async () => {
      // await SecureStore.deleteItemAsync("accessToken");
      await registerBackgroundSync();
    })()
    warmUpSpeech();
  }, []);

  React.useEffect(() => {
    const sub = AppState.addEventListener("change", state => {
      if (state === "active") {
        runForegroundSync();
      }
    });

    // const sub = useForegroundSync(runForegroundSync)

    runForegroundSync(); // app launch

    return () => sub.remove();
  }, []);

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;