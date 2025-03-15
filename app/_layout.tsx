import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { View } from "react-native";

import HeaderLogo from "@/components/HeaderLogo";
import SteakBadge from "@/components/SteakBadge";
import SettingsButton from "@/components/SettingsButton";
import CustomArchiveHeader from "@/components/CustomArchiveHeader";

const RootLayout = () => {
  
  return (<Stack
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#F9FAFB"
      }
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        contentStyle: {
          paddingHorizontal: 17,
          backgroundColor: "#F9FAFB"
        },
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
        header: (props) => {
          const title = props.route.params?.title || "Category";
          // console.log(props.options.title)
          return (<CustomArchiveHeader title={title} />)
        },
        // headerTitleAlign: "center",
        // headerLeft: () => <HeaderTopLeftArrowButton />,
        // headerTitle: () => (<HeaderLogo />),
        // headerRight: () => (<SettingsButton />),
      })}
    />
  </Stack>);
}
export default RootLayout;