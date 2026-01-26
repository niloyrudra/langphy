import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
import { Redirect } from "expo-router";
import React from "react";

const App = () => {
  const { user, loading } = useAuth();
  React.useEffect(() => {
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