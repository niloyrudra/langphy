import HeaderTitle from "@/components/header/HeaderTitle";
import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Settings from "@/components/header/Settings";
import Title from "@/components/Title";
// import TitleHeading from "@/components/TitleHeading";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";

const DashboardLayout = () => {
    const {colors, theme} = useTheme();

    return (
    <Stack
        screenOptions={{
            // statusBarStyle: theme == "light" ? "light" : "dark",
        //     statusBarAnimation: "slide"
        }}
    >
        <Stack.Screen
            name="index"
            options={{
                headerStyle: {backgroundColor: colors.background},
                headerShadowVisible: false,
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerTitle: () => (<HeaderTitle title="Profile" />),
                headerRight: () => (<Settings />)
            }}
        />
        <Stack.Screen
            name="profile-edit"
            options={{
                headerStyle: {backgroundColor: colors.background},
                headerShadowVisible: false,
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerTitle: () => (<HeaderTitle title="Profile Edit" />),
                headerRight: () => (<Settings />)
            }}
        />
        
        <Stack.Screen name="settings" options={{headerShown: false}}/>

        <Stack.Screen
            name="milestones"
            options={{
                headerStyle: {backgroundColor: colors.background},
                headerShadowVisible: false,
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerTitle: () => (<HeaderTitle title="Milestones" />),
            }}
        />
    </Stack>
)};

export default DashboardLayout;