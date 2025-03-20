import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const Title = ({title}: {title: string}) => {
    const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 22
    }
});