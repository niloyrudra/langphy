import { StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'

const LangphyListItem = ({content}: {content: string}) => {
    const {colors} = useTheme();
    return (
        <LangphyText style={[styles.text, {color: colors.text}]}>
            <LangphyText style={{}}>{'  '}•{'  '}</LangphyText>
            <LangphyText style={{}}>{content}</LangphyText>
        </LangphyText>
    )
}

export default LangphyListItem

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        lineHeight: 22,
        // color: "#444"
    }
})