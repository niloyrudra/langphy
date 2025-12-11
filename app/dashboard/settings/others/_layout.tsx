import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Title from "@/components/Title";
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
                    headerTitle: () => (<Title title="Help Center" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="privacy-policy"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<Title title="Privacy Policy" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="terms-and-conditions"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<Title title="Terms & Conditions" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="acknowledgment"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<Title title="Acknowledgment" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="feedback"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<Title title="Feedback" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
        </Stack>
    );
}
export default AdditionalSettingsLayout;