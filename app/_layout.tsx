import React from "react";
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
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
              <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
              <Stack.Screen name="lessons" options={{ headerShown: false }}/>
              <Stack.Screen name="dashboard" options={{ headerShown: false }}/>
            </Stack>
            <StatusBarComponent />
        </ThemeProvider>
      </AppProvider>
    </SafeAreaView>
  );
}
export default RootLayout;