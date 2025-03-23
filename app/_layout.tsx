import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";

import * as SplashScreen from 'expo-splash-screen';

import CustomHeader from "@/components/CustomHeader";
import CustomArchiveHeader from "@/components/CustomArchiveHeader";
import CustomLessonHeader from "@/components/CustomLessonHeader";

import CustomDefaultHeader from "@/components/CustomDefaultHeader";
import HeaderLogo from "@/components/header/HeaderLogo";

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
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{headerShadowVisible: false, headerShown: false }} initialRouteName="lessons">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
          <Stack.Screen name="lessons" options={{ headerShown: false }}/>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        </Stack>
      </ThemeProvider>
    </View>
  );
}
export default RootLayout;












