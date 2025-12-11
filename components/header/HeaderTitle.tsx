import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
// import STYLES from '@/constants/styles';

const TitleHeading = ({ title }: { title: string }) => {
    const { colors } = useTheme();
    return (
        <Text style={[ styles.title, { color: colors.text }]}>
            {title}
        </Text>
    );
}
export default TitleHeading;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center"
    }
});