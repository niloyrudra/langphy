import { ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';
import { useTheme } from '@/theme/ThemeContext';

const ModalSectionTitle = ({title, color}: {title: string, color?: ColorValue}) => {
    const {colors} = useTheme();
    return (
        <LangphyText
            weight="semibold"
            style={[styles.text, (color ? { color} : {color: colors.text})]}
        >
            {title}
        </LangphyText>
    );
}

export default ModalSectionTitle;

const styles = StyleSheet.create({
    text: {fontSize: 14}
});