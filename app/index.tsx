import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import React from "react";
import * as SecureStore from "expo-secure-store";

const App = () => {
  const { user, loading } = useAuth();
  
  
  
  if( loading ) return (<LoadingScreenComponent />);
  
  React.useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_API_BASE)
    console.log("APP -> user:", user)
    // (async () => {
    //   await SecureStore.deleteItemAsync("accessToken");
    // })()
    warmUpSpeech();
  }, []);

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;