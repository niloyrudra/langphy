import React, { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
// import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "@/components/StatusBarComponent";
import { AppProvider } from "@/context/AppContext";
import {
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';
import { Toaster } from "@/components/toaster/Toaster";
import { StyleSheet, View } from "react-native";
// import { bootstrapAds } from "@/bootstraps/ads.bootstrap";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Fonts Loading
  const [ loaded, error ] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
  });

  React.useEffect(() => {
    if (error) {
      console.error('Error loading fonts', error);
    }
  }, [error]);

  // const onLayoutRootView = React.useCallback( async () => {
  //   if ( loaded || error ) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Ads
  // useEffect(() => {
  //   setTimeout(() => {
  //     bootstrapAds();
  //   }, 1000);
  // }, []);

  if (!loaded ) {
  // if (!loaded && !error) {
    return null;
  }
  
  return (
    <View style={styles.flex}>
    {/* <SafeAreaView onLayout={onLayoutRootView} style={styles.flex}> */}
      <GestureHandlerRootView style={styles.flex}>
        <AppProvider>
          <ThemeProvider>
              <Stack
                screenOptions={{
                  headerShadowVisible: false
                }}
                initialRouteName="index"
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
                <Stack.Screen name="auth/verify-otp" options={{ headerShown: false }} />
                <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
                <Stack.Screen name="lessons" options={{ headerShown: false }}/>
                <Stack.Screen name="dashboard" options={{ headerShown: false }}/>
              </Stack>
              <StatusBarComponent />
          </ThemeProvider>
        </AppProvider>

        <Toaster />

      </GestureHandlerRootView>
    </View>
  );
}
export default RootLayout;

const styles = StyleSheet.create({
  flex: {flex:1}
});