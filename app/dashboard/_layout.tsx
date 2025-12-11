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
            statusBarStyle: theme == "light" ? "light" : "dark",
        //     statusBarAnimation: "slide"
        }}
    >
        <Stack.Screen
            name="index"
            options={{
                headerStyle: {backgroundColor: colors.background},
                headerShadowVisible: false,
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerTitle: () => (<Title title="Profile" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                headerRight: () => (<Settings />)
            }}
        />
        <Stack.Screen
            name="profile-edit"
            options={{
                headerStyle: {backgroundColor: colors.background},
                headerShadowVisible: false,
                headerLeft: () => (<HeaderTopLeftArrowButton />),
                headerTitle: () => (<Title title="Profile Edit" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
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
                headerTitle: () => (<Title title="Milestones" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
            }}
        />
    </Stack>
)};

export default DashboardLayout;