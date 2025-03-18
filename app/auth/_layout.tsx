import { Stack } from "expo-router";

const RootLayout = () => {
  return (<Stack
    screenOptions={{
      headerShown: false,
    }}
    // screenLayout={}
  >
    <Stack.Screen
      options={{}}
      name="index"
    />

  </Stack>);
}
export default RootLayout;