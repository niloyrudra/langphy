import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '../text-components/LangphyText';

const TitleHeading = ({ title }: { title: string }) => {
    const { colors } = useTheme();
    return (
        <LangphyText weight="extrabold" style={[ styles.title, { color: colors.text }]}>
            {title}
        </LangphyText>
    );
}
export default TitleHeading;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: "center"
    }
});