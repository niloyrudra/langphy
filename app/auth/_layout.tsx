import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      // screenLayout={}
    >
      <Stack.Screen name="index" />
    </Stack>);
}
export default RootLayout;