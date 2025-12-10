import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Settings from "@/components/header/Settings";
import Title from "@/components/Title";
import TitleHeading from "@/components/TitleHeading";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
// import { View } from "react-native";

const DashboardLayout = () => {
    const {colors, theme} = useTheme();

    return (
    <Stack
        screenOptions={{
            statusBarStyle: theme == "light" ? "dark" : "light"
        }}
    >
        <Stack.Screen
            name="index"
            options={{
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerShadowVisible: false,
                headerTitle: () => (<Title title="Profile" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                // headerTitle: () => (<TitleHeading title="Profile" />),
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerRight: () => (<Settings />)
            }}
        />
        <Stack.Screen
            name="profile-edit"
            options={{
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerShadowVisible: false,
                headerTitle: () => (<Title title="Profile Edit" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                // headerTitle: () => (<TitleHeading title="Profile" />),
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerRight: () => (<Settings />)
            }}
        />
        <Stack.Screen
            name="settings"
            options={{
                // headerShown: false,
                // contentStyle: {
                //     backgroundColor: colors.background
                // },
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerShadowVisible: false,
                headerTitle: () => (<Title title="Settings" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                // headerTitle: () => (<TitleHeading title="Settings" />),
                headerLeft: () => (<HeaderTopLeftArrowButton />),
            }}
        />

        <Stack.Screen
            name="milestones"
            options={{
                // headerShown: false,
                contentStyle: {
                    backgroundColor: colors.background
                },
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerShadowVisible: false,
                headerTitle: () => (<Title title="Milestones" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                // headerTitle: () => (<TitleHeading title="Settings" />),
                headerLeft: () => (<HeaderTopLeftArrowButton />),
            }}
        />
    </Stack>
)};

export default DashboardLayout;