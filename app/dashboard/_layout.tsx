import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Settings from "@/components/header/Settings";
import LangphyHeaderTitle from "@/components/text-components/LangphyHeaderTitle";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";

const DashboardLayout = () => {
    const {colors} = useTheme();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Profile" />),
                    headerRight: () => (<Settings />)
                }}
            />
            <Stack.Screen
                name="profile-edit"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Profile Edit" />),
                    headerRight: () => (<Settings />)
                }}
            />
            <Stack.Screen
                name="reset-user-password"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Reset Password" />),
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
                    headerTitle: () => (<LangphyHeaderTitle title="Milestones" />),
                }}
            />
        </Stack>
    );
};

export default DashboardLayout;