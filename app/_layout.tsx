import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
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
import NetworkListener from "@/components/offline/NetworkListener";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
    if (error) console.error('Error loading fonts', error);
  }, [error]);

  React.useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // Ads
  // useEffect(() => {
  //   setTimeout(() => {
  //     bootstrapAds();
  //   }, 1000);
  // }, []);

  if (!loaded ) return null;
    
  return (
    <SafeAreaProvider>  {/* ✅ OUTERMOST — Toasts needs this to exist above it */}
      <View style={styles.flex}>
      {/* <SafeAreaView onLayout={onLayoutRootView} style={styles.flex}> */}
        <GestureHandlerRootView style={styles.flex}>
          {/*
            * <Toaster /> must be the FIRST child of GestureHandlerRootView
            * and must sit OUTSIDE <AppProvider> so it is never affected by
            * NetworkProvider's null→children transition.
            *
            * NetworkProvider calls NetInfo.fetch() and returns null for one
            * frame while waiting. If <Toaster /> were inside AppProvider,
            * it would unmount and remount during that transition — and any
            * toast fired during remount would crash with:
            * "Text strings must be rendered within a <Text> component"
            *
            * Keeping <Toaster /> here means its portal is always attached,
            * regardless of what happens inside AppProvider.
            */}
            {/*
              * <Toaster /> must remain OUTSIDE <AppProvider> — do not move it.
              * NetworkProvider briefly returns null on Android while NetInfo.fetch()
              * resolves. If Toaster were inside AppProvider it would unmount/remount
              * during that null frame and crash. It stays here, always mounted.
              * SafeAreaProvider (above) ensures Toasts can resolve safe-area insets
              * without rendering a raw string node on Android Fabric.
              */}
          <Toaster />   {/* ✅ MUST BE FIRST */}

          <AppProvider>
            <ThemeProvider>
              <NetworkListener />
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
        </GestureHandlerRootView>
      </View>
    </SafeAreaProvider>
  );
}
export default RootLayout;

const styles = StyleSheet.create({
  flex: {flex:1}
});