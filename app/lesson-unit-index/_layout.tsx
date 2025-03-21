import React from 'react'
import { Stack } from "expo-router";

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="practice"
      options={{}}
    />
    <Stack.Screen
      name="quiz"
      options={{}}
    />
    <Stack.Screen name="listening" />
    <Stack.Screen name="reading" />
    <Stack.Screen name="speaking" />
    <Stack.Screen name="writing" />
  </Stack>);
}
export default RootLayout;