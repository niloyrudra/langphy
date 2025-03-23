import React from 'react'
import { Stack } from "expo-router";
// import CustomLessonHeader from '@/components/CustomLessonHeader';

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
    }}
  >
    {/* <Stack.Screen
      name="practice"
      options={{
        header: (props) => {
          const completion = props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    /> */}
  </Stack>);
}
export default RootLayout;