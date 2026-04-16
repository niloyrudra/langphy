import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import LangphyHeaderTitle from "@/components/text-components/LangphyHeaderTitle";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import { View } from "react-native";

const AdditionalSettingsLayout = () => {
    const {colors} = useTheme();
    return(
        <Stack>
            <Stack.Screen
                name="help-center"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Help Center" />),
                    headerRight: () => (<View style={{width: 40, height: 40}}/>)
                }}
            />
            <Stack.Screen
                name="privacy-policy"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Privacy Policy" />),
                }}
            />
            <Stack.Screen
                name="terms-and-conditions"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Terms & Conditions" />),
                }}
            />
            <Stack.Screen
                name="acknowledgment"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Acknowledgment" />),
                }}
            />
            <Stack.Screen
                name="feedback"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerTitle: () => (<LangphyHeaderTitle title="Feedback" />),
                }}
            />
        </Stack>
    );
}
export default AdditionalSettingsLayout;