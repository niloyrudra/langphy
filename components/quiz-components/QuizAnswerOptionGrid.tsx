import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import QuizOptionCardList from '../list-loops/QuizOptionCardList'

const QuizAnswerOptionGrid = () => {
    const {colors}  = useTheme()
  return (
    <View
        style={{
            marginVertical:30
        }}
    >
      
    </View>
  )
}

export default QuizAnswerOptionGrid

const styles = StyleSheet.create({})