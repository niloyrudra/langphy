import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import { useAuth } from "@/context/AuthContext";
import { warmUpSpeech } from "@/helpers/speechController";
// import { warmUpSpeech } from "@/helpers/speechController";
// import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
// import * as Speech from "expo-speech";
// import { useEffect } from "react";

const App = () => {
  const { user, loading } = useAuth();

  

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

  React.useEffect(() => {
    warmUpSpeech();
  }, []);

  if( loading ) return (<LoadingScreenComponent />);
  console.log("User", user)


  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/lessons" />;
}
export default App;