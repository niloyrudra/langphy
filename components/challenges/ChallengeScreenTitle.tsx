import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const ChallengeScreenTitle = ({title}: {title: string}) => {
    const {colors} = useTheme();
  return (
    <View>
        <Text
        style={{
            color: colors.text,
            fontSize: 24,
            lineHeight: 24,
            fontWeight: "700"
        }}
        >{title}</Text>
    </View>
  )
}

export default ChallengeScreenTitle

const styles = StyleSheet.create({})