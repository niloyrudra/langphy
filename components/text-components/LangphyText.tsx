import { Text, TextProps } from "react-native";

type FontWeight =
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";

interface LangphyTextProps extends TextProps {
    weight?: FontWeight;
}

const fontMap: Record<FontWeight, string> = {
    thin: "Poppins_100Thin",
    light: "Poppins_300Light",
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semibold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
    extrabold: "Poppins_800ExtraBold",
    black: "Poppins_900Black",
};

const LangphyText = ({weight = "regular", style, ...props}: LangphyTextProps) => (
    <Text style={[{ fontFamily: fontMap[weight] }, style]} {...props} />
);

export default LangphyText;