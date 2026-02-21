import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import LangphyText from './text-components/LangphyText';

const TitleHeading = ({ title }: { title: string }) => {
    const { colors } = useTheme();
    return (
        <LangphyText weight="bold" style={[ STYLES.titleHeadingStyle, { color: colors.text, textAlign: 'center' }]}>
            {title}
        </LangphyText>
    );
}
export default TitleHeading;