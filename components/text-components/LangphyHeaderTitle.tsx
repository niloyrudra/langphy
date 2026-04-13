import { useTheme } from "@/theme/ThemeContext";
import LangphyText from "./LangphyText";
import { StyleSheet } from "react-native";

interface LangphyHeaderTitleProps {
    title: string
}

const LangphyHeaderTitle = ({title}: LangphyHeaderTitleProps) => {
    const {colors} = useTheme();
    return (
        <LangphyText
            weight="semibold"
            numberOfLines={1}
            style={[styles.title, {color: colors.text}]}
        >
            {title}
        </LangphyText>
    );
}

export default LangphyHeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
    paddingHorizontal: 10
  },
});