import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { View } from "react-native";

import HeaderLogo from "@/components/HeaderLogo";
import SteakBadge from "@/components/SteakBadge";
import SettingsButton from "@/components/SettingsButton";
import CustomArchiveHeader from "@/components/CustomArchiveHeader";
import CustomLessonHeader from "@/components/CustomLessonHeader";
// import FlagComponent from "@/components/FlagComponent";
import FlagSquareComponent from "@/components/FlagSquareComponent";

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
              gap: 16
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 6,
                borderWidth: 1,
                borderColor: "#68F0F8",
                paddingVertical: 3,
                paddingHorizontal: 3,
                borderRadius: 12,
                height: 36
              }}
            >
              <SteakBadge />
              <FlagSquareComponent />
            </View>

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
    <Stack.Screen
      name="lessons"
      options={{
        header: () => (<CustomLessonHeader />)
      }}
    />
  </Stack>);
}
export default RootLayout;