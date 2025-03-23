import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { ThemeProvider } from "@/theme/ThemeContext";

import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from "react";

import CustomArchiveHeader from "@/components/CustomArchiveHeader";
import CustomLessonHeader from "@/components/CustomLessonHeader";
import CustomHeader from "@/components/CustomHeader";
import { View } from "react-native";
// import CustomLessonUnitIndexHeader from "@/components/CustomLessonUnitIndexHeader";
import CustomDefaultHeader from "@/components/CustomDefaultHeader";

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

        <Stack
          screenOptions={{
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="index"
            options={{
              header: () => (<CustomHeader />),
            }}
          />
          <Stack.Screen
            name="lesson-unit"
            options={({}) => ({
              header: (props) => (<CustomArchiveHeader title={props.route.params?.title || "Category"} />),
            })}
          />
          <Stack.Screen
            name="lesson-unit-index"
            options={{
              header: (props) => {
                const completion = props.route.params?.completion ?? 0;
                const goal = props.route.params?.goal ?? 20;
                return (<CustomLessonHeader completion={completion} goal={goal} />)
              }
            }}
          />
          
          <Stack.Screen
            name="terms"
            options={{
              header: () => (<CustomDefaultHeader />)
            }}
          />
          <Stack.Screen
            name="privacy"
            options={{
              header: () => (<CustomDefaultHeader />)
            }}
          />
        </Stack>

      </ThemeProvider>

    </View>
  );
}
export default RootLayout;