import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import Title from "@/components/Title";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";

const SettingsLayout = () => {
    const {colors} = useTheme();
    return(
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<Title title="Settings" contentStyle={{fontWeight:"900", fontSize:24}} containerStyle={{justifyContent:"center", alignItems:"center"}} />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                }}
            />
            <Stack.Screen
                name="others"
                options={{headerShown: false}}
            />
        </Stack>
    );
}
export default SettingsLayout;