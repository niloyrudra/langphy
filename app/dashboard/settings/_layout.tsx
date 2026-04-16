import HeaderTitle from "@/components/header/HeaderTitle";
import HeaderTopLeftArrowButton from "@/components/header/HeaderTopLeftArrowButton";
import LangphyHeaderTitle from "@/components/text-components/LangphyHeaderTitle";
import Title from "@/components/Title";
import STYLES from "@/constants/styles";
// import Title from "@/components/Title";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import { View } from "react-native";

const SettingsLayout = () => {
    const {colors} = useTheme();
    return(
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {backgroundColor: colors.background},
                    headerShadowVisible: false,
                    headerTitle: () => (<LangphyHeaderTitle title="Settings" />),
                    headerLeft: () => (<HeaderTopLeftArrowButton />),
                    headerRight: () => (<View style={{width:24, height: 24}}/>)
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