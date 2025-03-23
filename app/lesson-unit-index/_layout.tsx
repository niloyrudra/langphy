import React from 'react'
import { Stack } from "expo-router";
import CustomLessonHeader from '@/components/CustomLessonHeader';

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
          console.log(props.route.params)
          const completion = 90 // props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    />
    <Stack.Screen
      name="quiz"
      options={{
        header: (props) => {
          const completion = props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    />
    <Stack.Screen
      name="listening"
      options={{
        header: (props) => {
          const completion = props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    />
    <Stack.Screen
      name="reading"
      options={{
        header: (props) => {
          const completion = props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    />
    <Stack.Screen
      name="speaking"
      options={{
        header: (props) => {
          const completion = props.route.params?.completion ?? 0;
          const goal = props.route.params?.goal ?? 100;
          return (<CustomLessonHeader completion={completion} goal={goal} />)
        }
      }}
    />
    <Stack.Screen
      name="writing"
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