import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText';

const HorizontalSeparator = ({style}: {style?: StyleProp<ViewStyle>}) => {
    const {colors} = useTheme();
    return (
        <View style={[STYLES.childContentCentered, styles.container, (style && style)]}>
            <View style={[styles.border, { backgroundColor: colors.orSeparatorColor}]} />
            <View style={[styles.content, {backgroundColor: colors.background}]}>
                <LangphyText style={[styles.text, {color: colors.orSeparatorColor}]}>or</LangphyText>
            </View>
        </View>
    );
}
export default HorizontalSeparator;

const styles = StyleSheet.create({
    container: {position:"relative", marginVertical: 30},
    border: {width: "100%", height: 1},
    content: {position: "absolute", padding: 6},
    text: {fontSize: 14}
});