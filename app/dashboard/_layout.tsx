import HeaderTitle from "@/components/header/HeaderTitle";
import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Settings from "@/components/header/Settings";
import Title from "@/components/Title";
import STYLES from "@/constants/styles";
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
                    headerTitle: () => (<Title title="Profile" contentStyle={STYLES.headerTitle}
                alignCenter />),
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
            <Stack.Screen
                name="reset-user-password"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<HeaderTitle title="Reset Password" />),
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
    );
};

export default DashboardLayout;