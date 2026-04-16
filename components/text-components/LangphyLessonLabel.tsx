import { useTheme } from "@/theme/ThemeContext";
import LangphyText from "./LangphyText";
import { StyleSheet } from "react-native";

interface LangphyLessonLabelProps {
    title: string
}

const LangphyLessonLabel = ({title}: LangphyLessonLabelProps) => {
    const {colors} = useTheme();
    return (
        <LangphyText
            weight="semibold"
            // numberOfLines={1}
            style={[styles.label, {color: colors.text}]}
        >
            {title}
        </LangphyText>
    );
}

export default LangphyLessonLabel;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 10
},
    label: {
        fontSize: 20,
        lineHeight: 30,
        wordWrap: 'break-word',
        flexShrink: 1,
    }
});