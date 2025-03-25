import React from 'react'
import { Text } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

const TitleHeading = ({ title }: { title: string }) => {
    const { colors } = useTheme();
    return (
        <Text style={[ STYLES.titleHeadingStyle, { color: colors.text }]}>
            {title}
        </Text>
    );
}
export default TitleHeading;