import React from 'react'
import HeaderLogo from "@/components/HeaderLogo";
import HeaderTopLeftArrowButton from "@/components/HeaderTopLeftArrowButton";
import SettingsButton from "@/components/SettingsButton";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
      contentStyle: {
        paddingHorizontal: 17,
        backgroundColor: "#F9FAFB"
      },
    }}
  />);
}
export default RootLayout;