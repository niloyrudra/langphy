import HeaderTitle from "@/components/header/HeaderTitle";
import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
// import Title from "@/components/Title";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";

const AdditionalSettingsLayout = () => {
    const {colors} = useTheme();
    return(
        <Stack>
            <Stack.Screen
                name="help-center"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<HeaderTitle title="Help Center" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="privacy-policy"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<HeaderTitle title="Privacy Policy" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="terms-and-conditions"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<HeaderTitle title="Terms & Conditions" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="acknowledgment"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<HeaderTitle title="Acknowledgment" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="feedback"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<HeaderTitle title="Feedback" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
        </Stack>
    );
}
export default AdditionalSettingsLayout;