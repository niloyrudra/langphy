import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
// import { warmUpSpeech } from "@/helpers/speechController";
// import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
// import * as Speech from "expo-speech";
// import { useEffect } from "react";

const App = () => {
  const { user, loading } = useAuth();

  if( loading ) return (<LoadingScreenComponent />);

  // const isLoggedIn = true; // Replace with actual auth state

  
  // const initSpeechEngine = () => {
  //   // Say something very short, immediately stopped
  //   Speech.speak(" ", {
  //     language: "de-DE",
  //     rate: 1,
  //     onDone: () => {
  //       // Stop immediately to prevent any sound
  //       Speech.stop();
  //     },
  //   });
  // };

  // useEffect(() => {
  //   // Warm up speech engine
  //   initSpeechEngine();
  // }, []);

  console.log("User", user)

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;