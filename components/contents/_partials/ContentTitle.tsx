import { StyleSheet } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext';

const ContentTitle = ({title}: {title: string}) => {
    const {colors} = useTheme();
  return (
    <LangphyText
        weight="bold"
        style={[styles.section, {color: colors.primary, textDecorationColor: colors.primary}]}
    >
        {title}
    </LangphyText>
  )
}

export default ContentTitle

const styles = StyleSheet.create({
    section: {
        fontSize: 18,
        fontWeight: "600",
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    }
})