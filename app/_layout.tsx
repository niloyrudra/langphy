import { Stack } from "expo-router"; // 'Slot' for one-paged apps
import { ThemeProvider } from "@/theme/ThemeContext";

import CustomArchiveHeader from "@/components/CustomArchiveHeader";
import CustomLessonHeader from "@/components/CustomLessonHeader";
import CustomHeader from "@/components/CustomHeader";

const RootLayout = () => {

  return (
    <ThemeProvider>

      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            header: () => (<CustomHeader />),
          }}
        />
        <Stack.Screen
          name="category"
          options={({}) => ({
            header: (props) => (<CustomArchiveHeader title={props.route.params?.title || "Category"} />),
          })}
        />
        <Stack.Screen
          name="lessons"
          options={{
            header: () => (<CustomLessonHeader />)
          }}
        />
      </Stack>

    </ThemeProvider>
  );
}
export default RootLayout;