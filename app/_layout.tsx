import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { View } from "react-native";

import HeaderLogo from "@/components/HeaderLogo";
import SteakBadge from "@/components/SteakBadge";
import SettingsButton from "@/components/SettingsButton";
import HeaderTopLeftArrowButton from "@/components/HeaderTopLeftArrowButton";

const RootLayout = () => {
  
  return (<Stack
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#F9FAFB"
      },
      contentStyle: {
        paddingHorizontal: 17,
        backgroundColor: "#F9FAFB"
      }
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        headerTitle: () => (<HeaderLogo />),
        headerRight: () => (
          <View
            style={{
              flexDirection:"row",
              gap: 10
            }}
          >
            <SteakBadge />
            <SettingsButton />
          </View>
        )
      }}
    />
    <Stack.Screen
      name="category"
      options={({}) => ({
        headerTitleAlign: "center",
        headerLeft: () => (<HeaderTopLeftArrowButton onPress={() => console.log('#')} />),
        headerTitle: () => (<HeaderLogo />),
        headerRight: () => (<SettingsButton />),
      })}
    />
  </Stack>);
}
export default RootLayout;