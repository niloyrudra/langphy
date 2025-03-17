import React from 'react'
import { Stack } from "expo-router";

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
    }}
  />);
}
export default RootLayout;