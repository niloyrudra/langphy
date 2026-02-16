import React from "react";
import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { useFonts } from 'expo-font';
import { ThemeProvider } from "@/theme/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "@/components/StatusBarComponent";
import { AppProvider } from "@/context/AppContext";
import { runMigrations } from "@/db/migrate";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [ready, setReady] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    (async () => {
      // const columns = await db.getAllAsync("PRAGMA table_info(lp_session_performance)");
      // console.log(columns);
      // const lessonColumns = await db.getAllAsync("PRAGMA table_info(lp_progress)");
      // const dirtyRows = await db.getAllAsync(`SELECT * FROM lp_progress WHERE dirty = 1`);
      // console.log("Dirty rows before sync:", dirtyRows);
    })()
    runMigrations().then(() => setReady(true)).then(() => console.log("Migration done!")).catch(console.warn);
  }, []);

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