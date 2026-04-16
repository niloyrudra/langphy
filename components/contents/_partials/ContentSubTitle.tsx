import { StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext';

const ContentSubTitle = ({title}: {title: string}) => {
    const {colors} = useTheme();
  return (
    <LangphyText
        weight="semibold"
        style={[styles.subSection, {color: colors.primary}]}
    >
        {title}
    </LangphyText>
  )
}

export default ContentSubTitle

const styles = StyleSheet.create({
    subSection: {
        fontSize: 16,
        fontWeight: "600"
    },
})