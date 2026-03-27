import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import LangphyText from './text-components/LangphyText';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

interface TitleHeadingProps {
    title: string;
    customStyle?: StyleProp<TextStyle>;
}

const TitleHeading = ({ title, customStyle }: TitleHeadingProps ) => {
    const { colors } = useTheme();
    return (
        <LangphyText
            weight="bold"
            style={[
                STYLES.titleHeadingStyle,
                // styles.text,
                { color: colors.text},
                (customStyle && customStyle)
            ]}
        >
            {title}
        </LangphyText>
    );
}
export default TitleHeading;

// const styles = StyleSheet.create({
//     text: {
//         // flexWrap: "wrap"
//     }
// });