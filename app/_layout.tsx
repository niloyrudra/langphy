import React from "react";
// import { SafeAreaView, View } from "react-native";
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
// import {StatusBar} from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";

import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "@/components/StatusBarComponent";
import { AuthProvider } from "@/context/AuthContext";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Fonts Loading
  const [ loaded, error ] = useFonts({
    'PlusJakartaSans-Regular':    require( '../assets/fonts/PlusJakartaSans-Regular.ttf' ),
    'PlusJakartaSans-Bold':       require( '../assets/fonts/PlusJakartaSans-Bold.ttf' ),
    'PlusJakartaSans-Medium':     require( '../assets/fonts/PlusJakartaSans-Medium.ttf' ),
    'PlusJakartaSans-Light':      require( '../assets/fonts/PlusJakartaSans-Light.ttf' ),
    'PlusJakartaSans-ExtraLight': require( '../assets/fonts/PlusJakartaSans-ExtraLight.ttf' ),
    'PlusJakartaSans-SemiBold':   require( '../assets/fonts/PlusJakartaSans-SemiBold.ttf' ),
    'PlusJakartaSans-ExtraBold':  require( '../assets/fonts/PlusJakartaSans-ExtraBold.ttf' ),
    'Inter-Black':                require( '@expo-google-fonts/inter/Inter_900Black.ttf' ),
    'Inter-Bold':                 require( '@expo-google-fonts/inter/Inter_700Bold.ttf' ),
    'Inter-Regular':              require( '@expo-google-fonts/inter/Inter_400Regular.ttf' ),
    'Inter-Light':                require( '@expo-google-fonts/inter/Inter_300Light.ttf' ),
  });

  React.useEffect(() => {
    if (error) {
      console.error('Error loading fonts', error);
    }
  }, [error]);

  const onLayoutRootView = React.useCallback( async () => {
    if ( loaded || error ) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthProvider>
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
            <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
            <Stack.Screen name="lessons" options={{ headerShown: false }}/>
            <Stack.Screen name="dashboard" options={{ headerShown: false }}/>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          </Stack>
          {/* <StatusBar backgroundColor="white" style="auto" /> */}
          <StatusBarComponent />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}
export default RootLayout;