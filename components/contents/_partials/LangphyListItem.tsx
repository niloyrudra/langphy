import { StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'

const LangphyListItem = ({content, indent}: {content: string, indent?: boolean}) => {
    const {colors} = useTheme();
    return (
        <LangphyText style={[styles.text, {color: colors.text}]}>
            <LangphyText>{indent ? '        ' : '  '}•  </LangphyText>
            <LangphyText>{content}</LangphyText>
        </LangphyText>
    )
}

export default LangphyListItem

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 22,
    }
})