import React from 'react'
import { Stack } from "expo-router";

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false
    }}
  >

    {/* <Stack.Screen
      name="lesson-unit"
      // options={{
      //   header: (props) => (<CustomLessonUnitIndexHeader title={props.route.params?.title || "Lesson Units"} />),
      // }}
    />
    <Stack.Screen
      name="lesson-unit-index"
      options={{
        header: (props) => (<CustomLessonUnitIndexHeader title={props.route.params?.title || "Lesson Units"} />),
      }}
    /> */}

  </Stack>);
}
export default RootLayout;