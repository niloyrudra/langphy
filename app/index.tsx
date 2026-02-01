import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
// import { runMigrations } from "@/db/migrate";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import React from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as SecureStore from "expo-secure-store";

const App = () => {
  const { user, loading } = useAuth();
  
  React.useEffect(() => {
    // (async () => {
      //   await AsyncStorage.removeItem( 'theme' );
      // await SecureStore.deleteItemAsync("accessToken");
    // })()
    warmUpSpeech();
  }, []);

  console.log(process.env.EXPO_PUBLIC_API_BASE)

  if( loading ) return (<LoadingScreenComponent />);

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;