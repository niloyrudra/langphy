import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'

const Paragraph = ({children}: {children: ReactNode}) => {
    const {colors} = useTheme();
    return (
        <LangphyText style={[styles.text, {color: colors.text}]}>
            {children}
        </LangphyText>
    );
}

export default Paragraph

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: "justify"
    },
})