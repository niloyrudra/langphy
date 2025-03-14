import { Stack } from "expo-router";
import { useRouter } from "expo-router";

const RootLayout = () => {
  const router = useRouter();
  return (<Stack
    screenOptions={{
      headerShown: false,
    }}
  />);
}
export default RootLayout;